import { useRouter } from 'next/router';
import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import SingleItem from '../../components/SingleItem';
import MainCntHeader from '../../components/styles/MainCntHeader';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';
import BtnText from '../../components/styles/BtnText';

export default function ItemDetail(props) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Meta title="Detail" />
      <Link href="/items" passHref>
        <BtnText>&larr; Back to items</BtnText>
      </Link>
      <MainCntHeader>
        <Title>Item {id}</Title>
        <Link href={`/items/${id}/edit`} passHref>
          <LinkPrimary>CHỉnh sửa</LinkPrimary>
        </Link>
      </MainCntHeader>
      <SingleItem id={id} src="items" />
    </>
  );
}
