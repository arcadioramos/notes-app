import { deleteNote, getNotes } from "../services/noteService";

export const fetchNotes = async () => {
    const notesList = await getNotes();
    return notesList;
}

export const handleOnDelete = async (id: number) => {
    const response = await deleteNote(id);
    return response;
}