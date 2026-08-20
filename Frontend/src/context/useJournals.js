import { createContext, useContext } from "react";

export const JournalContext = createContext(null);

export const useJournals = () => useContext(JournalContext);
