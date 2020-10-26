const redis = require('redis');

// algolia caches
const detailsClient = redis.createClient({ db: 3, socket_keepalive: true });
const medicationClient = redis.createClient({ db: 4, socket_keepalive: true });
const imagesClient = redis.createClient({ db: 7, socket_keepalive: true });
const conditionsClient = redis.createClient({ db: 8, socket_keepalive: true });
const topResultsClient = redis.createClient({ db: 10, socket_keepalive: true });
const relatedDrugsClient = redis.createClient({ db: 11, socket_keepalive: true });

// contentful cms caches
const contentClient = redis.createClient({ db: 6, socket_keepalive: true });
const blogClient = redis.createClient({ db: 9, socket_keepalive: true });

// default prices cache
const pricesClient = redis.createClient({ db: 5, socket_keepalive: true });

/**
 * redis cache getter
 *
 * @param {string} param0.key - redis key
 * @param {RedisClient} [param0.client] - instance of redis client.  defaults to detailsClient
 * @see {@link https://github.com/NodeRedis/node_redis/blob/master/index.js#L46}
 * @param {boolean} [param0.noParse] - if true return raw redis entry.  if false parse entry as json and return
 * @return {Promise<string|any>} - returns pending promise that resolves into string if noParse is true or JSON.parse output if false
 */
const get = ({ key, client, noParse }) =>
  new Promise((resolve, reject) => {
    if (!client) {
      client = detailsClient;
    }
    client.get(key, (err, res) => {
      if (err) {
        reject(err);
      } else if (res && !noParse) {
        try {
          resolve(JSON.parse(res));
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(res);
      }
    });
  });

/**
 * query redis cache for keys
 *
 * @param {string} param0.pattern - redis keys pattern
 * @see {@link https://redis.io/commands/keys}
 * @param {RedisClient} [param0.client] - instance of redis client.  defaults to detailsClient
 * @see {@link https://github.com/NodeRedis/node_redis/blob/master/index.js#L46}
 * @param {boolean} [param0.noParse] - if true return raw redis entry.  if false parse entry as json and return
 * @return {Promise<Array>} - returns array of keys
 */
const keys = ({ pattern, client, noParse }) =>
  new Promise((resolve, reject) => {
    const patternVal = pattern || '*';
    if (!client) {
      client = detailsClient;
    }
    client.keys(patternVal, (err, res) => {
      if (err) {
        reject(err);
      } else if (res && !noParse) {
        try {
          resolve(JSON.parse(res));
        } catch (err) {
          reject(err);
        }
      } else {
        resolve(res);
      }
    });
  });

/**
 * redis cache setter
 *
 * @param {string} [param0.key=''] - key for cache
 * @param {string} [param0.value=''] - value for cache
 * @param {number} [param0.cacheTime] - time to live in seconds
 * @param @param {RedisClient} [param0.client] - instance of redis client.  defaults to detailsClient
 * @see {@link https://github.com/NodeRedis/node_redis/blob/master/index.js#L46}
 * @return {Promise<string>} - returns pending promise that resolves into response from cache
 */
const set = ({ key = '', value = '', cacheTime, client }) =>
  new Promise((resolve, reject) => {
    if (!client) {
      client = detailsClient;
    }

    const params = [key, JSON.stringify(value)];

    if (cacheTime) {
      params.push(cacheTime, 'EX');
    }

    params.push((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });

    client.set(...params);
  });

/**
 * redis cache setter
 *
 * @param {Array<string>} param0.commands - array of arrays containing redis commands
 * @see {@link https://www.npmjs.com/package/redis#clientmulticommands}
 * @param {RedisClient} [param0.client] - instance of redis client.  defaults to detailsClient
 * @see {@link https://github.com/NodeRedis/node_redis/blob/master/index.js#L46}
 * @return {Promise<Array>} - returns pending promise that resolves into response from cache
 */
const multi = ({ commands, client }) =>
  new Promise((resolve, reject) => {
    if (!client) {
      client = detailsClient;
    }

    client.multi(commands).exec((err, replies) => {
      if (err) {
        reject(err);
      } else {
        resolve(replies);
      }
    });
  });

module.exports = {
  get,
  set,
  multi,
  keys,
  detailsClient,
  medicationClient,
  pricesClient,
  contentClient,
  imagesClient,
  conditionsClient,
  blogClient,
  topResultsClient,
  relatedDrugsClient,
};
