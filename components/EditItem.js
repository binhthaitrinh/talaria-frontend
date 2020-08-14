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

const statusList = [
  'not-yet-ordered',
  'ordered',
  'on-the-way-to-warehouse',
  'on-the-way-to-viet-nam',
  'arrived-at-viet-nam',
  'done',
  'returning',
  'returned',
];

const EditItem = ({ item }) => {
  const [name, setName] = useState(item.name || '');
  const [pricePerItem, setPrice] = useState(
    parseFloat(item.pricePerItem['$numberDecimal'])
  );
  const [quantity, setQuantity] = useState(parseInt(item.quantity));
  const [tax, setTax] = useState(parseFloat(item.tax['$numberDecimal']));
  const [usShippingFee, setUsShippingFee] = useState(
    parseFloat(item.usShippingFee['$numberDecimal'])
  );
  const [estimatedWeight, setEstimatedWeight] = useState(
    parseFloat(item.estimatedWeight['$numberDecimal'])
  );

  const [actualWeight, setActualWeight] = useState(
    parseFloat(item.actualWeight['$numberDecimal'])
  );

  const [orderedWebsite, setOrderedWebsite] = useState(item.orderedWebsite);
  const [link, setLink] = useState(item.link);
  const [trackingLink, setTrackingLink] = useState(item.trackingLink || '');
  const [invoiceLink, setInvoiceLink] = useState(item.invoiceLink || '');
  const [itemType, setItemType] = useState(item.itemType || '');
  const [notes, setNotes] = useState(item.notes || '');
  const [orderDate, setOrderDate] = useState(
    item.orderDate ? item.orderDate.slice(0, 10) : ''
  );
  const [arrivedAtWarehouseDate, setArrivedAtWarehouseDate] = useState(
    item.arrivedAtWarehouseDate ? item.arrivedAtWarehouseDate.slice(0, 10) : ''
  );
  const [shippingToVnDate, setShippingToVnDate] = useState(
    item.shippingToVnDate ? item.shippingToVnDate.slice(0, 10) : ''
  );
  const [arrivedAtVnDate, setArrivedAtVnDate] = useState(
    item.arrivedAtVnDate ? item.arrivedAtVnDate.slice(0, 10) : ''
  );
  const [customerRcvedDate, setCustomerRcvedDate] = useState(
    item.customerRcvedDate ? item.customerRcvedDate.slice(0, 10) : ''
  );
  const [returnPkgDate, setReturnPkgDate] = useState(
    item.returnPkgDate ? item.returnPkgDate.slice(0, 10) : ''
  );
  const [returnPkgArvlDate, setReturnPkgArvlDate] = useState(
    item.returnPkgArvlDate ? item.returnPkgArvlDate.slice(0, 10) : ''
  );

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
        `${process.env.BASE_URL}/items/${item.id}`,
        formData,
        config
      );

      setLoading(false);
      setMessage('success');
      setAlertType('success');
      setShowNoti(true);
      setTimeout(() => {
        setShowNoti(false);
        Router.push(`/items/${item.id}`);
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
            pricePerItem,
            quantity,
            tax,
            usShippingFee,
            estimatedWeight,
            actualWeight,
            orderedWebsite,
            link,
            trackingLink,
            invoiceLink,
            itemType: itemType !== '' ? itemType : null,
            orderDate,
            arrivedAtWarehouseDate,
            shippingToVnDate,
            arrivedAtVnDate,
            customerRcvedDate,
            returnPkgDate,
            returnPkgArvlDate,
            status,
            notes,
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
            <FormLabel htmlFor="pricePerItem">Giá bán lẻ</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter price..."
              id="pricePerItem"
              name="pricePerItem"
              value={pricePerItem}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="quantity">Số lượng</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter quantity..."
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
            <FormLabel htmlFor="usShippingFee">Us ShippingFee</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter us shipping fee..."
              id="usShippingFee"
              value={usShippingFee}
              onChange={(e) => setUsShippingFee(e.target.value)}
            />
          </FormGroup>{' '}
          <FormGroup>
            <FormLabel htmlFor="estimatedWeight">Cân nặng ước tính</FormLabel>
            <FormInput
              type="number"
              placeholder="Cân nặng ước tính..."
              id="estimatedWeight"
              value={estimatedWeight}
              name="estimatedWeight"
              onChange={(e) => setEstimatedWeight(e.target.value)}
            />
          </FormGroup>{' '}
          <FormGroup>
            <FormLabel htmlFor="actualWeight">Cân nặng thực tế</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter actual weight..."
              id="actualWeight"
              value={actualWeight}
              onChange={(e) => setActualWeight(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="orderedWebsite">Order Website</FormLabel>
            <Select
              value={orderedWebsite}
              onChange={(e) => setOrderedWebsite(e.target.value)}
              id="orderedWebsite"
              name="orderedWebsite"
            >
              <option value="">Choose</option>
              <option value="amazon">Amazon</option>
              <option value="ebay">Ebay</option>
              <option value="sephora">Sephora</option>
              <option value="bestbuy">Best Buy</option>
              <option value="costco">Costco</option>
              <option value="others">Others</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="link">Link sản phẩm</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter product link..."
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="trackingLink">Link tracking</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter tracking link..."
              id="trackingLink"
              name="trackingLink"
              value={trackingLink}
              onChange={(e) => setTrackingLink(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="invoiceLink">Invoice Link</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter invoice..."
              id="invoiceLink"
              name="invoiceLink"
              value={invoiceLink}
              onChange={(e) => setInvoiceLink(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="itemType">Loại hàng</FormLabel>
            <Select
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              id="itemType"
              name="itemType"
            >
              <option value="">Choose</option>
              <option value="toys">Toys</option>
              <option value="electronics">Electronics</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="accessories">Accessories</option>
              <option value="others">Others</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="orderDate">Ngày order</FormLabel>
            <FormInput
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              id="orderDate"
              name="orderDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="arrivedAtWarehouseDate">Ngày về kho</FormLabel>
            <FormInput
              type="date"
              value={arrivedAtWarehouseDate}
              onChange={(e) => setArrivedAtWarehouseDate(e.target.value)}
              id="arrivedAtWarehouseDate"
              name="arrivedAtWarehouseDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="shippingToVnDate">Ngày Ship về VN</FormLabel>
            <FormInput
              type="date"
              value={shippingToVnDate}
              onChange={(e) => setShippingToVnDate(e.target.value)}
              id="shippingToVnDate"
              name="shippingToVnDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="arrivedAtVnDate">Ngày đến VN</FormLabel>
            <FormInput
              type="date"
              value={arrivedAtVnDate}
              onChange={(e) => setArrivedAtVnDate(e.target.value)}
              id="aririvedAarrivedAtVnDate"
              name="aririvedAarrivedAtVnDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="customerRcvedDate">
              Ngày khách nhận hàng
            </FormLabel>
            <FormInput
              type="date"
              value={customerRcvedDate}
              onChange={(e) => setCustomerRcvedDate(e.target.value)}
              id="customerRcvedDate"
              name="customerRcvedDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="returnPkgDate">Ngày return hàng</FormLabel>
            <FormInput
              type="date"
              value={returnPkgDate}
              onChange={(e) => setReturnPkgDate(e.target.value)}
              id="returnPkgDate"
              name="returnPkgDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="returnPkgArvlDate">
              Ngày hàng return dến nơi
            </FormLabel>
            <FormInput
              type="date"
              value={returnPkgArvlDate}
              onChange={(e) => setReturnPkgArvlDate(e.target.value)}
              id="returnPkgArvlDate"
              name="returnPkgArvlDate"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter notes..."
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="status">Tình trạng</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Choose</option>
              {statusList.map((stat, index) => (
                <option value={stat} key={index}>
                  {stat.split('-').join(' ')}
                </option>
              ))}
            </Select>
          </FormGroup>
        </div>

        <SubmitBtn disabled={loading ? true : false}>
          {loading ? <LoadingBtn /> : 'Update'}
        </SubmitBtn>
      </Form>
    </MainContent>
  );
};

export default EditItem;
