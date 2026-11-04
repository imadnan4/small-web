import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateSiteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(253)
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200_000)
  html!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  author!: string;
}
