import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto, CreateNewCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
export class UpdateNewCommentDto extends PartialType(CreateNewCommentDto) {}
