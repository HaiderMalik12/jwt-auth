import { Router } from "express";
import { body, param } from "express-validator";
import {
  createCourse,
  deleteCourseById,
  getCoures,
  getCourseById,
  updateCourse,
} from "./handlers/course";
import { createInstructor, getInstructor } from "./handlers/insturctor";
import { privateRoute, signin, signup } from "./handlers/user";
import { createVideo, getVideos } from "./handlers/video";
import { authenticate } from "./middlewares/auth";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";

const router = Router();

/**
 * Course Routes
 */

router.get("/courses/:instructorId", param("instructorId").isInt(), getCoures); // modify this route
router.post(
  "/course",
  authenticate,
  body("title").isString().notEmpty(),
  body("duration").isFloat().notEmpty(),
  body("desc").isString().notEmpty(),
  body("instructorId").isInt().optional(),
  createCourse,
);

router.get("/course/:id", param("id").isInt(), getCourseById);
router.delete("/course/:id", param("id").isInt(), deleteCourseById);

// write the route here
router.put(
  "/course/:id",
  param("id").isInt(),
  body("title").isString().optional(),
  body("duration").isFloat().optional(),
  body("desc").isString().optional(),
  body("instructorId").isInt().optional(),
  updateCourse,
);

/**
 * Instructor Routes
 */

router.post(
  "/instructor",
  authenticate,
  body("name").isString().notEmpty(),
  body("zip").isString().notEmpty(),
  body("country").isString().notEmpty(),
  body("city").isString().notEmpty(),
  createInstructor,
);

router.get("/instructor/:id", param("id").isInt(), getInstructor);
/**
 * Video Routes
 */
router.post(
  "/video",
  body("title").isString().notEmpty(),
  body("desc").isString().notEmpty(),
  body("url").isString().notEmpty(),
  body("hostingProvider").isString().notEmpty(),
  body("key").isString().optional(),
  body("metaData").isString().optional(),
  createVideo,
);

router.get("/videos", getVideos);

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
  createProduct,
);
router.get("/product", getProducts);
router.put(
  "/product/:id",
  param("id").isInt(),
  body("title").isString().optional(),
  body("qty").isFloat().optional(),
  body("price").isString().optional(),
  body("description").isInt().optional(),
  updateProduct,
);

router.get("/private", authenticate, privateRoute);
router.delete("/product/:id", param("id").isInt(), deleteProduct);

export default router;
