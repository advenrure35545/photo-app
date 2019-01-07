import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        token: '',
        photos: [],
        albums: [],
        isLoading: false,
    },
    mutations: {
        SET_USER(state, payload){
          state.user = payload
        },
        SET_TOKEN(state, payload){
          state.token = payload
        },
        LOGOUT(state){
          state.user = {}
          state.token = ''
        },
        SET_PHOTOS(state, payload){
            state.photos = payload
        },
        SET_ALBUMS(state, payload){
            state.albums = payload
        },
        ADD_ALBUM(state, payload){
            state.albums.push(payload)
        },
        SET_LOADING(state, payload){
            state.isLoading = payload
        }
    },
    actions: {
        async loginUser({commit}, payload){
            const {email, password} = payload
            const user = await axios.post('http://localhost:3000/login', {email, password})
            commit('SET_USER', user.data.user)
            commit('SET_TOKEN', user.data.token)
            return Promise.resolve()
        },
        logout({commit}, payload){
            commit('LOGOUT')
        },
        async fetchPhotos({commit, getters}){
            const photos = await axios.get('http://localhost:3000/photos/new', {headers:{'Authorization': `bearer ${getters.token}`}})
            if(!photos) console.log('err')
            commit('SET_PHOTOS', photos.data)
            return Promise.resolve()

        },
        async fetchAlbums({commit, getters}){
            const albums = await axios.get(`http://localhost:3000/user/${getters.user._id}/albums`, {headers:{'Authorization': `bearer ${getters.token}`}})
            if(!albums) console.log('err')
            commit('SET_ALBUMS', albums.data)
            return Promise.resolve()
        },
        async addAlbum({commit, getters}, payload){
            commit('SET_LOADING', true)
            const album = {...payload}
            const albumResp = await axios.post(
                `http://localhost:3000/user/${getters.user._id}/albums/add`,
                album,
                {headers:{'Authorization': `bearer ${getters.token}`}}
            )

            commit('ADD_ALBUM', albumResp.data)
            commit('SET_LOADING', false)
        }
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        photos: state => state.photos,
        albums: state => state.albums,
        isLoading: state => state.isLoading
    }
})
