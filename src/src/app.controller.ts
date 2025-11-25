import {
  All,
  Body,
  Controller,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ForwardRequestDto } from '../dtos/forward-request.dto';
import { ForwardResponse } from '../Interfaces/forward-request.interface';
import { RedirectRequestDto } from '../dtos/redirect-request.dto';
import { RedirectResponse } from '../Interfaces/redirect-request.interface';
import { Request, Response } from 'express';

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

  @All('redirect')
  public async redirectRequest(
    @Query() redirectRequestDto: RedirectRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const incomingHeaders: Record<string, string> = {};
    Object.entries(req.headers).forEach(([key, value]: [string, unknown]): void => {
      if (
        key.toLowerCase() === 'host' ||
        key.toLowerCase() === 'connection' ||
        key.toLowerCase() === 'content-length'
      ) {
        return;
      }

      if (value && typeof value === 'string') {
        incomingHeaders[key] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        incomingHeaders[key] = value[0];
      }
    });

    const redirectRequest = {
      targetUrl: redirectRequestDto.targetUrl,
      headers: incomingHeaders,
      redirectType: redirectRequestDto.redirectType,
    };

    const result: RedirectResponse =
      await this.appService.redirectRequest(redirectRequest);

    if (result.status === 400 || !result.location) {
      return res.status(result.status).send({
        error: 'Invalid target URL',
      });
    }

    if (result.headers) {
      Object.entries(result.headers).forEach(([key, value]: [string, string]): void => {
        res.setHeader(key, value);
      });
    }

    return res.status(result.status).send();
  }
}
