<template>
    <div id="my-id" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <h3 class="uk-modal-title">Add album</h3>
            <form class="uk-form-horizontal">

                <div class="uk-margin">
                    <label class="uk-form-label" >Title</label>
                    <div class="uk-form-controls">
                        <input v-model="title" class="uk-input"  type="text" placeholder="Some text...">
                    </div>
                </div>

                <div class="uk-margin">
                    <label class="uk-form-label" >Description</label>
                    <div class="uk-form-controls">
                        <textarea v-model="description" placeholder="Some text..." />
                    </div>
                </div>

                <!--<div class="uk-margin">
                    <label class="uk-form-label" >Avatar</label>
                    <div class="uk-form-controls">
                        <div class="js-upload" uk-form-custom>
                            <input type="file" multiple>
                            <button class="uk-button uk-button-default" type="button" tabindex="-1">Select</button>
                        </div>
                    </div>
                </div>-->

            </form>
            <button class="uk-modal-close uk-button uk-button-default uk-button-danger uk-button-small" type="button">Close</button>
            <button @click="submitForm" class="uk-button uk-button-default uk-button-small uk-button-primary"type="button">
                <div v-if="isLoading" uk-spinner>
                </div>
                <div v-else>
                    Save
                </div>
            </button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        data(){
          return {
              title: '',
              description: ''
          }
        },
        methods: {
            ...mapActions([
                'addAlbum'
            ]),
            submitForm(){
                const payload = {title: this.title, description: this.description}
                this.addAlbum(payload)
                this.resetForm()
            },
            resetForm(){
                this.title = ''
                this.description = ''
            }
        },
        computed: {
            ...mapGetters([
                'isLoading'
            ])
        }
    }
</script>