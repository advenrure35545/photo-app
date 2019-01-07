<template>
    <form class="login-form">
        <h1 class="uk-heading-line uk-text-center"><span>Login Page</span></h1>
        <div class="uk-margin">
            <div class="uk-form-label">Email</div>
            <div class="uk-form-controls">
                <input type="text" class="uk-input" v-model="email">
            </div>
        </div>
        <div class="uk-margin">
            <div class="uk-form-label">Password</div>
            <div class="uk-form-controls">
                <input type="password" class="uk-input" v-model="password">
            </div>
        </div>
        <div class="uk-margin">
            <div class="uk-text-small">
                Already have account? <router-link to="/signup"> Sign Up </router-link>
            </div>
        </div>
        <div class="uk-margin uk-text-center">
            <button @click.prevent="submitForm" class="uk-button uk-button-primary">Sign In</button>
        </div>
    </form>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            ...mapActions([
                'loginUser'
            ]),

            async submitForm(){
                const email = this.email
                const password = this.password


                await this.loginUser({email, password})
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss">
    .login-form{
        margin: 0 auto;
        max-width: 700px;
    }
</style>