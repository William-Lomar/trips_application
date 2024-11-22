import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import History from './pages/History/History';

export default function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='history' element={<History />}></Route>
            <Route path='*' element={<Home />}></Route>
        </Routes>
    )
}