"use client";

import Link from "next/link";
import {
  CloudArrowUpIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";

const features = [
  {
    name: "Planejamento Inteligente",
    description:
      "Organize suas tarefas e atividades escolares de forma eficiente. Saiba exatamente o que fazer e quando fazer.",
    icon: AcademicCapIcon,
  },
  {
    name: "Progresso em Tempo Real",
    description:
      "Acompanhe seu desempenho nas tarefas, identifique pendências e visualize seu avanço de forma clara e atualizada.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Segurança e Privacidade",
    description:
      "Seus dados escolares protegidos com criptografia, autenticação segura e acesso controlado. Sua informação em boas mãos.",
    icon: LockClosedIcon,
  },
];

const LandingPage = () => {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Image
              width={100}
              height={100}
              quality={100}
              alt="Logo"
              src="/logo.png"
              className="w-auto h-24"
            />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4 items-center">
            <Link
              href="/login"
              className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Entrar
            </Link>

            <Link
              className="text-sm/6 font-semibold text-gray-900"
              href={`/register`}
            >
              Criar uma conta <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="isolate">
        <div className="relative pt-14">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-gray-100 to-gray-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                  Organize sua rotina escolar com inteligência
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                  Acompanhe suas tarefas, prazos e atividades, planeje seus
                  estudos e nunca perca uma entrega. Tudo que você precisa para
                  gerenciar seu dia a dia escolar em um só lugar.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    href="/login"
                    className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Acessar sistema
                  </Link>
                  <Link href={`/register`}>
                    Registre-se <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    alt="App screenshot"
                    src={"/tela_home.png"}
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-gray-200 to-gray-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        <div className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <h2 className="col-span-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Tudo o que você precisa para planejar, acompanhar e conquistar
                seus objetivos escolares.
              </h2>
              <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.name}>
                    <dt className="text-base/7 font-semibold text-gray-900">
                      <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-black">
                        <feature.icon
                          aria-hidden="true"
                          className="size-6 text-white"
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-1 text-base/7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <img alt="Logo" src="/logo.png" className="mx-auto h-24" />
            <figure className="mt-10">
              <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
                <p>
                  &quot; A educação é o grande motor do desenvolvimento pessoal.
                  É por meio dela que a filha de um camponês pode se tornar
                  médica, que o filho de um mineiro pode se tornar o chefe da
                  mina, que uma criança nascida na pobreza pode se tornar
                  presidente de uma grande nação. A educação é a arma mais
                  poderosa que você pode usar para mudar o mundo. &quot;
                </p>
              </blockquote>
              <figcaption className="mt-10">
                <img
                  alt="Foto do Nelson Mandela"
                  src="/NelsonMandela.jpg"
                  className="mx-auto size-10 rounded-full"
                />
                <div className="mt-4 max-md:flex-col flex items-center justify-center space-x-3 text-base">
                  <div className="font-semibold text-gray-900">
                    Nelson Mandela
                  </div>
                  <svg
                    width={3}
                    height={3}
                    viewBox="0 0 2 2"
                    aria-hidden="true"
                    className="fill-gray-900"
                  >
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <div className="text-gray-600">
                    Advogado e ex-Presidente da África do Sul
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>
      <footer>
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
          <div className="mt-16 flex justify-center gap-x-10"></div>
          <p className="mt-10 text-center text-sm/6 text-gray-600">
            &copy; 2025 EduFlow, Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
