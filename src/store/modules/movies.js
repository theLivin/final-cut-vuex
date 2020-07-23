import axios from "axios";
import $ from "jquery";

const state = {
  movies: [],
  currentMovie: {},
  movieYears: [],
  filteredMovies: [],
  yearsForFiltering: {},
};

const getters = {
  // Years to be displayed when search is performed and results is filtered
  moviesList: () => {
    if (Object.values(state.filteredMovies).length > 0) {
      return state.filteredMovies;
    } else {
      return state.movies;
    }
  },
  // Movie that will be displayed in the modal
  getCurrentMovie: () => state.currentMovie,
  // Checkbox years for filtering
  getAllYears: () => state.movieYears[0],
  // Get unfiltered movies
  getAllMovies: () => state.movies,
};

const actions = {
  // Fetch movies when search is performed
  async fetchMovies({ commit }, movieTitle) {
    const res = await axios.get(
      `http://www.omdbapi.com/?apikey=ff0be5a3&s=${movieTitle}`
    );

    commit("setMovies", res.data.Search);
    commit("setMovieYears", res.data.Search);
  },
  // Get movie details when a single movie is clicked
  async fetchMovieDetails({ commit }, movieId) {
    const res = await axios.get(
      `http://www.omdbapi.com/?apikey=ff0be5a3&i=${movieId}`
    );
    commit("setMovieDetails", res.data);
  },
  // Commit a filter when a checkbox is changed
  filterMoviesByYear({ commit }, filterYear) {
    commit("filterMovies", filterYear);
  },
};

const mutations = {
  // Set stored movies to movies gotten from API
  setMovies: (state, movies) => {
    // Clear data that may persist temporarily and show in anothere search
    state.filteredMovies = [];
    state.yearsForFiltering = {};

    // Set movies to new movies
    state.movies = movies;
  },
  // Set movie data to be displayed on modal when a single movie is clicked
  setMovieDetails: (state, movie) => {
    state.currentMovie = movie;
  },
  // Set movies years. this will be used to create the checkboxes
  setMovieYears: (state, movies) => {
    let foundYears = {};
    $.each(movies, (index, movie) => {
      foundYears[movie.Year] = movie.Year;
    });
    state.movieYears.push(foundYears);
  },
  // Perform filter committed in actions
  filterMovies: (state, filterYear) => {
    if (state.yearsForFiltering[filterYear]) {
      delete state.yearsForFiltering[filterYear];
    } else {
      state.yearsForFiltering[filterYear] = filterYear;
    }

    state.filteredMovies = state.movies.filter((movie) => {
      return movie.Year in state.yearsForFiltering;
    });
  },
};

// export module
export default {
  state,
  getters,
  actions,
  mutations,
};
