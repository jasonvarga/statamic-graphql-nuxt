<template>
  <div>
    <h1 class="text-3xl font-bold mb-8" v-text="entry.title" />
    <div class="prose" v-html="entry.content" />
  </div>
</template>

<script>
import { request, gql } from "graphql-request";

export default {
  async asyncData({ params }) {
    const query = gql`
      query Entry($slug: String) {
        entry(collection: "articles", slug: $slug) {
          title
          ... on Entry_Articles_Article {
            content
          }
        }
      }
    `;

    const response = await request("http://statamic3.test/graphql", query, {
      slug: params.slug,
    });
    const entry = response.entry;

    if (!entry) {
      throw new Error(404);
    }

    return { entry };
  },
};
</script>
