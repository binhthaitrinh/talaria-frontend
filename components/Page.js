import React, { useContext, useState, createContext } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Container from './styles/Container';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './styles/Main';
import NProgress from 'nprogress';
import Router from 'next/router';
import OptionContext from './OptionContext';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const theme = {
  primary: '#00909e',
  primaryDark: '#005961',
  primaryBlack: '#142850',
  primaryLight: '#dae1e7',
  black: '#393939',
  grey: '#3A3A3A',
  lightGrey: '#E1E1E1',
  offWhite: '#EDEDED',
  danger: '#e7305b',
  success: '#099a97',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const GlobalStyle = createGlobalStyle`
   *,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    font-size: 62.5%; 
}

body {
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    /*font-size: 16px;*/
    line-height: 1.7;
    color: ${(props) => props.theme.black};
    font-size: 62.5%;
}

a {
   text-decoration: none;
   color: inherit;
}

ul {
  list-style: none;
}

img {
   width: 100%;
   height: auto;
}

#__next {
  position: relative;

  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to right, #D2D6DC, #D2D6DC)
}`;

const Page = (props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showLimitField, setShowLimitField] = useState(false);
  const [showFreezeCol, setShowFreezeCol] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <OptionContext.Provider
        value={{
          showFilter,
          setShowFilter,
          showSort,
          setShowSort,
          showLimitField,
          setShowLimitField,
          showFreezeCol,
          setShowFreezeCol,
        }}
      >
        <GlobalStyle />
        <Container
          onClick={() => {
            setShowFilter(false);
            setShowSort(false);
            setShowLimitField(false);
            setShowFreezeCol(false);
          }}
        >
          <Header />
          <Sidebar />
          <Main>{props.children}</Main>
        </Container>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule=""
          src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js"
        ></script>
      </OptionContext.Provider>
    </ThemeProvider>
  );
};

export default Page;
