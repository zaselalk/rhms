import { Checkbox } from "antd";
import { FC } from "react";

interface PermissionCardProps {
  title: string;
  permissions: string[];
}

export const PermissionCard: FC<PermissionCardProps> = ({
  title,
  permissions,
}) => {
  return (
    <div
      key={title}
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
      }}
    >
      <strong
        style={{
          display: "block",
          marginBottom: "0.5rem",
          fontSize: "1.1rem",
        }}
      >
        {title}
      </strong>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        {permissions.map((perm) => (
          <Checkbox key={perm} value={perm}>
            {perm.split(":")[1]}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
