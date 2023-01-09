<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/map">Map</router-link>
  </nav>
  <router-view/>
</template>

<style>
  body{
    background: #19142f;
  }
  *, *::after, *::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  nav{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    gap: 25px;
  }

  nav a{
    color: white;
    font-size: 20px;
    text-decoration: none;
    font-weight: 700;
  }

  nav a:hover{
    color: #009688;
  }

  button:hover{
    cursor: pointer;
  }

  a:hover{
    cursor: pointer;
  }
</style>
