import { Dividas, FasesRegua } from '@prisma/client';

export class StatusFaseDivida {
  id: number;
  divida_id: number;
  fase_id: number;
  active: boolean;
  isCronActive: boolean;

  Divida: Dividas;
  FaseRegua: FasesRegua;
}
