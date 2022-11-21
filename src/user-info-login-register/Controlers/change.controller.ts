import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param, Headers} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';





@Controller('api')
export class ChangeController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }
    @Post('/change-password')
     async postcomm( @Body() content: any, @Res() res: Response, @Req() req: Request,  @Headers() headers)  {
      try {
        console.log(content.content)
        let jwts = headers.authorization;
        const cookie = jwts;
        const data = await this.jwtService.verifyAsync(cookie);
        

        if (!data) {
                throw new UnauthorizedException();
        }
        const user = await this.userService.findOne({ name: data['name']})
        console.log(user)
        const hashedPassword = await bcrypt.hash(content.content, 12);
        const create2 = await this.userService.update(user._id,{password: hashedPassword})
        res.json(create2)

      } catch (error) {
        return 'error';
      }
   }     
}


