

<template>
  Rendement
  <div id="chartRendement"></div>
</template>

<script lang="ts">


import {defineComponent, onMounted} from 'vue';
import * as c3 from "c3";

export default defineComponent({
  name: "GraphRendement",
  setup: () => {


    onMounted(() => {
      var chart = c3.generate({
        bindto: '#chartRendement',
        data: {
          x: 'Scénario',
          columns: [
            ['Scénario', 'Optimal', 'Scénario 1', 'Scénario 2'],
            ['Optimal', 30, 200, 100, 400, 150, 250],
            ['Scénario 1', 130, 100, 140, 200, 150, 50],
            ['Scénario 1', 130, 100, 140, 200, 150, 50]
          ],
          type: 'bar'
        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
          }
        }

      });

    });
  }
});


</script>
