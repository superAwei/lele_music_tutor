<template>
  <div class="banner d-flex align-items-center" 
      :style="{backgroundImage: `url(${bgUrl})`}">
      <div class="container">
        <div class="row align-items-center ">
          <div class="col col-lg-6">
            <div class="blockquote px-3 py-2">
              <h2 class="fs-2 fw-bold"> {{ banner.title }} </h2>
              <h2 class="fs-2 fw-bold">{{ banner.text }} </h2>
              <p class="fs-7 fw-bold mt-3">{{ banner.footer }} </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 
'pinia'  
import bannerStore from '@/stores/bannerStore'
export default {
  computed: {
    ...mapState(bannerStore, ['bgUrl', 'banner'])
  },
};
</script>


<style lang="scss" scoped>
.banner {
  height: 200px;
  background-position: center center;
  background-size: cover;


}
// .blockquote {
//   background: hsla(0,0%,100%,.3);  
//   position: relative;
//   overflow: hidden;
  
//   /* stylings */
//   padding: 1em 0;
//   border-radius: .3em;
//   margin: 0 auto;
//   box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
// 	            0 .5em 1em rgba(0, 0, 0, 0.6);
// 	text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
// }
</style>