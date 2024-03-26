export class Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  isVisible: boolean;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  parent?: Comment;
  replies?: Comment[];
}
