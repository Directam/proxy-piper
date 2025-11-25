import { Body, Controller, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ForwardRequestDto } from '../dtos/forward-request.dto';
import { ForwardResponse } from '../Interfaces/forward-request.interface';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('forward')
  public async forwardRequest(
    @Body() forwardRequestDto: ForwardRequestDto,
    @Res() res: Response,
  ) {
    const result: ForwardResponse =
      await this.appService.forwardRequest(forwardRequestDto);

    if (result.headers) {
      Object.entries(result.headers).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
    }

    return res.status(result.status).send(result.data);
  }
}
