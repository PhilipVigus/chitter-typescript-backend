import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();
router.post("/", UsersController.createUser);

export default router;
