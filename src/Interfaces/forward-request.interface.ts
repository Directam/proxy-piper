import { HttpMethod } from '../types/http.type';

export interface ForwardRequest {
  url: string;
  headers?: Record<string, string>;
  payload?: any;
  method?: HttpMethod;
}

export interface ForwardResponse {
  status: number;
  data: any;
  headers: Record<string, string>;
}
