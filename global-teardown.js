const { Logger } = require('./utils/logger');

async function globalTeardown() {
  Logger.info('Running global teardown — cleaning test data...');
  // Add your cleanup logic here, e.g. call your API to delete records prefixed with [TEST]
}

module.exports = globalTeardown;
