import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import './History.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { errorHandler, formatDate, formatValue } from "../../utils/utils";
import { IDriver, NGetRides } from "../../models/models";
import { RideService } from "../../services/ride.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ErrorDialog } from "../../shared/ErrorDialog/ErrorDialog";
import { DriverService } from "../../services/driver.service";

interface IHistoryInputs {
    rideService: RideService,
    driverService: DriverService
}

export default function History({ rideService, driverService }: IHistoryInputs) {
    const [driverId, setDriverId] = useState<number>(-1);
    const [drivers, setDrivers] = useState<IDriver[]>([]);
    const [customerId, setCustomerId] = useState('');
    const [rides, setRides] = useState<NGetRides.IRide[]>([]);
    const [errorInputs, setErrorInputs] = useState({ message: "", open: false, goHome: false });
    const [searchParams] = useSearchParams();
    const navigation = useNavigate();

    useEffect(() => {
        const customer_id = searchParams.get("customer_id")
        if (customer_id) {
            setCustomerId(customer_id);
        } else {
            setErrorInputs({
                message: "Para acessar essa tela é necessário passar pela tela inicial da aplicação",
                open: true,
                goHome: true
            })

            return
        }

        Promise.all([
            driverService.getDrivers(),
            rideService.getRides({ customer_id: customer_id, driver_id: driverId > -1 ? driverId : undefined })
        ]).then(([drivers, ridesResponse]) => {
            setDrivers(drivers.concat({ id: -1, name: "Todos" }));
            setRides(ridesResponse.rides);
        }).catch((err) => {
            setErrorInputs({
                message: errorHandler(err),
                open: true,
                goHome: false
            })
        })
    }, [])

    const driverChange = (e: any) => {
        const driverId = Number(e.target.value);
        setDriverId(driverId);

        rideService.getRides({ customer_id: customerId, driver_id: driverId > -1 ? driverId : undefined }).then((res) => {
            setRides(res.rides);
        }).catch((err) => {
            setRides([]);
            setErrorInputs({
                message: errorHandler(err),
                open: true,
                goHome: false
            })
        })
    }

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Data', valueFormatter: (date: Date) => formatDate(date), width: 140 },
        { field: 'origin', headerName: 'Origem', flex: 1 },
        { field: 'destination', headerName: 'Destino', flex: 1 },
        { field: 'distance', headerName: 'Distancia', flex: 1, valueFormatter: (distance) => distance + ' m' },
        { field: 'duration', headerName: 'Duração', flex: 1 },
        { field: 'driver', headerName: 'Motorista', flex: 1, valueFormatter: (driver: IDriver) => driver.name },
        { field: 'value', headerName: 'Valor', flex: 1, valueFormatter: (value) => formatValue(value) }
    ]

    return (
        <div className="container">
            <div className="history-form">
                <TextField label="Usuário" variant="outlined" value={customerId}
                    slotProps={{
                        input: {
                            readOnly: true,
                        }
                    }} />
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="select-label">Motorista</InputLabel>
                    <Select autoWidth={true}
                        labelId="select-label"
                        value={driverId}
                        label='Motorista'
                        onChange={driverChange}
                    >
                        {
                            drivers.map((driver, i) => {
                                return <MenuItem key={i} value={driver.id}>{driver.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>

            </div>
            <div className="rides">
                <DataGrid
                    rows={rides}
                    columns={columns}
                    density="compact"
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                    pageSizeOptions={[10, 20, 30]}
                    sx={{ border: 0, width: '100%' }}
                />
            </div>

            <ErrorDialog message={errorInputs.message} open={errorInputs.open} onClose={() => {
                if (errorInputs.goHome) {
                    navigation('/');
                }

                setErrorInputs({ open: false, message: '', goHome: false });
            }} />
        </div>
    )
}