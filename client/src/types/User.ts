export interface User {
    id: string;
    username: string;
    password: string;
    avatarUrl: string;
    reputation: number;
    role: string;
    lastLogin: string;
    email: string;
    emailVerified: boolean;
    verificationToken: string | null;
    country: string;
    city: string;
    phone: string;
    website: string;
    aboutMe: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    PostCount: number;
    CommentCount: number;
    followersCount: number;
    followingCount: number;
    subscribedForumsCount: number;
}
