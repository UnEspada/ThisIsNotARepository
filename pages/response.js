import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Respuesta = () => {
  let texts = [
    "Que bien! me alegro!",
    "Qué pasó? bueno no debe ser para tanto...",
    "Pucha, la próximo semana mejor!"
  ];
  const router = useRouter();
  console.log(router.query);
  return (
    <div className="container">
      <Head>
        <title>Respuesta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{texts[router.query.opt]}</h1>

        <div className="grid">
          <Link href={"/"}>
            <a className="card">Volver</a>
          </Link>
        </div>
      </main>

      <footer>
        <a href="https://github.com/PabloSzx/INFO104-2021-1" target="_blank">
          Repositorio y tutorial
        </a>
      </footer>
    </div>
  );
};

export default Respuesta;
