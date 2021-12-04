<template>

  <div class="box" id="paramCulture">
    <div class="header">
        Paramètre culture
    </div>

    <div class="content">
      <div class="lane">
        <div>
          <label for="lieu">Commune (Vienne et Deux-Sèvres)</label>
          <va-select
              id="lieu"
              @update-search="searchOptionsLieux"
              :options="optionsLieux"
              v-model="formValues.lieu"
              no-options-text="Pas de correspondance trouvée"
              searchable
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
          <label for="Année de récolte">Année de récolte</label>
          <va-input
              class="m-4"
              v-model="formValues.annee"
              id="année"
              type="number"
          />
        </div>
      </div>

      <!-- CREATION DE LA LIGNE CONTENANT DONNEES PLANTE ET SOL-->
      <div class="lane">
        <div class="subbox"> <!-- CREATION DE LA COLONNE CONTENANT DONNEES PLANTE-->
          <div class="lane">
            Données culture
          </div>
          <div class="lane">
            <label for="Espèce">Espèce</label>
            <va-input
                v-model="formValues.espece"
                type="number"
                class="m-4"
                id="espece"
                placeholder="Blé"
            />
          </div>
          <div class="lane">
            <label for="rendementMax">Rendement maximum génétique (q/ha)</label>
            <va-input
                v-model="formValues.rendementMax"
                type="number"
                class="m-4"
                id="rendementMax"
                placeholder="120"
            />
          </div>
          <div class="lane">
            <label for="pmgMax">PMG maximum génétique (g)</label>
            <va-input
                v-model="formValues.pmgMax"
                type="number"
                class="m-4"
                id="pmgMax"
                placeholder="42"
            />
          </div>
          <div class="lane"> 
            <div>
              <label for="tempMax">Temperature maximale plant (°C)</label>
              <va-slider 
                v-model="formValues.tempMax"
                color="#e34a4a"
                :min="configRanges.tempMax.min"
                :max="configRanges.tempMax.max"
                track-label-visible
                />
            </div>
          </div>
          <div class="lane">
            <label for="tempOptimale">Temperature optimale plant (°C)</label>
            <va-slider
              v-model="formValues.tempOptimale"
              color="warning"
              :min="configRanges.tempOptimale.min"
              :max="configRanges.tempOptimale.max"
              track-label-visible
            />
          </div>

        </div> <!-- FIN COLONNE CONTENANT DONNEES PLANTE-->

        <div> <!-- CREATION DE LA COLONNE CONTENANT DONNEES SOL-->
          <div class="lane">
            Données sol
          </div>
          <div class="lane" style="height: 50px;">
            <label for="epSol">Epaisseur de sol C0 (mm) - min:{{ configRanges.epSol.min}} - max:{{ configRanges.epSol.max}}</label>

            <va-slider 
                v-model="formValues.epSol"
                vertical
                color="#976318"
                :min="configRanges.epSol.min"
                :max="configRanges.epSol.max"
                track-label-visible
            />

          </div>
          <div class="lane" style="height: 50px;">
            <label for="reserveUtileEau">Réserve utile en eau Maximum (mm)</label>
            <va-slider 
                v-model="formValues.reserveUtileEau"
                vertical
                color="#181C97"
                :min="configRanges.reserveUtileEau.min"
                :max="configRanges.reserveUtileEau.max"
                track-label-visible
            />
          </div>
          <div class="lane"> <!--PARTIE PRIX-->
            Informations financières
          </div>
          <div class="lane">

            <label for="prixDeVente">Prix de vente (€/t)</label>
            <va-input
                v-model="formValues.prixDeVente"
                type="number"
                class="m-4"
                id="prixDeVente"
                placeholder="100"
            />
          </div>
          <div class="lane">
            <label for="coutAssurance">Coût assurance (€/an)</label>
            <va-input
                v-model="formValues.coutAssurance"
                type="number"
                class="m-4"
                id="coutAssurance"
                placeholder="100"
            />
          </div>

        </div> <!-- FIN COLONNE CONTENANT DONNEES SOL et COUTS-->


      </div> <!-- FIN LIGNE CONTENANT DONNEES PLANTE ET SOL/COUTS-->





    </div>
  </div> <!-- Fin de la page-->

  <div class="box" id="projectionTheorique">
    <div class="header">
      Projection Théorique
    </div>
  </div>

  <div class="box" id="paramScenario">
    <div class="header">
      Paramétrage Scénarios <va-button @click="pushNewScenario()" :disabled="scenarios.length > 4" icon="add_circle_outline"></va-button>
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
                    <label for="aleaType">Aléa</label>
                    <va-option-list
                        id="aleaType"
                        type="radio"
                        :options="aleaTypes"
                        v-model="selectedAlea.type"
                    />
                  </div>
                </div>
                <div class="lane">
                  <div>
                    <label for="aleaIntensity">Intensité</label>
                    <va-slider id="aleaIntensity"
                               :label="intensiteTypes[selectedAlea.intensite].label"
                               :label-color="intensiteTypes[selectedAlea.intensite].color"
                               :color="intensiteTypes[selectedAlea.intensite].color"
                               v-model="selectedAlea.intensite"
                               min="0" max="2" />
                  </div>
                </div>
                <div class="lane">
                  <div>
                    <label for="periode">Période</label>
                    <va-date-picker id="periode" start-year="2000" end-year="2000" mode="range" v-model="selectedAlea.periode" />
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
                @click="selectedAlea = alea"
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
                  {{ dateService.formatToRelativeFrLocalDate(alea?.periode?.start) }}<span v-if="alea?.periode?.end"> - {{ dateService.formatToRelativeFrLocalDate(alea.periode?.end) }}</span>
                </va-list-item-label>
              </va-list-item-section>

              <va-list-item-section icon>
                <va-icon @click='formValues.selectedScenario.aleas.splice(aleaIndex, 1)' name="remove_circle_outline" color="danger" ></va-icon>
              </va-list-item-section>
            </va-list-item>
          </va-list>
        </div>

      </div>
    </div>
  </div>

  <div class="box" id="simulationScenario">
    <div class="header">
      Simulation Scénario
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
import GraphProba from'@/components/GraphProba.vue'
import { useDateService } from "@/services/date.service";
import {useApiService} from "@/services/api.service";

