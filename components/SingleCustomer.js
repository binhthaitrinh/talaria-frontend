import React, { useEffect, useState } from 'react';
import Loader from './styles/Loader';
import MainContent from './styles/MainContent';
import axios from 'axios';
import DetailList from './styles/DetailList';
import DetailItem from './styles/DetailItem';
import DetailItemTitle from './styles/DetailItemTitle';
import DetailItemInfo from './styles/DetailItemInfo';
import Link from 'next/link';
import LinkPrimary from './styles/LinkPrimary';

import StickerBtn from './styles/StickerBtn';

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

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
      if (bill.moneyChargeCustomerVND) {
        total = parseFloat(bill.moneyChargeCustomerVND['$numberDecimal']);
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
        const billInfo = await axios.get(
          `${process.env.BASE_URL}/customers/${props.id}/bills`
        );

        console.log(res);
        setItem({ ...res.data.data.data, bills: billInfo.data.data.data });
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
            {new Date(item.date).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Họ tên</DetailItemTitle>
          <DetailItemInfo>{item.customerName}</DetailItemInfo>
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
          <DetailItemTitle>Số đơn mua thành công</DetailItemTitle>
          <DetailItemInfo>{item.bills.length}</DetailItemInfo>
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
            <Link href="/" pasHref>
              <LinkPrimary>Click here</LinkPrimary>
            </Link>
          </DetailItemInfo>
        </DetailItem>
      </DetailList>
    </MainContent>
  );
};
export default SingleItem;
