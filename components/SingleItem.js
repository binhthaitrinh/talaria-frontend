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

const SingleItem = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/items/${props.id}`
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
          <DetailItemTitle>Mã sản phẩm</DetailItemTitle>
          <DetailItemInfo>{item._id}</DetailItemInfo>
        </DetailItem>
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
            }).format(item.pricePerItem['$numberDecimal'])}
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
            {item.actualCost['$numberDecimal'] > 0
              ? new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.actualCost['$numberDecimal'])
              : '---'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Cân nặng ước tính</DetailItemTitle>
          <DetailItemInfo>
            {parseFloat(item.estimatedWeight['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Cân nặng thực tế</DetailItemTitle>
          <DetailItemInfo>
            {parseFloat(item.actualWeight['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Order Website</DetailItemTitle>
          <DetailItemInfo>{item.orderedWebsite}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Link sản phẩm</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            <BtnText
              style={{ marginBottom: '0' }}
              href={`${item.link.startsWith('http') ? '' : 'http://'}${
                item.link
              }`}
            >
              Click here
            </BtnText>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tracking Link</DetailItemTitle>
          <DetailItemInfo>
            {item.trackingLink ? (
              <BtnText
                style={{ marginBottom: '0' }}
                href={`${
                  item.trackingLink.startsWith('http') ? '' : 'http://'
                }${item.trackingLink}`}
              >
                Click here
              </BtnText>
            ) : (
              'Not available'
            )}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Order account</DetailItemTitle>
          <DetailItemInfo>
            {item.orderAccount ? item.orderAccount.loginID : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Invoice</DetailItemTitle>
          <DetailItemInfo>
            {item.invoiceLink ? <a>item.invoiceLink</a> : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày order</DetailItemTitle>
          <DetailItemInfo>
            {item.arrivedAtWarehouseDate
              ? new Date(item.orderDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'utc',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày đến kho</DetailItemTitle>
          <DetailItemInfo>
            {item.arrivedAtWarehouseDate
              ? new Date(item.arrivedAtWarehouseDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'utc',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày Ship đi VN</DetailItemTitle>
          <DetailItemInfo>
            {item.shippingToVnDate
              ? new Date(item.shippingToVnDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'utc',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày ship đến VN</DetailItemTitle>
          <DetailItemInfo>
            {item.arrivedAtVnDate
              ? new Date(item.arrivedAtVnDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'utc',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày khách nhận hàng</DetailItemTitle>
          <DetailItemInfo>
            {item.customerRcvedDate
              ? new Date(item.customerRcvedDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  timeZone: 'utc',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày Return hàng</DetailItemTitle>
          <DetailItemInfo>
            {' '}
            {item.returnPkgDate
              ? new Date(item.returnPkgDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Ngày Return tới nơi</DetailItemTitle>
          <DetailItemInfo>
            {item.returnPkgArvlDate
              ? new Date(item.returnPkgArvlDate).toLocaleString('en-us', {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                })
              : 'Not available'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Loại hàng</DetailItemTitle>
          <DetailItemInfo>
            {item.itemType ? item.itemType : 'Not available'}
          </DetailItemInfo>
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
