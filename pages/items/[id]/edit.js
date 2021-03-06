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
import Btn from '../../../components/styles/Btn';
import BtnText from '../../../components/styles/BtnText';

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
      <Link href={`/items/${id}`} passHref>
        <BtnText>&larr; Back to Item Detail</BtnText>
      </Link>
      <MainCntHeader>
        <Title>Update Item {id}</Title>
      </MainCntHeader>
      {loading ? <Loader /> : <EditItem item={item} />}
    </>
  );
}
