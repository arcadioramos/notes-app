import React, { useState, useEffect } from 'react';
import { Note, NoteCategory } from '../types/Note';
import NoteItem from '../components/NoteItem';
import AddNoteForm from '../components/AddNoteForm';
import { fetchNotes } from '../utils/functionUtils';
import { archiveNote, createNote, deleteNote, updateNote } from '../services/noteService';
import { Container, Grid, Box, Typography, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

const NotesPage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const fetchAndSetNotes = async () => {
        const notesList = await fetchNotes();
        setNotes(notesList);
    };

    useEffect(() => {
        fetchAndSetNotes();
    }, []);

    const handleArchive = async (id: number, status: boolean) => {
        await archiveNote(id, !status);
        await fetchAndSetNotes();
    };

    const handleDelete = async (id: number) => {
        await deleteNote(id);
        await fetchAndSetNotes();
    };

    const handleAddNote = async (newNote: { title: string; content: string; categories: NoteCategory[]; }) => {
        try {
            // Convertir categorías de string a NoteCategory
            const noteCategories: NoteCategory[] = newNote.categories.map(cat => cat as NoteCategory);

            const createdNote = await createNote({
                title: newNote.title,
                content: newNote.content,
                archived: false,
                categories: noteCategories
            });
            await fetchAndSetNotes();
        } catch (error) {
            console.error('Error al crear nota:', error);
        }
    };

    const handleEditNote = async (updatedNote: Note) => {
        try {
            await updateNote(updatedNote.id!, updatedNote);
            await fetchAndSetNotes();
        } catch (error) {
            console.error('Error al editar nota:', error);
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value as string);
    };

    const filteredNotes = notes.filter(note => {
        if (selectedCategory === '') {
            return true;
        } else {
            return note.categories.includes(selectedCategory as NoteCategory);
        }
    });

    const activeNotes = filteredNotes.filter(note => !note.archived);
    const archivedNotes = filteredNotes.filter(note => note.archived);

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                        Active Notes
                    </Typography>
                    <Divider />
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Select Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            fullWidth
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={NoteCategory.PERSONAL}>Personal</MenuItem>
                            <MenuItem value={NoteCategory.WORK}>Work</MenuItem>
                            <MenuItem value={NoteCategory.STUDY}>Study</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3}>
                        {activeNotes.map(note => (
                            <Grid item xs={12} sm={6} md={4} key={note.id}>
                                <NoteItem
                                    note={note}
                                    onArchive={() => handleArchive(note.id!, note.archived)}
                                    onDelete={() => handleDelete(note.id!)}
                                    onEdit={handleEditNote}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        Add Note
                    </Typography>
                    <Divider />
                    <Box mt={3} sx={{ pl: 2 }}>
                        <AddNoteForm onAddNote={handleAddNote} />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                        Archived Notes
                    </Typography>
                    <Divider />
                    <Grid container spacing={3}>
                        {archivedNotes.map(note => (
                            <Grid item xs={12} sm={6} md={4} key={note.id}>
                                <NoteItem
                                    note={note}
                                    onArchive={() => handleArchive(note.id!, note.archived)}
                                    onDelete={() => handleDelete(note.id!)}
                                    onEdit={handleEditNote}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NotesPage;
