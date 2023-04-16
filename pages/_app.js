import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

import '../styles/globals.css';
import { Navbar, Footer } from '../components';

const App = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
    <Script src="https://kit.fontawesome.com/daa14cbd41.js" crossorigin="anonymous" />
  </ThemeProvider>
);
export default App;
