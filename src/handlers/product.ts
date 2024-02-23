import { validationResult } from "express-validator";
import prisma from "../db";

export const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = await prisma.product.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      qty: req.body.qty,
      price: req.body.price,
    },
  });

  return res.status(201).json(product);
};
