import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Affiliates';
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
        <Title>Affiliates</Title>
        <Link href="/affiliates/new" passHref>
          <LinkPrimary>Create an affiliate</LinkPrimary>
        </Link>
      </MainCntHeader>
      <MainContent page={router.query.page || 1} />
    </>
  );
}
