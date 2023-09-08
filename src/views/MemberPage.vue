<template>
  <div class="container">
    <div class="row my-16">
      <!-- 個人資料 -->
      <div class="col-12 col-lg-3 d-flex flex-column align-items-center mb-32 py-32 shadow h-100 rounded-4">
        <div class="user-photo position-relative mb-16">
          <img :src="teacherData.teacherImg" alt="大頭照"
                v-if="teacherData.teacherImg">
          <img src="../assets/images/預設大頭貼.png" alt="預設大頭照"
                v-if="!teacherData.teacherImg">
          <label for="file-upload">
            <i class="bi bi-cloud-arrow-up-fill cursor-pointer upload-icon"></i>
          </label>
          <input
                  type="file"
                  id="file-upload"
                  class="d-none"
                  @change="uploadPhoto('teacher',$event)"
                />
        </div>
        <!-- 姓名 -->
        <div class="mb-8 fs-3 fw-bold position-relative">
          {{ teacherData.displayName }}
          <i :class="teacherData.gender"></i>
          <span class="material-symbols-outlined cursor-pointer fs-3 text-delete ms-16 edit-pen" @click="updateNameState = true">Edit_Note</span>
        </div>
        <div class="mb-3" v-if="updateNameState">
          <label for="updateName" class="form-label fs-8">變更姓名：</label>
          <input type="text" class="form-control" id="updateName" v-model="teacherData.displayName">
          <div class="mt-16 text-end">
            <button type="button" class="btn btn-secondary me-8"
                      @click="updateNameState = false">
                取消
            </button>
            <button type="button" class="btn btn-primary"
                      @click="updateUserName() , updateNameState = false">
                確定
            </button>
          </div>
        </div>
        <!-- 關於我 -->
        <div class="my-8 w-100">
          <p class="ps-8 fw-bold">關於我：</p>
          <p class="fs-7 p-8">
            {{ teacherData.teacherIntro }}
          </p>
        </div>
        <div class="d-flex justify-content-around w-50 ms-auto mb-8">
          <a :href="teacherData.facebook" target="_black" @click.prevent>
            <i class="bi bi-facebook fs-3 text-secondary"
              :class="{'text-blue': teacherData.facebook}"></i>
          </a>
          <a :href="teacherData.instagram" target="_black" @click.prevent>
            <i class="bi bi-instagram fs-3 text-secondary"
              :class="{'text-danger': teacherData.instagram}"></i>
          </a>
          <a :href="teacherData.discord" target="_black" @click.prevent>
            <i class="bi bi-discord fs-3 text-secondary"
              :class="{'text-purple': teacherData.discord}"></i>
          </a>
          
        </div>
        <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">編輯個人資料</button>
      </div>
      <!-- 課程介紹、其他個人資料 -->
      <div class="col-12 col-lg-9">
        <!-- Banner -->
        <div class="ckeditor-img position-relative shadow rounded-4"
            :style="{ 'background-image': `url(${teacherData.ckeditorImg ||defaultCkeditorImg })` }">
          <label for="file-upload-ckeditor">
            <i class="bi bi-cloud-arrow-up-fill cursor-pointer upload-icon-ckeditor"></i>
          </label>
          <input
            type="file"
            id="file-upload-ckeditor"
            class="d-none"
            @change="uploadPhoto('ckeditor',$event)"
          />
        </div>
        <!-- 編輯按鈕 -->
        <div class="d-flex justify-content-between align-items-center" v-if="!ckeditorState">
          <span class="fs-6 text-delete"
            v-if="!teacherData.ckeditor">
            編輯個人頁面，和大家分享更多精彩故事
          </span>
          <a class="text-delete fw-bold cursor-pointer ms-auto"
              @click="ckeditorState = true">
              <span class="material-symbols-outlined fs-1">Edit_Note</span>
          </a>
        </div>
        <!-- 顯示編輯內容 -->
        <div v-html="teacherData.ckeditor" class="border p-16 shadow rounded-4"></div>
        <!-- ckeditor編輯框 -->
        <div class="text-delete fs-7 py-8"
            v-if="ckeditorState">
          <ckeditor :editor="editor" v-model="teacherData.ckeditor" :config="editorConfig"></ckeditor>
          <div class="text-end mt-8">
            <button type="button" class="btn btn-secondary me-8"
                    @click="ckeditorState = false">
              取消
            </button>
            <button type="button" class="btn btn-primary"
                    @click="UpdateFirebaseMemberData() , ckeditorState = false">
              確定
            </button>
          </div>
        </div>
        <!-- {{ teacherData.ckeditor }} -->
        <!-- 專長 -->
        <div class="my-16">
          <!-- 編輯按鈕 -->
          <div class="text-end">
              <a class="text-delete fw-bold cursor-pointer ms-auto"
                  @click="updateTeacherDataState = true">
                <span class="material-symbols-outlined fs-1">Edit_Note</span>
              </a>
          </div>
          <!-- 多選框 -->
          <div class="shadow p-16 rounded-4">
            <div class="row d-flex  mb-16">
              <p class="col-auto fw-bold mt-8">音樂風格：</p>
              <div class="col-9" v-if="!updateTeacherDataState">
                <span class="badge rounded-pill text-bg-primary text-white fs-6 py-8 mx-4 px-16 my-4"
                  v-for="item in teacherData.musicStyle" :key="item">
                  {{ item }}
                </span>
              </div>
              <div class="col-9" v-if="updateTeacherDataState">
                <el-select
                  v-model="teacherData.musicStyle"
                  multiple
                  placeholder="請選擇音樂風格"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in musicStyle"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>
            </div>
            <div class="row d-flex  mb-16">
              <p class="col-auto fw-bold mt-8">擅長領域：</p>
              <div class="col-9" v-if="!updateTeacherDataState">
                <span class="badge rounded-pill text-bg-primary text-white fs-6 py-8 mx-4 px-16 my-4"
                  v-for="item in teacherData.expertise" :key="item">
                  {{ item }}
                </span>
              </div>
              <div class="col-9" v-if="updateTeacherDataState">
                <el-select 
                  v-model="teacherData.expertise"
                  multiple
                  placeholder="請選擇擅長領域"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in expertise"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>
            </div>
            <div class="row d-flex  mb-16">
              <p class="col-auto fw-bold mt-8">教學語言：</p>
              <div class="col-9" v-if="!updateTeacherDataState">
                <span class="badge rounded-pill text-bg-primary text-white fs-6 py-8 mx-4 px-16 my-4"
                  v-for="item in teacherData.language" :key="item">
                  {{ item }}
                </span>
              </div>
              <div class="col-9" v-if="updateTeacherDataState">
                <el-select
                  v-model="teacherData.language"
                  multiple
                  placeholder="請選擇教學語言"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in language"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </div>
            </div>
            <div class="text-end mt-8" v-if="updateTeacherDataState">
              <button type="button" class="btn btn-secondary me-8"
                      @click="updateTeacherDataState = false">
                取消
              </button>
              <button type="button" class="btn btn-primary"
                      @click="UpdateFirebaseMemberData() , updateTeacherDataState = false">
                確定
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  <EditIntroModal />
</template>
  
