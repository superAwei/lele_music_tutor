<template>

<div class="container">
  <div class="row my-16">
    <div class="col-12 col-lg-3 d-flex flex-column align-items-center mb-32 py-32 shadow h-100">
      <div class="user-photo position-relative mb-16">
        <img :src="teacherData.teacherImg" alt="大頭照"
              v-if="teacherData.teacherImg">
        <img src="../assets/images/預設大頭貼.png" alt="預設大頭照"
              v-if="!teacherData.teacherImg">
      </div>
      <!-- 姓名 -->
      <div class="mb-8 fs-3 fw-bold position-relative">
        {{ teacherData.displayName }}
        <i :class="teacherData.gender"></i>
      </div>
      <RouterLink to="/MemberPage">
        <button type="button" class="btn btn-primary mt-48">
          編輯個人資料
        </button>
      </RouterLink>
    </div>
    <div class="col-12 col-md-9">
      <!-- 進度條 -->
      <!-- <div class="mb-16 shadow">
        <h2 class="fs-3">完成個人資訊，獲得生日優惠禮與更精準的課程推薦</h2>

      </div> -->
      <!-- 帳號驗證 -->
      <table class="table table-hover align-middle shadow">
        <tbody>
          <!-- 信箱 -->
          <tr>
            <td>
              <div class="d-flex justify-content-between align-items-center mx-16 ">
                <div class="d-flex align-items-center">
                  <div class="login-logo d-flex justify-content-center align-items-center">
                    <img src="../assets/images/LOGO.png" alt="樂樂LOGO">
                  </div>
                  <div class="ms-32">
                    <p class="fs-6" v-if="!ProviderState.password">尚未建立樂樂帳號</p>
                    <p class="fs-6" v-else>已連結樂樂帳號</p>
                  </div>
                </div>
                <div class="">
                  <a href="#" @click.prevent>
                    建立並連結帳號
                  </a>
                </div>
              </div>
            </td>
          </tr>
          <!-- google -->
          <tr>
            <td>
              <div class="d-flex justify-content-between align-items-center mx-16">
                <div class="d-flex align-items-center">
                  <div class="login-logo d-flex justify-content-center align-items-center">
                    <img src="../assets/images/google-icon.png" alt="google-icon">
                  </div>
                  <div class="ms-32">
                    <p class="fs-6" v-if="!ProviderState.google">尚未連結Google帳號</p>
                    <p class="fs-6" v-else>已連結Google帳號</p>
                  </div>
                </div>
                <div class="">
                  <a href="#" @click.prevent>
                    建立並連結帳號
                  </a>
                  <!-- <a href="#" @click.prevent="signInWithGoogle(), AccountSettingState = true">
                    建立並連結帳號
                  </a> -->
                </div>
              </div>
            </td>
          </tr>
          <!-- facebook -->
          <tr>
            <td>
              <div class="d-flex justify-content-between align-items-center mx-16">
                <div class="d-flex align-items-center">
                  <div class="login-logo d-flex justify-content-center align-items-center">
                    <img src="../assets/images/facebook-icon.png" alt="facebook-icon">
                  </div>
                  <div class="ms-32">
                    <p class="fs-6" v-if="!ProviderState.facebook">尚未連結Facebook帳號</p>
                    <p class="fs-6" v-else>已連結Facebook帳號</p>
                  </div>
                </div>
                <div class="">
                  <a href="#" @click.prevent>
                    建立並連結帳號
                  </a>
                  <!-- <a href="#" @click.prevent="signInWithFacebook(), AccountSettingState = true">
                    建立並連結帳號
                  </a> -->
                </div>
              </div>
            </td>
          </tr>
          <!-- GitHub -->
          <tr>
            <td>
              <div class="d-flex justify-content-between align-items-center mx-16">
                <div class="d-flex align-items-center">
                  <div class="login-logo d-flex justify-content-center align-items-center">
                    <img src="../assets/images/github-icon.png" alt="github-icon"
                    :class="{'filter-grayscale': !ProviderState.github}">
                  </div>
                  <div class="ms-32">
                    <p class="fs-6" v-if="!ProviderState.github">尚未連結GitHub帳號</p>
                    <p class="fs-6" v-else>已連結GitHub帳號</p>
                  </div>
                </div>
                <div class="">
                  <a href="#" @click.prevent>
                    建立並連結帳號
                  </a>
                  <!-- <a href="#" @click.prevent="signInWithGithub(), AccountSettingState = true">
                    建立並連結帳號
                  </a> -->
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 生日 -->
      <div class="">

      </div>
      <!-- 專業相關 -->
    </div>
  </div>
</div>



<!-- {{ ProviderState }}
{{ userProviderData }}<br> -->


<!-- <br>
<a href="#" @click.prevent="getCurrentUser()">查詢當前登入</a>
<br>
<a href="#" @click.prevent="updateUserEmail()">設置信箱</a>
<br>
 -->
</template>
  




<script>
import { mapState, mapActions, mapWritableState } from 
'pinia' 
import loginStore from '@/stores/loginStore'
import dataStore from '@/stores/dataStore'
export default {
  computed: {
    ...mapState(dataStore, ['user', 'teacherData']),
    ...mapState(loginStore, ['userProviderData', 'ProviderState']),
    ...mapWritableState(loginStore, ['AccountSettingState']),

  },
  methods: {
    ...mapActions(dataStore, ['onAuthStateChanged']),
    ...mapActions(loginStore, ['signInWithGoogle' , 'signInWithFacebook', 'signInWithGithub', 'getCurrentUser', 'updateUserEmail', 'sendEmailVerification', 'sendPasswordResetEmail']),
  },
  created () {
    this.onAuthStateChanged()
    this.getCurrentUser()
  },
}
</script>

<style lang="scss" scoped>
.login-logo {
  border: 1px solid #ced4da ;
  border-radius: 6px;
  width: 96px;
  height: 48px;
  img {
    width: 32px;
    height: 32px;
  }
}

.user-photo {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 50px;
  }
}
.upload-icon { 
  position: absolute;
  right: -3px;
  bottom: 0px;
  z-index: 10;
  font-size: 20px;
  background: white;
  color: rgba(108, 117, 125, 1);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid;
}
</style>