<template>
  <NavbarCom :key="$route.path"/>
  <div class="min-height">
    <RouterView />
  </div>
  <FooterCom/>
  <GoTop/>
</template>


<script>
import NavbarCom from '@/components/NavbarCom.vue'
import GoTop from '@/components/GoTop.vue'
import FooterCom from '../components/FooterCom.vue'


export default {
  components: {
    NavbarCom,
    GoTop,
    FooterCom, 
  },
  computed: {
  },
  methods: {
  },
  created () {
    console.log(this.$route.name)
  },
}
</script>

<style lang="scss" scoped>
.home-loading {
  position: absolute;
  z-index: 2000;
  width: 100%;
  min-height: 100vh;
  background:  #F3F1E5;
}
.min-height {
  min-height: calc(100vh - 207px);
}
</style>
