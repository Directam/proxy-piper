import { Injectable } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import {
  ForwardRequest,
  ForwardResponse,
} from '../Interfaces/forward-request.interface';
import {
  RedirectRequest,
  RedirectResponse,
} from '../Interfaces/redirect-request.interface';

@Injectable()
export class AppService {
  constructor(private readonly httpService: ClientService) {}

  public async forwardRequest(
    request: ForwardRequest,
  ): Promise<ForwardResponse> {
    return await this.httpService.forwardRequest(request);
  }

  public async redirectRequest(
    request: RedirectRequest,
  ): Promise<RedirectResponse> {
    return await this.httpService.redirectRequest(request);
  }
}
