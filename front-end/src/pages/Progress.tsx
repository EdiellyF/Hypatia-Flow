import { useEffect, useMemo } from "react";
import { useAppStore } from "../store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { timestampParaMinutosTotais } from "@/utils/times";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Progress() {
  const { sessions, refreshSessions, user } = useAppStore();

  useEffect(() => {
    if (user) {
      refreshSessions();
    }
  }, [user, refreshSessions]);

  const processedSessions = useMemo(() => {
    return sessions
      .map((s) => {
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
        };
      })
      .sort((a, b) => new Date(b.dataHoraInicio).getTime() - new Date(a.dataHoraInicio).getTime()); 
  }, [sessions]);
  const chartData = useMemo(() => {
    const byDay: Record<string, number> = {};
    processedSessions.forEach((s) => {
      byDay[s.dateKey] = (byDay[s.dateKey] || 0) + s.duration;
    });

    
    const entries = Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0]));

    return {
      
      labels: entries.map((e) => new Date(e[0] + "T00:00:00").toLocaleDateString()),
      values: entries.map((e) => e[1]),
    };
  }, [processedSessions]);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Minutos estudados",
        data: chartData.values,
        borderColor: "hsl(340,70%,55%)",
        backgroundColor: "hsla(340,70%,55%,0.2)",
        tension: 0.3,
        pointRadius: 7,
      },
    ],
  };

  const options = { responsive: true, plugins: { legend: { display: false } } } as const;

  return (
    <main className="container mx-auto px-4 sm:px-6 py-10 animate-enter">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Gráfico de Progresso</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.labels.length ? <Line data={data} options={options} /> : <p className="text-muted-foreground">Sem dados ainda.</p>}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            {processedSessions?.length ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        
                {processedSessions.map((s) => (
                  <li key={s.id} className="p-3 rounded-lg border bg-card">
                    <div className="font-semibold">{s.duration} min</div>
                    <div className="text-sm text-muted-foreground">{s.displayDate}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma sessão registrada ainda.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}