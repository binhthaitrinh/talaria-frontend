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
  const [giftCardType, setGiftCardType] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [accountID, setAccountID] = useState('');
  const [priceInBTC, setPriceInBTC] = useState(0);
  const [feeBTC, setFeeBTC] = useState(0);
  const [btcUsdRate, setBtcUsdRate] = useState(0);
  const [giftCardValue, setGiftCardValue] = useState(0);

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
        Router.push(`/giftcards/${res.data.data.data._id}`);
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
            giftCardValue,
            giftCardType,
            accountID,
            priceInBTC,
            feeBTC,
            btcUsdRate,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="name">Loại gift card</FormLabel>
            <Select
              value={giftCardType}
              onChange={(e) => setGiftCardType(e.target.value)}
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
            <FormLabel htmlFor="name">Tài khoản</FormLabel>
            {accounts.length > 0 ? (
              <Select
                value={accountID}
                onChange={(e) => setAccountID(e.target.value)}
              >
                <option value="">Choose</option>
                {accounts.map((acct) => (
                  <option key={acct._id} value={acct._id}>
                    {acct.loginID}
                  </option>
                ))}
              </Select>
            ) : null}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="priceInBTC">Giá BTC</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter priceInBTC..."
              id="priceInBTC"
              name="priceInBTC"
              onChange={(e) => setPriceInBTC(e.target.value)}
              value={priceInBTC}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="feeBTC">Phí rút BTC</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter feeBTC..."
              id="feeBTC"
              name="feeBTC"
              onChange={(e) => setFeeBTC(e.target.value)}
              value={feeBTC}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="btcUsdRate">Tỷ giá USD / BTC</FormLabel>
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
            <FormLabel htmlFor="giftCardValue">Mệnh giá gift card</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter giftCardValue..."
              id="giftCardValue"
              name="giftCardValue"
              onChange={(e) => setGiftCardValue(e.target.value)}
              value={giftCardValue}
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
