import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';
import Noti from './Noti';

const GiftcardRow = ({ item, index, items, setItems, freezeNo, fields }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const renderField = (field) => {
    if (item[field]) {
      if (item[field]['$numberDecimal']) {
        if (field === 'btcUsdRate' || field === 'toAcctBalance') {
          return new Intl.NumberFormat('us-US', {
            style: 'currency',
            currency: 'USD',
          }).format(item[field]['$numberDecimal']);
        } else if (field === 'usdVndRate') {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'vnd',
          }).format(item[field]['$numberDecimal']);
        } else if (field === 'discountRate') {
          return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.discountRate['$numberDecimal'] * 1);
        } else {
          return item[field]['$numberDecimal'];
        }
      } else if (field === 'giftCardValue') {
        return new Intl.NumberFormat('us-US', {
          style: 'currency',
          currency: 'USD',
        }).format(item[field]);
      } else if (field === 'createdAt') {
        return new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });
      } else if (field === 'amountSpent') {
        if (item[field].value) {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: item[field].currency.toUpperCase(),
          }).format(item[field].value['$numberDecimal']);
        } else {
          return '---';
        }
      } else if (field === 'price' || field === 'fee') {
        return item[field].value['$numberDecimal'];
      } else if (field === 'toAccount' || field === 'fromAccount') {
        return (
          <Link href={`/accounts/${item[field]._id}`}>
            <a> {item[field].loginID}</a>
          </Link>
        );
      } else if (field === 'transactionType') {
        return (
          <StickerBtn
            type={item.transactionType === 'inflow' ? 'success' : 'danger'}
          >
            {item[field]}
          </StickerBtn>
        );
      } else if (field === 'remainingBalance') {
        if (
          item.remainingBalance.rating &&
          item.remainingBalance.rating['$numberDecimal'] != 'NaN'
        ) {
          return item.remainingBalance.amount['$numberDecimal'];
        } else {
          return '---';
        }
      } else if (field === 'btcAccount' || field === 'fromAccount') {
        return (
          <Link href={`/accounts/${item[field]._id}`}>
            {item[field].loginID}
          </Link>
        );
      }
    } else {
      return '---';
    }
    return item[field];
  };

  return (
    <tr
      key={item.id}
      onClick={() => setShowDetail(false)}
      // style={{ backgroundColor: index % 2 === 0 ? '#ececec' : '#dae1e7' }}
    >
      {showNoti && <Noti message={message} type={alertType} />}
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
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${process.env.BASE_URL}/giftcards/${item._id}`
                    );

                    setMessage(`Successfully deleted ${item.customId}`);
                    setAlertType('success');
                    setShowNoti(true);
                    setTimeout(() => {
                      setShowNoti(false);
                      setMessage('');
                      setAlertType('');
                      setItems(items.filter((doc) => doc._id !== item._id));
                    }, 2000);
                  } catch (err) {
                    setMessage(err.response.data.message);
                    setAlertType('danger');
                    setShowNoti(true);
                    setTimeout(() => {
                      setShowNoti(false);
                      setMessage('');
                      setAlertType('');
                    }, 3000);
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
                width: '14rem',
              }}
              key={field}
            >
              {renderField(field)}
            </th>
          );
        } else {
          return <td key={field}> {renderField(field)}</td>;
        }
      })}
    </tr>
  );
};

export default GiftcardRow;
