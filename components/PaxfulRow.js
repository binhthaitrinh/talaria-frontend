import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';

const ItemRow = ({ item, index, items, setItems, fields, freezeNo }) => {
  const [showDetail, setShowDetail] = useState(false);

  const deleteItem = async () => {
    await axios.delete(`${process.env.BASE_URL}/paxfuls/${item.id}`);
    window.location.reload();
    console.log('acbasd');
  };

  const renderField = (field) => {
    if (item[field]) {
      if (item[field]['$numberDecimal']) {
        if (field === 'btcUsdRate') {
          return new Intl.NumberFormat('us-US', {
            style: 'currency',
            currency: 'USD',
          }).format(item[field]['$numberDecimal']);
        } else {
          return item[field]['$numberDecimal'];
        }
      } else if (field === 'createdAt') {
        return new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });
      } else if (field === 'moneySpent') {
        if (item[field].amount) {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
          }).format(item[field].amount['$numberDecimal']);
        } else {
          return '---';
        }
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
      {' '}
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
              <Link href={`/paxfuls/${item.id}`}>
                <a>View</a>
              </Link>
            </li>
            <li>
              <Link href={`/paxfuls/${item.id}/edit`}>
                <a>Edit</a>
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
      {/* <th>
        {new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        })}
      </th>
      <th>
        {item.transactionType === 'inflow' ? (
          <StickerBtn type="success">inflow</StickerBtn>
        ) : (
          <StickerBtn type="danger">outflow</StickerBtn>
        )}
      </th>

      <th>{item.btcAmount['$numberDecimal']}</th>
      <th>{item.withdrawFee ? item.withdrawFee['$numberDecimal'] : 0}</th>
      <th>{item.totalBalance['$numberDecimal']}</th>
      <th>{item.buyer}</th>
      <th>{item.pocketMoney ? 'Đúng' : 'Sai'}</th>
      <th>
        {item.transactionType === 'inflow'
          ? new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'VND',
            }).format(item.moneySpent.amount['$numberDecimal'])
          : '---'}
      </th> */}
    </tr>
  );
};

export default ItemRow;
