import Head from 'next/head';

import Header from './Header';

import styles from '../styles/Layout.module.css'
import Footer from './Footer';


const Layout = ({title, keywords, description, children}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
    </Head>

    <Header/>
    <div className={styles.container}>
      {children}
    </div>
    <Footer/>
  </div>
);

Layout.defaultProps = {
  title: 'Running Events | Find the hottest race',
  description: 'Find the latest running events',
  keywords: 'running, trail running, marathon'
}

export default Layout;