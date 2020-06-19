import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';
import styled from 'styled-components';
import Modal from './Modal';
import Noti from './Noti';

const DropBtn = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
`;

const Dropdown = styled.ul`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
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
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

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
      <th>
        {' '}
        {new Date(item.date).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        })}
      </th>
      <th>
        <Drop>
          <StickerBtn type="success">List of items...</StickerBtn>
          <Dropdown>
            {item.items.length >= 1
              ? item.items.map((single) => (
                  <li key={single._id}>
                    {single.quantity} x {single.name}
                  </li>
                ))
              : 'Nothing here'}
          </Dropdown>
        </Drop>
      </th>
      <th>{item.totalBillInUsd['$numberDecimal']}</th>
      <th>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'vnd',
        }).format(item.moneyChargeCustomerVND['$numberDecimal'])}
      </th>
      <th>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'vnd',
        }).format(item.remaining['$numberDecimal'])}
      </th>
      <th>{item.customer.customerName}</th>
      <th>
        <StickerBtn type={item.status === 'fully-paid' ? 'success' : 'danger'}>
          {item.status}
        </StickerBtn>
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
    </tr>
  );
};

export default ItemRow;