<script>
import { mapState, mapActions, mapWritableState } from 
'pinia'  
import logInStore from '@/stores/logInStore'
import goStore from '@/stores/goStore'
import dataStore from '../stores/dataStore';
import EditIntroModal from '../components/EditIntroModal.vue'
//ckeditor5
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


export default {
  data() {
    return {
      editor: ClassicEditor,
      // this.teacherData.ckeditor: '<p>Content of the editor.</p>',
      editorConfig: {
          // The configuration of the editor.
          // plugins: [ Base64UploadAdapter],
      },
      defaultCkeditorImg: 'https://i.imgur.com/EjLcauL.jpg',
      musicStyle:['古典', '爵士', '流行', '電子', '動漫遊戲' , '中國風' , '其他'],
      expertise:[
                  "短笛",
                  "長笛",
                  "單簧管",
                  "雙簧管",
                  "英國管",
                  "巴松管",
                  "薩克斯風",
                  "管風琴",
                  "小號",
                  "短號",
                  "長號",
                  "法國號",
                  "低音號",
                  "巴里東",
                  "上低音號",
                  "小提琴",
                  "中提琴",
                  "大提琴",
                  "低音提琴",
                  "豎琴",
                  "斑鳩琴",
                  "曼陀林",
                  "大鍵琴",
                  "魯特琴",
                  "爵士鼓",
                  "木箱鼓",
                  "木琴",
                  "馬林巴琴",
                  "鋼琴",
                  "數位鋼琴",
                  "傳統電子琴",
                  "電子琴",
                  "電子合成器",
                  "揚琴",
                  "中國笛",
                  "笙",
                  "嗩吶",
                  "蕭",
                  "胡琴",
                  "古箏",
                  "柳琴",
                  "琵琶",
                  "阮",
                  "其他中國樂器",
                  "木吉他",
                  "古典吉他",
                  "電吉他",
                  "烏克麗麗",
                  "電貝斯",
                  "口琴",
                  "手風琴",
                  "手碟鼓",
                  "其它樂器",
                  "編曲",
                  "作曲",
                  "詞曲創作",
                  "配樂",
                  "錄音",
                  "音效",
                  "成音工程",
                  "混音",
                  "樂理",
                  "聽寫",
                  "音樂理論",
                  "流行歌唱",
                  "聲樂",
                  "音樂劇",
                  "和聲",
                  "視唱",
                  "B-BOX",
                  "Acappella",
                  "指揮",
                  "音樂治療",
                  "DJ",
                  "合奏指導",
                  "音樂軟體",
                  "樂器製作",
                  "其它非樂器類"
                ],
      language:['中文', '英文' , '台語' ,'客語', '日文', '韓文', '其他']
    };
        },
  components: { EditIntroModal },
  computed: {
    ...mapState(dataStore, ['user','isMember', 'teacherData']),
    ...mapWritableState(dataStore, ['ckeditorState', 'updateNameState', 'updateTeacherDataState'])
  },
  methods: {
    ...mapActions(logInStore, ['signOut']),  
    ...mapActions(dataStore, ['uploadPhoto', 'onAuthStateChanged', 'UpdateFirebaseMemberData', 'updateUserName']),
    
  },
  created () {
    this.onAuthStateChanged()
  },
  mounted() {

  },
}
</script>

<style lang="scss" scoped>
.user-photo {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50px;
  }
}
.upload-icon { 
  position: absolute;
  right: -3px;
  bottom: 0px;
  z-index: 10;
  font-size: 20px;
  background: white;
  color: rgba(108, 117, 125, 1);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid;
}
.upload-icon-ckeditor {
  position: absolute;
  right: 10px;
  bottom: 7px;
  z-index: 10;
  font-size: 20px;
  background: white;
  color: rgba(108, 117, 125, 1);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 2px solid;
}
.ckeditor-img {
  height: 400px;
  background-size: cover;
  background-position: center center;
  @media (max-width: 768px)  {
    height: 300px;
  }
  @media (max-width: 576px)  {
    height: 200px;
  }
}

.edit-pen {
  position: absolute;
  right: -30px;
  bottom: 0;
}
.badge {
  color: #000000 !important;
  background: #ffffff !important;
  border: 1px solid #ff715f !important;
  font-weight: normal;
}
</style> 