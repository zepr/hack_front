<!--Graph Proba-->


<template>

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
              ['date','2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
              ['exces eau', 0.30, 0.200, 0.100, 0.400, 0.500, 0.550],
              ['sécheresse', 0.30, 0.200, 0.50, 0.100, 0.150, 0.250]
          ],
          type:'spline'
        },
        legend:{
          position:'right'
        },

        axis: {
          x: {
              type: 'timeseries',
              label: 'Année',
              tick: {
                  format: '%Y-%m-%d'
              }
          },
          y: {
            label: {
              text:'Probabilité d apparition',
              position: 'outer-middle'
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