import prisma from "../data-source";

export const createMessage = async (name: string, text: string) => {
  const message = await prisma.message.create({
    data: {
      name,
      text,
    },
  });

  return message;
};

export const fetchMessages = async () => {
  return await prisma.message.findMany();
};
