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
import { FormInputSm, Select } from '../../components/styles/FormComponent';
import FormContainer from '../../components/styles/FormContainer';
import FilterAction from '../../components/styles/FilterAction';
import BtnPrimary from '../../components/styles/BtnPrimary';
import BtnGrey from '../../components/styles/BtnGrey';
import axios from 'axios';

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
  'status',
  'notes',
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

  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [createdAtFilter, setCreatedAtFilter] = useState({
    from: null,
    to: new Date().toISOString(),
  });
  const [warehouse, setWarehouse] = useState('');
  const [status, setStatus] = useState('');
  const [orderWebsite, setOrderWebsite] = useState('');
  const [orderAccount, setOrderAccount] = useState('');
  const [accounts, setAccounts] = useState([]);

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

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await axios.get(
          `${process.env.BASE_URL}/accounts?fields=loginID`
        );

        setAccounts(res.data.data.data);
      }

      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  const setSortString = () => {
    let result = [];
    if (priceFilter.min) {
      result.push(`pricePerItem[gte]=${priceFilter.min}`);
    }
    if (priceFilter.max) {
      result.push(`pricePerItem[lte]=${priceFilter.max}`);
    }
    if (createdAtFilter.from) {
      result.push(`createdAt[gte]=${createdAtFilter.from.slice(0, 10)}`);
    }
    if (createdAtFilter.to) {
      result.push(`createdAt[lte]=${createdAtFilter.to.slice(0, 10)}`);
    }
    if (warehouse) {
      result.push(`warehouse=${warehouse}`);
    }
    if (status) {
      result.push(`status=${status}`);
    }
    if (orderWebsite) {
      result.push(`orderWebsite=${orderWebsite}`);
    }

    if (orderAccount) {
      result.push(`orderAccount=${orderAccount}`);
    }

    console.log(result.join('&'));
    setFilterStr(result.join('&'));
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
              >
                <FormContainer>
                  <div>
                    <h2>Price</h2>
                    <div>
                      <label>Min</label>
                      <FormInputSm
                        type="number"
                        value={priceFilter.min}
                        onChange={(e) => {
                          setPriceFilter({
                            ...priceFilter,
                            min: e.target.value,
                          });
                        }}
                        placeholder="no min"
                      />
                    </div>

                    <div>
                      <label>Max</label>

                      <FormInputSm
                        type="number"
                        value={priceFilter.max}
                        onChange={(e) =>
                          setPriceFilter({
                            ...priceFilter,
                            max: e.target.value,
                          })
                        }
                        placeholder="no max"
                      />
                    </div>
                  </div>
                  <div>
                    <h2>Created At</h2>
                    <div>
                      <label>From</label>
                      <FormInputSm
                        type="date"
                        value={
                          createdAtFilter.from
                            ? createdAtFilter.from.slice(0, 10)
                            : null
                        }
                        onChange={(e) =>
                          setCreatedAtFilter({
                            ...createdAtFilter,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label>To</label>
                      <FormInputSm
                        type="date"
                        value={createdAtFilter.to.slice(0, 10)}
                        onChange={(e) =>
                          setCreatedAtFilter({
                            ...createdAtFilter,
                            to: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <h2>Warehouse</h2>
                    <div>
                      <Select
                        value={warehouse}
                        onChange={(e) => setWarehouse(e.target.value)}
                      >
                        <option value="">Choose one</option>
                        <option value="unihan">UNIHAN</option>
                        <option value="unisgn">UNISGN</option>
                        <option value="pacific">PACIFIC</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <h2>Status</h2>
                    <div>
                      <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Choose one</option>
                        <option value="not-yet-ordered">Not Ordered Yet</option>
                        <option value="ordered">Ordered</option>
                        <option value="on-the-way-to-warehouse">
                          On the way to Warehouse
                        </option>
                        <option value="on-the-way-to-viet-nam">
                          On the way to VN
                        </option>
                        <option value="arrived-at-viet-nam">
                          Arrived at VN
                        </option>
                        <option value="done">Done</option>
                        <option value="returning">Returning</option>
                        <option value="returned">Returned</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h2>Order Website</h2>
                    <div>
                      <Select
                        value={orderWebsite}
                        onChange={(e) => setOrderWebsite(e.target.value)}
                      >
                        <option value="">Choose one</option>
                        <option value="amazon">Amazon</option>
                        <option value="sephora">Sephora</option>
                        <option value="ebay">Ebay</option>
                        <option value="bestbuy">Best buy</option>
                        <option value="costco">Costco</option>
                        <option value="walmart">Walmart</option>
                        <option value="assisting">Others</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <h2>Order Account</h2>
                    <div>
                      <Select
                        value={orderAccount}
                        onChange={(e) => setOrderAccount(e.target.value)}
                      >
                        <option value="">Choose one</option>
                        {accounts.length > 0
                          ? accounts.map((account) => (
                              <option key={account._id} value={account._id}>
                                {account.loginID}
                              </option>
                            ))
                          : null}
                      </Select>
                    </div>
                  </div>

                  <FilterAction>
                    <BtnPrimary
                      onClick={() => {
                        setSortString();
                        ctx.setShowFilter(false);
                      }}
                    >
                      Filter
                    </BtnPrimary>
                    <BtnGrey
                      disabled={filterStr === null}
                      onClick={() => {
                        setFilterStr('');
                        setFilter([]);
                        ctx.setShowFilter(false);
                      }}
                    >
                      Clear filter
                    </BtnGrey>
                  </FilterAction>
                </FormContainer>
              </Filter>

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
