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

import StickerBtn from './styles/StickerBtn';

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/accounts/${props.id}`
        );

        console.log(res);
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

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      <DetailList>
        <DetailItem>
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
        </DetailItem>
      </DetailList>
    </MainContent>
  );
};
export default SingleItem;
