import { UsersRepository } from "src/repositories/users-repository";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserController {
  constructor(
    private usersRepository: UsersRepository
  ){}

  async handle(request: UserRequest){
    const {name, email, password} = request;

    if(!name){
      throw new Error('Name is required');
    }

    if(!email){
      throw new Error('Email is required');
    }

    if(!password){
      throw new Error('Password is required');
    }

    const role = 'admin';
    const admin = true;

    await this.usersRepository.create({
      name,
      email,
      password,
      role,
      admin
    });
  }
}