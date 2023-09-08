<template>
  <div class="modal fade" id="SetUpClassSchedule" tabindex="-1" aria-labelledby="SetUpClassSchedule" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="SetUpClassSchedule">設定學生上課時間</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">學生</th>
                  <th scope="col" colspan="2">購買時間 / 上課時間</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item, index in classScheduleData" :key="item.timestamp">
                  <th scope="row">{{ index }}</th>
                  <td class="fs-7 fs-md-6">{{ item.studentName }}</td>
                  <td>
                    <span class="text-delete fs-7">{{ this.$moment(item.timestamp).format('YYYY-MM-DD') }}</span><br>
                    <span class="fs-7">{{ item.classSchedule || '尚未設定' }}</span>
                  </td>
                  <td width="80" class="text-end">
                    <button class="btn btn-outline-primary fs-7 fs-md-6" data-bs-target="#SetUpClassSchedule2" data-bs-toggle="modal"
                    @click="classScheduleIndex = index">
                       設定
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SetUpClassScheduleModal2 />
  </template>
    
  <script>
  import SetUpClassScheduleModal2 from './SetUpClassScheduleModal2.vue'
  import { mapState, mapActions, mapWritableState } from 
  'pinia' 
  import dataStore from '../stores/dataStore';
  
  
  
  export default {
    components: { SetUpClassScheduleModal2 },
    computed: {
      ...mapState(dataStore, ['classScheduleData', 'classScheduleTime']),
      ...mapWritableState(dataStore, ['classScheduleIndex'])
    },
    methods: {  
      ...mapActions(dataStore, ['UpdateFirebaseUserCourseData', 'uploadPhoto', 'SetUpClassSchedule'])
    },
    created() {
      
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>