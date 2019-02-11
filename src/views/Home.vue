<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Contract msg="Nage DApp"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Contract from '@/components/Contract.vue'

export default {
  name: 'home',
  components: {
    Contract
  }
}
</script>
