import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Items';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';
import BtnGrey from '../../components/styles/BtnGrey';
import BtnGreySm from '../../components/styles/BtnGreySm';
import BtnPrimary from '../../components/styles/BtnPrimary';
import _ from 'lodash';
import { Select, FormInputSm } from '../../components/styles/FormComponent';
import Option from '../../components/styles/Option';
import OptionPopup from '../../components/styles/OptionPopup';
import FormContainer from '../../components/styles/FormContainer';
import LimitFieldForm from '../../components/styles/LimitFieldForm';
import FilterAction from '../../components/styles/FilterAction';
import OptionContext from '../../components/OptionContext';
import OptionContainer from '../../components/styles/OptionContainer';
import { getFilterStr2 } from '../../utils';

const fields = {
  _id: true,
  createdAt: true,
  name: true,
  pricePerItem: true,
  quantity: true,
  usShippingFee: true,
  estimatedWeight: false,
  orderedWebsite: false,
  actualCost: true,
  tax: false,
  link: true,
  trackingLink: true,
  status: true,
  taxForCustomer: false,
  actualWeight: false,
  orderAccount: false,
  notes: true,
};

const fieldArr = [
  '_id',
  'createdAt',
  'name',
  'pricePerItem',
  'quantity',
  'usShippingFee',
  'estimatedWeight',
  'orderedWebsite',
  'actualCost',
  'tax',
  'link',
  'trackingLink',
  'status',
  'taxForCustomer',
  'actualWeight',
  'orderAccount',
  'notes',
];

const initialFields = [
  '_id',
  'createdAt',
  'name',
  'pricePerItem',
  'quantity',
  'actualCost',
  'link',
  'trackingLink',
  'status',
];

