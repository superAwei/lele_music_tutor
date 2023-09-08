import { defineStore } from 'pinia'


export default defineStore('paginationStore', {
  state: () => ({
    eachPage: [], // 每頁資料
    pageSize: 12, // 每頁有幾筆資料
    page: {
      totalPage: 0, 
      currentPage: 1, 
      pageNumBox: [], //每次只存放的頁碼數(預定5頁)
      hasPrevPage: false, 
      hasNextPage: false 
    }
  }),
  actions: {
    pagination(data) {
      this.page.totalPage = Math.ceil(data.length / this.pageSize)
      this.eachPage = [] 
      if(this.page.currentPage < 1 ){
        this.page.currentPage = 1
      }
      if(this.page.currentPage > this.page.totalPage){
        this.page.currentPage = this.page.totalPage
      }
      this.page.hasPrevPage = this.page.currentPage > 1 ? true : false
      this.page.hasNextPage = this.page.currentPage < this.page.totalPage ? true : false

      // 由前面可知 最小數字為 6 ，所以用答案來回推公式。
      // 每頁第1筆資料 索引值
      const minData = (this.page.currentPage * this.pageSize) - this.pageSize + 1 
      // 每頁最後1筆資料 索引值 
      const maxData = (this.page.currentPage * this.pageSize) 

      data.forEach((item, index) => {   
        // 獲取陣列索引，但因為索引是從 0 開始所以要 +1。
        const num = index + 1
        // 這邊判斷式會稍微複雜一點
        // 當 num 比 minData 大且又小於 maxData 就push進去新陣列。
        if ( num >= minData && num <= maxData) {      
          //將全部資料每20筆寫入至eachPage裡
          this.eachPage.push(item)
          }
       })
       this.showPageBox()
    },
    //下方頁碼呈現方式
    showPageBox(){          
      const pageBox = 5;    //下面頁碼只會顯示五頁
      let startPage = this.page.currentPage - Math.floor(pageBox / 2);   // 起始：目前頁數 − (5/2的最大整數＝2)
      let endPage = this.page.currentPage + Math.floor(pageBox / 2);     // 結尾：目前頁數 ＋ (5/2的最大整數＝2)
      if(startPage < 1){      //頁數1，2會套用
        startPage = 1;        
        endPage = pageBox;
      }
      if(endPage > this.page.totalPage){    //頁數16，17套用
        endPage = this.page.totalPage;
        startPage = this.page.totalPage - (pageBox - 1);
      }
      if (this.page.totalPage < 5) {    // 如果頁數總長<5，就套用起始頁＝１，結尾頁＝總頁
      startPage = 1;
      endPage = this.page.totalPage;
      }
      this.page.pageNumBox = []; // 每次都淨空重新渲染一次
      for (let i = startPage; i <= endPage; i++) {   //其餘頁數套用
        this.page.pageNumBox.push(i);
      }
      console.log(this.page.pageNumBox);
    }
  },

})