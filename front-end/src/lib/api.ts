
// Remova: import { env } from "process";

export const BASE_URL = import.meta.env.VITE_API_URL;  

export const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ${res.status}`);
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) return res.json();
  return res.text();
}

export const api = {
  login: (email: string, senha: string) =>
    request("/user/login", { method: "POST", body: JSON.stringify({ email, senha }) }),
  register: (nome: string, email: string, senha: string) =>
    request("/user/", { method: "POST", body: JSON.stringify({ nome, email, senha }) }),
  getDisciplines: () => request("/disciplina", { method: "GET" }),
  createDiscipline: (nome: string, descricao?: string) =>
    request("/disciplina", { method: "POST", body: JSON.stringify({ nome, descricao }) }),
  deleteDiscipline: (id: string) => request(`/disciplina/${id}`, { method: "DELETE" }),
  getSessions: () => request(`/sessao`, { method: "GET" }),
  createSession: (payload: { idDisciplina: string; minutos: number; observacoes?: string; dataHoraInicio?: string; dataHoraFim?: string }) =>
    request("/sessao", { method: "POST", body: JSON.stringify(payload) }),
    getConquistas: (userId: string) => request(`/conquista/${userId}`, { method: "GET" }),
  getNivel: (userId: string) => request(`/conquista/nivel/${userId}`, { method: "GET" }),
  checkConquistas: (userId: string) => request(`/conquista/check/${userId}`, { method: "POST" }),
};
