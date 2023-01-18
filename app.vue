<template>
  <span>Region: </span>
  <select v-model="selectedRegion" @change="updateOSList">
    <option v-for="(region, key) of regions" :key="key" :value="region">{{region}}</option>
  </select>
  <div v-if="selectedRegion">
    <span>OS: </span>
    <select v-model="selectedOS" @change="updateSAPList">
      <option v-for="(os, key) of osList" :key="key" :value="os">{{os}}</option>
    </select>
  </div>
  <div v-if="selectedOS">
    <span>SAP: </span>
    <select v-model="selectedSAP" @change="updateGPUList">
      <option v-for="(sap, key) of sapList" :key="key" :value="sap">{{sap}}</option>
    </select>
  </div>
  <div v-if="selectedSAP">
    <span>GPU: </span>
    <select v-model="selectedGPU" @change="updatePrice">
      <option v-for="(gpu, key) of gpuList" :key="key" :value="gpu">{{gpu}}</option>
    </select>
  </div>
  <div v-if="selectedGPU">
    {{ price }}
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const selectedRegion =  ref<string>("");
const selectedOS =  ref<string>("");
const selectedSAP =  ref<string>("");
const selectedGPU =  ref<string>("");
const price = ref<string>("");

const regions = ref<string[]>([]);
const osList = ref<string[]>([]);
const sapList = ref<string[]>([]);
const gpuList = ref<string[]>([]);

async function getItems() {
  const { data } = await useFetch('/api/database/query', {
    query: {
      field: "region",
    }
  });
  return data.value;
}

async function updateOSList() {
  const { data } = await useFetch('/api/database/os', {
    query: {
      region: selectedRegion.value,
    }
  });
  osList.value = data.value;
}

async function updateSAPList() {
  const { data } = await useFetch('/api/database/sap', {
    query: {
      region: selectedRegion.value,
      os: selectedOS.value,
    }
  });
  sapList.value = data.value;
}

async function updateGPUList() {
  const { data } = await useFetch('/api/database/gpu', {
    query: {
      region: selectedRegion.value,
      os: selectedOS.value,
      sap: selectedSAP.value,
    }
  });
  gpuList.value = data.value;
}

async function updatePrice() {
  const { data } = await useFetch('/api/database/price', {
    query: {
      region: selectedRegion.value,
      os: selectedOS.value,
      sap: selectedSAP.value,
      gpu: selectedGPU.value,
    }
  });
  price.value = data.value;
}

onMounted(async () => {
  const { data } = await useFetch('/api/database/regions');
  regions.value = data.value;
})
</script>
