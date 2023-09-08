<template>
  <div class="modal fade" id="ClassSchedule" tabindex="-1" aria-labelledby="ClassSchedule" aria-hidden="true" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ClassSchedule">上課時間</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">購買時間</th>
                  <th scope="col">上課時間</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item, index in classScheduleData" :key="item.timestamp">
                  <th scope="row">{{ index }}</th>
                  <td>{{ this.$moment(item.timestamp).format('YYYY/MM/DD') }}</td>
                  <td>
                    {{ item.classSchedule || '尚未預約' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
    
  <script>
  import { mapState, mapActions, mapWritableState } from 
  'pinia' 
  import dataStore from '../stores/dataStore';
  
  
  
  export default {
    computed: {
      ...mapState(dataStore, ['classScheduleData', 'classScheduleTime', 'teacherData', 'userStudentCourses']),
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