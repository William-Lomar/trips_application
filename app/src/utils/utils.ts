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
        const error_code = error.response?.data.error_code;
        return mapCodeErrors[error_code] ?? 'Ocorreu um erro inesperado. Favor contatar o administrador do sistema';
    } else {
        return 'Ocorreu um erro inesperado. Favor contatar o administrador do sistema';
    }
}