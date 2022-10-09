const { LayersControl, Marker, Popup, LayerGroup } = require('react-leaflet');
const images = ["https://st4.depositphotos.com/2499977/22081/i/1600/depositphotos_220816260-stock-photo-red-mushroom-white-spots.jpg", "https://healing-mushrooms.net/wp-content/uploads/2020/09/Amanita-flavoconia-scaled.jpg", "https://i.pinimg.com/originals/e7/d1/f2/e7d1f245475fdff01dd15475f355eb4e.jpg", "https://images.pond5.com/blue-magic-mushroom-hyper-rotating-footage-075929121_iconl.jpeg", "https://image.shutterstock.com/shutterstock/photos/1536728906/display_1500/stock-photo-mushrooms-and-fungi-red-and-white-with-dots-1536728906.jpg", "https://previews.123rf.com/images/thomasmales/thomasmales1710/thomasmales171000036/87820250-fly-agaric-mushroom-is-bright-red-with-white-dots.jpg", "https://image.sciencenordic.com/1969848.jpg?imageId=1969848&panow=100&panoh=100&panox=0&panoy=0&heightw=100&heighth=100&heightx=0&heighty=0&width=1200&height=1200", "https://i5.walmartimages.com/asr/3f7d979b-ad9b-4818-bd8d-979a77e9166e_1.2101f395a1cd88e44c71c510a0addb7f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"];

const getMushroomAverage = (mushrooms) => {
    return mushrooms.reduce((total, next) => {
        const [lat, lng] = next.latlng;
        total.lat += lat;
        total.lng += lng;
        return total;
    }, { lat: 0, lng: 0})
}

const getColorName = (id) => {
    const colors = ['Red', 'Green', 'Yellow', 'Blue'];
    return colors[id];
}

const getSpotName = (id) => {
    const spots = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
    return spots[id];
}

const getRandomImage = () => {
    return images[(Math.random() * images.length) | 0];
}

const generateLayer = (filter, getName, mushroom, mushrooms, layer) => {
    return  <LayersControl.Overlay name={getName(mushroom[filter])} key={layer.length} checked>
        <LayerGroup>
            {mushrooms.filter((el) => el[filter] === mushroom[filter]).map((el, index) => {
                return  <Marker key={index} position={el.latlng}>
                    <Popup>
                        {el.name} - {el.spots}
                        <img width="100%" height="100%" alt="mushroom" src={getRandomImage()} />
                    </Popup>
                </Marker>
            })}
        </LayerGroup>
    </LayersControl.Overlay>
}

export {
    getMushroomAverage,
    getColorName,
    getSpotName,
    generateLayer
};
