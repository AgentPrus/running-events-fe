import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from './Header';
import Showcase from './Showcase';
import Footer from './Footer';

import styles from '@/styles/Layout.module.css'


const Layout = ({title, keywords, description, children}) => {
  const router = useRouter();
  
  return (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta name="keywords" content={keywords}/>
    </Head>

    <Header/>
    {router.pathname === '/' && <Showcase/>}
    <div className={styles.container}>
      {children}
    </div>
    <Footer/>
  </div>)
};

Layout.defaultProps = {
  title: 'Running Events | Find the hottest race',
  description: 'Find the latest running events',
  keywords: 'running, trail running, marathon'
}

export default Layout;