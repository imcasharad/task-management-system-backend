import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";

export class CategoryController {
  private categoryService = new CategoryService();

  async getAllCategoryTypes(req: Request, res: Response) {
    try {
      const categoryTypes = await this.categoryService.getAllCategoryTypes();
      res.json(categoryTypes);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching category types", error: (error as Error).message });
    }
  }

  async getCategoryTypeById(req: Request, res: Response) {
    try {
      const categoryType = await this.categoryService.getCategoryTypeById(parseInt(req.params.id));
      res.json(categoryType);
    } catch (error: any) {
      res.status(404).json({ message: "Category type not found" }) || res.status(500).json({ message: "Error fetching category type", error: (error as Error).message });
    }
  }

  async createCategoryType(req: Request, res: Response) {
    try {
      const { name, isMandatory } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const categoryType = await this.categoryService.createCategoryType(name, isMandatory);
      res.status(201).json(categoryType);
    } catch (error: any) {
      res.status(500).json({ message: "Error creating category type", error: (error as Error).message });
    }
  }

  async updateCategoryType(req: Request, res: Response) {
    try {
      const { name, isMandatory } = req.body;
      const categoryType = await this.categoryService.updateCategoryType(parseInt(req.params.id), name, isMandatory);
      res.json(categoryType);
    } catch (error: any) {
      res.status(404).json({ message: "Category type not found" }) || res.status(500).json({ message: "Error updating category type", error: (error as Error).message });
    }
  }

  async deleteCategoryType(req: Request, res: Response) {
    try {
      await this.categoryService.deleteCategoryType(parseInt(req.params.id));
      res.json({ message: "Category type deleted successfully" });
    } catch (error: any) {
      res.status(404).json({ message: "Category type not found" }) || res.status(500).json({ message: "Error deleting category type", error: (error as Error).message });
    }
  }

  async getAllCategoryItemsByType(req: Request, res: Response) {
    try {
      const categoryTypeId = parseInt(req.params.typeId); // Assuming you want items by type ID
      const categoryItems = await this.categoryService.getAllCategoryItemsByType(categoryTypeId);
      res.json(categoryItems);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching category items", error: (error as Error).message });
    }
  }

  async createCategoryItem(req: Request, res: Response) {
    try {
      const { categoryTypeId, name, description } = req.body;
      if (!categoryTypeId || !name) {
        return res.status(400).json({ message: "Category type ID and name are required" });
      }
      const categoryItem = await this.categoryService.createCategoryItem(categoryTypeId, name, description);
      res.status(201).json(categoryItem);
    } catch (error: any) {
      res.status(500).json({ message: "Error creating category item", error: (error as Error).message });
    }
  }

  async getCategoryItemById(req: Request, res: Response) {
    try {
      const categoryItem = await this.categoryService.getCategoryItemById(parseInt(req.params.id));
      res.json(categoryItem);
    } catch (error: any) {
      res.status(404).json({ message: "Category item not found" }) || res.status(500).json({ message: "Error fetching category item", error: (error as Error).message });
    }
  }

  async updateCategoryItem(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      const categoryItem = await this.categoryService.updateCategoryItem(parseInt(req.params.id), name, description);
      res.json(categoryItem);
    } catch (error: any) {
      res.status(404).json({ message: "Category item not found" }) || res.status(500).json({ message: "Error updating category item", error: (error as Error).message });
    }
  }

  async deleteCategoryItem(req: Request, res: Response) {
    try {
      await this.categoryService.deleteCategoryItem(parseInt(req.params.id));
      res.json({ message: "Category item deleted successfully" });
    } catch (error: any) {
      res.status(404).json({ message: "Category item not found" }) || res.status(500).json({ message: "Error deleting category item", error: (error as Error).message });
    }
  }
}