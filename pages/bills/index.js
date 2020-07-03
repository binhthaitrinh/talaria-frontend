import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Bills';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import LinkPrimary from '../../components/styles/LinkPrimary';

export default function Customers() {
  const router = useRouter();

  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Bills</Title>
        <Link href="/bills/new" passHref>
          <LinkPrimary>Create a bill</LinkPrimary>
        </Link>
      </MainCntHeader>
      <MainContent page={router.query.page || 1} />
    </>
  );
}
