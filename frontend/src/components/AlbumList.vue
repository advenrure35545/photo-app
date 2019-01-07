<template>
    <div>
        <div class="albums-title uk-flex uk-flex-between uk-flex-middle">
            <h1 class="uk-padding-small">Albums:</h1>
            <div>
                <button uk-toggle="target: #my-id" class="uk-button uk-button-default uk-button-small">
                    <span uk-icon="plus"></span>
                </button>
            </div>
        </div>
        <div class="uk-flex uk-flex-wrap album-wrap uk-flex-center uk-padding-small uk-flex-start">
            <div v-for="album in albums" class="uk-padding-small">
                <div class="uk-card-small album-card uk-card-default">
                    <img src="https://avatars.mds.yandex.net/get-pdb/25978/3d6f5902-98ba-4f0d-a2b7-d62a8acad5f2/s1200" :alt="album.title">
                    <div class="uk-card-footer uk-text-center">
                        {{album.title}}
                    </div>
                </div>
            </div>
        </div>
        <AlbumAddModal></AlbumAddModal>
    </div>
</template>

<script>
    import AlbumAddModal from './AlbumAddModal'

    export default {
        components:{
          AlbumAddModal
        },
        props: {
            albums: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    .album-wrap{
        background: rgba(0,0,0,0.12) !important;
    }

    .album-card{
        max-width: 300px;
    }
</style>