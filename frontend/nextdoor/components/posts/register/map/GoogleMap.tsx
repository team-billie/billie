// components/GoogleMap.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 35.1798,
  lng: 129.075,
};

interface GoogleMapComponentProps {
  onAddressSelect: (address: string) => void;
  initialAddress?: string;
}

export default function GoogleMapComponent({
  onAddressSelect,
  initialAddress,
}: GoogleMapComponentProps) {
  useEffect(() => {
    console.log("✅ API 키:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [loaded, setLoaded] = useState(false);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const addressUpdateTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastAddressUpdate = useRef<number>(0);
  const isInitialLoad = useRef<boolean>(true);
  const [showPopup, setShowPopup] = useState(false);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    if (!geocoderRef.current) {
      geocoderRef.current = new google.maps.Geocoder();
    }

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      icon: {
        url: "/images/mapicon.png",
        scaledSize: new google.maps.Size(100, 100),
      },
    });

    setLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    mapRef.current = null;
  }, []);

  const shouldUpdateAddress = () => {
    const now = Date.now();
    return now - lastAddressUpdate.current > 1000;
  };

  const updateAddress = useCallback(
    (position: google.maps.LatLngLiteral) => {
      if (!geocoderRef.current || !shouldUpdateAddress()) return;

      if (addressUpdateTimeout.current) {
        clearTimeout(addressUpdateTimeout.current);
      }

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      addressUpdateTimeout.current = setTimeout(() => {
        geocoderRef.current?.geocode(
          { location: position },
          (results, status) => {
            if (status === "OK" && results && results[0]) {
              onAddressSelect(results[0].formatted_address);
              lastAddressUpdate.current = Date.now();
            }
          }
        );
      }, 500);
    },
    [onAddressSelect]
  );

  useEffect(() => {
    if (
      initialAddress &&
      mapRef.current &&
      geocoderRef.current &&
      isInitialLoad.current
    ) {
      isInitialLoad.current = false;
      geocoderRef.current.geocode(
        { address: initialAddress },
        (results, status) => {
          if (
            status === "OK" &&
            results?.[0]?.geometry?.location &&
            mapRef.current
          ) {
            const location = results[0].geometry.location;
            mapRef.current.setCenter(location);
            markerRef.current?.setPosition(location);
          }
        }
      );
    }
  }, [initialAddress, loaded]);

  useEffect(() => {
    if (loaded && !initialAddress && isInitialLoad.current) {
      isInitialLoad.current = false;
      moveToCurrentLocation();
    }
  }, [loaded, initialAddress]);

  const moveToCurrentLocation = useCallback(() => {
    if (!mapRef.current) return;

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        mapRef.current?.setCenter(currentPosition);
        markerRef.current?.setPosition(currentPosition);
        updateAddress(currentPosition);
      },
      (error) => console.error("현재 위치를 가져올 수 없습니다:", error)
    );
  }, [updateAddress]);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    const map = mapRef.current;

    const clickListener = map.addListener(
      "click",
      (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;

        const position = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        markerRef.current?.setPosition(event.latLng);
        mapRef.current?.panTo(event.latLng);
        updateAddress(position);
      }
    );

    const dragEndListener = map.addListener("dragend", () => {
      const center = mapRef.current?.getCenter();
      if (!center) return;

      const position = {
        lat: center.lat(),
        lng: center.lng(),
      };

      markerRef.current?.setPosition(center);
      updateAddress(position);
    });

    const centerChangedListener = map.addListener("center_changed", () => {
      const center = mapRef.current?.getCenter();
      center && markerRef.current?.setPosition(center);
    });

    return () => {
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(dragEndListener);
      google.maps.event.removeListener(centerChangedListener);
      if (addressUpdateTimeout.current)
        clearTimeout(addressUpdateTimeout.current);
    };
  }, [loaded, updateAddress]);

  return (
    <div className="w-full h-full relative">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        loadingElement={
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-lg">지도를 불러오는 중...</p>
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        />
      </LoadScript>

      {showPopup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 bg-opacity-70 text-white px-4 py-3 rounded-md text-center mb-2 whitespace-nowrap">
          지도를 움직여서 선택해보세용가리리
        </div>
      )}

      <button
        className="absolute bottom-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md"
        aria-label="현재 위치로 이동"
        onClick={moveToCurrentLocation}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8ZM20.94 11C20.48 6.83 17.17 3.52 13 3.06V1H11V3.06C6.83 3.52 3.52 6.83 3.06 11H1V13H3.06C3.52 17.17 6.83 20.48 11 20.94V23H13V20.94C17.17 20.48 20.48 17.17 20.94 13H23V11H20.94ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z"
            fill="#2196F3"
          />
        </svg>
      </button>
    </div>
  );
}
