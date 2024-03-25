// post.seeder.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedPosts(users, forums) {
  console.log("------------ Starting to seed posts...");
  const posts = [];
  for (let i = 0; i < forums.length; i++) {
    const forum = forums[i];
    const ownerId = forum.ownerUserId;
    const moderator = forum.moderators.find(moderator => moderator.userId !== ownerId);
    const otherUsers = users.filter(user => user.id !== ownerId && user.id !== moderator.userId);

    const ownerAttachment = await prisma.attachment.create({
      data: {
        name: faker.system.fileName(),
        type: faker.system.commonFileType(),
        url: faker.internet.url(),
      },
    });

    const ownerPost = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        userId: ownerId,
        forumId: forum.id,
        isPinned: true,
        isVisible: true,
        slug: faker.lorem.slug(),
        createdAt: new Date(),
        updatedAt: new Date(),
        commentsCount: faker.number.int({ min: 0, max: 100 }),
        viewsCount: faker.number.int({ min: 0, max: 1000 }),
        votesCount: faker.number.int({ min: 0, max: 500 }),
      },
    });
    console.log(`------------ Post with id ${ownerPost.id} created by owner.`);

    await prisma.postAttachment.create({
      data: {
        postId: ownerPost.id,
        attachmentId: ownerAttachment.id,
      },
    });

    const moderatorAttachment = await prisma.attachment.create({
      data: {
        name: faker.system.fileName(),
        type: faker.system.commonFileType(),
        url: faker.internet.url(),
      },
    });

    const moderatorPost = await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(3),
        userId: moderator.userId,
        forumId: forum.id,
        isPinned: true,
        isVisible: true,
        slug: faker.lorem.slug(),
        createdAt: new Date(),
        updatedAt: new Date(),
        commentsCount: faker.number.int({ min: 0, max: 100 }),
        viewsCount: faker.number.int({ min: 0, max: 1000 }),
        votesCount: faker.number.int({ min: 0, max: 500 }),
      },
    });
    console.log(`------------ Post with id ${moderatorPost.id} created by moderator.`);

    await prisma.postAttachment.create({
      data: {
        postId: moderatorPost.id,
        attachmentId: moderatorAttachment.id,
      },
    });

    for (let j = 0; j < 3; j++) {
      const userAttachment = await prisma.attachment.create({
        data: {
          name: faker.system.fileName(),
          type: faker.system.commonFileType(),
          url: faker.internet.url(),
        },
      });

      const userPost = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
          userId: otherUsers[j].id,
          forumId: forum.id,
          isPinned: false,
          isVisible: true,
          slug: faker.lorem.slug(),
          createdAt: new Date(),
          updatedAt: new Date(),
          commentsCount: faker.number.int({ min: 0, max: 100 }),
          viewsCount: faker.number.int({ min: 0, max: 1000 }),
          votesCount: faker.number.int({ min: 0, max: 500 }),
        },
      });
      console.log(`------------ Post with id ${userPost.id} created by user.`);

      await prisma.postAttachment.create({
        data: {
          postId: userPost.id,
          attachmentId: userAttachment.id,
        },
      });

      posts.push(userPost);
    }
    posts.push(ownerPost, moderatorPost);
  }

  console.log("------------ Finished seeding posts.");
  return posts;
}
