import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { VISIT_VIA, VisitVia } from "./visit.schema";

export class CreateVisitDto {
  @IsString()
  @IsNotEmpty()
  user!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsIn([...VISIT_VIA])
  via!: VisitVia;
}
