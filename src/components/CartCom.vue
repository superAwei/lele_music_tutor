<template>
  <div class="col-12 col-lg-8 me-auto">
    <CoursesLoadingList v-if="loading" />
  </div>

  <div class="text-center mt-48"
      v-if="studentData.myCart.length === 0 && !loading">
      <p class="fs-2 fw-bold">購物車無任何品項</p>
      <RouterLink to="/AllCourses">
        <button type="button" class="btn btn-outline-primary mt-16">
          繼續購物
        </button>
      </RouterLink> 
  </div>
  <div class="col-lg-8 mb-3 border rounded-4 h-100 "
          v-if="studentData.myCart.length !== 0 && !loading">
      <table class="table table-hover align-middle px-0">
        <thead>
          <tr>
            <th width="" class="" colspan="4">
              <div class="form-check align-items-center">
                <input class="form-check-input me-16" 
                  type="checkbox" 
                  id="checkAll" 
                  name="checkAll"
                  value=""
                  @click="checkAll()"
                  v-model="checkAllValue"> 
                <label for="checkAll" class="text-primary fs-5">全選</label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item, index in userCartCourses" :key="item.timestamp">
            <td width="6%" class="">
              <div class="form-check">
                <input class="form-check-input" 
                  type="checkbox" 
                  :id="item.timestamp" 
                  :value="index" 
                  name="courseMethod1" 
                  v-model="cartCheckboxWrap"> 
                <label :for="item.timestamp"></label>
              </div>
            </td>
            <td width="100" class="overflow-hidden"
                @click="goCoursePage(item[0].id)">
              <img :src="item[0].data.courseImg" alt="課程圖片" class="cart-image cursor-pointer">
            </td>
            <td width="">
              <div class="container">
                <div class="row align-items-center ">
                  <div class="col-12">
                    <div class="fs-6 fw-bold lh-1">
                      {{ item[0].data.courseName }}
                    </div>
                  </div>
                  <div class="col-12 mt-8">
                    <p v-if="couponValue == 1">
                      NT$ {{ $filters.currency(item[0].data.price) }}
                    </p>
                    <p v-if="couponValue != 1">
                      NT$ {{ $filters.currency(item[0].data.price * couponValue) }}
                    </p>
                    <p class="fs-8 text-delete text-decoration-line-through" 
                          v-if="couponValue != 1">
                      NT$ {{ $filters.currency(item[0].data.price) }}
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td width="7%" class="text-end">
              <div class="cursor-pointer"
                @click="deleteCart(user.uid, item.timestamp, index)">
                <i class="bi bi-trash3-fill"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

  </div>

</template>

<script>
import CoursesLoadingList from '../components/CoursesLoadingList.vue'
import { mapState, mapActions, mapWritableState } from 
'pinia' 
import cartStore from '@/stores/cartStore'
import dataStore from '@/stores/dataStore'
import goStore from '@/stores/goStore'

export default {
  components: { CoursesLoadingList },
  computed: {
    ...mapWritableState(cartStore, ['cartCheckboxWrap','payWrap', 'checkAllValue']),
    ...mapWritableState(dataStore, ['studentData','user', 'userCartCourses','couponData']),
    ...mapState(cartStore, ['cartTotal', 'couponValue']),
    ...mapState(dataStore, ['loading']),
  },
  methods: {
    ...mapActions(cartStore, ['deleteCart', 'addToPayWrap', 'checkAll']),
    ...mapActions(dataStore, ['onAuthStateChanged']),
    ...mapActions(goStore, ['goCoursePage']),
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.cart-image {
  width: 100px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  // transition: transform .3s;
  &:hover {
    // transform: scale(1.3) rotate(3deg);
  }
}
input {
  width: 25px;
  height: 25px;
}
table {
  font-family: sans-serif;
}
</style>