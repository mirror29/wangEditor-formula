<template>
  <div>
    wangEditor for vue3
    <button @click="toggle">显示/隐藏</button>
  </div>
  <hr>

  <BasicEditor v-if="show"></BasicEditor>
  <!-- <ExtendedEditor v-if="show"></ExtendedEditor> -->
</template>

<script>
import BasicEditor from './components/BasicEditor.vue'
// import ExtendedEditor from './components/ExtendedEditor.vue'

export default {
  name: 'App',
  components: {
    BasicEditor,
    // ExtendedEditor,
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    }
  }
}
</script>
