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

const NewAccount = (props) => {
  const [loginID, setLoginID] = useState('');
  const [balance, setBalance] = useState(0);
  const [accountWebsite, setAccountWebsite] = useState('');
  const [accountType, setAccountType] = useState('');
  const [notes, setNotes] = useState('');

  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const submitForm = async (formData) => {
    setLoading(true);
    console.log(formData.items);
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/accounts`,
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
        Router.push(`/accounts/${res.data.data.data._id}`);
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
            loginID,
            balance,
            accountType,
            accountWebsite,
            notes,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="loginID">Login ID</FormLabel>
            <FormInput
              type="text"
              placeholder="Login ID..."
              id="loginID"
              name="loginID"
              onChange={(e) => setLoginID(e.target.value)}
              value={loginID}
              required={true}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="balance">Số Dư</FormLabel>
            <FormInput
              type="number"
              step="0.00000001"
              placeholder="Balance..."
              id="balance"
              name="balance"
              onChange={(e) => setBalance(e.target.value)}
              value={balance}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="accountWebsite">Account Website</FormLabel>
            <Select
              value={accountWebsite}
              onChange={(e) => setAccountWebsite(e.target.value)}
              id="accountWebsite"
              name="accountWebsite"
            >
              <option value="">Choose one</option>
              <option value="amazon">Amazon</option>
              <option value="sephora">Sephora</option>
              <option value="bestbuy">Best Buy</option>
              <option value="ebay">Ebay</option>
              <option value="costco">Costco</option>
              <option value="walmart">Walmart</option>
              <option value="others">Others</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="accountType">Loại tài khoản</FormLabel>
            <Select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              id="accountType"
              name="accountType"
            >
              <option value="">Choose</option>
              <option value="owned">Sở hữu</option>
              <option value="borrowed">Mượn</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Ghi chú..."
              id="notes"
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </FormGroup>
        </div>
        <div></div>
        <div>
          <SubmitBtn disabled={loading ? true : false}>
            {loading ? <LoadingBtn /> : 'Submit'}
          </SubmitBtn>
        </div>
      </Form>
    </MainContent>
  );
};

export default NewAccount;
