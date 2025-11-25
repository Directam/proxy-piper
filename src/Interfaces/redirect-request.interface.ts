import { RedirectType } from '../dtos/redirect-request.dto';

export interface RedirectRequest {
  targetUrl: string;
  headers: Record<string, string>;
  redirectType?: RedirectType;
}

export interface RedirectResponse {
  status: number;
  location: string;
  headers: Record<string, string>;
}
