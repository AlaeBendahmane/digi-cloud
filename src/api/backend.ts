import { ManyResponse, User, FindManyParams, FindByIdParams } from "../utils/types";
import { env } from "../utils/env";
import axios, { AxiosRequestConfig } from "axios";

export function stringify(value: unknown) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export function convertParams(params?: FindManyParams) {
  if (!params) return undefined;
  const { pagination, where, orderBy, include, select } = params;

  return {
    take: pagination?.perPage,
    skip: pagination && (pagination.page - 1) * pagination.perPage,
    where: where && stringify(where),
    orderBy: orderBy && stringify(orderBy),
    include: include && stringify(include),
    select: select && stringify(select),
  };
}

const WAIT_TIME = 0;

export default class BackendApi {
  private api = axios.create({
    baseURL: env.VITE_BACKEND_API,
  });
  private accessToken = "";
  private refreshToken = "";
  private logoutCallback: () => void = () => { };

  constructor({
    accessToken = "",
    refreshToken = "",
    logoutCallback = () => { },
  }: {
    accessToken?: string;
    refreshToken?: string;
    logoutCallback?: () => void;
  }) {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    this.api.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.logoutCallback = logoutCallback;
    this.api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const url = err.config.url;
        if (err.response?.status === 401 && url !== "/auth/signin" && url !== "/auth/signup" && url !== "/auth/refreshtoken") {
          try {
            if (!this.refreshToken) {
              throw new Error("Unauthorized");
            }
            const res = await this.api.post("/auth/refreshtoken", {
              refreshToken: this.refreshToken,
            });
            this.accessToken = res.data.token;
            this.api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.token}`;
            window.localStorage.setItem("accessToken", res.data.token);
            const originalRequest = err.config;
            originalRequest.headers["Authorization"] = `Bearer ${res.data.token}`;
            return this.api.request(originalRequest);
          }
          catch (err) {
            this.accessToken = "";
            this.refreshToken = "";
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            this.logoutCallback();
          }
        }
        else return Promise.reject(err);
      }
    );
  }

  isReady() {
    return !!this.accessToken && !!this.refreshToken;
  }



  async login(data: { email: string; password: string }): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;

  }> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.post("/auth/signin", data);
    return res.data;
  }

  async signup(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantName?: string;
    tenantId?: number;
    confirmPassword?: string;
  }): Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
  }> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    delete data.confirmPassword;
    const res = await this.api.post("/auth/signup", data);
    return res.data;
  }

  async signOut(refreshToken: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    await this.api.post("/auth/singout", {
      refreshToken,
    });
  }

  async getCurrentUser(): Promise<User> {
    // TODO: remove this line
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get("/auth/me");
    return res.data;
  }

  async checkExists(route: string, id: string): Promise<"found" | "not found"> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get(`${route}/${id}`);
    return res.data;
  }

  async findMany<T>(
    route: string,
    params?: FindManyParams
  ): Promise<ManyResponse<T>> {
    // TODO: remove this line
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get(route, {
      params: convertParams(params),
    });
    return res.data;
  }

  async FindById<T>(
    route: string,
    id: number,
    params?: FindByIdParams
  ): Promise<T> {
    // TODO: remove this line
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get(`${route}/${id}`, {
      params: convertParams(params),
    });
    return res.data;
  }

  async dashboard<T>(route: string, params?: FindManyParams): Promise<T> {
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.get(`${route}`, {
      params: convertParams(params),
    });
    return res.data;
  }

  async create<T>(
    route: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    params?: FindByIdParams
  ): Promise<T> {
    // TODO: remove this line
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.post(route, data, {
      params: convertParams(params),
    });
    return res.data;
  }

  async update<T>(
    route: string,
    id: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    params?: FindByIdParams
  ): Promise<T> {
    // TODO: remove this line
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.patch(`${route}/${id}`, data, {
      params: convertParams(params),
    });
    return res.data;
  }
  async delete<T>(route: string, id: number): Promise<T> {
    // TODO: remove this line
    await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
    const res = await this.api.delete(`${route}/${id}`);
    return res.data;
  }
}