import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDto } from './dto/login.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}
  async login(body: loginDto): Promise<string> {
    try {
      const { email, pass_word } = body;
      const user = await this.prisma.users.findFirst({
        where: {
          email,
        },
      });
      if (!user) {
        throw new BadRequestException('Email is wrong');
      }
      const checkPass = bcrypt.compareSync(pass_word, user.pass_word);
      // const hashPassword = bcrypt.hashSync(pass_word, 10);
      if (!checkPass) {
        throw new BadRequestException('Password is wrong');
      }
      const token = this.jwtService.sign(
        { data: { userId: user.user_id } },
        {
          expiresIn: '30m',
          secret: this.configService.get('SECRET_KEY'),
        },
      );
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async signUp(body: CreateUserDto): Promise<any> {
    try {
      let { full_name, email, pass_word, role_id } = body;
      const user = await this.prisma.users.findFirst({
        where: { email },
      });
      if (user) throw new BadRequestException('User đã tồn tại');

      pass_word = bcrypt.hashSync(pass_word, 10);

      const newUser = await this.prisma.users.create({
        data: {
          full_name,
          email,
          pass_word,
          role_id,
        },
      });
      await this.emailService.sendMail(
        email,
        'Welcome to node 47',
        'Welcome to node 47',
      );
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
