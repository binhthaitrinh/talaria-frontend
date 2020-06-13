import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';

const ItemRow = ({ item, index }) => {
  const [showDetail, setShowDetail] = useState(false);
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
      <th>{item.name}</th>
      <th>
        {new Intl.NumberFormat('en-us', {
          style: 'currency',
          currency: 'USD',
        }).format(item.pricePerItem)}
      </th>
      <th>{item.quantity}</th>
      <th>{item.status}</th>
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
              <Link href="/">
                <a>Delete</a>
              </Link>
            </li>
          </ul>
        </ActionDetail>
      </th>
    </tr>
  );
};

export default ItemRow;
