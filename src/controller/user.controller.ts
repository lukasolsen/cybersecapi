import { Role } from "@prisma/client";
import prisma from "../data-source";

/**
 * Fetches all users from the database
 * @returns
 */
export const fetchUsers = async () => {
  return await prisma.user.findMany();
};

/**
 * Fetches a user by id
 * @param id
 * @returns
 */
export const fetchUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

/**
 * Creates a new user
 * @param data
 * @returns
 */
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

/**
 * Updates a user by id
 * @param id
 * @param data
 * @returns
 */
export const updateUser = async (id: number, data: any) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

/**
 * Deletes a user by id
 * @param id
 * @returns
 */
export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

/**
 * Fetches a user by email
 * @param email
 * @returns
 */
export const fetchUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

/**
 * Fetches a user by username
 * @param username
 * @returns
 */
export const fetchUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};
