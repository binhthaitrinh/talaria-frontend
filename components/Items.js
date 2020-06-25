import React, { useState, useEffect } from 'react';
import MainContent from './styles/MainContent';
import Loader from './styles/Loader';
import axios from 'axios';
import Table from './styles/Table';
import ItemRow from './ItemRow';
import LinkPrimary from '../components/styles/LinkPrimary';
import Link from 'next/link';
import ActionBtnGroup from '../components/styles/ActionBtnGroup';
import styled from 'styled-components';
import FormInput from '../components/styles/FormInput';
import { useRouter } from 'next/router';

function Items({ page, fields, sort, filter }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selected, setSelected] = useState(null);
  const [ids, setIds] = useState([]);

  // res.data.data.data.map((item) => ({ [item._id]: false }))

  const onSelectChange = (id) => {
    setSelected({
      ...selected,
      [id]: !selected[id],
    });
    setIds([...ids, id]);
  };

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item.value,
      };
    }, initialValue);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${process.env.BASE_URL}/items?page=${page}&limit=8&sort=${sort}${
            fields.length > 0
              ? `&fields=${fields.join(',')}${filter ? `&${filter}` : ''}`
              : ''
          }`
        );
        console.log(res.data.numOfResults);
        setNumOfPages(Math.ceil((res.data.numOfResults * 1) / 8));

        setItems(res.data.data.data);
        setSelected(
          convertArrayToObject(
            res.data.data.data.map((item) => ({ id: item._id, value: false })),
            'id'
          )
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(true);
    fetchData();
  }, [page, fields, sort, filter]);

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      <Table>
        <thead>
          <tr>
            <th>Selected</th>
            {fields.map((field) => (
              <th key={field}>{field}</th>
            ))}
            {/* <th>Selected</th>
            <th>Created At</th>
            <th>Tracking Link</th>
            <th>Item Link</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actual Cost</th>
            <th>Status</th> */}

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <ItemRow
              item={item}
              key={item.id}
              index={index}
              items={items}
              setItems={setItems}
              fields={fields}
            >
              <form>
                <input
                  type="checkbox"
                  checked={selected[item._id]}
                  onChange={() => onSelectChange(item._id)}
                />
              </form>
            </ItemRow>
          ))}
        </tbody>
      </Table>
      <ActionBtnGroup>
        <div>
          <Link href={`/items?page=${page * 1 - 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              style={{ marginRight: '2rem' }}
              aria-disabled={page <= 1}
            >
              Previous
            </LinkPrimary>
          </Link>
          <Link href={`/items?page=${page * 1 + 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              aria-disabled={page >= numOfPages}
              style={{ marginRight: '2rem' }}
            >
              Next
            </LinkPrimary>
          </Link>
          <Link href={`/bills/new?ids=${ids}`} passHref>
            <LinkPrimary>Create a bill</LinkPrimary>
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
