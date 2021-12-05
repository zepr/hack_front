<template>
  <div id="gaugeRatio"></div>
</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
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
  setup: ({expected, actual}) => {
    onMounted( () => {
      let chart = c3.generate({
        bindto: `#gaugeRatio`,
        data: {
          columns: [
            ['perte de rendement (%)', Math.max(0, actual / expected * 100)]
          ],
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
  }
});
</script>
