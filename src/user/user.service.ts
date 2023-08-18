import { DatabaseService } from "../services/database.service";
import { errors } from "../errors/error.constants";
import { User, UserUpdate } from "./user.schema";

export const AddUser = async ({ name, dob, nationality, voterId }: User) => {
  const db = await DatabaseService.getInstance().getDb("users");
  const UserExist = await db.findOne({
    voterId: voterId,
  });
  if (UserExist) {
    throw errors.USER_ALREADY_EXIST;
  } else {
    await db.insertOne({
      name: name,
      dob: dob,
      nationality: nationality,
      voterId: voterId,
    });
  }
};

export const getUser = async (voterId: String) => {
  const db = await DatabaseService.getInstance().getDb("users");
  const user = await db.findOne({
    voterId: voterId,
  });
  if (user) {
    return user;
  } else {
    throw errors.USER_NOT_FOUND;
  }
};

export const getAllUser = async () => {
  const db = await DatabaseService.getInstance().getDb("users");
  const users = await db.find().toArray();
  return users;
};

export const updateUser = async (voterId: String, update: UserUpdate) => {
  const db = await DatabaseService.getInstance().getDb("users");
  const user = await db.findOne({
    voterId: voterId,
  });
  if (user) {
    await db.updateOne(
      {
        voterId: voterId,
      },
      {
        $set: update,
      }
    );
  } else {
    throw errors.USER_NOT_FOUND;
  }
};
