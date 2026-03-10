import { useEffect, useState } from "react";
import { getJournals } from "../services/api";
import Sidebar from "../components/layout/Sidebar";
import JournalForm from "../components/journal/JournalForm";
import JournalCard from "../components/journal/JournalCard";

export default function Dashboard({ token, setToken }) {
  const [journals, setJournals] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getJournals(token);
      setJournals(data);
    } catch (error) {
      console.error("Error fetching journals:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <Sidebar setToken={setToken} />

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold mb-8">
          Your Reflections
        </h2>

        {/* Journal Form */}
        <JournalForm token={token} refresh={fetchData} />

        {/* Journal List */}
        <div className="space-y-6">
          {journals.map((j) => (
            <JournalCard key={j._id} journal={j} />
          ))}
        </div>
      </div>

    </div>
  );
}