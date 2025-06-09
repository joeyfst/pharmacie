<script setup>
import { ref } from 'vue';

const props = defineProps(["medicament"])
let id = ref("")
let denomination = ref("");
let forme = ref("");
let quantite = ref(1);
const photo = ref(null);
let isModifActive = ref(false);

function revealModif() {
    isModifActive.value = !isModifActive.value;
    id.value = props.medicament.id;
    denomination.value = props.medicament.denomination;
    forme.value = props.medicament.formepharmaceutique;
    quantite.value = props.medicament.qte;
}

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        photo.value = reader.result
    };
    reader.readAsDataURL(file);
};

</script>

<template>

    <v-card variant="outlined" class="w-75 ma-1 d-flex flex-column align-center">
        <v-card-title>{{ medicament.denomination }}</v-card-title>
        <v-card-subtitle>{{ medicament.formepharmaceutique }}</v-card-subtitle>
        <div class="d-flex flex-row justify-space-between">
            <v-card-text class="mr-10">
                <p>Quantité : {{ medicament.qte }}</p>
                <img class="h-auto w-auto" v-bind:src="'https://apipharmacie.pecatte.fr/images/' + medicament.photo">
            </v-card-text>
            <form ref="formulaireModif" class="ml-10 w-100" :class="{ 'd-none': !isModifActive }"
                @submit.prevent="$emit('eventModif', id, denomination, forme, quantite, photo)">
                <v-text-field class="w-auto" variant="outlined" id="denomination" v-model="denomination"
                    label="Dénomination"></v-text-field>
                <v-text-field variant="outlined" id="forme" v-model="forme" label="Forme pharmaceutique"></v-text-field>
                <v-text-field variant="outlined" id="quantite" v-model="quantite" label="Quantité"></v-text-field>
                <v-file-input accept="image/*" variant="outlined" id="photo" @change="handleFileUpload"
                    label="Ajouter une image"></v-file-input>
                <v-btn type="submit">Valider</v-btn>
            </form>
        </div>
        <v-card-actions>
            <v-btn variant="outlined" @click="$emit('eventQuantite', medicament, 1)">Ajouter 1</v-btn>
            <v-btn variant="outlined" @click="$emit('eventQuantite', medicament, -1)">Retirer 1</v-btn>
            <v-btn variant="outlined" @click="revealModif()">{{ isModifActive ? "Annuler modification" : "Modifier" }}</v-btn>
            <v-btn variant="outlined" @click="$emit('eventDelete', medicament)">Supprimer</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style>
img {
    max-width: 200px;
    max-height: 200px;
}
</style>