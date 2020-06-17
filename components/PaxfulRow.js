import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';

const ItemRow = ({ item, index, items, setItems }) => {
  const [showDetail, setShowDetail] = useState(false);

  const deleteItem = async () => {
    await axios.delete(
      `https://hidden-gorge-76682.herokuapp.com/api/v1/paxfuls/${item.id}`
    );
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
      </th>
      <th>
        {item.transactionType === 'inflow'
          ? new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'VND',
            }).format(item.remainingBalance.rating['$numberDecimal'])
          : '---'}
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
                      `https://hidden-gorge-76682.herokuapp.com/api/v1/items/${item.id}`
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
