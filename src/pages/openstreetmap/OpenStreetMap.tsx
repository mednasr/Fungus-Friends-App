import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import Api, { Mushroom } from '../../api/front-end api'
import MapView from '../../utils/MapView';
import { getMushroomAverage } from '../../utils/Core'
import SelectBoxes from '../../components/selectboxes/SelectBoxes'

const defaultLatLng: LatLngTuple = [52.080986, 5.2359];
const zoom: number = 20;

const OpenStreetMap: React.FC = () => {
    const [mushroomsIist, setMushrooms] = useState<Mushroom[]>([])
    const [mainPosition, setAverage] = useState<LatLngTuple>(defaultLatLng)

    const fetchData = async () => {
        const mushrooms = await Api();
        if (mushrooms.length <= 0) {
            throw new Error('Data still fetching...');
        }
        const average = getMushroomAverage(mushrooms);
        if (average.lat <= 0 || average.lng <= 0) {
            throw new Error('Doing the average...');
        }
        setMushrooms(mushrooms);
        setAverage([average.lat / mushrooms.length, average.lng / mushrooms.length])
    };

    useEffect(() => {
        fetchData()
            .catch((e) => {
                console.log(e.message);
            });
    }, [])

    return (
        <MapContainer className="container"
    center={mainPosition}
    zoom={zoom}>
    <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapView center={mainPosition} />
    <SelectBoxes mushrooms={mushroomsIist} />
    </MapContainer>
)
}

export default OpenStreetMap;
