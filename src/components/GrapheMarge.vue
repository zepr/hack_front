

<template>
  Affichage du tableau
  <div id="chart"></div>
</template>

<script lang="ts">


import {defineComponent, onMounted} from 'vue';
import * as c3 from "c3";

export default defineComponent({
  name: "GraphMarge",
  setup: () => {


    onMounted( () => {
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
              ['data1',200, 250, 300], //Gain
              ['data2', 100, 150], //Perte
              
          ],
          type: 'bar',
          groups: [                      //un groupe=un scénario
              ['data1', 'data2']
          ]
        }
      })
    }
  },
})


</script>