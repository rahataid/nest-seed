import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

interface UserFilter {
  name?: string;
  email?: string;
  updatedAt?: string;
  walletAddress?: string;
}

export class PaginateFilterUser {
  @ApiProperty({
    description: 'Name of the user',
    example: '1',
    required: false,
  })
  @IsString()
  @IsOptional()
  page?: string;

  @ApiProperty({
    example: '10',
    required: false,
  })
  @IsString()
  @IsOptional()
  perPage?: string;

  @ApiProperty({
    type: 'string',
    example: 'Test User',
    required: false,
  })
  @IsOptional()
  name?: UserFilter['name'];

  @ApiProperty({
    type: 'string',
    example: 'Test User',
    required: false,
  })
  email: UserFilter['email'];

  @ApiProperty({
    type: 'string',
    example: 'Test User',
    required: false,
  })
  walletAddress: UserFilter['walletAddress'];
}
