// user.seeder.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log("------------ Starting to seed users...");
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        avatarUrl: faker.image.avatar(),
        reputation: faker.number.int({ min: 0, max: 100 }),
        role: 'user',
        lastLogin: faker.date.past(),
        emailVerified: faker.datatype.boolean(),
        country: faker.location.country(),
        city: faker.location.city(),
        phone: faker.phone.number(),
        website: faker.internet.url(),
        aboutMe: faker.lorem.paragraph(),
        PostCount: faker.number.int({ min: 0, max: 100 }),
        CommentCount: faker.number.int({ min: 0, max: 100 }),
        followersCount: faker.number.int({ min: 0, max: 100 }),
        followingCount: faker.number.int({ min: 0, max: 100 }),
        subscribedForumsCount: faker.number.int({ min: 0, max: 100 }),
      },
    });
    console.log(`------------ User with id ${user.id} created.`);
    users.push(user);
  }

  console.log("------------ Finished seeding users.");
  return users;
}
