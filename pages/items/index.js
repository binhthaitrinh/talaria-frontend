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

  const router = useRouter();

  const populate = () => {
    setFieldLimit([]);
    fieldArr.forEach((field) => {
      if (fieldSelected[field] === true) {
        setFieldLimit((fieldLimit) => [...fieldLimit, field]);
      }
    });
    console.log(fieldLimit);
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
      />
    </div>
  );
}
