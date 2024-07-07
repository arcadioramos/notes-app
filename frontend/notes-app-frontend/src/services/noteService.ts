import axios from 'axios';
import { Note } from '../types/Note';

const API_URL = 'http://localhost:3010/api/notes';

export const getNotes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch ( error) {
        console.log(error)
    }
};

export const createNote = async (note: Note) => {
  const response = await axios.post(API_URL, note);
  return response.data;
};

export const updateNote = async (id: number, note: Note) => {
  const response = await axios.put(`${API_URL}/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const archiveNote = async (id: number, archived: boolean) => {
  const response = await axios.patch(`${API_URL}/${id}/archive`, { archived });
  return response.data;
};
