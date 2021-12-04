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
              placeholder="100"
          />
        </div>
      </div>
      <div class="lane">

        <div>
          <label for="epSol">Epaisseur de sol C0 (mm) - min:{{ configRanges.epSol.min}} - max:{{ configRanges.epSol.max}}</label>
          <va-input
              v-model="formValues.epSol"
              type="number"
              class="m-4"
              id="epSol"
              placeholder="300"
          />
        </div>
        <div>
          <label for="reserveUtileEau">Réserve utile en eau Maximum (mm)</label>
          <va-input
              v-model="formValues.reserveUtileEau"
              type="number"
              class="m-4"
              id="reserveUtileEau"
              placeholder="100"
          />
        </div>
      </div>
      <div class="lane">

        <div>
          <label for="rendementMax">Rendement maximum génétique (q/ha)</label>
          <va-input
              v-model="formValues.rendementMax"
              type="number"
              class="m-4"
              id="rendementMax"
              placeholder="120"
          />
        </div>

        <div>
          <label for="pmgMax">PMG maximum génétique (g)</label>
          <va-input
              v-model="formValues.pmgMax"
              type="number"
              class="m-4"
              id="pmgMax"
              placeholder="42"
          />
        </div>
      </div>

      <div class="lane">
        <div>
          <label for="tempMax">Temperature maximale plant (°C)</label>
          <va-input
              v-model="formValues.tempMax"
              type="number"
              class="m-4"
              id="tempMax"
              placeholder="40"
          />
        </div>
        <div>
          <label for="tempOptimale">Temperature optimale plant (°C)</label>
          <va-input
              v-model="formValues.tempOptimale"
              type="number"
              class="m-4"
              id="tempOptimale"
              placeholder="15"
          />
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
          <label for="coutAssurance">Coût assurance (€/an)</label>
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

          <va-list>

            <va-modal
                v-model="selectedAlea"
                hide-default-actions
            >
              <template #header>
                <h2>Edition aléa</h2>
              </template>
              <slot>
                <div class="lane">
                  <div>
                    <label for="alea">Aléa</label>
                    <va-select id="alea" v-model="selectedAlea.type"  :options="aleaTypes" />
                  </div>
                </div>
                <div class="lane">
                  <div>
                    <label for="periode">Période</label>
                    <va-date-picker id="periode" mode="range" v-model="selectedAlea.periode" />
                  </div>
                </div>
              </slot>
            </va-modal>

            <va-list-label>
              Aléas <va-button icon="add_circle_outline" @click="pushAlea(formValues.selectedScenario)"></va-button>
            </va-list-label>

            <va-list-item
                v-for="(alea, aleaIndex) in formValues.selectedScenario.aleas"
                :key="aleaIndex"
            >
              <va-list-item-section avatar>
                <va-icon
                    :name="aleaIcones[alea.type].icon"
                    :color="aleaIcones[alea.type].color"
                />
              </va-list-item-section>

              <va-list-item-section>
                <va-list-item-label>
                  {{ alea.type }}
                </va-list-item-label>

                <va-list-item-label caption>
                  {{ dateService.formatToRelativeFrLocalDate(alea.periode?.start) }}<span v-if="alea.periode.end"> - {{ dateService.formatToRelativeFrLocalDate(alea.periode?.end) }}</span>
                </va-list-item-label>
              </va-list-item-section>

              <va-list-item-section icon>
                <va-icon @click='formValues.selectedScenario.aleas.splice(aleaIndex, 1)' name="remove_circle_outline" color="red" ></va-icon>
              </va-list-item-section>
            </va-list-item>
          </va-list>
        </div>

      </div>
    </div>
  </div>

  <div class="box">
    <div class="content">
      <GraphBiomasse></GraphBiomasse>
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
    <div class="content">
      {{ scenarios }}
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, reactive, ref, Ref} from 'vue';
import GraphRendement from '@/components/GraphRendement.vue'
import GraphMarge from '@/components/GraphMarge.vue'
import GraphBiomasse from '@/components/GraphBiomasse.vue'
import { useDateService } from "@/services/date.service";

export default defineComponent({
  name: 'Home',
  components: {
    GraphBiomasse,
    GraphRendement,
    GraphMarge
  },
  props: {
  },
  setup: () => {
    type Periode = {start: Date, end?: Date};
    type Alea = { type: string, periode?: Periode, intensite: number};
    type Scenari = { nom: string, aleas: Alea[]};

    type Range = { min: number, max: number, default: number};

    const dateService = useDateService();

    const solTypes = [...Array(3).keys()].map(v => `sol_${v+1}`);
    const aleaTypes = ['Sécheresse', 'Thermique', 'Grèle'];

    const aleaIcones = {
      'Sécheresse': { icon: 'local_fire_department', color:'#ec660e'},
      'Thermique': { icon: 'thermostat', color: '#d50f0f'},
      'Grèle': { icon: 'grain', color: '#7fdbff'},
    };

    const configRanges = {
      surface: {min: 5, max: 500, default: 100},
      epSol: {min: 5, max: 200, default: 100},
      reserveUtileEau: {min: 10, max: 200, default: 100},
      rendementMax: {min: 100, max: 150, default: 120},
      pmgMax: {min: 30, max: 50, default: 42},
      tempMax: {min: 30, max: 50, default: 40},
      tempOptimale: {min: 10, max: 15, default: 30},
      prixDeVente: {min: 5, max: 13, default: 20},
      coutAssurance: {min: 1000, max: 1500, default: 2000},
    };

    const defaultFormValues: any = {lieu: "72000"};

    Object.entries(configRanges).forEach( entry => {
      defaultFormValues[entry[0]] = entry[1].default
    });

    console.log(defaultFormValues)

    const formValues = reactive(defaultFormValues as any);
    const scenarios = reactive([] as Scenari[]);

    const selectedAlea: Ref<null|Alea> = ref(null);

    const pushNewScenario = () => {
      scenarios.push({
        nom: `Scénario ${scenarios.length+1}`,
        aleas: []
      });
    }
    // init first scenari
    pushNewScenario();
    formValues.selectedScenario = scenarios[0];

    const pushAlea = (scenari: Scenari) => {

      scenari.aleas.push({
        type: aleaTypes[0],
        intensite: 0
      });

      selectedAlea.value = scenari.aleas[scenari.aleas.length-1]
    }

    return {
      configRanges,
      formValues,
      scenarios,
      solTypes,
      aleaTypes,
      aleaIcones,
      pushNewScenario,
      pushAlea,
      selectedAlea,
      dateService
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
