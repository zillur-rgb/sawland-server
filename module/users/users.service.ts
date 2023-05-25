import { IUser } from "./users.interface";
import User from "./users.model";

export const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const allUsers = await User.find();
  return allUsers;
};

export const getAllAdminsFromDB = async (): Promise<IUser[]> => {
  const allAdmins = await User.find({ role: "admin" });
  return allAdmins;
};

// get single user
export const getSingleUserFromDB = async (
  id: string
): Promise<IUser | null> => {
  const singleUser = await User.findById({ _id: id });
  return singleUser;
};

// delete an user
export const deleteSingleUserFromDB = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete({ _id: id });
  return deletedUser;
};

// Create a user
export const createSingleUserInDB = async (payload: IUser) => {
  const newUser = new User(payload);
  await newUser.save();

  return newUser;
};

// Update user entry
export const updateSingleUserInDB = async (id: string, payload: any) => {
  const updatedSingleUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedSingleUser;
};

// Upgrading a normal user to admin
export const upgradeUserToAdmininDB = async (id: string) => {
  const updatedUser = User.findByIdAndUpdate(
    { _id: id },
    { role: "admin" },
    { new: true }
  );
  return updatedUser;
};

// Find out if a user is admin
export const isAdminByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  const isAdmin = user?.role === "admin";
  return isAdmin;
};
