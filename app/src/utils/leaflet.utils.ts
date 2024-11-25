import L from 'leaflet';
import { NEstimate } from '../models/models';

//TODO: Criar um seletor de tiles
const OpenStreetMapTile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

const CartoDBVoyagerTile = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
})

export function createMap(id: string): L.Map {
    const map = L.map(id).setView([-14.235, -51.9253], 4);
    CartoDBVoyagerTile.addTo(map);
    return map;
}

//TODO
export function drawRoute(estimated: NEstimate.IOutput, route: L.FeatureGroup) {
    route.clearLayers();
    console.log("Carmae");
}
