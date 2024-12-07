import express from "express";
import { createUser, deleteUser, getUsers, getUsersbyDiv, getUsersbyId, updateUser } from "../controller/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersbyId);
router.get('/users/d/:div', getUsersbyDiv);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);



export default router;