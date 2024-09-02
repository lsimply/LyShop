<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>  |-->
<!--    <router-link to="/index">Index</router-link>-->
<!--  </nav>-->

<!--  <div>-->
<!--    <el-button color="#626aef" :dark="isDark">Default</el-button>-->
<!--    <el-button color="#626aef" :dark="isDark" plain>Plain</el-button>-->

<!--    <el-button color="#626aef" :dark="isDark" disabled>Disabled</el-button>-->
<!--    <el-button color="#626aef" :dark="isDark" disabled plain>-->
<!--      Disabled Plain-->
<!--    </el-button>-->
<!--  </div>-->
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;



}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
