import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import NewCustomer from '../../components/NewCustomer';

export default function Items() {
  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Create a new Item</Title>
      </MainCntHeader>
      <NewCustomer />
    </>
  );
}
