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

const EditItem = ({ item }) => {
  const [name, setName] = useState(item.customerName);
  const [phoneNo, setPhoneNo] = useState(item.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(item.dateOfBirth);
  const [address, setAddress] = useState(
    item.address.length >= 1 ? item.address[0].address1 : ''
  );
  const [city, setCity] = useState(
    item.address.length >= 1 ? item.address[0].city : ''
  );
  const [customerType, setCustomerType] = useState(item.customerType);
  const [discountRate, setDiscountRate] = useState(
    item.discountRate['$numberDecimal']
  );

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
        `http://localhost:4444/api/v1/customers/${item._id}`,
        formData,
        config
      );

      setLoading(false);
      setMessage('success');
      setAlertType('success');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        Router.push(`/customers/${item._id}`);
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
            name,
            dateOfBirth,
            phoneNumber: phoneNo,
            address: {
              address1: address,
              city,
            },
            customerType,
            discountRate,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="name">Tên khách hàng</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer name..."
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="dateOfBirth">Ngày sinh</FormLabel>
            <FormInput
              type="date"
              placeholder="Enter customer dateOfBirth..."
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth.slice(0, 10)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="phoneNo">Số điện thoại</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer phoneNo..."
              id="phoneNo"
              name="phoneNo"
              onChange={(e) => setPhoneNo(e.target.value)}
              value={phoneNo}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="address">Địa chỉ</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer address..."
              id="address"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="city">Thành phố</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer city..."
              id="city"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="customerType">Loại khách hàng</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer customerType..."
              id="customerType"
              name="customerType"
              onChange={(e) => setCustomerType(e.target.value)}
              value={customerType}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="discountRate">Discount Rate</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer discountRate..."
              id="discountRate"
              name="discountRate"
              onChange={(e) => setDiscountRate(e.target.value)}
              value={discountRate}
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
