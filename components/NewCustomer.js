import React, { useState, useEffect, useRef } from 'react';
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
import Modal from './Modal';
import BtnGrey from './styles/BtnGrey';
import { Select } from './styles/FormComponent';
import Editable from './Editable';

const EditItem = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [discountRate, setDiscountRate] = useState({
    amazon: 8,
    sephora: 8,
    ebay: 8,
    bestbuy: 8,
    costco: 8,
    walmart: 8,
    assisting: -5,
  });

  const amazonRef = useRef();
  const sephoraRef = useRef();
  const ebayRef = useRef();
  const bestbuyRef = useRef();
  const costcoRef = useRef();
  const walmartRef = useRef();
  const assistingRef = useRef();
  const [notes, setNotes] = useState('');

  const [showAddBank, setShowAddBank] = useState(false);
  const [showAddSocialMedia, setShowAddSocialMedia] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const [bankAccounts, setBankAccounts] = useState([]);
  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [socialMediaLink, setSocialMediaLink] = useState({
    socialMediaType: '',
    link: '',
  });
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
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
        `${process.env.BASE_URL}/customers`,
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
        Router.push(`/customers`);
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
            firstName,
            lastName,
            customerType,
            address: {
              address1: address,
              city,
            },
            phoneNumber: phoneNo,
            discountRate: {
              amazon: discountRate.amazon / 100,
              sephora: discountRate.sephora / 100,
              ebay: discountRate.ebay / 100,
              costco: discountRate.costco / 100,
              walmart: discountRate.walmart / 100,
              assisting: discountRate.assisting / 100,
            },
            dateOfBirth,
            bankAccounts,
            notes,
          });
        }}
      >
        <div className="form-content">
          <FormGroup>
            <FormLabel htmlFor="lastName">Họ</FormLabel>
            <FormInput
              type="text"
              placeholder="Enter customer lastName..."
              id="lastName"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="firstName">Tên</FormLabel>
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
            <FormLabel htmlFor="dateOfBirth">Ngày sinh</FormLabel>
            <FormInput
              type="date"
              placeholder="Enter customer dateOfBirth..."
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={(e) => {
                setDateOfBirth(e.target.value);
                console.log(e.target.value);
              }}
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
              onChange={(e) => setCustomerType(e.target.value)}
              value={customerType}
              required={true}
            >
              <option value="">Select</option>
              <option value="personal">Personal</option>
              <option value="wholesale">Wholesale</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="discountRate">Discount Rate</FormLabel>
            <BtnGrey
              onClick={(e) => {
                e.preventDefault();
                setShowDiscount(!showDiscount);
              }}
            >
              Click to Show
            </BtnGrey>
            {showDiscount && (
              <Modal setShowModal={setShowDiscount}>
                <div style={{ width: '35rem' }}>
                  <FormGroup>
                    <FormLabel htmlFor="amazonDiscount">Amazon</FormLabel>
                    <Editable
                      text={`${discountRate.amazon}%`}
                      placeholder="Amazon discount"
                      type="input"
                      childRef={amazonRef}
                    >
                      <FormInput
                        ref={amazonRef}
                        type="number"
                        name="amazonDiscount"
                        placeholder="Amazon discount"
                        value={discountRate.amazon}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            amazon: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="sephoraDiscount">Sephora</FormLabel>
                    <Editable
                      text={`${discountRate.sephora}%`}
                      placeholder="Sephora discount"
                      type="input"
                      childRef={sephoraRef}
                    >
                      <FormInput
                        ref={sephoraRef}
                        type="number"
                        name="sephoraDiscount"
                        placeholder="Sephora discount"
                        value={discountRate.sephora}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            sephora: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="ebayDiscount">Ebay</FormLabel>
                    <Editable
                      text={`${discountRate.ebay}%`}
                      placeholder="Ebay discount"
                      type="input"
                      childRef={ebayRef}
                    >
                      <FormInput
                        ref={ebayRef}
                        type="number"
                        name="ebayDiscount"
                        placeholder="Ebay discount"
                        value={discountRate.ebay}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            ebay: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="costcoDiscount">Costco</FormLabel>
                    <Editable
                      text={`${discountRate.costco}%`}
                      placeholder="Costco discount"
                      type="input"
                      childRef={costcoRef}
                    >
                      <FormInput
                        ref={costcoRef}
                        type="number"
                        name="costcoDiscount"
                        placeholder="Costco discount"
                        value={discountRate.costco}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            costco: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="bestbuyDiscount">bestbuy</FormLabel>
                    <Editable
                      text={`${discountRate.bestbuy}%`}
                      placeholder="Bestbuy discount"
                      type="input"
                      childRef={bestbuyRef}
                    >
                      <FormInput
                        ref={bestbuyRef}
                        type="number"
                        name="bestbuyDiscount"
                        placeholder="Best buy discount"
                        value={discountRate.bestbuy}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            bestbuy: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="walmartDiscount">Walmart</FormLabel>
                    <Editable
                      text={`${discountRate.walmart}%`}
                      placeholder="Walmart discount"
                      type="input"
                      childRef={walmartRef}
                    >
                      <FormInput
                        ref={walmartRef}
                        type="number"
                        name="walmartDiscount"
                        placeholder="Walmart discount"
                        value={discountRate.walmart}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            walmart: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="assistingDiscount">Mua Hộ</FormLabel>
                    <Editable
                      text={`${discountRate.assisting}%`}
                      placeholder="Assisting discount"
                      type="input"
                      childRef={assistingRef}
                    >
                      <FormInput
                        ref={assistingRef}
                        type="number"
                        name="assistingDiscount"
                        placeholder="Assisting discount"
                        value={discountRate.assisting}
                        onChange={(e) =>
                          setDiscountRate({
                            ...discountRate,
                            assisting: e.target.value,
                          })
                        }
                      />
                    </Editable>
                  </FormGroup>
                </div>
              </Modal>
            )}
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
            <FormLabel htmlFor="discountRate">Bank Accounts</FormLabel>
            {bankAccounts.length > 0 ? (
              <ul>
                {bankAccounts.map((acct, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
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
            <FormLabel htmlFor="discountRate">Contacts</FormLabel>
            {socialMediaLinks.length > 0 ? (
              <ul>
                {socialMediaLinks.map((acct, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
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
                      socialMediaLink,
                    ]);
                    setShowAddSocialMedia(false);
                    setSocialMediaLink({ socialMediaType: '', link: '' });
                  }}
                >
                  <FormGroup>
                    <FormLabel htmlFor="socialMediaType">MXH nào</FormLabel>
                    <Select
                      value={socialMediaLink.socialMediaType}
                      onChange={(e) =>
                        setSocialMediaLink({
                          ...socialMediaLink,
                          socialMediaType: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose</option>'facebook',
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">Tiktok</option>
                      <option value="pinterest">Pinterest</option>
                      <option value="zalo">Zalo</option>
                      <option value="telegram">Telegram</option>
                      <option value="others">Others</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel htmlFor="socialMediaUrl">Link</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Link..."
                      id="socialMediaUrl"
                      name="socialMediaUrl"
                      onChange={(e) =>
                        setSocialMediaLink({
                          ...socialMediaLink,
                          link: e.target.value,
                        })
                      }
                      value={socialMediaLink.link}
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
            setShowAddBank(true);
          }}
        >
          {' '}
          Add Bank Account
        </BtnGrey>

        <BtnGrey
          style={{ padding: '1.5rem 2rem', marginLeft: '2rem' }}
          onClick={(e) => {
            e.preventDefault();
            setShowAddSocialMedia(true);
          }}
        >
          {' '}
          Add Social Links
        </BtnGrey>
      </Form>
    </MainContent>
  );
};

export default EditItem;
