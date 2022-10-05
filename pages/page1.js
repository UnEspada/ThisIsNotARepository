import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout";

export default function Page1() {
  return (
    <Layout pageId="page1">
      <Head>
        <title>Página 1</title>
      </Head>
      <h1>Página Uno</h1>
      <Image
        src="/images/eye.png"
        height={294} // Desired size with correct aspect ratio
        width={470} // Desired size with correct aspect ratio
        alt="ojo"
      />
    </Layout>
  );
}
