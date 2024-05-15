import { PrismaClient } from "@prisma/client";
import consola from "consola";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    consola.success("Prisma connected successfully");
  })
  .catch((error) => {
    consola.error("Prisma connection error:", error);
    process.exit(1);
  });

export const addRequiredFields = async () => {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    await prisma.user.create({
      data: {
        email: "admin_cybersec@gmail.com",
        password: "root",
        username: "admin",
        name: "Admin",
        role: "ADMIN",
      },
    });

    consola.success("Admin user created successfully");
  } else {
    consola.success("Admin user already exists");
  }
};

if (prisma) addRequiredFields();

export default prisma;
