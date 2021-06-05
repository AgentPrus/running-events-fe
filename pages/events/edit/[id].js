import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { API_URL } from '@/config/index';

import styles from '@/styles/Form.module.css';

import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import ImageUpload from '@/components/ImageUpload';

const EditEventPage = ({ evt }) => {
  const [values, setValues] = useState({
    name: evt.name,
    sponsors: evt.sponsors,
    venue: evt.venue,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const hasEmptyFields = Object.values(values).some((element) => element === '');

    if (hasEmptyFields) {
      toast.error('Please fill in all fields');
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
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
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();

    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add new event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">
              Event Name
              <input type="text" id="name" name="name" value={values.name} onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label htmlFor="sponsors">
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
              <input
                type="date"
                name="date"
                id="date"
                value={moment(values.date).format('yyyy-MM-DD')}
                onChange={handleInputChange}
              />
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

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
};

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  console.log(req.headers.cookie);

  return {
    props: {
      evt,
    },
  };
}

export default EditEventPage;
