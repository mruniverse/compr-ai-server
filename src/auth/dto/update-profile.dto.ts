import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Narrow DTO (NOT PartialType(CreateUserDto)) so callers can never set password
// here — password changes go through the verify-current flow.
export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
