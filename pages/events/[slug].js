import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URL } from '@/config/index';

import styles from '@/styles/Event.module.css';
import Layout from '../../components/Layout';

const EventPage = ({ evt }) => {
  const router = useRouter();
  const deleteEvt = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvt}>
            <FaTimes /> Delete event
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.medium.url} width={960} height={600} />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  console.log(paths);

  return { paths, fallback: true };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const event = await res.json();
  console.log(slug);
  return {
    props: {
      evt: event[0],
    },
    revalidate: 1,
  };
}

export default EventPage;
