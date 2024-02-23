import { Router } from "express";
import { body, param } from "express-validator";

import { privateRoute, signin, signup } from "./handlers/user";
import { authenticate } from "./middlewares/auth";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";

const router = Router();

/**
 * User Routes
 */
router.post(
  "/signup",
  body("email").isString().isEmail().notEmpty(),
  body("password").isString().notEmpty(),
  signup,
);

router.post(
  "/signin",
  body("email").isString().isEmail().notEmpty(),
  body("password").isString().notEmpty(),
  signin,
);
/**
 * Product Routes
 */

router.post(
  "/product",
  body("title").isString().notEmpty(),
  body("qty").isInt().notEmpty(),
  body("price").isFloat().notEmpty(),
  body("description").isString().optional(),
  authenticate,
  createProduct,
);
router.get("/product", authenticate, getProducts);
router.put(
  "/product/:id",
  param("id").isInt(),
  body("title").isString().optional(),
  body("qty").isFloat().optional(),
  body("price").isString().optional(),
  body("description").isInt().optional(),
  authenticate,
  updateProduct,
);
router.delete("/product/:id", param("id").isInt(), authenticate, deleteProduct);

router.get("/private", authenticate, privateRoute);

export default router;
