import App from 'next/app';
import Page from '../components/Page';

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  return { ...appProps };
};

export default MyApp;
