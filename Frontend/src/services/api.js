import axios from "axios";

const PRODUCTION_API_BASE_URL =
  "https://ai-integrated-mental-health-journal.onrender.com/api";

const normalizeApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const isProduction = import.meta.env.PROD;
  const isBrowser = typeof window !== "undefined";
  const isLocalPage =
    isBrowser &&
    ["localhost", "127.0.0.1"].includes(window.location.hostname);

  if (configuredUrl) {
    if (
      isProduction &&
      isBrowser &&
      !isLocalPage &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredUrl)
    ) {
      return PRODUCTION_API_BASE_URL;
    }

    const withoutTrailingSlash = configuredUrl.replace(/\/+$/, "");
    return withoutTrailingSlash.endsWith("/api")
      ? withoutTrailingSlash
      : `${withoutTrailingSlash}/api`;
  }

  return isProduction ? PRODUCTION_API_BASE_URL : "http://localhost:5000/api";
};

const BASE_URL = normalizeApiBaseUrl();

const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

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

export const updateProfileRequest = async (data, token) => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updatePasswordRequest = async (data, token) => {
  const res = await fetch(`${BASE_URL}/auth/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
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

export const getJournalSuggestions = async (data, token) => {
  const res = await fetch(`${BASE_URL}/journals/suggest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get suggestions");
  }

  return res.json();
};

// ---------------- ANALYTICS ----------------
export const getEmotionStats = async (token) => {
  const res = await fetch(`${BASE_URL}/journals/stats/emotions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// ---------------- MEALS ----------------
export const analyzeMealRequest = async (mealText, token) => {
  const { data } = await axios.post(
    `${BASE_URL}/meals/analyze`,
    { mealText },
    { headers: getAuthHeaders(token) }
  );
  return data;
};

export const saveMealRequest = async (analysis, token) => {
  const { data } = await axios.post(
    `${BASE_URL}/meals/save`,
    analysis,
    { headers: getAuthHeaders(token) }
  );
  return data;
};

export const getMealHistoryRequest = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/meals/history`, {
    headers: getAuthHeaders(token),
  });
  return data;
};

export const getTodayNutritionSummaryRequest = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/meals/today-summary`, {
    headers: getAuthHeaders(token),
  });
  return data;
};

export const deleteMealRequest = async (id, token) => {
  const { data } = await axios.delete(`${BASE_URL}/meals/${id}`, {
    headers: getAuthHeaders(token),
  });
  return data;
};
