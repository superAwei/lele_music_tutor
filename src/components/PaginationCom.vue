<template>
  <div class="container py-4 d-none d-sm-block"
        v-if="filterData.length != 0">
    <nav>
      <ul class="pagination d-flex justify-content-center ">
        <li class="page-item" 
            :class="{'disabled':!page.hasPrevPage}"
            v-if="page.totalPage > 0">
          <a class="page-link" href="#" 
            @click.prevent="page.currentPage -= 1">
            <i class="bi bi-caret-left-fill"></i>
          </a>
        </li>
        
        <li class="page-item d-flex" 
            v-for="(item,index) in page.pageNumBox" :key="index" 
            :class="{'active': item === page.currentPage}">
          <a class="page-link" href="#" 
            @click.prevent="page.currentPage = item">{{item}}
          </a>
        </li>

        <!-- 頁面數大於5才顯示最大頁數及指定頁數 -->
        <li class="page-item"
          v-if="page.totalPage > 5">
          <a class="page-link" href="#"
          @click.prevent="page.currentPage = page.totalPage">
            ...{{page.totalPage}}</a>
        </li>

        <li class="page-item" 
            :class="{'disabled':!page.hasNextPage}"
            v-if="page.totalPage > 0">
          <a class="page-link" href="#" 
            @click.prevent="page.currentPage += 1">
            <i class="bi bi-caret-right-fill"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>

  <div class="container d-flex justify-content-center my-32 d-block d-sm-none"
        v-if="filterData.length != 0">
    <div class="pagination row g-1 justify-content-center align-items-center">
      <div class="col-auto page-item" 
            :class="{'disabled':!page.hasPrevPage}"
            v-if="page.totalPage > 0">
        <a class="page-link" href="#" 
            @click.prevent="page.currentPage -= 1">
            <i class="bi bi-caret-left-fill"></i>
        </a>
      </div>
      <div class="col-3">      
        <input class="form-control" 
              type="number"
              id="selPage" 
              placeholder="請輸入頁碼" 
              aria-label="default input example"
              v-model="page.currentPage">
      </div>
      <div class="col-auto ">
        <label for="selPage" class="fs-7 text-delete">/ {{ page.totalPage }} 頁</label>
      </div>
      <div class="col-auto page-item" 
          :class="{'disabled':!page.hasNextPage}"
          v-if="page.totalPage > 0">
        <a class="page-link" href="#" 
          @click.prevent="page.currentPage += 1">
          <i class="bi bi-caret-right-fill"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import dataStore from '@/stores/dataStore'
import paginationStore from '@/stores/paginationStore'
import filterStore from '@/stores/filterStore'


export default {
  computed: {
    ...mapWritableState(paginationStore, ['page']),
    ...mapState(filterStore, ['filterData']),
  },
  methods: {
    ...mapActions(paginationStore, ['pagination']),    
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>

</style>