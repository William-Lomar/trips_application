import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import { RideService } from './services/ride.service';
import { DriverService } from './services/driver.service';

const rideService = new RideService();
const driverService = new DriverService();

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home rideService={rideService} />}></Route>
            <Route path='history' element={<History rideService={rideService} driverService={driverService} />}></Route>
            <Route path='*' element={<Home rideService={rideService} />}></Route>
        </Routes>
    )
}