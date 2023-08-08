import { Pessoas, Licencas, Users } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  pessoaData: Pessoas;

  @IsNotEmpty()
  licencaData: Licencas;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
