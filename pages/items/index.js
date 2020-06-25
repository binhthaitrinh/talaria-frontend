import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Items';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LinkPrimary from '../../components/styles/LinkPrimary';
import Link from 'next/link';
import styled from 'styled-components';

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
    value: null,
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
        <div style={{ display: 'flex' }}>
          <LimitDiv>
            <button onClick={() => setShowFilter(!showFilter)}>Filter</button>
            {showFilter ? (
              <div>
                {filter.map((item, i) => (
                  <div key={i}>
                    <p>
                      {item.field} {item.operator} {item.value}
                    </p>
                  </div>
                ))}
                <form>
                  <select
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
                  </select>
                  <select
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
                  </select>
                  <input
                    type="text"
                    value={singleFilter.value}
                    onChange={(e) => {
                      setSingleFilter({
                        ...singleFilter,
                        value: e.target.value,
                      });
                    }}
                  />
                  <button
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
                  </button>
                </form>

                <button
                  onClick={() => {
                    setFilterStr(getFilterStr());
                  }}
                >
                  Filter
                </button>
                <button
                  onClick={() => {
                    setFilterStr('');
                  }}
                >
                  Clear filter
                </button>
              </div>
            ) : null}
          </LimitDiv>
          <LimitDiv onClick={(e) => e.stopPropagation()}>
            <button
              style={{ marginLeft: '1rem' }}
              onClick={() => setShowSort((showSort) => !showSort)}
            >
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
          <LimitDiv
            style={{ marginLeft: '1rem' }}
            onClick={(e) => e.stopPropagation()}
          >
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
        </div>
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
