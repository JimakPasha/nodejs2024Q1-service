import { IsUUID } from 'class-validator';

export class Uuid {
  @IsUUID()
  id: string;
}
