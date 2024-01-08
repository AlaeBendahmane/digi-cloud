import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, children, ...props }: Props) {
  return (
    <div
      style={{
        borderRadius: "8px",
        background: "#e0e0e07f",
        boxShadow: "8px 8px 13px #cecece, -8px -8px 13px #f2f2f2",
      }}
      {...props}
      className={twMerge("rounded-lg bg-white text-black shadow", className)}
    >
      {children}
    </div>
  );
}

export default Card;
