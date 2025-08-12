import { useEffect, useState } from "react";
import { useAppStore } from "@/store/AppStore";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Disciplines() {
  const { disciplines, refreshDisciplines } = useAppStore();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");

  useEffect(() => {
    document.title = "Disciplinas — StudyPetal";
    refreshDisciplines();
  }, [refreshDisciplines]);

  async function addDiscipline(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return;
    try {
      await api.createDiscipline(nome.trim(), descricao.trim() || undefined);
      setNome("");
      setDescricao("");
      setDisciplinaId("");
      toast({ title: "Disciplina criada!" });
      await refreshDisciplines();
    } catch (e: any) {
      toast({ title: "Erro", description: "Falha ao criar disciplina" });
    }
  }

  async function remove(id: string) {
    try {
      await api.deleteDiscipline(id);
      toast({ title: "Removida" });
      await refreshDisciplines();
    } catch (e: any) {
      toast({ title: "Erro", description: "Falha ao remover disciplina, disciplina já associada as sessoes de estudo!!" });
    }
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 py-10 animate-enter">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nova Disciplina</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addDiscipline} className="flex flex-col gap-3">
              <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              <Input placeholder="Descrição (opcional)" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
               <input type="hidden" name="disciplinaId" value={disciplinaId} />

              <Button type="submit">Adicionar</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Minhas Disciplinas</CardTitle>
          </CardHeader>
          <CardContent>
            {disciplines?.length ? (
              <ul className="space-y-2">
                {disciplines.map((d) => (
                  <li key={d.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <span>{d.nome}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="secondary">Excluir</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Isso vai apagar permanentemente a disciplina e todo o seu histórico de sessões de estudo. Essa ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => remove(d.id)}>Sim, excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma disciplina cadastrada.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
