import App from 'next/app';
import Page from '../components/Page';

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

MyApp.getStaticProps = async (context) => {
  const appProps = await App.getStaticProps(context);

  return { ...appProps };
};

export default MyApp;
