"use client";

import Header from "@/components/UI/Header/Header";
import ModuleCard, {
  ModuleCardProps,
} from "@/components/home/ModuleCard/ModuleCard";
import { IoTimerSharp } from "react-icons/io5";
import Tasks from "./components/Tasks";
import { useUsuarioContext } from "@/context/UserContext/UserContext";
import { FaBook, FaChalkboardTeacher, FaTasks } from "react-icons/fa";
import { MdOutlineGroups2 } from "react-icons/md";
import { BsListTask } from "react-icons/bs";

const alunoModules = [
  {
    nome: "Acompanhamento das tarefas",
    icon: <FaTasks className="text-4xl mx-auto" />,
    path: "/acompanhamento-tarefas",
    descricao:
      "Acompanhe o andamento das suas tarefas em tempo real. Uma forma clara e visual de entender seu crescimento acadêmico.",
  },
  {
    nome: "Pomodoro",
    icon: <IoTimerSharp className="text-4xl mx-auto" />,
    path: "/pomodoro",
    descricao:
      "Organize seu tempo de estudo com a técnica Pomodoro. Alterne entre períodos de foco e pausas estratégicas para manter a produtividade em alta.",
  },
];

const professorModules = [
  {
    nome: "Gerenciar Tarefas",
    icon: <BsListTask className="text-4xl mx-auto" />,
    path: "/list-tarefas",
    descricao: "Gerencia as tarefas dos alunos.",
  },
];

const admModules = [
  {
    nome: "Gerenciar Turmas",
    icon: <MdOutlineGroups2 className="text-4xl mx-auto" />,
    path: "/list-turmas",
    descricao: "Crie, edite e exclua turmas do sistema.",
  },
  {
    nome: "Gerenciar Professores",
    icon: <FaChalkboardTeacher className="text-4xl mx-auto" />,
    path: "/list-professores",
    descricao: "Gerencie professores.",
  },
  {
    nome: "Gerenciar Disciplinas",
    icon: <FaBook className="text-4xl mx-auto" />,
    path: "/list-disciplinas",
    descricao: "Crie e organize disciplinas.",
  },
];

const HomePage = () => {
  const { isAluno, user, isAdministrador, isProfessor } = useUsuarioContext();

  let modulesToRender: ModuleCardProps[] = [];
  if (isAluno) modulesToRender = alunoModules;
  else if (isProfessor) modulesToRender = professorModules;
  else if (isAdministrador) modulesToRender = admModules;

  return (
    <div>
      <Header title={`Bem-vindo(a), ${user?.nome}!`} />
      <div className="space-y-4">
        <div className="grid grid-cols-1 2xl:grid-cols-3 items-start max-2xl:gap-y-4 2xl:gap-4">
          <div className="col-span-3 flex flex-col gap-4">
            {isAluno && <Tasks />}
            <div className="grid grid-cols-2 max-md:grid-cols-1 2xl:grid-cols-4 justify-end gap-4">
              {modulesToRender.map((module) => (
                <ModuleCard
                  key={module.nome}
                  icon={module.icon}
                  nome={module.nome}
                  path={module.path}
                  descricao={module.descricao}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
