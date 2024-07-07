import { Request, Response } from 'express';
import { pool } from '../database';
import { Note } from '../models/Note';

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  const [rows] = await pool.query('SELECT * FROM notes');
  res.json(rows);
};

export const createNote = async (req: Request, res: Response): Promise<void> => {
  const newNote: Note = req.body;

  const formattedCategories = JSON.stringify(newNote.categories.map(cat => `${cat}`));

  const noteData = {
      title: newNote.title,
      content: newNote.content,
      archived: newNote.archived,
      categories: formattedCategories,
  };

  try {
      await pool.query('INSERT INTO notes SET ?', [noteData]);
      res.json({ message: 'Note added successfully' });
  } catch (error) {
      console.error('Error adding note:', error);
      res.status(500).json({ message: 'Error adding note' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedNote: Note = req.body;
    const formattedCategories = JSON.stringify(updatedNote.categories.map(cat => `${cat}`));
    console.log(formattedCategories)
    const formattedNoteData = {
        title: updatedNote.title,
        content: updatedNote.content,
        archived: updatedNote.archived,
        categories: formattedCategories,
    };

  await pool.query('UPDATE notes SET ? WHERE id = ?', [formattedNoteData, id]);
  res.json({ message: 'Note updated successfully' });
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await pool.query('DELETE FROM notes WHERE id = ?', [id]);
  res.json({ message: 'Note deleted successfully' });
};

export const archiveNote = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { archived } = req.body;
  await pool.query('UPDATE notes SET archived = ? WHERE id = ?', [archived, id]);
  res.json({ message: 'Note archived status updated successfully' });
};
