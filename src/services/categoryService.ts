import { AppDataSource } from "../config/db";
import { CategoryType } from "../models/categoryTypeModel";
import { CategoryItem } from "../models/categoryItemModel";
import { EntityNotFoundError } from "typeorm"; // Use EntityNotFoundError instead of NotFoundError

export class CategoryService {
  private categoryTypeRepository = AppDataSource.getRepository(CategoryType);
  private categoryItemRepository = AppDataSource.getRepository(CategoryItem);

  async createCategoryType(name: string, isMandatory: boolean = false): Promise<CategoryType> {
    const existingType = await this.categoryTypeRepository.findOne({ where: { name } });
    if (existingType) {
      throw new Error("Category type already exists!");
    }
    const categoryType = this.categoryTypeRepository.create({ name, isMandatory });
    return await this.categoryTypeRepository.save(categoryType);
  }

  async getAllCategoryTypes(): Promise<CategoryType[]> {
    return await this.categoryTypeRepository.find({ order: { name: "ASC" } });
  }

  async getCategoryTypeById(id: number): Promise<CategoryType> {
    const categoryType = await this.categoryTypeRepository.findOneOrFail({ where: { id } });
    return categoryType;
  }

  async updateCategoryType(id: number, name: string, isMandatory?: boolean): Promise<CategoryType> {
    const categoryType = await this.categoryTypeRepository.findOneOrFail({ where: { id } });
    if (name && name !== categoryType.name) {
      const existingType = await this.categoryTypeRepository.findOne({ where: { name } });
      if (existingType && existingType.id !== id) {
        throw new Error("Category type name already exists!");
      }
    }
    await this.categoryTypeRepository.update(id, { name, isMandatory });
    return await this.categoryTypeRepository.findOneOrFail({ where: { id } });
  }

  async deleteCategoryType(id: number): Promise<void> {
    const categoryType = await this.categoryTypeRepository.findOneOrFail({ where: { id } });
    await this.categoryTypeRepository.remove(categoryType);
  }

  async createCategoryItem(categoryTypeId: number, name: string, description?: string): Promise<CategoryItem> {
    const categoryType = await this.categoryTypeRepository.findOneOrFail({ where: { id: categoryTypeId } });
    const existingItem = await this.categoryItemRepository.findOne({ where: { name, categoryType: { id: categoryTypeId } } });
    if (existingItem) {
      throw new Error("Category item already exists for this type!");
    }
    const categoryItem = this.categoryItemRepository.create({ name, description, categoryType });
    return await this.categoryItemRepository.save(categoryItem);
  }

  async getAllCategoryItemsByType(categoryTypeId: number): Promise<CategoryItem[]> {
    return await this.categoryItemRepository.find({ where: { categoryType: { id: categoryTypeId } }, order: { name: "ASC" } });
  }

  async getCategoryItemById(id: number): Promise<CategoryItem> {
    const categoryItem = await this.categoryItemRepository.findOneOrFail({ where: { id } });
    return categoryItem;
  }

  async updateCategoryItem(id: number, name: string, description?: string): Promise<CategoryItem> {
    try {
      console.log("Attempting to update category item:", { id, name, description });
      const categoryItem = await this.categoryItemRepository.findOneOrFail({
        where: { id },
        relations: ["categoryType"], // Explicitly load the categoryType relationship
      });
      console.log("Found item:", {
        id: categoryItem.id,
        currentName: categoryItem.name,
        categoryTypeId: categoryItem.categoryType?.id,
      });

      if (name && name !== categoryItem.name) {
        if (!categoryItem.categoryType || !categoryItem.categoryType.id) {
          throw new Error("Category type not found for this item");
        }
        const existingItem = await this.categoryItemRepository.findOne({
          where: { name, categoryType: { id: categoryItem.categoryType.id } },
        });
        if (existingItem && existingItem.id !== id) {
          throw new Error("Category item name already exists for this type!");
        }
      }

      await this.categoryItemRepository.update(id, { name, description });
      const updatedItem = await this.categoryItemRepository.findOneOrFail({
        where: { id },
        relations: ["categoryType"],
      });
      console.log("Updated item successfully:", updatedItem);
      return updatedItem;
    } catch (error) {
      console.error("Error updating category item:", error);
      if (error instanceof EntityNotFoundError) {
        throw new Error(`Category item with ID ${id} not found`);
      }
      throw error instanceof Error ? error : new Error("Failed to update category item");
    }
  }

  async deleteCategoryItem(id: number): Promise<void> {
    const categoryItem = await this.categoryItemRepository.findOneOrFail({ where: { id } });
    await this.categoryItemRepository.remove(categoryItem);
  }
}