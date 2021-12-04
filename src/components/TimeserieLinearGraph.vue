
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
    }
  },
  setup: ({id, data , xName}) => {

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
              format: (x: any) => dateService.formatToFrLocalDate(x)
            }
          }
        },
        point: {
          show: false
        }
        
      }
    );
  })
}
});

</script>
