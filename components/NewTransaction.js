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
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState('');
  const [transactionType, setTransactionType] = useState('inflow');
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
        `${process.env.BASE_URL}/transactions`,
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
        Router.push(`/transactions`);
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

          submitForm({
            amount,
            transactionType,
            notes,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="amount">Amount</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter amount..."
              id="amount"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="amount">Transaction Type</FormLabel>
            <select onChange={(e) => setTransactionType(e.target.value)}>
              <option value="inflow">Inflow</option>
              <option value="outflow">Outflow</option>
            </select>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="notes">Notes</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter  notes..."
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
