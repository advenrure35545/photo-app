<template>
    <div>
        <h1 class="uk-padding-small uk-padding-remove-vertical">New Posts</h1>
        <div class="uk-flex uk-flex-wrap uk-flex-center" >
            <div v-for="photo in photos.slice(0,6)" class="card-wrapper">
                <div class="uk-card photo-card uk-card-default  uk-card-hover">
                    <div class="uk-card-body">
                        <img :src="photo.link" :alt="photo.title">
                    </div>
                    <div class="uk-card-footer uk-flex uk-flex-between uk-flex-middle">
                        <div class="uk-text-meta">
                            {{photoDate(photo.createdAt)}}
                        </div>
                        <div class="uk-text-lead">
                            {{photo.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    export default {
        props: {
            photos: {
                type: Array,
                required: true
            }
        },
        computed: {
            photoDate: date => () => {
                return moment(date).startOf('day').fromNow()
            }
        }
    }
</script>

<style lang="scss">
    .card-wrapper{
        padding: .5rem;
    }
    .photo-card{
        img{
            max-width: 300px;
        }
    }
</style>