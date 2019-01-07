<template>
    <div>
        <TopMenu></TopMenu>
        <div class="uk-container uk-margin">
            <PhotosList :photos="photos"></PhotosList>
        </div>
        <div class="uk-container">
            <div class="uk-margin uk-text-center">
                <button class="uk-button uk-button-default">See All</button>
            </div>
        </div>
        <div class="uk-margin uk-container">
            <AlbumList :albums="albums"></AlbumList>
        </div>
    </div>
</template>

<script>
    import TopMenu from '../components/TopMenu'
    import PhotosList from '../components/PhotosList'
    import AlbumList from '../components/AlbumList'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        components: {
            TopMenu,
            PhotosList,
            AlbumList
        },
        async created() {
            await this.fetchPhotos()
            await this.fetchAlbums()
        },
        methods: {
            ...mapActions([
                'fetchPhotos',
                'fetchAlbums'
            ])
        },
        computed: {
            ...mapGetters([
                'photos',
                'albums'
            ])
        }
    }

</script>