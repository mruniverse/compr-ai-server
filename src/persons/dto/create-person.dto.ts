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
  zipcode: string;
  address: string;
  district: string;
  city: string;
  state: string;
  number: string;
}
