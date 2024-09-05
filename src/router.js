import Vue from 'vue';
import Router from 'vue-router';
import IndexView from './components/IndexView.vue'; // Your components
import DetailsView from './components/DetailView.vue'; // Your components
import ResultsView from './components/ResultsView.vue'; // Your components


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexView',
      component: IndexView,
    },
    {
      path: '/details/',
      name: 'DetailsView',
      component: DetailsView,

    },
    {
      path: '/results',
      name: 'ResultsView',
      component: ResultsView,
    },
  ],
});
