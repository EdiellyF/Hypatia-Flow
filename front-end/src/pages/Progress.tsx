import { useMemo, useState } from "react";
import { useAppStore } from "../store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { timestampParaMinutosTotais } from "@/utils/times";

export default function Progress() {
  const { sessions, disciplines } = useAppStore();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { studyDataByDay, processedSessionsReversed } = useMemo(() => {
    const byDay: Record<string, { totalDuration: number; sessions: any[]; disciplineStats: Record<string, { duration: number; count: number }> }> = {};

    const allSessions = sessions.map((s) => {
      const duration = Math.trunc(
        timestampParaMinutosTotais(s.dataHoraFim) - timestampParaMinutosTotais(s.dataHoraInicio)
      );
      const startDate = new Date(s.dataHoraInicio);
      const dateKey = startDate.toISOString().split("T")[0];

      return {
        ...s,
        duration: duration || 0,
        dateKey,
        displayDate: startDate.toLocaleString(),
        disciplineName: s.disciplina?.nome || 'Desconhecida',
      };
    });

    allSessions.forEach((s) => {
      if (!byDay[s.dateKey]) {
        byDay[s.dateKey] = { totalDuration: 0, sessions: [], disciplineStats: {} };
      }
      byDay[s.dateKey].totalDuration += s.duration;
      byDay[s.dateKey].sessions.push(s);

      if (!byDay[s.dateKey].disciplineStats[s.disciplineName]) {
        byDay[s.dateKey].disciplineStats[s.disciplineName] = { duration: 0, count: 0 };
      }
      byDay[s.dateKey].disciplineStats[s.disciplineName].duration += s.duration;
      byDay[s.dateKey].disciplineStats[s.disciplineName].count += 1;
    });

    const reversed = [...allSessions].sort((a, b) => new Date(b.dataHoraInicio).getTime() - new Date(a.dataHoraInicio).getTime());

    return { studyDataByDay: byDay, processedSessionsReversed: reversed };
  }, [sessions]);

  const studyDays = Object.keys(studyDataByDay).map(dateKey => new Date(dateKey + 'T00:00:00'));

  const selectedDayKey = selectedDate ? selectedDate.toISOString().split("T")[0] : "";
  const timeOnSelectedDay = studyDataByDay[selectedDayKey]?.totalDuration || 0;
  const selectedDayStats = studyDataByDay[selectedDayKey]?.disciplineStats;

  return (
    <main className="container mx-auto px-4 sm:px-6 py-10 animate-enter">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-2 sm:p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{ studied: studyDays }}
              modifiersStyles={{
                studied: {
                  borderColor: 'hsl(340,70%,55%)',
                  borderWidth: '2px',
                  borderRadius: '50%',
                }
              }}
              className="rounded-md "
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes do Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 border-b mb-4">
              <p className="text-lg text-muted-foreground">Tempo total de estudo em {selectedDate ? selectedDate.toLocaleDateString() : '...'}:</p>
              <p className="text-5xl font-bold tracking-tighter text-primary">{timeOnSelectedDay} min</p>
            </div>
            {selectedDayStats && Object.keys(selectedDayStats).length > 0 ? (
              <ul className="space-y-3">
                {Object.entries(selectedDayStats).map(([name, stats]) => (
                  <li key={name} className="flex justify-between items-center p-3 rounded-md bg-muted/50">
                    <span className="font-semibold">{name}</span>
                    <span className="text-sm text-muted-foreground">{stats.duration} min ({stats.count} {stats.count > 1 ? 'sessões' : 'sessão'})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">Nenhuma atividade registrada para este dia.</p>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Histórico de Sessões</CardTitle>
          </CardHeader>
          <CardContent>
            {processedSessionsReversed?.length ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {processedSessionsReversed.map((s) => (
                  <li key={s.id} className="p-4 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-semibold text-lg">{s.duration} min</div>
                    <div className="text-sm text-muted-foreground">{s.displayDate}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">Nenhuma sessão registrada ainda.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}