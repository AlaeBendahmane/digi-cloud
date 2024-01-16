import { ClassName, FindUniqueParams, Params } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function toggleFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function classNames(...classes: ClassName[]): string {
  return classes
    .map((c) => {
      if (typeof c === "string") {
        return c;
      }
      return Object.keys(c)
        .filter((k) => c[k])
        .join(" ");
    })
    .join(" ");
}

/*export function stringify(value: any, defualtValue = ""): string {
  if (!value) return defualtValue;
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}*/

export function strTake(
  str: string | undefined,
  length = 50,
  more = "...",
  placeholder = "---"
) {
  if (!str) return placeholder;
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + more;
}


export function convertParams(params: Params) {
  const {
    pagination: { page, perPage },
    where,
    orderBy,
    include,
  } = params;

  return {
    take: perPage,
    skip: (page - 1) * perPage,
    where: Object.keys(where!).length === 0 ? undefined :
      stringify(where),
    orderBy: stringify(orderBy),
    include: Object.keys(include!).length === 0 ? undefined :
      stringify(include),
  };
}
export function convertFindUniqueParams(params: FindUniqueParams) {
  const { include } = params;

  return {
    include: stringify(include),
    // select: stringify(select),
  };
}
/******* 
 * 
*/
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export function fetchAndSaveFile(fileUrl: string, fileName: string) {
  const ext = fileUrl.split(".").pop();
  fetch(fileUrl, { method: "GET" })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName + "." + ext);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
}

export function getSizeString(size: number = 0) {
  if (size < 1024) return size + " B";
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + " KB";
  if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + " MB";
  return (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

export function toggleWindowFullScreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function toggleElementFullScreen(element: HTMLElement) {
  if (!document.fullscreenElement) element.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function stringify(value: unknown) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateRandomString = (
  length: number,
  duplicate = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
) => {
  if (!duplicate) {
    if (length > characters.length)
      throw new Error(
        "Length must be less than or equal characters length to avoid duplicate characters"
      );
    for (const char of characters) {
      if (characters.split(char).length - 1 > 1)
        throw new Error(
          "Characters must be unique to avoid duplicate characters"
        );
    }
  }
  let result = "";
  const charactersLength = characters.length;
  for (let index = 0; index < length; index++) {
    let char = characters.charAt(Math.floor(Math.random() * charactersLength));
    if (!duplicate) {
      while (result.includes(char)) {
        char = characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }
    result += char;
  }
  return result;
};

export const unitsConversion = (from: number, to: number, value: number) => {
  return (value * from) / to;
};