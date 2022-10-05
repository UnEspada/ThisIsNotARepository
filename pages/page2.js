import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Page2() {
  return (
    <Layout pageId="page2">
      <Head>
        <title>Página 2</title>
      </Head>
      <h1>Página Dos</h1>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum venenatis mauris, nec molestie nisl iaculis eget. Praesent purus eros, dapibus quis semper eu, consectetur a libero. Pellentesque tincidunt sapien non felis efficitur lobortis. Vestibulum eget lacus tristique, tincidunt metus vel, dictum felis. Maecenas sed elit sagittis, malesuada odio sed, lacinia magna. 
      </p>
      <p>
      Integer ultrices maximus tortor quis convallis. Aliquam erat volutpat. Proin id venenatis augue. Nullam vestibulum bibendum ex, elementum ornare ligula malesuada at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas finibus at dolor vel imperdiet. Praesent convallis nibh malesuada sollicitudin lobortis.
      </p>

    </Layout>
  )
}