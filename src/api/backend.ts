/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { FindUniqueParams, ManyResponse, Params } from "../utils/types";
import { env } from "../utils/env";
import { convertFindUniqueParams, convertParams } from "../utils/function";

export type GroupData = {
  id?: number;
  name: string;
  location?: string;
  lat?: number;
  lng?: number;
  ip?: string;
};

export type HistoryResponse = {
  id: number;
  name: string;
  temperature: {
    value: number;
    createdAt: Date;
    [key: string]: any;
  }[];
  humidity: {
    value: number;
    createdAt: Date;
    [key: string]: any;
  }[];
  [key: string]: any;
};

export type DeviceData = {
  id?: number;
  name: string;
  serial: string;
  description?: string;
  groupId?: number;
};
export default class BackendApi {
  // private retryCounter:number = 0;
  // private maxRetry:number = 3;
  private api = axios.create({
    baseURL: env.VITE_BACK_API,
    timeout: 10000,
  });

  constructor({
    tenantId = undefined,
    accessToken = "",
    logout = undefined,
  }: {
    tenantId?: number;
    accessToken?: string;
    logout?: () => void;
  }) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    if (tenantId) this.api.defaults.headers.common["tenant-id"] = tenantId;

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout && logout();
        }
        return Promise.reject(error);
      }
    );
    // this.api.interceptors.response.use (
    //   (response) => {
    //     this.retryCounter = 1;
    //     return response;
    //   },
    //   async (error) => {
    //     if ((error.message).includes("timeout") && this.retryCounter < this.maxRetry) {
    //       this.retryCounter++;
    //       await this.waitBeforeRetry();
    //       return this.api(error.config);
    //     }
    //   }
    // )
  }

  // async waitBeforeRetry() {
  //   const delay = 1000; // Exponential backoff
  //   await new Promise(resolve => setTimeout(resolve, delay));
  // }
  async findMany<T = any>(
    path: string,
    params?: Params
  ): Promise<ManyResponse<T>> {
    const res = await this.api.get(path, {
      params: params ? convertParams(params) : undefined,
    });
    return res?.data || [];
  }

  async findUnique<T>(
    path: string,
    id: number | string,
    params?: FindUniqueParams
  ): Promise<T> {
    const res = await this.api.get(`${path}/${id}`, {
      params: params ? convertFindUniqueParams(params) : undefined,
    });
    return res?.data || {} ;
  }

}
