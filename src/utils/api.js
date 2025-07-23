// src/utils/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// General fetch helper for GET APIs
const fetchFromApi = async (endpoint, params = '') => {
  const isDev = process.env.NODE_ENV !== 'production';
  const url = `${API_URL}${endpoint}${params}`;
  const response = await fetch(url, {
    cache: isDev ? 'no-store' : 'force-cache',
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  return await response.json();
};

// API Methods

export const fetchNavbar = async () => {
  return fetchFromApi('/api/navbars');
};

export const fetchSidebar = async (navbarId) => {
  return fetchFromApi('/api/sidebars', `?navbarId=${navbarId}`);
};

export const fetchBodyContent = async (sidebarId) => {
  const data = await fetchFromApi('/api/bodyContents', `?sidebarId=${sidebarId}`);
  return data[0]?.content || 'No content available';
};

export const fetchQuizzes = async (navbarId) => {
  return fetchFromApi('/api/quizzes', `?navbarId=${navbarId}`);
};

export const fetchChoices = async (quizId) => {
  return fetchFromApi('/api/choices', `?quizId=${quizId}`);
};

export const fetchInterviewQuestions = async (navbarId) => {
  return fetchFromApi('/api/interviewQuestions', `?navbarId=${navbarId}`);
};

export const fetchCountry = async () => {
  const response = await fetch('https://ipinfo.io/json?token=c419419e0812d5');
  return await response.json();
};
