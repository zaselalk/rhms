import React, { FC } from "react";

interface PermissionCardProps {
  title: string;
  children?: React.ReactNode;
}

export const PermissionCard: FC<PermissionCardProps> = ({
  title,
  children,
}) => {
  return (
    <div className="border-1 p-3 rounded-md shadow-sm flex-1">
      <h3 className="text-lg font-semibold  mb-2">{title}</h3>
      <ul>{children}</ul>
    </div>
  );
};
