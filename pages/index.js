import Link from 'next/link';

import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import {API_URL} from '@/config/index';


export default function HomePage({events}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      { !events.length && <h3>No events to show</h3>}
      {events.map((evt) => <EventItem evt={evt} key={evt.id}/>)}
      {events.length && 
      <Link href='/events'>
        <a className='btn-secondary'>View all events</a>
      </Link>}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      events: events.slice(0, 3)
    },
    revalidate: 1
  }
}