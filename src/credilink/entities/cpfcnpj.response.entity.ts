export interface Registro {
  CONTADOR: string[];
  NOME: string[];
  TELEFONE: string[];
  ENDERECO: string[];
  NUMERO: string[];
  COMPLEMENTO: string[];
  BAIRRO: string[];
  CEP: string[];
  CIDADE: string[];
  UF: string[];
  CPFCNPJ: string[];
  SEXO: string[];
  MAE: string[];
  NASC: string[];
  STATUSTELEFONE: string[];
  ATUALIZACAO: string[];
  OBITO: string[];
  COMERCIAL: string[];
  VEICULO: string[];
  IPTU: string[];
  OPERADORA: string[];
  DTINSTALACAO: string[];
  PROCON: string[];
  EMAILS: string[];
  EMPRESASOCIO: string[];
  CNPJEMPRESASOCIO: string[];
  TELEMPRESASOCIO: string[];
  ENDEREMPRESASOCIO: string[];
  ENDERNUMEMPRESASOCIO: string[];
  ENDERCOMPEMPRESASOCIO: string[];
  ENDERBAIRROEMPRESASOCIO: string[];
  ENDERCIDADEEMPRESASOCIO: string[];
  ENDERUFEMPRESASOCIO: string[];
  SOCIEDADES: {
    SOCIEDADESNOMEEMPRESA: string[];
    SOCIEDADESCNPJ: string[];
    SOCIEDADESNOMEFANTASIA: string[];
  }[];
  WHATSAPP: string[];
  SITUACAOCADASTRAL: string[];
  DATAABERTURA: string[];
}

export interface CpfcnpjResponse {
  RESULTADO: {
    MSG?: string[];
    REGISTRO?: Registro[];
  };
}
