<template>
  <div class="col"
        v-for="item in courseCardData" :key="item.id">
    <div class="course-card h-100">
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
          <span class="material-symbols-outlined fs-6 me-4">timer</span>
          {{ item.data.time }}
          <span class="material-symbols-outlined fs-6 ms-8 me-4">map</span>
          {{ item.data.cityName || '線上' }}
          <span class="material-symbols-outlined fs-6 ms-8 me-4">group</span>
          {{ item.data.whoBuy.length}}
        </p>
      </div>
      <div class="px-16 pb-16 mt-auto">
        <span class="fs-5 fw-bold">NT$ {{ $filters.currency(item.data.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import dataStore from '@/stores/dataStore'
import courseCardStore from '@/stores/courseCardStore'
import filterStore from '@/stores/filterStore'
import goStore from '@/stores/goStore'

export default {
  watch: {
    // 所有課程頁面用(為了搜尋排序)
    currentPageCoursesData() {
      if (this.$router.currentRoute.value.fullPath === '/AllCourses'){
        this.courseCardData = this.currentPageCoursesData
      }
    },
    // 為了收藏頁變動時能重新渲染
    userBookmarkCourses () {
      if (this.$router.currentRoute.value.fullPath === '/MyCourses' && this.myCoursesState === 'bookmark')
      this.courseCardData = this.userBookmarkCourses
    }
  },
  computed: {
    ...mapState(dataStore, ['bookmarkState', 'userStudentCourses', 'userBookmarkCourses', 'myCoursesState']),
    ...mapWritableState(courseCardStore, ['courseCardData']),
    ...mapState(filterStore, ['currentPageCoursesData']),
  },
  methods: {
    ...mapActions(dataStore, ['toggleBookmark', 'getOneCoursesFirebaseData']),
    ...mapActions(goStore, ['goCoursePage']),

  },
  created () {
    if (this.$router.currentRoute.value.fullPath === '/AllCourses') {
      this.courseCardData = this.currentPageCoursesData
    } else if (this.$router.currentRoute.value.fullPath === '/MyCourses') {
      this.courseCardData = this.userStudentCourses
    }
  }
}
</script>

<style lang="scss" scoped>

</style>