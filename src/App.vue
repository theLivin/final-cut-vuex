<template>
  <div id="app" class="container">
    <div class="jumbotron text-center">
      <Header />

      <SearchForm />
    </div>

    <div class="row years-list">
      <MovieYears />
    </div>

    <div class="row card-deck m-md-1" id="all-movies">
      <MoviePoster
        v-for="movie in moviesList"
        :key="movie.index"
        :movie="movie"
      />
    </div>

    <MovieModal :movie="getCurrentMovie" />
  </div>
</template>

<script>
import Header from "./components/layout/Header";
import SearchForm from "./components/SearchForm";
import MoviePoster from "./components/MoviePoster";
import MovieModal from "./components/MovieModal";
import MovieYears from "./components/MovieYears";

import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    SearchForm,
    MoviePoster,
    MovieModal,
    MovieYears,
  },
  computed: {
    ...mapGetters(["moviesList", "getCurrentMovie"]),
  },
};
</script>

<style>
body {
  font-family: "Raleway", sans-serif;
}

.gray {
  color: rgba(153, 153, 153, 0.651);
}

.jumbotron {
  background-color: rgba(110, 104, 104, 0.3) !important;
  background-image: url("./assets/clapperboard.svg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: center;
  background-size: cover !important;
}
.years-list {
  color: white;
  justify-content: center;
}

.years-list li {
  list-style-type: none;
  display: inline-block;
}

/* Media Queries */
@media (max-width: 766px) {
  .horz-dot {
    border-top: 2px dotted;
    width: 2%;
  }
}

@media (max-width: 960px) {
  #all-movies *,
  #movieModal .poster-img-area {
    margin: 0 auto 0;
  }
}
@media (min-width: 920px) {
  .jumbotron {
    width: 70%;
    margin-left: 50%;
    transform: translate(-50%);
  }
}
</style>
