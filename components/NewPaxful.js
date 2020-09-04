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
import { Select } from './styles/FormComponent';

const EditItem = () => {
  const [btcAmount, setBtcAmount] = useState('');
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [amountSpent, setAmountSpent] = useState({
    value: '',
    currency: 'vnd',
  });
  const [btcUsdRate, setBtcUsdRate] = useState(10500);
  const [usdVndRate, setUsdVndRate] = useState(23700);
  const [buyer, setBuyer] = useState('');
  const [pocketMoney, setPocketMoney] = useState(true);
  const [btcAccount, setBtcAccount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [notes, setNotes] = useState('');

  const [accounts, setAccounts] = useState([]);

  const [acctLoading, setAcctLoading] = useState(true);

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
      console.log(formData);
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
      console.log(err);
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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/accounts`);

        setAccounts(res.data.data.data);
        setAcctLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    !acctLoading && (
      <MainContent>
        {showNoti ? <Noti message={message} type={alertType} /> : null}
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            submitForm({
              btcAmount,
              withdrawFee,
              amountSpent,
              btcUsdRate: btcUsdRate || null,
              usdVndRate,
              buyer,
              fromAccount,
              btcAccount,
              pocketMoney,
              notes,
            });
          }}
        >
          <div className="form-content">
            <FormGroup>
              <FormLabel htmlFor="btcAmount">BTC amount</FormLabel>
              <FormInput
                type="number"
                step="0.00000001"
                placeholder="Enter BTC amount..."
                id="btcAmount"
                name="btcAmount"
                onChange={(e) => setBtcAmount(e.target.value)}
                value={btcAmount}
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="withdrawFee">BTC withdraw Fee</FormLabel>
              <FormInput
                type="number"
                step="0.00000001"
                placeholder="BTC withdrawal fee..."
                id="withdrawFee"
                name="withdrawFee"
                onChange={(e) => setWithdrawFee(e.target.value)}
                value={withdrawFee}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="amountSPent">Money spent</FormLabel>
              <div style={{ display: 'flex' }}>
                <FormInput
                  type="number"
                  step="0.00000001"
                  placeholder="Money spent to buy..."
                  id="amountSpent"
                  name="amountSpent"
                  onChange={(e) =>
                    setAmountSpent({ ...amountSpent, value: e.target.value })
                  }
                  value={amountSpent.value}
                  required={true}
                />
                <select
                  onChange={(e) => {
                    setAmountSpent({
                      ...amountSpent,
                      currency: e.target.value,
                    });
                  }}
                  value={amountSpent.currency}
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
            <FormGroup>
              <FormLabel htmlFor="btcUsdRate">BTC/USD rate</FormLabel>
              <FormInput
                type="number"
                step="0.1"
                placeholder="USD/BTC rate..."
                id="btcUsdRate"
                name="btcUsdRate"
                onChange={(e) => setBtcUsdRate(e.target.value)}
                value={btcUsdRate}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="usdVndRate">USD/VND rate</FormLabel>
              <FormInput
                type="number"
                step="0.1"
                placeholder="VND/USD rate..."
                id="usdVndRate"
                name="usdVndRate"
                onChange={(e) => setUsdVndRate(e.target.value)}
                value={usdVndRate}
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
              <FormLabel htmlFor="fromAccount">From Account</FormLabel>
              {accounts && (
                <Select
                  id="fromAccount"
                  name="fromAccount"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  required={true}
                >
                  <option value="">Choose one</option>
                  {accounts.map((acct) => (
                    <option key={acct._id} value={acct._id}>
                      {acct.accountWebsite} - {acct.loginID}
                    </option>
                  ))}
                </Select>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="toAccount">To Account</FormLabel>
              {accounts && (
                <Select
                  id="toAccount"
                  name="toAccount"
                  value={btcAccount}
                  onChange={(e) => setBtcAccount(e.target.value)}
                  required={true}
                >
                  <option value="">Choose one</option>
                  {accounts.map((acct) => (
                    <option key={acct._id} value={acct._id}>
                      {acct.accountWebsite} - {acct.loginID}
                    </option>
                  ))}
                </Select>
              )}
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
              <FormLabel htmlFor="notes">Notes</FormLabel>
              <FormInput
                type="text"
                placeholder="Notes..."
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
    )
  );
};

export default EditItem;
