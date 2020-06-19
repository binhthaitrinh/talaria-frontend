import { useRouter } from 'next/router';
import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import SingleBill from '../../components/SingleBill';
import MainCntHeader from '../../components/styles/MainCntHeader';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';

export default function ItemDetail(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Meta title="Detail" />
      <MainCntHeader>
        <Title>Bill {id}</Title>
        <Link href={`/customers/${id}/edit`} passHref>
          <LinkPrimary>CHỉnh sửa</LinkPrimary>
        </Link>
      </MainCntHeader>
      <SingleBill id={id} src="items" />
    </>
  );
}
