<script setup>
defineProps(["medicament"])
</script>

<template>
    <p>{{ medicament.denomination }} {{ medicament.id }}</p>
    <p>Forme pharmaceutique : {{ medicament.formepharmaceutique }}</p>
    <p>Quantité : {{ medicament.qte }}</p>
    <img v-bind:src="'https://apipharmacie.pecatte.fr/images/' + medicament.photo">
    <button @click="$emit('eventQuantite', medicament, 1)">Ajouter un médicament</button>
    <button @click="$emit('eventQuantite', medicament, -1)">Retirer un médicament</button>
    <button @click="$emit('eventModif', medicament)">Modifier le médicament</button>
    <button @click="$emit('eventDelete', medicament)">Supprimer le médicament</button>
</template>

<style>
img {
    max-width: 500px;
    max-height: 500px;
}
</style>