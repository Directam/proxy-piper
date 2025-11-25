import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum RedirectType {
  PERMANENT = 301,
  TEMPORARY = 302,
  PERMANENT_NO_CACHE = 308,
  TEMPORARY_NO_CACHE = 307,
}

export class RedirectRequestDto {
  @IsNotEmpty()
  @IsString()
  targetUrl: string;

  @IsOptional()
  @IsEnum(RedirectType)
  redirectType?: RedirectType;
}

