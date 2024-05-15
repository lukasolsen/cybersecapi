import { NextFunction, Request, Response, Router } from "express";
import { fetchUserByEmail } from "../controller/user.controller";

const router = Router();

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const user = fetchUserByEmail(email);
    if (!user) {
      return res.status(404).send("User not found");
    }

    
  } catch (err) {
    next(err);
  }
});

export default router;
