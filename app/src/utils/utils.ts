import { AxiosError } from "axios";

export function formatValue(value: number): string {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function formatDistance(distance: number): string {
    return distance + ' m';
}

const mapCodeErrors: Record<string, string> = {
    'DRIVER_NOT_FOUND': "Motorista não encontrado",
    'INTERNAL_SERVER_ERROR': "Ocorreu um erro interno no servidor. Favor contatar o administrador do sistema",
    'INVALID_DATA': "Dados solicitados inválidos",
    'INVALID_DISTANCE': "Quilometragem inválida para o motorista",
    'INVALID_DRIVER': "Motorista invalido",
    'NO_RIDES_FOUND': "Nenhuma corrida encontrada",
    'REQUEST_API_ROUTE_ERROR': "Servidor offline",
    'ROUTE_NOT_FOUND': "Rota não encontrada"
}

export function errorHandler(error: any): string {
    console.error(error);

    if (error instanceof AxiosError) {
        if (error.code == 'ERR_NETWORK') return 'API Offline';

        const error_code = error.response?.data.error_code;
        return mapCodeErrors[error_code] ?? 'Ocorreu um erro inesperado. Favor contatar o administrador do sistema';
    } else {
        return 'Ocorreu um erro inesperado. Favor contatar o administrador do sistema';
    }
}

export function formatDate(date: Date): string {
    const pad = (num: number): string => String(num).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Mês começa em 0
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}