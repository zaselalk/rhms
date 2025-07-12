import React from "react";

interface PermissionCardTitleProps {
  title: string;
}

/**
 * PermissionCardTitle component displays the title of a permission card.
 */
export const PermissionCardTitle: React.FC<PermissionCardTitleProps> = ({
  title,
}) => {
  return (
    <div key={title}>
      <strong
        style={{
          display: "block",
          marginBottom: "0.5rem",
          fontSize: "1.1rem",
        }}
      >
        {title}
      </strong>
    </div>
  );
};
