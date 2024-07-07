import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import NoteItem from '../components/NoteItem';
import AddNoteForm from '../components/AddNoteForm';
import { Note, NoteCategory } from '../types/Note';
import {
    archiveNote,
    createNote,
    deleteNote,
    updateNote,
} from '../services/noteService';
import { fetchNotes } from '../utils/functionUtils';

const NotesPage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        fetchAndSetNotes();
    }, []);

    const fetchAndSetNotes = async () => {
        const notesList = await fetchNotes();
        setNotes(notesList);
    };

    const handleArchive = async (id: number, status: boolean) => {
        try {
            await archiveNote(id, !status);
            await fetchAndSetNotes();
        } catch (error) {
            console.error('Error archiving note:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteNote(id);
            await fetchAndSetNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleAddNote = async (newNote: {
        title: string;
        content: string;
        categories: NoteCategory[];
    }) => {
        try {
            const noteCategories: NoteCategory[] = newNote.categories.map(
                (cat) => cat as NoteCategory
            );

            await createNote({
                title: newNote.title,
                content: newNote.content,
                archived: false,
                categories: noteCategories,
            });

            await fetchAndSetNotes();
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleEditNote = async (updatedNote: Note) => {
        try {
            await updateNote(updatedNote.id!, updatedNote);
            await fetchAndSetNotes();
        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    const handleCategoryChange = (
        event: SelectChangeEvent<string>
    ) => {
        setSelectedCategory(event.target.value as string);
    };

    const filteredNotes = notes.filter((note) => {
        if (selectedCategory === '') {
            return true;
        } else {
            return note.categories.includes(
                selectedCategory as NoteCategory
            );
        }
    });

    const activeNotes = filteredNotes.filter(
        (note) => !note.archived
    );
    const archivedNotes = filteredNotes.filter(
        (note) => note.archived
    );

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Active Notes
                    </Typography>
                    <Divider />
                    <FormControl fullWidth>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            fullWidth
                        >
                            <MenuItem value="">
                                All Categories
                            </MenuItem>
                            {Object.values(NoteCategory).map(
                                (category) => (
                                    <MenuItem
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                    <Grid
                        container
                        spacing={3}
                    >
                        {activeNotes.map(
                            (note) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={note.id}
                                >
                                    <NoteItem
                                        note={
                                            note
                                        }
                                        onArchive={() =>
                                            handleArchive(
                                                note.id!,
                                                note.archived
                                            )
                                        }
                                        onDelete={() =>
                                            handleDelete(
                                                note.id!
                                            )
                                        }
                                        onEdit={
                                            handleEditNote
                                        }
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Add Note
                    </Typography>
                    <Divider />
                    <Box
                        mt={3}
                        sx={{ pl: 2 }}
                    >
                        <AddNoteForm
                            onAddNote={
                                handleAddNote
                            }
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        gutterBottom
                    >
                        Archived Notes
                    </Typography>
                    <Divider />
                    <Grid
                        container
                        spacing={3}
                    >
                        {archivedNotes.map(
                            (note) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={note.id}
                                >
                                    <NoteItem
                                        note={
                                            note
                                        }
                                        onArchive={() =>
                                            handleArchive(
                                                note.id!,
                                                note.archived
                                            )
                                        }
                                        onDelete={() =>
                                            handleDelete(
                                                note.id!
                                            )
                                        }
                                        onEdit={
                                            handleEditNote
                                        }
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NotesPage;
