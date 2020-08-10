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
import styled from 'styled-components';
import StickerBtn from './styles/StickerBtn';
import Table from './styles/Table';

const Dropdown = styled.ul`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  top: 2.8rem;
  right: 0;
  z-index: 1;
  border-radius: 4px;
  padding: 1.2rem 0;

  li a {
    display: block;
    padding: 0.8rem 0.8rem 0.8rem 1rem;
    color: ${(props) => props.theme.grey};

    &:hover {
      background-color: ${(props) => props.theme.lightGrey};
    }
  }
`;

const Drop = styled.div`
  position: relative;
  display: inline-block;

  &:hover ul {
    display: block;
  }
`;

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const caclTotalItems = () => {
    let total = 0;
    item.bills.forEach((bill) => {
      bill.items.forEach((item) => {
        total += item.quantity;
      });
    });

    return total;
  };

  const caclTotalMoney = () => {
    let total = 0;
    item.bills.forEach((bill) => {
      if (bill.moneyChargeCustomerUSD) {
        total +=
          parseFloat(bill.moneyChargeCustomerUSD['$numberDecimal']) *
          parseFloat(bill.usdVndRate['$numberDecimal']);
      }
    });

    return total;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/customers/${props.id}`
        );
        // const billInfo = await axios.get(
        //   `${process.env.BASE_URL}/customers/${props.id}/bills`
        // );

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
            {new Date(item.createdAt).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Họ tên</DetailItemTitle>
          <DetailItemInfo>{`${item.firstName} ${item.lastName}`}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số điện thoại</DetailItemTitle>
          <DetailItemInfo>{item.phoneNumber}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày sinh</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            {new Date(item.dateOfBirth).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
              timeZone: 'UTC',
            })}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Địa chỉ</DetailItemTitle>
          <DetailItemInfo>
            {item.address.length >= 1 ? item.address[0].address1 : '---'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Thành phố</DetailItemTitle>
          <DetailItemInfo>
            {item.address.length >= 1 ? (
              <StickerBtn type="success">{item.address[0].city}</StickerBtn>
            ) : (
              '---'
            )}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Discount rate</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('us-US', {
              style: 'percent',
              maximumFractionDigits: 2,
            }).format(parseFloat(item.discountRate['$numberDecimal']))}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Bank Account</DetailItemTitle>
          <DetailItemInfo>
            {item.bankAccounts.length > 0
              ? item.bankAccounts.map((acct) => (
                  <p>
                    {acct.bankName} - {acct.accountNumber}
                  </p>
                ))
              : 'Not Available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số đơn mua thành công</DetailItemTitle>
          <DetailItemInfo>{item.bills.length}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Loại khách hàng</DetailItemTitle>
          <DetailItemInfo>{item.customerType}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số item mua thành công</DetailItemTitle>
          <DetailItemInfo>{caclTotalItems()}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số tiền mua thành công</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'VND',
            }).format(caclTotalMoney())}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Danh sách đơn hàng</DetailItemTitle>
          <DetailItemInfo>
            {showModal && (
              <Modal setShowModal={setShowModal}>
                {item.bills.length > 0 ? (
                  <ul style={{ listStyle: 'none' }}>
                    {item.bills.map((bill) =>
                      bill.items.map((single) => (
                        <li key={single._id}>
                          <Link href={`/items/${single._id}`} passHref>
                            <a>
                              {single.quantity} x {single.name}
                            </a>
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                ) : (
                  <p>Wow! Such empty!</p>
                )}
              </Modal>
            )}

            <StickerBtn
              style={{ backgroundColor: '#E1E1E1', color: '#424242' }}
              onClick={() => setShowModal(!showModal)}
            >
              Click to show
            </StickerBtn>
          </DetailItemInfo>
        </DetailItem>{' '}
        <DetailItem>
          <DetailItemTitle>Ghi chú</DetailItemTitle>
          <DetailItemInfo>{item.notes}</DetailItemInfo>
        </DetailItem>
      </DetailList>

      <h2 style={{ margin: '2rem 0' }}>Bills</h2>
      {item.bills.length > 0 ? (
        <Table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Created At</th>
              <th>ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Remaining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {item.bills.map((bill) => (
              <tr key={bill._id}>
                <th>
                  {new Date(bill.createdAt).toLocaleString('en-us', {
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric',
                  })}
                </th>
                <th>
                  <Link href={`/items/${bill._id}`} passHref>
                    <a>{bill.customId}</a>
                  </Link>
                </th>
                <th>
                  <Drop>
                    <StickerBtn
                      style={{ backgroundColor: '#E1E1E1', color: '#424242' }}
                    >
                      List of items...
                    </StickerBtn>
                    <Dropdown>
                      {bill.items.map((single) => (
                        <li key={single._id}>
                          <Link href={`/items/${single._id}`} passHref>
                            <a>
                              {single.quantity} x {single.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </Dropdown>
                  </Drop>
                </th>
                <th>
                  {new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(bill.actualChargeCustomer['$numberDecimal'])}
                </th>
                <th>
                  {new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(bill.remaining['$numberDecimal'])}
                </th>
                <th>{bill.status}</th>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        'No bills available'
      )}
    </MainContent>
  );
};
export default SingleItem;
