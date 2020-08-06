import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';
import LinkPrimary from './styles/LinkPrimary';
import { Drop, Dropdown } from './styles/Dropdown';

const ItemRow = ({ item, index, items, setItems }) => {
  const [showDetail, setShowDetail] = useState(false);

  const deleteItem = async () => {
    await axios.delete(`${process.env.BASE_URL}/paxfuls/${item.id}`);
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
      <th>{item.accountID ? item.accountID.loginID : '---'}</th>
      <th>
        {item.itemID ? (
          <Drop>
            <StickerBtn
              style={{ backgroundColor: '#E1E1E1', color: '#424242' }}
            >
              List
            </StickerBtn>
            <Dropdown>
              <li>
                <Link href={`/items/${item.itemID._id}`}>
                  <a>
                    {item.itemID.quantity} - {item.itemID.name}
                  </a>
                </Link>
              </li>
            </Dropdown>
          </Drop>
        ) : (
          '---'
        )}
      </th>
      <th>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'VND',
        }).format(item.amount['$numberDecimal'])}
      </th>

      <th>
        <StickerBtn
          type={item.transactionType === 'inflow' ? 'success' : 'danger'}
        >
          {item.transactionType}
        </StickerBtn>
      </th>
      <th>{item.notes ? item.notes : '---'}</th>

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
              <Link href={`/transactions/${item.id}`}>
                <a>View</a>
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
