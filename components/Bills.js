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

function Items({ page }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/bills?page=${page}&limit=8`
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
            <th>Items</th>
            <th>Total Bill USD</th>
            <th>Total Bill VND</th>
            <th>Tiền nợ</th>
            <th>Tên khách</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <BillRow
              item={item}
              key={item._id}
              index={index}
              items={items}
              setItems={setItems}
            />
          ))}
        </tbody>
      </Table>
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
