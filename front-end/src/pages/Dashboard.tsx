import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BookOpen, Clock, User, Loader2 } from "lucide-react"; 

import { useAppStore } from "@/store/AppStore";
import { useQuery } from "@tanstack/react-query";
import { timestampParaMinutosTotais } from "@/utils/times";
import { DisciplineDonutChart } from "@/components/charts/DisciplineDonutChart";

export default function Dashboard() {
  const { user,  refreshDisciplines, refreshSessions, disciplines, sessions } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard — StudyPetal";
  }, []);

  const { isLoading: isLoadingDisciplines, isError: isErrorDisciplines } = useQuery({ queryKey: ["disciplines"], queryFn: refreshDisciplines });
  const { isLoading: isLoadingSessions, isError: isErrorSessions } = useQuery({ queryKey: ["sessions"], queryFn: refreshSessions });

  const isLoading = isLoadingDisciplines || isLoadingSessions;
  const isError = isErrorDisciplines || isErrorSessions;

  const weeklyStudyData = useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentSessions = sessions.filter(s => new Date(s.dataHoraInicio) >= oneWeekAgo);

    const dataByDiscipline: Record<string, number> = {};

    recentSessions.forEach(session => {
      const disciplineName = session.disciplina?.nome || 'Desconhecida';
      const duration = Math.trunc(
        timestampParaMinutosTotais(session.dataHoraFim) - timestampParaMinutosTotais(session.dataHoraInicio)
      );
      dataByDiscipline[disciplineName] = (dataByDiscipline[disciplineName] || 0) + duration;
    });

    return {
      labels: Object.keys(dataByDiscipline),
      data: Object.values(dataByDiscipline),
    };
  }, [sessions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">Ocorreu um erro ao buscar seus dados.</p>
        <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl"> 
      <header className="mb-8 text-left">
        <h1 className="text-4xl font-bold tracking-tight"> Olá { user  ? `, ${user?.nome}`  : ""}!</h1>
        <p className="text-lg text-muted-foreground mt-2">Seu progresso está florescendo 🌸</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            {disciplines?.length ? (
              <Button className="w-full" onClick={() => navigate("/estudo")}>
                🌸 Iniciar Sessão
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground text-center">
                  Você precisa cadastrar disciplinas antes de iniciar uma sessão de estudo.
                </p>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={() => navigate("/estudo/disciplinas")}
                >
                  Cadastrar Disciplinas
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>Minhas Disciplinas</CardTitle>
          </CardHeader>
          <CardContent>
            {disciplines?.length ? (
              <ul className="space-y-2">
                {disciplines.map((d) => (
                  <li key={d.id} className="p-3 rounded-md border bg-background hover:bg-accent transition">
                    {d.nome}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma disciplina ainda. Crie em Disciplinas.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions?.length ? (
              <ul className="space-y-2">
                {sessions.slice(0, 3).map((s) => (
                  <li key={s.id} className="p-3 rounded-md border bg-background">
                    <div className="font-medium">{Math.trunc((timestampParaMinutosTotais(s.dataHoraFim) - timestampParaMinutosTotais(s.dataHoraInicio)))} min</div>
                    <div className="text-sm text-muted-foreground">{s.observacoes}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Sem sessões registradas ainda.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <CardTitle>Foco da Semana</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {weeklyStudyData.data.length > 0 ? (
              <DisciplineDonutChart studyData={weeklyStudyData} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Nenhuma sessão de estudo registrada na última semana.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
