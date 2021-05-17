import Link from 'next/link';

import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; Running Events</p>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
        </footer>
    );
};

export default Footer;