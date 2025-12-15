import { Router } from "express";
import { createProject, getProjects, updateProject, deleteProject,loginUser,registerUser } from "./controller";
import authMiddleware from "./middleware";

const router = Router();

router.post("/projects",authMiddleware, createProject);
router.get("/projects",authMiddleware, getProjects);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
