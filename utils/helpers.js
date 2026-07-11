const today = () => new Date().toISOString().split('T')[0];

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-GB');

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const getEnvVar = (key) => {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
};

module.exports = { today, formatDate, sleep, getEnvVar };
