import { defineStore } from 'pinia'
import dataStore from './dataStore';
import { doc, setDoc, updateDoc, getFirestore , arrayUnion, arrayRemove} from "firebase/firestore"; 
import router from '../router'
import Swal from 'sweetalert2/dist/sweetalert2'

const db = getFirestore()
const data = dataStore()
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
const SwalN = Swal.mixin({
  confirmButtonColor: '#ff715f',
})

export default defineStore('cartStore', {
  state: () => ({
    cartPageState: 'cart',
    couponCode:'',
    couponValue:1,
    checkAllValue:false,
    cartCheckboxWrap: [],
    payWrap:{
      payData:[],
      total:0,
      finalTotal:0,
      couponUse:''
    }

  }),
  actions: {
    // 單一課程頁面用--------------------------
    async addCart(uid, id) {
      // 加入時間戳，方便區分同商品
      const wrap = { timestamp : new Date().getTime(),
                     courseId : id}
      console.log(wrap)
      const cart = doc(db, uid, 'student');
      await updateDoc(cart, {
        myCart: arrayUnion(wrap)
      });
      Toast.fire({
        icon: 'success',
        title: '成功加入購物車'
      })
      data.getStudentFirebaseData()
    },
    async buyNow(uid, id) {
      // 加入時間戳，方便區分同商品
      const wrap = { timestamp : new Date().getTime(),
        courseId : id}
      console.log(wrap)
      const cart = doc(db, uid, 'student');
      await updateDoc(cart, {
      myCart: arrayUnion(wrap)
      });
      router.push('/CartPage')

    },


    // 購物車頁面用---------------------------
    async deleteCart(uid, dTimestamp , index){
      console.log(uid,dTimestamp, index)
      // 刪除購物車資料前，要順便刪除佔存陣列的內容，才不會渲染出問題(保留找問題)
      // const num = this.cartCheckboxWrap.findIndex((item) => {
      //   return item === index
      // })
      // console.log(num)
      // this.cartCheckboxWrap.splice(num, 1)

      // 暫時先全刪
      this.cartCheckboxWrap = []
      this.checkAllValue = false
      // 透過timestamp找出要刪的檔
      const course = data.studentData.myCart.filter((item) => {
        return item.timestamp === dTimestamp
      })
      // console.log('要刪的檔', course[0])
      const cart = doc(db, uid, 'student');
      await updateDoc(cart, {
        myCart: arrayRemove(course[0])
      });
      Toast.fire({
        icon: 'success',
        title: '成功刪除購物車項目'
      })
      data.onAuthStateChanged()
    },
    // 新增資料進到結帳頁面
    addToPayWrap() {
      if (this.cartCheckboxWrap.length === 0) {
        SwalN.fire('請選擇結帳項目')
      } else {
        this.cartPageState = 'pay'
        let total = 0

        // 先重算一次給結帳頁面，之後看能不能跟getter合併
        this.cartCheckboxWrap.forEach((item) => {
          total += parseInt(data.userCartCourses[item][0].data.price)
          let wrap = {
            courseId:'',
            courseName:'',
            price:'',
          }
          wrap.courseId = data.userCartCourses[item][0].id
          wrap.courseName = data.userCartCourses[item][0].data.courseName
          wrap.price = data.userCartCourses[item][0].data.price
  
          this.payWrap.payData.push(wrap)
        })
        this.payWrap.total = total
        this.payWrap.finalTotal = Math.trunc(total * this.couponValue)
      }
    },
    addCouponCode () {
      console.log(data.couponData)
      for (let i in data.couponData){
        console.log(i)
        console.log(data.couponData[i])
        if (this.couponCode === i) {
          SwalN.fire('成功加入折扣碼')
          this.couponValue = data.couponData[i]
          this.payWrap.couponUse = i
          return
        }
      }
      SwalN.fire({
        title:'折扣碼不存在',
        confirmButtonColor: '#ff715f',
      })
    },
    async confirmToPay() {
      // SwalN.fire('新增歷史付款資訊')
      // 1. 新增歷史付款資訊(買的人) 
      const wrap = { 
        timestamp : new Date().getTime(),
        payData: this.payWrap,
      }
      const cart = doc(db, data.user.uid, 'student');

      await updateDoc(cart, {
        payHistory: arrayUnion(wrap)
      })


      // 2. 新增到學生課程的部分(買的人)和3合併了
      // SwalN.fire('新增到學生課程')
      // for (let i = 0; i < this.payWrap.payData.length; i++) {
        // console.log('2', this.payWrap.payData[i].courseId)
        // let wrap2 = { 
        // timestamp : buyTime,
        // courseId: this.payWrap.payData[i].courseId,
        // classSchedule: ''
        // }
        // console.log(wrap2)
        // await updateDoc(cart, {
        //   myStudyCourses: arrayUnion(wrap2)
        // })
      // }


      // 2.3. 新增到該課程資料(賣的人)同時新增一份到學生端(買的人)
      // SwalN.fire('新增到該課程購買名單')
      for (let i = 0; i < this.payWrap.payData.length; i++) {
        // console.log('2', this.payWrap.payData[i].courseId)
        const cart2 = doc(db, "MusicTutorCourses", this.payWrap.payData[i].courseId);
        const ts = new Date().getTime()
        let wrap2 = { 
          timestamp : ts,
          courseId: this.payWrap.payData[i].courseId,
          classSchedule: ''
          }
        let wrap3 = { 
          timestamp : ts,
          uid : data.teacherData.uid,
          // id : this.payWrap.payData[i].courseId,
          // courseName : this.payWrap.payData[i].courseName,
          // studentName : data.teacherData.displayName,
          classSchedule: ''
          }
        await updateDoc(cart, {
          myStudyCourses: arrayUnion(wrap2)
        })
        await updateDoc(cart2, {
          whoBuy: arrayUnion(wrap3)
        })
      }

    
      // 4. 從購物車移除的部分
      // SwalN.fire('刪除購物車項目')
      const cart4 = doc(db, data.user.uid, 'student')
      for (let i = 0; i < this.cartCheckboxWrap.length; i++) {
        await updateDoc(cart4, {
          myCart: arrayRemove(data.studentData.myCart[this.cartCheckboxWrap[i]])
        })
      }
      // 5. 結帳完記得清空所有暫存資料
      this.cartPageState =  'cart',
      this.couponCode = '',
      this.couponValue = 1,
      this.cartCheckboxWrap =  [],
      this.payWrap = {
        payData:[],
        total:0,
        finalTotal:0,
        couponUse:''
      }
      SwalN.fire('成功完成付款')
      router.push('/AllCourses')
      data.onAuthStateChanged()
    },
    checkAll() {
      if(!this.checkAllValue){
        data.userCartCourses.forEach((item,index) => {
          this.cartCheckboxWrap.push(index)
        })
      } else {
        this.cartCheckboxWrap = []
      }
    }

  },
  getters: {
    cartTotal () {
      return () => {
        let total = 0
        this.cartCheckboxWrap.forEach((item) => {
          total += parseInt(data.userCartCourses[item][0].data.price)
        })
        // console.log(total)
        return total
      }
    },
  }
})