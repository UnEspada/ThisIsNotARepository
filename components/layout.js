import Head from "next/head";
import Link from "next/link";
import ViewCount from "../components/viewCount";
import React, { useState } from "react";

const Layout = ({ children, pageId }) => {
  const [nViews, setViews] = useState(0);
  function incrementViews() {
    //console.log(nViews);
    setViews(nViews + 1);
  }
  function resetViews() {
    setViews(0);
  }

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Ejemplo de sitio web con menú" />
      </Head>
      <header className="menu">
        <Link href="/page1">
          <a
            className={pageId === "page1" ? "currentPage" : ""}
            onClick={incrementViews}
          >
            Página 1
          </a>
        </Link>

        <Link href="/page2">
          <a
            className={pageId === "page2" ? "currentPage" : ""}
            onClick={incrementViews}
          >
            Página 2
          </a>
        </Link>

        <Link href="/page3">
          <a
            className={pageId === "page3" ? "currentPage" : ""}
            onClick={incrementViews}
          >
            Página 3
          </a>
        </Link>

        <Link href="/pageList">
          <a
            className={pageId === "page4" ? "currentPage" : ""}
            onClick={incrementViews}
          >
            To-Do
          </a>
        </Link>
        <ViewCount count={nViews} reset={resetViews} />
      </header>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
