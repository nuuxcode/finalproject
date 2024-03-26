// post.seeder.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const titles = [
  "What are some good resources for learning JavaScript?",
  "Can anyone recommend a good tutorial for React?",
  "I'm having trouble understanding async/await in JavaScript. Can anyone explain it in simple terms?",
  "What's the difference between SQL and NoSQL databases? Which one should I use for my project?",
  "I'm new to Python. What libraries should I learn to use first?",
  "What are some best practices for writing clean, maintainable code?",
  "Can anyone explain the concept of closures in JavaScript?",
  "What's the best way to learn about data structures and algorithms?",
  "I'm having trouble understanding the concept of 'state' in React. Can anyone help?",
  "What are some common mistakes beginners make when learning to code?",
  "What are the key differences between Python 2 and Python 3?",
  "How can I improve the performance of my SQL queries?",
  "What are some good resources for learning about cybersecurity?",
  "What's the best way to handle exceptions in Java?",
  "What are some good practices for debugging code?",
  "What are the key differences between Angular and React?",
  "What are some good resources for learning about machine learning?",
  "What's the best way to learn about web development?",
  "What are some good practices for writing testable code?",
  "What are the key differences between C and C++?",
  "What are some good resources for learning about data science?",
  "What's the best way to learn about mobile app development?",
  "What are some good practices for writing secure code?",
  "What are the key differences between Java and JavaScript?",
  "What are some good resources for learning about artificial intelligence?",
  "What's the best way to learn about game development?",
  "What are some good practices for writing efficient code?",
  "What are the key differences between front-end and back-end development?",
  "What are some good resources for learning about cloud computing?",
  "What's the best way to learn about database design?",
  "What are some good practices for writing scalable code?",
  "What are the key differences between functional and object-oriented programming?",
  "What are some good resources for learning about software architecture?",
  "What's the best way to learn about network programming?",
  "What are some good practices for writing maintainable code?",
  "What are the key differences between HTML and HTML5?",
  "What are some good resources for learning about operating systems?",
  "What's the best way to learn about embedded systems programming?",
  "What are some good practices for writing readable code?",
  "What are the key differences between CSS and CSS3?",
  "What are some good resources for learning about computer graphics?",
  "What's the best way to learn about algorithm design?",
  "What are some good practices for writing robust code?",
  "What are the key differences between synchronous and asynchronous programming?",
  "What are some good resources for learning about web design?",
  "What's the best way to learn about software testing?",
  "What are some good practices for writing modular code?",
  "What are the key differences between static and dynamic typing?",
  "What are some good resources for learning about user interface design?",
  "What's the best way to learn about data visualization?",
  "What are some good practices for writing high-performance code?",
  "What are the key differences between interpreted and compiled languages?",
  "What are some good resources for learning about computer networks?",
  "What's the best way to learn about software engineering principles?",
  "What are some good practices for writing cross-platform code?",
  "What are the key differences between relational and non-relational databases?",
  "What are some good resources for learning about web servers?",
  "What's the best way to learn about programming paradigms?",
  "What are some good practices for writing reusable code?",
  "What are the key differences between client-side and server-side rendering?",
];

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
        name: `${faker.system.fileName()}.jpg`,
        type: 'image/jpeg',
        url: 'https://picsum.photos/200/300',
      },
    });

    const ownerPost = await prisma.post.create({
      data: {
        title: titles[Math.floor(Math.random() * titles.length)],
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
        name: `${faker.system.fileName()}.jpg`,
        type: 'image/jpeg',
        url: 'https://picsum.photos/200/300',
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
          title: titles[Math.floor(Math.random() * titles.length)],
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
