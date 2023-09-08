<template>
  <div class="container mt-32">
    <div class="row">
      <div class="col-12 col-lg-8">
        <div class="pe-xl-48 mt-16">
          <img :src="beATeacherData.courseImg" alt="課程圖片" class="course-photo rounded-4">
        </div>
      </div>
      <div class="col-12 col-lg-4 d-flex flex-column mt-16">
        <h1 class="fs-2 fw-bold">{{ beATeacherData.courseName }}</h1>
        <p class="mt-16 text-delete">{{ beATeacherData.courseIntro}}</p>
      </div>
    </div>
  </div>

  <div class="container mt-32">
    <div class="row align-items-start">
      <!-- 老師簡介&課程細項 -->
      <div class="col-12 col-lg-8">
        <div class="row align-items-center"
          @click="getOneTeacherFirebaseData(teacherData.uid)">
          <div class="col-auto cursor-pointer">
            <img :src="teacherData.teacherImg" alt="老師照片" class="user-photo">
          </div>
          <div class="col-auto fs-2 cursor-pointer">
            {{ teacherData.displayName }}
          </div>
        </div>
        <div class="row my-3">
          <div class="col-12 col-lg-10">
            {{ teacherData.teacherIntro }}
          </div>
        </div>
        <p class="fs-4 mb-8 fw-bold">關於課程</p>
        <div class="row row-cols-2 my-3 g-3">
          <div class="col-auto">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">timer</span>
              <span class="text-delete fs-7">
                課程時長<br><span class="fs-6 text-dark fw-bold">{{ beATeacherData.time }}分鐘</span>
              </span>
            </div>
          </div>
          <div class="col-auto">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">group</span>
              <span v-if="beATeacherData.whoBuy" class="text-delete fs-7">
                已被購買 <br> <span class="fs-6 text-dark fw-bold">{{ beATeacherData.whoBuy.length || 0 }} 次</span>
              </span>
            </div>
          </div>
          <div class="col-auto"
                v-if="beATeacherData.cityName">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">map</span>
              <span class="text-delete fs-7">
                上課地點<br> <span class="fs-6 text-dark fw-bold">{{ beATeacherData.cityName }}</span>
              </span>
            </div>
          </div>
          <div class="col-12 col-xl-auto">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">school</span>
              <div>
                <span class="text-delete fs-7">
                  上課方式
                </span>
                <br>
                <span class="fs-6 bg-primary rounded px-2 text-dark fw-bold me-8"
                      v-for="item in beATeacherData.courseMethod" :key="item">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- 別人的課顯示 -->
      <div class="col-12 col-lg-4 p-32 border sticky-course-page rounded-4">
        <h4 class="border-bottom pb-24 mb-24">購買單堂課程</h4>
        <div class="mb-3">
          <span class="fs-5 me-16">售價</span>
          <span class="fs-1">NT${{ $filters.currency(beATeacherData.price) }}</span> 
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-outline-primary w-75">
            立即購買
          </button>
          <button type="button" class="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="加入購物車"
          >
          <span class="material-symbols-outlined fs-3 align-middle">shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
        <div class="row justify-content-center mt-16 mb-32">
      <div class="col-12 d-flex justify-content-between">
        <button type="button" class="btn btn-outline-primary px-48"
                   @click="goBeATeacherStep2()">
            上一步
        </button>
        <button type="button" class="btn btn-primary px-48"
                  @click="goBeATeacherStep4(), SetFirebaseCourseData()">
            下一步
        </button>
      </div>
    </div>
  </div>


</template>

<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import dataStore from '@/stores/dataStore'
import goStore from '@/stores/goStore'
import bannerStore from '@/stores/bannerStore'

export default {
  computed: {
    ...mapState(dataStore, ['beATeacherData','teacherData']),
    ...mapWritableState(dataStore, ['createCourseStep'])
  },
  methods: {
    ...mapActions(goStore, ['goBeATeacherStep2', 'goBeATeacherStep4']),
    ...mapActions(dataStore, ['SetFirebaseCourseData']),
    ...mapActions(bannerStore, ['getBannerInfo'])
    
  },
  created () { 
    this.getBannerInfo(
      new URL('../assets/images/banner.jpg', import.meta.url).href,
      'PREVIEW',
      '頁面預覽 ',
      '一探學習體驗，預覽您的課程頁面，確保效果完美呈現'
    )
    this.createCourseStep = 3
  }
}
</script>

<style lang="scss" scoped>
.user-photo {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  object-fit: cover;
}
.course-photo {
  width: 100%;
  height: 500px;
  @media (max-width: 768px)  {
    height: 300px;
  }
  @media (max-width: 576px)  {
    height: 200px;
  }
}
</style>