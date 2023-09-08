<template>
  <div class="container">
    <swiper
      :loop="true"
      :slidesPerView="1"
      :spaceBetween="20"
      :freeMode="true"
      :pagination="{clickable: true}"
      navigation
      :scrollbar="{ draggable: true }"
      :breakpoints="{
      '576': {
        slidesPerView: 1,
        spaceBetween: 26,
        },
      '768': {
        slidesPerView: 2,
        spaceBetween: 26,
        },
      '992': {
        slidesPerView: 2,
        spaceBetween: 26,
        },
      '1400': {
        slidesPerView: 3,
        spaceBetween: 26,
        },
      }"
      class="mySwiper px-24"
    >


      <SwiperSlide v-for="(item) in youLikeCourses" :key="item.id" class="mb-32">
        <div class="course-card">
          <div class="meta cursor-pointer" 
              @click="goCoursePage(item.id)">
            <div class="photo" 
                :style="{backgroundImage: `url(${item.data.courseImg})`}">
            </div>
            <ul class="details d-flex flex-column">
              <li class="fs-6">
                <i class="bi bi-tags me-6"></i>
                {{ item.data.courseCategory }}
              </li>
              <li class="mt-auto ms-auto fs-5">
                <i class=""
                :class="bookmarkState(item.id)"
                @click.stop="toggleBookmark(item.id)"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="加入 / 移除收藏"
                ></i>
              </li>
            </ul>
          </div>
          <div class="description cursor-pointer"
              @click="goCoursePage(item.id)">
            <h2 class="fs-5 fw-bold d-flex">
              {{ item.data.courseName }}
            </h2>
            <h3 class="fs-6">by {{ item.data.displayName }}</h3>
            <p class="d-flex align-items-center"> 
              <span class="material-symbols-outlined fs-3 me-4">timer</span>
              {{ item.data.time }}
              <span class="material-symbols-outlined fs-3 ms-8 me-4">map</span>
              {{ item.data.cityName || '線上' }}
              <span class="material-symbols-outlined fs-3 ms-8 me-4">group</span>
              {{ item.data.whoBuy.length}}
            </p>
          </div>
          <div class="px-16 pb-16 mt-auto">
            <span class="fs-5 fw-bold">NT$ {{ $filters.currency(item.data.price) }}</span>
          </div>
        </div>
      </SwiperSlide>
        
    </swiper>
  </div>
</template>

<script>
  // Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import { Navigation, FreeMode, Pagination, Scrollbar } from 'swiper'
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import dataStore from '@/stores/dataStore'
import goStore from '@/stores/goStore'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      // modules: [Navigation, FreeMode, Pagination, Scrollbar]
    }
  },
  computed: {
    ...mapState(dataStore, ['coursesData', 'bookmarkState', 'youLikeCourses'])
  },
  methods: {
    ...mapActions(dataStore, ['toggleBookmark', 'getOneCoursesFirebaseData']),
  },
  created () {
    // this.getBookmarkCoursesData()
  }
};
</script>


<style lang="scss" scoped>

</style>