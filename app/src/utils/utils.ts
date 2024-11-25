export function formatValue(value: number): string {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function formatDistance(distance: number): string {
    return distance + ' m';
}

