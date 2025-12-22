import 'dotenv/config';
import { eq } from "drizzle-orm";
import { db } from "./db";
import { projects ,users} from "./schema";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



//create project must receive the userId along with other project details

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = await db
      .insert(projects)
      .values({ 
        //@ts-ignore       
        userId: req.user.userId,
        ...req.body,
      })
      .returning();

    res.status(201).json(newProject[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const data = await db.select().from(projects).where(eq(projects.userId, req.user.userId));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};


export const getUser=async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const user = await db.select().from(users).where(eq(users.id, req.user.userId));
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user[0].email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}


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


export const registerUser= async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;    
    const hash = await bcrypt.hash(password, 10);    
    await db.insert(users).values({
      email,
      passwordHash: hash,
    });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    //@ts-ignore
    res.status(500).json({ error: "Failed to Register New User " });
  }
}


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; 
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    
    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

  
    const isPasswordValid = await bcrypt.compare(
      password,
      user[0].passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user[0].id },      
      process.env.JWT_SECRET || "mysecretkey123",
      { expiresIn: "90d" }
    );

    return res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to login user" });
  }
};
