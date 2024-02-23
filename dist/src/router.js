"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var course_1 = require("./handlers/course");
var router = (0, express_1.Router)();
/**
 * Course Routes
 */
router.get('/course', course_1.getCoures);
router.post('/course', (0, express_validator_1.body)('title').isString().notEmpty(), (0, express_validator_1.body)('duration').isFloat().notEmpty(), (0, express_validator_1.body)('desc').isString().notEmpty(), (0, express_validator_1.body)('instructorId').isInt().optional(), course_1.createCourse);
router.get('/course/:id', course_1.getCourseById);
/**
 * Instructor Routes
 */
/**
 * Video Routes
 */
exports["default"] = router;
//# sourceMappingURL=router.js.map