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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/paxfuls/${props.id}`
        );

        console.log(res);
        setItem(res.data.data.data);
        console.log(res.data.data.data);
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
          <DetailItemTitle>Ngày</DetailItemTitle>
          <DetailItemInfo>{item.createdAt}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số lượng BTC</DetailItemTitle>
          <DetailItemInfo>{item.btcAmount['$numberDecimal']}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Phí giao dịch</DetailItemTitle>
          <DetailItemInfo>{item.withdrawFee['$numberDecimal']}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>BTC balance</DetailItemTitle>
          <DetailItemInfo>{item.totalBalance['$numberDecimal']}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Số tiền chi</DetailItemTitle>
          <DetailItemInfo>
            {item.moneySpent.amount
              ? item.moneySpent.amount['$numberDecimal']
              : 0}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tỉ giá USD/VND</DetailItemTitle>
          <DetailItemInfo>{item.usdVndRate['$numberDecimal']}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tỉ giá USD/BTC</DetailItemTitle>
          <DetailItemInfo>
            {item.btcUsdRate ? item.btcUsdRate['$numberDecimal'] : '---'}
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Người mua</DetailItemTitle>
          <DetailItemInfo>{item.buyer}</DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Tiền túi?</DetailItemTitle>
          <DetailItemInfo>
            <StickerBtn type={item.pocketMoney ? 'success' : 'danger'}>
              {item.pocketMoney ? 'Đúng' : 'Không'}
            </StickerBtn>
          </DetailItemInfo>
        </DetailItem>
        <DetailItem>
          <DetailItemTitle>Loại giao dịch</DetailItemTitle>
          <DetailItemInfo>
            <StickerBtn
              type={item.transactionType === 'inflow' ? 'success' : 'danger'}
            >
              {item.transactionType}
            </StickerBtn>
          </DetailItemInfo>
        </DetailItem>
      </DetailList>
    </MainContent>
  );
};
export default SingleItem;
