import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.create({
      data: req.body,
    });

    res.status(201).send({
      status: "ok",
      message: "product created",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const products = await prisma.product.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
    });
    const countProduct = await prisma.product.count();
    res.status(200).send({
      status: "ok",
      products,
      page,
      countProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    res.status(200).send({
      status: "ok",
      products,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });

    res.status(200).send({
      status: "ok",
      message: "product updated",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send({
      status: "ok",
      message: "product deleted",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};
