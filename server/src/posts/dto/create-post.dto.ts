import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  isHidden?: boolean = false;

  // userId: string;

  // forumId: string;
}
