import axios from "axios";
import { AxiosInstance } from "axios";
import { ErrorHandler } from "@angular/core";
import { Injectable } from "@angular/core"; 


export interface Params {
    [key: string]: any;
}

export interface Options {
    url: string;
    params?: Params;
}

export interface ErrorInfo {
    id: string;
    code: string;
    message: string;
}

@Injectable({
	providedIn: "root"
})
export class AxiosService {
    private axiosClient: AxiosInstance;
    private errorHandler: ErrorHandler; // angular error handling injected

    constructor(errorHandler?: ErrorHandler) {
        this.errorHandler = errorHandler;
        this.axiosClient = axios.create({
            timeout: 3000,
        }); // creating an Axios instance
    }


    // I have no fucking idea why Angular does not directly support Axios
    // Axios already has support for TS.
    // https://github.com/axios/axios/blob/v0.19.0/index.d.ts
    // get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    // for more info visit: https://levelup.gitconnected.com/a-typescript-safe-api-82cc22c4f92d
    // here we are making a function wrapper that encapsulates the axios generic request function
    // where T is the generic type for the requested data.
    
    public async get<T> (options: Options): Promise<T> {
        try {
            let apiResponse = await this.axiosClient.request<T>({
                method: "get",
                url: options.url,
                params: options.params,
            });

            return apiResponse.data;
        }
        catch(error) {
            return Promise.reject(this.normalizeError(error));
        }
    }

    private normalizeError(error: any): ErrorInfo {
        this.errorHandler.handleError(error);
        let errorObj: ErrorInfo = {
            id: '-1',
            code: 'idk',
            message: 'something went wrong'
        }
        return errorObj;
    }

};
