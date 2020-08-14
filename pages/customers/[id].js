import { useRouter } from 'next/router';
import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import SingleCustomer from '../../components/SingleCustomer';
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
        <Title>Customer {id}</Title>
        <div>
          <Link href={`/bills/new?customerId=${id}`} passHref>
            <LinkPrimary style={{ marginRight: '2rem' }}>
              Create a bill
            </LinkPrimary>
          </Link>
          <Link href={`/customers/${id}/edit`} passHref>
            <LinkPrimary>CHỉnh sửa</LinkPrimary>
          </Link>
        </div>
      </MainCntHeader>
      <SingleCustomer id={id} src="items" />
    </>
  );
}
