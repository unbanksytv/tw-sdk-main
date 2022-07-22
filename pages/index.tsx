import Head from "next/head";
import tw from "tailwind-styled-components";

// Components
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>The Photo Labs</title>
        <meta name="description" content="Made with love by LiveTheLifeTV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </Container>
  )
}

const Container = tw.div`
 w-screen
 h-screen
 bg-gradient-color
 text-white
 px-7
 flex
 flex-col
 justify-between
`