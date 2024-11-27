import { Button, CircularProgress, TextField } from '@mui/material';
import './Home.css';
import Option, { IOption } from './Option/Option';
import Confirm, { IConfirmInfo } from './Confirm/Confirm';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createMap, getRouteLayers } from '../../utils/leaflet.utils';
import { RideService } from '../../services/ride.service';
import { NEstimate } from '../../models/models';
import { useNavigate } from 'react-router-dom';
import GlobalLoading from '../../shared/GlobalLoading/GlobalLoading';
import { ErrorDialog } from '../../shared/ErrorDialog/ErrorDialog';
import { errorHandler } from '../../utils/utils';

export interface IHomeInputs {
    rideService: RideService
}

export default function Home({ rideService }: IHomeInputs) {
    const navigate = useNavigate();

    const map = useRef<L.Map>();
    const route = useRef(L.featureGroup());

    const [confirmInputs, setConfirmInputs] = useState<{ confirmInfo?: IConfirmInfo, open: boolean }>({
        confirmInfo: undefined,
        open: false
    })

    const [customer_id, setCustomerId] = useState<string>('');
    const [origin, setOrign] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [validation, setValidation] = useState({
        customerIdError: false,
        originError: false,
        destinationError: false
    })

    const [loadingOptions, setLoadingOptions] = useState(false);
    const [estimated, setEstimated] = useState<NEstimate.IOutput>();

    const [loading, setLoading] = useState(false);
    const [errorInputs, setErrorInputs] = useState({ message: "", open: false });

    useEffect(() => {
        map.current = createMap('map');
        map.current.addLayer(route.current);
    }, []);

    const chooseOption = (option: IOption) => {
        if (!estimated) {
            setErrorInputs({
                message: "Para escolher uma opção já deve ter sido processado uma estimativa da viagem",
                open: true
            })
            return;
        }

        setConfirmInputs({
            confirmInfo: {
                customer_id,
                origin,
                destination,
                distance: estimated.distance,
                driver: {
                    id: option.id,
                    name: option.name
                },
                duration: estimated.duration,
                value: option.value
            },
            open: true
        })
    }

    const confirm = (confirmInfo: IConfirmInfo) => {
        setLoading(true);
        rideService.confirm(confirmInfo).then(() => {
            navigate(`history?customer_id=${customer_id}`);
        }).catch((err) => {
            setErrorInputs({
                message: errorHandler(err),
                open: true
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    const cancel = () => {
        setConfirmInputs({
            confirmInfo: undefined,
            open: false
        })
    }

    const estimate = () => {
        const customerIdError = !Boolean(customer_id);
        const originError = !Boolean(origin);
        const destinationError = !Boolean(destination);

        setValidation({ customerIdError, originError, destinationError })
        if (customerIdError || originError || destinationError) return

        setLoadingOptions(true);
        rideService.estimate({ customer_id, origin, destination }).then((estimated) => {
            setEstimated(estimated);
            const { originLayer, destinationLayer, routeLayer } = getRouteLayers(estimated);
            route.current.addLayer(originLayer);
            route.current.addLayer(destinationLayer);
            route.current.addLayer(routeLayer);
            map.current?.fitBounds(route.current.getBounds());
        }).catch((err) => {
            setErrorInputs({
                message: errorHandler(err),
                open: true
            })
        }).finally(() => setLoadingOptions(false));
    }

    const reset = () => {
        route.current.clearLayers();
        setEstimated(undefined);
        setCustomerId('');
        setOrign('');
        setDestination('');
        setValidation({ customerIdError: false, destinationError: false, originError: false });
    }

    return (
        <div className="container-home">
            <div className="side-bar">
                <div className='form'>
                    <TextField disabled={Boolean(estimated) || loadingOptions} error={validation.customerIdError} required={true} value={customer_id} onChange={(e) => setCustomerId(e.target.value)} label="Usuário" variant="outlined" fullWidth={true} margin='normal' size='small' />
                    <TextField disabled={Boolean(estimated) || loadingOptions} error={validation.originError} required={true} value={origin} onChange={(e) => setOrign(e.target.value)} label="Origem" variant="outlined" fullWidth={true} margin='normal' size='small' />
                    <TextField disabled={Boolean(estimated) || loadingOptions} error={validation.destinationError} required={true} value={destination} onChange={(e) => setDestination(e.target.value)} label="Destino" variant="outlined" fullWidth={true} margin='normal' size='small' />

                    <div className='btn'>
                        {
                            estimated ? <Button variant="contained" onClick={reset}>Recalcular</Button>
                                : <Button variant="contained" onClick={estimate} disabled={loadingOptions}>Calcular</Button>
                        }
                    </div>
                    <div className='divider' />
                </div>

                <div className='options'>
                    {
                        loadingOptions ?
                            <div className='progress'>
                                <CircularProgress />
                            </div>
                            : estimated?.options.map((option, i) => {
                                return <Option key={i} option={option} onClick={chooseOption} />
                            })
                    }
                </div>
            </div>
            <div className="map-container" id="map" />
            {
                confirmInputs.confirmInfo ?
                    <Confirm
                        confirmInfo={confirmInputs.confirmInfo}
                        open={confirmInputs.open}
                        onConfirm={confirm}
                        onCancel={cancel}
                    />
                    : null
            }
            <GlobalLoading loading={loading} />
            <ErrorDialog open={errorInputs.open} message={errorInputs.message} onClose={() => { setErrorInputs({ open: false, message: '' }); }} />
        </div>
    )
}