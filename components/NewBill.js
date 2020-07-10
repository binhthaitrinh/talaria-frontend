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
import DetailItem from './styles/DetailItem';

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

const EditItem = (props) => {
  const [items, setItems] = useState(props.items ? props.items.split(',') : []);

  const [vndUsdRate, setVndUsdRate] = useState(23500);
  const [customers, setCustomers] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [affiliate, setAffiliate] = useState('');

  const [tax, setTax] = useState(0);
  const [taxForCustomer, setTaxForCustomer] = useState(0.0875);
  const [usShippingFee, setUsShippingFee] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [estimatedWeight, setEstimatedWeight] = useState(0);
  const [orderedWebsite, setOrderedWebsite] = useState('amazon');
  const [pricePerItem, setPrice] = useState(0);

  const [custName, setCustName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [discountRate, setDiscountRate] = useState('');

  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const affiRes = await axios.get(`${process.env.BASE_URL}/affiliates`);

        console.log(affiRes.data.data.data);

        setAffiliates(affiRes.data.data.data);

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
      {showAddCustomer && (
        <Modal setShowModal={setShowAddCustomer}>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const res = await axios.post(
                  `${process.env.BASE_URL}/customers`,
                  {
                    customerName: custName,
                    dateOfBirth,
                    phoneNumber: phoneNo,
                    address: {
                      address1: address,
                      city,
                    },
                    customerType,
                    discountRate,
                  },
                  config
                );

                setCustomerName(res.data.data.data._id);
                setCustomers((customers) => [...customers, res.data.data.data]);
                setCustName('');
                setDateOfBirth('');
                setAddress('');
                setPhoneNo('');
                setCity('');
                setCustomerType('');
                setDiscountRate('');

                setMessage('Customer added');
                setAlertType('success');
                setShowNoti(true);
                setShowAddCustomer(false);
                setTimeout(() => {
                  setShowNoti(false);
                  setMessage('');
                  setAlertType('');
                }, 1500);
              } catch (err) {
                setMessage(err.response.data.message);
                setAlertType('danger');
                setShowNoti(true);
                setTimeout(() => {
                  setShowNoti(false);
                  setMessage('');
                  setAlertType('');
                }, 1500);
              }
            }}
          >
            <FormGroup>
              <FormLabel htmlFor="name">Tên khách hàng</FormLabel>
              <FormInput
                type="text"
                placeholder="Enter customer name..."
                id="name"
                name="name"
                onChange={(e) => setCustName(e.target.value)}
                value={custName}
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
            <SubmitBtn>Submit</SubmitBtn>
          </Form>
        </Modal>
      )}
      {showAddItem && (
        <Modal setShowModal={setShowAddItem}>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await axios.post(
                  `${process.env.BASE_URL}/items`,

                  {
                    name,
                    link,
                    pricePerItem: parseFloat(pricePerItem),
                    tax,

                    usShippingFee,
                    quantity,
                    estimatedWeight,
                    orderedWebsite,
                  },
                  config
                );
                setItems((items) => [
                  ...items,
                  {
                    id: res.data.data.data._id,
                    name: res.data.data.data.name,
                    quantity: res.data.data.data.quantity,
                  },
                ]);
                setName('');
                setLink('');
                setPrice(0);
                setTax(0);
                setUsShippingFee(0);
                setQuantity(1);
                setEstimatedWeight(0);
                setMessage('Item added');
                setAlertType('success');
                setShowNoti(true);
                setShowAddItem(false);
                setTimeout(() => {
                  setShowNoti(false);
                  setMessage('');
                  setAlertType('');
                }, 1500);
              } catch (err) {
                setMessage(err.response.data.message);
                setAlertType('danger');
                setShowNoti(true);
                setTimeout(() => {
                  setShowNoti(false);
                  setMessage('');
                  setAlertType('');
                }, 1500);
              }
            }}
          >
            <FormGroup>
              <FormLabel htmlFor="name">Tên sản phẩm</FormLabel>
              <FormInput
                type="text"
                placeholder="Tên sản phẩm..."
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="link">Link sản phẩm</FormLabel>
              <FormInput
                type="text"
                placeholder="Link sản phẩm..."
                id="link"
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="pricePerItem">Giá bán lẻ</FormLabel>
              <FormInput
                type="number"
                placeholder="Giá bán lẻ..."
                id="pricePerItem"
                name="pricePerItem"
                value={pricePerItem}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>{' '}
            <FormGroup>
              <FormLabel htmlFor="quantity">Số lượng</FormLabel>
              <FormInput
                type="number"
                placeholder="Số lượng..."
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
              <FormLabel htmlFor="usShippingFee">Giá ship nội bộ Mỹ</FormLabel>
              <FormInput
                type="number"
                placeholder="Giá ship nội bộ Mỹ..."
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
              <Select
                onChange={(e) => setOrderedWebsite(e.target.value)}
                value={orderedWebsite}
                name="orderWebiste"
                id="orderWebsite"
              >
                <option value="amazon">Amazon</option>
                <option value="sephora">Sephora</option>
                <option value="ebay">Ebay</option>
                <option value="bestbuy">Best Buy</option>
              </Select>
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
            items: items.map((item) => item.id),
            vndUsdRate,
            affiliate,
            taxForCustomer,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="items">Item Ids</FormLabel>
            {items.length === 0 ? (
              <p>Wow. Such Empty!</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <DetailItem key={item._id}>
                    {item.quantity} x {item.name}{' '}
                    <InlineBtn
                      onClick={(e) => {
                        e.preventDefault();
                        setItems((items) => {
                          return items.filter((elm) => elm.id != item.id);
                        });
                      }}
                    >
                      x
                    </InlineBtn>
                  </DetailItem>
                ))}
              </ul>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="name">Tên khách hàng</FormLabel>
            <Select
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
            >
              <option value="">Choose a customer</option>
              {customers.map((customer) => (
                <option value={customer._id}>{customer.customerName}</option>
              ))}
            </Select>
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

          <FormGroup>
            <FormLabel htmlFor="name">Cộng tác viên</FormLabel>
            {affiliates.length > 0 ? (
              <Select
                onChange={(e) => setAffiliate(e.target.value)}
                value={affiliate}
              >
                <option value="">Choose an affiliate</option>
                {affiliates.map((aff) => (
                  <option value={aff._id} key={aff._id}>
                    {aff.name}
                  </option>
                ))}
              </Select>
            ) : null}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="taxForCustomer">Thuế tính cho khách</FormLabel>
            <FormInput
              type="number"
              placeholder="Thuế tính cho khách..."
              id="taxForCustomer"
              name="taxForCustomer"
              onChange={(e) => setTaxForCustomer(e.target.value)}
              value={taxForCustomer}
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
          <BtnGrey
            style={{ padding: '1.5rem 2rem', marginLeft: '2rem' }}
            onClick={(e) => {
              e.preventDefault();
              setShowAddCustomer(true);
            }}
          >
            Add customer
          </BtnGrey>
        </div>
      </Form>
    </MainContent>
  );
};

export default EditItem;
