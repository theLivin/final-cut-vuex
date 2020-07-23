<template>
  <div
    class="modal fade"
    id="movieModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="movieModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="movieModalLabel">
            {{ movie.Title }}
            <a
              type="button"
              class="btn btn-warning"
              :href="url"
              target="_blank"
            >
              <strong class="text-dark">IMDb</strong>
              <span class="badge badge-light">{{ movie.imdbRating }}</span>
            </a>
          </h5>

          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" class="text-warning">&times;</span>
          </button>
        </div>
        <div class="modal-body row">
          <div class="col-md-3">
            <div
              class="card border-warning mb-3 poster-img-area"
              style="width: 220px; height: 316px;"
            >
              <img class="image img-thumbnail" :src="posterImage" />
            </div>
          </div>
          <hr class="horz-dot" />
          <div class="col-md-8 ml-md-5 modal-text">
            <div>
              <h3 class="text-warning">Plot</h3>
              {{ movie.Plot }}
            </div>
            <hr />
            <ul>
              <li v-for="(value, key, index) in movieDetails" :key="index">
                <span class="text-warning">{{ key }}:</span>
                {{ value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieModal",
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
    url: function() {
      return "http://imdb.com/title/" + this.movie.imdbID;
    },
    movieDetails: function() {
      return (({ Genre, Director, Production, Released, Writer, Actors }) => ({
        Genre,
        Director,
        Production,
        Released,
        Writer,
        Actors,
      }))(this.movie);
    },
  },
};
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-header a.btn * {
  font-weight: bold;
}

.modal-content {
  background-color: rgba(37, 35, 35, 0.9) !important;
  color: #fff;
}

.modal li {
  list-style-type: none;
}

.modal ul {
  padding: 0;
}
</style>
