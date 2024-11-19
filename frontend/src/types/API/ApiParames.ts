import { AxiosRequestConfig } from "axios";

export type AuthToken = { headers: { Authorization: string } };

export interface APIParameters {
    url: string,
    data?: any | "",
    config?: AxiosRequestConfig<any | undefined> | AuthToken;
    secure: boolean,
};
