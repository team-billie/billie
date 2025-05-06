// components/posts/map/KakaoMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface KakaoMapProps {
  onAddressSelect: (address: string) => void;
  initialAddress?: string;
}

export default function KakaoMap({
  onAddressSelect,
  initialAddress,
}: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // 카카오맵 스크립트가 이미 로드되었는지 확인
    const mapScript = document.getElementById("kakao-map-script");

    if (!mapScript) {
      // 스크립트 로드
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=3390dd8b98955c6cd724443e77424db9&libraries=services&autoload=false`;
      script.async = true;

      script.onload = () => {
        window.kakao.maps.load(() => {
          console.log("카카오맵 로드 완료");
          setMapLoaded(true);
        });
      };

      document.head.appendChild(script);
    } else if (window.kakao && window.kakao.maps) {
      // 이미 로드된 경우
      setMapLoaded(true);
    }
  }, []);

  // 지도 초기화 및 설정
  useEffect(() => {
    if (!mapLoaded || !mapContainer.current) return;

    try {
      // 지도 초기화
      const options = {
        center: new window.kakao.maps.LatLng(35.1798, 129.075), // 부산 중심 좌표
        level: 3, // 확대 레벨
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);

      // 지도 컨트롤 추가
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(
        zoomControl,
        window.kakao.maps.ControlPosition.RIGHT_BOTTOM
      );

      // 주소-좌표 변환 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: options.center,
        map: map,
      });

      // 초기 주소가 있는 경우 해당 위치로 이동
      if (initialAddress) {
        geocoder.addressSearch(initialAddress, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            map.setCenter(coords);
            marker.setPosition(coords);
          }
        });
      } else {
        // 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;

              const currentPos = new window.kakao.maps.LatLng(lat, lng);
              map.setCenter(currentPos);
              marker.setPosition(currentPos);

              // 좌표를 주소로 변환
              geocoder.coord2Address(lng, lat, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const addr = result[0].address.address_name;
                  onAddressSelect(addr);
                }
              });
            },
            () => {
              // 위치 권한 거부 또는 오류 시
              console.log("현재 위치를 가져올 수 없습니다.");
            }
          );
        }
      }

      // 지도 클릭 이벤트 등록
      window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
        const latlng = mouseEvent.latLng;

        // 마커 위치 이동
        marker.setPosition(latlng);

        // 클릭한 위치의 주소 가져오기
        geocoder.coord2Address(
          latlng.getLng(),
          latlng.getLat(),
          (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result[0].address.address_name;
              onAddressSelect(addr);
            }
          }
        );
      });
    } catch (error) {
      console.error("지도 초기화 오류:", error);
    }
  }, [mapLoaded, initialAddress, onAddressSelect]);

  return (
    <div className="w-full h-full relative">
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ background: "#f5f5f5" }}
      />

      {/* 현재 위치로 이동 버튼 */}
      <button
        className="absolute bottom-4 right-4 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md"
        aria-label="현재 위치로 이동"
        onClick={() => {
          if (!mapLoaded) return;

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;

              if (mapContainer.current && mapContainer.current._kakao_map) {
                mapContainer.current._kakao_map.setCenter(
                  new window.kakao.maps.LatLng(lat, lng)
                );
              }
            });
          }
        }}
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
