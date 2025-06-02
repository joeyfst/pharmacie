<script setup>
let denomination = "";
let forme = "";
let quantite = "";
</script>

<template>
    <h3>Ajout d'un nouveau médicament</h3>
    <form @submit.prevent="$emit('eventAjouter', denomination, forme, quantite)">
        <label for="denomination">Dénomination</label>
        <input type="text" id="denomination" v-model="denomination">
        <label for="forme">Forme pharmaceutique</label>
        <input type="text" id="forme" v-model="forme">
        <label for="quantite">Quantité</label>
        <input type="text" id="quantite" v-model="quantite">
        <input type="submit">
    </form>
</template>