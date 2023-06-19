import { ApiProperty } from '@nestjs/swagger';

import { IsString, ValidateIf } from 'class-validator';

export class UserFindDto {
  @ApiProperty({
    description: 'email',
    example: 'test@user.com',
    required: true,
  })
  @IsString()
  @ValidateIf((o) => !o.walletAddress) // Only validate if walletAddress is not provided
  email: string;

  @ApiProperty({
    description: 'wallet address',
    example: '0x1234567890abcdef',
    required: true,
  })
  @IsString()
  @ValidateIf((o) => !o.email) // Only validate if email is not provided
  walletAddress: string;
}

export class VerifyOtpDto {}
