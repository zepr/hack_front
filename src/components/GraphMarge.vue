

<template>
  Affichage du tableau
  <div id="chartMarge"></div>
</template>

<script lang="ts">


import {defineComponent, onMounted} from 'vue';
import * as c3 from "c3";

export default defineComponent({
  name: "GraphMarge",
  setup: () => {


    onMounted( () => {
      var chart = c3.generate({
        bindto: '#chartMarge',
        data: {
          x:'date',
          columns: [
              ['date', '2014-01-01', '2014-01-10', '2014-01-20', '2014-01-30', '2014-02-01'],
              ['scénario1', 30, 200, 100, 400, 500, 550],
              ['scénario2', 30, 200, 50, 100, 150, 250]
          ],
        },
        axis: {
          x: {
              type: 'timeseries',
              tick: {
                format:(x:any) => `${x.getDate()}/${x.getMonth()+1}/${x.getFullYear()}`
              }
          }

        },
        grid: { // Représenter les axes des épisodes ponctuels
          x: {
              lines: [
                  {value: '2014-01-10' , text: 'Gel'}
              ]
          }

        },
        regions: [ // Représenter les plages des épisodes étendus
            {start: '2014-01-05', end: '2014-01-10'},

        ]
      },

    );
  })
}
});

</script>
