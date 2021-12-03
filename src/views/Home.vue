<template>

  <div class="box">
    <div class="header">
        Configuration parcelle
    </div>
    <div class="content">
      <div class="lane">
        <div>
          <label for="lieu">Lieu</label>
          <va-input
              class="m-4"
              v-model="formValues.lieu"
              id="lieu"
              label="Lieu"
              placeholder="PRA"
          />
        </div>
        <div>
          <label for="surface">Surface (HA)</label>
          <va-input
              type="number"
              v-model="formValues.surface"
              class="m-4"
              id="surface"
              label="Surface (HA)"
              placeholder="100"
          />
        </div>
      </div>
      <div class="lane">
        <div>
          <label for="sol">Type de sol</label>
          <va-select id="sol" v-model="formValues.sol"  :options="sols" />
        </div>
        <div>
          <label for="culture">Culture</label>
          <va-select id="culture" v-model="formValues.culture"  :options="cultures" />
        </div>
      </div>
      <div class="lane">
        <div>
          <label for="prixDeVente">Prix de vente (€/t)</label>
          <va-input
              v-model="formValues.prixDeVente"
              type="number"
              class="m-4"
              id="prixDeVente"
              placeholder="100"
          />
        </div>
        <div>
          <label for="coutAssurance">Coût assurance</label>
          <va-input
              v-model="formValues.coutAssurance"
              type="number"
              class="m-4"
              id="coutAssurance"
              placeholder="100"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="box">
    <div class="header">
      debug
    </div>
    <div class="content">
      {{ formValues }}
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
  },
  props: {
  },
  setup: () => {

    const sols = [...Array(3).keys()].map( v => "sol_"+v);
    const cultures = [...Array(3).keys()].map( v => "culture_"+v);

    const formValues = reactive({});

    return {
      formValues,
      sols,
      cultures
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
