<template>
  <BannerCom />
  <!-- Loading -->
  <CoursesLoading class="my-3" v-if="loading"/>
  <!-- 搜尋、排序 -->
  <div class="container mt-3 fs-7 fs-sm-6" v-if="!loading">
    <div class="row align-items-center g-8">
      <!-- 技能 -->
      <div class="col-12 col-xl-auto me-lg-1">
        <div class="row g-1 align-items-center">
          <div class="col-auto">
            <label for="selectCourseCategory" class="col-form-label">
              音樂技能：
            </label>
          </div>
          <div class="col-4 col-md-2 col-xl-auto">
            <select class="form-select fs-7 fs-sm-6" aria-label="Default select example"
                  id="selectCourseCategory"
                  v-model="selectCourseCategory">
            <option value="" selected>請選擇</option>
            <option value="短笛">短笛</option>
            <option value="長笛">長笛</option>
            <option value="單簧管">單簧管</option>
            <option value="雙簧管">雙簧管</option>
            <option value="英國管">英國管</option>
            <option value="巴松管">巴松管</option>
            <option value="薩克斯風">薩克斯風</option>
            <option value="管風琴">管風琴</option>
            <option value="小號">小號</option>
            <option value="短號">短號</option>
            <option value="長號">長號</option>
            <option value="法國號">法國號</option>
            <option value="低音號">低音號</option>
            <option value="巴里東">巴里東</option>
            <option value="上低音號">上低音號</option>
            <option value="小提琴">小提琴</option>
            <option value="中提琴">中提琴</option>
            <option value="大提琴">大提琴</option>
            <option value="低音提琴">低音提琴</option>
            <option value="豎琴">豎琴</option>
            <option value="斑鳩琴">斑鳩琴</option>
            <option value="曼陀林">曼陀林</option>
            <option value="大鍵琴">大鍵琴</option>
            <option value="魯特琴">魯特琴</option>
            <option value="爵士鼓">爵士鼓</option>
            <option value="木箱鼓">木箱鼓</option>
            <option value="木琴">木琴</option>
            <option value="馬林巴琴">馬林巴琴</option>
            <option value="鋼琴">鋼琴</option>
            <option value="數位鋼琴">數位鋼琴</option>
            <option value="傳統電子琴">傳統電子琴</option>
            <option value="電子琴">電子琴</option>
            <option value="電子合成器">電子合成器</option>
            <option value="揚琴">揚琴</option>
            <option value="中國笛">中國笛</option>
            <option value="笙">笙</option>
            <option value="嗩吶">嗩吶</option>
            <option value="蕭">蕭</option>
            <option value="胡琴">胡琴</option>
            <option value="古箏">古箏</option>
            <option value="柳琴">柳琴</option>
            <option value="琵琶">琵琶</option>
            <option value="阮">阮</option>
            <option value="其他中國樂器">其他中國樂器</option>
            <option value="木吉他">木吉他</option>
            <option value="古典吉他">古典吉他</option>
            <option value="電吉他">電吉他</option>
            <option value="烏克麗麗">烏克麗麗</option>
            <option value="電貝斯">電貝斯</option>
            <option value="口琴">口琴</option>
            <option value="手風琴">手風琴</option>
            <option value="手碟鼓">手碟鼓</option>
            <option value="其它樂器">其它樂器</option>
            <option value="編曲">編曲</option>
            <option value="作曲">作曲</option>
            <option value="詞曲創作">詞曲創作</option>
            <option value="配樂">配樂</option>
            <option value="錄音">錄音</option>
            <option value="音效">音效</option>
            <option value="成音工程">成音工程</option>
            <option value="混音">混音</option>
            <option value="樂理">樂理</option>
            <option value="聽寫">聽寫</option>
            <option value="音樂理論">音樂理論</option>
            <option value="流行歌唱">流行歌唱</option>
            <option value="聲樂">聲樂</option>
            <option value="音樂劇">音樂劇</option>
            <option value="和聲">和聲</option>
            <option value="視唱">視唱</option>
            <option value="B-BOX">B-BOX</option>
            <option value="Acappella">Acappella</option>
            <option value="指揮">指揮</option>
            <option value="音樂治療">音樂治療</option>
            <option value="DJ">DJ</option>
            <option value="合奏指導">合奏指導</option>
            <option value="音樂軟體">音樂軟體</option>
            <option value="樂器製作">樂器製作</option>
            <option value="其它非樂器類">其它非樂器類</option>
            </select>
            <!-- <input type="text" id="selectCourseCategory" class="form-control w-75" aria-labelledby="selectCourseCategory"
            v-model="selectCourseCategory"> -->
            
          </div>

        </div>      
      </div>
      <!-- 地點 -->
      <div class="col-12 col-xl-auto me-lg-1">
        <div class="row g-1 align-items-center">
          <div class="col-auto">
            <label for="selectCityName" class="col-form-label">
              上課方式：
            </label>
          </div>
          <div class="col-4 col-md-2 col-xl-auto">
            <select class="form-select fs-7 fs-sm-6" 
                    aria-label="Default select example"
                    id="selectCityName"
                    v-model="selectCourseMethod"
                    @change="selectCityNameCancel()">
              <option value="" selected>請選擇</option>
              <option v-for="item in courseMethod" 
                      :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="col-4 col-md-2 col-xl-auto"
              v-if="selectCourseMethod === '在老師家' || selectCourseMethod === '在學生家'">
            <select class="form-select fs-7 fs-sm-6" aria-label="Default select example"
                    id="selectCityName"
                    v-model="selectCityName">
              <option value="" selected>選擇地點</option>
              <option value="台北市">台北市</option>
              <option value="基隆市">基隆市</option>
              <option value="新北市">新北市</option>
              <option value="宜蘭縣">宜蘭縣</option>
              <option value="桃園市">桃園市</option>
              <option value="新竹市">新竹市</option>
              <option value="新竹縣">新竹縣</option>
              <option value="苗栗縣">苗栗縣</option>
              <option value="台中市">台中市</option>
              <option value="彰化縣">彰化縣</option>
              <option value="南投縣">南投縣</option>
              <option value="嘉義市">嘉義市</option>
              <option value="嘉義縣">嘉義縣</option>
              <option value="雲林縣">雲林縣</option>
              <option value="台南市">台南市</option>
              <option value="高雄市">高雄市</option>
              <option value="澎湖縣">澎湖縣</option>
              <option value="金門縣">金門縣</option>
              <option value="屏東縣">屏東縣</option>
              <option value="台東縣">台東縣</option>
              <option value="花蓮縣">花蓮縣</option>
              <option value="連江縣">連江縣</option>
            </select>
          </div>
        </div>
      </div>
      <!-- 名稱 -->
      <div class="col-12 col-md-auto col-lg-auto">
        <div class="row g-1 align-items-center">
          <div class="col-auto">
            <label for="selectCourseName" class="col-form-label">課程名稱：</label>
          </div>
          <div class="col-8 me-24 col-xl-auto">
            <input type="search" id="selectCourseName" class="form-control fs-7 fs-sm-6" aria-labelledby="searchHelpInline"
            placeholder="請輸入課程名稱"
            v-model="selectCourseName">
          </div>
        </div>
      </div>
      <!-- 排序 -->
      <div class="col-auto ms-md-auto">
        <div class="row g-1 align-items-center">
          <div class="col-auto">
            <label for="sort" class="col-form-label">
              排序：<span class="d-md-none">&emsp;&emsp;</span>
            </label>
          </div>
          <div class="col-auto">
            <select class="form-select fs-7 fs-sm-6" 
                    aria-label="Default select example"
                    id="sort"
                    v-model="selectSortMethod"
                    @change="courseSort()">
              <option value="" selected>請選擇</option>
              <option v-for="item in sortMethod" 
                      :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <!-- 排列方式 -->
      <div class="col-auto ms-auto ms-md-2 cursor-pointer">
        <i class="bi bi-grid-fill text-primary fs-2"
            v-if="displayState === 'grid'"
            @click="displayState = 'list'"
        >
        </i>
        <i class="bi bi-list-task text-primary fs-2"
            v-if="displayState === 'list'"
            @click="displayState = 'grid'"
        >
        </i>
      </div>
    </div>
  </div>

  <!-- 卡片課程 -->
  <div class="container my-3" v-if="!loading">
    <!-- 無課程提示 -->
    <div class="row" v-if="filterData.length == 0">
      <div class="col text-center fs-2 mt-48">
        很抱歉，沒有符合條件課程
      </div>
    </div>
    <!-- 卡片課程 -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-16"
         v-if="displayState === 'grid'">
      <CourseCard />
    </div>
      <!-- 條列課程 -->
    <div v-if="displayState === 'list'">
      <div class="w-100 w-lg-70 w-xl-60">
        <CourseCardList />
      </div>
    </div>
  </div>

  <!-- 分頁鈕 -->
  <PaginationCom v-if="!loading" />
