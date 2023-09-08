<template>
  <div  :class="{ 'bg-white ':  $route.matched[1].path !== '/' || navbarWhite || isMenuOpen,
                  'fixed-top':  $route.matched[1].path == '/',
                  'sticky-top':  $route.matched[1].path !== '/'
                }">
    <nav class="container navbar navbar-expand-lg">
      <div class="container-fluid">
        <h1>
          <RouterLink to="/" class="logo navbar-brand nav-link d-flex">
            <span>樂樂音樂家教媒合平台</span>
          </RouterLink>
        </h1>
        <li class="nav-item position-relative fs-5 d-lg-none d-block ms-auto" 
            v-if="this.isMember === true">  
          <RouterLink to="/CartPage" class="nav-link"
            :class="{ 'text-primary':  $route.name === 'CartPage'}">
            <span class="material-symbols-outlined fs-1 align-middle">shopping_cart</span>
            <div class="bg-primary text-white rounded-circle text-center position-absolute small-num-mobile"
              v-if="studentData.myCart.length">
              {{ studentData.myCart.length }}
            </div>
          </RouterLink>
        </li>
    
        <button class="navbar-toggler ms-16" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" @click="isMenuOpen = !isMenuOpen">
          <!-- <span class="navbar-toggler-icon"></span> -->
          <span class="material-symbols-outlined fs-1 fw-bold" v-if="!isMenuOpen">menu</span>
          <span class="material-symbols-outlined fs-1 fw-bold" v-if="isMenuOpen">close</span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown"
            :class="{'show':isMenuOpen}">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item fs-5">
              <RouterLink to="/CreateCourses/BeATeacherStep1" class="nav-link"
                :class="{ 'text-primary':  $route.matched[1].path === '/CreateCourses'}">
                我要開課
              </RouterLink>
            </li>
            <li class="nav-item fs-5">
              <RouterLink to="/AllCourses" class="nav-link"
                :class="{ 'text-primary':  $route.name === 'AllCourses'}">
                所有課程
              </RouterLink>
            </li>
            <li class="nav-item fs-5">
              <RouterLink to="/UserLogin" class="nav-link"
                  :class="{ 'text-primary':  $route.name === 'UserLogin'}"
                  v-if="this.isMember === false">
                  登入
              </RouterLink> 
            </li>
              <!-- 登入後出現 -->
            <li class="nav-item position-relative fs-5 d-none d-lg-block cursor-pointer" 
                v-if="this.isMember === true"
                @click="myCoursesState = 'bookmark', goBookmark()">
              <div class="nav-link"
                :class="{ 'text-primary':  $route.name === 'MyCourses'}"
              >
                <span class="material-symbols-outlined align-middle fs-3">bookmark</span>
                <div class="bg-primary text-white rounded-circle text-center position-absolute small-num"
                  v-if="bookmarkNum">
                  {{ bookmarkNum }}
                </div>
              </div>
            </li>
            <li class="nav-item position-relative fs-5 d-none d-lg-block me-8" 
                v-if="this.isMember === true">
              <RouterLink to="/CartPage" class="nav-link"
                :class="{ 'text-primary':  $route.name === 'CartPage'}">
                <!-- <i class="bi bi-cart-fill me-lg-2"></i> -->
                <span class="material-symbols-outlined align-middle fs-3">shopping_cart</span>
                <div class="bg-primary text-white rounded-circle text-center position-absolute small-num"
                  v-if="studentData.myCart.length">
                  {{ studentData.myCart.length }}
                </div>
              </RouterLink>
            </li>
            <li class="nav-item dropdown d-lg-flex">  
              <button class="btn dropdown-toggle text-primary ps-0 ps-lg-2 border-0"
                      type="button" id="dropdownLogin" 
                      data-bs-toggle="dropdown" aria-expanded="false"
                      :class="{ 'text-primary':  $route.name === 'UserLogin'}"
                      v-if="this.isMember === true">
                <span class="material-symbols-outlined align-middle fs-3">
                  account_circle
                </span>
                {{ teacherData.displayName }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLogin"
                      v-if="this.isMember === true">
                <li>
                  <RouterLink to="/MemberPage" class="dropdown-item">
                    個人主頁
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/MyCourses" class="dropdown-item">
                    我的課程
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/PayHistory" class="dropdown-item">
                    購買紀錄
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/MyCalendar" class="dropdown-item">
                    行事曆
                  </RouterLink>
                </li>
                <li>
                  <RouterLink to="/AccountSetting" class="dropdown-item">
                    帳戶設定
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#"
                  @click.prevent="signOut()">
                  登出
                </a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import logInStore from '@/stores/logInStore'
import dataStore from '../stores/dataStore';
import windowStore from '@/stores/windowStore'
import goStore from '@/stores/goStore'

export default {
  data() {
    return {
      isMenuOpen : false,
    }
  },
  computed: {
    ...mapState(dataStore, ['user','teacherData', 'isMember', 'studentData', 'bookmarkNum']),
    ...mapWritableState(dataStore, ['myCoursesState']),
    ...mapState(windowStore, ['navbarWhite', 'homeLoading'])
  },
  methods: {
    ...mapActions(logInStore, ['signOut']),
    ...mapActions(goStore,['goBookmark']),
  },
  created () {
    
  },
  mounted() {
    this.isMenuOpen = false; // 重整關閉navbar，順便給漢堡按鈕用
  }
}
</script>


<style lang="scss" scoped>
.logo{
    background-image: url(../assets/images/LOGO.png);
    background-size: cover;
    background-position: center center;
    width: 100px;
    height: 45px;
    display: block;
    text-indent: 101%;
    overflow: hidden;
    white-space: nowrap;
}
.small-num {
  width:18px;
  height: 18px;
  top: 5px;
  left: 23px;
  font-size: 12px;
}
.small-num-mobile{
  width:20px;
  height: 20px;
  top: -12%;
  left: 60%;
  font-size: 12px;
}
.bg-white {
  transition: .4s ease;
}
.fixed-top {
  transition: .4s ease;
}
// 移除漢堡選單邊框、陰影
.navbar-toggler:focus {
  box-shadow: 0 0 0 0;
}
.btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
    border: 0;
    border-color: #ffffff00;
}
</style>
