
import { eq } from "drizzle-orm";
import { db } from "./db";
import { projects } from "./schema";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await db
      .insert(projects)
      .values(req.body)
      .returning();

    res.status(201).json(newProject[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(projects);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProject = await db
      .update(projects)
      .set(req.body)
      .where(eq(projects.id, id))
      .returning();

    if (updatedProject.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updatedProject[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();

    if (deletedProject.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully", project: deletedProject[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};