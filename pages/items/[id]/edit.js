import { useRouter } from 'next/router';
import Meta from '../../../components/Meta';
import MainCntHeader from '../../../components/styles/MainCntHeader';
import Title from '../../../components/styles/Title';
import Link from 'next/link';
import LinkPrimary from '../../../components/styles/LinkPrimary';
import { useState, useEffect } from 'react';
import Loader from '../../../components/styles/Loader';
import axios from 'axios';
import EditItem from '../../../components/EditItem';

export default function Edit() {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/items/${id}`);

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
      <Meta title="Edit item" />

      <MainCntHeader>
        <Title>Item {id}</Title>
      </MainCntHeader>
      {loading ? <Loader /> : <EditItem item={item} />}
    </>
  );
}
