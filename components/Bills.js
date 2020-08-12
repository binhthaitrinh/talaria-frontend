import React, { useState, useEffect } from 'react';
import MainContent from './styles/MainContent';
import Loader from './styles/Loader';
import axios from 'axios';
import Table from './styles/Table';
import BillRow from './BillRow';
import LinkPrimary from '../components/styles/LinkPrimary';
import Link from 'next/link';
import ActionBtnGroup from '../components/styles/ActionBtnGroup';

import { useRouter } from 'next/router';

function Items({ page, fields, freezeNo, sort }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${
            process.env.BASE_URL
          }/bills?page=${page}&limit=8&fields=${fields.join(
            ','
          )},vndUsdRate,moneyChargeCustomerUSD&sort=${sort}`
        );
        console.log(res.data.numOfResults);
        setNumOfPages(Math.ceil((res.data.numOfResults * 1) / 8));

        setItems(res.data.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [page, fields, sort]);

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      <div
        style={{
          marginLeft: `${14 * freezeNo + 9}rem`,
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      >
        <Table>
          <thead>
            <tr>
              <th
                style={{
                  position: 'absolute',
                  top: 'auto',
                  left: '4rem',
                  borderBottom: '1px solid rgba(0,0,0,0.09)',
                  width: '9rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Action
              </th>
              {fields.map((field, index) => {
                if (field === 'actualChargeCustomer') {
                  return (
                    <td style={{ position: 'relative', left: 0 }} key={index}>
                      {_.startCase('totalBillVND')}
                    </td>
                  );
                } else if (field === 'shippingRateToVnInUSD') {
                  return (
                    <td style={{ position: 'relative', left: 0 }}>
                      {_.startCase('shippingToVnFee')}
                    </td>
                  );
                }
                if (index < freezeNo) {
                  return (
                    <th
                      style={{
                        position: 'absolute',
                        top: 'auto',
                        left: `${index * 14 + 13}rem`,
                        borderBottom: '1px solid rgba(0,0,0,0.09)',
                        display: 'flex',
                        alignItems: 'center',
                        width: '14rem',
                      }}
                      key={field}
                    >
                      {_.startCase(field)}
                    </th>
                  );
                } else {
                  return (
                    <td style={{ position: 'relative', left: 0 }} key={field}>
                      {_.startCase(field)}
                    </td>
                  );
                }
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <BillRow
                item={item}
                key={index}
                index={index}
                items={items}
                setItems={setItems}
                fields={fields}
                freezeNo={freezeNo}
              />
            ))}
          </tbody>
        </Table>
      </div>

      <ActionBtnGroup>
        <div>
          <Link href={`/bills?page=${page * 1 - 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              style={{ marginRight: '2rem' }}
              aria-disabled={page <= 1}
            >
              Previous
            </LinkPrimary>
          </Link>
          <Link href={`/bills?page=${page * 1 + 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              aria-disabled={page >= numOfPages}
            >
              Next
            </LinkPrimary>
          </Link>
        </div>

        <p>
          Page {page} out of {numOfPages} pages
        </p>
      </ActionBtnGroup>
    </MainContent>
  );
}

export default Items;
