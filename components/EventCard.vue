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
          <label class="block mb-2">Full Name:</label>
          <input v-model="registrationData.userFullName" class="border rounded w-full p-2" required />
        </div>
        <div class="my-4">
          <label class="block mb-2">Email:</label>
          <input v-model="registrationData.email" class="border rounded w-full p-2" required />
        </div>
        <div class="my-4">
          <label class="block mb-2">Contact Number:</label>
          <input v-model="registrationData.contactNumber" placeholder="+60 or 60 followed by number"
            @input="validateContactNumber" class="border rounded w-full p-2" required />
          <p v-if="contactNumberError" class="text-red-500 text-sm">
            Contact number must start with +60 or 60 and contain only numbers.
          </p>
        </div>
        <div class="my-4">
          <label class="block mb-2">NRIC:</label>
          <input v-model="registrationData.nric" class="border rounded w-full p-2" required />
        </div>
        <div class="my-4">
          <label class="block mb-2">Age:</label>
          <input v-model="registrationData.age" class="border rounded w-full p-2" required />
        </div>
        <div class="my-4">
          <label class="block mb-2">Country:</label>
          <input v-model="registrationData.country" class="border rounded w-full p-2" required />
        </div>
        <div class="my-4">
          <label class="block mb-2">Gender:</label>
          <select v-model="registrationData.gender" class="border rounded w-full p-2" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
const username = "quiz";
const password = "vilorfunquiz";
const showModal = ref(false);
const registrationData = ref({
  userFullName: '',
  email: '',
  contactNumber: '',
  nric: '',
  age: '',
  country: '',
  gender: ''
});

function handleButtonClick() {
  showModal.value = !showModal.value;
}

function closeModal() {
  showModal.value = false;
  registrationData.value = {
    userFullName: '',
    email: '',
    contactNumber: '',
    nric: '',
    age: '',
    country: '',
    gender: ''
  };
}

async function submitRegistration() {
  validateContactNumber();

  if (contactNumberError.value) {
    alert("Incorrect Contact Number Format");
    return;
  } else {
    alert("Registration Success");
  }

  try {
    const response = await $fetch(`/api/register`, {
      method: 'POST',
      body: {
        "eventId": event.id,
        "userFullName": registrationData.value.userFullName,
        "email": registrationData.value.email,
        "contactNumber": registrationData.value.contactNumber,
        "nric": registrationData.value.nric,
        "age": registrationData.value.age,
        "country": registrationData.value.country,
        "gender": registrationData.value.gender
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Basic " + btoa(`${username}:${password}`),
      },

    });
    console.log('Registered:', registrationData.value);
    closeModal();
  } catch (error) {
    closeModal();
    return {
      error: true,
      message: error.message
    };
  }
}
const contactNumberError = ref(false);
function validateContactNumber() {
  const contactNumber = registrationData.value.contactNumber;

  const contactNumberPattern = /^(\+60|60)[0-9]*$/;

  if (!contactNumberPattern.test(contactNumber)) {
    contactNumberError.value = true;
  } else {
    contactNumberError.value = false;
  }
}
</script>