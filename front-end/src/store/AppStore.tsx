import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";


export type User = { id: string; nome: string; email: string; xp?: number };
export type Discipline = { id: string; nome: string };
export type Session = { id: string; disciplinaId: string; minutos: number; createdAt: string };

type AppState = {
  user: User | null;
  token: string | null;
  disciplines: Discipline[];
  sessions: Session[];
  conquistas: any[];
  level: number;
  xp: number;
  nextLevelXp: number;
};

type AppActions = {
  loginWithToken: (token: string, user: User) => void;
  logout: () => void;
  refreshDisciplines: () => Promise<void>;
  refreshSessions: () => Promise<void>;
  refreshConquistas: () => Promise<void>;
  refreshNivel: () => Promise<void>;
};

const AppStoreContext = createContext<(AppState & AppActions) | undefined>(undefined);

function computeLevel(totalXp: number) {
  let level = 1;
  let remaining = totalXp;
  while (remaining >= level * 100) {
    remaining -= level * 100;
    level += 1;
  }
  return { level, withinLevelXp: remaining, nextLevelXp: level * 100 };
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user_data");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("jwt_token"));
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [conquistas, setConquistas] = useState<any[]>([]);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [nextLevelXp, setNextLevelXp] = useState(100);

  useEffect(() => {
    if (user) {
      refreshDisciplines();
      refreshSessions();
 
    }
  }, [user]); 
  async function refreshDisciplines() {
    try {
      const data = await api.getDisciplines();
      const disciplinesData = Array.isArray(data) ? data : data?.items || [];
      setDisciplines(disciplinesData);
      return disciplinesData; 
    } catch (e) {
      console.error(e);
      setDisciplines([]);
      return []; 
    }
  }

  async function refreshSessions() {
    if (!user) return [];
    try {
      const data = await api.getSessions();
      const sessionsData = Array.isArray(data) ? data : data?.items || [];
      setSessions(sessionsData);

      return sessionsData; 
    } catch (e) {
      console.error('Erro ao atualizar sessões:', e);
      setSessions([]);
      return [];
    }
  }




  function loginWithToken(newToken: string, u: User) {

    localStorage.setItem("jwt_token", newToken);
    localStorage.setItem("user_data", JSON.stringify(u));
    setToken(newToken);
    setUser(u);
  }

  function logout() {
 
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_data");
    setUser(null);
    setToken(null);
    setDisciplines([]);
    setSessions([]);
  }


  const value: AppState & AppActions = {
    user,
    token,
    disciplines,
    sessions,
    loginWithToken,
    logout,
    refreshDisciplines,
    refreshSessions
  };

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error("useAppStore deve ser usado dentro de AppStoreProvider");
  return ctx;
}
