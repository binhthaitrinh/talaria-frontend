import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import NewTransaction from '../../components/NewTransaction';

export default function Items() {
  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Create a Transaction</Title>
      </MainCntHeader>
      <NewTransaction />
    </>
  );
}
