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
      userId: req.user,
    },
  });

  return res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  return res.status(200).json(products);
};

export const getProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
  });
  return res.status(200).json(product);
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
  });

  if (!product) {
    return res.status(404).json({ err: "could not find product" });
  }

  console.log(product);
  console.log(req.body);

  const updatedProduct = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  console.log(updateProduct);

  return res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
  });
  if (!product) {
    return res.status(404).json({ err: "could not find product" });
  }

  const deletedProduct = await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json(deletedProduct);
};
