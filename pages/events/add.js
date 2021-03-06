import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URL } from '@/config/index';

import styles from '@/styles/Form.module.css';

import Layout from '../../components/Layout';

const AddEventPage = () => {
  const [values, setValues] = useState({
    name: '',
    sponsors: '',
    venue: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some((element) => element === '');

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      toast.error('Something went wrong');
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // TODO: Understand this destructuring
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add new event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.gird}>
          <div>
            <label htmlFor="name">
              Event Name
              <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="performers">
              Sponsors
              <input type="text" name="sponsors" id="sponsors" value={values.sponsors} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="venue">
              Venue
              <input type="text" name="venue" id="venue" value={values.venue} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="address">
              Address
              <input type="text" name="address" id="address" value={values.address} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="date">
              Date
              <input type="date" name="date" id="date" value={values.date} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="time">
              Time
              <input type="text" name="time" id="time" value={values.time} onChange={handleInputChange} />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="description">
            Event Description
            <textarea
              type="text"
              name="description"
              id="description"
              value={values.description}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <input type="submit" value="Add event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEventPage;
