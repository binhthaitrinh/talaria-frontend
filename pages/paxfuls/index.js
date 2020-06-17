import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Paxfuls';
import { useRouter } from 'next/router';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';

export default function Items() {
  const router = useRouter();
  console.log('//////////');
  console.log(router.query);
  console.log('//////////');

  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Paxful transactions</Title>
        <Link href="/paxfuls/new" passHref>
          <LinkPrimary>Create a transaction</LinkPrimary>
        </Link>
      </MainCntHeader>
      <MainContent page={router.query.page || 1} />
    </>
  );
}
