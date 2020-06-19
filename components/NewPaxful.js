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

const EditItem = () => {
  const [btcAmount, setBtcAmount] = useState('');
  const [usdBtcRate, setUsdBtcRate] = useState('');
  const [withdrawFee, setWithdrawFee] = useState('');
  const [buyer, setBuyer] = useState('');
  const [pocketMoney, setPocketMoney] = useState(true);
  const [moneySpent, setMoneySpent] = useState('');
  const [currency, setCurrency] = useState('vnd');
  const [vndUsdRate, setVndUsdRate] = useState(23700);
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

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/paxfuls`,
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
        Router.push(`/paxfuls`);
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
          console.log(currency);
          console.log(pocketMoney);
          submitForm({
            btcAmount,
            btcUsdRate: usdBtcRate,
            withdrawFee,
            buyer,
            pocketMoney,
            moneySpent: {
              amount: moneySpent,
              currency,
            },
            transactionType: 'inflow',
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="btcAmount">BTC amount</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter BTC amount..."
              id="btcAmount"
              name="btcAmount"
              onChange={(e) => setBtcAmount(e.target.value)}
              value={btcAmount}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="withdrawFee">BTC withdraw Fee</FormLabel>
            <FormInput
              type="number"
              placeholder="BTC withdrawal fee..."
              id="withdrawFee"
              name="withdrawFee"
              onChange={(e) => setWithdrawFee(e.target.value)}
              value={withdrawFee}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="usdBtcRate">USD/BTC rate</FormLabel>
            <FormInput
              type="number"
              placeholder="USD/BTC rate..."
              id="usdBtcRate"
              name="usdBtcRate"
              onChange={(e) => setUsdBtcRate(e.target.value)}
              value={usdBtcRate}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="usdBtcRate">VND/USD rate</FormLabel>
            <FormInput
              type="number"
              placeholder="VND/USD rate..."
              id="vndUsdRate"
              name="vndUsdRate"
              onChange={(e) => setVndUsdRate(e.target.value)}
              value={vndUsdRate}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="buyer">Buyer</FormLabel>
            <FormInput
              type="text"
              placeholder="Who bought it?..."
              id="buyer"
              name="buyer"
              onChange={(e) => setBuyer(e.target.value)}
              value={buyer}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="pocketMoney">Pocket money?</FormLabel>
            <FormInput
              type="checkbox"
              placeholder="Enter BTC amount..."
              id="pocketMoney"
              name="pocketMoney"
              onChange={(e) => setPocketMoney(e.target.checked)}
              checked={pocketMoney}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="name">Money spent</FormLabel>
            <div style={{ display: 'flex' }}>
              <FormInput
                type="number"
                placeholder="Money spent to buy..."
                id="btcAmount"
                name="btcAmount"
                onChange={(e) => setMoneySpent(e.target.value)}
                value={moneySpent}
              />
              <select
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                value={currency}
                style={{
                  backgroundColor: '#ededed',
                  marginTop: '0.5rem',
                  borderRadius: '4px',
                }}
              >
                <option value="usd">USD</option>
                <option value="vnd">VND</option>
              </select>
            </div>
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
