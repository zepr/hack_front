<template>

  <div class="box" id="paramCulture">
    <div class="header">
        Paramètres de la culture
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
          <label for="anneeRecolte">Année de récolte</label>
          <va-input
              v-model="formValues.annee"
              id="anneeRecolte"
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
            <div>
              <label for="espece">Espèce</label>
              <va-input
                  v-model="formValues.espece"
                  id="espece"
                  placeholder="Blé"
              />
            </div>

          </div>
          <div class="lane">
            <div>
              <label for="rendementMax">Rendement maximum génétique (q/ha)</label>
              <va-input
                  v-model="formValues.rendementMax"
                  type="number"
                  id="rendementMax"
                  placeholder="120"
              />
            </div>
          </div>
          <div class="lane">
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
            <div>
              <label for="tempOptimale">Temperature optimale plant (°C)</label>
              <va-slider
                  v-model="formValues.tempOptimale"
                  color="warning"
                  :min="configRanges.tempOptimale.min"
                  :max="configRanges.tempOptimale.max"
                  track-label-visible
              />
            </div>
          </div>

        </div> <!-- FIN COLONNE CONTENANT DONNEES PLANTE-->

        <div> <!-- CREATION DE LA COLONNE CONTENANT DONNEES SOL-->
          <div class="lane">
            Données sol
          </div>
          <div class="lane" style="height: 200px;">
            <label for="epSol">Epaisseur de sol C0 (mm) - min:{{ configRanges.epSol.min}} - max:{{ configRanges.epSol.max}}</label>

            <va-slider v-model="formValues.epSol" vertical color="#976318"
              heigth=1000px
                :min="configRanges.epSol.min"
                :max="configRanges.epSol.max"
                track-label-visible
              >
              <template #prepend>
                <va-input type="number" v-model="formValues.epSol"></va-input>
              </template>
            </va-slider>

            
            

          </div>
          <div class="lane" style="height: 150px;">
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

          </div>

        </div> <!-- FIN COLONNE CONTENANT DONNEES SOL et COUTS-->


      </div> <!-- FIN LIGNE CONTENANT DONNEES PLANTE ET SOL/COUTS-->
    </div>
   <!-- Fin de la page-->

  <div class="box" id="projectionTheorique">
    <div class="header">
      Développement de la plante
    </div>
    <div class="content">
      <div class="lane">
        Evolution potentielle de la biomasse
      </div>
      <div class="lane">
        <div>
          <TimeserieLinearGraph
              v-if="matiereSecheSimulationTheorique.length >= 2"
              :data="matiereSecheSimulationTheorique"
              id="matiereSeche"
              :x-name="date"
              :yAxis="{label:{text: 'Matière sèche (g/cm2)',position: 'outer-center'}}"
                
                            
            ></TimeserieLinearGraph>
            
        </div>
        <div style="width: 100px"> 
          Rendement potentiel: XX Qt/ha
        </div>
      </div>
      <div class="lane">
        
      </div>
      <div class="lane">
        Risque climatique
      </div>
      <div class="lane">
        <GraphProba></GraphProba>
      </div>
    </div>
  </div>

  <div class="box" id="paramScenario">
    <div class="header">
      Simulation des aléas climatiques 
    </div>
    <div class="content">
      <div class="lane">
        <va-button-group outline>
          <va-button v-for="scenari in scenarios" @click="formValues.selectedScenario = scenari"> {{ scenari.nom }}</va-button>
        </va-button-group>
      </div>
      <div class="lane" length="100px">
        <va-button @click="pushNewScenario()" :disabled="scenarios.length > 4" icon="add_circle_outline"></va-button>
        <va-button @click="deleteNewScenario()" :disabled="scenarios.length > 4" icon="remove_circle_outline"></va-button>
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
                <div class="header" width='50px'>
                  Aléa
                </div>
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
                <div>
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
                <div>
                </div>
                <div class="lane">
                  <div>
                    <label for="periode">Période</label>
                    <va-date-picker 
                      id="periode" 
                      start-year="2000" 
                      end-year="2050" 
                      mode="range" 
                      v-model="selectedAlea.periode" />
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
      Evolution de la biomasse
    </div>
    <div class="content">
      <div class="lane">
        <TimeserieLinearGraph
            v-if="matiereSecheSimulationScenarioPlusTheorique.length >= 3"
            :data="matiereSecheSimulationScenarioPlusTheorique"
            id="matiereSecheSimulation"
            :x-name="date"
        ></TimeserieLinearGraph>
      </div>
      <div class="lane">
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
import {computed, defineComponent, reactive, ref, Ref} from 'vue';
import GraphRendement from '@/components/GraphRendement.vue'
import GraphMarge from '@/components/GraphMarge.vue'
import GraphBiomasse from '@/components/GraphBiomasse.vue'
import GraphProba from'@/components/GraphProba.vue'
import { useDateService } from "@/services/date.service";
import {useApiService} from "@/services/api.service";
import TimeserieLinearGraph from "@/components/TimeserieLinearGraph.vue";

export default defineComponent({
  name: 'Home',
  components: {
    TimeserieLinearGraph,
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
    const defaultFormValues: any = {lieu: 'Genneton (79132)'};

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

    // THEORIQUE
    const dataSimulationTheorique = ref({} as any);
    const matiereSecheSimulationTheorique =  ref([] as any[]);
    const rendementSimulationTheorique =  ref([] as any[]);
    const maxRendementSimulationTheorique = ref(0);
    const querySimulationTheorique = async () => {
      const startDate = new Date(formValues.annee, 0, 1);
      const rawSimulationData = apiService.getDatedRendement(startDate, await apiService.getSimulationTheorique());
      const flattenedChartData = apiService.flattenAsChartData(rawSimulationData);
      flattenedChartData.forEach( data => dataSimulationTheorique.value[data[0]] = data);


      matiereSecheSimulationTheorique.value = [dataSimulationTheorique.value["date"], dataSimulationTheorique.value["matiereSecheTheorique"]];

      rendementSimulationTheorique.value = [dataSimulationTheorique.value["date"], dataSimulationTheorique.value["rendement"]];

      maxRendementSimulationTheorique.value = Math.max(...(dataSimulationTheorique.value["rendement"].slice(1)));
    };


    // SIMULATION
    const dataSimulationScenario = ref({} as any);
    const maxRendementSimulationScenario = ref(0);
    const matiereSecheSimulationScenarioPlusTheorique =  ref([] as any[]);
    const querySimulationScenario = async () => {
      const startDate = new Date(formValues.annee, 0, 1);
      const rawSimulationData = await apiService.getDatedRendement(startDate, await apiService.getSimulationScenario());
      const flattenedChartData = apiService.flattenAsChartData(rawSimulationData);
      flattenedChartData.forEach( data => dataSimulationScenario.value[data[0]] = data);

      const renamedDataSimulationScenario = ["matiereSecheScenario",...dataSimulationScenario.value["matiereSeche"].slice(1)];
      matiereSecheSimulationScenarioPlusTheorique.value = [dataSimulationScenario.value["date"], renamedDataSimulationScenario, dataSimulationTheorique.value["matiereSeche"]];

      maxRendementSimulationScenario.value = Math.max(...(dataSimulationScenario.value["rendement"].slice(1)));

    };
    querySimulationTheorique()
        .then( () => {
      querySimulationScenario();
    });



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
      searchOptionsLieux,
      matiereSecheSimulationTheorique,
      rendementSimulationTheorique,
      matiereSecheSimulationScenarioPlusTheorique,
      maxRendementSimulationScenario,
      maxRendementSimulationTheorique
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
