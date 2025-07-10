import { Checkbox } from "antd";
import { FC } from "react";
import { PermissionCardTitle } from "./components/PermissionCardTitle";

interface PermissionCardProps {
  title: string;
  permissions: string[];
}

// styles

const permissionCardStyle: React.CSSProperties = {
  marginBottom: "2rem",
  padding: "1rem",
  border: "1px solid #d9d9d9",
  borderRadius: "8px",
};

const permissionGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "1rem",
};

/**
 * PermissionCard component displays a card with a title and a list of permissions as checkboxes.
 * @param title - The title of the permission card.
 * @param permissions - An array of permission strings to be displayed as checkboxes.
 */
export const PermissionCard: FC<PermissionCardProps> = ({
  title,
  permissions,
}) => {
  return (
    <div style={permissionCardStyle}>
      <PermissionCardTitle title={title} />
      <div style={permissionGridStyle}>
        {permissions.map((perm) => (
          <Checkbox key={perm} value={perm}>
            {perm.split(":")[1]}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};
