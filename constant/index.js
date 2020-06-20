const BASE_URL = 'http://localhost:4444/api/v1';
const PROD_BASE_URL = '${process.env.BASE_URL}';

module.exports = { BASE_URL, PROD_BASE_URL };
