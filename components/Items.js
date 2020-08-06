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
import _ from 'lodash';

function Items({ page, fields, sort, filter, freezeNo }) {
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
      <div
        style={{
          marginLeft: `${14 * (freezeNo + 2) - 10}rem`,
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
                Selected
              </th>{' '}
              <th
                style={{
                  position: 'absolute',
                  top: 'auto',
                  left: '13rem',
                  borderBottom: '1px solid rgba(0,0,0,0.09)',
                  width: '9rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                Actions
              </th>
              {fields.map((field, index) => {
                if (index < freezeNo) {
                  return (
                    <th
                      style={{
                        position: 'absolute',
                        top: 'auto',
                        left: `${(index + 2) * 14 - 6}rem`,
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
                  return <td key={field}>{_.startCase(field)}</td>;
                }
              })}
              {/* <th>Selected</th>
            <th>Created At</th>
            <th>Tracking Link</th>
            <th>Item Link</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actual Cost</th>
            <th>Status</th> */}
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
                freezeNo={freezeNo}
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
        </Table>{' '}
      </div>
      <ActionBtnGroup>
        <div>
          <Link href={`/items?page=${page * 1 - 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              aria-disabled={page <= 1}
            >
              Previous
            </LinkPrimary>
          </Link>
          <Link href={`/items?page=${page * 1 + 1}`} passHref>
            <LinkPrimary
              onClick={() => setLoading(true)}
              aria-disabled={page >= numOfPages}
            >
              Next
            </LinkPrimary>
          </Link>
          <Link href={`/bills/new?ids=${ids}`} passHref>
            <LinkPrimary>Create a bill</LinkPrimary>
          </Link>
          <Link href="/items/new" passHref>
            <LinkPrimary>Create a new item</LinkPrimary>
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
