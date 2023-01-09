<template>
  <div class="mapWrapper">
    <div id="mapContainer"></div>

    <div class="modalWrapper" ref="modalWrapper">
        <input type="text" ref="longitude" v-model="longitude">
        <input type="text" ref="latitude" v-model="latitude">
        <input type="text" ref="name">
        <div class="buttonWrapper">
          <button type="button" @click="createMarker">
            create
          </button>
          <button type="button" @click="closeModal">
            close
          </button>
        </div>
    </div>
    <button type="button" class="NewMarker" @click="toggleModal">
      New marker
    </button>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null,
      marker: null,
      markersData: [],
      longitude: '',
      latitude: ''
    };
  },
  async mounted() {
    JSON.parse(localStorage.getItem('markersData')) ? this.markersData = await JSON.parse(localStorage.getItem('markersData')) : []
    this.map = L.map("mapContainer").setView([48.2, 29.6], 6);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    var customPane = this.map.createPane("customPane");
    customPane.style.zIndex = 399;
    for(const index in this.markersData){
      L.marker([this.markersData[index][0], this.markersData[index][1]]).addTo(this.map).bindPopup(`<p>${this.markersData[index][2]}</p>`)
    }
    this.marker = L.marker([48.2, 29.6])
    this.map.addLayer(this.marker)
    this.map.on('click', this.addMewMarker)
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods:{
    addMewMarker(e){
        this.marker.remove();
        this.$refs.modalWrapper.classList.value !== 'modalWrapper active' ? this.$refs.modalWrapper.classList.add('active') : null
        this.marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map)
        this.latitude = e.latlng.lat
        this.longitude = e.latlng.lng
    },
    createMarker(){
      if(this.latitude !== ''){
        const marker = L.marker([this.latitude, this.longitude]).addTo(this.map).bindPopup(`<p>${this.$refs.name.value}</p>`).openPopup();
        marker.on('mouseover', () => marker.openPopup())
        marker.on('mouseout', () => marker.closePopup())
        this.markersData.push([this.latitude, this.longitude, this.$refs.name.value])
        this.addToMarkersData()
      } else {
        console.log('err')
      }
    },
    closeModal(){
      this.marker.remove();
      this.$refs.modalWrapper.classList.remove('active')
    },
    addToMarkersData(){
      localStorage.setItem('markersData', JSON.stringify(this.markersData))
    },
    toggleModal(){
      this.marker.remove();
      this.latitude = ''
      this.longitude = ''
      this.$refs.modalWrapper.classList.toggle('active')
    }
  }
}
</script>


<style scoped>
  .mapWrapper{
    position: relative;
  }

  #mapContainer {
    width: 100%;
    height: 100vh;
    z-index: 10;
  }
  .modalWrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 11;
    height: 250px;
    width: 200px;
    background: #3b3939;
    border-radius: 15px;
    transform: translateY(-320px);
  }
  .modalWrapper.active{
    animation: displaBlock .5s linear both;
  }

  input[type="text"]{
    height: 25px;
    width: 80%;
    background: #626262;
    border-radius: 7px;
    outline: 1px solid white;
    color: white;
    font-size: 16px;
  }
  .buttonWrapper{
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .buttonWrapper button{
    background: #626262;
    height: 30px;
    width: 70px;
    border-radius: 10px;
    transition: all .5s ease;
  }
  .buttonWrapper button:hover{
    background: #929292;
    border: 1px solid white;
    color: white;
  }
  .NewMarker{
    font-weight: 600;
    font-size: 16px;
    position: absolute;
    top: 12px;
    left: 60px;
    z-index: 11;
    width: 70px;
    background: white;
    border-radius: 7px;
    border: none;
    color: #00ff0a;
    transition: all .5s ease;
  }

  .NewMarker:hover{
    background: #00ff0a;
    color: white;
  }

  @keyframes displaBlock {
    to{
      transform: translateY(0px);
    }
  }
</style>
