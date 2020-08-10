import React, { useEffect, useState } from 'react';
import Loader from './styles/Loader';
import MainContent from './styles/MainContent';
import axios from 'axios';
import DetailList from './styles/DetailList';
import DetailItem from './styles/DetailItem';
import DetailItemTitle from './styles/DetailItemTitle';
import DetailItemInfo from './styles/DetailItemInfo';
import Link from 'next/link';
import Modal from './Modal';
import LinkPrimary from './styles/LinkPrimary';
import Table from './styles/Table';

import StickerBtn from './styles/StickerBtn';

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState(null);

  const [transLoading, setTransLoading] = useState(true);

  const withAcctRender = (trans) => {
    if (
      trans.toAccount &&
      trans.fromAccount &&
      trans.fromAccount._id === props.id
    ) {
      return (
        <Link href={`/accounts/${trans.toAccount._id}`} passHref>
          <a>
            {trans.toAccount.loginID}
            <span className="tooltip">
              {trans.toAccount.currency.toUpperCase()} -{' '}
              {trans.toAccount.accountWebsite} - {trans.toAccount.currency} -{' '}
              {trans.toAccount.loginID}
            </span>
          </a>
        </Link>
      );
    }

    if (
      trans.fromAccount &&
      trans.toAccount &&
      trans.toAccount._id === props.id
    ) {
      return (
        <Link href={`/accounts/${trans.fromAccount._id}`} passHref>
          <a>
            {trans.fromAccount.loginID}
            <span className="tooltip">
              {trans.fromAccount.currency.toUpperCase()} -{' '}
              {trans.fromAccount.accountWebsite} - {trans.fromAccount.currency}{' '}
              - {trans.fromAccount.loginID}
            </span>
          </a>
        </Link>
      );
    }

    if (trans.item) {
      return (
        <Link href={`/items/${trans.item._id}`} passHref>
          <a>
            Buy {trans.item.name || '---'}
            <span className="tooltip">
              {trans.item.quantity} x {trans.item.name} ( $
              {trans.item.pricePerItem['$numberDecimal']})
            </span>
          </a>
        </Link>
      );
    }

    return '---';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/accounts/${props.id}`
        );

        setItem(res.data.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (props.id !== undefined) {
      fetchData();
    }
  }, [props.id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/accounts/${props.id}/transactions`
        );
        setTransactions(res.data.data.data);
        setTransLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (props.id !== undefined) {
      fetchData();
    }
  }, [props.id]);

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      <DetailList>
        <DetailItem>
          <DetailItemTitle>Ngày tạo</DetailItemTitle>
          <DetailItemInfo>
            {new Date(item.createdAt).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>loginID</DetailItemTitle>
          <DetailItemInfo>{item.loginID}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Website</DetailItemTitle>
          <DetailItemInfo>{item.accountWebsite}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Balance</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat(
              item.currency === 'usd' ? 'us-US' : 'de-DE',
              {
                style: 'currency',
                currency: item.currency,
              }
            ).format(item.balance['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        {/* <DetailItem>
          <DetailItemTitle>Ngày tạo</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            {new Date(item.addedAt).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>loginID</DetailItemTitle>
          <DetailItemInfo>{item.loginID}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Account Website </DetailItemTitle>
          <DetailItemInfo>{item.accountWebsite}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Balance</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.balance)}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Status</DetailItemTitle>
          <DetailItemInfo>{item.status}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Account Type</DetailItemTitle>
          <DetailItemInfo>{item.accountType}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Lịch sử giao dịch </DetailItemTitle>
          <DetailItemInfo>
            <StickerBtn type="success" onClick={() => setShowModal(true)}>
              Show
            </StickerBtn>
            {showModal ? (
              <Modal setShowModal={setShowModal}>
                <ul>
                  {item.transactions.map((tran) => (
                    <li key={tran.id}>
                      <Link href={`/transactions/${tran._id}`}>
                        <a>
                          {' '}
                          <span
                            style={{
                              color:
                                tran.transactionType === 'inflow'
                                  ? 'green'
                                  : 'red',
                            }}
                          >
                            {tran.transactionType}
                          </span>{' '}
                          |{' '}
                          {tran.transactionType === 'outflow'
                            ? new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }).format(tran.gcCost['$numberDecimal'])
                            : new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }).format(tran.amount['$numberDecimal'])}{' '}
                          |{' '}
                          {tran.itemID
                            ? `${tran.itemID.quantity} x ${tran.itemID.name}`
                            : null}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Modal>
            ) : null}
          </DetailItemInfo>
        </DetailItem>{' '}
        <DetailItem>
          <DetailItemTitle>Notes</DetailItemTitle>
          <DetailItemInfo>{item.notes}</DetailItemInfo>
        </DetailItem> */}
      </DetailList>
      <h2 style={{ margin: '2rem 0' }}>Transaction history</h2>
      {transLoading ? null : transactions.length === 0 ? (
        <p>No transactions found!</p>
      ) : (
        <Table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Created At</th>
              <th>With Account</th>
              <th>Amount</th>
              <th>Balance</th>
              <th>Transaction ID</th>
              <th>Transacion Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transactions._id}>
                <th>
                  {new Date(transaction.createdAt).toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                  })}
                </th>
                <th>{withAcctRender(transaction)}</th>

                <th>
                  {transaction.toAccount &&
                  transaction.toAccount._id === props.id
                    ? new Intl.NumberFormat(
                        transaction.amountReceived.currency === 'usd'
                          ? 'en-US'
                          : 'de-DE',
                        {
                          style: 'currency',
                          currency: transaction.amountReceived.currency,
                          maximumFractionDigits:
                            transaction.amountReceived.currency === 'btc'
                              ? 8
                              : 2,
                        }
                      ).format(
                        transaction.amountReceived.value['$numberDecimal']
                      )
                    : new Intl.NumberFormat(
                        transaction.amountSpent.currency === 'usd'
                          ? 'en-US'
                          : 'de-DE',
                        {
                          style: 'currency',
                          currency: transaction.amountSpent.currency,
                          maximumFractionDigits:
                            transaction.amountSpent.currency === 'btc' ? 8 : 2,
                        }
                      ).format(
                        transaction.amountSpent.value['$numberDecimal'] +
                          transaction.amountSpentFee.value['$numberDecimal']
                      )}
                </th>

                <th>
                  {transaction.toAccount &&
                  transaction.toAccount._id === props.id
                    ? new Intl.NumberFormat(
                        transaction.amountReceived.currency === 'usd'
                          ? 'en-US'
                          : 'de-DE',
                        {
                          style: 'currency',
                          currency: transaction.amountReceived.currency,
                          maximumFractionDigits:
                            transaction.amountReceived.currency === 'btc'
                              ? 8
                              : 2,
                        }
                      ).format(transaction.toAcctBalance['$numberDecimal'])
                    : new Intl.NumberFormat(
                        transaction.amountSpent.currency === 'usd'
                          ? 'en-US'
                          : 'de-DE',
                        {
                          style: 'currency',
                          currency: transaction.amountSpent.currency,
                          maximumFractionDigits:
                            transaction.amountSpent.currency === 'btc' ? 8 : 2,
                        }
                      ).format(transaction.fromAcctBalance['$numberDecimal'])}
                </th>

                <th>
                  <Link href={`/transactions/${transaction._id}`}>
                    <a>{transaction.customId}</a>
                  </Link>
                </th>
                <th>
                  {transaction.toAccount &&
                  transaction.toAccount._id === props.id
                    ? 'inflow'
                    : 'outflow'}
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MainContent>
  );
};
export default SingleItem;
