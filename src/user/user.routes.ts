import { Router, Request, Response, NextFunction } from "express";
import validateQuery from "../middleware/verify-query";
import { User, UserUpdate, userSchema, userUpdateSchema } from "./user.schema";
import { AddUser, getAllUser, getUser, updateUser } from "./user.service";

const router = Router();

const handleAdd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, dob, nationality, voterId } = req.body as User;
    await AddUser({ name, dob, nationality, voterId });
    res.status(201).json({
      success: true,
      message: `user added successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const handleGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { voterId } = req.params;
    const data = await getUser(voterId);
    res.status(200).json({
      success: true,
      body: data,
    });
  } catch (err) {
    next(err);
  }
};

const handleGetAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllUser();
    res.status(200).json({
      success: true,
      body: data,
    });
  } catch (err) {
    next(err);
  }
};

const handleUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { voterId } = req.params;
    const { name, dob, nationality } = req.body as UserUpdate;
    await updateUser(voterId, { name, dob, nationality });
    res.status(200).json({
      success: true,
      message: `user updated successfully`,
    });
  } catch (err) {
    next(err);
  }
};

router.post("/add", validateQuery("body", userSchema), handleAdd);
router.put(
  "/update/:voterId",
  validateQuery("body", userUpdateSchema),
  handleUpdateUser
);
router.get("/fetch/:voterId", handleGetUser);
router.get("/all", handleGetAllUser);

export default router;
