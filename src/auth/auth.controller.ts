import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { loginDto } from './dto/login.dto';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() body: loginDto,
    @Res() res: Response,
  ): Promise<Response<string>> {
    try {
      const token = await this.authService.login(body);
      return res.status(HttpStatus.OK).json({ token });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Login failed' });
    }
  }

  @Post('/sign-up')
  async signUp(
    @Body() body: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response<any>> {
    try {
      const user = await this.authService.signUp(body);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'SignUp failed' });
    }
  }
}
