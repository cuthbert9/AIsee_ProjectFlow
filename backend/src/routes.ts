import { Router } from "express";
import { createProject, getProjects, updateProject, deleteProject,loginUser,registerUser,getUser } from "./controller";
import authMiddleware from "./middleware";

const router = Router();

router.post("/projects",authMiddleware, createProject);
router.get("/projects",authMiddleware, getProjects);
router.put("/projects/:id",authMiddleware, updateProject);
router.delete("/projects/:id",authMiddleware, deleteProject);
router.get("/user",authMiddleware, getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
