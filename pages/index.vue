<template>
  <div>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <NuxtLink :to="`/articles/${article.slug}`" class="text-blue-600">{{
          article.title
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import { gql } from "graphql-request";
import { graphql } from "../util/statamic";

export default {
  data() {
    return {
      articles: [],
    };
  },

  async fetch() {
    const query = gql`
      {
        entries(collection: "articles") {
          data {
            id
            slug
            title
          }
        }
      }
    `;

    const response = await graphql(query);

    this.articles = response.entries.data;
  },
};
</script>
