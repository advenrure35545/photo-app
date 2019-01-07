<template>
    <div class="user-section uk-flex">
        <div class="section-left">
            <div class="user-img">
    <div class="uk-width-auto">
        <img class="user-ava" src="https://avatars.mds.yandex.net/get-pdb/199965/4599cdc2-7994-46e2-9ace-ff25bb3af9cd/s1200" width="50" height="50" alt="">
    </div>
</div>
    </div>
    <div class="section-right uk-flex uk-flex-1 uk-flex-between">
        <div class="user-info uk-flex uk-flex-column uk-flex-between uk-padding-small uk-padding-remove-vertical">
            <div class="user-about">
                <div class="user-name">
                    <div class="uk-text-large white-text">
                        {{user.firstName}} {{user.lastName}}
                    </div>
                </div>
                <div class="user-desc">
                    {{user.desc}}
                </div>
            </div>
            <div class="user-socials uk-flex">
                <div class="user-facebook soc-block" >
                    <span uk-icon="facebook"></span>
                </div>
                <div class="user-twitter soc-block" @click="pushLink(user.twitterLink)">
                    <span uk-icon="twitter"></span>
                </div>
                <div class="user-instagram soc-block" @click="pushLink(user.instagramLink)">
                    <span uk-icon="instagram"></span>
                </div>
            </div>
        </div>
        <div class="user-logout uk-flex uk-flex-column ">
            <button class="user-btn logout-btn">
                <span uk-icon="pencil"></span>
            </button>
            <button class="user-btn logout-btn" @click.prevent="logout">
                <span uk-icon="sign-out"></span>
            </button>
        </div>
    </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data(){
            return {
                edit: null
            }
        },
        computed: {
            ...mapGetters([
                'user'
            ])
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
        }
    }
</script>

<style lang="scss">
    .white-text{
        color: #fff !important;
    }

    .user-img{
        width: 100px;
        height: 100px;
        border: 1px solid #fff;
        border-radius: 50%;
        overflow: hidden;

        img{
            width: 100%;
            height: auto;
        }

    }

    .user-btn{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        outline: none;
        border: none;
        background: #27b9ff;
        color: #fff;

        &:hover{
            cursor: pointer;
            opacity: .8;
        }

        &:first-child{
            margin-bottom: .5rem;
        }

    }

    .soc-block{
        padding: .2rem;
        border-radius: 1rem;
        background: #fff;
        margin: 0 0.2rem;
        color: #000;

        &:hover{
            cursor: pointer;
        }

    }
</style>