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
import Link from 'next/link';

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

  const [usdVndRate, setUsdVndRate] = useState(23500);
  const [customers, setCustomers] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [affiliate, setAffiliate] = useState('');
  const [tax, setTax] = useState(0);
  const [taxForCustomer, setTaxForCustomer] = useState(8.75);
  const [usShippingFee, setUsShippingFee] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [estimatedWeightPerItem, setEstimatedWeightPerItem] = useState(0);
  const [orderedWebsite, setOrderedWebsite] = useState('amazon');
  const [pricePerItem, setPrice] = useState(0);
  const [itemNotes, setItemNotes] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [bill, setBill] = useState({});
  const [shippingRateToVn, setShippingRateToVn] = useState({
    currency: 'usd',
    value: 12,
  });
  const [shippingExtraBase, setShippingExtraBase] = useState({
    unit: 'usd',
    value: 0,
  });
  const [itemType, setItemType] = useState('');

  const [commissionRateForAffiliate, setCommissionRateForAffiliate] = useState(
    ''
  );
  const [notes, setNotes] = useState('');

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

  const itemFormSubmit = async (formData) => {
    try {
      for (let el in formData) {
        if (formData[el] === '') {
          delete formData[el];
        }
      }
      const res = await axios.post(
        `${process.env.BASE_URL}/items`,
        formData,
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
      setEstimatedWeightPerItem(0);
      setItemNotes('');
      setWarehouse('');
      setOrderedWebsite('amazon');
      setItemType('');
      setShippingExtraBase({ unit: 'usd', value: 0 });
      setCommissionRateForAffiliate('');
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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cusRes = await axios.get(`${process.env.BASE_URL}/customers`);
        const billRes = await axios.post(`${process.env.BASE_URL}/bills`);

        setCustomers(cusRes.data.data.data);
        setBill(billRes.data.data.data);

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

  useEffect(() => {
    setCustomerName(props.customerId);
  }, [customers]);

  const submitForm = async (formData) => {
    setLoading(true);
    console.log(formData.items);
    try {
      const res = await axios.patch(
        `${process.env.BASE_URL}/bills/${bill._id}/fakeCreateBill`,
        formData,
        config
      );

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
              itemFormSubmit({
                name,
                link,
                pricePerItem: parseFloat(pricePerItem),
                tax,
                usShippingFee,
                quantity,
                estimatedWeightPerItem,
                shippingExtraBase,
                commissionRateForAffiliate,
                itemType,
                orderedWebsite,
                warehouse,
                notes: itemNotes,
                bill: bill._id,
              });
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridColumnGap: '2rem',
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
                  required={true}
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
                  required={true}
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
                  required={true}
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
                <FormLabel htmlFor="usShippingFee">
                  Giá ship nội bộ Mỹ
                </FormLabel>
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
                <FormLabel htmlFor="estimatedWeightPerItem">
                  Cân nặng ước tính
                </FormLabel>
                <FormInput
                  type="number"
                  placeholder="Cân nặng ước tính..."
                  id="estimatedWeightPerItem"
                  name="estimatedWeightPerItem"
                  value={estimatedWeightPerItem}
                  onChange={(e) => setEstimatedWeightPerItem(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="shippingExtraBase">
                  Shipping Extra Base
                </FormLabel>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <FormInput
                    style={{ width: '80%' }}
                    type="number"
                    placeholder="Phụ thu..."
                    id="shippingExtraBase"
                    name="shippingExtraBase"
                    value={shippingExtraBase.value}
                    onChange={(e) =>
                      setShippingExtraBase({
                        ...shippingExtraBase,
                        value: e.target.value,
                      })
                    }
                  />
                  <Select
                    value={shippingExtraBase.unit}
                    onChange={(e) =>
                      setShippingExtraBase({
                        ...shippingExtraBase,
                        unit: e.target.value,
                      })
                    }
                  >
                    <option value="vnd">VND</option>
                    <option value="usd">USD</option>
                    <option value="%">%</option>
                  </Select>
                </div>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="commissionRateForAffiliate">
                  Hoa hồng cho CTV
                </FormLabel>
                <FormInput
                  type="number"
                  placeholder="Hoa hồng cho CTV..."
                  id="commissionRateForAffiliate"
                  name="commissionRateForAffiliate"
                  value={commissionRateForAffiliate}
                  onChange={(e) =>
                    setCommissionRateForAffiliate(e.target.value)
                  }
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="itemType">Item type</FormLabel>
                <Select
                  onChange={(e) => setItemType(e.target.value)}
                  value={itemType}
                  style={{ width: '22rem' }}
                >
                  <option value="">Choose one</option>
                  <option value="toys">Toys</option>
                  <option value="electronics">Electronics</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="accessories">Accessories</option>
                  <option value="others">Others</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="warehouse">Về đâu?</FormLabel>
                <Select
                  onChange={(e) => setWarehouse(e.target.value)}
                  value={warehouse}
                  name="warehouse"
                  id="warehouse"
                  required={true}
                >
                  <option value="">Choose one</option>
                  <option value="unihan">UNIHAN</option>
                  <option value="unisgn">UNISGN</option>
                  <option value="pacific">PACIFIC</option>
                  <option value="others">OTHERS</option>
                </Select>
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
              <FormGroup>
                <FormLabel htmlFor="notes">Ghi chú</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Ghi chú..."
                  id="notes"
                  name="notes"
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                />
              </FormGroup>
            </div>
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
            usdVndRate,
            affiliate,
            taxForCustomer: parseFloat(taxForCustomer) / 100,
            notes,
            shippingRateToVn,
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
                {items.map((item, index) => (
                  <Link href={`/items/${item.id}`}>
                    <a>
                      <DetailItem key={index}>
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
                    </a>
                  </Link>
                ))}
              </ul>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="name">Tên khách hàng</FormLabel>
            <Select
              onChange={(e) => setCustomerName(e.target.value)}
              value={customerName}
              required={true}
            >
              <option value="">Choose a customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="usdVndRate">Tỉ giá</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer usdVndRate..."
              id="usdVndRate"
              name="usdVndRate"
              onChange={(e) => setUsdVndRate(e.target.value)}
              value={usdVndRate}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="shippingRateToVn">
              Shipping Rate to VN
            </FormLabel>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <FormInput
                type="text"
                placeholder="Enter customer shippingRateToVn..."
                id="shippingRateToVn"
                name="shippingRateToVn"
                onChange={(e) =>
                  setShippingRateToVn({
                    ...shippingRateToVn,
                    value: e.target.value,
                  })
                }
                value={shippingRateToVn.value}
              />
              <Select
                value={shippingRateToVn.currency}
                onChange={(e) =>
                  setShippingRateToVn({
                    ...shippingRateToVn,
                    currency: e.target.value,
                  })
                }
              >
                <option value="usd">USD</option>
                <option value="vnd">VND</option>
              </Select>
            </div>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="name">Cộng tác viên</FormLabel>
            {affiliates.length > 0 ? (
              <Select
                onChange={(e) => setAffiliate(e.target.value)}
                value={affiliate}
                required={true}
              >
                <option value="">Choose an affiliate</option>
                {affiliates.map((aff) => (
                  <option value={aff._id} key={aff._id}>
                    {aff.firstName} {aff.lastName}
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

          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Ghi chú"
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
