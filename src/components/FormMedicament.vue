<script setup>
import { ref } from 'vue';

let denomination = ref("");
let forme = ref("");
let quantite = ref(1);
const photo = ref(null);

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
    <div class="d-flex flex-column ma-4 mr-6 align-items-center">
        <h3 class="mb-2">Ajout d'un nouveau médicament</h3>
        <form @submit.prevent="$emit('eventAjouter', denomination, forme, quantite, photo)">
            <v-text-field variant="outlined" id="denomination" v-model="denomination"
                label="Dénomination *"></v-text-field>
            <v-text-field variant="outlined" id="forme" v-model="forme" label="Forme pharmaceutique *"></v-text-field>
            <v-text-field variant="outlined" id="quantite" v-model="quantite" label="Quantité"></v-text-field>
            <v-file-input accept="image/*" variant="outlined" id="photo" @change="handleFileUpload"
                label="Ajouter une image"></v-file-input>
            <v-btn type="submit">Envoyer</v-btn>
            <p class="mt-2">* : Données obligatoires</p>
        </form>
    </div>
</template>