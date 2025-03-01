<template>
  <div class="search-bar">
    <div class="search">
      <input class="input borderedCard" type="text" v-model="query" placeholder="Busca una ciudad..." />
      <button @click="onSearch" class="button borderedCard">Buscar</button>
    </div>
    <ul v-if="suggestions.length > 0" class="suggestions-list">
      <li v-for="(suggestion, index) in suggestions" :key="index" @click="selectSuggestion(suggestion)">
        {{ suggestion.display_name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';
import type { Suggestion } from '@/models/Suggestion';
let timeout: ReturnType<typeof setTimeout> | null = null;
const apiUrl = import.meta.env.VITE_API_AUTOCOMPLETE_API_URL
const apiKey = import.meta.env.VITE_API_AUTOCOMPLETE_API_KEY
const query = ref<string>('');
const resultSearch = ref<Suggestion>();
const suggestions = ref<Suggestion[]>([]);

const emit = defineEmits(['search', 'suggestionSelected']);


const fetchSuggestions = async () => {
  if (query.value.length < 3) {
    suggestions.value = [];
    return;
  }
  
  const endpoint = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(query.value)}&limit=5`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('Error al obtener datos de la API');

    const data: Suggestion[] = await response.json();
    suggestions.value = data;
  } catch (error) {
    console.error('Error:', error);
    suggestions.value = [];
  }
};

const selectSuggestion = (suggestion: Suggestion) => {
  query.value = suggestion.display_name
  resultSearch.value = suggestion;
  suggestions.value = [];
  emit('suggestionSelected', suggestion);
};

watch(query, () => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    fetchSuggestions();
  }, 1000);
});


const onSearch = () => {
  emit('search', resultSearch.value);
};
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: row;
}

div {
  max-width: 500px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

/* Etiqueta */
label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

/* Campo de entrada */


/* Lista de sugerencias */
.suggestions-list {
  margin: 10px 0;
  padding: 0;
  list-style: none;

  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3sease;
}

/* Elementos de la lista */
.suggestions-list li {
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.suggestions-list li:hover {
  background-color: #007bff;
  color: #fff;
}

/* Responsivo */
@media (max-width: 600px) {
  input[type="text"] {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  .suggestions-list li {
    padding: 8px 12px;
  }
}



.button {
  display: inline-block;
  padding: 12px 24px;
  color: #000;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s ease;
}

.button:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000;
  background-color: #f0f0f0;
}

.button:focus {
  transform: translate(-2px, -2px);
  background-color: #000;
  color: #fff;
  border-color: #fff;
}

.button:active {
  transform: translate(0, 0);
  box-shadow: 4px 4px 0 #000;
  background-color: #e0e0e0;
}



.input {
  width: 100%;
  max-width: 270px;
  height: 60px;
  padding: 12px;
  color: #000;
  outline: none;
  transition: all 0.3s ease;
}

.input::placeholder {
  color: #888;
}

.input:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000;
}

.input:focus {
  background-color: #000;
  color: #fff;
  border-color: #ffffff;
}

.input:focus::placeholder {
  color: #fff;
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.input:focus::after {
  content: "|";
  position: absolute;
  right: 10px;
  animation: blink 0.7s step-end infinite;
}

.input:valid {
  animation: typing 2s steps(30, end);
}

.input-container {
  position: relative;
  width: 100%;
  max-width: 270px;
}

.input {
  width: 100%;
  height: 60px;
  padding: 12px;
  color: #000;
  outline: none;
  transition: all 0.3s ease;
}

.input::placeholder {
  color: #888;
}

.input:hover {
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0 #000;
}

.input:focus {
  background-color: #010101;
  color: #fff;
  border-color: #d6d9dd;
}

.input:focus::placeholder {
  color: #fff;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-5px) rotate(-5deg);
  }

  50% {
    transform: translateX(5px) rotate(5deg);
  }

  75% {
    transform: translateX(-5px) rotate(-5deg);
  }

  100% {
    transform: translateX(0);
  }
}

.input:focus {
  animation: shake 0.5s ease-in-out;
}

@keyframes glitch {
  0% {
    transform: none;
    opacity: 1;
  }

  7% {
    transform: skew(-0.5deg, -0.9deg);
    opacity: 0.75;
  }

  10% {
    transform: none;
    opacity: 1;
  }

  27% {
    transform: none;
    opacity: 1;
  }

  30% {
    transform: skew(0.8deg, -0.1deg);
    opacity: 0.75;
  }

  35% {
    transform: none;
    opacity: 1;
  }

  52% {
    transform: none;
    opacity: 1;
  }

  55% {
    transform: skew(-1deg, 0.2deg);
    opacity: 0.75;
  }

  50% {
    transform: none;
    opacity: 1;
  }

  72% {
    transform: none;
    opacity: 1;
  }

  75% {
    transform: skew(0.4deg, 1deg);
    opacity: 0.75;
  }

  80% {
    transform: none;
    opacity: 1;
  }

  100% {
    transform: none;
    opacity: 1;
  }
}

.input:not(:placeholder-shown) {
  animation: glitch 1s linear infinite;
}

.input-container::after {
  content: "|";
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000;
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.input:focus+.input-container::after {
  color: #fff;
}

.input:not(:placeholder-shown) {
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 0px 0px 0 #000;
}
</style>
