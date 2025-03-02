import { AppDataSource } from "../config/db";
import { Group } from "../models/groupModel";
import { CategoryItem } from "../models/categoryItemModel";
import { CategoryType } from "../models/categoryTypeModel";
import { In } from "typeorm";

export class GroupService {
  private groupRepository = AppDataSource.getRepository(Group);
  private categoryItemRepository = AppDataSource.getRepository(CategoryItem);
  private categoryTypeRepository = AppDataSource.getRepository(CategoryType);

  async createGroup(name: string, categoryId?: number): Promise<Group> {
    const normalizedName = name.trim().toLowerCase();
    const existingGroup = await this.groupRepository.findOne({ where: { name: normalizedName } });
    if (existingGroup) {
      throw new Error("Group name already exists (case-insensitive)!");
    }

    // Check if Group category type is mandatory
    const groupCategoryType = await this.categoryTypeRepository.findOne({ where: { name: "Group" } });
    if (!groupCategoryType) {
      throw new Error("Group category type not found!");
    }

    if (groupCategoryType.isMandatory && !categoryId) {
      throw new Error("Category is required for Groups because the Group category type is mandatory!");
    }

    if (categoryId) {
      const categoryItem = await this.categoryItemRepository.findOne({ where: { id: categoryId } });
      if (!categoryItem) {
        throw new Error("Invalid category ID provided!");
      }
      if (categoryItem.categoryType.id !== groupCategoryType.id) {
        throw new Error("Category must belong to the Group category type!");
      }
    }

    const group = new Group();
    group.name = name; // Store the original name
    group.categoryId = categoryId; // Use categoryId to reference CategoryItem
    return await this.groupRepository.save(group);
  }

  async getAllGroups(): Promise<Group[]> {
    const groups = await this.groupRepository.find();
    // Fetch category items and types for display
    for (const group of groups) {
      if (group.categoryId) {
        const categoryItem = await this.categoryItemRepository.findOne({ where: { id: group.categoryId } });
        if (categoryItem) {
          const categoryType = await this.categoryTypeRepository.findOne({ where: { id: categoryItem.categoryType.id } });
          // Add virtual properties for frontend compatibility
          Object.defineProperty(group, "category", {
            value: categoryItem.name,
            writable: true,
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(group, "categoryType", {
            value: categoryType?.name || "No Type",
            writable: true,
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(group, "isMandatory", {
            value: categoryType?.isMandatory || false,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        } else {
          Object.defineProperty(group, "category", {
            value: "No Category",
            writable: true,
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(group, "categoryType", {
            value: "No Type",
            writable: true,
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(group, "isMandatory", {
            value: false,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        }
      } else {
        Object.defineProperty(group, "category", {
          value: "No Category",
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(group, "categoryType", {
          value: "No Type",
          writable: true,
          enumerable: true,
          configurable: true,
        });
        Object.defineProperty(group, "isMandatory", {
          value: false,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
    }
    return groups;
  }

  async updateGroup(id: number, name: string, categoryId?: number, isActive?: boolean): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new Error("Group not found!");
    }

    if (name && name !== group.name) {
      const normalizedName = name.trim().toLowerCase();
      const existingGroup = await this.groupRepository.findOne({ where: { name: normalizedName } });
      if (existingGroup && existingGroup.id !== id) {
        throw new Error("Group name already exists (case-insensitive)!");
      }
      group.name = name; // Store the original name
    }

    // Check if Group category type is mandatory
    const groupCategoryType = await this.categoryTypeRepository.findOne({ where: { name: "Group" } });
    if (!groupCategoryType) {
      throw new Error("Group category type not found!");
    }

    if (groupCategoryType.isMandatory && !categoryId) {
      throw new Error("Category is required for Groups because the Group category type is mandatory!");
    }

    if (categoryId) {
      const categoryItem = await this.categoryItemRepository.findOne({ where: { id: categoryId } });
      if (!categoryItem) {
        throw new Error("Invalid category ID provided!");
      }
      if (categoryItem.categoryType.id !== groupCategoryType.id) {
        throw new Error("Category must belong to the Group category type!");
      }
    }

    group.categoryId = categoryId !== undefined ? categoryId : group.categoryId;
    group.isActive = isActive !== undefined ? isActive : group.isActive;
    return await this.groupRepository.save(group);
  }

  async deleteGroups(ids: number[]): Promise<void> {
    if (ids.length === 0) return; // Nothing to delete
    const groups = await this.groupRepository.find({ where: { id: In(ids) } });
    if (groups.length !== ids.length) {
      throw new Error("Some groups not found!");
    }
    await this.groupRepository.delete(ids);
  }
}