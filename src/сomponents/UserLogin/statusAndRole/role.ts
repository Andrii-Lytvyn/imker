export const ROLE = {
    guest: "guest",
    joined: "joined",
    admin: "admin",
} as const;

type RoleValue = typeof ROLE[keyof typeof ROLE];

export interface StatusObject {
    guest: RoleValue;
    joined: RoleValue;
    admin: RoleValue;
}