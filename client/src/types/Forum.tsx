import { User } from './User';

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
