import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';

const ItemRow = ({
  item,
  index,
  items,
  setItems,
  selected,
  setSelected,
  children,
  fields,
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const renderField = (field) => {
    if (item[field]) {
      if (item[field]['$numberDecimal']) {
        if (field === 'actualCost') {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
          }).format(item[field]['$numberDecimal']);
        } else if (field.startsWith('tax')) {
          return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item[field]['$numberDecimal']);
        } else {
          return item[field]['$numberDecimal'];
        }
      } else if (field === 'link' || field === 'trackingLink') {
        return (
          <a href={item[field]} target="_blank">
            {item[field].slice(0, 15)}...
          </a>
        );
      } else if (field === 'pricePerItem') {
        return new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
        }).format(item[field]);
      } else if (field === 'createdAt') {
        return new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        });
      } else if (field === 'orderAccount') {
        return (
          <Link href={`/accounts/${item[field]._id}`} passHref>
            <a>
              {item[field].loginID.slice(0, 15)}...{' '}
              <span className="tooltip">{item[field].loginID}</span>
            </a>
          </Link>
        );
      }
    }

    return item[field];
  };

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
      <th>{children}</th>
      {fields.map((field) => (
        <th key={field}>{renderField(field)}</th>
      ))}
      {/* <th>
        {new Date(item.createdAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        })}
      </th>
      <th>
        {item.trackingLink ? (
          <a href={item.trackingLink}>Click here</a>
        ) : (
          <p>No link available</p>
        )}
      </th>
      <th>
        {item.link ? (
          <a href={item.link}>Click here</a>
        ) : (
          <p>No link available</p>
        )}
      </th>
      <th>{item.name}</th>

      <th>
        {new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
        }).format(item.pricePerItem)}
      </th>
      <th>{item.quantity}</th>
      <th>
        {item.status === 'not-yet-ordered' ? (
          <StickerBtn type="danger">N/A</StickerBtn>
        ) : (
          new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
          }).format(item.actualCost['$numberDecimal'])
        )}
      </th>
      <th>{item.status}</th> */}

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
              <Link href={`/items/${item.id}`}>
                <a>View</a>
              </Link>
            </li>
            <li>
              <Link href={`/items/${item.id}/edit`}>
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
            <li>
              <button
                onClick={async () => {
                  try {
                    await axios.post(
                      `${process.env.BASE_URL}/items/${item._id}/charge`
                    );
                    window.location.reload();
                  } catch (err) {
                    console.log(err.response.data.message);
                  }
                }}
              >
                Charge
              </button>
            </li>
          </ul>
        </ActionDetail>
      </th>
    </tr>
  );
};

export default ItemRow;
