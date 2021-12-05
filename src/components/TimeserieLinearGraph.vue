
<template>
  <div :id="id"></div>
</template>

<script lang="ts">

import {defineComponent, onMounted, PropType} from 'vue';
import { useDateService } from "@/services/date.service";
import * as c3 from "c3";

export default defineComponent({
  name: "TimeserieLinearGraph",
  props: {
    id: {
      type: String
    },
    data: {
      type: Object as PropType<any[]>
    },
    xName: {
      type: String,
      default: "date"
    },
    grid: {
      type: Object as PropType<any>
    },
    regions: {
      type: Object as PropType<any[]>
    },
    yAxis: {
      type: Object as PropType<any[]>
    }
  },
  setup: ({id, data , xName, grid, regions, yAxis}) => {

    console.log("data", (data as any)[0]);
    console.log("id", id);
    console.log("xName",xName);

    const dateService = useDateService();

    onMounted( async () => {

      var chart = c3.generate({
        bindto: `#${id}`,
        data: {
          x: xName,
          columns: data,

        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: (x: any) => dateService.formatToFrLocalDate(x),
              count: 12
            }
          },
          y: yAxis as any

        },

        legend:{
          show:false
        },
        grid: grid,
        regions: regions,
        point: {
          show: false
        }

      }
    );
  })
}
});

</script>

<style lang="scss">
  .Sécheresse {
    fill: #ff0000 !important;
  }

  .c3-axis-y-label {
    fill: #252525 !important;
    font: 15px Avenir !important;
    font-weight: bold !important;
  }

  .c3-grid-lines {
    text {
      fill: #252525 !important;
      font: 15px Avenir !important;
      font-weight: bold !important;
    }
  }
</style>