</template>
  
<script>
import PaginationCom from '../components/PaginationCom.vue'
import CoursesLoading from '../components/CoursesLoading.vue'
import BannerCom from '../components/BannerCom.vue'
import CourseCard from '../components/CourseCard.vue'
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import dataStore from '@/stores/dataStore'
import filterStore from '@/stores/filterStore'
import bannerStore from '@/stores/bannerStore'
import courseCardStore from '@/stores/courseCardStore'
import CourseCardList from '../components/CourseCardList.vue'

export default {
  components: { PaginationCom, CoursesLoading, BannerCom, CourseCard, CourseCardList },
  computed: {
    ...mapState(dataStore, ['loading']),
    ...mapState(filterStore, ['filterData','courseMethod', 'sortMethod', 'currentPageCoursesData']),
    ...mapWritableState(dataStore, ['myCoursesState', 'displayState']),
    ...mapWritableState(filterStore, ['selectCityName', 'selectCourseCategory', 'selectCourseName','selectCourseMethod', 'selectSortMethod']),
    ...mapWritableState(courseCardStore, ['courseCardData']),

  },
  methods: {
    ...mapActions(dataStore, ['onAuthStateChanged', 'getOneCoursesFirebaseData']),
    ...mapActions(filterStore, ['selectCityNameCancel', 'courseSort']),
    ...mapActions(bannerStore, ['getBannerInfo'])

  },
  created () {
    this.onAuthStateChanged()
    this.courseSort()
    this.getBannerInfo(
      new URL('../assets/images/banner.jpg', import.meta.url).href,
      'ALL COURSES',
      '全部課程',
      '專業培訓，探索多元音樂風格'
    )
    this.displayState = 'grid'
    this.myCoursesState = 'bookmark'
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
  .scale{
    cursor:pointer;
    &:hover{
      img{
        transform: scale(1.15);
      }
      .bookmark-off{
        top: -15px;
      }
      .filter-grayscale {
        -webkit-filter:grayscale(0);
      }
    }
  }
.card-img-top { 
  height: 180px;
  object-fit: cover;
  transition: 0.5s;
}
.bookmark-off {
  font-size: 40px;
  position: absolute;
  right: 5px;
  top: -55px;
  z-index: 10;
  transition: 0.5s;
}
.bookmark-on {
  font-size: 40px;
  position: absolute;
  right: 5px;
  top: -15px;
  z-index: 10;
}
.filter-grayscale {
  -webkit-filter:grayscale(0);
}
  // 橫向專用
  .table-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}
</style>