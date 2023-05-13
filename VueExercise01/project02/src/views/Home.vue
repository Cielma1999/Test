<script setup>
import { inject } from 'vue';

const s = inject('store')
</script>
<template>
    <div>Home</div>
    <div>{{s.state.msg}}</div>
</template>