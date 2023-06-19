import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { paginate } from '@utils/paginate';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserFindDto } from './dto/login-user.dto';
import { PaginateFilterUser } from './dto/paginate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const walletAddress = Buffer.from(
      createUserDto.walletAddress.substring(2),
      'hex',
    );

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        walletAddress,
      },
    });
  }

  findAll(query: PaginateFilterUser) {
    const { page, perPage, ...rest } = query;

    const where: Prisma.UserWhereInput = {};
    // const include: Prisma.UserInclude = {};

    if (rest.name) {
      where.name = {
        contains: rest.name,
      };
    }

    if (rest.email) {
      where.email = {
        equals: rest.email,
      };
    }

    return paginate(
      this.prisma.user,
      {
        where,
        // include,
      },
      {
        perPage,
        page,
      },
    );
  }

  findUserCreds(creds: UserFindDto) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        email: creds.email,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
