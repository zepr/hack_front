<template>
  <div class="container shadowed">
    <img src="@/assets/hackathon_varenne.jpg"/>
    <div class="hero-title">
      <h1 class="shadow">
      <span>C</span><span>L</span><span>I</span><span>M</span><span>A</span><span>T</span><span>I</span><span>P</span><span>S</span>
    </h1></div>
  </div>
</template>

<style lang="scss">


.container{
  background-color: #737373a3;
}

.shadow {
  font-family: "Be Vietnam Pro", sans-serif;
  text-transform: uppercase;
  font-size: 5rem;
  letter-spacing: -0.65rem;
  color: #e1e3e5;
  text-shadow: -15px 5px 20px #000000;
  transition: all 0.5s ease-in-out;
}

.container {
  width: 100%;
}

img {
  width: 100%;
}

.hero-title {
  height: 0px;
  z-index: 100;
  position: relative;
  top: -3em;

  font-weight: bolder;
  font-size: 60px;
  color: #cccccc;
  h1 {
    height: 3em;
  }
  span {
    margin-right: 5px
  }
}

</style>
