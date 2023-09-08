<template>
  <!-- <div data-bs-theme="dark"> -->
    <RouterView />
  <!-- </div> -->
</template>

<script setup>

</script>

<style lang="scss">
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    --webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 6px;
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #ff715f;
    --webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
    background: #ff715f;
}
</style>
