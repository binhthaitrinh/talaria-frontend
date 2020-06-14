import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Items';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Items() {
  const router = useRouter();
  console.log('//////////');
  console.log(router.query);
  console.log('//////////');

  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Items</Title>
      </MainCntHeader>
      <MainContent page={router.query.page || 1} />
    </>
  );
}
