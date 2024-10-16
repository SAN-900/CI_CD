import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border rounded-lg p-6 bg-white overflow-auto">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
