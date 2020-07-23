<template>
  <div class="poster col-md-3" @click="posterClicked(movie.imdbID)">
    <div class="card border-warning">
      <div class="dark-overlay"></div>
      <img class="image img-thumbnail" :src="posterImage" />
      <div class="middle btn-warning">
        <h4 class="title">
          {{ movie.Title }}
          <br />
          {{ movie.Year }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions } from "vuex";

export default {
  name: "MoviePoster",
  props: {
    movie: {
      type: Object,
    },
  },
  computed: {
    posterImage: function() {
      if (this.movie.Poster == "N/A" || !this.movie.Poster)
        return "http://placeimg.com/220/316/any";
      return this.movie.Poster;
    },
  },
  methods: {
    ...mapActions(["fetchMovieDetails"]),
    posterClicked: function(id) {
      this.fetchMovieDetails(id);
      $("#movieModal").modal("toggle");
    },
  },
};
</script>

<style>
.poster {
  width: 220px !important;
  height: 316px;
  margin-bottom: 50px;
}

.poster .image {
  opacity: 1;
  display: block;
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  backface-visibility: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
}

.poster .middle {
  transition: 0.5s ease;
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-weight: bold;
  width: 80%;
}

.title {
  color: white;
  font-size: 16px;
  padding: 16px 32px;
  font-family: inherit;
}

.poster:hover .image {
  filter: blur(1px);
  z-index: 0;
}

.poster:hover .middle {
  opacity: 1;
  z-index: 2;
  cursor: pointer;
}

.poster:hover .dark-overlay {
  opacity: 0.3;
  display: inline;
}

.poster .dark-overlay {
  position: absolute; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  z-index: 1; /* Specify a stack order in case you're using a different order for other elements */
}
</style>
