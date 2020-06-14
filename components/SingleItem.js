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

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://hidden-gorge-76682.herokuapp.com/api/v1/items/${props.id}`
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
          <DetailItemTitle>Tên sản phẩm</DetailItemTitle>
          <DetailItemInfo>{item.name}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Giá</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.pricePerItem)}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số lượng</DetailItemTitle>
          <DetailItemInfo>{item.quantity}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Thuế</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('de-DE', {
              stype: 'percent',
              maximumFractionDigits: 2,
            }).format(item.tax['$numberDecimal'] * 100)}{' '}
            %
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Thuế tính cho khách</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('de-DE', {
              stype: 'percent',
              maximumFractionDigits: 2,
            }).format(item.taxForCustomer['$numberDecimal'] * 100)}{' '}
            %
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Phí ship nội địa Mỹ</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.usShippingFee['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Giá thực tế</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.actualCost['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Order Website</DetailItemTitle>
          <DetailItemInfo>{item.orderedWebsite}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Cân nặng ước tính</DetailItemTitle>
          <DetailItemInfo>
            {parseFloat(item.tax['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Cân nặng thực tế</DetailItemTitle>
          <DetailItemInfo>
            {parseFloat(item.tax['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày khởi tạo</DetailItemTitle>
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
          <DetailItemTitle>Link sản phẩm</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            <LinkPrimary href={item.link}>Click here</LinkPrimary>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tracking Link</DetailItemTitle>
          <DetailItemInfo>
            <LinkPrimary href={item.trackingLink}>Click here</LinkPrimary>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Order account</DetailItemTitle>
          <DetailItemInfo>{item.orderAccount.loginID}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tình trạng</DetailItemTitle>
          <DetailItemInfo>{item.status}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ghi chú</DetailItemTitle>
          <DetailItemInfo>{item.notes}</DetailItemInfo>
        </DetailItem>
      </DetailList>
    </MainContent>
  );
};
export default SingleItem;