export default defineComponent({
  name: 'Home',
  components: {
    GraphBiomasse,
    GraphRendement,
    GraphMarge,
    GraphProba
  },
  props: {
  },
  setup: () => {
    type Periode = {start: Date, end?: Date};
    type Alea = { type: string, periode?: Periode, intensite: number};
    type Scenari = { nom: string, aleas: Alea[]};

    type Range = { min: number, max: number, default: number};

    const dateService = useDateService();
    const apiService = useApiService();

    const solTypes = [...Array(3).keys()].map(v => `sol_${v+1}`);
    const aleaTypes = ['Sécheresse', 'Thermique', 'Grèle'];

    const aleaIcones = {
      'Sécheresse': { icon: 'local_fire_department', color:'#ec660e'},
      'Thermique': { icon: 'thermostat', color: '#d50f0f'},
      'Grèle': { icon: 'grain', color: '#7fdbff'},
    };

    const ConfigIcones = {
      'Culture':{icon:'plant', color:'#3F9634'},
    };

    const intensiteTypes = [
      {label: 'faible',color: 'success'},
      {label: 'moyen', color: 'warning'},
      {label: 'fort', color: 'danger'}
    ]

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
      annee: {min:2011, max:2050, default:2014}
    };


    /* init with default values ! */
    const defaultFormValues: any = {lieu: 'Adriers (86001)'};

    Object.entries(configRanges).forEach( entry => {
      defaultFormValues[entry[0]] = entry[1].default
    });

    const defaultScenarios: Scenari[] = [
        { "nom": "Scénario 1",
          "aleas": [
            { "type": "Grèle", "intensite": 1 , periode: { start: new Date() }},
            { "type": "Sécheresse", "intensite": 0 , periode: { start: new Date(), end: new Date() } }
          ]
        }
    ];

    const formValues = reactive(defaultFormValues as any);
    const scenarios = reactive(defaultScenarios);


    const selectedAlea: Ref<null|Alea> = ref(null);

    const pushNewScenario = () => {
      scenarios.push({
        nom: `Scénario ${scenarios.length+1}`,
        aleas: []
      });
    }
    formValues.selectedScenario = scenarios[0];

    const pushAlea = (scenari: Scenari) => {

      scenari.aleas.push({
        type: aleaTypes[0],
        intensite: 0
      });

      selectedAlea.value = scenari.aleas[scenari.aleas.length-1]
    }

    const optionsLieux = ref([defaultFormValues.lieu] as string[]);
    const searchOptionsLieux = async (criteria: string) => {
      optionsLieux.value = await apiService.findVille(criteria);
    }

    return {
      configRanges,
      formValues,
      scenarios,
      solTypes,
      aleaTypes,
      aleaIcones,
      intensiteTypes,
      pushNewScenario,
      pushAlea,
      selectedAlea,
      dateService,
      optionsLieux,
      searchOptionsLieux
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
