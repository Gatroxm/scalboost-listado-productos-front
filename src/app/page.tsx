// src/app/page.tsx
import Head from 'next/head'
import ProductTable from '../components/ProductTable'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Listado de Productos</title>
      </Head>
      <h1 className="text-2xl mb-4">Listado de Productos</h1>
      <ProductTable />
    </div>
  )
}
