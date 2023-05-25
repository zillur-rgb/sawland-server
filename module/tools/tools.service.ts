import { ITools } from "./tools.interface";
import Tool from "./tools.model";

export const getAllToolsFromDB = async () => {
  const allTools = Tool.find();
  return allTools;
};

export const getSingleToolFromDB = async (payload: string) => {
  const singleTool = Tool.findOne({ _id: payload });
  return singleTool;
};

export const addToolToDB = async (payload: ITools): Promise<ITools> => {
  const newTool = new Tool(payload);
  await newTool.save();
  return newTool;
};

// Delete a tool from the DB
export const deletSingleToolFromDB = async (payload: string) => {
  const deletedTool = await Tool.deleteOne({ _id: payload });
  return deletedTool;
};

// update a tool
export const updateSingleToolInDB = async (id: string, payload: any) => {
  const filter = id;
  const update = payload;

  const updatedTool = await Tool.findByIdAndUpdate(filter, update, {
    new: true,
  });

  return updatedTool;
};
