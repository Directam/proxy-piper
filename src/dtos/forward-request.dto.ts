import {
  IsNotEmpty,
  IsString,
  IsObject,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { HttpMethod } from '../types/http.type';

export class ForwardRequestDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsOptional()
  @IsObject()
  payload?: any;

  @IsOptional()
  @IsEnum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'])
  method?: HttpMethod;
}
