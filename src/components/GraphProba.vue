<!--Graph Proba-->


<template>
Probabilité des aléas
<div id="chartgraphProba"></div>

</template>

<script lang="ts">


import {defineComponent, onMounted} from 'vue';
import * as c3 from "c3";


export default defineComponent({
  name: "GraphProba",
  setup: () => {


    onMounted( () => {
      var chart = c3.generate({
        bindto: '#chartgraphProba',
        data: {
          x:'date',
          columns: [
              ['exces eau 1', 0.30, 0.200, 0.100, 0.400, 0.500, 0.550],
              ['sécheresse', 0.30, 0.200, 0.50, 0.100, 0.150, 0.250]
          ],
        },
        axis: {
          x: {
              type: 'timeseries',
              tick: {
                  format: '%Y-%m-%d'
              }
          }
        },
        grid: { // Représenter le seuil de probabilité
          y: {
              lines: [
                  {value: '0.5' , text: 'Seuil'}
              ]
          }
             
        }, 
                
      },
      
    );
  })
}
});

</script>