export type LoginData = {
  email: string;
  password: string;
};

export interface UserData {
  jwtToken: string;
  name: string;
  email: string;
  password: string;

  userRole: string;
}
