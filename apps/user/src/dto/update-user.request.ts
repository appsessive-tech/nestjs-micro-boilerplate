import {
    IsNotEmpty,
    IsEmail,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UpdateUserRequest {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    _id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }