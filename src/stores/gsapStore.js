import { defineStore } from 'pinia'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineStore('gsapStore', {
  actions: {
    loadingAnimation () {
      gsap.to('.home-loading', {
        opacity: 0,
        delay: 5
      })
    },
  }
})
