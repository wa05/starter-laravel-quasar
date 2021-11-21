<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
               col-md-8 offset-md-2 q-pa-xs">
        <q-card class="bg-white">
          <q-card-section>
            <div class="col-xs-12 text-center">
              <strong class="advise">Ingrese email para solicitar el cambio de su contraseña</strong> <br>
              Recibirá un mail con instrucciones
            </div>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md q-mt-md q-pa-sm"
            >
              <div class="text-center">
                <q-input v-model="form.email"
                         placeholder="Ingrese email" filled :disable="disable"
                         type="email" hint="Email con el que se registró previamente"/>
                <q-btn color="primary" type="submit" block :loading="loading"
                       label="Solicitar cambio" class="q-mt-md full-width">
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

  export default {
    name: 'Login',
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
        isPwd: true,
        disable: false,
        error: '',
        form: {
          email: '',
        },
        loading: false,
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
          const resp = await this.$axios.post('api/password/request-new', this.form)

          this.$q.notify({
            message: resp.data.msg,
            color: resp.data.error ? 'negative' : 'positive'
          })
          if (!resp.data.error) {
            this.disable = true
          }
        } catch (e) {
          this.$q.notify({
            message: 'Ha ocurrido un error',
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
