<template>
  <div class="container pb-32">
    <VForm  v-slot="{ errors }"
           @submit="goBeATeacherStep3()">
      <div class="row justify-content-center mb-3">
        <div class="col-12 col-lg-8">
          <label for="courseIntro" class="form-label">
            課程介紹：
          </label>
          <VField 
                name="課程介紹"
                class="form-control" 
                id="courseIntro" 
                as="textarea"
                rows="5"
                rules="required|max:500"
                :class="{ 'is-invalid': errors['課程介紹'] }"
                placeholder="限定500字元內"
                v-model="beATeacherData.courseIntro"
                >
          </VField>
          <ErrorMessage class="invalid-feedback" name="課程介紹"/>
        </div>
      </div>

      <div class="row justify-content-center mb-3">
        <div class="col-12 col-lg-8 mb-3">
          <div class="row">
            <div class="col-auto">
              <label for="coursePhoto" 
                    class="col-form-label"
                    accept="image/png, image/jpeg">
                上傳一張課程封面照：
              </label>
            </div>
            <div class="col-12 col-md-5">
              <VField
                  name="課程封面"
                  type="file"
                  id="coursePhoto"
                  class="form-control"
                  rules="required"
                  :class="{ 'is-invalid': errors['課程封面'] }"
                  @change="uploadPhoto('course',$event)"
                >
              </VField>
              <ErrorMessage class="invalid-feedback" name="課程封面"/>
            </div>
            <div class="col-3 mt-16 mt-md-0 ms-auto">
              <img class="img-fluid" 
                  :src="beATeacherData.courseImg" 
                  alt="課程封面照"
                  v-if="beATeacherData.courseImg"/>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 d-flex justify-content-between">
          <button type="button" class="btn btn-outline-primary px-48"
                  @click="goBeATeacherStep1()">
            上一步
          </button>
          <button type="submit" class="btn btn-primary px-48">
            下一步
          </button>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script>
import { mapState, mapActions, mapWritableState } from 
'pinia' 
import goStore from '@/stores/goStore'
import dataStore from '@/stores/dataStore'
import bannerStore from '@/stores/bannerStore'

export default {
  computed: {
    ...mapWritableState(dataStore, ['beATeacherData','teacherData', 'createCourseStep']),

  },
  methods: {
    ...mapActions(dataStore, ['uploadPhoto']),
    ...mapActions(goStore, ['goBeATeacherStep1', 'goBeATeacherStep3']),
    ...mapActions(bannerStore, ['getBannerInfo'])
  },
  created () {
    this.getBannerInfo(
      new URL('../assets/images/banner.jpg', import.meta.url).href,
      'INTRODUCE',
      '課程介紹',
      '分享您的音樂願景，簡單介紹您的課程內容，為學生營造期待感'
    )
    this.createCourseStep = 2
  }
}
</script>

<style lang="scss" scoped>

</style>