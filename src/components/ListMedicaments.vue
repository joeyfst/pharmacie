<script setup>
import { onMounted, ref, watch } from 'vue';
import Medicament from '../medicament.js'
import CardMedicament from './CardMedicament.vue'
import FormMedicament from './FormMedicament.vue'

const urlAPI = "https://apipharmacie.pecatte.fr/api/5/medicaments"
let listeMedicaments = ref([]);

function getMedicaments() {
    const fetchOptions = { method: "GET" };
    fetch(urlAPI, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            console.log(dataJSON)
            listeMedicaments.value = [];
            for (let medicament of dataJSON) {
                listeMedicaments.value.push(new Medicament(medicament))
            }
            console.log(listeMedicaments.value)
        })
        .catch((error) => {
            console.log(error);
        });

}

function ajouterMedicament(nom, forme, quantite){
    let medicament = { denomination:nom, formepharmaceutique:forme, qte:quantite}
    const fetchOptions = { method: "POST", body: JSON.stringify(medicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            console.log(error);
        });
}

function modifierMedicament(medicament) {

}

function supprimerMedicament(medicament) {
    console.log(JSON.stringify(medicament))
    const fetchOptions = { method: "DELETE", body: JSON.stringify(medicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI + "/" + medicament.id, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            console.log(error);
        });
}

function modifierQuantiteMedicament(medicament, difference) {
    if (medicament.qte + difference < 0) {
        return;
    }
    console.log("a")
    const newMedicament = {
        qte: medicament.qte + difference,
        id: medicament.id
    }
    console.log(newMedicament)
    const fetchOptions = { method: "PUT", body: JSON.stringify(newMedicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            console.log(error);
        });
}


onMounted(() => {
    getMedicaments()
})


</script>


<template>
    <FormMedicament @eventAjouter="ajouterMedicament"></FormMedicament>
    <h1>Liste des médicaments</h1>
    <CardMedicament v-for="(medic, index) in listeMedicaments" :key="medic.id" :medicament="medic"
        @eventQuantite="modifierQuantiteMedicament" @eventModif="modifierMedicament" @eventDelete="supprimerMedicament">
    </CardMedicament>
</template>