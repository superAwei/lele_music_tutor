<template>
  <div class="container px-0">
    <swiper
      :loop="true"
      :slidesPerView="1"
      :spaceBetween="20"
      :freeMode="true"
      :scrollbar="{ draggable: true }"
      :breakpoints="{
      '768': {
        slidesPerView: 2,
        spaceBetween: 20,
        },
      '992': {
        slidesPerView: 3,
        spaceBetween: 20,
        },
      '1200': {
        slidesPerView: 4,
        spaceBetween: 20,
        },
      }"
      class="mySwiper px-3"
    >

      <SwiperSlide v-for="(item) in 6" :key="item.id" class="mb-5 overflow-hidden">
        <el-space direction="vertical" alignment="flex-start" class="card border-0">
          <el-skeleton :loading="loading" animated>
            <template #template>
              <el-skeleton-item variant="image" class="loading-img"/>
              <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <el-skeleton-item variant="h3" style="width: 100%;margin-top: 12px;" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 12px;
                    height: 16px;
                  "
                >
                  <el-skeleton-item variant="text" style="width: 25%;margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 25%;margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 25%" />
                </div>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 12px;
                    height: 16px;
                  "
                >
                <el-skeleton-item variant="h3" style="width: 80%;margin-top: 12px;" />
                </div>
              </div>
            </template>

          </el-skeleton>
        </el-space>
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
    ...mapState(dataStore, ['coursesData', 'bookmarkState', 'top6courses', 'loading'])
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
.loading-img{
  height: 180px;
  width: 1508px;
  border-radius: 16px;
  @media (min-width: 575.8px) {
    width: 506px;
  }
  @media (min-width: 767.8px) {
    width: 332px;
  }
  @media (min-width: 991.8px) {
    width: 290px;
  }
  @media (min-width: 1199.8px) {
    width: 260px;
  }
  @media (min-width: 1399.8px) {
    width: 300px;
  }
}

</style>