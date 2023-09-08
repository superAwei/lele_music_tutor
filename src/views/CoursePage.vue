<template>
  <!-- 課程圖片&說明 -->
  <div class="container mt-32" v-if="!loading">
    <div class="row justify-content-between">
      <div class="col-12 col-lg-8">
        <div class="pe-xl-48">
          <img :src="courseData.courseImg" alt="課程圖片" class="course-photo rounded-4">
        </div>
      </div>
      <div class="col-12 col-lg-4 d-flex flex-column mt-32 mt-lg-0">
        <h1 class="fs-2 fw-bold">{{ courseData.courseName }}</h1>
        <p class="my-16 text-delete">{{ courseData.courseIntro}}</p>
        <a href="#" class="border border-primary px-16 py-8 text-primary mt-auto ms-auto cursor-pointer rounded-pill"
            @click.prevent="toggleBookmark(courseData.id)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="加入 / 移除收藏">
          <i class="bookmark" :class="bookmarkState(courseData.id)"></i>
          收藏
        </a>
      </div>
    </div>
  </div>
  <!-- 其他說明 -->
  <div class="container mt-32" v-if="!loading">
    <div class="row align-items-start">
      <!-- 老師簡介&課程細項 -->
      <div class="col-12 col-lg-8">
        <div class="row align-items-center"
          @click="getOneTeacherFirebaseData(courseData.uid)">
          <div class="col-auto cursor-pointer">
            <img :src="courseData.teacherImg" alt="老師照片" class="user-photo">
          </div>
          <div class="col-auto fs-2 cursor-pointer">
            {{ courseData.displayName }}
          </div>
        </div>
        <div class="row mt-16 mb-32">
          <div class="col-12 col-lg-10">
            {{ courseData.teacherIntro }}
          </div>
        </div>
        <p class="fs-4 mb-16 fw-bold">關於課程</p>
        <div class="row mb-32 g-3">
          <div class="col-auto">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">timer</span>
              <span class="text-delete fs-7">
                課程時長<br><span class="fs-6 text-dark fw-bold">{{ courseData.time }}分鐘</span>
              </span>
            </div>
          </div>
          <div class="col-auto">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">group</span>
              <span v-if="courseData.whoBuy" class="text-delete fs-7">
                已被購買 <br> <span class="fs-6 text-dark fw-bold">{{ courseData.whoBuy.length || 0 }} 次</span>
              </span>
            </div>
          </div>
          <div class="col-auto"
                v-if="courseData.cityName">
            <div class="d-flex align-items-center">
              <span class="material-symbols-outlined fs-1 me-8">map</span>
              <span class="text-delete fs-7">
                上課地點<br> <span class="fs-6 text-dark fw-bold">{{ courseData.cityName }}</span>
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
                      v-for="item in courseData.courseMethod" :key="item">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- 別人的課顯示 -->
      <div class="col-12 col-lg-4 p-32 border sticky-course-page rounded-4"
          v-if="this.user.uid !== courseData.uid">
        <h4 class="border-bottom pb-24 mb-24">購買單堂課程</h4>
        <div class="mb-3">
          <span class="fs-5 me-16">售價</span>
          <span class="fs-1">NT${{ $filters.currency(courseData.price) }}</span> 
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-outline-primary w-75"
                  @click="buyNow(user.uid, courseData.id)">
            立即購買
          </button>
          <button type="button" class="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="加入購物車"
                  @click="addCart(user.uid, courseData.id)">
                  <span class="material-symbols-outlined fs-3 align-middle">shopping_cart</span>
          </button>
        </div>
      </div>
      <!-- 自己的課顯示 -->
      <div class="col-12 col-lg-4 p-32 border sticky-course-page rounded-4"
          v-if="this.user.uid === courseData.uid">
        <h4 class="border-bottom pb-24 mb-24">購買人數</h4>
        <div class="mb-3">
          <span class="fs-5 me-1">共</span>
          <span class="fs-1" v-if="courseData.whoBuy">
            {{ courseData.whoBuy.length || 0}}人
          </span> 
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <button type="button" class="btn btn-outline-primary w-25"
          data-bs-toggle="modal" data-bs-target="#editMyCourseModal">
            編輯
          </button>
          <span class="text-primary fs-8">(課程審核通過後將無法再編輯)</span>
        </div>
      </div>
      <!-- 課程評價 -->
      <div class="row mb-32 mt-32 mt-lg-0">
        <div class="col-12 col-lg-8">
          <p class="fs-4 mb-16 fw-bold">課程評價</p>
          <feedback-com/>
        </div>
      </div>
      <!-- 猜你喜歡 -->
      <div class="row mb-32">
        <div class="col-12 col-lg-8">
          <p class="fs-4 mb-16 fw-bold">猜你喜歡</p>
          <you-like-courses />
        </div>
      </div>
    </div>
  </div>


  <!-- 編輯Modal -->
  <edit-my-course-modal></edit-my-course-modal>

</template>
  
<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import dataStore from '@/stores/dataStore'
import goStore from '@/stores/goStore'
import EditMyCourseModal from '../components/EditMyCourseModal.vue'
import cartStore from '../stores/cartStore'
import FeedbackCom from '../components/FeedbackCom.vue'
import YouLikeCourses from '../components/YouLikeCourses.vue'

export default {
  components: { EditMyCourseModal, FeedbackCom, YouLikeCourses },
  data () {
    return {
      id: ''
    }
  },
  computed: {
    ...mapState(dataStore, ['bookmarkState','user','teacherData', 'loading']),
    ...mapWritableState(dataStore, ['courseData']),
  
  },
  methods: {
    ...mapActions(dataStore, ['onAuthStateChanged','toggleBookmark','getOneCoursesFirebaseData', 'getOneTeacherFirebaseData']),
    ...mapActions(cartStore, ['addCart','buyNow']),
    
  },
  created () {
    this.onAuthStateChanged()
    // 防止從新整理產生讀不到資料
    this.id = this.$route.params.coursePageId
    this.getOneCoursesFirebaseData(this.id)

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
// 桌面版才有固定效果
.sticky-course-page {
  @media (min-width:992px) {
    position: sticky;
    top: 100px;
  }
}
.bookmark {
  color: #ff715f !important;
}
</style>