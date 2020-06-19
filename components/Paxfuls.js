import React, { useState, useEffect } from 'react';
import MainContent from './styles/MainContent';
import Loader from './styles/Loader';
import axios from 'axios';
import Table from './styles/Table';
import PaxfulRow from './PaxfulRow';
import LinkPrimary from '../components/styles/LinkPrimary';
import Link from 'next/link';
import ActionBtnGroup from '../components/styles/ActionBtnGroup';
import styled from 'styled-components';
import FormInput from '../components/styles/FormInput';
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
          `${process.env.BASE_URL}/paxfuls?page=${page}&limit=8`
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
            <th>Ngày</th>
            <th>Loại</th>

            <th>Lượng Bitcoin</th>
            <th>Phí rút BTC</th>
            <th>BTC balance</th>
            <th>Người mua</th>
            <th>Tiền vốn?</th>
            <th>Số tiền chi</th>
            <th>Tỉ giá VND/BTC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <PaxfulRow
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
          <Link href={`/paxfuls?page=${page * 1 - 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              style={{ marginRight: '2rem' }}
              aria-disabled={page <= 1}
            >
              Previous
            </LinkPrimary>
          </Link>
          <Link href={`/paxfuls?page=${page * 1 + 1}`} passHref>
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
