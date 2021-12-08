<template>
  <div id="gaugeRatio"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch} from "vue";
import * as c3 from "c3";
export default defineComponent({
  name: "GaugeRatio",
  props: {
    expected: {
      type: Number,
      default: 1
    },
    actual: {
      type: Number,
      default: 0
    }
  },
  setup: (props) => {

    const buildColumns = () : any => {
      return [['perte de rendement (%)', Math.max(0, (1 - props.actual / props.expected) * 100)]];
    }
    let chart: c3.ChartAPI;
    onMounted( () => {
      chart = c3.generate({
        bindto: `#gaugeRatio`,
        data: {
          columns: buildColumns(),
          type: 'gauge',
        },
        color: {
          pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'],
          threshold: {
            values: [10,20,30,50]
          }
        }
      })
    });

    watch( () => [props.actual, props.expected] , () => {
      chart?.load({
        columns: buildColumns()
      });
    })
  }
});
</script>
