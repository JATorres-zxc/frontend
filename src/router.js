import Vue from 'vue';
import Router from 'vue-router';
import IndexView from './pages/IndexView.vue'; 
import DetailsView from './pages/DetailView.vue'; 
import ResultsView from './pages/ResultsView.vue'; 

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
      path: '/details/:id',
      name: 'DetailsView',
      component: DetailsView,

    },
    {
      path: '/:id/results',
      name: 'ResultsView',
      component: ResultsView,
    },
  ],
});
