import React, { useState, useEffect } from 'react';
import MainContent from './styles/MainContent';
import Form from './styles/Form';
import FormGroup from './styles/FormGroup';
import FormInput from './styles/FormInput';
import FormLabel from './styles/FormLabel';
import SubmitBtn from './styles/SubmitBtn';
import axios from 'axios';
import LoadingBtn from './styles/LoadingBtn';
import Noti from './Noti';
import Router from 'next/router';
import Loader from './styles/Loader';
import Modal from './Modal';
import BtnGrey from './styles/BtnGrey';
import { Select } from './styles/FormComponent';
import styled from 'styled-components';
import DetailItem from './styles/DetailItem';

const InlineBtn = styled.button`
  padding: 0.4rem 0.8rem;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 5rem;
  border: none;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.danger};
    color: ${(props) => props.theme.offWhite};
  }
`;

const EditItem = (props) => {
  const [price, setPrice] = useState({ value: '', currency: 'btc' });
  const [fee, setFee] = useState({ value: 0, currency: 'btc' });
  const [giftCardValue, setGiftCardValue] = useState('');
  const [giftCardType, setGiftCardType] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [btcUsdRate, setBtcUsdRate] = useState('');
  const [usdVndRate, setUsdVndRate] = useState('');
  const [notes, setNotes] = useState('');

  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/accounts`);

        setAccounts(res.data.data.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }

    fetchData();
  }, []);

  const submitForm = async (formData) => {
    setLoading(true);
    console.log(formData.items);
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/giftcards`,
        formData,
        config
      );

      console.log('Done');
      setLoading(false);
      setMessage('success');
      setAlertType('success');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        Router.push(`/giftcards`);
        setMessage('');
        setAlertType('');
      }, 2000);
    } catch (err) {
      console.log(err.response.data.message);
      setMessage(err.response.data.message);
      setAlertType('danger');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        setMessage('');
        setAlertType('');
      }, 3000);

      setLoading(false);
    }
  };

  return (
    <MainContent>
      {showNoti ? <Noti message={message} type={alertType} /> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(currency);
          // console.log(pocketMoney);
          submitForm({
            giftCardType,
            giftCardValue: giftCardValue * 1,
            price: {
              value: price.value * 1,
              currency: price.currency,
            },
            fee: {
              value: fee.value * 1,
              currency: fee.currency,
            },
            fromAccount,
            toAccount,
            btcUsdRate: btcUsdRate * 1,
            usdVndRate: usdVndRate * 1,
            notes,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="giftCardType">Loại gift card</FormLabel>
            <Select
              value={giftCardType}
              onChange={(e) => setGiftCardType(e.target.value)}
              id="giftCardType"
              name="giftCardType"
            >
              <option value="">Choose</option>
              <option value="amazon">Amazon</option>
              <option value="sephora">Sephora</option>
              <option value="bestbuy">Best Buy</option>
              <option value="ebay">Ebay</option>
              <option value="costco">Costco</option>
              <option value="others">Others</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="giftCardValue">Mệnh giá gift card</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter giftCardValue..."
              id="giftCardValue"
              name="giftCardValue"
              onChange={(e) => setGiftCardValue(e.target.value)}
              value={giftCardValue}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="priceInBTC">Giá BTC</FormLabel>
            <div style={{ display: 'flex' }}>
              <FormInput
                type="number"
                placeholder="Enter priceInBTC..."
                step="0.00000001"
                id="priceInBTC"
                name="priceInBTC"
                onChange={(e) => setPrice({ ...price, value: e.target.value })}
                value={price.value}
                required={true}
              />
              <select
                onChange={(e) => {
                  setPrice({ ...price, currency: e.target.value });
                }}
                value={price.currency}
              >
                <option value="btc">BTC</option>
                <option value="vnd">VND</option>
              </select>
            </div>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="feeBTC">Phí rút BTC</FormLabel>
            <div style={{ display: 'flex' }}>
              <FormInput
                type="number"
                step="0.00000001"
                placeholder="Enter feeBTC..."
                id="feeBTC"
                name="feeBTC"
                onChange={(e) => setFee({ ...fee, value: e.target.value })}
                value={fee.value}
              />
              <select
                onChange={(e) => {
                  setFee({ ...fee, currency: e.target.value });
                }}
                value={fee.currency}
              >
                <option value="btc">BTC</option>
                <option value="vnd">VND</option>
              </select>
            </div>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="name">Mua từ tài khoản</FormLabel>
            {accounts.length > 0 ? (
              <Select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
              >
                <option value="">Choose</option>
                {accounts.map((acct) => (
                  <option key={acct._id} value={acct._id}>
                    {acct.loginID.slice(0, 10)}... - {acct.accountWebsite} -{' '}
                    {new Intl.NumberFormat(
                      acct.currency === 'usd' ? 'en-US' : 'de-DE',
                      {
                        style: 'currency',
                        currency: acct.currency,
                      }
                    ).format(acct.balance['$numberDecimal'])}
                  </option>
                ))}
              </Select>
            ) : null}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="btcUsdRate">Tài khoản</FormLabel>
            {accounts.length > 0 ? (
              <Select
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
              >
                <option value="">Choose</option>
                {accounts.map((acct) => (
                  <option key={acct._id} value={acct._id}>
                    {acct.loginID.slice(0, 10)}... - {acct.accountWebsite} -{' '}
                    {new Intl.NumberFormat(
                      acct.currency === 'usd' ? 'en-US' : 'de-DE',
                      {
                        style: 'currency',
                        currency: acct.currency,
                      }
                    ).format(acct.balance['$numberDecimal'])}
                  </option>
                ))}
              </Select>
            ) : null}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="btcUsdRate">Tỉ giá BTC/USD</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter btcUsdRate..."
              id="btcUsdRate"
              name="btcUsdRate"
              onChange={(e) => setBtcUsdRate(e.target.value)}
              value={btcUsdRate}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="usdVndRate">Tỉ giá USD/VND</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter usdVndRate..."
              id="usdVndRate"
              name="usdVndRate"
              onChange={(e) => setUsdVndRate(e.target.value)}
              value={usdVndRate}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter notes..."
              id="notes"
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </FormGroup>
        </div>
        <SubmitBtn disabled={loading ? true : false}>
          {loading ? <LoadingBtn /> : 'Submit'}
        </SubmitBtn>
      </Form>
    </MainContent>
  );
};

export default EditItem;
