<script setup>
import { ref } from 'vue';

let nouvelleRecherche = ref("")
</script>

<template>
    <v-text-field variant="solo" class="h-min" label="Saisissez un médicament à rechercher" v-model="nouvelleRecherche"
        @input="$emit('eventRechercher', nouvelleRecherche)"></v-text-field>
</template>