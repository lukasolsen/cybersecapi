import { NextFunction, Request, Response, Router } from "express";
import { fetchUserByEmail } from "../controller/user.controller";
import { comparePassword, generateJWT, sanitizeUser } from "../lib/security";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }

      const user = await fetchUserByEmail(email);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      const token = await generateJWT(user.id);

      console.log("token", token);

      return res.status(200).send({ token });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    res.status(200).send(sanitizeUser(req.user));
  } catch (err) {
    next(err);
  }
});
export default router;
