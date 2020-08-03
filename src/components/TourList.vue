<template>
  <div class="tour-list">
      <h1>{{ headline }}</h1>
      <div class="tour-list-cards">
          <div class="card" v-for="tour in tours" :key="tour['@id']">
            <img :src="tour.image" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{{tour.name}}</h5>
                <p class="card-text">{{tour.description}}</p>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

const API_ENDPOINT = process.env.VUE_APP_REST_TOURS;

const IMAGE_BASE = process.env.VUE_APP_ORIGIN;




export default {
  name: 'TourList',
  props: ['headline', 'tours'],
  mounted() {
    axios.get(API_ENDPOINT).then(response => {
      this.tours = response.data.results.map(item => ({ ...item, image: IMAGE_BASE + item.image.renditions["480x360"].link }));
    });
  }
};
</script>

<style>
@import './TourList.css';

</style>
