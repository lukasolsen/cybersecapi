import { Role } from "@prisma/client";
import prisma from "../data-source";

export const fetchUsers = async () => {
  return await prisma.user.findMany();
};

export const fetchUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async (data: {
  email: string;
  password: string;
  username: string;
  name: string;
  role: Role;
}) => {
  return await prisma.user.create({
    data,
  });
};

export const updateUser = async (id: number, data: any) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const fetchUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const fetchUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};
