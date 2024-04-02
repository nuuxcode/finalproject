// seed.ts
import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeds/user.seeder';
import { seedForums } from './seeds/forum.seeder';
import { seedPosts } from './seeds/post.seeder';
import { seedComments } from './seeds/comment.seeder';
import { seedNotifications } from './seeds/notification.seeder';

const prisma = new PrismaClient();
async function cleanDatabase() {
  console.log("Cleaning database...");

  // Delete all records from your tables
  await prisma.postAttachment.deleteMany();
  await prisma.commentAttachment.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.comment.deleteMany();
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
  await seedComments();

  //await seedNotifications(users);

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
