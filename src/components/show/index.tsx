import React from "react";

interface ShowProps<T> {
  when: T;
  children?: React.ReactNode;
}

function Show<T>({ when, children }: ShowProps<T>) {
  return <>{(when && children) ?? null}</>;
}
export default Show;
