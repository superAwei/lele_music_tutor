<template>
  <div class="d-flex align-items-center border-0 rounded-2 mb-3 p-3" 
        v-for="item in 3" :key="item">
    <el-space>
      <el-skeleton animated>
        <template #template>
          <el-skeleton-item variant="image" class="loading-img rounded-3"/>
        </template>
      </el-skeleton>
    </el-space>
    <el-skeleton :rows="1" animated />
  </div>
</template>

<style lang="scss" scoped>
.loading-img {
  width: 100px;
  height: 80px;
}
</style>