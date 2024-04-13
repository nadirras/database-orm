import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.create({
      data: req.body,
    });

    res.status(201).send({
      status: "ok",
      message: "User created",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const users = await prisma.user.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
    });
    const countUser = await prisma.user.count();
    res.status(200).send({
      status: "ok",
      users,
      page,
      countUser,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    res.status(200).send({
      status: "ok",
      users,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });

    res.status(200).send({
      status: "ok",
      message: "user updated",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send({
      status: "ok",
      message: "user deleted",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};
