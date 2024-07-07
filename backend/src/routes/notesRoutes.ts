import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote, archiveNote } from '../controllers/notesController';

const router = Router();

router.get('/notes', getNotes);
router.post('/notes', createNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);
router.patch('/notes/:id/archive', archiveNote);

export default router;