import L from 'leaflet';
import { NEstimate } from '../models/models';
import { decode } from '@googlemaps/polyline-codec';

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

function getIconMarker(type: 'origin' | 'destination'): L.Icon {
    return L.icon({ iconUrl: type == 'origin' ? 'map-pin-solid.png' : 'location-dot-solid.png', iconSize: [20, 26.6], iconAnchor: [10, 26.6] })
}

export function getRouteLayers(estimated: NEstimate.IOutput): { originLayer: L.Marker, destinationLayer: L.Marker, routeLayer: L.Polyline } {
    const originLayer = L.marker({ lat: estimated.origin.latitude, lng: estimated.origin.longitude }, { icon: getIconMarker('origin') })
    const destinationLayer = L.marker({ lat: estimated.destination.latitude, lng: estimated.destination.longitude }, { icon: getIconMarker('destination') })
    const routeLayer = L.polyline(decode(estimated.routeResponse.routes[0].legs[0].polyline.encodedPolyline));

    return { originLayer, destinationLayer, routeLayer }
}

