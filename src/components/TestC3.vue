

<template>
  Affichage du tableau
  <div id="chart"></div>
</template>

<script lang="ts">


import {defineComponent, onMounted} from 'vue';
import * as c3 from "c3";

export default defineComponent({
  name: "TestC3",
  setup: () => {


    onMounted( () => {
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        }
      });
    })

  }
});

</script>
