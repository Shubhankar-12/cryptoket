import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

import { NFTProvider } from '../context/NFTContext';
import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const App = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      <Script src="https://kit.fontawesome.com/daa14cbd41.js" crossorigin="anonymous" />
    </ThemeProvider>
  </NFTProvider>
);
export default App;
