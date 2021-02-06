<template>
  <div>
    <h1 class="text-3xl font-bold mb-8" v-text="page.title" />
    <div class="prose" v-html="page.content" />
  </div>
</template>

<script>
import { request, gql } from "graphql-request";

export default {
  async asyncData({ params }) {
    const query = gql`
      query Entry($uri: String) {
        entry(uri: $uri) {
          title
          ... on Entry_Pages_Page {
            content
          }
        }
      }
    `;

    const response = await request("http://statamic3.test/graphql", query, {
      uri: "/" + params.pathMatch,
    });
    const page = response.entry;

    if (!page) {
      throw new Error(404);
    }

    return { page };
  },
};
</script>
