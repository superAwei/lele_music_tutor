<template>
  <BannerCom/>
  <div class="container mt-3">
    <div class="row">
      <pay-com v-if="cartPageState === 'pay'" />
      <cart-com v-if="cartPageState === 'cart'" />
      <!-- 購物車用 -->
      <div class="col-12 col-lg-4 mb-3"
        v-if="cartPageState === 'cart' && studentData.myCart.length !== 0">
        <div class="card">
          <div class="card-header">
            <p>訂單明細</p>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p>{{ cartCheckboxWrap.length }}件小計</p>
              <p>NT$ {{ $filters.currency(cartTotal()) }}</p>
            </div>
            <div class="text-end fs-6 text-primary"
                v-if="couponValue != 1">
              <p>折扣 - {{ $filters.currency(cartTotal() - cartTotal() * couponValue) }}</p>
            </div>
            <div class="text-end fs-2">
              <p>NT$ {{ $filters.currency(cartTotal() * couponValue) }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div class="row my-8 align-items-center">
              <div class="col-8 pe-0">
                <input class="col-form-label w-100 py-1 fs-7 rounded-5 px-16 border-0" 
                    type="text" 
                    id="coupon"  
                    name="coupon" 
                    placeholder="請輸入折扣碼"
                    v-model="couponCode"> 
              </div>
              <div class="col-4 text-end">
                <button type="button" class="btn btn-sm btn-secondary px-16"
                          @click="addCouponCode()">
                    確認
                </button>
              </div>
            </div>
            <button type="button" class="btn btn-primary w-100 my-8"
                    @click="addToPayWrap()">
              來去結帳
            </button>
          </div>
        </div>
      </div>
      <!-- 結帳用 -->
      <div class="col-12 col-lg-4 mb-3"
            v-if="cartPageState === 'pay'">
        <div class="card">
          <div class="card-header">
            <p>訂單明細</p>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p>{{ payWrap.payData.length }}件小計</p>
              <p>NT$ {{  $filters.currency(payWrap.total) }}</p>
            </div>
            <div class="text-end fs-6 text-primary"
                v-if="couponValue != 1">
              <p>折扣 - {{ $filters.currency(payWrap.total - payWrap.total * couponValue) }}</p>
            </div>
            <div class="text-end fs-2">
              <p>NT$ {{  $filters.currency(payWrap.total * couponValue) }}</p>
            </div>
          </div>
          <div class="card-footer">
            <div class="text-primary fs-8 mb-2 fw-bold">
              我已詳閱並同意〈服務契約〉及服務內容
            </div>
            <div class="row g-0">
              <button type="button" class="btn btn-secondary col-5"
                    @click="cartPageState = 'cart', 
                            payWrap.payData = []">
                重新選擇
              </button>
              <button type="button" class="btn btn-primary col-5 ms-auto"
                    @click="confirmToPay()">
                同意並送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import CartCom from '../components/CartCom.vue'
import PayCom from '../components/PayCom.vue'
import BannerCom from '../components/BannerCom.vue'
import { mapState, mapActions, mapWritableState } from 
'pinia' 
import cartStore from '@/stores/cartStore'
import dataStore from '@/stores/dataStore'
import bannerStore from '@/stores/bannerStore'

export default {
  components: { CartCom, PayCom, BannerCom },
  watch: {
    cartPageState() {
      if (this.cartPageState === 'cart') {
        this.getBannerInfo(
        new URL('../assets/images/banner.jpg', import.meta.url).href,
          '購物車',
          'CART',
          '年底前輸入『 2023666 』享六折優惠'
        )
      } else {
        this.getBannerInfo(
            new URL('../assets/images/banner.jpg', import.meta.url).href,
            '結帳',
            'CHECKOUT',
            '購物的終點，滿足的起點'
        )
      }
    }
  },
  computed: {
    ...mapWritableState(cartStore, ['cartCheckboxWrap','payWrap', 'cartPageState', 'couponCode']),
    ...mapWritableState(dataStore, ['studentData','user', 'userCartCourses', 'couponData']),
    ...mapState(cartStore, ['cartTotal', 'couponValue'])
  },
  methods: {
    ...mapActions(cartStore, ['deleteCart', 'addToPayWrap', 'addCouponCode','confirmToPay']),
    ...mapActions(dataStore, ['onAuthStateChanged','getOneCoursesFirebaseData']),
    ...mapActions(bannerStore, ['getBannerInfo'])
  },
  created () {
    this.cartPageState = 'cart'
    this.onAuthStateChanged()
    this.getBannerInfo(
      new URL('../assets/images/banner.jpg', import.meta.url).href,
      '購物車',
      'CART',
      '年底前輸入『 2023666 』享六折優惠'
    )
  }
}
</script>

<style lang="scss" scoped>
.table-image {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}
</style>