<template>
  <ul>
    <li v-for="(a,index) in arArr" :key="index">
        <span>{{a.name}}</span>
        <span class="line">/</span>
    </li>
  </ul>
</template>

<script>
export default {
    name:'ArtistName',
    props:{
        arArr:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>

</style>