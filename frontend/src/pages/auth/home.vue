<template>
  <q-page class="q-pa-xs">
    <!--<div class="row">
      <div class="col-xs-12 col-sm-12 col-md-10 offset-md-1 q-pa-xs">
        <q-card class="q-pa-sm">
          <div class="col-xs-12 q-mb-xs q-mt-md text-center">
            <strong class="home-title"><i>Bienvenido ! </i></strong>
          </div>
          <div class="col-xs-12 col-md-8 offset-md-2 q-mb-lg q-mt-md">
            <p class="home-description">
              Somos una <strong>plataforma digital</strong> que ofrece al <strong>sector agropecuario</strong> una red
              de información con características únicas, que posibilita la vinculación
              de oferta y demanda de servicios agropecuarios tales como labranza,
              siembra, fumigación, cosecha, henificación, etc.
            </p>
            <p class="home-description q-mb-xs">
              Brindando la posibilidad de generar valor tanto en la optimización
              del equipamiento como al productor que necesita tales servicios
            </p>
          </div>
        </q-card>
      </div>
    </div>-->
  </q-page>

</template>

<script>
  import {
    QInput,
    QCard,
    QField,
    QForm,
    QToggle,
    QIcon,
    QCardActions,
    QCardSection
  } from 'quasar'

  export default {
    name: 'Home',
    components: {
      QInput,
      QCard,
      QField,
      QForm,
      QToggle,
      QIcon,
      QCardActions,
      QCardSection
    },
    mixins: [],
    data() {
      return {
        isPwd: true,
        error: '',
        form: {
          email: '',
          password: '',
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
          await this.$auth.login({
            url: `${process.env.API_URL}/oauth/token`,
            data: {username: this.form.email, password: this.form.password},
            rememberMe: true,
            redirect: '/',
            fetchUser: false
          });
        } catch (e) {
          this.error = 'Credenciales incorrectas'
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
  .bg-white {
    background-color: rgba(255, 255, 255, 0.92) !important;
  }

  p.description {
    text-align: justify;
    font-family: 'Roboto';
    font-size: 1.3rem;
    padding: 0px 15px;
    display: block;
  }

  @media (max-width: 480px) {
    p.description {
      font-size: 1rem;
    }
  }
</style>

</style>
