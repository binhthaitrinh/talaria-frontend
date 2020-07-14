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
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [commissionRate, setCommissionRate] = useState(0);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [notes, setNotes] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [socialMediaType, setSocialMediaType] = useState('');
  const [link, setLink] = useState('');

  const [loading, setLoading] = useState(false);

  const [showAddSocialMedia, setShowAddSocialMedia] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
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
    console.log(formData.items);
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/affiliates`,
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
        Router.push(`/affiliates${res.data.data.data._id}`);
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
          // console.log(currency);
          // console.log(pocketMoney);
          submitForm({
            name,
            commissionRate,
            phoneNumber,
            socialMediaLinks,
            bankAccounts,
            notes,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="name">Tên CTV</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter name..."
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="phoneNumber">Số điện thoại</FormLabel>
            <FormInput
              type="text"
              placeholder="Số điện thoại..."
              id="phoneNumber"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="commissionRate">% hoa hồng</FormLabel>
            <FormInput
              type="number"
              step="0.001"
              placeholder="% hoa hồng"
              id="commissionRate"
              name="commissionRate"
              onChange={(e) => setCommissionRate(e.target.value)}
              value={commissionRate}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="notes">Ghi chú</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter notes..."
              id="notes"
              name="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="socialMediaLinks">Social Media Links</FormLabel>
            {socialMediaLinks.length > 0 ? (
              <ul>
                {socialMediaLinks.map((acct, index) => (
                  <li style={{ marginBottom: '0.5rem' }}>
                    {acct.socialMediaType} - {acct.link}{' '}
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
                        setSocialMediaLinks((socialMediaLinks) =>
                          socialMediaLinks.filter(
                            (item) => item.link != acct.link
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
            {showAddSocialMedia && (
              <Modal setShowModal={setShowAddSocialMedia}>
                <form
                  className="form-content"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSocialMediaLinks((socialMediaLinks) => [
                      ...socialMediaLinks,
                      { socialMediaType, link },
                    ]);
                    setShowAddSocialMedia(false);
                    setSocialMediaType('');
                    setLink('');
                  }}
                >
                  <FormGroup>
                    <FormLabel htmlFor="socialMediaType">Loại</FormLabel>
                    <Select
                      value={socialMediaType}
                      onChange={(e) => setSocialMediaType(e.target.value)}
                      id="socialMediaType"
                      name="socialMediaType"
                    >
                      <option value="">Choose</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">Tiktok</option>
                      <option value="pinterest">Pinterest</option>
                      <option value="others">Khác</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="link">Link</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Link..."
                      id="link"
                      name="link"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                    />
                  </FormGroup>
                  <SubmitBtn>Add</SubmitBtn>
                </form>
              </Modal>
            )}
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
        </div>
        <SubmitBtn disabled={loading ? true : false}>
          {loading ? <LoadingBtn /> : 'Submit'}
        </SubmitBtn>

        <BtnGrey
          style={{ padding: '1.5rem 2rem', marginLeft: '2rem' }}
          onClick={(e) => {
            e.preventDefault();
            setShowAddSocialMedia(true);
          }}
        >
          {' '}
          Add Social Media
        </BtnGrey>

        <BtnGrey
          style={{ padding: '1.5rem 2rem', marginLeft: '2rem' }}
          onClick={(e) => {
            e.preventDefault();
            setShowAddBank(true);
          }}
        >
          Add bank account
        </BtnGrey>
      </Form>
    </MainContent>
  );
};

export default EditItem;
