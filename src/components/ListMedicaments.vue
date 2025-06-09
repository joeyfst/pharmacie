<script setup>
import { onMounted, ref, watch } from 'vue';
import Medicament from '../medicament.js'
import CardMedicament from './CardMedicament.vue'
import FormMedicament from './FormMedicament.vue'
import RechercheMedicament from './RechercheMedicament.vue'

const urlAPI = "https://apipharmacie.pecatte.fr/api/5/medicaments"
let listeMedicaments = ref([]);
let termeRecherche = ref("");
let messagesErreur = ref([]);

function getMedicaments() {
    let urlRecherche = urlAPI;
    if (termeRecherche.value != "") {
        urlRecherche += "?search=" + termeRecherche.value;
    }
    const fetchOptions = { method: "GET" };
    fetch(urlRecherche, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            listeMedicaments.value = [];
            for (let medicament of dataJSON) {
                listeMedicaments.value.push(new Medicament(medicament))
            }
        })
        .catch((error) => {
            nouveauMessageErreur("Une erreur est survenue lors de la requête")
        });

}

function modifierRecherche(nouvelleRecherche) {
    termeRecherche.value = nouvelleRecherche;
}

function ajouterMedicament(nom, forme, quantite, photo) {
    if (quantite < 1) {
        nouveauMessageErreur("La quantité du médicament doit être supérieure à 0")
        return;
    }
    for(let i = 0; i < listeMedicaments.value.length; i++){
        if(listeMedicaments.value[i].denomination == nom){
            nouveauMessageErreur("Cette dénomination est déjà utilisée pour un autre médicament");
            return;
        }
    }
    let medicament = { denomination: nom, formepharmaceutique: forme, qte: quantite, photo: photo }
    const fetchOptions = { method: "POST", body: JSON.stringify(medicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            nouveauMessageErreur("Une erreur est survenue lors de la requête")
        });
}

function modifierMedicament(id, nom, forme, quantite, photo) {
    if (quantite < 1) {
        nouveauMessageErreur("La quantité du médicament doit être supérieure à 0")
        return;
    }
    for(let i = 0; i < listeMedicaments.value.length; i++){
        if(listeMedicaments.value[i].denomination == nom && listeMedicaments.value[i].id != id){
            nouveauMessageErreur("Cette dénomination est déjà utilisée pour un autre médicament");
            return;
        }
    }
    let medicament = { id: id, denomination: nom, formepharmaceutique: forme, qte: quantite, photo: photo }
    const fetchOptions = { method: "PUT", body: JSON.stringify(medicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            nouveauMessageErreur("Une erreur est survenue lors de la requête")
        });
}

function supprimerMedicament(medicament) {
    const fetchOptions = { method: "DELETE", body: JSON.stringify(medicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI + "/" + medicament.id, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            nouveauMessageErreur("Une erreur est survenue lors de la requête")
        });
}

function modifierQuantiteMedicament(medicament, difference) {
    if (medicament.qte + difference == 0) {
        supprimerMedicament(medicament);
        return;
    }
    const newMedicament = { qte: medicament.qte + difference, id: medicament.id }
    const fetchOptions = { method: "PUT", body: JSON.stringify(newMedicament), headers: { "Content-Type": "application/json" } };
    fetch(urlAPI, fetchOptions)
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
            getMedicaments()
        })
        .catch((error) => {
            nouveauMessageErreur("Une erreur est survenue lors de la requête")
        });
}

function nouveauMessageErreur(message) {
    messagesErreur.value.push(message);
}

onMounted(() => {
    getMedicaments();
})

watch(termeRecherche, () => {
    getMedicaments();
})

</script>


<template>
    <div class="d-flex flex-row position-relative">
        <div class="d-flex flex-column align-center flex-grow-1">
            <RechercheMedicament class="w-75 mt-3" @eventRechercher="modifierRecherche"></RechercheMedicament>
            <h1>Liste des médicaments</h1>
            <CardMedicament v-for="(medic, index) in listeMedicaments" :key="medic.id" :medicament="medic"
                @eventQuantite="modifierQuantiteMedicament" @eventModif="modifierMedicament"
                @eventDelete="supprimerMedicament">
            </CardMedicament>
        </div>
        <div>
            <FormMedicament class="position-sticky top-0 mr-4 mt-4" @eventAjouter="ajouterMedicament"></FormMedicament>
            <v-snackbar-queue v-model="messagesErreur" color="error" :timeout="3000"></v-snackbar-queue>
        </div>
    </div>
</template>