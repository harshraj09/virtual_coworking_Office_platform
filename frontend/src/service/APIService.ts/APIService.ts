import axios, { AxiosInstance, AxiosResponse } from "axios";
import { APIParameters, AuthToken } from "../../types/API/ApiParames";
class APIService {
    private static authToken: AuthToken | undefined;
    public static axiosInstance: AxiosInstance;
    private static baseUrl: string = "http://localhost:8000";
    private static token: string | undefined;

    static {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.token = this.getItem("token") || "";
        this.setAuthToken();
    }

    private static setAuthToken(): void {
        this.authToken = { headers: { Authorization: `Bearear ${this.token}` } }
    }

    public static setItem(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static getItem(key: string): any | null {
        const data = JSON.parse(localStorage.getItem(key) as string);
        return data;
    }

    public static async getRequst(parameters: APIParameters): Promise<AxiosResponse<any>> {
        let responce: AxiosResponse<any>;
        const { url, secure } = parameters;
        if (secure) {
            responce = await this.axiosInstance.get(url, this.authToken);
            return responce;
        }
        responce = await this.axiosInstance.get(url);
        return responce;
    }

    public static async postRequest(parameters: APIParameters): Promise<AxiosResponse<any>> {
        let responce: AxiosResponse<any>;
        const { url, data, secure } = parameters;
        this.setAuthToken();
        if (secure) {
            responce = await this.axiosInstance.post(url, data, this.authToken);
            return responce;
        }
        responce = await this.axiosInstance.post(url, data);
        return responce;

    }

    public static async putRequest(parameters: APIParameters): Promise<AxiosResponse<any>> {
        let responce: AxiosResponse<any>;
        const { url, data, secure } = parameters;
        if (secure) {
            responce = await this.axiosInstance.put(url, data, this.authToken);
            return responce;
        }
        responce = await this.axiosInstance.put(url, data);
        return responce;
    }

    public static async deleteRequest(parameters: APIParameters): Promise<AxiosResponse<any>> {
        let responce: AxiosResponse<any>;
        const { url, secure } = parameters;
        if (secure) {
            responce = await this.axiosInstance.delete(url, this.authToken);
            return responce;
        }
        responce = await this.axiosInstance.delete(url);
        return responce;
    }
}

export default APIService;
