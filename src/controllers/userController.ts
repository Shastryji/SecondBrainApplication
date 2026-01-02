import { Request, Response } from "express"
import { UserModel } from "../model/db.ts"
import bcrypt from "bcrypt"

export const createUser = async (req: Request, res: Response) => {
  try {

    //TODO: create the zod schema for validations inside middlware
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    await UserModel.create({
      username: username,
      password: hashedPassword
    })
  } catch (error) {

    if (error instanceof zod.ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const getUser = async () => {

}

export const updateContent = async (): Promise<void> => {

}

export const getContent = async (): Promise<void> => {

}



