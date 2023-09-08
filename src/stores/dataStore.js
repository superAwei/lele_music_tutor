import {getFirestore, collection, doc, setDoc, getDoc,getDocs, addDoc, 
        Timestamp, updateDoc, serverTimestamp, writeBatch, 
        deleteDoc, deleteField,
       } from 'firebase/firestore/lite'
import { getAuth, onAuthStateChanged,} from 'firebase/auth'
import { defineStore } from 'pinia'
import router from '../router'
import Swal from 'sweetalert2/dist/sweetalert2'
import moment from 'moment'
import { toRaw } from 'vue'

const auth = getAuth()
const db = getFirestore()
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
const SwalN = Swal.mixin({
  confirmButtonColor: '#ff715f',
})

export default defineStore('dataStore', {
  state: () => ({
    loading: true,
    courseData:{},   // 單一課程頁面用
    myCoursesState: 'student', // 我的課程換頁用
    displayState: 'list', // 我的課程換呈現方式用(全域共用)
    ckeditorState: false, // 更新ckeditor狀態
    updateNameState:false, // 更新名字狀態
    updateTeacherDataState:false, // 更新音樂風格等資料狀態
    bookmarkIds: [],
    bookmarkNum: 0,
    // 成為老師表單數據，老師名稱來自會員(先預設)
    beATeacherData:{
      uid: '',
      displayName: '',
      gender: '',
      courseImg: '',
      courseName: '',
      courseIntro: '',
      courseCategory: '',
      courseMethod: [],      
      cityName: '',
      time: "",
      price: 0,
      whoBuy:[],
      onSale:true,
    },
    createCourseStep: 0,
    AllCoursesFirebaseData:[],
    otherTeacherData:[],
    teacherData: {
      uid: '',
      accountCreateTime: '',
      lastLogInTime: '',
      email: '',
      displayName: '',
      teacherImg: '',
      gender: '',
      birthday: '',
      address: '',
      phoneNumber:'',
      teachArea: [],
      teacherIntro: '',
      ckeditor:'',
      ckeditorImg:'',
      instagram: '',
      facebook: '',
      discord: '',
      expertise: [],
      educationalBackground: '',
      myTeachCourses:[],
      language: [],
      musicStyle:[], 
      allTeachTime:0,
      studentAssess:[],
      calenderTeacherColor: {
        color : '#c3dcbe',
        textColor : '#000000'
      },
      calenderStudentColor: {
        color : '#c5b2d6',
        textColor : '#000000'
      },
    },
    studentData: {
      myStudyCourses:[],
      myCart:[],
      payHistory:[],
      allStudyTime:0,
      myBookmarkCourses:[],
      myBookmarkTeacher:[],
    },
    couponData:[],
    user:{},
    isMember: false,
    userTeacherCourses:[],
    userStudentCourses:[],
    userBookmarkCourses:[],
    userCartCourses:[],
    top6courses:[],
    youLikeCourses:[],
    // 設定上課時間用
    classScheduleData:[],
    classScheduleStudentData:[],
    classScheduleId:'',
    classScheduleIndex:0,
    classScheduleTime:'',
    calenderDataAll:[],
    calenderDataNameTemp:'',
  }),
  actions: {
    // 設定、更新資料---------------------------------------
    // 註冊帳號後建立老師端學生端物件
    async SetFirebaseMemberData() { 
      this.teacherData.uid = this.user.uid 
      this.teacherData.email = this.user.email
      this.teacherData.accountCreateTime = this.user.metadata.creationTime
      await setDoc(doc(db, this.user.uid , "teacher"), 
      this.teacherData);
      await setDoc(doc(db, this.user.uid , "student"), 
      this.studentData);
      console.log('成功建立老師端學生端物件')
      router.push('/')
    },
    // 開課後上傳課程
    async SetFirebaseCourseData() {   
      this.beATeacherData.uid = this.user.uid
      this.beATeacherData.displayName = this.teacherData.displayName
      this.beATeacherData.gender = this.teacherData.gender
      this.beATeacherData.teacherIntro = this.teacherData.teacherIntro
      this.beATeacherData.whoBuy = []
      const member = "MusicTutorCourses"
      console.log(this.beATeacherData)
      await addDoc(collection(db, member), this.beATeacherData)
      router.push('/CreateCourses/BeATeacherStep4')
      this.onAuthStateChanged()
      this.beATeacherData.uid = ''
      this.beATeacherData.displayName = ''
      this.beATeacherData.gender = ''
      this.beATeacherData.courseImg = ''
      this.beATeacherData.teacherIntro = ''
      this.beATeacherData.courseName = ''
      this.beATeacherData.courseIntro = ''
      this.beATeacherData.courseCategory = ''
      this.beATeacherData.courseMethod = []
      this.beATeacherData.cityName = ''
      this.beATeacherData.time = 0
      this.beATeacherData.price = 0
      this.beATeacherData.whoBuy = []
    },
    // 更新老師端資料
    async UpdateFirebaseMemberData() {
      const teacherRef = doc(db, this.user.uid, 'teacher')
      await updateDoc(teacherRef, this.teacherData)
      Toast.fire({
        icon: 'success',
        title: '老師端資料更新成功'
      })
      this.onAuthStateChanged()
    },
    // 更新課程資訊
    async UpdateFirebaseUserCourseData(id) {
      if (this.beATeacherData.courseImg) {
        this.courseData.courseImg = this.beATeacherData.courseImg
      }
      console.log(this.courseData)
      const CoursesRef = doc(db, 'MusicTutorCourses', id)
      await updateDoc(CoursesRef, this.courseData)
      Toast.fire({
        icon: 'success',
        title: '課程資料更新成功'
      })
    },
    // 更新行事曆事件顏色
    async UpdateTeacherCalender() {
      const teacherRef = doc(db, this.user.uid, 'teacher')
      await updateDoc(teacherRef, this.teacherData)
      Toast.fire({
        icon: 'success',
        title: '行事曆資料更新成功'
      })
      this.calenderDataAll = []
      this.getTeachDate ()
      this.getStudyDate ()
    },
    // 更新姓名
    async updateUserName() {
      const teacherRef = doc(db, this.user.uid, 'teacher')
      await updateDoc(teacherRef, {
          displayName: this.teacherData.displayName
        })
      // 開過的課要同步更新
      this.userTeacherCourses.forEach(async (item) => {
        const docU = doc(db, "MusicTutorCourses", item.id);
        await updateDoc(docU, {
          displayName : this.teacherData.displayName
        })
      })
      Toast.fire({
        icon: 'success',
        title: '老師端姓名更新成功'
      })
    },
    // 取得資料---------------------------------------------
    async getTeacherFirebaseData() {
      const docRef = doc(db, this.user.uid, 'teacher');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("用戶老師端資料:", docSnap.data());
        this.teacherData = docSnap.data()
        // 開課前資料缺失提示
        if(router.currentRoute._value.fullPath === "/CreateCourses/BeATeacherStep1") {
          if (!this.teacherData.displayName || !this.teacherData.teacherIntro || !this.teacherData.teacherImg || !this.teacherData.gender) {
            console.log(this.teacherData.displayName, this.teacherData.teacherIntro, this.teacherData.gender, this.teacherData.teacherImg)
            SwalN.fire('請先填寫老師姓名、大頭照、性別、自我介紹')
            router.push('/MemberPage')
          }
        }
      } else {
        console.log("No such teacher document!");
      }
    },
    async getStudentFirebaseData() {
      const docRef = doc(db, this.user.uid, 'student');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("用戶學生端資料:", docSnap.data());
        this.studentData = docSnap.data()
      } else {
        console.log("No such student document!");
      }
    },
    async getAllCoursesFirebaseData() {
      this.loading = true;
      //用內建資料的話註解掉-------------------------------------------------
      const querySnapshot = await getDocs(collection(db, "MusicTutorCourses"));
      this.AllCoursesFirebaseData = []
      querySnapshot._docs.forEach((item) => {
        // id、課程建立時間只能先另外抓、之後再想不麻煩的方法
        const wrap = {
          id: item.id,
          createdTime: item._document.createTime.timestamp.seconds,
          data: item.data()
        }
        this.AllCoursesFirebaseData.push(wrap)
      });
      //---------------------------------------------------
      console.log('全部課程資料',this.AllCoursesFirebaseData)
      this.getTop6courses()
      this.getSameTeacherCourses(this.courseData.uid)    
      // 登入狀態的話，用uid抓出其他想要渲染的資料
      if (this.user.uid) {
        this.getCouponData()
        await this.getUserTeacherCourses()
        await this.getUserStudentCourses()
        if (router.currentRoute._value.fullPath === '/MyCalendar' || router.currentRoute._value.fullPath === '/MyCourses') {
          this.calenderDataAll = []
          await this.getTeachDate()
          await this.getStudyDate()
          console.log('行事曆全部資料', this.calenderDataAll)
        }
        this.getUserCartCourses()
        this.getBookmarkCoursesData()
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    async getCouponData() {
      const docRef = doc(db, "coupon", 'code')
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.couponData = docSnap.data()
        console.log("後台優惠券資料:", this.couponData);
      } else {
        console.log("No such OneCourses document!")
      }
    },
    async getOneCoursesFirebaseData(courseId) {
      const docRef = doc(db, "MusicTutorCourses", courseId)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("單一課程資料", docSnap.data())
        this.courseData = docSnap.data()
        // 自己加上課程id，後面要編輯上傳才會有值
        const wrap = {id : courseId}
        this.courseData = Object.assign(this.courseData, wrap)
        // 同步老師大頭照，不想多存照片浪費流量
        this.getTeacherPhoto(this.courseData.uid)
        // this.getSameTeacherCourses(this.courseData.uid)
        router.push(`/coursePage/${courseId}`)
      } else {
        console.log("No such OneCourses document!")
      }
    },
    async getTeacherPhoto(TeacherId) {
      const docRef = doc(db, TeacherId, 'teacher');
      const docSnap = await getDoc(docRef);
      this.courseData.teacherImg = docSnap.data().teacherImg

    },
    // 進入其他老師頁面用，點自己課程就導向個人主頁
    async getOneTeacherFirebaseData(TeacherId) {
      if (TeacherId === this.user.uid) {
        router.push('/MemberPage')
      } else {
        const docRef = doc(db, TeacherId, 'teacher');
        const docSnap = await getDoc(docRef);
        console.log("某某老師資料", docSnap.data()) 
        this.otherTeacherData = docSnap.data()
        router.push(`/teacherPage/${TeacherId}`)
      }
    },
    // 我的課程頁面for老師
    async getUserTeacherCourses() {
      if (!this.AllCoursesFirebaseData) {
        console.log('沒取得所有課程')
      } else {
        this.userTeacherCourses = this.AllCoursesFirebaseData.filter((item) => {
          return item.data.uid === this.user.uid
        })
        console.log("用戶老師端課程資料",this.userTeacherCourses)
      }
    },
    // 我的課程頁面for學生
    async getUserStudentCourses() {
      if(!this.studentData.myStudyCourses) {
        console.log('無學生端資料')
      } else {
        this.userStudentCourses = []
        this.studentData.myStudyCourses.forEach((item) => {
          let wrap = {}
          let wrap1 = this.AllCoursesFirebaseData.filter((i) => {
            return i.id === item.courseId
          })
          // 從課程中撈出購買時間方便搜尋、渲染
          // 物件很多層所以要用深拷貝
          wrap = JSON.parse(JSON.stringify(wrap1));
          wrap[0].timestamp = item.timestamp
          // 再從課程whoBuy中撈出開課時間方便渲染(時間由老師端設定)
          let wrap2 = {}
          wrap2 = wrap[0].data.whoBuy.filter((j) => {
            return j.timestamp === item.timestamp
          })
          wrap[0].classSchedule = wrap2[0].classSchedule
          this.userStudentCourses.push(wrap[0])
        })
        this.UserStudentCoursesMerge()
      }
    },
    // 同名課程整理在一起渲染用，set要再研究
    // https://reurl.cc/Eok9xa
    UserStudentCoursesMerge() {
      const set = new Set()
      this.userStudentCourses = this.userStudentCourses.filter(item=>!set.has(item.id)?set.add(item.id):false)  
      console.log("用戶學生端課程資料",this.userStudentCourses)
    },
    getUserCartCourses() {
      if (!this.AllCoursesFirebaseData) {
        console.log('完全沒有課程')
      } else {
        this.userCartCourses = []
        this.studentData.myCart.forEach((item) => {
          let wrap = {}
          wrap = this.AllCoursesFirebaseData.filter((i) => {
            return i.id === item.courseId
          })
          wrap.timestamp = item.timestamp
          this.userCartCourses.push(wrap)
        })
        console.log("用戶購物車內課程", this.userCartCourses)
      }
    },
    // 首頁跟單一課程頁面的swiper用
    getTop6courses() {
      this.top6courses = []
      this.AllCoursesFirebaseData.sort((a,b)  => {
        return b.data.whoBuy.length - a.data.whoBuy.length
      }) 
      this.top6courses = this.AllCoursesFirebaseData.slice(0,10)
      console.log('人氣前10', this.top6courses)
    },
    getSameTeacherCourses(uid) {
      this.youLikeCourses = []
      if (!this.AllCoursesFirebaseData) {
        console.log('完全沒有課程')
      } else {
        this.youLikeCourses = this.AllCoursesFirebaseData.filter((item) => {
          return item.data.uid === uid
        })
        console.log("猜你喜歡",this.youLikeCourses)
      }
    },
    //行事曆相關----------------------------------------------------
    // 設定上課時間
    SetUpTeacherClassSchedule (item) {
      this.classScheduleData = item.data.whoBuy
      this.classScheduleId = item.id
    },
    async UpDateClassSchedule () {
      this.classScheduleData[this.classScheduleIndex].classSchedule = this.classScheduleTime
      // 新增上課時間
      const CSD = doc(db, "MusicTutorCourses",this.classScheduleId);
      await updateDoc(CSD, {
        whoBuy: this.classScheduleData
      })
      this.classScheduleTime = ''
      this.classScheduleId = ''
      this.classScheduleIndex = 0
      Toast.fire({
        icon: 'success',
        title: '設定上課時間成功'
      })
    },
    // 學生的要過濾掉別人買的課
    lookStudentClassSchedule (item) {
      this.classScheduleData = []
      this.classScheduleData = item.data.whoBuy.filter((i) => {
        return i.uid === this.teacherData.uid
      })
    },
    // 取得行事曆用數據
    async getTeachDate () { 
      this.userTeacherCourses.forEach((i) => {
        i.data.whoBuy.forEach(async (j) => {
          // 用uid去找學生名字渲染modal
          const docRef = doc(db, j.uid, 'teacher');
          const docSnap = await getDoc(docRef);   
          j.studentName = docSnap.data().displayName
          // 把有設定上課時間的抓出來
          if(j.classSchedule) {
            let warp = {}
            warp.title = i.data.courseName
            warp.color = this.teacherData.calenderTeacherColor.color
            warp.textColor = this.teacherData.calenderTeacherColor.textColor
            warp.allDay = false
            warp.start = moment(j.classSchedule).format('YYYY-MM-DD HH:mm')
            warp.end = moment(j.classSchedule).add(i.data.time,'minute').format('YYYY-MM-DD HH:mm')
            this.calenderDataAll.push(warp)
          }
        })
      })
    },
    async getStudyDate () {
      this.userStudentCourses.forEach((i) => {
        i.data.whoBuy.forEach(async (j) => {
          // 用uid去找學生名字渲染modal
          const docRef = doc(db, j.uid, 'teacher');
          const docSnap = await getDoc(docRef);           
          j.studentName = docSnap.data().displayName
          // j.id = i.id
          // 把有設定上課時間的抓出來
          if(j.classSchedule) {
            let warp = {}
            warp.title = i.data.courseName
            warp.color = this.teacherData.calenderStudentColor.color
            warp.textColor = this.teacherData.calenderStudentColor.textColor
            warp.allDay = false
            warp.start = moment(j.classSchedule).format('YYYY-MM-DD HH:mm')
            warp.end = moment(j.classSchedule).add(i.data.time,'minute').format('YYYY-MM-DD HH:mm')
            this.calenderDataAll.push(warp)
          }
        })
      })
    },


    // 註冊登入------------------------------------------
    // 判斷完是否登入後，讀取用戶老師端學生端資料
    async onAuthStateChanged() {
      onAuthStateChanged(auth, (user) => {
        console.log('user端資料', user)
        if (user) {
          this.user = user;
          this.isMember = true
          this.getTeacherFirebaseData()
          this.getStudentFirebaseData()
          this.getAllCoursesFirebaseData()
        } else {
          this.isMember = false
          this.getAllCoursesFirebaseData()
          console.log('已登出')
        }
      });
     },
     // 判斷完是否登入後，讀取用戶老師端學生端資料(開課頁面用)
    async onAuthStateChangedForCreateCourse() {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          this.isMember = false
          router.push('/UserLogin')
          console.log('已登出') 
        } else {
          this.user = user;
          this.isMember = true
          this.getTeacherFirebaseData()
          // this.getStudentFirebaseData()
          // this.getAllCoursesFirebaseData()
          console.log('開課囉') 
        }
      });
    },

    
   
    // 我的課程頁面用(收藏)先存在本地端-------------------------------
    getBookmarkIds () {
      this.bookmarkIds = JSON.parse(localStorage.getItem('bookmarkIds')) || []
    },
    getBookmarkCoursesData () {
      this.getBookmarkIds ()
      this.userBookmarkCourses = []
      this.AllCoursesFirebaseData.forEach((item) => {
        if (this.bookmarkIds.indexOf(item.id) > -1) {
          this.userBookmarkCourses.push(item)
        }
      })
      this.bookmarkNum = this.userBookmarkCourses.length
      console.log('用戶收藏課程資料', this.userBookmarkCourses)
    },
    toggleBookmark (item) {
      const clickId = item
      const inBookmarks = this.bookmarkIds.some((item) => item === clickId)
      if (!inBookmarks) {
        this.bookmarkIds.push(item)
        localStorage.setItem('bookmarkIds', JSON.stringify(this.bookmarkIds))
      } else {
        const delItem = this.bookmarkIds.find((item) => {
          return item === clickId
        })
        this.bookmarkIds.splice(this.bookmarkIds.indexOf(delItem), 1)
        localStorage.setItem('bookmarkIds', JSON.stringify(this.bookmarkIds))
      }
      this.getBookmarkCoursesData()
    },
    // 處理上傳圖片----------------------------------------------
    async uploadPhoto(item, e) {
      try {
        const file = e.target.files[0]
        if (!file) return

        const beforeUploadCheck = await this.beforeUpload(file)
        if (!beforeUploadCheck.isValid) {
          throw beforeUploadCheck.errorMessages
        }
        this.to64(item, file)
      } catch (error) {
        SwalN.fire(error)
        console.log('Catch Error: ', error)
      } finally {
        e.target.value = ''
      }
    },
    beforeUpload (fileObject) {
      return new Promise((resolve) => {
        const validFileTypes = ['image/jpeg', 'image/png']
        const isValidFileType = validFileTypes.includes(fileObject.type)
        const errorMessages = []

        if (!isValidFileType) {
          errorMessages.push('需上傳 JPG 或 PNG 檔!')
        }

        const isValidFileSize = fileObject.size / 1024 / 1024 < 0.15
        if (!isValidFileSize) {
          errorMessages.push('圖片大小需小於0.15MB!')
        }
        resolve({
          isValid: isValidFileType && isValidFileSize,
          errorMessages: errorMessages.join('\n')
        })
      })
    },
    to64 (item, File) {
      const formData = new FormData()
      formData.append('iFile', File)
      const file = formData.get('iFile')
      const reader = new FileReader()
      const fileType = file.type
      reader.readAsDataURL(file)

      // reader读取完成
      reader.onload = e => {
        if (/^image\/[jpeg|png|gif]/.test(fileType)) {
          if (item === 'teacher'){
            // 編輯個人大頭照用，寫這邊可以綁定課程換大頭照也會一起換避免不一致
            this.teacherData.teacherImg = e.target.result
            this.UpdateFirebaseMemberData()
          } else if (item === 'ckeditor') {
            this.teacherData.ckeditorImg = e.target.result
            this.UpdateFirebaseMemberData()
          } else if (item === 'course') {
            this.beATeacherData.courseImg = e.target.result
          } 
        }
      }
    }   
  },
  getters: {
    bookmarkState () {
      return (id) => {
        return this.bookmarkIds.indexOf(id) > -1 ? 'bi bi bi-bookmark-fill text-white bookmark-on' : 'bi bi-bookmark text-white bookmark-off'
      }
    }
  }
})  