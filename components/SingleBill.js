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
import BtnText from './styles/BtnText';
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
          `${process.env.BASE_URL}/bills/${props.id}`
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
            {new Date(item.createdAt).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Status</DetailItemTitle>
          <DetailItemInfo>{item.status}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tỉ giá VND/USD</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'VND',
            }).format(item.vndUsdRate['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tổng bill in VND</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'VND',
            }).format(
              item.vndUsdRate['$numberDecimal'] *
                item.moneyChargeCustomerUSD['$numberDecimal']
            )}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tiền đã nhận</DetailItemTitle>
          <DetailItemInfo>
            <StickerBtn type="success">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
              }).format(
                item.vndUsdRate['$numberDecimal'] *
                  item.moneyChargeCustomerUSD['$numberDecimal'] -
                  item.remaining['$numberDecimal']
              )}
            </StickerBtn>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số tiền còn thiếu</DetailItemTitle>
          <DetailItemInfo>
            <StickerBtn type="danger">
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
              }).format(item.remaining['$numberDecimal'])}
            </StickerBtn>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Cân nặng ước tính</DetailItemTitle>
          <DetailItemInfo>
            {item.estimatedWeight['$numberDecimal']} lbs
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Phí ship về VN in USD</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.shippingFeeToVnInUSD['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tổng số tiền in USD</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.totalBillInUsd['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tổng số tiền in USD (sau giảm giá)</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.moneyChargeCustomerUSD['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Thuế</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'percent',
              maximumFractionDigits: 2,
            }).format(item.taxForCustomer['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Khách hàng</DetailItemTitle>
          <DetailItemInfo>
            <Link href={`/customers/${item.customer._id}`} passHref>
              <BtnText style={{ marginBottom: 0 }}>
                {' '}
                {item.customer.customerName}
              </BtnText>
            </Link>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Cộng tác viên</DetailItemTitle>
          <DetailItemInfo>
            <Link href={`/affiliates/${item.affiliate._id}`} passHref>
              <BtnText style={{ marginBottom: 0 }}>
                {' '}
                {item.affiliate.name}
              </BtnText>
            </Link>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle></DetailItemTitle>
          <DetailItemInfo></DetailItemInfo>
        </DetailItem>{' '}
        <DetailItem>
          <DetailItemTitle>Hóa đơn chuyển tiền</DetailItemTitle>
          <DetailItemInfo>
            {item.moneyTransferReceipt ? item.moneyTransferReceipt : '---'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Items</DetailItemTitle>
          <DetailItemInfo>
            <ul>
              {item.items.map((doc) => (
                <li>
                  <Link href={`/items/${doc._id}`} passHref>
                    <a>
                      {doc.quantity} x {doc.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </DetailItemInfo>
        </DetailItem>
      </DetailList>
    </MainContent>
  );
};
export default SingleItem;
