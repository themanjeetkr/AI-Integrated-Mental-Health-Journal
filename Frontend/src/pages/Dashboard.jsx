import { useEffect, useState } from "react";
import { getJournals } from "../services/api";
import Sidebar from "../components/layout/Sidebar";
import JounalForm from "../components/journal/JournalForm";
import JournalCard from "../components/journal/JournalCard";

export default function Dashboard({ token, setToken }) {
  const [journals, setJournals] = useState([]);

  const fetchData = () => {
    getJournals(token).then(setJournals);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar setToken={setToken} />

      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-8">
          Your Reflections
        </h2>

        <CreateJournalForm token={token} refresh={fetchData} />

        <div className="space-y-6">
          {journals.map(j => (
            <JournalCard key={j._id} journal={j} />
          ))}
        </div>
      </div>
    </div>
  );
}