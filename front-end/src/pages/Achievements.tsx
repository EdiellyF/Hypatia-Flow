import { useEffect } from "react";
import { useAppStore } from "../store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "../lib/api";
import { motion } from 'framer-motion'

export default function Achievements() {
  const { conquistas, refreshConquistas, user } = useAppStore();

  useEffect(() => { document.title = "Conquistas — StudyPetal"; }, []);

  const handleCheck = async () => {
    if (user && user.id) {
      try {
        await api.checkConquistas(user.id);
        refreshConquistas();
      } catch (error) {
        console.error('Erro ao verificar conquistas:', error);

      }
    } else {
      console.warn('Usuário não autenticado.');
    
    }
  };

  return (
    <main className="container mx-auto px-4 sm:px-6 py-10 animate-enter">
      <Card>
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
          <Button onClick={handleCheck}>Verificar Conquistas</Button>
        </CardHeader>
        <CardContent>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {conquistas.map((a) => (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: a.unlocked ? 1 : 0.5, scale: 1 }}
                className={`p-4 rounded-xl border text-center`}
              >
                <div className="text-3xl mb-2">{a.unlocked ? '🌸' : '🔒'}</div> 
                <div className="font-semibold">{a.conquista.nome}</div>
                <div className="text-sm text-gray-500">{a.conquista.descricao}</div>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
