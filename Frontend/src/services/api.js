const BASE_URL = "http://localhost:5000/api";

// ---------------- AUTH ----------------
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

// ---------------- JOURNALS ----------------
export const getJournals = async (token) => {
  const res = await fetch(`${BASE_URL}/journals`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const getJournalById = async (id, token) => {
  const res = await fetch(`${BASE_URL}/journals/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createJournal = async (data, token) => {
  const res = await fetch(`${BASE_URL}/journals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateJournal = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/journals/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteJournal = async (id, token) => {
  const res = await fetch(`${BASE_URL}/journals/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// ---------------- ANALYTICS ----------------
export const getEmotionStats = async (token) => {
  const res = await fetch(`${BASE_URL}/journals/stats/emotions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};