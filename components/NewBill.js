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

const EditItem = (props) => {
  const [items, setItems] = useState(props.items ? props.items.split(',') : []);
  const [customerName, setCustomerName] = useState('');
  const [vndUsdRate, setVndUsdRate] = useState(23500);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [trackingLink, setTrackingLink] = useState('');
  const [tax, setTax] = useState('');
  const [taxForCustomer, setTaxForCustomer] = useState(0.0875);
  const [usShippingFee, setUsShippingFee] = useState('');
  const [quantity, setQuantity] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [orderedWebsite, setOrderedWebsite] = useState('amazon');
  const [orderAccount, setOrderAccount] = useState('');
  const [pricePerItem, setPrice] = useState('');

  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);

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
      {showAddItem && (
        <Modal setShowModal={setShowAddItem}>
          <Form>
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
                type="number"
                placeholder="Enter price..."
                id="pricePerItem"
                value={pricePerItem}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="tax">Tax</FormLabel>
              <FormInput
                type="number"
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
                type="number"
                placeholder="Enter price..."
                id="taxForCustomer"
                value={taxForCustomer}
                onChange={(e) => setTaxForCustomer(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="usShippingFee">usShippingFee</FormLabel>
              <FormInput
                type="number"
                placeholder="Enter price..."
                id="usShippingFee"
                value={usShippingFee}
                onChange={(e) => setUsShippingFee(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="quantity">quantity</FormLabel>
              <FormInput
                type="number"
                placeholder="Enter price..."
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="estimatedWeight">Estimated weight</FormLabel>
              <FormInput
                type="number"
                placeholder="Enter price..."
                id="estimatedWeight"
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="orderedWebsite">order Website</FormLabel>
              <select onChange={(e) => setOrderedWebsite(e.target.value)}>
                <option value="amazon">Amazon</option>
                <option value="sephora">Sephora</option>
                <option value="ebay">Ebay</option>
                <option value="bestbuy">Best Buy</option>
              </select>
            </FormGroup>
            <SubmitBtn>Submit</SubmitBtn>
          </Form>
        </Modal>
      )}
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
              placeholder="Enter item ids..."
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
        <div></div>
        <div>
          <SubmitBtn disabled={loading ? true : false}>
            {loading ? <LoadingBtn /> : 'Submit'}
          </SubmitBtn>
          <BtnGrey
            style={{ padding: '1.5rem 2rem', marginLeft: '2rem' }}
            onClick={(e) => {
              e.preventDefault();
              setShowAddItem(true);
            }}
          >
            Add an item
          </BtnGrey>
        </div>
      </Form>
    </MainContent>
  );
};

export default EditItem;
