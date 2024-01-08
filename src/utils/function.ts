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

export function stringify(value: any, defualtValue = ""): string {
  if (!value) return defualtValue;
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

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
