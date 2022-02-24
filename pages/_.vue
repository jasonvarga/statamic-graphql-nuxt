<template>
  <div>
    <h1 class="text-3xl font-bold mb-8" v-text="page.title" />
    <div class="prose" v-html="page.content" />
  </div>
</template>

<script>
import { gql } from "graphql-request";
import { graphql } from "@/util/statamic";

export default {
  async asyncData({ params, query }) {
    const gqlQuery = gql`
      query Entry($uri: String) {
        entry(uri: $uri) {
          title
          ... on Entry_Pages_Page {
            content
          }
        }
      }
    `;

    const response = await graphql(gqlQuery, {
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
