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

export interface LatLng {
    latitude: number;
    longitude: number;
}

export interface IRoute {
    origin: LatLng,
    destination: LatLng,
    /** distance meters */
    distance: number,
    duration: string,
    routeResponse: RouteGoogleMapsResponse
}

export abstract class RoutersImplements {
    abstract getRoute(origin: string, destination: string): Promise<IRoute>
}

export interface IDriver {
    id: number,
    name: string
}

export namespace NEstimate {
    export interface IInput {
        customer_id: string,
        origin: string,
        destination: string
    }

    export interface IRideOption {
        id: number,
        name: string,
        description: string,
        vehicle: string,
        review: {
            rating: number,
            comment: string
        },
        value: number
    }

    export interface IOutput extends IRoute {
        options: IRideOption[]
    }
}

export namespace NConfirm {
    export interface IInput {
        customer_id: string,
        origin: string,
        destination: string,
        distance: number,
        duration: string,
        driver: IDriver,
        value: number
    }

    export interface IOutput {
        success: true
    }
}

export namespace NGetRides {
    export interface IRide {
        id: number,
        date: Date,
        origin: string,
        destination: string,
        distance: number,
        duration: string,
        driver: IDriver,
        value: number
    }

    export interface IInput {
        customer_id: string
        driver_id?: number
    }

    export interface IOutput {
        customer_id: string,
        rides: IRide[]
    }
}




