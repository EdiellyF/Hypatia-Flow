import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAppStore } from "@/store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SakuraBackground from "@/components/SakuraBackground";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const { loginWithToken } = useAppStore();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = mode === "login" ? "Entrar — StudyPetal" : "Cadastrar — StudyPetal";
  }, [mode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const data = await api.login(email, senha);
        if (data?.token && data?.user) {
          loginWithToken(data.token, data.user);
          toast({ title: "Bem-vindo(a)!", description: "Login realizado com sucesso." });
          navigate("/estudo/dashboard");
        }
      } else {
        const data = await api.register(nome, email, senha);
        if (data?.token && data?.user) {
          loginWithToken(data.token, data.user);
          toast({ title: "Conta criada!", description: "Cadastro realizado com sucesso." });
          navigate("/estudo/dashboard");
        } else {
          toast({ title: "Conta criada!", description: "Você já pode entrar com suas credenciais." });
          setMode("login");
        }
      }
    } catch (err: any) {
      toast({ title: "Erro", description: "Falha na autenticação" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden w-full">
      <SakuraBackground />
      <Card className="w-full max-w-md shadow-xl animate-enter">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm mb-1">Nome</label>
                <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Senha</label>
              <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Carregando..." : mode === "login" ? "Entrar" : "Cadastrar"}
            </Button>
          </form>
          <div className="text-center mt-4 text-sm">
            {mode === "login" ? (
              <button className="story-link" onClick={() => setMode("register")}>Não tem conta? Cadastre-se</button>
            ) : (
              <button className="story-link" onClick={() => setMode("login")}>Já tem conta? Entrar</button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
