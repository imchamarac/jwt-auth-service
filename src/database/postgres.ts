import pg from 'pg';
import { dbConfig } from '../configs';

// Initialize DB pool
const configs =
    process.env.NODE_ENV === 'develop'
        ? dbConfig.develop
        : process.env.NODE_ENV === 'test'
          ? dbConfig.test
          : {};

const pgCon = new pg.Pool(configs);

export default pgCon;
