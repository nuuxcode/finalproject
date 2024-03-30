import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedComments() {
  console.log("------------ Starting to seed Comments...");
  const posts = await prisma.post.findMany();
  const users = await prisma.user.findMany();

/*
5 comments are created for each post.
1 reply is created for the second comment of each post.
2 replies are created for the third comment of each post.
2 replies are created for the fifth comment of each post.
1 reply is created for the first reply of the fifth comment of each post.
*/

  for (const post of posts) {
    const comments = [];
    for (let i = 0; i < 5; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const comment = await prisma.comment.create({
        data: {
          content: `Comment ${i + 1} on post ${post.id}`,
          status: 'default_status',
          user: {
            connect: {
              id: randomUser.id,
            },
          },
          post: {
            connect: {
              id: post.id,
            },
          },
        },
      });
      comments.push(comment);
      console.log(`Added comment ${i + 1} to post ${post.id}`);
    }

    const randomUserForReplyToSecondComment = users[Math.floor(Math.random() * users.length)];
    await prisma.comment.create({
      data: {
        content: `Reply to comment 2 on post ${post.id}`,
        status: 'default_status',
        user: {
          connect: {
            id: randomUserForReplyToSecondComment.id,
          },
        },
        post: {
          connect: {
            id: post.id,
          },
        },
        parent: {
          connect: {
            id: comments[1].id,
          },
        },
      },
    });
    console.log(`Added reply to comment 2 on post ${post.id}`);

    for (let i = 0; i < 2; i++) {
      const randomUserForReplyToThirdComment = users[Math.floor(Math.random() * users.length)];
      await prisma.comment.create({
        data: {
          content: `Reply ${i + 1} to comment 3 on post ${post.id}`,
          status: 'default_status',
          user: {
            connect: {
              id: randomUserForReplyToThirdComment.id,
            },
          },
          post: {
            connect: {
              id: post.id,
            },
          },
          parent: {
            connect: {
              id: comments[2].id,
            },
          },
        },
      });
      console.log(`Added reply ${i + 1} to comment 3 on post ${post.id}`);
    }

    const replies = [];
    for (let i = 0; i < 2; i++) {
      const randomUserForReplyToFifthComment = users[Math.floor(Math.random() * users.length)];
      const reply = await prisma.comment.create({
        data: {
          content: `Reply ${i + 1} to comment 5 on post ${post.id}`,
          status: 'default_status',
          user: {
            connect: {
              id: randomUserForReplyToFifthComment.id,
            },
          },
          post: {
            connect: {
              id: post.id,
            },
          },
          parent: {
            connect: {
              id: comments[4].id,
            },
          },
        },
      });
      replies.push(reply);
      console.log(`Added reply ${i + 1} to comment 5 on post ${post.id}`);
    }

    const randomUserForReplyToReplyOfFifthComment = users[Math.floor(Math.random() * users.length)];
    await prisma.comment.create({
      data: {
        content: `Reply to reply 1 of comment 5 on post ${post.id}`,
        status: 'default_status',
        user: {
          connect: {
            id: randomUserForReplyToReplyOfFifthComment.id,
          },
        },
        post: {
          connect: {
            id: post.id,
          },
        },
        parent: {
          connect: {
            id: replies[0].id,
          },
        },
      },
    });
    console.log(`Added reply to reply 1 of comment 5 on post ${post.id}`);
  }
  console.log("------------ Finished seeding Comments.");
}
