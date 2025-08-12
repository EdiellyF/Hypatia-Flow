import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/AppStore";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function Study() {
  const { disciplines, refreshDisciplines, user, refreshSessions } = useAppStore();
  const [selected, setSelected] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState("");
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => { document.title = "Sessão de Estudo — StudyPetal"; }, []);
  useEffect(() => { if (!disciplines.length) refreshDisciplines(); }, [disciplines.length, refreshDisciplines]);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  const minutes = Math.floor(seconds / 60);

  async function handleFinish() {
    if (!selected) return toast({ title: "Escolha uma disciplina" });

    try {
      const dataHoraFim = new Date();
      const dataHoraInicio = new Date(dataHoraFim.getTime() - seconds * 1000);

      await api.createSession({
        idDisciplina: selected,
        minutos: minutes,
        observacoes: notes,
        dataHoraInicio: dataHoraInicio.toISOString(),
        dataHoraFim: dataHoraFim.toISOString(),
      });

      toast({ title: "Sessão concluída!", description: `+${minutes} XP, +${Math.floor(minutes/10)} pétalas` });
      await refreshSessions();
      navigate("./dashboard");
    } catch (e: any) {
      toast({ title: "Erro", description: e?.message || "Falha ao salvar sessão" });
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-lg"> 
      <Card className="shadow-xl rounded-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl">Sessão de Estudo</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Disciplina</label>
              <Select value={selected} onValueChange={setSelected}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha a disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {disciplines.map((d) => (
                    <SelectItem key={d.id} value={d.id}>{d.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center bg-accent rounded-lg p-4">
              <div className="text-4xl font-mono">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Observações</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="O que estudou? Alguma nota importante?" className="min-h-[100px]" />
          </div>

          <div className="flex justify-end gap-3">
            {!running ? (
              <Button onClick={() => setRunning(true)}>Iniciar</Button>
            ) : (
              <Button variant="secondary" onClick={() => setRunning(false)}>Pausar</Button>
            )}
            <Button onClick={handleFinish} disabled={minutes === 0}>Concluir Sessão</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
