const prod = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    BASE_URL: prod
      ? 'https://hidden-gorge-76682.herokuapp.com/api/v1'
      : 'http://localhost:4444/api/v1',
  },
};
