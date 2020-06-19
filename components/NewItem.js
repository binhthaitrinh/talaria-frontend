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
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [tax, setTax] = useState('');
  const [taxForCustomer, setTaxForCustomer] = useState('');
  const [usShippingFee, setUsShippingFee] = useState('');
  const [quantity, setQuantity] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [orderedWebsite, setOrderedWebsite] = useState('');
  const [orderAccount, setOrderAccount] = useState('');
  const [pricePerItem, setPrice] = useState('');
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
        `${process.env.BASE_URL}/items/`,
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
        Router.push(`/items`);
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
          console.log(name);
          submitForm({
            name,
            pricePerItem,
            link,
            trackingLink,
            tax,
            taxForCustomer,
            quantity,
            usShippingFee,
            estimatedWeight,
            orderedWebsite,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="name">Product name</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter product name..."
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="name">Product Link</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter product link..."
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="pricePerItem">Price per item</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter price..."
              id="pricePerItem"
              value={pricePerItem}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="tax">Tax</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter tax..."
              id="tax"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="pricePerItem">
              Enter tax to charge customer
            </FormLabel>
            <FormInput
              type="text"
              placeholder="Enter price..."
              id="taxForCustomer"
              value={taxForCustomer}
              onChange={(e) => setTaxForCustomer(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="usShippingFee">usShippingFee</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter price..."
              id="usShippingFee"
              value={usShippingFee}
              onChange={(e) => setUsShippingFee(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="quantity">quantity</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter price..."
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="estimatedWeight">Estimated weight</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter price..."
              id="estimatedWeight"
              value={estimatedWeight}
              onChange={(e) => setEstimatedWeight(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="orderedWebsite">order Website</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter price..."
              id="orderedWebsite"
              value={orderedWebsite}
              onChange={(e) => setOrderedWebsite(e.target.value)}
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
