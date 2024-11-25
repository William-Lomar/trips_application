import { NEstimate, NConfirm, NGetRides } from "../models/models";
import { IOption } from "../pages/Home/Option/Option";

const mockOptions: IOption[] = [
    {
        id: 1,
        name: 'William',
        description: "Devagar e sempre",
        review: {
            comment: "Lento com força",
            rating: 3
        },
        value: 100,
        vehicle: "HB20"
    },
    {
        id: 2,
        name: 'Guilherme',
        description: "Bora q bora",
        review: {
            comment: "Rapido, mas erra o caminho direto",
            rating: 3
        },
        value: 50,
        vehicle: "Bicicreta"
    }
]

export class RideService {
    async estimate(input: NEstimate.IInput): Promise<NEstimate.IOutput> {
        // return Promise.reject("Teste");
        //TODO
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    origin: { latitude: 0, longitude: 0 },
                    destination: { latitude: 0, longitude: 0 },
                    distance: 1000,
                    duration: '10 min',
                    routeResponse: {} as any,
                    options: mockOptions
                })
            }, 1000);
        })
    }

    async confirm(input: NConfirm.IInput): Promise<NConfirm.IOutput> {
        //TODO
        // return Promise.reject("Teste");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        })
    }

    async getRides(input: NGetRides.IInput): Promise<NGetRides.IOutput> {
        //TODO
        return {} as any
    }
}