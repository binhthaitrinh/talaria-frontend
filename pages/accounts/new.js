import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import NewAccount from '../../components/NewAccount';
import { useRouter } from 'next/router';

export default function Items() {
  const router = useRouter();
  console.log(router.query.ids);
  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Create a new Bill</Title>
      </MainCntHeader>
      <NewAccount items={router.query.ids} />
    </>
  );
}
