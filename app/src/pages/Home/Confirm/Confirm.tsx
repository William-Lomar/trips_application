import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import './Confirm.css';
import { formatDistance, formatValue } from "../../../utils/utils";

export interface IConfirmInfo {
    customer_id: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: {
        id: number,
        name: string
    },
    value: number
}

interface IConfirmInput {
    confirmInfo: IConfirmInfo,
    open: boolean,
    onConfirm: (confirmInfo: IConfirmInfo) => void,
    onCancel: () => void
}

export default function Confirm({ confirmInfo, open, onConfirm, onCancel }: IConfirmInput) {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Deseja confirmar sua viagem?
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText primary="Origem:" secondary={confirmInfo.origin} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Destino:" secondary={confirmInfo.destination} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Distancia:" secondary={formatDistance(confirmInfo.distance)} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
                        <List dense={true}>
                            <ListItem>
                                <ListItemText primary="Motorista:" secondary={confirmInfo.driver.name} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Valor:" secondary={formatValue(confirmInfo.value)} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Duração:" secondary={confirmInfo.duration} />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button onClick={() => onConfirm(confirmInfo)} autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}