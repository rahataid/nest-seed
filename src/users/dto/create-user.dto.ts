import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Test User',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'test@user',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: '0x00',
    description: 'Wallet Address',
    required: true,
  })
  @IsString()
  walletAddress: string;

  @ApiProperty({
    description: 'Profile Image',
    example:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
  })
  profileImage?: string;
}
