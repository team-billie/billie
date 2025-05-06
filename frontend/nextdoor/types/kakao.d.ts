// types/kakao.d.ts
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => any;
        Map: new (container: HTMLElement, options: any) => any;
        services: {
          Geocoder: new () => {
            coord2Address: (
              lng: number,
              lat: number,
              callback: (result: any[], status: string) => void
            ) => void;
          };
          Status: {
            OK: string;
            ERROR: string;
            ZERO_RESULT: string;
          };
        };
        event: {
          addListener: (
            target: any,
            type: string,
            handler: (e: any) => void
          ) => void;
        };
        MarkerImage: new (
          src: string,
          size: any,
          options?: { offset?: any }
        ) => any;
        Marker: new (options: { position: any; map: any; image?: any }) => any;
        Size: new (width: number, height: number) => any;
        Point: new (x: number, y: number) => any;
        ControlPosition: {
          TOPRIGHT: string;
          TOPLEFT: string;
          BOTTOMRIGHT: string;
          BOTTOMLEFT: string;
        };
        ZoomControl: new () => any;
        MapTypeControl: new () => any;
      };
    };
  }
}

export {};
