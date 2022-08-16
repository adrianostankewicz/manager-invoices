export interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  admin: boolean;
}

export interface UsersRepository {
  create: (data: UserData) => Promise<void>;
  update: (data: UserData) => Promise<void>;
  delete: (id: string) => Promise<void>;
}