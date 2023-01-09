<template>
  <div class="home">
    <div class="filter">
      <button type="button" @click="filter(true)">
        a-z
      </button>
      <button type="button" @click="filter(false)">
        z-a
      </button>
    </div>
    <post v-for="(item, index) in getPosts" :key="index" :title="item.title" :text="item.body" :id="item.id" :comment="5"  @updateParent="onUpdateSalary"/>
    <paginate
      :pageCount="getPaginationTotal"
      :clickHandler="newPage"
      :prevText="'Prev'"
      :nextText="'Next'"
      :containerClass="'wrapperPagination'"
    />
    <div v-if="openGraph" :class="{activeModal: openGraph}" @click="closeGraph">
      <div class="graphWrapper">
        <Line
          :data="chartData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomePost from '@/components/HomePost.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import Paginate from 'vuejs-paginate-next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


export default {
  name: 'HomeView',
  components:{
    post: HomePost,
    paginate: Paginate,
    Line
  },
  data() {
      return {
        page: 1,
        openGraph: false,
        graphData: [122, 19, 3, 5, 2, 3],
        labelsData: [ 122, 19, 3, 5, 2, 3 ]
      }
    },
    computed: {
      ...mapGetters('postsModules', ['getPosts', 'getComments', 'getPaginationTotal', 'getCommentsToPost']),
      ...mapState('postsModules', ['commentsToPost']),
      chartData() { 
        return {labels: this.labelsData, datasets: [{label: 'Comments Data', backgroundColor: '#09433', data: this.graphData }]}
      }
    }, 
    mounted(){
      this.fetchPosts()
      this.fetchComments()
    },
    methods: {
      ...mapActions('postsModules', ['fetchPosts', 'fetchComments']),
      ...mapMutations('postsModules', ['setPageArr', 'setCommentsToPost']),
      newPage(newPage){
        this.page = newPage
        this.setPageArr({page: newPage, direction: true})
      },
      onUpdateSalary(someData) {
        this.setCommentsToPost(someData.id)
        this.graphData = this.commentsToPost
        this.labelsData = this.commentsToPost
        this.openGraph = true
      },
      closeGraph(){
        this.openGraph = false
      },
      filter(direction){
        if(direction === true){
          this.setPageArr({page: this.page, direction: true})
        } else {
          this.setPageArr({page: this.page, direction: false})
        }
      }
    }
  }
</script>

<style lang="scss">
  .home{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .wrapperPagination{
    margin: 50px 0;
    list-style: none;
    display: flex;
    .active{
      background: #0027ff;
      border: 1px solid #00bcd4;
      a{
        color: #00bcd4
      }
    }
  }

  .page-item {
    background: #00bcd4;
    width: 50px;
    height: 50px;
    border: 1px solid #0027ff;
    border-radius: 5px;
    a{
      color: blue;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .activeModal{
    background: #09433dbd;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
    
    .graphWrapper{
      background: white;
      width: 100%;
      height: 100%;
      max-width: 500px;
      max-height: 250px;
    }
  }

  .filter{
    display: flex;
    gap: 20px;
    button{
      height: 30px;
      width: 50px;
      background: #00bcd4;
      color: white;
      font-size: 16px;
      font-weight: 600;
      border-radius: 7px;
      border: none;
    }
  }
</style>
