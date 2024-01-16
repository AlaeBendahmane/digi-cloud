/* eslint-disable @typescript-eslint/no-explicit-any */
export type JsonObject = { [Key in string]?: JsonValue };
export interface JsonArray extends Array<JsonValue> { }
type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

export type ClassName = { [key: string]: boolean } | string;

export type UserType = {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  [key: string]: any;
};



export type StateType = "idle" | "loading" | "success" | "error";

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

import { z } from "zod";

export const themes = ["light", "dark"] as const;

export const themeSchema = z.enum(themes).default("light");

export type ThemeType = z.infer<typeof themeSchema>;

export const booleanSchema = z.boolean().default(false);

export type Events = {
  message: string;
  serial: string;
  messageId: string;
  createdAt: string;

}

export type OptionsType = {
  value: string | number | boolean | null;
  label: string;
};

export type Log = {
  id: number;
  data: Record<string, any>;
  action: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

export type FormContents = {
  type: string;
  name: string;
  label: string;
  required: string;
  options: OptionsType[]
}

export type FormInputes = {
  type: string;
  color: string;
  iconNumber: number | null;
  modalType: string;
  label: string;
  labels: string[];
  form: FormContents[]
};

export type Dashboard = {
  onlineDeviceCount: number;
  offlineDeviceCount: number;
  totalDeviceCount: number;
  inActiveDeviceCount: number;
};

export type DragNode = {
  color: string;
  label: string;
  iconNumber: number;
  name: string;
  modalType: string;
  type: string;
  form: FormContents[];
};

export type User = {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  avatar: string | null;
  tenantId?: number;
  tenant: {
    id: number;
    name: string;
    key: string;
  };
};

export type LicenseType = {
  id: number;
  startAt: string;
  endAt: string;
  tenant?: Record<string, any>;
  tenantId?: string;
  limitDevices: number;
  createdAt: string;
  updatedAt: string;
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type Position = {
  lat: number;
  lng: number;
};

export type Tenant = {
  id: number;
  name: string;
  createdAt: string;
};

export type TypeDevice = {
  name: string;
  logo?: string;
  id: number;
  description?: string;
  createdAt: string;
  tenantId?: string;
  updatedAt: string;
};

export type ProtocolDevice = {
  name: string;
  inPrefix?: string;
  outPrefix?: string;
  state: "STATELESS" | "STATEFUL";
  attributsMap: {
    key: string;
    type: "string" | "number" | "boolean";
    defaultValue: string | number;
  }[];
  id: number;
  createdAt: string;
  tenantId?: string;
  updatedAt: string;
};

export type DecoderDevice = {
  name: string;
  description?: string;
  fnc: string;
  id: number;
  createdAt: string;
  tenantId?: string;
  updatedAt: string;
};

export type UnitsOfMeasure = {
  id: number;
  name: string;
  symbol: string;
  isStandard: boolean;
  description?: string;
  standardConversion: number;
  tenantId?: string;
  classId?: string;
  class?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export type MeasurementClass = {
  id: number;
  name: string;
  description?: string;
  tenantId?: string;
  standardId: number;
  createdAt: string;
  updatedAt: string;
};

export type ManyResponse<T> = {
  results: T[];
  totalResult: number;
};

export type FindManyParams = {
  pagination?: {
    page: number;
    perPage: number;
  };
  where?: Record<string, unknown>;
  orderBy?: Record<string, "desc" | "asc">;
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
};

export type FindByIdParams = {
  include?: Record<string, unknown>;
  select?: Record<string, unknown>;
};

export type NameModel = {
  name: string;
  id: number;
};

export type DeviceProfile = {
  id: number;
  name: string;
  description: string;
  logo: string;
  attributes: any;
  defaultCredentialType: "TOKEN" | "CERTIFICATE" | "USERPASSWORD";
  deviceTypeId?: number;
  decoderId?: number;
  updatedAt: Date;
  createdAt: Date;
};

export type Group = {
  id: number;
  name: string;
  type: string;
  attributes: any;
  tenantId?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Device = {
  id: number;
  name: string;
  description: string;
  serial: string;
  isPassive?: boolean;
  isVirtual?: boolean;
  isGateway?: boolean;
  status?: "ONLINE" | "INACTIVE" | "OFFLINE";
  isDecoded?: boolean;
  credentialId?: string;
  credential?: {
    username: string;
    [key: string]: string;
  };
  deviceProfileId?: number;
  firmwareId: number;
  groupId?: number;
  createdAt: Date;
  updatedAt: Date;
  defaultLat: number;
  defaultLng: number;
  tags: {
    id: number;
    name: string;
  }[];
};

export type Firmware = {
  id: number;
  name: string;
  version?: string;
  description?: string;
  hash?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};