<template>
  <div class="container"></div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 
'pinia' 
import dataStore from '@/stores/dataStore'
import goStore from '@/stores/goStore'
import bannerStore from '@/stores/bannerStore'

export default {
  computed: {
    ...mapWritableState(dataStore, ['createCourseStep'])
  },
  methods: {
    ...mapActions(goStore, ['goHomePage', 'goBeATeacherStep1']),
    ...mapActions(bannerStore, ['getBannerInfo'])
  },
  created () { 
    this.getBannerInfo(
      new URL('../assets/images/banner.jpg', import.meta.url).href,
      'COMPLETE',
      '完成 ',
      '準備好了!您的課程將準備好在平台上展示。'
    )
    this.createCourseStep = 4
  },
  mounted () {
    this.$swal.fire({
      title: '<h1>恭喜完成開課</h1>',
      icon: 'success',
      text: '課程審核需要2~3個工作天',
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: '回到首頁',
      confirmButtonText: '繼續開課',
      confirmButtonColor: '#ff715f',
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.$router.push('/CreateCourses/BeATeacherStep1')
        } else {
          this.$router.push('/')
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.BeATeacherStep4-vh {
  height: calc(100vh - 194px - 184px - 48px);
}
</style>