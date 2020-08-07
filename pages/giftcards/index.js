import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Giftcards';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import LinkPrimary from '../../components/styles/LinkPrimary';
import FreezeCol from '../../components/Options/FreezeCol';
import Option from '../../components/styles/Option';

const fieldArr = [
  'customId',
  'createdAt',
  'price',
  'fee',
  'giftCardValue',
  'giftCardType',
  'discountRate',
  'toAcctBalance',
  'fromAccount',
  'toAccount',
  'btcUsdRate',
  'usdVndRate',
  'notes',
];

export default function Customers() {
  const router = useRouter();

  const [freezeNo, setFreezeNo] = useState(4);
  const [freezePass, setFreezePass] = useState(4);

  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Gift cards</Title>
        <Option>
          <FreezeCol
            setFreezeNo={setFreezeNo}
            setFreezePass={setFreezePass}
            freezeNo={freezeNo}
          />
          <Link href="/giftcards/new" passHref>
            <LinkPrimary>Create a gift card</LinkPrimary>
          </Link>
        </Option>
      </MainCntHeader>
      <MainContent
        page={router.query.page || 1}
        fields={fieldArr}
        freezeNo={freezePass}
      />
    </>
  );
}
