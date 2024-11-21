import { getString } from "../utils";

export class CustomError extends Error {
    private error_description: string;

    constructor(error: any, private error_code: string, private _status: number) {
        const error_description = getString(error);

        super(error_description);
        this.error_description = error_description;
    }

    get status() {
        return this._status;
    }

    json(): { error_code: string; error_description: string; } {
        return {
            error_code: this.error_code,
            error_description: this.error_description
        }
    }
}

