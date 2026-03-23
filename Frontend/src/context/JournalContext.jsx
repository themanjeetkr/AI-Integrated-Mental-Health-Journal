import React, { createContext, useContext, useState, useCallback } from "react";
import {
  getJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../services/api";  // ← correct path
import toast from "react-hot-toast";

const JournalContext = createContext(null);

const getToken = () => localStorage.getItem("token");  // ← gets token automatically

export function JournalProvider({ children }) {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentJournal, setCurrentJournal] = useState(null);

  const fetchJournals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getJournals(getToken());        // ← no destructure, pass token
      setJournals(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load journals");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJournalById = async (id) => {
    setLoading(true);
    try {
      const data = await getJournalById(id, getToken()); // ← pass token
      setCurrentJournal(data);
      return data;
    } catch {
      toast.error("Journal not found");
    } finally {
      setLoading(false);
    }
  };

  const addJournal = async (journalData) => {
    try {
      const data = await createJournal(journalData, getToken()); // ← pass token
      setJournals((prev) => [data, ...prev]);
      toast.success("Journal saved!");
      return data;
    } catch (err) {
      toast.error("Failed to save journal");
      return null;
    }
  };

  const editJournal = async (id, journalData) => {
    try {
      const data = await updateJournal(id, journalData, getToken()); // ← pass token
      setJournals((prev) => prev.map((j) => (j._id === id ? data : j)));
      toast.success("Journal updated!");
      return data;
    } catch {
      toast.error("Failed to update journal");
      return null;
    }
  };

  const removeJournal = async (id) => {
    try {
      await deleteJournal(id, getToken());  // ← pass token
      setJournals((prev) => prev.filter((j) => j._id !== id));
      toast.success("Journal deleted");
    } catch {
      toast.error("Failed to delete journal");
    }
  };

  return (
    <JournalContext.Provider
      value={{
        journals,
        loading,
        currentJournal,
        fetchJournals,
        fetchJournalById,
        addJournal,
        editJournal,
        removeJournal,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}

export const useJournals = () => useContext(JournalContext);