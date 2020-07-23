<template>
  <ul>
    <li
      v-for="(movieYear, index) in getAllYears"
      :key="movieYear + index + Math.random()"
    >
      <input
        type="checkbox"
        class="m-1 bg-warning"
        @change="checkboxChanged(movieYear)"
      />
      {{ movieYear }}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MovieYears",
  methods: {
    ...mapActions(["filterMoviesByYear"]),
    checkboxChanged(selectedYear) {
      this.filterMoviesByYear(selectedYear);
    },
  },
  computed: {
    ...mapGetters(["getAllYears"]),
  },
};
</script>

<style></style>
