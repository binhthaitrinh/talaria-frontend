import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Paxfuls';
import { useRouter } from 'next/router';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FreezeCol from '../../components/Options/FreezeCol';
import LimitField from '../../components/Options/LimitField';
import Option from '../../components/styles/Option';

const fieldArr = [
  'customId',
  'createdAt',
  'btcAmount',
  'withdrawFee',
  'amountSpent',
  'usdVndRate',
  'btcUsdRate',
  'buyer',
  'btcAccountBalance',
  'btcAccount',
  'fromAccount',
  'notes',
];

const fields = {
  createdAt: true,
  transactionType: true,
  btcAmount: true,
  withdrawFee: true,
  moneySpent: true,
  totalBalance: true,
  buyer: true,
  pocketMoney: true,
  usdVndRate: false,
  btcUsdRate: false,
  notes: false,
  remainingBalance: false,
};

const initialFields = [
  'customId',
  'createdAt',
  'btcAmount',
  'withdrawFee',
  'amountSpent',
  'usdVndRate',
  'btcUsdRate',
  'buyer',
  'btcAccountBalance',
  'notes',
];

export default function Items() {
  const router = useRouter();

  const [freezeNo, setFreezeNo] = useState(4);
  const [freezePass, setFreezePass] = useState(4);

  const [fieldSelected, setFieldSelected] = useState(fields);
  const [fieldLimit, setFieldLimit] = useState(initialFields);

  useEffect(() => {
    for (const field in fieldSelected) {
      setFieldSelected((fieldSelected) => ({
        ...fieldSelected,
        [field]: false,
      }));
    }
    fieldLimit.forEach((field) => {
      setFieldSelected((fieldSelected) => ({
        ...fieldSelected,
        [field]: true,
      }));
    });
  }, [fieldLimit]);

  const populate = () => {
    setFieldLimit([]);
    // fieldArr.forEach((field) => {
    //   if (fieldSelected[field] === true) {
    //     setFieldLimit((fieldLimit) => [...fieldLimit, field]);
    //   }
    // });

    for (const field in fieldSelected) {
      if (fieldSelected[field] === true) {
        setFieldLimit((fieldLimit) => [...fieldLimit, field]);
      }
    }
  };

  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Paxful transactions</Title>
        <Option>
          <FreezeCol
            setFreezeNo={setFreezeNo}
            setFreezePass={setFreezePass}
            freezeNo={freezeNo}
          />
          <LimitField
            fieldArr={fieldArr}
            fieldSelected={fieldSelected}
            setFieldSelected={setFieldSelected}
            populate={populate}
            fieldLimit={fieldLimit}
            setFieldLimit={setFieldLimit}
            initialFields={initialFields}
          />
          <Link href="/paxfuls/new" passHref>
            <LinkPrimary>Create a transaction</LinkPrimary>
          </Link>
        </Option>
      </MainCntHeader>
      <MainContent
        page={router.query.page || 1}
        freezeNo={freezePass}
        fields={fieldLimit}
      />
    </>
  );
}
