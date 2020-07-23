<template>
  <form class="form-row" role="search" @submit.prevent="onSubmit">
    <div class="input-group">
      <input
        v-model="searchTitle"
        type="text"
        class="form-control col-md-10 mb-2 straight-right"
        placeholder="Movie Title"
      />

      <button class="btn btn-warning col-md-2 mb-2 straight-left">
        Search
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SearchForm",
  data() {
    return {
      searchTitle: "",
      previousSearchTitle: "",
    };
  },
  methods: {
    ...mapActions(["fetchMovies"]),
    onSubmit: function() {
      this.fetchMovies(this.searchTitle);
    },
  },
};
</script>

<style scoped>
form input[type="submit"] {
  font-size: 100%;
}

.straight-right {
  border-radius: 10px 10px 10px 10px;
}

.straight-left {
  border-radius: 0 10px 10px 0px;
}

/* Media Queries */
@media (max-width: 766px) {
  .straight-right {
    border-radius: 0px !important;
    border-top-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    margin-bottom: 0px !important;
    text-align: center;
  }

  .straight-left {
    border-radius: 0px !important;
    border-bottom-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
  }
}
</style>
