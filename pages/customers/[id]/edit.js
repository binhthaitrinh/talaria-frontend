import { useRouter } from 'next/router';
import Meta from '../../../components/Meta';
import MainCntHeader from '../../../components/styles/MainCntHeader';
import Title from '../../../components/styles/Title';
import Link from 'next/link';
import LinkPrimary from '../../../components/styles/LinkPrimary';
import { useState, useEffect } from 'react';
import Loader from '../../../components/styles/Loader';
import axios from 'axios';
import EditCustomer from '../../../components/EditCustomer';
import { BASE_URL } from '../../../constant';

export default function Edit() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${BASE_URL}/customers/${id}`);

        setItem(res.data.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (id !== undefined) {
      fetchData();
    }
  }, [id]);
  return (
    <>
      <Meta title="Edit customer" />

      <MainCntHeader>
        <Title>Customer {id}</Title>
      </MainCntHeader>
      {loading ? <Loader /> : <EditCustomer item={item} />}
    </>
  );
}
