import express from "express";
import { createDivision, deleteDivision, getDivisions, getDivisionsbyId, updateDivision } from "../controller/DivisionController.js";

const router = express.Router();

router.get('/divisions', getDivisions);
router.get('/divisions/:id', getDivisionsbyId);
router.post('/divisions', createDivision);
router.patch('/divisions/:id', updateDivision);
router.delete('/divisions/:id', deleteDivision);



export default router;