export default function Items() {
  const [fieldSelected, setFieldSelected] = useState(fields);
  const [fieldLimit, setFieldLimit] = useState(initialFields);
  const [sort, setSort] = useState({ sortBy: 'createdAt', orderBy: 'desc' });
  const [sortStr, setSortStr] = useState('-createdAt');
  const [filter, setFilter] = useState([]);

  const [singleFilter, setSingleFilter] = useState({
    field: '',
    operator: '',
    value: '',
  });
  const [filterStr, setFilterStr] = useState(null);
  const [freezeNo, setFreezeNo] = useState(4);
  const [freezePass, setFreezePass] = useState(4);

  const router = useRouter();

  useEffect(() => {
    fieldArr.forEach((field) => {
      setFieldSelected((fieldSelected) => ({
        ...fieldSelected,
        [field]: false,
      }));
    });
    fieldLimit.forEach((field) => {
      setFieldSelected((fieldSelected) => ({
        ...fieldSelected,
        [field]: true,
      }));
    });
  }, [fieldLimit]);

  const populate = () => {
    setFieldLimit([]);
    fieldArr.forEach((field) => {
      if (fieldSelected[field] === true) {
        setFieldLimit((fieldLimit) => [...fieldLimit, field]);
      }
    });
  };

  const getFilterStr = () => {
    let result = '';
    filter.forEach((item) => {
      result += `${item.field}[${item.operator}]=${item.value}`;
    });
    result += `${singleFilter.field}[${singleFilter.operator}]=${singleFilter.value}`;
    return result;
  };

  return (
    <OptionContext.Consumer>
      {(ctx) => (
        <>
          <Meta title="Dashboard" />
          <MainCntHeader>
            <Title>Items</Title>
            <Option>
              <OptionContainer
                onClick={(e) => {
                  e.stopPropagation();
                  ctx.setShowFilter(false);
                  ctx.setShowSort(false);
                  ctx.setShowLimitField(false);
                }}
              >
                <BtnGrey
                  onClick={() => ctx.setShowFreezeCol(!ctx.showFreezeCol)}
                >
                  Freeze Col
                </BtnGrey>
                {ctx.showFreezeCol ? (
                  <OptionPopup>
                    <FormContainer
                      style={{ width: '36rem', marginBottom: 0 }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setFreezePass(freezeNo);
                        setFreezeShow(false);
                      }}
                    >
                      <label style={{ marginRight: '2rem' }}>
                        Number of freeze col
                      </label>
                      <Select
                        defaultValue={freezeNo}
                        onChange={(e) => setFreezeNo(parseInt(e.target.value))}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </Select>

                      <BtnPrimary>Submit</BtnPrimary>
                    </FormContainer>
                  </OptionPopup>
                ) : null}
              </OptionContainer>
              <OptionContainer
                onClick={(e) => {
                  e.stopPropagation();
                  ctx.setShowFreezeCol(false);
                  ctx.setShowSort(false);
                  ctx.setShowLimitField(false);
                }}
              >
                <BtnGrey onClick={() => ctx.setShowFilter(!ctx.showFilter)}>
                  Filter <ion-icon name="filter-outline"></ion-icon>
                </BtnGrey>
                {ctx.showFilter ? (
                  <OptionPopup>
                    {filter.map((item, i) => (
                      <FormContainer key={i}>
                        <Select readOnly disabled>
                          <option value={item.field}>
                            {_.startCase(item.field)}
                          </option>
                        </Select>
                        <Select readOnly disabled>
                          <option value={item.operator}>{item.operator}</option>
                        </Select>
                        <FormInputSm
                          value={item.value}
                          readOnly
                          disabled
                        ></FormInputSm>
                      </FormContainer>
                    ))}
                    <FormContainer>
                      <Select
                        onChange={(e) => {
                          setSingleFilter({
                            ...singleFilter,
                            field: e.target.value,
                          });
                        }}
                        defaultValue={singleFilter.field}
                        value={singleFilter.field}
                      >
                        <option value="">Choose a field</option>
                        {fieldArr.map((field) => (
                          <option key={field} value={field}>
                            {_.startCase(field)}
                          </option>
                        ))}
                      </Select>
                      <Select
                        onChange={(e) => {
                          setSingleFilter({
                            ...singleFilter,
                            operator: e.target.value,
                          });
                        }}
                        value={singleFilter.operator}
                      >
                        <option value="">Choose an operator</option>
                        <option value="gte">Greater than</option>
                        <option value="eq">Equal</option>
                        <option value="lte">Less than</option>
                      </Select>
                      <FormInputSm
                        type="text"
                        value={singleFilter.value}
                        onChange={(e) => {
                          setSingleFilter({
                            ...singleFilter,
                            value: e.target.value,
                          });
                        }}
                        placeHolder="value"
                      />
                      <BtnGreySm
                        onClick={(e) => {
                          e.preventDefault();
                          setFilter([...filter, singleFilter]);
                          setSingleFilter({
                            field: '',
                            operator: '',
                            value: '',
                          });
                        }}
                      >
                        Add more field
                      </BtnGreySm>
                    </FormContainer>
                    <FilterAction>
                      <BtnPrimary
                        onClick={() => {
                          setFilterStr(getFilterStr2(filter, singleFilter));
                        }}
                      >
                        Filter
                      </BtnPrimary>
                      <BtnGrey
                        onClick={() => {
                          setFilterStr('');
                          setFilter([]);
                        }}
                      >
                        Clear filter
                      </BtnGrey>
                    </FilterAction>
                  </OptionPopup>
                ) : null}
              </OptionContainer>
              <OptionContainer
                onClick={(e) => {
                  e.stopPropagation();
                  ctx.setShowFreezeCol(false);
                  ctx.setShowFilter(false);
                  ctx.setShowLimitField(false);
                }}
              >
                <BtnGrey onClick={() => ctx.setShowSort(!ctx.showSort)}>
                  Sort <ion-icon name="funnel-outline"></ion-icon>
                </BtnGrey>
                {ctx.showSort ? (
                  <OptionPopup>
                    <FormContainer
                      style={{ width: '35rem' }}
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSortStr(
                          `${sort.orderBy === 'asc' ? '' : '-'}${sort.sortBy}`
                        );
                        setShowSort(false);
                      }}
                    >
                      <Select
                        onChange={(e) =>
                          setSort({ ...sort, sortBy: e.target.value })
                        }
                        defaultValue={sort.sortBy}
                      >
                        {fieldArr.map((field) => (
                          <option key={field} value={field}>
                            {_.startCase(field)}
                          </option>
                        ))}
                      </Select>
                      <Select
                        onChange={(e) =>
                          setSort({ ...sort, orderBy: e.target.value })
                        }
                        defaultValue={sort.orderBy}
                      >
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                      </Select>
                      <BtnPrimary>Sort</BtnPrimary>
                    </FormContainer>
                  </OptionPopup>
                ) : null}
              </OptionContainer>
              <OptionContainer
                onClick={(e) => {
                  e.stopPropagation();
                  ctx.setShowFilter(false);
                  ctx.setShowFreezeCol(false);
                  ctx.setShowSort(false);
                }}
              >
                <BtnGrey
                  onClick={() => ctx.setShowLimitField(!ctx.showLimitField)}
                >
                  Limit fields{' '}
                  <ion-icon name="remove-circle-outline"></ion-icon>
                </BtnGrey>
                {ctx.showLimitField ? (
                  <OptionPopup>
                    <LimitFieldForm>
                      <div>
                        {fieldArr.map((field) => (
                          <div key={field}>
                            <input
                              type="checkbox"
                              checked={fieldSelected[field]}
                              onChange={() =>
                                setFieldSelected((fieldSelected) => ({
                                  ...fieldSelected,
                                  [field]: !fieldSelected[field],
                                }))
                              }
                              id={field}
                            />
                            <label htmlFor={field}>{_.startCase(field)}</label>
                          </div>
                        ))}
                      </div>
                      <FilterAction>
                        <BtnPrimary
                          onClick={(e) => {
                            e.preventDefault();
                            populate();
                            setShowFieldSelected(false);
                          }}
                        >
                          Limit
                        </BtnPrimary>
                        <BtnGrey
                          onClick={(e) => {
                            e.preventDefault();
                            setFieldLimit(fieldArr);
                          }}
                        >
                          Select All
                        </BtnGrey>
                        <BtnGrey
                          onClick={(e) => {
                            e.preventDefault();
                            setFieldLimit(initialFields);
                          }}
                        >
                          Reset to default
                        </BtnGrey>
                      </FilterAction>
                    </LimitFieldForm>
                  </OptionPopup>
                ) : null}
              </OptionContainer>
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
