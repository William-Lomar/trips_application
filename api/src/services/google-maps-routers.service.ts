import { IRoute, LatLng, RoutersImplements } from "../models/models";
import { Configs } from "../configs";
import axios from 'axios';
import { RouteNotFoundError } from "../errors/route-not-found.error";
import { RequestApiRouteError } from "../errors/request-api-route.error";

export interface RouteGoogleMapsResponse {
    routes: Route[];
}

interface Route {
    legs: Leg[];
}

interface Leg {
    distanceMeters: number;
    duration: string;
    staticDuration: string;
    polyline: Polyline;
    startLocation: Location;
    endLocation: Location;
    steps: Step[];
    localizedValues: LocalizedValues;
}

interface Polyline {
    encodedPolyline: string;
}

interface Location {
    latLng: LatLng;
}

interface Step {
    distanceMeters: number;
    staticDuration: string;
    polyline: Polyline;
    startLocation: Location;
    endLocation: Location;
    navigationInstruction: NavigationInstruction;
    localizedValues: StepLocalizedValues;
    travelMode: string;
}

interface NavigationInstruction {
    maneuver: string;
    instructions: string;
}

interface StepLocalizedValues {
    distance: LocalizedValue;
    staticDuration: LocalizedValue;
}

interface LocalizedValues {
    distance: LocalizedValue;
    duration: LocalizedValue;
    staticDuration: LocalizedValue;
}

interface LocalizedValue {
    text: string;
}

export class GoogleMapsRouters implements RoutersImplements {
    private url = new URL('directions/v2:computeRoutes', 'https://routes.googleapis.com')

    constructor() {
        this.url.searchParams.set('key', Configs.googleApiKey)
        this.url.searchParams.set('fields', 'routes.legs')
    }

    async getRoute(origin: string, destination: string): Promise<IRoute> {
        const routeGoogleMaps = await this.requestRoute(origin, destination);
        const { routes } = routeGoogleMaps;
        if (!routes || routes.length == 0) throw new RouteNotFoundError();

        const route = routes[0];
        const { legs } = route;

        if (legs.length == 0) throw new RouteNotFoundError();
        const leg = legs[0];

        return {
            origin: {
                latitude: leg.startLocation.latLng.latitude,
                longitude: leg.startLocation.latLng.longitude
            },
            destination: {
                latitude: leg.endLocation.latLng.latitude,
                longitude: leg.endLocation.latLng.longitude
            },
            distance: leg.distanceMeters,
            duration: leg.duration,
            routeResponse: routeGoogleMaps
        }
    }

    private async requestRoute(origin: string, destination: string): Promise<RouteGoogleMapsResponse> {
        const body = {
            origin: {
                address: origin
            },
            destination: {
                address: destination
            }
        }

        try {
            const res = await axios.post<RouteGoogleMapsResponse>(this.url.href, body);
            return res.data;
        } catch (error) {
            throw new RequestApiRouteError(error);
        }
    }
}