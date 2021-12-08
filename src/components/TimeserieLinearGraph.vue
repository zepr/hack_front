
<template>
  <div :id="id"></div>
</template>

<script lang="ts">

import {defineComponent, onMounted, PropType, ref, watch} from 'vue';
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
    dataRegions: {
      type: Object as PropType<any[]>
    },
    yAxis: {
      type: Object as PropType<any[]>
    },
    zoom: {
      type: Boolean,
      default: true
    },
    watcher: {
      type: Boolean,
      default: true
    },
    forceFullReload: {
      type: Boolean,
      default: false
    }
  },
  setup: (props) => {

    const dateService = useDateService();

    let chart: c3.ChartAPI;

    const generateChart = () => {
      return c3.generate({
        bindto: `#${props.id}`,
        data: {
          x: props.xName,
          columns: props.data,
          regions: props.dataRegions as any,
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: (x: any) => dateService.formatToFrLocalDate(x),
              count: 12
            }
          },
          y: props.yAxis as any

        },

        legend:{
          show:false
        },
        grid: props.grid,
        regions: props.regions,
        point: {
          show: false
        },
        zoom: {
          enabled: props.zoom
        }

      });
    };

    if ( props.watcher ){
      watch( () => props.data, () => {
        if ( ! props.forceFullReload ) {
          chart.load({
            columns: props.data
          });
        }else {
          // TODO should find a better way to update regions and xgrides ...
          chart?.destroy();
          console.log(props.regions);
          setTimeout( () => { chart = generateChart() }, 500);
        }

      });
    }

    onMounted( async () => {
      chart = generateChart();
    });

}
});

</script>

<style lang="scss">
  .Sécheresse {
    fill: #ff0000 !important;
  }

  .Eau {
    fill: #007df1 !important;
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
