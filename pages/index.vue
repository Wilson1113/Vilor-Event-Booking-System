<script setup>
const username = "quiz";
const password = "vilorfunquiz";

const res = await useFetch("https://quiz.vilor.com/api/events/listing", {
  method: "GET",
  headers: { "Authorization": "Basic " + btoa(`${username}:${password}`) },
});

const values = toRaw(res.data.value);

const getImageURL = (event) => {
  return event.img + `?random=${event.id}`
}
</script>

<template>
  <div>
    <div class="flex flex-row justify-center m-20">
      <div class="flex flex-col">
        <div v-for="event in values">
          <EventCard :event="event" :image="getImageURL(event)" />
        </div>
      </div>

    </div>

  </div>
</template>