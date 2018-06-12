<template>
  <div class="home">
    <tabs>

      <tab name="Hoy">
        <matches
          stage="today"
        >
        </matches>
      </tab>

      <tab name="G1">
        G1
      </tab>
      <tab name="G2">
        G2
      </tab>
      <tab name="G3">
        G3
      </tab>
      <tab name="G4">
        G4
      </tab>
      <tab name="G5">
        G5
      </tab>
      <tab name="G6">
        G6
      </tab>
      <tab name="G7">
        G7
      </tab>
      <tab name="G8">
        G8
      </tab>

      <tab name="Octavos">
        Octavos
      </tab>
      <tab name="Cuartos">
        Cuartos
      </tab>
      <tab name="Semis">
        Semis
      </tab>
      <tab name="3 y 4">
        3 y 4
      </tab>
      <tab name="Final">
        Final
      </tab>

    </tabs>
    <!-- <img src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import tab from '@/components/tabs/Tab.vue'
import tabs from '@/components/tabs/Tabs.vue'
import matches from '@/components/Matches.vue'

export default {
  name: "home",
  components: {
    tab,
    tabs,
    matches
    // HelloWorld
  }
};
</script>
