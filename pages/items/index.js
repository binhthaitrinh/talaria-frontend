import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Items';

export default function Items() {
  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Items</Title>
      </MainCntHeader>
      <MainContent />
    </>
  );
}
