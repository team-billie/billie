// types/google-maps.d.ts
declare namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, opts?: MapOptions);
        panTo(latLng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
        getCenter(): LatLng;
        setCenter(latLng: LatLng | LatLngLiteral): void;
      }
  
      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        setPosition(latLng: LatLng | LatLngLiteral): void;
        getPosition(): LatLng;
      }
  
      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }
  
      class Geocoder {
        geocode(
          request: GeocoderRequest,
          callback: (results: GeocoderResult[], status: GeocoderStatus) => void
        ): void;
      }
  
      interface MapOptions {
        center: LatLng | LatLngLiteral;
        zoom: number;
        minZoom?: number;
        maxZoom?: number;
        zoomControl?: boolean;
        streetViewControl?: boolean;
        mapTypeControl?: boolean;
        fullscreenControl?: boolean;
      }
  
      interface MarkerOptions {
        position: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string;
        draggable?: boolean;
      }
  
      interface LatLngLiteral {
        lat: number;
        lng: number;
      }
  
      interface GeocoderRequest {
        address?: string;
        location?: LatLng | LatLngLiteral;
      }
  
      interface GeocoderResult {
        formatted_address: string;
        geometry: {
          location: LatLng;
        };
      }
  
      type GeocoderStatus = "OK" | "ZERO_RESULTS" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST" | "UNKNOWN_ERROR";
      
      interface MapMouseEvent {
        latLng?: LatLng;
      }
    }
  }