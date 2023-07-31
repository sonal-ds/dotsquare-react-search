import * as React from "react";
import { useSearchState, Result } from "@yext/search-headless-react";
import { useEffect, useRef, useState, useContext } from "react";
import Mapicon2 from "../../images/pin.svg";
import clustericon from "../../images/cluster.png";
import Hovermap from "../../images/map-hover.svg";
import { renderToString } from "react-dom/server";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import UserMarker from "../../images/map-center.svg";
import { StaticData } from "../../sites-global/staticData";
import { LocationContext } from "../LocationContext";
import { Address, Link } from "@yext/pages/components";
import { getDirectionUrl } from "../commons/GetDirection";
import { useComposedCssClasses } from "@yext/search-ui-react";
import { twMerge } from "../../hooks/twMerge";
import { silverMapStyle } from "../../config/answersHeadlessConfig";
import Phone from "../commons/Phone";

/**
 * CSS class interface for the {@link GoogleMaps} component
 *
 *
 * @public
 */

declare global {
  interface Window {
    getdirection: any;
  }
}
export interface GoogleMapsCssClasses {
  googleMapsContainer?: string;
}

/**
 * Props for the {@link GoogleMaps} component
 *
 * @public
 */
export interface GoogleMapsProps {
  apiKey: string;
  centerLatitude: number;
  centerLongitude: number;
  defaultZoom: number;
  showEmptyMap: boolean;
  check: boolean;
  providerOptions?: google.maps.MapOptions;
  customCssClasses?: GoogleMapsCssClasses;
  mobile: any;
  activeIndex: number | null;
  setActiveIndex: any;
  setMobile: any;
}

type UnwrappedGoogleMapsProps = Omit<GoogleMapsProps, "apiKey" | "locale">;
let mapMarkerClusterer: { clearMarkers: () => void };
// let infoWindow:any = null;
const builtInCssClasses: Readonly<GoogleMapsCssClasses> = {
  googleMapsContainer: "locator-map-block",
};

/**
 * A component that renders a map with markers to show result locations.
 *
 * @param props - {@link GoogleMapsProps}
 * @returns A React element conatining a Google Map
 *
 * @public
 */
export function GoogleMaps(props: GoogleMapsProps) {
  return (
    <div>
      <UnwrappedGoogleMaps {...props} />
    </div>
  );
}

