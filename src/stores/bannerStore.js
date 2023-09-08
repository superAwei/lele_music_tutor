import { defineStore } from 'pinia'


export default defineStore('bannerStore', {
  state: () => ({
    bgUrl: '',
    banner: {
      title : '',
      text: '',
      footer: '',
    }
  }),
  actions: {
    getBannerInfo(bgUrl,title,text,footer) {
      this.bgUrl = bgUrl
      this.banner.title = title
      this.banner.text = text
      this.banner.footer = footer
    }
  }
})
