import express from "express";
import { createArchive, deleteArchive, getArchives, getArchivesbyReview, getArchivesbyId, getArchivesbyUId, updateArchive, getArchivesbyDiv } from "../controller/ArchiveController.js";

const router = express.Router();

router.get('/archives', getArchives);
router.get('/archives/a/:id', getArchivesbyId);
router.get('/archives/u/:id', getArchivesbyUId);
router.get('/archives/a/r', getArchivesbyReview);
router.get('/archives/d/:dname', getArchivesbyDiv);
router.get('/archives/d/:dname/:status', getArchivesbyReview); 
router.post('/archives/up', createArchive);
router.patch('/archives/a/:id', updateArchive);
router.delete('/archives/a/:id', deleteArchive);


export default router;