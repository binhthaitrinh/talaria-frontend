import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ActionBtn from './styles/ActionBtn';
import ActionDetail from './styles/ActionDetails';
import axios from 'axios';
import Modal from './Modal';
import Form from './styles/Form';
import FormGroup from './styles/FormGroup';
import FormLabel from './styles/FormLabel';
import { Select } from './styles/FormComponent';
import BtnPrimary from './styles/BtnPrimary';
import Noti from './Noti';

const ItemRow = ({
  item,
  index,
  items,
  setItems,
  selected,
  setSelected,
  children,
  fields,
  freezeNo,
}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [showCharge, setShowCharge] = useState(false);
  const [orderAccount, setOrderAccount] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/accounts?fields=loginID`
        );

        setAccounts(res.data.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }

    fetchAccounts();
  }, [showCharge]);

  const renderField = (field) => {
    if (item[field]) {
      if (item[field]['$numberDecimal']) {
        if (field === 'actualCost' && item[field]['$numberDecimal'] > 0) {
          return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
          }).format(item[field]['$numberDecimal']);
        } else if (
          field === 'actualCost' &&
          item[field]['$numberDecimal'] === '0'
        ) {
          return '---';
        } else if (field.startsWith('tax')) {
          return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item[field]['$numberDecimal']);
        } else if (field === 'pricePerItem') {
          return new Intl.NumberFormat('us-US', {
            style: 'currency',
            currency: 'usd',
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
      } else if (field === '_id' || field === 'status') {
        return (
          <div>
            {`${item[field].slice(0, 10)}...`}
            <span className="tooltip">{item[field]}</span>
          </div>
        );
      } else if (field === 'name') {
        return (
          <div>
            {item[field].length > 15
              ? `${item[field].slice(0, 10)}...`
              : item[field]}
            {item[field].length > 15 ? (
              <span className="tooltip">{item[field]}</span>
            ) : (
              ''
            )}
          </div>
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
      <th
        style={{
          position: 'absolute',
          top: 'auto',
          left: '4rem',
          height: '5.3rem',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.09)',
          width: '9rem',
        }}
      >
        {children}
      </th>{' '}
      <th
        style={{
          position: 'absolute',
          top: 'auto',
          left: '13rem',
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
              <button onClick={() => setShowCharge(true)}>Charge</button>
              {showNoti ? <Noti message={message} type={alertType} /> : null}
              {showCharge && (
                <Modal setShowModal={setShowCharge}>
                  <Form>
                    <FormGroup>
                      <FormLabel>Choose an account</FormLabel>

                      {accounts.length > 0 ? (
                        <Select
                          value={orderAccount}
                          onChange={(e) => setOrderAccount(e.target.value)}
                        >
                          <option value="">Choose</option>
                          {accounts.map((acct) => (
                            <option key={acct._id} value={acct._id}>
                              {acct.loginID}
                            </option>
                          ))}
                        </Select>
                      ) : null}
                    </FormGroup>
                    <BtnPrimary
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          await axios.patch(
                            `${process.env.BASE_URL}/items/${item._id}`,
                            { orderAccount },
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                              },
                            }
                          );

                          const res = await axios.post(
                            `${process.env.BASE_URL}/items/${item._id}/charge`
                          );

                          console.log(
                            res.data.data.data.amount['$numberDecimal']
                          );

                          setItems((items) => {
                            // const current = items.filter(
                            //   (single) => single._id === item._id
                            // );
                            // current.actualCost = res.data.data.data.amount;
                            // current.status = 'ordered';

                            const foundIdx = items.findIndex(
                              (single) => single._id === item._id
                            );
                            const temp = items[foundIdx];
                            temp.actualCost = res.data.data.data.amount;
                            temp.status = 'ordered';

                            items.splice(foundIdx, 1, temp);
                            return items;
                          });

                          setMessage('Charge success');
                          setAlertType('success');
                          setShowNoti(true);

                          setShowCharge(false);

                          setTimeout(() => {
                            setShowNoti(false);
                            setMessage('');
                            setAlertType('');
                          }, 2000);
                        } catch (err) {
                          setMessage(err.response.data);
                          setAlertType('danger');
                          setShowNoti(true);

                          setTimeout(() => {
                            setShowNoti(false);
                            setMessage('');
                            setAlertType('');
                          }, 2000);
                        }
                      }}
                    >
                      Charge
                    </BtnPrimary>
                  </Form>
                </Modal>
              )}
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
                left: `${(index + 2) * 14 - 6}rem`,
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
    </tr>
  );
};

export default ItemRow;
