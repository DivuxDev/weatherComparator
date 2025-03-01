<template>
    <div class="weatherCard borderedCard">

        <div class="header">
            Fuente: {{ title }}
        </div>
        <section v-if="props.currentWeather !== undefined">
            <div class="iconSection">
                <span>{{ props.currentWeather.text }}</span>
                <img :src=props.currentWeather.icon></img>
            </div>
            <ul>

                <li>Temperatura media : {{ props.currentWeather.temperature }}c</li>
                <li>Temperatura maxima : nodata</li>
                <li>Temperatura minima : nodata</li>
                <li>Humedad : {{ props.currentWeather.humidity }}%</li>
                <li>Uv : {{ props.currentWeather.uvIndex }}</li>
                <li>Viento : {{ props.currentWeather.wind }} desde {{ props.currentWeather.windDirection }}</li>
            </ul>
        </section>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data?: any,
    currentWeather?: any,
    title?: String
}>()
</script>

<style scoped>
.weatherCard {
    width: 30%;
    margin: 10px 0;
    padding: 0;
    text-transform: uppercase;
    font-weight: bold;
    padding: 7px;
}

.header {
    display: flex;
    justify-content: center;
    font-size: 23px;
}

.iconSection {
    margin-top: 15px;
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
}
</style>