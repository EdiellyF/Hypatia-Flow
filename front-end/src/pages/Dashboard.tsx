import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import XPBar from "@/components/XPBar";
import { useAppStore } from "@/store/AppStore";
import { useQuery } from "@tanstack/react-query";
import { timestampParaMinutosTotais } from "@/utils/times";




export default function Dashboard() {
  const { user, level, xp, nextLevelXp, refreshDisciplines, refreshSessions, disciplines, sessions } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard — StudyPetal";
  }, []);

  useQuery({ queryKey: ["disciplines"], queryFn: refreshDisciplines });
  useQuery({ queryKey: ["sessions"], queryFn: refreshSessions });

  return (
    <main className="container mx-auto px-3 py-4 sm:px-6 sm:py-6 animate-enter max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
      <header className="mb-3 sm:mb-6 text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-extrabold">Olá{user ? `, ${user}` : ''}!</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Seu progresso está florescendo 🌸</p>
        </header>

      <section className="grid gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-2xl">Perfil</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 mb-4">
              <div className="text-base sm:text-lg font-semibold">Nível {level}</div>
              <Button size="sm" onClick={() => navigate("/estudo")}>🌸 Iniciar Sessão</Button>
            </div>
            <XPBar current={xp} total={nextLevelXp} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-2xl">Minhas Disciplinas</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-3 sm:p-6">
            {disciplines?.length ? (
              <ul className="grid grid-cols-1 gap-2">
                {disciplines.map((d) => (
                  <li key={d.id} className="p-2 rounded-lg border bg-card text-sm">{d.nome}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">Nenhuma disciplina ainda. Crie em Disciplinas.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-2xl">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 px-3 sm:p-6">
            {sessions?.length ? (
              <ul className="grid grid-cols-1 gap-2">
                {sessions.slice(0, 3).map((s) => (
                  <li key={s.id} className="p-2 rounded-lg border bg-card">
                    <div className="font-semibold text-sm">{Math.trunc((timestampParaMinutosTotais(s.dataHoraFim) - timestampParaMinutosTotais(s.dataHoraInicio)))} min</div>
                    <div className="text-xs text-muted-foreground">{s.observacoes}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Sem sessões registradas ainda.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
