<script setup>
const username = "quiz";
const password = "vilorfunquiz";
const encodedCredentials = btoa(`${username}:${password}`);

const res = await useFetch("https://quiz.vilor.com/api/events/listing", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${encodedCredentials}`,
  },
});
console.log(res);
</script>

<template>
  <div>events page</div>
</template>
