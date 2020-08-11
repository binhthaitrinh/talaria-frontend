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
import BtnGrey from './styles/BtnGrey';
import Modal from './Modal';

const EditItem = ({ item }) => {
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);
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
    parseFloat(item.discountRate['$numberDecimal'] * 100)
  );
  const [bankAccounts, setBankAccounts] = useState(item.bankAccounts || []);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [notes, setNotes] = useState(item.notes || '');

  const [showAddBank, setShowAddBank] = useState(false);

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
        `${process.env.BASE_URL}/customers/${item._id}`,
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

          submitForm({
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber: phoneNo,
            address: {
              address1: address,
              city,
            },
            customerType,
            discountRate: discountRate / 100,
            bankAccounts,
            notes,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="firstName">Họ</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer firstName..."
              id="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="lastName">Tên</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer lastName..."
              id="lastName"
              name="lastName"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
              required={true}
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
              required={true}
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
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="customerType">Loại khách hàng</FormLabel>
            <Select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              id="customerType"
              name="customerType"
              required={true}
            >
              <option value="">Choose one</option>
              <option value="personal">Cá nhân</option>
              <option value="wholesale">Khách buôn</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="discountRate">Discount Rate</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter customer discountRate..."
              id="discountRate"
              name="discountRate"
              onChange={(e) => setDiscountRate(e.target.value)}
              value={discountRate}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="discountRate">Bank Accounts</FormLabel>
            {bankAccounts.length > 0 ? (
              <ul>
                {bankAccounts.map((acct, index) => (
                  <li style={{ marginBottom: '0.5rem' }}>
                    {acct.bankName} - {acct.accountNumber}{' '}
                    <span
                      style={{
                        backgroundColor: 'grey',
                        color: 'white',
                        padding: '0 1rem',
                        marginLeft: '1rem',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        setBankAccounts((bankAccounts) =>
                          bankAccounts.filter(
                            (item) => item.accountNumber != acct.accountNumber
                          )
                        )
                      }
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Such empty!</p>
            )}
            {showAddBank && (
              <Modal setShowModal={setShowAddBank}>
                <form
                  className="form-content"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setBankAccounts((bankAccounts) => [
                      ...bankAccounts,
                      { accountNumber, bankName },
                    ]);
                    setShowAddBank(false);
                    setAccountNumber('');
                    setBankName('');
                  }}
                >
                  <FormGroup>
                    <FormLabel htmlFor="bankName">Tên ngân hàng</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Tên ngân hàng..."
                      id="bankName"
                      name="bankName"
                      onChange={(e) => setBankName(e.target.value)}
                      value={bankName}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="accountNumber">Số tài khoản</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Số tài khoản..."
                      id="accountNumber"
                      name="accountNumber"
                      onChange={(e) => setAccountNumber(e.target.value)}
                      value={accountNumber}
                    />
                  </FormGroup>
                  <SubmitBtn>Add</SubmitBtn>
                </form>
              </Modal>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="number"
              placeholder="Enter notes..."
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

        <BtnGrey
          style={{ padding: '1.5rem 2rem', marginLeft: '2rem' }}
          onClick={(e) => {
            e.preventDefault();
            setShowAddBank(true);
          }}
        >
          Add Bank Account
        </BtnGrey>
      </Form>
    </MainContent>
  );
};

export default EditItem;
