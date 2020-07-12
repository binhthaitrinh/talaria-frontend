import React, { useState, useEffect } from 'react';
import MainContent from './styles/MainContent';
import Loader from './styles/Loader';
import axios from 'axios';
import Table from './styles/Table';
import CustomerRow from './AccountRow';
import LinkPrimary from '../components/styles/LinkPrimary';
import Link from 'next/link';
import ActionBtnGroup from '../components/styles/ActionBtnGroup';

import { useRouter } from 'next/router';

function Items({ page }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/accounts?page=${page}&limit=8&sort=-addedAt`
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
  }, [page]);

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      <Table>
        <thead>
          <tr>
            <th>Ngày tạo</th>
            <th>Login ID</th>
            <th>Account Website</th>
            <th>Balance</th>
            <th>Account Type</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <CustomerRow
              item={item}
              key={item.id}
              index={index}
              items={items}
              setItems={setItems}
            />
          ))}
        </tbody>
      </Table>
      <ActionBtnGroup>
        <div>
          <Link href={`/accounts?page=${page * 1 - 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              style={{ marginRight: '2rem' }}
              aria-disabled={page <= 1}
            >
              Previous
            </LinkPrimary>
          </Link>
          <Link href={`/accounts?page=${page * 1 + 1}`} passHref>
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
