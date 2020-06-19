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

const EditItem = (props) => {
  const [items, setItems] = useState(props.items ? props.items.split(',') : []);
  const [customerName, setCustomerName] = useState('');
  const [vndUsdRate, setVndUsdRate] = useState(23500);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

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
        const cusRes = await axios.get(`${process.env.BASE_URL}/customers`);
        console.log(cusRes.data.data.data);
        setCustomers(cusRes.data.data.data);
        setFormLoading(false);
      } catch (err) {
        console.log(err.response);
      }
    }

    fetchData();
  }, []);

  const submitForm = async (formData) => {
    setLoading(true);
    console.log(formData.items);
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/bills`,
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
        Router.push(`/bills`);
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

  return formLoading ? (
    <Loader />
  ) : (
    <MainContent>
      {showNoti ? <Noti message={message} type={alertType} /> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(currency);
          // console.log(pocketMoney);
          submitForm({
            customer: customerName,
            items: items,
            vndUsdRate,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="items">Item Ids</FormLabel>
            <FormInput
              readOnly
              type="text"
              placeholder="Enter customer items..."
              id="items"
              name="items"
              onChange={(e) => setItems(e.target.value)}
              value={items}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="name">Tên khách hàng</FormLabel>
            <select onChange={(e) => setCustomerName(e.target.value)}>
              {customers.map((customer) => (
                <option value={customer._id}>{customer.customerName}</option>
              ))}
            </select>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="vnsUsdRate">Tỉ giá</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer vnsUsdRate..."
              id="vnsUsdRate"
              name="vnsUsdRate"
              onChange={(e) => setVndUsdRate(e.target.value)}
              value={vndUsdRate}
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
