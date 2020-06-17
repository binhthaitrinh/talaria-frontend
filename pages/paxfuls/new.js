import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import NewPaxful from '../../components/NewPaxful';

export default function Items() {
  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Create a new Item</Title>
      </MainCntHeader>
      <NewPaxful />
    </>
  );
}
