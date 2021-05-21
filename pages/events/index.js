import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';

import {API_URL} from '@/config/index';


export default function EventsPage({events}) {
  return (
    <Layout>
      <h1>Events</h1>
      { !events.length && <h3>No events to show</h3>}
      {events.map((evt) => <EventItem evt={evt} key={evt.id}/>)}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: {
      events
    },
    revalidate: 1
  }
}