import { useState, useEffect } from 'react';
import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Bills';
import { useRouter } from 'next/router';
import Link from 'next/link';
import LinkPrimary from '../../components/styles/LinkPrimary';
import FreezeCol from '../../components/Options/FreezeCol';
import Sort from '../../components/Options/Sort';
import LimitField from '../../components/Options/LimitField';
import OptionContext from '../../components/OptionContext';
import Option from '../../components/styles/Option';

const fields = {
  createdAt: true,
  items: true,
  totalBillInUsd: true,
  remaining: true,
  customer: true,
  status: true,
  affiliate: false,
  estimatedWeight: false,
  shippingRateToVnInUSD: false,
  shippingFeeToVnInUSD: false,
  taxForCusomter: false,
  vndUsdRate: true,
  moneyChargeCustomerUSD: false,

  moneyTransferReceipt: false,
};

const fieldArr = [
  'createdAt',
  'customId',
  'items',
  'customer',
  'affiliate',
  'status',
  'remaining',
  'actualChargeCustomer',
  'moneyReceived',
  'taxForCustomer',
  'actualBillCost',
  'moneyChargeCustomerUSD',

  'usdVndRate',
  'estimatedWeight',
  'shippingRateToVnInUSD',
  'moneyTransferReceipt',
  'notes',
];

const initialFields = [
  'createdAt',
  'customId',
  'items',
  'customer',
  'affiliate',
  'status',
  'remaining',
  'actualChargeCustomer',
  'notes',
];

export default function Customers() {
  const router = useRouter();
  const [freezeNo, setFreezeNo] = useState(4);
  const [freezePass, setFreezePass] = useState(4);

  // sort state
  const [sort, setSort] = useState({ sortBy: 'createdAt', orderBy: 'desc' });
  const [sortStr, setSortStr] = useState('-createdAt,-_id');

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
    <OptionContext.Consumer>
      {(ctx) => (
        <>
          <Meta title="Dashboard" />
          <MainCntHeader>
            <Title>Bills</Title>
            <Option>
              <FreezeCol
                setFreezeNo={setFreezeNo}
                setFreezePass={setFreezePass}
                freezeNo={freezeNo}
              />
              <Sort
                setSortStr={setSortStr}
                sort={sort}
                setSort={setSort}
                fieldArr={fieldArr}
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
              <Link href="/bills/new" passHref>
                <LinkPrimary>Create a bill</LinkPrimary>
              </Link>
            </Option>
          </MainCntHeader>
          <MainContent
            page={router.query.page || 1}
            fields={fieldLimit}
            freezeNo={freezePass}
            sort={sortStr}
          />
        </>
      )}
    </OptionContext.Consumer>
  );
}
