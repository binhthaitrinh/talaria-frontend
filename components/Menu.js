import React from 'react';
import MenuList from './styles/MenuList';
import MenuItem from './styles/MenuItem';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuItems = [
  {
    pathname: '',
    item: 'Dashboard',
    icon: 'analytics-outline',
  },
  {
    pathname: 'items',
    item: 'Items',
    icon: 'pricetags-outline',
  },
  {
    pathname: 'accounts',
    item: 'Accounts',
    icon: 'person-circle-outline',
  },
  {
    pathname: 'customers',
    item: 'Customers',
    icon: 'people-outline',
  },
  {
    pathname: 'affiliates',
    item: 'Affiliates',
    icon: 'git-network-outline',
  },
  {
    pathname: 'giftcards',
    item: 'Gift cards',
    icon: 'gift-outline',
  },
  {
    pathname: 'paxfuls',
    item: 'Paxful',
    icon: 'logo-bitcoin',
  },

  {
    pathname: 'bills',
    item: 'Bills',
    icon: 'cash-outline',
  },
];

function Menu(props) {
  const router = useRouter();
  return (
    <MenuList>
      {menuItems.map((menu, index) => (
        <MenuItem key={index}>
          <Link href={`/${menu.pathname}`}>
            <a
              className={
                router.pathname.split('/')[1] === menu.pathname ? 'active' : ''
              }
            >
              <ion-icon name={menu.icon}></ion-icon>
              <span>{menu.item}</span>
            </a>
          </Link>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default Menu;
