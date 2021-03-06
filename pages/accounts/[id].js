import { useRouter } from 'next/router';
import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import SingleAccount from '../../components/SingleAccount';
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
      <Link href="/accounts" passHref>
        <BtnText>&larr; Back to accounts</BtnText>
      </Link>
      <MainCntHeader>
        <Title>Account {id}</Title>
        <Link href={`/accounts/${id}/edit`} passHref>
          <LinkPrimary>CHỉnh sửa</LinkPrimary>
        </Link>
      </MainCntHeader>
      <SingleAccount id={id} src="items" />
    </>
  );
}
