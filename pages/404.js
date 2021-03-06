import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

import Layout from '@/components/Layout';

import styles from '@/styles/404.module.css'

const NotFoundPage = () => (
  <Layout title="Page Not Found">
    <div className={styles.error}>
      <h1><FaExclamationTriangle/> 404 </h1>
      <h4>Sorry, this page is not exists</h4>
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;