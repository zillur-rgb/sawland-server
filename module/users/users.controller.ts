import { Request, Response } from "express";
import { getAllBlogsfromDB } from "../blog/blog.service";
import {
  createSingleUserInDB,
  deleteSingleUserFromDB,
  getAllAdminsFromDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  isAdminByEmail,
  updateSingleUserInDB,
  upgradeUserToAdmininDB,
} from "./users.service";

export const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await getAllUsersFromDB();

  res.status(200).json({
    status: 200,
    data: allUsers,
    count: allUsers.length,
  });
};

// Finding all the admins
export const getAllAdmin = async (req: Request, res: Response) => {
  const allAdmins = await getAllAdminsFromDB();

  res.status(200).json({
    status: 200,
    data: allAdmins,
    count: allAdmins.length,
  });
};

// Get single user
export const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleUser = await getSingleUserFromDB(id);

  res.status(200).json({
    status: 200,
    data: singleUser,
  });
};

// Delete single user
export const deleteSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteUser = await deleteSingleUserFromDB(id);

  res.status(200).send(`Deleted ${deleteUser!.email}`);
};

// Creating a user
export const createSingleUser = async (req: Request, res: Response) => {
  const createdUser = await createSingleUserInDB(req.body);

  res.status(200).json({
    status: 200,
    createdUser,
  });
};

// updating a single user
export const updateSingleUser = async (req: Request, res: Response) => {
  const updatedUser = await updateSingleUserInDB(req.params.id, req.body);

  res.status(200).json({
    status: 200,
    updatedUser,
  });
};

// Upgrading a user to admin
export const upgradeUserToAdmin = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = upgradeUserToAdmininDB(id);

  res.status(200).json({
    status: 200,
    data: updatedUser,
  });
};

// Find out if an user is admin
export const isUserAdmin = async (req: Request, res: Response) => {
  const { email } = req.params;
  const isAdmin = await isAdminByEmail(email);

  res.status(200).json({
    status: 200,
    isAdmin,
  });
};
