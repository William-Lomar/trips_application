import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import History from './pages/History/History';
import { RideService } from './services/ride.service';

const rideService = new RideService();

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home rideService={rideService} />}></Route>
            <Route path='history' element={<History />}></Route>
            <Route path='*' element={<Home rideService={rideService} />}></Route>
        </Routes>
    )
}