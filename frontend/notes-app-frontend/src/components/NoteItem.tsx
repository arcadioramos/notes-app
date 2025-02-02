import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    TextField,
    MenuItem,
    Chip,
} from '@mui/material';
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
                                renderValue: (selected) => (
                                    <>
                                        {(selected as NoteCategory[]).map((category) => (
                                            <Chip key={category} label={category} sx={{ mr: 1, mb: 1 }} />
                                        ))}
                                    </>
                                ),
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
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {note.content}
                        </Typography>
                        <div>
                            {note.categories.map((category) => (
                                <Chip key={category} label={category} variant="outlined" color="primary" sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
            <CardActions>
                {editing ? (
                    <Button size="small" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                ) : (
                    <Button size="small" color="primary" onClick={handleEditToggle}>
                        Edit
                    </Button>
                )}
                <Button size="small" color="primary" onClick={onArchive}>
                    {note.archived ? 'Unarchive' : 'Archive'}
                </Button>
                <Button size="small" color="secondary" onClick={onDelete}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default NoteItem;
