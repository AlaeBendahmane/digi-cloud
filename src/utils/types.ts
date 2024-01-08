/* eslint-disable @typescript-eslint/no-explicit-any */
export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> {}
type JsonValue = string | number | boolean | JsonObject | JsonArray | null;


export type ClassName = { [key: string]: boolean } | string;

export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  [key: string]: any;
};

export type StateType = "idle" | "loading" | "success" | "error";

export type ManyResponse<T = any> = {
  results: T[];
  totalResult: number;
};

export type Params = {
  pagination: {
    page: number;
    perPage: number;
  };
  where?: Record<string, any>;
  orderBy?: JsonObject;
  include?: JsonObject;
  select?: JsonObject;
};
export type FindUniqueParams = {
  include?: JsonObject;
  select?: JsonObject;
};

export type Device = {
  id: number;
  name: string;
  serial: string;
  groupId?: number;
  deviceProfile: {
    name: string;
    [key: string]: any;
  };
  group?: GroupType;
  _count?: {
    alerts: number;
  };
  lastTelemetries?: LastTelemetry[];
};

export type LastTelemetry = {
  name: string;
  value: string;
  [key: string]: any;
};

export type GroupType = {
  id: number;
  name: string;
  attributes?: Record<string, string | number | boolean>;
  devices?: Device[];
  [key: string]: any;
};

export type UnitType = {
  id: number;
  name: string;
  province: string;
  region: string;
  lat: number;
  lng: number;
  [key: string]: any;
};
