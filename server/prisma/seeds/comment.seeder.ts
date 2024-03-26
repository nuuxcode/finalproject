import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  username: string;
  password: string;
  avatarUrl: string | null;
  reputation: number;
  role: 'admin' | 'user';
  lastLogin: Date | null;
  email: string;
  emailVerified: boolean;
  verificationToken: string | null;
  country: string | null;
  city: string | null;
  phone: string | null;
  website: string | null;
  aboutMe: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  PostCount: number;
  CommentCount: number;
  followersCount: number;
  followingCount: number;
  subscribedForumsCount: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  forumId: string;
  isPinned: boolean;
  isVisible: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  commentsCount: number;
  viewsCount: number;
  votesCount: number;
}

const prisma = new PrismaClient();

export async function seedComments(users: User[], posts: Post[]) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    for (let j = 0; j < 3; j++) {
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.paragraphs(2),
          status: 'active',
          user: {
            connect: {
              id: users[j % users.length].id,
            },
          },
            post: {
              connect: {
                id: post.id,
            },
        },
      },
      });

      for (let k = 0; k < 2; k++) {
        // const userId = users[(j + k + 1) % users.length].id;
        await prisma.comment.create({
          data: {
            content: faker.lorem.paragraphs(1),
            status: 'active',
            user: {
              connect: {
                id: users[(j + k + 1) % users.length].id, // Cycle through users
              },
            },
            post: {
              connect: {
                id: post.id,
            },
        },
        parent: {
          connect: {
            id: comment.id,
          },
          },
        },
        });
      }
    }
  }  
  console.log("------------ Finished seeding forums.");
}
