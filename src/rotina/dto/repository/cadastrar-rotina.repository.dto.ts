export class CadastrarRotinaRepositoryDto {
  nome: string;
  dataInicio: string;
  dataTermino?: string;
  horaInicio?: string;
  horaTermino?: string;
  repeticao?: string;
  intervalo?: number;
  periodo?: string[];
  responsavelId?: number;
  residenciaId?: number;
  usuarioId: number;
  observacao?: string;
}
