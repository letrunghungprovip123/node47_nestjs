import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { ApiHeader, ApiQuery } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/list-user/:id')
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiHeader({ name: 'token', required: false })
  findAll(
    @Param('id') id: string,
    @Req() req: Request,
    @Headers('token') token: string,
    @Query('keyword') keyword: string,
  ): Object {
    let id1 = req.params.id;
    let keyword1 = req.query.keyword;
    let token1 = req.headers.token;
    return { id, id1, keyword, keyword1, token, token1 };
    // return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('/env/get-env')
  getEnv() {
    return this.configService.get<number>('PORT');
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
