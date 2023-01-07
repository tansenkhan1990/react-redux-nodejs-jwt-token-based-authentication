import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const API_BASE_URL = "http://localhost:3333";

export interface IAxiosHeader {
  [name: string]: any;
}

let axiosInstance: AxiosInstance;
const axiosOptions = { baseURL: `${API_BASE_URL}/` };

export default class Api {
  static get instance() {
    if (!axiosInstance) {
      axiosInstance = axios.create(axiosOptions);
    }

    return axiosInstance;
  }

  public static get(url: string, options: AxiosRequestConfig = {}) {
    return Api.request({ url, method: "get", ...options });
  }

  public static async post(
    url: string,
    data: any,
    options: AxiosRequestConfig = {}
  ) {
    return Api.request({ url, data, method: "post", ...options });
  }

  public static patch(
    url: string,
    data: any,
    options: AxiosRequestConfig = {}
  ) {
    return Api.request({ url, data, method: "patch", ...options });
  }

  public static put(url: string, data: any, options: AxiosRequestConfig = {}) {
    return Api.request({ url, data, method: "put", ...options });
  }

  public static delete(url: string, options: AxiosRequestConfig = {}) {
    return Api.request({ url, method: "delete", ...options });
  }

  protected static async request(params: AxiosRequestConfig) {
    const headers = { ...params.headers } as IAxiosHeader;

    const token = localStorage.getItem("jwt");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let { url } = params;

    return Api.instance
      .request({
        method: params.method,
        data: params.data,
        ...params,
        url,
        headers,
      })
      .then((response) => response.data);
  }
}
