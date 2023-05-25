import { Request, Response } from "express";
import { getAllBlogsfromDB } from "../blog/blog.service";
import {
  addToolToDB,
  deletSingleToolFromDB,
  getAllToolsFromDB,
  getSingleToolFromDB,
  updateSingleToolInDB,
} from "./tools.service";
import { ITools } from "./tools.interface";

// Get all tools from the tools colelction
export const getAllTools = async (req: Request, res: Response) => {
  const allTools = await getAllToolsFromDB();

  res.status(200).json({
    status: 200,
    data: allTools,
    count: allTools.length,
  });
};

/**
 * Get single tool from the collection
 * @param req
 * @param res
 */
export const getSingleTool = async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleTool = await getSingleToolFromDB(id);
  res.status(200).json({
    status: 200,
    data: singleTool,
  });
};

/**
 * Add a new tool to the collection
 * @param req Send body of the tool to request
 * @param res
 */
export const addATool = async (req: Request, res: Response) => {
  const newTool = addToolToDB(req.body);

  res.status(200).json({
    status: 200,
    data: newTool,
  });
};

export const deleteSingleTool = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedTool = deletSingleToolFromDB(id);

  res.status(200).json({
    status: 200,
    message: `deleted ${deletedTool}`,
  });
};

// Updating the tool
export const updateSingleTool = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const updatedTool = updateSingleToolInDB(id, payload);

  res.status(200).json({
    status: 200,
    data: updatedTool,
  });
};
