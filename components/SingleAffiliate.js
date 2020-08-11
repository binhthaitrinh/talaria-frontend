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
import { Drop, Dropdown } from './styles/Dropdown';

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [compensations, setCompensations] = useState([]);

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
          `${process.env.BASE_URL}/compensations/${props.id}/2020/08`
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
                  <Link href={`/bills/${comp.bill}`} passHref>
                    <a>{comp.bill}</a>
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
