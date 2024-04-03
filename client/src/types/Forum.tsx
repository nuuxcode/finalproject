import { User } from './User';

export interface CommentType {
  id: string;
  content: string;
  userId: string;
  postId: string;
  isVisible: boolean;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  votesCount: number;
  upvotesCount: number;
  downvotesCount: number;
  isAccepted: boolean;
  deletedAt: string | null;
  replies?: CommentType[];
  username: string;
  avatarUrl: string;
  reputation: number;
}

export interface SingleCommentProps {
  slug: string;
  comment: CommentType;
  allComments: CommentType[];
  depth: number;
}
export interface CommentProps {
  comment: CommentType;
  replies?: CommentType[];
}
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  userId: string;
  forumId: string;
  isPinned: boolean;
  isVisible: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  commentsCount: number;
  viewsCount?: number;
  votesCount?: number;
  user: User;
  forum: Forum;
  attachments: Attachment[];
  comments: CommentType[]; // Add this line
}

export interface Attachment {
  id: string;
  url: string;
  name: string;
}

export interface Attachments {
  attachments: Attachment;
}


export interface Forum {
  id: string;
  name: string;
  slug: string;
  description: string;
  ownerUserId: string;
  logo: string;
  banner: string;
  createdAt: string;
  updatedAt: string;
  postsCount: number;
  viewsCount: number;
  subscribersCount: number;
  deletedAt: string | null;
  posts: ForumPost[];
}
