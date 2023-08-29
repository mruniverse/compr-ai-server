import { PartialType } from '@nestjs/mapped-types';
import CreatePersonDto from './create-person.dto';

export default class UpdatePersonDto extends PartialType(CreatePersonDto) {}
