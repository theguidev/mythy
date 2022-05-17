import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.VINI_FAUNA_SECRET_KEY,
  domain: 'db.us.fauna.com',
  scheme: 'https'
})