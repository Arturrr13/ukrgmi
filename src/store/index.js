import {createStore} from 'vuex'
import postsModules from './postsModules'

export default createStore({
    modules: {
      postsModules: postsModules,
      
    }
})