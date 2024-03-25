// forum.seeder.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedForums(users) {
  console.log("------------ Starting to seed forums...");
  const forums = [];
  for (let i = 0; i < 5; i++) {
    const forum = await prisma.forum.create({
      data: {
        name: faker.lorem.words(3),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentences(3),
        ownerUserId: users[i].id,
        logo: faker.image.url(),
        banner: faker.image.url(),
        created_at: new Date(),
        updated_at: new Date(),
        postsCount: faker.number.int({ min: 0, max: 100 }),
        viewsCount: faker.number.int({ min: 0, max: 1000 }),
        subscribersCount: faker.number.int({ min: 0, max: 500 }),
      },
    });
    console.log(`Forum with id ${forum.id} created.`);

    const ownerAsModerator = await prisma.forumModerator.create({
      data: {
        userId: users[i].id,
        forumId: forum.id,
      },
    });

    const otherModerator = await prisma.forumModerator.create({
      data: {
        userId: users[i + 5].id,
        forumId: forum.id,
      },
    });

    forums.push({ ...forum, moderators: [ownerAsModerator, otherModerator] });
  }

  console.log("------------ Finished seeding forums.");
  return forums;
}
