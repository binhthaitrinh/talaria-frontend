import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Items';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';
import BtnGrey from '../../components/styles/BtnGrey';
import BtnGreySm from '../../components/styles/BtnGreySm';
import styled from 'styled-components';
import BtnPrimary from '../../components/styles/BtnPrimary';

const fields = {
  _id: true,
  status: true,
  tax: false,
  taxForCustomer: false,
  usShippingFee: false,
  estimatedWeight: false,
  actualWeight: false,
  actualCost: true,
  quantity: true,
  orderedWebsite: false,
  createdAt: true,
  link: true,
  name: true,
  trackingLink: true,
  pricePerItem: true,
  orderAccount: false,
  notes: true,
};

const fieldArr = [
  '_id',
  'status',
  'tax',
  'taxForCustomer',
  'usShippingFee',
  'estimatedWeight',
  'actualWeight',
  'actualCost',
  'quantity',
  'orderedWebsite',
  'createdAt',
  'link',
  'name',
  'trackingLink',
  'pricePerItem',
  'orderAccount',
  'notes',
];

const LimitDiv = styled.div`
  position: relative;

  & > div {
    /* visibility: hidden;
    opacity: 0; */
    position: absolute;
    z-index: 999;
    background-color: #fff;
    top: 3rem;
    right: 0;
    border: 1px solid black;
    padding: 2rem 1rem;
    width: 50rem;

    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      & > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        input {
          margin-right: 1rem;
        }
      }
    }
  }

  /* button:hover + .abc,
  .abc:hover,
  &:hover + .abc {
    visibility: visible;
    opacity: 1;
  } */
`;

const Filter = styled.div`
  position: relative;
`;

const FilterPopup = styled.div`
  position: absolute;
  z-index: 999;
  background-color: #fff;
  top: 4.8rem;
  right: 0;
  border-radius: 6px;
  box-shadow: 0 1rem 8rem rgba(0, 0, 0, 0.1), 0 -1rem 8rem rgba(0, 0, 0, 0.1);
  padding: 3rem 3rem;
  font-size: 1.4rem;
`;

const Option = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > div {
    margin-left: 2rem;
  }
`;

const FormInputSm = styled.input`
  font-size: 1.2rem;
  font-family: inherit;
  color: inherit;
  padding: 0.8rem 1.6rem;
  border-radius: 2px;
  background-color: ${(props) => props.theme.offWhite};
  border: none;
  border-bottom: 5px solid transparent;
  display: block;
  transition: all 0.3s;

  &:focus {
    border-bottom: 5px solid ${(props) => props.theme.primary};
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
    outline: none;
  }

  &:focus:invalid {
    border-bottom: 5px solid red;
  }
`;

const FilterFormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 75rem;
  margin-bottom: 1.8rem;

  & > * {
    margin-right: 1.8rem;
  }
`;

const FilterActionContainer = styled.div`
  display: flex;

  & > button {
    margin-right: 1.8rem;
  }
`;

const Select = styled.select`
  font-size: 1.2rem;
  font-family: inherit;
  color: inherit;
  padding: 0.8rem 1.6rem;
  border-radius: 2px;
  background-color: ${(props) => props.theme.offWhite};
  border: none;
  border-bottom: 2.5px solid transparent;
  border-top: 2.5px solid transparent;
  display: block;
  transition: all 0.3s;
`;

export default function Items() {
  const [fieldSelected, setFieldSelected] = useState(fields);
  const [showFieldSelected, setShowFieldSelected] = useState(false);
  const [fieldLimit, setFieldLimit] = useState([
    '_id',
    'status',
    'pricePerItem',
    'quantity',
    'createdAt',
    'link',
    'trackingLink',
    'name',
    'actualCost',
  ]);
  const [sort, setSort] = useState({ sortBy: 'createdAt', orderBy: 'asc' });
  const [showSort, setShowSort] = useState(false);
  const [sortStr, setSortStr] = useState('createdAt');
  const [filter, setFilter] = useState([]);
  const [filterNo, setFilterNo] = useState(0);
  const [showFilter, setShowFilter] = useState(false);
  const [singleFilter, setSingleFilter] = useState({
    field: 'name',
    operator: 'gte',
    value: '',
  });
  const [filterStr, setFilterStr] = useState(null);

  const router = useRouter();

  // const onUpdateItem = (fieldName, e) => {
  //   setFilter((filter) => {
  //     const list = filter.map((item, i) => {
  //       if (i === filterNo) {
  //         return {
  //           ...item,
  //           [fieldName]: e.target.value,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //     return list;
  //   });
  // };

  const populate = () => {
    setFieldLimit([]);
    fieldArr.forEach((field) => {
      if (fieldSelected[field] === true) {
        setFieldLimit((fieldLimit) => [...fieldLimit, field]);
      }
    });
    console.log(fieldLimit);
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
    <div
      onClick={() => {
        setShowFieldSelected(false);
        setShowSort(false);
      }}
    >
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Items</Title>
        <Option>
          <Filter>
            <BtnGrey onClick={() => setShowFilter(!showFilter)}>Filter</BtnGrey>
            {showFilter ? (
              <FilterPopup>
                {filter.map((item, i) => (
                  <FilterFormContainer key={i}>
                    <Select readOnly disabled>
                      <option value={item.field}>{item.field}</option>
                    </Select>
                    <Select readOnly disabled>
                      <option value={item.operator}>{item.operator}</option>
                    </Select>
                    <FormInputSm
                      value={item.value}
                      readOnly
                      disabled
                    ></FormInputSm>
                  </FilterFormContainer>
                ))}
                <FilterFormContainer>
                  <Select
                    onChange={(e) => {
                      setSingleFilter({
                        ...singleFilter,
                        field: e.target.value,
                      });
                    }}
                  >
                    <option value="">Choose a field</option>
                    {fieldArr.map((field) => (
                      <option key={field} value={field}>
                        {field}
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
                        field: '_id',
                        operator: 'gte',
                        value: '',
                      });
                    }}
                  >
                    Add more field
                  </BtnGreySm>
                </FilterFormContainer>
                <FilterActionContainer>
                  <BtnPrimary
                    onClick={() => {
                      setFilterStr(getFilterStr());
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
                </FilterActionContainer>
              </FilterPopup>
            ) : null}
          </Filter>
          <LimitDiv onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowSort((showSort) => !showSort)}>
              Sort
            </button>
            {showSort ? (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSortStr(
                      `${sort.orderBy === 'asc' ? '' : '-'}${sort.sortBy}`
                    );
                    setShowSort(false);
                  }}
                >
                  <select
                    onChange={(e) =>
                      setSort({ ...sort, sortBy: e.target.value })
                    }
                    defaultValue={sort.sortBy}
                  >
                    {fieldArr.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) =>
                      setSort({ ...sort, orderBy: e.target.value })
                    }
                    defaultValue={sort.orderBy}
                  >
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                  </select>
                  <button>Sort</button>
                </form>
              </div>
            ) : null}
          </LimitDiv>
          <LimitDiv onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowFieldSelected(!showFieldSelected)}>
              Limit fields
            </button>
            {showFieldSelected ? (
              <div>
                <form>
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
                      <label htmlFor={field}>{field}</label>
                    </div>
                  ))}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      populate();
                      setShowFieldSelected(false);
                    }}
                  >
                    Limit
                  </button>
                </form>
              </div>
            ) : null}
          </LimitDiv>
        </Option>
      </MainCntHeader>
      <MainContent
        page={router.query.page || 1}
        fields={fieldLimit}
        sort={sortStr}
        filter={filterStr}
      />
    </div>
  );
}
