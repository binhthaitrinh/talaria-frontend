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
import BtnText from './styles/BtnText';

import StickerBtn from './styles/StickerBtn';

const SingleGiftCard = (props) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/giftcards/${props.id}`
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
            {new Date(item.createdAt).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Account</DetailItemTitle>
          <DetailItemInfo>
            <Link href={`/accounts/${item.accountID._id}`} passHref>
              <BtnText>{item.accountID.loginID}</BtnText>
            </Link>
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Webiste</DetailItemTitle>
          <DetailItemInfo>{item.giftCardType}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Price in BTC</DetailItemTitle>
          <DetailItemInfo>{item.priceInBTC['$numberDecimal']}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Fee in BTC</DetailItemTitle>
          <DetailItemInfo>{item.feeBTC['$numberDecimal']}</DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Value</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.giftCardValue)}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Tỷ giá</DetailItemTitle>
          <DetailItemInfo>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(item.btcUsdRate['$numberDecimal'])}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Hard card</DetailItemTitle>
          <DetailItemInfo>
            {item.hardCardPic ? item.hardCardPic : '---'}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Receipt </DetailItemTitle>
          <DetailItemInfo>
            {item.receiptPic ? item.receiptPic : '---'}
          </DetailItemInfo>
        </DetailItem>

        <DetailItem>
          <DetailItemTitle>Ghi chú</DetailItemTitle>
          <DetailItemInfo>{item.notes ? item.notes : '---'}</DetailItemInfo>
        </DetailItem>
      </DetailList>
    </MainContent>
  );
};
export default SingleGiftCard;
