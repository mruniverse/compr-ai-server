import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ListItemDto } from './list-item.dto';

export class UpdateListDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  icon?: string;

  @IsOptional()
  @IsBoolean()
  recurring?: boolean;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ListItemDto)
  items?: ListItemDto[];
}
