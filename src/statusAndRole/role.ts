export const ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

type RoleValue = typeof ROLE[keyof typeof ROLE];

export interface StatusObject {
    ADMIN: RoleValue;
    USER: RoleValue;
}