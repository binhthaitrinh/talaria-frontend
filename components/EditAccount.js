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

const EditAccount = ({ item }) => {
  const [balance, setBalance] = useState(item.balance || 0);
  const [notes, setNotes] = useState(item.notes || '');
  const [status, setStatus] = useState(item.status || '');

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
      const res = await axios.patch(
        `${process.env.BASE_URL}/accounts/${item._id}`,
        formData,
        config
      );

      setLoading(false);
      setMessage('success');
      setAlertType('success');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        Router.push(`/accounts/${item._id}`);
        setMessage('');
        setAlertType('');
      }, 2000);
    } catch (err) {
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
          console.log(name);
          submitForm({
            balance,
            notes,
            status,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="balance">Số tiền dư</FormLabel>
            <FormInput
              type="number"
              placeholder="Số tiền dư..."
              id="balance"
              name="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              default="0.001"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Ghi chú..."
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="balance">Số tiền dư</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Chọn status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="disputing">Disputing</option>
            </Select>
          </FormGroup>
        </div>

        <SubmitBtn disabled={loading ? true : false}>
          {loading ? <LoadingBtn /> : 'Submit'}
        </SubmitBtn>
      </Form>
    </MainContent>
  );
};

export default EditAccount;
