import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AgriData</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">
          AgriData Sensor{' '}
          <a className="text-blue-600" href="https://www.agridatatrade.com">
            Network!
          </a>
        </h1>
      </main>
    </div>
  )
}

export default Home
