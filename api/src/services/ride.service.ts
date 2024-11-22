import { DriverDAO } from "../daos/driver.dao";
import { IRidePost, RideDAO } from "../daos/ride.dao";
import { DriverNotFoundError } from "../errors/driver-not-found.error";
import { InvalidDistanceError } from "../errors/invalid-distance.error";
import { NConfirm, NEstimate, NGetRides, RoutersImplements } from "../models/models";
import { metersToKilometers } from "../utils";

export class RideService {
    constructor(
        private routersService: RoutersImplements,
        private driverDAO: DriverDAO,
        private rideDAO: RideDAO
    ) { }

    async estimate(input: NEstimate.IInput): Promise<NEstimate.IOutput> {
        const route = await this.routersService.getRoute(input.origin, input.destination);
        const drivers = await this.driverDAO.getByMinDistance(route.distance);

        const distanceKlm = metersToKilometers(route.distance);

        return {
            ...route,
            options: drivers.map((drive) => {
                return {
                    id: drive.id_driver,
                    description: drive.description_driver,
                    name: drive.name_driver,
                    vehicle: drive.vehicle_driver,
                    review: {
                        rating: drive.rating_driver,
                        comment: drive.comment_driver
                    },
                    value: distanceKlm * drive.rate_driver
                }
            })
        }
    }

    async confirm(input: NConfirm.IInput): Promise<NConfirm.IOutput> {
        const [driver] = await this.driverDAO.get({ id_driver: input.driver.id });
        if (!driver) throw new DriverNotFoundError();
        if (metersToKilometers(input.distance) <= driver.km_min_driver) throw new InvalidDistanceError();

        const ridePost: IRidePost = {
            customer_id: input.customer_id,
            date_ride: new Date(),
            origin_ride: input.origin,
            destination_ride: input.destination,
            distance_ride: input.distance,
            duration_ride: input.duration,
            id_driver: input.driver.id,
            value_ride: input.value
        }

        await this.rideDAO.post(ridePost);
        return { "success": true }
    }

    async getRides(input: NGetRides.IInput): Promise<NGetRides.IOutput> {
        const rides = await this.rideDAO.get({
            customer_id: input.customer_id,
            id_driver: input.driver_id
        })

        return {
            customer_id: input.customer_id,
            rides: rides.map((ride) => {
                return {
                    id: ride.id_ride,
                    date: ride.date_ride,
                    origin: ride.origin_ride,
                    destination: ride.destination_ride,
                    distance: ride.distance_ride,
                    duration: ride.duration_ride,
                    value: ride.value_ride,
                    driver: {
                        id: ride.id_driver,
                        name: ride.name_driver
                    }
                }
            })
        }
    }
}