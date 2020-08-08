import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';

const ItemRow = ({ item, index, items, setItems, fields }) => {
  const [showDetail, setShowDetail] = useState(false);

  const renderField = (field) => {
    if (item[field]) {
      if (item[field]['$numberDecimal']) {
        return new Intl.NumberFormat(
          item.currency === 'usd' ? 'en-US' : 'de-DE',
          {
            style: 'currency',
            currency: item.currency.toUpperCase(),
          }
        ).format(item[field]['$numberDecimal']);
      } else if (field === 'createdAt') {
        return new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });
      } else if (field === 'loginID') {
        return (
          <Link href={`/accounts/${item._id}`}>
            <a>{item.loginID}</a>
          </Link>
        );
      }

      return item[field];
    }
    return '---';
  };

  const deleteItem = async () => {
    await axios.delete(`${process.env.BASE_URL}/accounts/${item.id}`);
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
              <Link href={`/accounts/${item._id}`}>
                <a>View</a>
              </Link>
            </li>
            <li>
              <Link href={`/accounts/${item._id}/edit`}>
                <a>Edit</a>
              </Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${process.env.BASE_URL}/accounts/${item.id}`
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

      {fields.map((field, index) => (
        <th key={index}>{renderField(field)}</th>
      ))}
    </tr>
  );
};

export default ItemRow;
