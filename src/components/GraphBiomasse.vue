

<template>
  Biomasse
  <div id="chartBiomasse"></div>
</template>

<script lang="ts">

import {defineComponent, onMounted} from 'vue';
import { useApiService } from "@/services/api.service";
import { useDateService } from "@/services/date.service";
import * as c3 from "c3";

export default defineComponent({
  name: "GraphBiomasse",
  setup: () => {

    const apiService = useApiService();
    const dateService = useDateService();

    onMounted( async () => {

      const startDate = new Date('2013-06-01');
      const rendement = apiService.getDatedRendement(startDate, await apiService.getSimulationTheorique());
      const flattenedData = apiService.flattenAsChartData(rendement);

      var chart = c3.generate({
        bindto: '#chartBiomasse',
        data: {
          x:'date',
          columns: flattenedData,
        },
        axis: {
          x: {
              type: 'timeseries',
              tick: {
                format:(x:any) => dateService.formatToFrLocalDate(x)
              }
          }

        },
        grid: { // Représenter les axes des épisodes ponctuels
          x: {
              lines: [
                  {value: '2014-01-01' , text: 'Gel'}
              ]
          },
          y: {
            lines: [
              {value:800, text: 'test'}
            ]
          }

        },
        regions: [ // Représenter les plages des épisodes étendus
            {start: '2014-01-05', end: '2014-01-15'}
        ]
      },

    );
  })
}
});

</script>
