export interface IDriver {
    id: number,
    name: string
}

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

export namespace NEstimate {
    export interface IInput {
        customer_id: string,
        origin: string,
        destination: string
    }

    export interface IOutput {
        origin: {
            latitude: number,
            longitude: number
        },
        destination: {
            latitude: number,
            longitude: number
        },
        distance: number,
        duration: string,
        options: [
            {
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
        ],
        routeResponse: object
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
    export interface IInput {
        customer_id: string
        driver_id?: string
    }

    export interface IOutput {
        customer_id: string,
        rides: IRide[]
    }
}




