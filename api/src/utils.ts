export function getString(message: any): string {
    if (typeof message == 'string') {
        return message;
    } else if (message === null || message === undefined) {
        return '';
    } else if (message instanceof Error) {
        return message.message;
    } else {
        return JSON.stringify(message, null, 2);
    }
}