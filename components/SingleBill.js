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
import Table from './styles/Table';

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
      <div>
        <Link href={`/customers/${item.customer._id}`}>
          <a style={{ color: '#00909e' }}>
            <h3>
              Khách hàng:{' '}
              {`${item.customer.firstName} ${item.customer.lastName}`}{' '}
            </h3>
          </a>
        </Link>

        <p>
          Địa chỉ:{' '}
          {item.customer.address.length > 0
            ? item.customer.address[0].address1
            : 'N/A'}
        </p>
        <p>
          Thành phố:{' '}
          {item.customer.address.length > 0
            ? item.customer.address[0].city
            : 'N/A'}
        </p>
        <p>SĐT: {item.customer.phoneNumber || ''}</p>
      </div>
      <DetailList style={{ margin: '2rem 0' }}>
        <DetailItem>
          <DetailItemTitle>Created At</DetailItemTitle>
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
          <DetailItemTitle>Affiliate</DetailItemTitle>
          <DetailItemInfo>
            {item.affiliate ? item.affiliate.firstName : 'N/A'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Status</DetailItemTitle>
          <DetailItemInfo>{item.status}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Money Received</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'vnd',
            }).format(item.moneyReceived['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Remaining</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'vnd',
            }).format(item.remaining['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Notes</DetailItemTitle>
          <DetailItemInfo>{item.notes || 'N/A'}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Money Transfer Receipt</DetailItemTitle>
          <DetailItemInfo>{item.moneyTransferReceipt || 'N/A'}</DetailItemInfo>
        </DetailItem>
      </DetailList>
      <Table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th style={{ width: '14rem' }}>Ngày tạo</th>
            <th>Tên sản phẩm</th>
            <th style={{ width: '14rem' }}>Giá</th>
            <th style={{ width: '14rem' }}>Số lượng</th>
            <th style={{ width: '14rem' }}>Cân nặng</th>
            <th style={{ width: '20rem' }}>US Shipping Fee</th>
            <th style={{ width: '14rem' }}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {item.items.map((doc, index) => (
            <tr>
              <th style={{ width: '14rem' }}>
                {new Date(doc.createdAt).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                })}
              </th>
              <th>{doc.name}</th>
              <th style={{ width: '14rem' }}>
                {new Intl.NumberFormat('us-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(doc.pricePerItem['$numberDecimal'])}
              </th>
              <th style={{ width: '14rem' }}>{doc.quantity}</th>
              <th style={{ width: '14rem' }}>
                {doc.estimatedWeight['$numberDecimal']}
              </th>
              <th style={{ width: '14rem' }}>
                {' '}
                {new Intl.NumberFormat('us-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(doc.usShippingFee['$numberDecimal'])}
              </th>
              <th style={{ width: '14rem' }}>
                {new Intl.NumberFormat('us-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(
                  parseFloat(doc.pricePerItem['$numberDecimal']) *
                    doc.quantity +
                    doc.usShippingFee['$numberDecimal']
                )}
              </th>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th> <th></th>
            <th>Subtotal</th>
            <th>
              {new Intl.NumberFormat('us-US', {
                style: 'currency',
                currency: 'usd',
              }).format(
                item.items.reduce(
                  (acc, current) =>
                    acc +
                    parseFloat(
                      current.pricePerItem['$numberDecimal'] *
                        parseFloat(current.quantity) +
                        current.usShippingFee['$numberDecimal']
                    ),
                  0
                )
              )}
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th> <th></th>
            <th>
              Tax (
              {new Intl.NumberFormat('us-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item.taxForCustomer['$numberDecimal'])}
              )
            </th>
            <th>
              {new Intl.NumberFormat('us-US', {
                style: 'currency',
                currency: 'usd',
              }).format(
                item.items.reduce(
                  (acc, current) =>
                    acc +
                    parseFloat(
                      current.pricePerItem['$numberDecimal'] *
                        parseFloat(current.quantity) +
                        current.usShippingFee['$numberDecimal']
                    ),
                  0
                ) * item.taxForCustomer['$numberDecimal']
              )}
            </th>
          </tr>

          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th> <th></th>
            <th>Shipping</th>
            <th>
              {new Intl.NumberFormat('us-US', {
                style: 'currency',
                currency: 'usd',
              }).format(
                item.shippingRateToVnInUSD['$numberDecimal'] *
                  item.estimatedWeight['$numberDecimal']
              )}
            </th>
          </tr>

          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th> <th></th>
            <th>Total</th>
            <th>
              {new Intl.NumberFormat('us-US', {
                style: 'currency',
                currency: 'usd',
              }).format(item.actualBillCost['$numberDecimal'])}
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th> <th></th>
            <th>Discount rate</th>
            <th>
              {new Intl.NumberFormat('us-US', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(
                item.customer.discountRate[item.items[0].orderedWebsite][
                  '$numberDecimal'
                ]
              )}
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th> <th></th>
            <th></th>
            <th>Tiền tính khách</th>
            <th>
              {new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
              }).format(item.actualChargeCustomer['$numberDecimal'])}
            </th>
          </tr>
        </thead>
      </Table>
    </MainContent>
  );
};
export default SingleItem;
