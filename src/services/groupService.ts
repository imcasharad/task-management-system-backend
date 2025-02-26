import { AppDataSource } from "../config/db";
import { Group } from "../models/groupModel";
import { In } from "typeorm";

export class GroupService {
  private groupRepository = AppDataSource.getRepository(Group);

  async createGroup(name: string, category?: string): Promise<Group> {
    const normalizedName = name.trim().toLowerCase(); // Trim and normalize to lowercase
    const existingGroup = await this.groupRepository.findOne({ where: { name: normalizedName } });
    if (existingGroup) {
      throw new Error("Group name already exists (case-insensitive)!");
    }
    const group = new Group();
    group.name = name; // Store the original name
    group.category = category;
    return await this.groupRepository.save(group);
  }

  async getAllGroups(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async updateGroup(id: number, name: string, category?: string, isActive?: boolean): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new Error("Group not found!");
    }
    if (name && name !== group.name) {
      const normalizedName = name.trim().toLowerCase(); // Trim and normalize to lowercase
      const existingGroup = await this.groupRepository.findOne({ where: { name: normalizedName } });
      if (existingGroup && existingGroup.id !== id) { // Allow updating to the same name
        throw new Error("Group name already exists (case-insensitive)!");
      }
      group.name = name; // Store the original name
    }
    group.category = category !== undefined ? category : group.category;
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