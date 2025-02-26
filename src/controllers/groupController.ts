import { Request, Response } from "express";
import { GroupService } from "../services/groupService";

const groupService = new GroupService();

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, category } = req.body;
    const group = await groupService.createGroup(name, category);
    res.status(201).json(group);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).json(groups);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// New: Update a group
export const updateGroup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, category, isActive } = req.body;
      const group = await groupService.updateGroup(Number(id), name, category, isActive);
      res.status(200).json(group);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // New: Delete groups
  export const deleteGroups = async (req: Request, res: Response) => {
    try {
      const { ids } = req.body; // Expect an array of IDs
      await groupService.deleteGroups(ids);
      res.status(204).send(); // No content on successful delete
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };