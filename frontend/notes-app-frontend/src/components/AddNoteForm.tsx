import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Note, NoteCategory } from '../types/Note';
import { SelectChangeEvent } from '@mui/material/Select';

interface AddNoteFormProps {
    onAddNote: (note: Note) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onAddNote }) => {
    const [newNote, setNewNote] = useState({ title: '', content: '', archived: false, categories: [NoteCategory.PERSONAL] });

    const handleAddNote = () => {
        if (newNote.title && newNote.content) {
            onAddNote({
                title: newNote.title,
                content: newNote.content,
                archived: newNote.archived,
                categories: newNote.categories,
            });
            setNewNote({ title: '', content: '', archived: false, categories: [NoteCategory.PERSONAL] });
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent<typeof newNote.categories>) => {
        const selectedCategories = event.target.value as NoteCategory[];
        setNewNote({ ...newNote, categories: selectedCategories });
    };

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
                Add note
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    label="Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Categories</InputLabel>
                    <Select
                        multiple
                        value={newNote.categories}
                        onChange={handleCategoryChange}
                        fullWidth
                        sx={{ mt: 1 }}
                        renderValue={(selected) => (selected as NoteCategory[]).join(', ')}
                    >
                        {Object.values(NoteCategory).map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAddNote}>
                    Add note
                </Button>
            </Box>
        </Paper>
    );
};

export default AddNoteForm;
