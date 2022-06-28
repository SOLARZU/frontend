import '../styles/globals.css'
import Layout from '../components/Layout';
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return  (
    <Layout>
      <MoralisProvider
        appId="jPebaclnBF837HyscTnR27NwzwVfX7fsTvXnG2eI"
        serverUrl = "https://zrfs8cthzux0.usemoralis.com:2053/server"
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </Layout>
  )    
  
}

export default MyApp
