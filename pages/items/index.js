import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Items';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import Option from '../../components/styles/Option';
import OptionContext from '../../components/OptionContext';
import FreezeCol from '../../components/Options/FreezeCol';
import Filter from '../../components/Options/Filter';
import Sort from '../../components/Options/Sort';
import LimitField from '../../components/Options/LimitField';

const fields = {
  _id: true,
  createdAt: true,
  name: true,
  pricePerItem: true,
  quantity: true,
  usShippingFee: true,
  estimatedWeight: false,
  actualWeight: false,
  orderedWebsite: false,
  actualCost: true,
  tax: false,
  link: true,
  trackingLink: true,
  status: true,
  orderAccount: false,
  notes: true,
  itemType: false,
};

const fieldArr = [
  'customId',
  'createdAt',
  'name',
  'pricePerItem',
  'quantity',
  'usShippingFee',
  'link',
  'warehouse',
  'trackingLink',
  'status',
  'notes',
  'tax',
  'itemType',
  'orderedWebsite',
  'estimatedWeight',
  'actualWeight',
  'orderAccount',
  'fromAcctBalance',
  'actualCost',
  'orderDate',
  'arrivedAtWarehouseDate',
  'shippingToVnDate',
  'arrivedAtVnDate',
  'customerRcvedDate',
  'returnPkgDate',
  'returnPkgArvlDate',
  'invoiceLink',
];

const initialFields = [
  'customId',
  'createdAt',
  'name',
  'pricePerItem',
  'quantity',
  'usShippingFee',
  'link',
  'warehouse',
  'trackingLink',
  'notes',
  'status',
];

export default function Items() {
  // Fields State
  const [fieldSelected, setFieldSelected] = useState(fields);
  const [fieldLimit, setFieldLimit] = useState(initialFields);

  // sort state
  const [sort, setSort] = useState({ sortBy: '_id', orderBy: 'desc' });
  const [sortStr, setSortStr] = useState('-_id');

  // filter state
  const [filter, setFilter] = useState([]);
  const [singleFilter, setSingleFilter] = useState({
    field: '',
    operator: '',
    value: '',
  });
  const [filterStr, setFilterStr] = useState(null);

  // freeze column state
  const [freezeNo, setFreezeNo] = useState(4);
  const [freezePass, setFreezePass] = useState(4);

  const router = useRouter();

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
            <Title>Items</Title>
            <Option>
              <FreezeCol
                setFreezeNo={setFreezeNo}
                setFreezePass={setFreezePass}
                freezeNo={freezeNo}
              />

              <Filter
                filter={filter}
                singleFilter={singleFilter}
                setSingleFilter={setSingleFilter}
                fieldArr={fieldArr}
                setFilter={setFilter}
                setFilterStr={setFilterStr}
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
            </Option>
          </MainCntHeader>
          <MainContent
            page={router.query.page || 1}
            fields={fieldLimit}
            sort={sortStr}
            filter={filterStr}
            freezeNo={freezePass}
          />
        </>
      )}
    </OptionContext.Consumer>
  );
}
