import { CircularProgress } from "@mui/material";
import './GlobalLoading.css';

interface IGlobalLoadingInput {
    loading: boolean
}

export default function GlobalLoading({ loading }: IGlobalLoadingInput) {
    return (
        loading ?
            <div className="global-loading">
                <CircularProgress />
            </div>
            : null
    )
}