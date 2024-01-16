import axios from "axios";
import { env } from "../utils/env";
import { UserType } from "../utils/types";

export default class AuthApi {
  private accessToken: string;
  private refreshToken: string;
  private retryCounter:number = 0;
  private maxRetry:number = 3;
  private api = axios.create({
    baseURL: env.VITE_BACKEND_API,
    timeout: 8000,
  });

  constructor({
    accessToken = "",
    refreshToken = "",
  }: {
    accessToken?: string;
    refreshToken?: string;
  } = {}) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${refreshToken}`;

    this.api.interceptors.response.use (
      (response) => {
        this.retryCounter = 0;
        return response;
      },
      async (error) => {        
        if ((error.message).includes("timeout") && this.retryCounter < this.maxRetry) {
          this.retryCounter++;       
          await this.waitBeforeRetry();
          return this.api(error.config);
        }
      }
    );
  }

  async waitBeforeRetry() {
    const delay = 1000; // Exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay));
}

  async updatePassword({
    oldPassword,
    newPassword,
    id,
  }: {
    oldPassword: string;
    newPassword: string;
    id: string;
  }): Promise<void> {
    await this.api.patch(`update-password/${id}`, {
      oldPassword,
      newPassword,
    });
  }

  async deleteAccount(id: string): Promise<void> {
    return await this.api.delete(`users/${id}`);
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserType> {
    const res = await this.api.post("/login", { email, password });
    return res.data;
  }

  async logout(): Promise<void> {
    await this.api.post("/logout", {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });
  }

  async verify(): Promise<UserType> {
    const res = await this.api.get("/me");
    return res.data;
  }

  async refresh() {
    const res = await this.api.post("/refresh", {
      refreshToken: this.refreshToken,
    });
    return res.data;
  }
}
