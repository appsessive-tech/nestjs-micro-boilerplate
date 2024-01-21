import { ErrorDTO } from '@app/common/dto/error.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequest } from './dto/create-user.request';
import { DeleteUserRequest } from './dto/delete-user.request';
import { FindUserRequest } from './dto/find-user.request';
import { UpdateUserRequest } from './dto/update-user.request';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    type: CreateUserRequest,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 404,
    type: ErrorDTO,
    description: 'Not Found',
  })
  async createUser(@Body() request: CreateUserRequest) {
    return this.userService.createUser(request);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    type: DeleteUserRequest,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 204,
    type: ErrorDTO,
    description: 'Not Found',
  })
  @Delete()
  async deleteUser(@Body() request: DeleteUserRequest)
  {
    return this.userService.deleteUser(request);
  }

  
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    type: UpdateUserRequest,
  })
  @ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 404,
    type: ErrorDTO,
    description: 'Not Found',
  })
  @Put()
  async updateUser(@Body() request: UpdateUserRequest) {
    return this.userService.updateUser(request);
  }

  @ApiOperation({ summary: 'Find user' })
  @ApiParam({name: 'id', required: true, description: 'string for _id', schema: { type: 'string'}})
  @ApiResponse({
    status: 200,
    type: FindUserRequest,
  })
  @ApiResponse({
    status: 204,
    type: ErrorDTO,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
  })
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @ApiOperation({ summary: 'All users' })
  @ApiParam({name: 'limit', required: true, description: 'integer for limit', schema: { type: 'integer'}})
  @ApiParam({name: 'skip', required: true, description: 'integer for skip', schema: { type: 'integer'}})
  @ApiResponse({
    status: 200
  })
  @ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 404,
    type: ErrorDTO,
    description: 'Not Found',
  })
  @Get('all/:skip/:limit')
  async getUsers(@Param('skip') skip: number, @Param('limit') limit: number) {
    console.log('limit',limit);
    return this.userService.findPaginatedUsers(skip, limit);
  }

  @ApiOperation({ summary: 'user' })
  @ApiResponse({
    status: 200
  })
  @ApiResponse({
    status: 500,
    type: ErrorDTO,
    description: 'Internal Server Error',
  })
  @ApiResponse({
    status: 404,
    type: ErrorDTO,
    description: 'Not Found',
  })
  @Get()
  async getHealth() {
    return true;
  }
}