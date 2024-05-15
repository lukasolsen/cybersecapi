import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { fetchUser } from "../controller/user.controller";
export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const excludedRoutes: RegExp[] = [
    /^\/api\/v1\/users\/login$/,
    /^\/api\/v1\/users\/register$/,
  ];

  if (excludedRoutes.some((route) => route.test(req.path))) return next();

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }

  const token =
    typeof authorization === "string" ? authorization.split(" ")[1] : undefined;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { id: number };

    const user = await fetchUser(decoded.id);

    if (!user?.id) {
      return res.status(401).send("Unauthorized");
    }

    if (!decoded) {
      console.log("decoded", decoded);
      return res.status(401).send("Unauthorized");
    }

    req.user = user as Request["user"];
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};
