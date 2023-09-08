<template>
  <div class="container my-32">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-6">
        <div class="progress-container">
          <div class="progress"
              :style="{'width': `${(createCourseStep - 1)*33.3333}%`}">
          </div>
          <!-- <div class="circle fs-4 fw-bold"
          :class="{ 'active': createCourseStep > 0}">
            1
          </div>
          <div class="circle fs-4 fw-bold"
          :class="{ 'active': createCourseStep > 1}">
            2
          </div>
          <div class="circle fs-4 fw-bold"
          :class="{ 'active': createCourseStep > 2}">
            3
          </div>
          <div class="circle fs-4 fw-bold"
          :class="{ 'active': createCourseStep > 3}">
            4
          </div> -->
          <div class="circle fw-bold position-relative"
          :class="{ 'active': createCourseStep > 0}">
            <span class="material-symbols-outlined fs-2">edit_document</span>
            <span class="progress-bar-text position-absolute position-absolute text-dark w-100 fs-8 fs-md-6">填寫資訊</span>
          </div>
          <div class="circle fw-bold position-relative"
          :class="{ 'active': createCourseStep > 1}">
            <span class="material-symbols-outlined fs-2">contract_edit</span>
            <span class="progress-bar-text position-absolute position-absolute text-dark w-100 fs-8 fs-md-6">課程介紹</span>
          </div>
          <div class="circle fw-bold position-relative"
          :class="{ 'active': createCourseStep > 2}">
            <span class="material-symbols-outlined fs-2">preview</span>
            <span class="progress-bar-text position-absolute position-absolute text-dark w-100 fs-8 fs-md-6">預覽頁面</span>
          </div>
          <div class="circle fw-bold position-relative"
          :class="{ 'active': createCourseStep > 3}">
            <span class="material-symbols-outlined fs-2">task_alt</span>
            <span class="progress-bar-text position-absolute position-absolute text-dark w-100 fs-8 fs-md-6">開課完成</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 
'pinia'  
import dataStore from '@/stores/dataStore'


export default {
  computed: {
  ...mapState(dataStore, ['createCourseStep'])
  },
  methods: {

  },
  created () {

  }
}
</script>


<style lang="scss" scoped>
.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.progress-container::before {
  background-color: #e0e0e0;
  content: '';
  height: 4px;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: -1;
}
.progress {
  background-color: #ff715f;
  height: 4px;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: .4s ease;
  width: 0%;
  z-index: -1;
}
.circle {
  align-items: center;
  background-color: #fff;
  border-radius: 50%;
  border: 4px solid  #e0e0e0;
  color: #999;
  display: flex;
  width: 80px;
  height: 80px;
  justify-content: center;
  transition: .4s ease;
  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }
}
.circle.active {
  // border-color: #ff715f;
  // color: #ff715f;
  // new
  border-color: #ff715f;
  background: #ff715f;
  color: #ffffff;
}
.progress-bar-text {
  top: 110%;
  left: 5%;
  @media (max-width: 576px) {
    top: 120%;
  }
 
}
</style>