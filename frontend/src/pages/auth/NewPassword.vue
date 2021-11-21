<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
               col-md-8 offset-md-2 q-pa-xs">
        <q-card class="bg-white">
          <q-card-section>
            <div class="col-xs-12 text-center">
              <strong class="advise">Ingrese email para recuperar su contraseña</strong> <br>
              Recibirá un mail con instrucciones
            </div>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md q-mt-md q-pa-sm"
            >
              <div class="text-center">
                <div class="row">
                  <div class="col-12">
                    <q-input v-model="form.email" name="email"
                             placeholder="Ingrese email" filled
                             type="email" hint="Email con el que se registró previamente"/>
                  </div>
                  <div class="col-12">
                    <q-input dense v-model="form.password"
                             :error="$v.form.password.$error" name="password"
                             filled type="password" label="Nueva contraseña *"/>
                  </div>
                  <div class="col-12">
                    <q-input dense v-model="form.password_confirmation" name="password_confirmation"
                             :error="$v.form.password_confirmation.$error"
                             filled type="password" label="Repetir nueva contraseña *"/>

                  </div>
                </div>
                <has-error :form="form" field="email"></has-error>
                <has-error :form="form" field="password"></has-error>
                <has-error :form="form" field="password_confirmation"></has-error>
                <q-btn color="primary" type="submit" block
                       label="Actualizar contraseña" class="q-mt-md full-width"
                      :loading="loading" :disable="disable">
                  <template v-slot:loading>
                    <q-spinner-facebook />
                  </template>
                </q-btn>
              </div>

            </q-form>

          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>

</template>

<script>
  import {
    QInput,
    QCard,
    QField,
    QForm,
    QBtn,
    QToggle,
    QIcon,
    QParallax,
    QCardActions,
    QCardSection
  } from 'quasar'
  import Vue from 'vue'
  import {
    Form,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
  } from 'vform'

  Vue.component(HasError.name, HasError)
  Vue.component(AlertError.name, AlertError)
  Vue.component(AlertErrors.name, AlertErrors)
  Vue.component(AlertSuccess.name, AlertSuccess)

  const {required, minLength} = require('vuelidate/lib/validators')

  export default {
    name: 'NewPassword',
    components: {
      QInput,
      QCard,
      QField,
      QForm,
      QToggle,
      QIcon,
      QParallax,
      QBtn,
      QCardActions,
      QCardSection
    },
    mixins: [],
    data() {
      return {
        disable: false,
        isPwd: true,
        error: '',
        form: new Form({
          email: null,
          password: null,
          password_confirmation: null,
          token: null
        }),
        loading: false,
      }
    },
    validations: {
      form: {
        email: {required},
        password: {
          required,
          minLength: minLength(8)
        },
        password_confirmation: {
          required,
          minLength: minLength(8)
        },
      }
    },
    mounted() {
      // console.log('Dotenv Test', process.env)
    },
    methods: {
      async onSubmit() {
        this.error = ''
        try {
          this.loading = true
          this.form.token = this.$route.params.token
          const resp = await this.form.post('api/password/reset')
          this.$q.notify({
            message: resp.data.msg,
            color: resp.data.error ? 'negative' : 'positive'
          })
          if (!resp.data.error) {
            this.disable = true
          }
        } catch (e) {
          this.$q.notify({
            message: 'Ha ocurrido un error modificando su contraseña',
            color: 'negative'
          })
        } finally {
          this.loading = false
        }
      },
      onReset() {

      }
    }
  }
</script>

<style scoped>
  .q-card {
    border: none;
    border-radius: 0;
  }
</style>
