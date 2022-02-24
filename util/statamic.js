import { request } from "graphql-request";

export async function graphql(query, params = {}) {
  let url = 'http://statamic3.test/graphql';

  if (query.token) {
    url += `?token=${query.token}`;
  }

  return await request(url, query, params);
}
