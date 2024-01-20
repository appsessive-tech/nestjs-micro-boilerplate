import {
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class FindUserRequest {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    _id: string;

  }