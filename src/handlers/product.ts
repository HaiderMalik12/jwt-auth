import { validationResult } from "express-validator";

export const createProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return res.status(201).json(req.body);
};
