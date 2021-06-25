export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: Date;
  endereco: Endereco;
  dateInsert: Date;
  dateUpdate: Date;
}

export interface Endereco {
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: Cidade;
  cidadeId: number;
}

export interface Cidade {
  id: number;
  nome: string;
  uf: string;
}