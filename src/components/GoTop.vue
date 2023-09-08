<template>
  <div :class="{'d-none' : !goTopIcon }">
    <a href="#" @click.prevent="goTop">
      <span class="material-symbols-outlined goTop">
        expand_less
      </span>
    </a>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import windowStore from '@/stores/windowStore'
export default {
  computed: {
    ...mapState(windowStore, ['goTopIcon'])
  },
  methods: {
    ...mapActions(windowStore, ['scroll', 'goTop']),
  },
  mounted () {
    this.scroll()
  }
}
</script>

<style lang="scss" scoped>
.goTop{
  position: fixed;
  background: #ffffff;
  right: 20px;
  bottom: 10px;
  z-index: 99;
  font-size: 40px;
  border-radius: 50%;
  border: 1px solid #ff715f;
}
</style>
