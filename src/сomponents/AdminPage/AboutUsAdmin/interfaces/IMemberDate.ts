
export const MEMBER_STATE = {
   SHOW: "SHOW",
   HIDDEN: "HIDDEN"
} as const;

export type MemberState = keyof typeof MEMBER_STATE;

export interface IMemberDate {
   id?: string | number,
   state: MemberState,
   name: string,
   position: string,
   description: string,
   image: string,
   phone: string,
   email: string,
   facebook: string,
   instagram: string
}

export const initMember = {
   id: 0,
   state: "",
   name: "",
   position: "",
   description: "",
   image: "",
   phone: "",
   facebook: "",
   instagram: "",
   email: ""
 }
