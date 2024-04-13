import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCartId = async (req: Request, res: Response) => {
  try {
    // const { id } = req.body;
    const carts = await prisma.cart.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        cartItem: {
          include: {
            product: true,
          },
        },
      },
    });
    res.status(200).send({
      status: "ok",
      carts,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error,
    });
  }
};
