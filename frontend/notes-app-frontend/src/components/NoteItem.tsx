import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, TextField, MenuItem } from '@mui/material';
import { Note, NoteCategory } from '../types/Note';

interface NoteItemProps {
    note: Note;
    onArchive: () => void;
    onDelete: () => void;
    onEdit: (updatedNote: Note) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onArchive, onDelete, onEdit }) => {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const [editedCategories, setEditedCategories] = useState<NoteCategory[]>(note.categories);

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSave = () => {
        onEdit({
            ...note,
            title: editedTitle,
            content: editedContent,
            categories: editedCategories,
        });
        setEditing(false);
    };

    const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setEditedCategories(event.target.value as NoteCategory[]);
    };
    return (
        <Card sx={{ border: note.archived ? '1px solid #ccc' : 'none', backgroundColor: note.archived ? '#f0f0f0' : 'transparent' }}>
            <CardContent>
                {editing ? (
                    <>
                        <TextField
                            label="Title"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Content"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            select
                            label="Categorías"
                            value={editedCategories}
                            onChange={handleCategoryChange}
                            fullWidth
                            SelectProps={{
                                multiple: true,
                                renderValue: (selected) => (selected as NoteCategory[]).join(', '),
                            }}
                            sx={{ mb: 2 }}
                        >
                            {Object.values(NoteCategory).map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </>
                ) : (
                    <>
                        <Typography variant="h5" component="div">
                            {note.title}
                        </Typography>
                        <Typography variant="body2">
                            {note.content}
                        </Typography>
                        {note.categories != null && note.categories.map((category)=>{
                          return <Typography variant="body2">
                          {category}
                      </Typography>
                        })}
                    </>
                )}
            </CardContent>
            <CardActions>
                {editing ? (
                    <Button size="small" color="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                ) : (
                    <Button size="small" color="primary" onClick={handleEditToggle}>
                        Editar
                    </Button>
                )}
                <Button size="small" color="primary" onClick={onArchive}>
                    {note.archived ? 'Desarchivar' : 'Archivar'}
                </Button>
                <Button size="small" color="secondary" onClick={onDelete}>
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
};

export default NoteItem;
