import { User as UserPrisma } from "@prisma/client";
import { User } from "src/model/user";

export interface UsersRepository {
  create: (data: User) => Promise<UserPrisma>;
  update: (data: User) => Promise<UserPrisma>;
  delete: (id: string) => Promise<UserPrisma>;
  findById: (id: string) => Promise<UserPrisma>;
  findByEmail: (email: string) => Promise<UserPrisma>;
  allUsers: () => Promise<UserPrisma[]>;
}