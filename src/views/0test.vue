<template>

  <div class="container">
    <div class="row">
      <div class="col-3 d-none d-md-block">
        55
      </div>
      <div class="col">
  
      </div>
    </div>
  </div>
    帳戶設定
    信箱驗證
    手機驗證
    修改密碼
    <!-- <div class="m-5"
      @click="test">
      真難
    </div>
    <div class="m-5"
      @click="test2">
      真難欸
    </div> -->
  
  
    
  
  </template>
    
  
  
  
  
  <script>
  import { mapState, mapActions, mapWritableState } from 
  'pinia' 
  import dataStore from '@/stores/dataStore'
  
  import { doc, setDoc, Timestamp, getFirestore, updateDoc} from "firebase/firestore";
  const db = getFirestore()
  export default {
    data () {
      return {
        loading: true,
      }
    },
    computed: {
      ...mapState(dataStore, ['testD']),
  
    },
    methods: {
      async test() {
        const docData = {
            stringExample: "Hello world!",
            booleanExample: true,
            numberExample: 3.14159265,
            dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
            arrayExample: [5, true, "hello"],
            nullExample: null,
            objectExample: {
                a: 5,
                b: {
                    nested: "foo"
                }
            }
        };
        await setDoc(doc(db, "data", "one"), docData);    
      },
      async test2() {
        const washingtonRef = doc(db, "data", "one");
  
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
              // capital: [{sss : 5566}, {ssss : 55667788}]
              capital: this.testD
        });
      }
    },
    created () {
      // this.onAuthStateChangedForCreateCourse()
      console.log(this.testD)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>