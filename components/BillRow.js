import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';
import styled from 'styled-components';
import Modal from './Modal';
import Noti from './Noti';
import BtnText from './styles/BtnText';

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

  li a {
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

const ItemRow = ({ item, index, items, setItems, fields, freezeNo }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const renderField = (field) => {
    if (item[field]) {
      if (item[field]['$numberDecimal']) {
        if (field === 'totalBillInUsd') {
          return new Intl.NumberFormat('us-US', {
            style: 'currency',
            currency: 'USD',
          }).format(item[field]['$numberDecimal']);
        } else if (field === 'estimatedWeight') {
          return item[field]['$numberDecimal'];
        } else if (field === 'remaining') {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
          }).format(item.remaining['$numberDecimal']);
        } else {
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(item[field]['$numberDecimal']);
        }
      } else if (field === 'items') {
        if (item[field].length >= 1) {
          return (
            <Drop>
              <StickerBtn
                style={{ backgroundColor: '#E1E1E1', color: '#424242' }}
              >
                List of items...
              </StickerBtn>
              <Dropdown>
                {item[field].map((single) => (
                  <li key={single._id}>
                    <Link href={`/items/${single._id}`} passHref>
                      <a>
                        {single.quantity} x {single.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </Dropdown>
            </Drop>
          );
        } else {
          return 'Nothing here...';
        }
      } else if (field === 'customer') {
        return (
          <Link href={`/customers/${item[field]._id}`} passHref>
            <BtnText style={{ marginBottom: 0 }}>
              {item[field].customerName}
            </BtnText>
          </Link>
        );
      } else if (field === 'affiliate') {
        return (
          <Link href={`/affiliates/${item[field]._id}`} passHref>
            <BtnText style={{ marginBottom: 0 }}>{item[field].name}</BtnText>
          </Link>
        );
      } else if (field === 'createdAt') {
        return new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });
      } else {
        return item[field];
      }
    } else if (field === 'moneyChargeCustomerVND') {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'VND',
      }).format(
        item.usdVndRate['$numberDecimal'] *
          item.moneyChargeCustomerUSD['$numberDecimal']
      );
    }

    return '---';
  };

  return (
    <tr
      key={item.id}
      onClick={() => setShowDetail(false)}
      // style={{ backgroundColor: index % 2 === 0 ? '#ececec' : '#dae1e7' }}
    >
      {showNoti ? <Noti message={message} type={type} /> : null}
      {showModal ? (
        <Modal setShowModal={setShowModal}>
          <h2>Pay a bill</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                await axios.post(
                  `${process.env.BASE_URL}/bills/${item._id}/pay`,
                  {
                    amount,
                  }
                );

                item.remaining['$numberDecimal'] =
                  parseFloat(item.remaining['$numberDecimal']) -
                  parseFloat(amount);
                setShowModal(false);
                setAmount('');
                setType('success');
                setMessage('success');
                setShowNoti(true);
                setTimeout(() => {
                  setShowNoti(false);
                  setType('');
                  setMessage('');
                }, 2000);
              } catch (err) {
                setType('danger');
                setMessage(err.response.data.message);
                setShowNoti(true);
                setTimeout(() => {
                  setShowNoti(false);
                  setType('');
                  setMessage('');
                }, 2000);
              }
            }}
          >
            <div>
              <label>Enter amount</label>
              <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAmount(item.remaining['$numberDecimal']);
                }}
              >
                Maximum
              </button>
            </div>
            <button>Submit</button>
          </form>
        </Modal>
      ) : null}
      <th
        style={{
          position: 'absolute',
          top: 'auto',
          left: '4rem',
          borderBottom: '1px solid rgba(0,0,0,0.09)',
          width: '9rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
              <Link href={`/bills/${item._id}`}>
                <a>View</a>
              </Link>
            </li>
            <li>
              <Link href={`/bills/${item._id}/edit`}>
                <a>Edit</a>
              </Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${process.env.BASE_URL}/bills/${item._id}`
                    );

                    setItems(items.filter((doc) => doc._id !== item._id));
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
            <li>
              <button onClick={() => setShowModal(true)}>Pay</button>
            </li>
          </ul>
        </ActionDetail>
      </th>
      {fields.map((field, index) => {
        if (index < freezeNo) {
          return (
            <th
              style={{
                position: 'absolute',
                top: 'auto',
                left: `${index * 14 + 13}rem`,
                height: '5.3rem',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderBottom: '1px solid rgba(0,0,0,0.09)',
              }}
              key={field}
            >
              {renderField(field)}
            </th>
          );
        } else {
          return <td key={field}>{renderField(field)}</td>;
        }
      })}
    </tr>
  );
};

export default ItemRow;
