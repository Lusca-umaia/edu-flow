import TarefaCard from "@/components/home/TarefaCard/TarefaCard";
import EmptyState from "@/components/UI/EmptyState/EmptyState";
import Loading from "@/components/UI/Loading/Loading";
import { useFetch } from "@/hooks/useFetch";
import {
  GetTarefasAlunoResponse,
  getTarefasAlunos,
} from "@/services/tarefa/getTarefasAluno";
import { LuTrendingUp } from "react-icons/lu";

const Tasks = () => {
  const { data, loading, error } = useFetch<GetTarefasAlunoResponse>({
    fetchFn: getTarefasAlunos,
  });

  if (error && !data) {
    return <p className="text-center font-semibold">{error}</p>;
  }

  const tarefas = loading
    ? []
    : [...data!.pendentes, ...data!.atrasadas, ...data!.concluidas];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl space-y-6 shadow-lg p-6">
      <span className="max-lg:text-base text-xl flex items-center gap-2">
        <LuTrendingUp className="text-muted-foreground" />
        <h3 className=" font-bold leading-none tracking-tight">
          Visão geral das tarefas
        </h3>
      </span>
      {loading ? (
        <Loading />
      ) : (
        <>
          {tarefas.length === 0 ? (
            <EmptyState>Sem tarefas : (</EmptyState>
          ) : (
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4">
              {tarefas.map((tarefa) => (
                <TarefaCard
                  id={tarefa.id}
                  prazo={tarefa.prazo}
                  alunoId={data!.aluno.id}
                  key={tarefa.id}
                  nome={tarefa.nome}
                  status={tarefa.status}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
