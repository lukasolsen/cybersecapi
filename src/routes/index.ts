import { Router } from "express";
import Users from "./users";
import Messages from "./messages";

const router = Router();

router.use("/users", Users);
router.use("/messages", Messages);

export default router;
