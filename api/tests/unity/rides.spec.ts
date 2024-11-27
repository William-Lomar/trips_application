import { DriverDAO, IDriver } from '../../src/daos/driver.dao';
import { IRide, IRideInfo, IRidePost, RideDAO } from '../../src/daos/ride.dao';
import { IRoute, RoutersImplements } from '../../src/models/models';
import { RouteGoogleMapsResponse } from '../../src/services/google-maps-routers.service';
import { RideService } from '../../src/services/ride.service';

class RoutersMock implements RoutersImplements {
    getRoute(origin: string, destination: string): Promise<IRoute> {
        return Promise.resolve({
            origin: {
                latitude: 10,
                longitude: 10
            },
            destination: {
                latitude: 15,
                longitude: 15
            },
            /** distance meters */
            distance: 7000,
            duration: '1000s',
            routeResponse: {} as RouteGoogleMapsResponse
        })
    }
}

class DriverDAOMoock implements DriverDAO {
    getAvailableByDistance(distanceMeters: number): Promise<IDriver[]> {
        return Promise.resolve([
            {
                id_driver: 999,
                name_driver: 'mock',
                description_driver: 'mock',
                vehicle_driver: 'mock',
                rate_driver: 4,
                rating_driver: 2,
                comment_driver: 'mock',
                km_min_driver: 5
            }
        ])
    }

    get(filter?: { id_driver?: number; }): Promise<IDriver[]> {
        return Promise.resolve([{
            id_driver: 999,
            name_driver: 'mock',
            description_driver: 'mock',
            vehicle_driver: 'mock',
            rate_driver: 4,
            rating_driver: 2,
            comment_driver: 'mock',
            km_min_driver: 5
        }])
    }
}

class RideDAOMock implements RideDAO {
    get(filter?: { customer_id?: string; id_driver?: number; }): Promise<IRideInfo[]> {
        return Promise.resolve([
            {
                id_ride: 1,
                customer_id: 'william_teste',
                date_ride: new Date(),
                origin_ride: 'mock',
                destination_ride: 'mock',
                distance_ride: 7000,
                duration_ride: 'mock',
                id_driver: 1,
                value_ride: 999,
                name_driver: 'mock'
            }
        ]);
    }

    post(ride: IRidePost): Promise<IRide> {
        return Promise.resolve({} as IRide)
    }
}

it('Deve testar o serviço isoladamente - RidesService', async () => {
    const rideService = new RideService(
        new RoutersMock(),
        new DriverDAOMoock(),
        new RideDAOMock()
    )

    const customer_id = "william_teste";
    const origin = "1600 Amphitheatre Parkway, Mountain View, CA";
    const destination = "450 Serra Mall, Stanford, CA 94305, USA";

    const estimateInput = {
        customer_id,
        origin,
        destination
    }

    const estimated = await rideService.estimate(estimateInput);
    expect(estimated.distance).toBe(7000);
    expect(estimated.duration).toBe('1000s');
    expect(estimated.options[0].id).toBe(999);
    expect(estimated.options[0].name).toBe('mock');


    const driver = estimated.options[0];
    const confirm = {
        customer_id,
        origin,
        destination,
        distance: estimated.distance,
        duration: estimated.duration,
        driver: {
            id: driver.id,
            name: driver.name
        },
        value: driver.value
    }

    await rideService.confirm(confirm);

    const infoRides = await rideService.getRides({ customer_id });

    expect(infoRides.customer_id).toBe(customer_id);
    expect(infoRides.rides.length).toBe(1);
})