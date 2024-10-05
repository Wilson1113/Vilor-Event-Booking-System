<template>
  <div class="card text-center flex flex-row mb-12 bg-white max-w-4xl overflow-hidden">
    <img :src="image" alt="event thumb" class="object-cover ">
    <div class="flex flex-col justify-center text-left mx-6">
      <p class="font-bold text-3xl text-gray-500 my-4 truncate">{{ event.name }}</p>
      <p class="mb-3  font-bold">{{ event.description }}</p>
      <p class="font-semibold">Date: {{ event.date }}</p>
      <p class="font-semibold">Fee: {{ event.fee }}</p>
      <p class="font-semibold">Capacity: {{ event.capacity }}</p>
      <p class="font-semibold">Remaining Slots: {{ event.remainingSlots }}</p>
      <button v-if="event.remainingSlots <= 0"
        class="btn bg-gray-300 text-gray-500 border-none mt-5 text-xl pointer-events-none">
        Registration Closed
      </button>
      <button v-else class="btn bg-gray-300 text-gray-500 border-none mt-5 text-xl" @click="handleButtonClick">
        Register
      </button>
    </div>
  </div>

  <div v-if="showModal" class="mb-10">
    <div class="modal-content" @click.stop>
      <h2 class="text-2xl font-bold">Register for {{ event.name }}</h2>
      <form @submit.prevent="submitRegistration">
        <div class="my-4">
          <label class="block mb-2">Name:</label>
          <input v-model="registrationData.name" class="border rounded w-full p-2" required>
        </div>
        <div class="my-4">
          <label class="block mb-2">Email:</label>
          <input v-model="registrationData.email" class="border rounded w-full p-2" required>
        </div>
        <button class="btn bg-blue-500 text-white">Submit</button>
        <button @click="closeModal" class="btn bg-gray-500 text-white ml-2">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const { event, image } = defineProps(['event', 'image']);

const showModal = ref(false);
const registrationData = ref({
  name: '',
  email: ''
});

function handleButtonClick() {
  showModal.value = !showModal.value;
}

function closeModal() {
  showModal.value = false;
  registrationData.value = { name: '', email: '' };
}

function submitRegistration() {
  console.log('Registered:', registrationData.value);
  closeModal();
}
</script>

<style scoped></style>