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
import BtnPrimary from './styles/BtnPrimary';
import Noti from './Noti';

import StickerBtn from './styles/StickerBtn';
import { Drop, Dropdown } from './styles/Dropdown';

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [compensations, setCompensations] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/affiliates/${props.id}`
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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/compensations/${props.id}/${year}/${month}`
        );

        console.log(res);
        setCompensations(res.data.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    if (props.id !== undefined) {
      fetchData();
    }
  }, [props.id, year, month]);

  const payAffiliate = async () => {
    try {
      const res = await axios.patch(
        `${process.env.BASE_URL}/affiliates/${props.id}/${year}/${month}`
      );

      setMessage(
        `Paid ${new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'VND',
        }).format(parseFloat(res.data.data.paidAmount))}`
      );
      setCompensations((compensations) => {
        const shallow = [...compensations];
        shallow.forEach((comp) => (comp.status = 'paid'));
        return shallow;
      });
      setAlertType('success');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        setMessage('');
        setAlertType('');
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
      setAlertType('danger');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        setMessage('');
        setAlertType('');
      }, 3000);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      {showNoti ? <Noti message={message} type={alertType} /> : null}
      <DetailList>
        <DetailItem>
          <DetailItemTitle>Ngày tạo</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            {new Date(item.createdAt).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>ID</DetailItemTitle>
          <DetailItemInfo>{item.customId}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Tên</DetailItemTitle>
          <DetailItemInfo>{`${item.firstName} ${
            item.lastName ? item.lastName : ''
          }`}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Số điện thoại</DetailItemTitle>
          <DetailItemInfo>{item.phoneNumber}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>% hoa hồng</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(item.commissionRate['$numberDecimal'] * 1)}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Social Media Links</DetailItemTitle>
          <DetailItemInfo>
            <Drop>
              <StickerBtn
                style={{ backgroundColor: '#E1E1E1', color: '#424242' }}
              >
                Hover here
              </StickerBtn>
              <Dropdown>
                {item.socialMediaLinks.map((single) => (
                  <li key={single._id}>
                    {single.socialMediaType} - {single.link}
                  </li>
                ))}
              </Dropdown>
            </Drop>
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Bank accounts</DetailItemTitle>
          <DetailItemInfo>
            <Drop>
              <StickerBtn
                style={{ backgroundColor: '#E1E1E1', color: '#424242' }}
              >
                Hover here
              </StickerBtn>
              <Dropdown>
                {item.bankAccounts.map((single) => (
                  <li key={single._id}>
                    {single.bankName} - {single.accountNumber}
                  </li>
                ))}
              </Dropdown>
            </Drop>
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Notes</DetailItemTitle>
          <DetailItemInfo>{item.notes}</DetailItemInfo>
        </DetailItem>
      </DetailList>
      <h2>Compensations</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p>Result for </p>
          <form>
            <input
              onChange={(e) => {
                const data = e.target.value.split('-');
                setYear(data[0]);
                setMonth(parseFloat(data[1]));
              }}
              type="month"
              value={`${year}-${month < 10 ? `0${month}` : month}`}
            />
          </form>
        </div>
        <div>
          <BtnPrimary onClick={payAffiliate}>Pay in full</BtnPrimary>
        </div>
      </div>

      {compensations.length > 0 ? (
        <Table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Created At</th>
              <th>ID</th>
              <th>Amount</th>
              <th>Bill</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {compensations.map((comp) => (
              <tr key={comp._id}>
                <th>
                  {new Date(comp.createdAt).toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                  })}
                </th>
                <th>{comp.customId}</th>
                <th>
                  {comp.amount
                    ? new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(comp.amount['$numberDecimal'])
                    : '---'}
                </th>
                <th>
                  <Link href={`/bills/${comp.bill._id}`} passHref>
                    <a>{comp.bill.customId}</a>
                  </Link>
                </th>
                <th>{comp.status}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No compensation yet</p>
      )}
    </MainContent>
  );
};
export default SingleItem;
