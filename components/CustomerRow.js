import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';
import styled from 'styled-components';

const Dropdown = styled.ul`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  top: 2.8rem;
  right: 0;
  z-index: 1;
  border-radius: 4px;
  padding: 1.2rem 0;

  li {
    display: block;
    padding: 0.8rem 0.8rem 0.8rem 1rem;
    color: ${(props) => props.theme.grey};

    &:hover {
      background-color: ${(props) => props.theme.lightGrey};
    }
  }
`;

const Drop = styled.div`
  position: relative;
  display: inline-block;

  &:hover ul {
    display: block;
  }
`;

const ItemRow = ({ item, index, items, setItems }) => {
  const [showDetail, setShowDetail] = useState(false);

  const deleteItem = async () => {
    await axios.delete(`${process.env.BASE_URL}/items/${item.id}`);
    window.location.reload();
    console.log('acbasd');
  };
  return (
    <tr
      key={item.id}
      onClick={() => setShowDetail(false)}
      // style={{ backgroundColor: index % 2 === 0 ? '#ececec' : '#dae1e7' }}
    >
      <th>
        {new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        })}
      </th>
      <th>
        <Link href={`/customers/${item._id}`} passHref>
          <a>{item.customId}</a>
        </Link>
      </th>
      <th>{`${item.firstName} ${item.lastName}`}</th>
      <th>
        <Drop>
          <StickerBtn style={{ backgroundColor: '#E1E1E1', color: '#424242' }}>
            Hover
          </StickerBtn>
          <Dropdown>
            <li>
              Amazon:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.amazon['$numberDecimal'])}
            </li>
            <li>
              Sephora:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.sephora['$numberDecimal'])}
            </li>
            <li>
              Ebay:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.ebay['$numberDecimal'])}
            </li>
            <li>
              Bestbuy:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.bestbuy['$numberDecimal'])}
            </li>
            <li>
              Costco:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.costco['$numberDecimal'])}
            </li>
            <li>
              Walmart:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.walmart['$numberDecimal'])}
            </li>
            <li>
              Mua hộ:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.discountRate.assisting['$numberDecimal'])}
            </li>
          </Dropdown>
        </Drop>
        {/* {new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(item.discountRate['$numberDecimal'] * 1)} */}
      </th>
      <th>{item.phoneNumber}</th>
      <th>
        {new Date(item.dateOfBirth).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
          timeZone: 'UTC',
        })}
      </th>
      <th>{item.address.length >= 1 ? item.address[0].address1 : '---'}</th>
      <th>
        {item.address.length >= 1 ? (
          <StickerBtn type="success">{item.address[0].city}</StickerBtn>
        ) : (
          '---'
        )}
      </th>
      <th>{item.customerType}</th>

      <th>
        {item.bankAccounts.length > 0 ? (
          <div>
            Hover here
            <span className="tooltip">
              {item.bankAccounts.map((acct, index) => (
                <div key={index}>
                  {acct.bankName} - {acct.accountNumber}
                </div>
              ))}
            </span>
          </div>
        ) : (
          '---'
        )}
      </th>

      <th>
        {item.notes ? (
          <div>
            {`${item.notes.slice(0, 10)}...`}
            <span className="tooltip">{item.notes}</span>
          </div>
        ) : (
          '---'
        )}
      </th>

      <th>
        <ActionBtn
          onClick={(e) => {
            e.stopPropagation();
            setShowDetail(!showDetail);
          }}
        >
          ...
        </ActionBtn>
        <ActionDetail className={showDetail ? 'show' : ''}>
          <ul>
            <li>
              <Link href={`/customers/${item._id}`}>
                <a>View</a>
              </Link>
            </li>
            <li>
              <Link href={`/customers/${item._id}/edit`}>
                <a>Edit</a>
              </Link>
            </li>
            <li>
              <Link href={`/bills/new?customerId=${item._id}`}>
                <a>Create a bill</a>
              </Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${process.env.BASE_URL}/items/${item.id}`
                    );

                    setItems(items.filter((doc) => doc.id !== item.id));
                  } catch (err) {
                    console.log(err);
                  }

                  // window.location.reload();
                  // console.log('acbasd');
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        </ActionDetail>
      </th>
    </tr>
  );
};

export default ItemRow;
