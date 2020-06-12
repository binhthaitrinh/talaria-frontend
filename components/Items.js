import React, { useState, useEffect } from 'react';
import MainContent from './styles/MainContent';
import Loader from './styles/Loader';
import axios from 'axios';
import Table from './styles/Table';
import ItemRow from './ItemRow';

function Items() {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:4444/api/v1/items');
        console.log(res.data);
        setItems(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <MainContent>
      <Table>
        <thead>
          <tr>
            <th>Created At</th>
            <th>Tracking Link</th>
            <th>Item Link</th>
            <th>City</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.data.map((item, index) => (
            <ItemRow item={item} key={item.id} index={index} />
          ))}
        </tbody>
      </Table>
    </MainContent>
  );
}

export default Items;
