import { Request, Response } from "express";
import { GroupService } from "../services/groupService";

const groupService = new GroupService();

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { name, categoryId } = req.body;
    const group = await groupService.createGroup(name, categoryId);
    res.status(201).json(group);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    // Ensure virtual properties are included in the JSON response
    const response = groups.map(group => ({
      ...group,
      category: group.category,
      categoryType: group.categoryType,
      isMandatory: group.isMandatory,
    }));
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, categoryId, isActive } = req.body;
    const group = await groupService.updateGroup(Number(id), name, categoryId, isActive);
    res.status(200).json(group);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGroups = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    await groupService.deleteGroups(ids);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};