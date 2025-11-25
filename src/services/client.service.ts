import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ForwardRequest,
  ForwardResponse,
} from '../Interfaces/forward-request.interface';

@Injectable()
export class ClientService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  async forwardRequest(request: ForwardRequest): Promise<ForwardResponse> {
    try {
      new URL(request.url); // Validate URL
    } catch (error) {
      console.error(error);
      return {
        status: 400,
        data: { error: 'Invalid URL' },
        headers: {},
      };
    }

    const config: AxiosRequestConfig = {
      url: request.url,
      method: request.method || 'GET',
      headers: request.headers || {},
      data: request.payload,
      validateStatus: () => true,
    };

    try {
      const response: AxiosResponse = await this.client.request(config);

      return {
        status: response.status,
        data: response.data,
        headers: response.headers as Record<string, string>,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        data: { error: 'Request failed', details: error.message },
        headers: {},
      };
    }
  }
}
