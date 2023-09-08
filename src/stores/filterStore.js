import { defineStore } from 'pinia'
import dataStore from './dataStore'
import PaginationStore from './PaginationStore'


const data = dataStore()
const pagiStore = PaginationStore()

export default defineStore('filterStore', {
  state: () => ({
    selectCityName: '',
    selectCourseCategory: '',
    selectCourseName: '',
    courseMethod: ['在學生家', '在老師家', '線上'], // 下拉選單用
    selectCourseMethod: '',
    sortMethod: ['依新舊', '依人氣', '依金額'], // 下拉選單用
    selectSortMethod: '',
  }),
  actions: {
    selectCityNameCancel () {
      // 解決取消搜尋上課方式後上課地點還有值的問題
      if (this.selectCourseMethod === '') {
        this.selectCityName = ''
      }
    },
    courseSort () {
      console.log(this.selectSortMethod)
      if (this.selectSortMethod === '依金額') {
        data.AllCoursesFirebaseData.sort((a,b)  => {
          return b.data.price - a.data.price
        }) 
      } else if (this.selectSortMethod === '依新舊') {
        data.AllCoursesFirebaseData.sort((a,b)  => {
          return b.createdTime - a.createdTime
        }) 
      } else if (this.selectSortMethod === '依人氣') {
        data.AllCoursesFirebaseData.sort((a,b)  => {
          return b.data.whoBuy.length - a.data.whoBuy.length
        }) 
      } 
    }
  },
  getters: {
    filterData () {
      console.log('filter')
      if (this.selectCourseMethod === '') {
        return data.AllCoursesFirebaseData.filter((item) => {
          return item.data.cityName.match(this.selectCityName) && item.data.courseCategory.match(this.selectCourseCategory) && item.data.courseName.match(this.selectCourseName) 
        }) 
      } else {
        return data.AllCoursesFirebaseData.filter((item) => {
          return item.data.cityName.match(this.selectCityName) && item.data.courseCategory.match(this.selectCourseCategory) && item.data.courseName.match(this.selectCourseName) && item.data.courseMethod.includes(this.selectCourseMethod)
        })
      }
    },
    currentPageCoursesData () {
      // console.log(pagiStore.page.currentPage)
      // 過濾出來的資料再分頁
      pagiStore.pagination(this.filterData)
      return pagiStore.eachPage
    }
  }
})