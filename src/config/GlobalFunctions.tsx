import LocationData  from "../types/locations";
import defaultMarker from "../images/map-center.svg";
import hoverMarker from "../images/map-hover.svg";
import cluster from "../images/cluster.png";



export const getMarkerPin = (
    result: LocationData,
    isActive = false,
    isHover = false
  ) => {
    let marker = defaultMarker;
    if (isHover) {
      marker = hoverMarker;
    } else if (isActive) {
      marker = hoverMarker;
    }
    const m_icon = {
      url: marker,
      id: result.id,
    };
    return m_icon;
  };
  export const getPosition = (result: LocationData) => {
    const lat = result.yextDisplayCoordinate?.latitude;
    const lng = result.yextDisplayCoordinate?.longitude;
    return { lat, lng };
  };
  export const getClusterIcon = () => {
    return cluster;
  };