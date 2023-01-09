import axios from 'axios'

const FaqModules = {
    namespaced: true,
    actions:{
        fetchPosts(context){
            axios
            .get('https://jsonplaceholder.typicode.com/posts')
            .then(res => {
                context.commit("setPosts", res.data)
                context.commit("setPageArr", {page: 1, direction: true})
            })
        },
        fetchComments(context){
            axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then(res => context.commit("setComments", res.data))
        }
    },
    mutations:{
        setPosts(state, payload){
            state.posts = payload
        },
        setComments(state, payload){
            state.comments = payload
        },
        setPageArr(state, pageDirection){
            const start = pageDirection.page === 1 ? 0 : (pageDirection.page - 1) * 10, 
            end = pageDirection.page * 10
            state.pagePosts = state.posts.slice(start, end)
            if(pageDirection.direction === true){
                return state.pagePosts.sort((a, b) => a.title.localeCompare(b.title))
            }else{
                return state.pagePosts.sort((a, b) => b.title.localeCompare(a.title))
            }
        },
        setCommentsToPost(state, id){
            state.commentsToPost = []
            state.comments.forEach(element => {
                element.postId === id ? state.commentsToPost.push(element.email.length) : null
            });
        }
    },
    state:{
        posts: [],
        comments: [],
        pagePosts: [],
        commentsToPost:[]
    },
    getters:{
        getPosts(state){
            return state.pagePosts
        },
        getPaginationTotal(state){
            return Math.ceil(state.posts.length / 10)
        },
        getComments(state){
            return state.comments
        },
        getCommentsToPost(state){
            return state.CommentsToPost
        }
    }
}

export default FaqModules