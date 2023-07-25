export interface IContactUsForm {
[key:string]:string
}

export const initContacUsForm:IContactUsForm = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  questionText: '',
}
