import Head from 'next/head';

const Meta = (props) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

    {/* <link rel="stylesheet" type="text/css" href="/static/nprogress.css" /> */}
    <title>The Talaria | {props.title}</title>
  </Head>
);

export default Meta;
