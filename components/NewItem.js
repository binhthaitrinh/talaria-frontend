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
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [tax, setTax] = useState(0);
  const [usShippingFee, setUsShippingFee] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [orderedWebsite, setOrderedWebsite] = useState('amazon');
  const [warehouse, setWarehouse] = useState('');
  const [notes, setNotes] = useState('');

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
        Router.push(`/items/${res.data.data.data._id}`);
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
            tax,
            quantity,
            usShippingFee,
            estimatedWeight,
            orderedWebsite,
            notes,
            warehouse,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="link">Link sản phẩm</FormLabel>
            <FormInput
              type="text"
              placeholder="Link sản phẩm..."
              id="link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="name">Tên sản phẩm</FormLabel>
            <FormInput
              type="text"
              placeholder="Tên sản phẩm..."
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="pricePerItem">Giá bán lẻ</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter price..."
              id="pricePerItem"
              name="pricePerItem"
              value={pricePerItem}
              onChange={(e) => setPrice(e.target.value)}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="quantity">Số lượng</FormLabel>
            <FormInput
              type="number"
              placeholder="Số lượng..."
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="tax">Thuế</FormLabel>
            <FormInput
              type="number"
              placeholder="Thuế..."
              id="tax"
              name="tax"
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="usShippingFee">Ship nội địa Mỹ</FormLabel>
            <FormInput
              type="number"
              placeholder="Ship nội địa Mỹ..."
              id="usShippingFee"
              name="usShippingFee"
              value={usShippingFee}
              onChange={(e) => setUsShippingFee(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="estimatedWeight">Cân nặng ước tính</FormLabel>
            <FormInput
              type="number"
              placeholder="Cân nặng ước tính..."
              id="estimatedWeight"
              name="estimatedWeight"
              value={estimatedWeight}
              onChange={(e) => setEstimatedWeight(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="orderedWebsite">Order Website</FormLabel>
            {/* <FormInput
              type="text"
              placeholder="Enter price..."
              id="orderedWebsite"
              value={orderedWebsite}
              onChange={(e) => setOrderedWebsite(e.target.value)}
            /> */}

            <Select
              onChange={(e) => setOrderedWebsite(e.target.value)}
              value={orderedWebsite}
              style={{ width: '22rem' }}
            >
              <option value="amazon">Amazon</option>
              <option value="sephora">Sephora</option>
              <option value="ebay">Ebay</option>
              <option value="bestbuy">Best Buy</option>
              <option value="costco">Costco</option>
              <option value="walmart">Walmart</option>
              <option value="assisting">Mua hộ</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="warehouse">Ship về đâu?</FormLabel>
            <Select
              onChange={(e) => setWarehouse(e.target.value)}
              value={warehouse}
              style={{ width: '22rem' }}
              id="warehouse"
              name="warehouse"
              required={true}
            >
              <option value="">Please choose one</option>
              <option value="unihan">UNIHAN</option>
              <option value="unisgn">UNISGN</option>
              <option value="pacific">PACIFIC</option>
              <option value="others">Others</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Ghi chú."
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
        </div>

        <SubmitBtn disabled={loading ? true : false}>
          {loading ? <LoadingBtn /> : 'Create'}
        </SubmitBtn>
      </Form>
    </MainContent>
  );
};

export default EditItem;
