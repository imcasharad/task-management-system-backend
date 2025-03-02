import { Router, Request, Response, NextFunction } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router();
const categoryController = new CategoryController();

// Category Types
router.get("/types", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.getAllCategoryTypes(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/types/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.getCategoryTypeById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/types", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.createCategoryType(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/types/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.updateCategoryType(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/types/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.deleteCategoryType(req, res);
  } catch (error) {
    next(error);
  }
});

// Category Items
router.get("/types/:typeId/items", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.getAllCategoryItemsByType(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/items/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.getCategoryItemById(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/items", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.createCategoryItem(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/items/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.updateCategoryItem(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/items/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await categoryController.deleteCategoryItem(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;