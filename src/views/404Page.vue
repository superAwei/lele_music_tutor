<template>
  <div class="vh-100 bg-light d-flex flex-column align-items-center justify-content-center">
    <h1 class="d-flex mb-3 mb-md-4">
      <span class="me-2 fw-bolder">找不到頁面</span>
      <span class="text-primary align-self-end">/ 404 Not Found</span>
    </h1>
    <p class="mb-32">Oops！您要找的頁面不存在</p>
    <RouterLink to="/" class="btn btn-outline-primary btn-lg fw-bold px-32 py-8">
      回首頁
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.btn-outline-primary{
  transition: .5s;
  &:hover,
  &:focus {
    color: #ffffff;
    box-shadow: inset 0 0 0 2em #ff715f;
  }
}
</style>
