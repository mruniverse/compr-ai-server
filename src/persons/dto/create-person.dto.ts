import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePersonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cpf_cnpj: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  ie: string;
  phone: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
}
