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
      <SwiperSlide v-for="(item) in 5" :key="item" class="mb-32">
        <div class="card rounded-3 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="me-2">
                <img src="../assets/images/預設大頭貼.png" alt="用戶大頭照" class="user-photo">
              </div>
              <div class="">
                <div>
                  <span class="fw-bold me-2">王小明</span>
                  <span>2023-08-09</span>
                </div>
                <div class="text-warning">
                  <i class="bi bi-star-fill me-1"></i>
                  <i class="bi bi-star-fill me-1"></i>
                  <i class="bi bi-star-fill me-1"></i>
                  <i class="bi bi-star-fill me-1"></i>
                  <i class="bi bi-star-fill me-1"></i>
                </div>
              </div>
            </div>
            <div>
              <p class="fw-bold my-2">推薦給所有想學音樂的同學</p>
              <p>
                這個音樂家教課程真是太棒了！老師不僅專業且充滿耐心，每次上課都讓我深刻理解音樂的精髓。透過個人指導，我不僅學會了演奏技巧，還能自信地創作自己的音樂作品。感謝老師用心的教學，讓我愛上了音樂，這是一段美妙的學習旅程！
              </p>
            </div>
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

  },
  methods: {

  },
  created () {
  }
};
</script>

<style lang="scss" scoped>
.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
}
</style>