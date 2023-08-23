import { IsNotEmpty } from 'class-validator';
export class CreatePermissionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  route: string;
}
