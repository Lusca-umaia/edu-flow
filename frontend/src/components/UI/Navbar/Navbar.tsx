// "use client";
// import { LuTimer } from "react-icons/lu";
// import { FaHome } from "react-icons/fa";
// import NavbarMobile from "./NavbarMobile";
// import { FaTasks } from "react-icons/fa";
// import NavbarDescktop from "./NavbarDescktop";
// import { BsListTask } from "react-icons/bs";
// import { MdOutlineGroups2 } from "react-icons/md";
// import { FaChalkboardTeacher } from "react-icons/fa";
// import { FaBook } from "react-icons/fa6";

// export const options = [
//   {
//     path: "/home",
//     icon: <FaHome />,
//     name: "Tela Inicial",
//   },
//   {
//     icon: <FaTasks />,
//     path: "/acompanhamento-tarefas",
//     name: "Acompanhamento das tarefas",
//   },
//   {
//     icon: <FaBook />,
//     path: "/list-disciplinas",
//     name: "Disciplinas",
//   },
//   {
//     icon: <FaChalkboardTeacher />,
//     path: "/list-professores",
//     name: "Professores",
//   },
//   {
//     icon: <MdOutlineGroups2 />,
//     path: "/list-turmas",
//     name: "Turmas",
//   },
//   {
//     icon: <BsListTask />,
//     path: "/list-tarefas",
//     name: "Tarefas",
//   },
//   {
//     icon: <LuTimer />,
//     path: "/pomodoro",
//     name: "Pomodoro",
//   },
// ];

// export default function Navbar() {
//   return (
//     <>
//       <NavbarMobile />
//       <NavbarDescktop />
//     </>
//   );
// }

"use client";
import React from "react";
import { LuTimer } from "react-icons/lu";
import { FaHome, FaTasks, FaChalkboardTeacher } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { MdOutlineGroups2 } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import NavbarMobile from "./NavbarMobile";
import NavbarDescktop from "./NavbarDescktop";
import { useUsuarioContext } from "@/context/UserContext/UserContext";

export interface Route {
  path: string;
  icon: React.JSX.Element;
  name: string;
}

export const routesByRole = {
  administrador: [
    { path: "/home", icon: <FaHome />, name: "Tela Inicial" },
    { path: "/list-disciplinas", icon: <FaBook />, name: "Disciplinas" },
    {
      path: "/list-professores",
      icon: <FaChalkboardTeacher />,
      name: "Professores",
    },
    { path: "/list-turmas", icon: <MdOutlineGroups2 />, name: "Turmas" },
  ],
  professor: [
    { path: "/home", icon: <FaHome />, name: "Tela Inicial" },
    { path: "/list-tarefas", icon: <BsListTask />, name: "Tarefas" },
  ],
  aluno: [
    { path: "/home", icon: <FaHome />, name: "Tela Inicial" },
    {
      path: "/acompanhamento-tarefas",
      icon: <FaTasks />,
      name: "Acompanhamento das tarefas",
    },
    { path: "/pomodoro", icon: <LuTimer />, name: "Pomodoro" },
  ],
};

export default function Navbar() {
  const { user, userIsLoading, errorInUser } = useUsuarioContext();

  if (userIsLoading && errorInUser) return null;

  const options = user ? routesByRole[user.role] ?? [] : [];

  return (
    <>
      <NavbarMobile options={options} />
      <NavbarDescktop options={options} />
    </>
  );
}
