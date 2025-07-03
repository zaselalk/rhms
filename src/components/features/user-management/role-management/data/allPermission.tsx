const allPermissions = [
  {
    group: "User",
    perms: ["user:create", "user:edit", "user:delete", "user:view"],
  },
  {
    group: "Role",
    perms: ["role:create", "role:edit", "role:delete", "role:view"],
  },
  {
    group: "Clinic",
    perms: ["clinic:create", "clinic:edit", "clinic:delete", "clinic:view"],
  },
  {
    group: "Disease",
    perms: ["disease:create", "disease:edit", "disease:delete", "disease:view"],
  },
  {
    group: "Division",
    perms: [
      "division:create",
      "division:edit",
      "division:delete",
      "division:view",
    ],
  },
  {
    group: "HouseHold",
    perms: [
      "household:create",
      "household:edit",
      "household:delete",
      "household:view",
    ],
  },
  {
    group: "Resident",
    perms: [
      "resident:create",
      "resident:edit",
      "resident:delete",
      "resident:view",
    ],
  },
];

export default allPermissions;
