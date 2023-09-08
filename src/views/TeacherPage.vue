<template>
  <div class="container">
    <div class="row my-16">
      <!-- 個人資料 -->
      <div class="col-12 col-lg-3 d-flex flex-column align-items-center mb-32 py-32 shadow h-100 rounded-4">
        <div class="user-photo position-relative mb-16">
          <img :src="otherTeacherData.teacherImg" alt="大頭照"
                v-if="otherTeacherData.teacherImg">
          <img src="../assets/images/預設大頭貼.png" alt="預設大頭照"
                v-if="!otherTeacherData.teacherImg">
        </div>
        <!-- 姓名 -->
        <div class="mb-8 fs-3 fw-bold position-relative">
          {{ otherTeacherData.displayName }}
          <i :class="otherTeacherData.gender"></i>
        </div>
        <!-- 關於我 -->
        <div class="my-8 w-100">
          <p class="ps-8 fw-bold">關於我：</p>
          <p class="fs-7 p-8">
            {{ otherTeacherData.teacherIntro }}
          </p>
        </div>
        <div class="d-flex justify-content-around w-50 ms-auto mb-8">
          <a :href="otherTeacherData.facebook" target="_black" @click.prevent>
            <i class="bi bi-facebook fs-3 text-secondary"
              :class="{'text-blue': otherTeacherData.facebook}"></i>
          </a>
          <a :href="otherTeacherData.instagram" target="_black" @click.prevent>
            <i class="bi bi-instagram fs-3 text-secondary"
              :class="{'text-danger': otherTeacherData.instagram}"></i>
          </a>
          <a :href="otherTeacherData.discord" target="_black" @click.prevent>
            <i class="bi bi-discord fs-3 text-secondary"
              :class="{'text-purple': otherTeacherData.discord}"></i>
          </a>
          
        </div>
      </div>
      <!-- 課程介紹、其他個人資料 -->
      <div class="col-12 col-lg-9">
        <!-- Banner -->
        <div class="ckeditor-img position-relative shadow rounded-4 mb-16"
            :style="{ 'background-image': `url(${otherTeacherData.ckeditorImg ||defaultCkeditorImg })` }">
        </div>
        <!-- 顯示編輯內容 -->
        <div v-html="otherTeacherData.ckeditor" class="border p-16 shadow rounded-4"></div>
        <!-- 專長 -->
        <div class="my-16">
          <!-- 多選框 -->
          <div class="shadow p-16 rounded-4">
            <div class="row d-flex align-items-center mb-16">
              <p class="col-auto fw-bold">音樂風格：</p>
              <div class="col-9">
                <span class="badge rounded-pill text-bg-primary text-white fs-6 py-8 mx-4 px-16 my-4"
                  v-for="item in otherTeacherData.musicStyle" :key="item">
                  {{ item }}
                </span>
              </div>
            </div>
            <div class="row d-flex align-items-center mb-16">
              <p class="col-auto fw-bold">擅長領域：</p>
              <div class="col-9">
                <span class="badge rounded-pill text-bg-primary text-white fs-6 py-8 mx-4 px-16 my-4"
                  v-for="item in otherTeacherData.expertise" :key="item">
                  {{ item }}
                </span>
              </div>
            </div>
            <div class="row d-flex align-items-center mb-16">
              <p class="col-auto fw-bold">教學語言：</p>
              <div class="col-9">
                <span class="badge rounded-pill text-bg-primary text-white fs-6 py-8 mx-4 px-16 my-4"
                  v-for="item in otherTeacherData.language" :key="item">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import logInStore from '@/stores/logInStore'
import dataStore from '../stores/dataStore';

export default {
  data () {
    return {
      uid: '',
      defaultCkeditorImg: 'https://i.imgur.com/EjLcauL.jpg'
    }
  },
  computed: {
    ...mapState(dataStore, ['user','isMember', 'otherTeacherData']),
    ...mapWritableState(dataStore, [])
  },
  methods: {
    ...mapActions(logInStore, ['signOut']),  
    ...mapActions(dataStore, ['onAuthStateChanged', 'getOneTeacherFirebaseData']),
    
  },
  created () {
    this.onAuthStateChanged()
    // 防止從新整理產生讀不到資料
    this.uid = this.$route.params.TeacherPageId
    this.getOneTeacherFirebaseData(this.uid)
  }
}
</script>

<style lang="scss" scoped>
.user-photo {
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
}
.upload-icon { 
  position: absolute;
  right: -10px;
  bottom: 10px;
  z-index: 10;
  font-size: 40px;
}


.upload-icon-ckeditor {
  position: absolute;
  right: 10px;
  bottom: -10px;
  z-index: 10;
  font-size: 40px;
}
.ckeditor-img {
  height: 400px;
  background-size: cover;
  background-position: center center;
}
</style> 