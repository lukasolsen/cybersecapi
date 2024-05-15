import { NextFunction, Request, Response, Router } from "express";
import { fetchUserByEmail } from "../controller/user.controller";
import { comparePassword, generateJWT, sanitizeUser } from "../lib/security";
import { createMessage, fetchMessages } from "../controller/message.controller";

const router = Router();

router.post(
  "/send",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, text } = req.body;

      if (!name || !text) {
        return res.status(400).send("Name and text are required");
      }

      const message = await createMessage(name, text);

      return res.status(200).send(message);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Forbidden");
  }

  return res.status(200).send(await fetchMessages());
});

export default router;
