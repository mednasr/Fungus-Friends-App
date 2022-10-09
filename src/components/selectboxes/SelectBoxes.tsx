import React from 'react';
import { LayersControl } from 'react-leaflet';
import { Color, Mushroom, Spots } from '../../api/front-end api';
import { getColorName, getSpotName, generateLayer } from '../../utils/Core';

const SelectBoxes = ({mushrooms}: { mushrooms: Mushroom[] }) => {
    const colorLayer: React.ReactElement[] = [];
    const spotLayer: React.ReactElement[] = [];

    const initLayer = () => {
        const layerColorsList: { color: Color, id: number }[] = [];
        const layerSpotsList: { spots: Spots, id: number }[] = [];

        mushrooms.forEach(mushroom => {
            if (layerColorsList.findIndex((el) => el.color === mushroom.color) === -1) {
                const id = colorLayer.push(generateLayer('color', getColorName, mushroom, mushrooms, colorLayer)) - 1;
                layerColorsList.push({ color: mushroom.color, id });
            }
            if (layerSpotsList.findIndex((el) => el.spots === mushroom.spots) === -1) {
                const id = spotLayer.push(generateLayer('spots', getSpotName, mushroom, mushrooms, spotLayer)) - 1;
                layerSpotsList.push({ spots: mushroom.spots, id });
            }
        })
    }

    initLayer();

    return (
        <>
            <LayersControl position='topright'>
            {spotLayer}
            </LayersControl>
            <LayersControl position='topright'>
        {colorLayer}
        </LayersControl>
        </>
)
}

export default SelectBoxes;
