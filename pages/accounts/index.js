import Meta from '../../components/Meta';
import Title from '../../components/styles/Title';
import MainCntHeader from '../../components/styles/MainCntHeader';
import MainContent from '../../components/Accounts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import LinkPrimary from '../../components/styles/LinkPrimary';

const fieldList = [
  'createdAt',
  'customId',
  'accountWebsite',
  'loginID',
  'balance',
  'currency',
  'accountType',
  'status',
  'notes',
];

export default function Customers() {
  const router = useRouter();

  return (
    <>
      <Meta title="Dashboard" />
      <MainCntHeader>
        <Title>Accounts</Title>
        <Link href="/accounts/new" passHref>
          <LinkPrimary>Create an Account</LinkPrimary>
        </Link>
      </MainCntHeader>
      <MainContent page={router.query.page || 1} fields={fieldList} />
    </>
  );
}
