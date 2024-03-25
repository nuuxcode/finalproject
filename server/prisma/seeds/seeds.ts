// seed.ts
import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seeder';
import { seedForums } from './forum.seeder';
import { seedPosts } from './post.seeder';
import { seedComments } from './comment.seeder';
import { seedNotifications } from './notification.seeder';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log("Cleaning database...");

  // Delete all records from your tables
  await prisma.postAttachment.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.forumModerator.deleteMany();
  await prisma.forum.deleteMany();
  await prisma.user.deleteMany();

  console.log("Finished cleaning database.");
}

async function main() {
  await cleanDatabase();
  const users = await seedUsers();
  const forums = await seedForums(users);
  const posts = await seedPosts(users, forums);
  //await seedComments(users, posts);
  //await seedNotifications(users);

  // Add code to seed other entities here
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
