import { PrismaService } from './../prisma/prisma.service';
import { CpfcnpjResponse, Registro } from './entities/cpfcnpj.response.entity';
import { parseString } from 'xml2js';
import { Injectable, Inject } from '@nestjs/common';
import { CreateCredilinkDto } from './dto/create-credilink.dto';
import { UpdateCredilinkDto } from './dto/update-credilink.dto';
import { Client } from 'nestjs-soap';
import { Persons, Enderecos } from '@prisma/client';

@Injectable()
export class CredilinkService {
  constructor(@Inject('CrediLink') private credilink: Client, private prisma: PrismaService) {}
  create(createCredilinkDto: CreateCredilinkDto) {
    return 'This action adds a new credilink';
  }

  findAll() {
    return `This action returns all credilink`;
  }

  async findOne(cpfcnpj: string): Promise<Partial<Persons>> {
    const person = await this.prisma.persons.findUnique({ where: { cpf_cnpj: cpfcnpj }, include: { Enderecos: true } });
    if (person) return person;

    const credilinkPerson: Registro = await new Promise((resolve, reject) => {
      this.credilink.Cpfcnpj(
        {
          usuario: 'INTLEGIS',
          password: 'ddsU5smt',
          sigla: 'GUPUY',
          cpfcnpj: cpfcnpj,
        },
        (err: any, result: any) => {
          if (err) reject(err);

          parseString(result.return, (err: any, result: CpfcnpjResponse) => {
            if (err) reject(err);
            if (result.RESULTADO.MSG) reject(result.RESULTADO.MSG[0]);

            resolve(result.RESULTADO.REGISTRO[0]);
          });
        },
      );
    });

    return this.formatCrediLinkResponse(credilinkPerson);
  }

  formatCrediLinkResponse(registro: Registro): Partial<Persons> & { enderecos: Partial<Enderecos[]> } {
    const nascYear = +registro.NASC[0].split('-')[0];
    const nascMonth = +registro.NASC[0].split('-')[1];
    const nascDay = +registro.NASC[0].split('-')[2];

    const persons: Partial<Persons> = {};
    const enderecos: Partial<Enderecos[]> = [{} as any];
    if (registro.NOME[0] !== 'NULL') persons.name = registro.NOME[0];
    if (registro.CPFCNPJ[0] !== 'NULL') persons.cpf_cnpj = registro.CPFCNPJ[0];
    if (registro.EMAILS[0] !== 'NULL') persons.email = registro.EMAILS[0];
    if (registro.TELEFONE[0] !== 'NULL') persons.phone = registro.TELEFONE[0];
    if (registro.NASC[0] !== 'NULL') persons.nascimento = new Date(nascYear, nascMonth - 1, nascDay);
    if (registro.SEXO[0] !== 'NULL') persons.sexo = registro.SEXO[0] === 'M' ? 'Masculino' : 'Feminino';

    enderecos.forEach((endereco, index) => {
      if (registro.ENDERECO[index] !== 'NULL') endereco.logradouro = registro.ENDERECO[index];
      if (registro.NUMERO[index] !== 'NULL') endereco.numero = registro.NUMERO[index];
      if (registro.BAIRRO[index] !== 'NULL') endereco.bairro = registro.BAIRRO[index];
      if (registro.CEP[index] !== 'NULL') endereco.cep = registro.CEP[index];
      if (registro.CIDADE[index] !== 'NULL') endereco.cidade = registro.CIDADE[index];
      if (registro.UF[index] !== 'NULL') endereco.estado = registro.UF[index];

      if (registro.ENDERECO.length > index + 1) enderecos.push({} as any);
      if (registro.NUMERO.length > index + 1) enderecos.push({} as any);
      if (registro.BAIRRO.length > index + 1) enderecos.push({} as any);
      if (registro.CEP.length > index + 1) enderecos.push({} as any);
      if (registro.CIDADE.length > index + 1) enderecos.push({} as any);
      if (registro.UF.length > index + 1) enderecos.push({} as any);
    });

    return { ...persons, enderecos: enderecos };
  }

  update(id: number, updateCredilinkDto: UpdateCredilinkDto) {
    return `This action updates a #${id} credilink`;
  }

  remove(id: number) {
    return `This action removes a #${id} credilink`;
  }
}
