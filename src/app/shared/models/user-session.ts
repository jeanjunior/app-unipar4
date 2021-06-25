export interface UserSession {
  id: number;
  username: string;
  name: string;
  email?: string;
  token?: string;
}
