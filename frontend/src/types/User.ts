export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  googleId?:string;
  id:string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  age?: number | string;
}
