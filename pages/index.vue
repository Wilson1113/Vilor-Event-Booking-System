<script setup>
const username = "quiz";
const password = "vilorfunquiz";
const encodedCredentials = btoa(`${username}:${password}`);

const res = await useFetch("https://quiz.vilor.com/api/events/listing", {
  method: "GET",
  headers: {"Authorization": "Basic " + btoa(`${username}:${password}`)},
});
console.log(toRaw(res.data.value)[0]);
</script>

<template>
  <div>events page</div>
</template>