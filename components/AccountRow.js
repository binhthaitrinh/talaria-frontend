import React, { useState } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import StickerBtn from './styles/StickerBtn';

const ItemRow = ({ item, index, items, setItems }) => {
  const [showDetail, setShowDetail] = useState(false);

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
        {new Date(item.addedAt).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        })}
      </th>
      <th>
        {item.loginID.slice(0, 15)}...
        <span className="tooltip">{item.loginID}</span>
      </th>
      <th>
        <StickerBtn type="success">{item.accountWebsite}</StickerBtn>
      </th>
      <th>{item.balance}</th>
      <th>
        <StickerBtn type={item.accountType === 'owned' ? 'success' : 'danger'}>
          {item.accountType}
        </StickerBtn>
      </th>
      <th>{item.status}</th>
      <th>{item.notes}</th>

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
    </tr>
  );
};

export default ItemRow;
