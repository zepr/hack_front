

<template>
  Affichage du tableau de rendement
  <div id="chartRendement"></div>
</template>

<script lang="ts">


import {defineComponent, onMounted, PropType, Ref} from 'vue';
import * as c3 from "c3";
import {useApiService} from "@/services/api.service";

export default defineComponent({
  name: "ChartRendement",
  props: {
  },
  setup: () => {

    onMounted( () => {

      const apiService = useApiService();
      const startDate = new Date('2014-01-01');
      apiService.getDatedRendement(startDate).then( rendement => {
        const flattenedData = apiService.flattenAsChartData(rendement);

        console.log(flattenedData);

        var chart = c3.generate({
          bindto: '#chartRendement',
          data: {
            columns: flattenedData
          }
        });
      })



    })

  }
});

</script>
