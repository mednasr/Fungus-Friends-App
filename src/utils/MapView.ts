import { LatLngTuple } from "leaflet";
import { useMap } from "react-leaflet";

function MapView({ center }: { center: LatLngTuple }) {
    const map = useMap();
    map.setView(center);
    return null;
}

export default MapView;
