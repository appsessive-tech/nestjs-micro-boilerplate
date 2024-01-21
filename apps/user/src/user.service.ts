import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NOTIFICATION_SERVICE } from './constants/services';
import { CreateUserRequest } from './dto/create-user.request';
import { DeleteUserRequest } from './dto/delete-user.request';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
  ) {}

  async createUser(request: CreateUserRequest) {
    const session = await this.userRepository.startTransaction();
    try {
      const user = await this.userRepository.create(request, { session });
      await lastValueFrom(
        this.notificationClient.emit('user_created', {
          request,
        }),
      );
      await session.commitTransaction();
      return user;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async updateUser(request: CreateUserRequest) {
    const session = await this.userRepository.startTransaction();
    try {
      const user = await this.userRepository.findOneAndUpdate(request, { session });
      await session.commitTransaction();
      return user;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async findUser(_id: string): Promise<User> {
    console.log(_id);
    const user = await this.userRepository.findOne(_id);
    if (!user) {
      throw new NotFoundException(`User #${_id} not found`);
    }
    return user;
  }

  async deleteUser(request: DeleteUserRequest): Promise<User> {
    try {
      const user = await this.userRepository.deleteOne(request);
      await lastValueFrom(
        this.notificationClient.emit('user_deleted', {
          request,
        }),
      );
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findUsers() {
    return this.userRepository.find({});
  }

  async findPaginatedUsers(skip: number, limit: number) {
    return this.userRepository.findPaginated(skip, limit);
  }
}