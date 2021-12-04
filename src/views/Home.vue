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
      Scénarios <va-button @click="pushNewScenario()" :disabled="scenarios.length > 4" icon="add_circle_outline"></va-button>
    </div>
    <div class="content">
      <div class="lane">
        <va-button-group outline>
          <va-button v-for="scenari in scenarios" @click="formValues.selectedScenario = scenari"> {{ scenari.nom }}</va-button>
        </va-button-group>
      </div>

      <div class="lane">
        <div>
          <label for="alea">Aléa</label>
          <va-select id="alea" v-model="formValues.selectedScenario.alea"  :options="aleas" />
        </div>
      </div>
      <div class="lane">
        <div>
          <label for="periode">Période</label>
          <va-date-picker id="periode" mode="range" v-model="formValues.selectedScenario.periode" />
        </div>
      </div>
    </div>
  </div>

  <div class="box">
    <div class="content">
      <TestC3></TestC3>
    </div>
  </div>

  <div class="box">
    <div class="content">
      <GraphRendement></GraphRendement>
    </div>
  </div>

  <div class="box">
    <div class="content">
      <GraphMarge></GraphMarge>
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
import {defineComponent, reactive} from 'vue';
import GraphRendement from '@/components/GraphRendement.vue'
import GrapheMarge from '@/components/GraphMarge.vue'
export default defineComponent({
  name: 'Home',
  components: {
    GraphRendement,
    GrapheMarge
  },
  props: {
  },
  setup: () => {

    type Scenari ={ nom: string};

    const sols = [...Array(3).keys()].map( v => `sol_${v+1}`);
    const cultures = [...Array(3).keys()].map( v => `culture_${v+1}`);
    const aleas = [...Array(3).keys()].map( v => `alea_${v+1}`);

    const formValues = reactive({} as any);
    const scenarios = reactive([] as Scenari[]);


    const pushNewScenario = () => {
      scenarios.push({
        nom: `Scénario ${scenarios.length+1}`
      });
    }

    // init first scenari
    pushNewScenario();
    formValues.selectedScenario = scenarios[0];

    return {
      formValues,
      scenarios,
      sols,
      aleas,
      cultures,
      pushNewScenario
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