function UnwrappedGoogleMaps({
  centerLatitude,
  centerLongitude,
  defaultZoom: zoom,
  showEmptyMap,
  check,
  providerOptions,
  customCssClasses,
  mobile,
  activeIndex,
  setActiveIndex,
  setMobile,
}: UnwrappedGoogleMapsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [hover, setHover] = useState(true);
  const loading = useSearchState((s) => s.searchStatus.isLoading);
  let center: any = {
    lat: Number,
    lng: Number,
  };
  const refLocationResults = useRef([]);
  const { state } = useContext(LocationContext);
  const locationResults = state.mapLocations || [];
  refLocationResults.current = locationResults;

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      map?.setZoom(2);
    }
  };
  locationResults.length > 0
    ? locationResults.map((result: any, i: number) => {
        if (i == 0 && result) {
          center = {
            lat: result?.yextDisplayCoordinate
              ? result.yextDisplayCoordinate.latitude
              : result?.displayCoordinate.latitude
              ? result.displayCoordinate.latitude
              : result?.cityCoordinate.latitude,
            lng: result?.yextDisplayCoordinate
              ? result.yextDisplayCoordinate.longitude
              : result?.displayCoordinate.longitude
              ? result.displayCoordinate.longitude
              : result?.cityCoordinate.longitude,
          };
        }
      })
    : (center = {
        lat: centerLatitude,
        lng: centerLongitude,
      });

  let info = false;
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const noResults = !locationResults.length;
  let containerCssClass = cssClasses.googleMapsContainer;

  if (noResults && !showEmptyMap) {
    containerCssClass = twMerge(cssClasses.googleMapsContainer, "hidden");
  }

  const bounds = new google.maps.LatLngBounds();
  const markers1 = useRef<google.maps.Marker[]>([]);
  const usermarker = useRef<google.maps.Marker[]>([]);
  const infoWindow = useRef(new google.maps.InfoWindow());
  deleteMarkers();
  userdeleteMarkers();
  const userlat: any = useSearchState((s) => s.location.locationBias) || [];
  const iplat = userlat.latitude;
  const iplong = userlat.longitude;
  const position = {
    lat: iplat,
    lng: iplong,
  };
  const Usermarker1 = new google.maps.Marker({
    position,
    map,
    icon: UserMarker,
  });
  usermarker.current.push(Usermarker1);
  try {
    if (mapMarkerClusterer) {
      mapMarkerClusterer.clearMarkers();
    }
  } catch (e) {
    console.log("e", e);
  }

  let i = 0;
  for (const result of locationResults) {
    i++;
    const position = getPosition(result);
    const marker = new google.maps.Marker({
      position,
      map,
      icon: Mapicon2,
    });

    const location = new google.maps.LatLng(position?.lat, position?.lng);
    bounds.extend(location);
    markers1.current.push(marker);
  }
  if (markers1.current.length > 0) {
    const markers = markers1.current;
    mapMarkerClusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ markers, position: position }) => {
          return new google.maps.Marker({
            position: {
              lat: position.lat(),
              lng: position.lng(),
            },
            icon: clustericon,
            label: {
              text: String(markers?.length),
              color: "white",
            },
          });
        },
      },
    });
  }

  useEffect(() => {
    if (loading) {
      setHover(true);
    }
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
          styles: silverMapStyle,
          ...providerOptions,
        })
      );
    } else if (markers1.current.length > 0 && map && check && hover) {
      const mediaQuery = window.matchMedia("(max-width: 1023px)");
      mediaQuery.addListener(handleMediaQueryChange);
      if (mobile) {
        handleMediaQueryChange(mediaQuery);
        setMobile(false);
      }
      // bounds.extend(position);
      // map?.fitBounds(bounds);
    }

    if (activeIndex != null && mobile) {
      setTimeout(() => {
        bounds.extend(position);
        map?.setCenter(position);
      }, 500);
      setTimeout(() => {
        map?.setZoom(13);
      }, 800);
      infoWindow.current.open(map, markers1.current[activeIndex]);
    }
    gridHover(markers1, Hovermap, Mapicon2);
    gridclick(markers1, Hovermap, Mapicon2, refLocationResults);
  }, [ref, center, map, providerOptions, zoom, position]);

  for (let i = 0; i < markers1.current.length; i++) {
    markers1.current[i].addListener("click", () => {
      setActiveIndex(i);
      setHover(false);
      if (!info) {
        markers1.current[i].setIcon(Hovermap);
      }
      const resultelement = document?.getElementById(`result-${i + 1}`);
      if (resultelement) {
        resultelement.classList.add("active");
        resultelement.classList.add("fixed-hover");
      }

      const position = getPosition(locationResults[i]);

      Infowindow(i, locationResults[i]);
      scrollToRow(i);
      const currentZoom = map?.getZoom() || 4;

       map?.setCenter(position);
// Market to Center
      // setTimeout(() => {
      //   if (currentZoom && currentZoom < 19) {
      //     map?.setZoom(10);
      //     map?.setCenter(position);
      //   } 
      // }, 800);

      infoWindow.current.open(map, markers1.current[i]);
    });

    markers1.current[i].addListener("mouseover", () => {
      if (hover) {
        markers1.current[i].setIcon(Hovermap);

        addActiveGrid(i);
      }
    });
    markers1.current[i].addListener("mouseout", () => {
      if (hover) {
        markers1.current[i].setIcon(Mapicon2);
      }
      if (hover) {
        removeActiveGrid(i);
      }
    });
  }

  if (infoWindow.current != null) {
    infoWindow.current.addListener("closeclick", () => {
      setHover(true);
      setActiveIndex(null);
      info = false;
      infoWindow.current.close();
      locationResults.map((result: any, index: number) => {
        const resultelement = document?.querySelectorAll(
          `.result-list-inner-${index + 1}`
        );
        for (let index = 0; index < resultelement.length; index++) {
          resultelement[index].classList.remove("active", "fixed-hover");
        }
      });
       
      bounds.extend(position);
      map?.fitBounds(bounds);
    });
  }

  function addActiveGrid(index: any) {
    const elements = document?.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document?.querySelectorAll(".result")[index].classList.add("active");
  }
  function removeActiveGrid(index: any) {
    const elements = document?.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.remove("active");
    }
    document?.querySelectorAll(".result")[index].classList.remove("active");
  }
  function gridHover(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any
  ) {
    const elements = document?.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].addEventListener("mouseover", (e) => {
        if (hover) {
          markerPins.current[index].setIcon(marker_hover_icon);
          addActiveGrid(index);
        }
      });
      elements[index].addEventListener("mouseout", () => {
        if (hover) {
          // if(!info){
          if (elements[index].classList.contains("fixed-hover")) {
            markerPins.current[index].setIcon(marker_hover_icon);
          } else {
            markerPins.current[index].setIcon(marker_icon);
          }

          removeActiveGrid(index);
        }
      });
    }
  }
  function gridclick(
    markerPins: any,
    marker_hover_icon: any,
    marker_icon: any,
    locationResults: any
  ) {
    const elements = document?.querySelectorAll(".result");
    for (let index = 0; index < elements.length; index++) {
      elements[index].classList.add("markerEventBinded");
      elements[index].addEventListener("click", (e) => {
        if (
          !(e.target as HTMLInputElement).classList.contains("notHighlight")
        ) {
          markerPins.current[index].setIcon(marker_icon);
          if (typeof document != "undefined") {
            (e.target as HTMLInputElement).classList.remove("fixed-hover");
          }
          locationResults.current.map((result: any, i: number) => {
            if (i == index && !mobile) {
              setTimeout(() => {
                google.maps.event.trigger(markerPins.current[i], "click");
              }, 100);
              google.maps.event.trigger(infoWindow.current, "closeclick");
            }
          });
        }
      });
    }
  }

  function Infowindow(i: number, result: any): void {
    info = true;
    let url = "";

    const name: any = result.name?.toLowerCase();
    const string1: any = name.toString();
    const result1: any = string1.replaceAll(" ", "-");
    if (!result.slug) {
      url = `${result.id}-${result1}`;
    } else {
      url = `${result.slug.toString()}`;
    }
console.log(result,'result')
    const MarkerContent = (
      <>
        <div className="flex w-full flex-col max-w-[24rem] md:w-[22.5rem] font-primary text-base address-with-availablity">
          <div className="location-name-miles">
            <h2>
              <Link className="inline-block notHighlight" href={result?.slug}>
                {result?.name}
              </Link>
            </h2>
          </div>

          <div className="content-col info-window-content">
            <div className="address">
              <div className="location-icon notHighlight">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.14285 2.06484C7.81904 2.06484 9.19046 3.44402 9.19046 5.12969C9.19046 6.73874 7.59046 9.34386 6.14285 11.1828C4.69523 9.26724 3.09523 6.73874 3.09523 5.12969C3.09523 3.44402 4.46666 2.06484 6.14285 2.06484ZM6.14285 0.53241C3.62856 0.53241 1.57142 2.60119 1.57142 5.12969C1.57142 8.57765 6.14285 13.558 6.14285 13.558C6.14285 13.558 10.7143 8.50103 10.7143 5.12969C10.7143 2.60119 8.65713 0.53241 6.14285 0.53241ZM6.14285 3.59726C5.30475 3.59726 4.61904 4.28685 4.61904 5.12969C4.61904 5.97252 5.30475 6.66212 6.14285 6.66212C6.98094 6.66212 7.66666 5.97252 7.66666 5.12969C7.66666 4.28685 6.98094 3.59726 6.14285 3.59726ZM12.2381 13.558C12.2381 15.2437 9.49523 16.6229 6.14285 16.6229C2.79046 16.6229 0.0476074 15.2437 0.0476074 13.558C0.0476074 12.562 0.961893 11.7191 2.40951 11.1062L2.86665 11.7957C2.10475 12.1789 1.57142 12.6386 1.57142 13.1749C1.57142 14.2476 3.62856 15.0905 6.14285 15.0905C8.65713 15.0905 10.7143 14.2476 10.7143 13.1749C10.7143 12.6386 10.1809 12.1789 9.34285 11.7957L9.79999 11.1062C11.3238 11.7191 12.2381 12.562 12.2381 13.558Z"
                    fill="#304F00"
                  ></path>
                </svg>
              </div>
              <Address address={result.address} />
            </div>
          </div>
          {result?.emails && (
            <div className="address notHighlight">
              <div className="telephone">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 37.332 25.2"
                >
                  <path
                    id="Icon_zocial-email"
                    data-name="Icon zocial-email"
                    d="M.072,27.036V6.3q0-.036.108-.684l12.2,10.44L.216,27.756a3.051,3.051,0,0,1-.144-.72Zm1.62-22.86A1.551,1.551,0,0,1,2.3,4.068H35.172a2.039,2.039,0,0,1,.648.108L23.58,14.652l-1.62,1.3-3.2,2.628-3.2-2.628-1.62-1.3ZM1.728,29.16,14,17.388l4.752,3.852,4.752-3.852L35.784,29.16a1.729,1.729,0,0,1-.612.108H2.3a1.631,1.631,0,0,1-.576-.108Zm23.4-13.1L37.3,5.616A2.149,2.149,0,0,1,37.4,6.3V27.036a2.759,2.759,0,0,1-.108.72Z"
                    transform="translate(-0.072 -4.068)"
                    fill="#304f00"
                  ></path>
                </svg>
              </div>
              <a href={`tel:${result?.emails}`}>{result?.emails}</a>
            </div>
          )}

         <Phone phone={result.phone} />
        </div>
        <div className="button-bx !ml-4 !mb-0">
          {result.phone && 
               <a className="cursor-pointer  getdirection btn" href={`tel:${result.phone}`}>
                 CALL
               </a>
           }
        </div>
        <div className="button-bx !ml-4 !mb-0">
          {result.displayCoordinate ? (
            <a
              data-listener="false"
              data-latitude={result?.displayCoordinate?.latitude}
              data-longitude={result?.displayCoordinate?.longitude}
              className="cursor-pointer  getdirection btn"
              rel="noopener noreferrer"
              data-city={result.address.city}
              data-country={result.address.countryCode}
              data-region={result.address.region}
              target="_blank"
              href={getDirectionUrl(result.address)}
            >
              {StaticData.getDirection}
            </a>
          ) : (
            <a
              data-listener="false"
              data-latitude={result?.yextDisplayCoordinate.latitude}
              data-longitude={result?.yextDisplayCoordinate.longitude}
              data-city={result.address.city}
              data-country={result.address.countryCode}
              data-region={result.address.region}
              className="cursor-pointer getdirection1 btn"
              rel="noopener noreferrer"
              target="_blank"
              href={getDirectionUrl(result.address)}
            >
              {StaticData.getDirection}
            </a>
          )}
        </div>
      </>
    );

    const string = renderToString(MarkerContent);
    infoWindow.current.setContent(string);
  }

  function deleteMarkers(): void {
    for (let i = 0; i < markers1.current.length; i++) {
      markers1.current[i].setMap(null);
      map?.setCenter(center);
    }
    markers1.current = [];
  }
  function userdeleteMarkers(): void {
    for (let i = 0; i < usermarker.current.length; i++) {
      usermarker.current[i].setMap(null);
    }
    usermarker.current = [];
  }

  return (
    <>
      <div className={containerCssClass} ref={ref} />
    </>
  );
}

function getPosition(result: Result) {
  const lat = result?.yextDisplayCoordinate
    ? (result as any)?.yextDisplayCoordinate.latitude
    : (result as any)?.displayCoordinate.latitude;
  const lng = result?.yextDisplayCoordinate
    ? (result as any)?.yextDisplayCoordinate.longitude
    : (result as any)?.displayCoordinate.longitude;
  return { lat, lng };
}

function scrollToRow(index: any) {
  const result: any = [].slice.call(
    document?.querySelectorAll(`.result`) || []
  )[0];
  const offset: any = [].slice.call(
    document?.querySelectorAll(`.result`) || []
  )[index];
  const o = offset.offsetTop - result.offsetTop;

  [].slice
    .call(document?.querySelectorAll(".scrollbar-container") || [])
    .forEach(function (el: any) {
      el.scrollTop = o;
    });
}
