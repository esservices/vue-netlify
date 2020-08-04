<template>
  <nav v-if="pagenav">
    <router-link
      v-for="item in pagenav"
      :key="item['@id']"
      v-bind:to="item['@name']"
    >{{ item.title }}</router-link>
    <div class="languages">
      <span
        v-for="language in languages"
        :key="language"
        @click="clickLanguage(language)"
      >{{ language }}</span>
    </div>
  </nav>
</template>

<script>
import {
  getLanguages,
  removeCurrentLanguage
} from "../helpers/AppHelpers";

export default {
  name: "Navigation",
  data() {
    return {
      pagenav: [],
      languages: getLanguages(),
    };
  },

  async mounted() {
    const pagenavResponse = await fetch(
      process.env.VUE_APP_REST_PAGENAV + process.env.VUE_APP_SITE_BASENAME
    );
    const pagenav = await pagenavResponse.json();
    const newPagenav = [
      {
        "@id": pagenav["@id"],
        "@name": "/",
        title: pagenav.title
      }
    ];

    this.pagenav = newPagenav.concat(
      pagenav["@nodes"].map(nodeName => pagenav[nodeName])
    );
  },

  methods: {
    clickLanguage: function(language) {
      let url = '/'+language+process.env.VUE_APP_SITE_BASENAME+this.$route.path;
      if (this.$route.params.lang) {
        url = removeCurrentLanguage(url, this.$route.params.lang);
      }
      this.$router.push(url);
    }
  }
};
</script>
