<template>
  <div class="">
    <Swiper
    :loop = "true"
    :speed = "1500"
    :effect= "'fade'"
    :pagination-clickable="true"
    :pagination="true"
    :navigation="false"
    :autoplay= "{
        delay: 2000,
    }"
      class="mySwiper position-relative"
    >
      <SwiperSlide>
        <div class="header-bg-1">
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="header-bg-2">
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div class="header-bg-3">
        </div>
      </SwiperSlide>
      <div class="container">
        <div class="blockquote px-16 px-md-32 position-absolute rounded-4">
          <h2 class="fs-36 fs-sm-48 text-dark mb-16">
            找尋像好友一樣的音樂導師
          </h2>
          <h3 class="fs-6 text-dark mb-24">
            在這裡與熱愛音樂的導師相遇，將你的音樂激情傾注其中。
          </h3>
          <div class="mb-8 position-relative">
            <input class="form-control form-control-lg" 
                    list="datalistOptions" 
                    id="homeInput" 
                    placeholder="我想學習..."
                    v-model="selectCourseName"
                    >
            <label for="homeInput" class="position-absolute home-input d-flex align-items-center" 
                    @click.prevent="goAllCourses()">
              <span class="material-symbols-outlined align-middle text-gray-600 cursor-pointer lh-lg">search</span>
            </label>
          </div>
          <div class="home-pills">
            <a href="#" @click.prevent="goAllCourses('鋼琴')">
              <span class="badge rounded-pill text-bg-primary text-dark me-8 fw-normal">鋼琴</span>
            </a>
            <a href="#" @click.prevent="goAllCourses('編曲')">
              <span class="badge rounded-pill text-bg-primary text-dark me-8 fw-normal">編曲</span>
            </a>
            <a href="#" @click.prevent="goAllCourses('流行歌唱')">
              <span class="badge rounded-pill text-bg-primary text-dark me-8 fw-normal">流行歌唱</span>
            </a>
            <a href="#" @click.prevent="goAllCourses('木吉他')">
              <span class="badge rounded-pill text-bg-primary text-dark me-8 fw-normal">木吉他</span>
            </a>
          </div>
        </div>
      </div>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade';
import { mapActions, mapState, mapWritableState } from 'pinia'
import filterStore from '@/stores/filterStore'
import goStore from '../stores/goStore'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapWritableState(filterStore, ['selectCourseName']),

  },
  methods: {
    ...mapActions(goStore, ['goAllCourses']),
  },
}
</script>

<style lang="scss" scoped>
  .header-bg-1 {
    background-image: url('../assets/images/home-header-1.jpg');
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
  }
  .header-bg-2 {
    background-image: url('../assets/images/home-header-2.jpg');
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
  }
  .header-bg-3 {
    background-image: url('../assets/images/home-header-3.jpg');
    background-size: cover;
    background-position: center center;
    min-height: 100vh;
  }
  .blockquote {
    background: hsla(0,0%,100%,.3);  
    top: 50%;
    transform: translate(0, -50%);
    z-index: 500;
    backdrop-filter: blur(5px);
    /* stylings */
    padding: 1em 0;
    border-radius: .3em;
    // margin: 0 auto;
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
	              0 .5em 1em rgba(0, 0, 0, 0.6);
	  text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
    @media (max-width: 576px) {
      width: 95%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .home-pills {
    a :hover{
      scale: 1.1;
    }
  }
  .home-input {
    top: 2px;
    right: 5px;
  }
</style>
