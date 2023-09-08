<template>
  <BannerCom/>
  <div class="container my-32">
    <CoursesLoadingList v-if="loading" />
    <div class="text-center mt-48"
      v-if="studentData.payHistory.length === 0 && !loading">
      <p class="fs-2 fw-bold">無任何購買紀錄</p>
      <RouterLink to="/AllCourses">
        <button type="button" class="btn btn-outline-primary mt-16">
          前往購買
        </button>
      </RouterLink> 
  </div>

    <div class="card shadow-sm" v-if="studentData.payHistory.length !== 0 && !loading">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="border-bottom-3 fw-bold">
              <tr class="align-middle">
                <th scope="col">購買時間</th>
                <th scope="col">購買品項</th>
                <th scope="col">數量</th>
                <th scope="col">購買金額</th>
                <!-- <th scope="col">付款狀態</th> -->
              </tr>
            </thead>
            <tbody>
              <template v-for=" item in studentData.payHistory" :key="item">
                <tr>
                  <td> {{ item.timestamp }} </td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="i in item.payData.payData" :key="i">
                        {{ i.courseName }}
                      </li>
                    </ul>
                  </td>
                  <td>
                    <ul class="list-unstyled">
                      <li v-for="i in item.payData.payData" :key="i">
                        1
                      </li>
                    </ul>
                  </td>
                  <td>{{ item.payData.finalTotal}}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- {{ studentData.payHistory }} -->
</template>

<script>
import BannerCom from '../components/BannerCom.vue'
import CoursesLoadingList from '../components/CoursesLoadingList.vue'
import { mapState, mapActions, mapWritableState } from 
'pinia' 
import cartStore from '@/stores/cartStore'
import dataStore from '@/stores/dataStore'
import bannerStore from '@/stores/bannerStore'

export default {
  components: { BannerCom, CoursesLoadingList },
  computed: {
    ...mapState(dataStore, ['studentData','user', 'userCartCourses', 'couponData', 'loading']),
  },
  methods: {
    ...mapActions(dataStore, ['onAuthStateChanged']),
    ...mapActions(bannerStore, ['getBannerInfo']),
    ss() {
      console.log(this.studentData.payHistory)
      const names = ['Danny','Danny','Jack','Sam','Danny']
      const total_count = names.reduce((obj,item)=>{
        if (item in obj) {
          obj[item]++
        } else {
          obj[item] = 1
        }
        return obj
      },{})
 
      console.log(total_count) 

    }
  },
  created () {
    this.onAuthStateChanged()
    this.getBannerInfo(
      new URL('../assets/images/banner.jpg', import.meta.url).href,
      '購買紀錄',
      'Payment History',
      '詳盡紀錄，金流一目了然'
    )
    this.ss()
  }
}
</script>

<style lang="scss" scoped>

</style>