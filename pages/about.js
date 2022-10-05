import Head from "next/head";

const About = () => {
  return (
    <div className="container">
      <Head>
        <title>INFO104 About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Sobre esta página</h1>

        <p className="description">
          Este código está en <code>pages/about.js</code>
        </p>
      </main>

      <footer>
        <a href="https://github.com/PabloSzx/INFO104-2021-1" target="_blank">
          Repositorio y tutorial
        </a>
      </footer>
    </div>
  );
};
export default About;
