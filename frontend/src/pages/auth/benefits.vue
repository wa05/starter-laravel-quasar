<template>
  <q-page class="q-pa-xs">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-10 offset-md-1 q-pa-xs">
        <q-card class="q-pa-sm">
          <div class="col-xs-12 q-mb-xs q-mt-md text-center">
            <strong class="home-title"><i>Beneficios</i></strong>
          </div>
          <div class="col-xs-12 col-md-8 offset-md-2 q-mb-lg q-mt-md">
            <ul class="home-description q-ma-md">
              <li>
                Ofrecer y demandar servicios agropecuarios en forma segura y transparente.
              </li>
              <li>
                Reducir costos y acceder a múltiples publicaciones y oportunidades de servicios
              </li>
              <li>
                Calificar y encontrar las calificaciones de todos las personas con quienes trabajaste o queras trabajar
                de manera de elegir a los mejores socios de negocios.
              </li>
              <li>
                Acceder a la plataforma y a todas sus funcionalidades sin costo durante un período de prueba gratuito.

              </li>
            </ul>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>

  <!--   <div
      class="absolute column"
      :style="{
        left: 0,
        right: 0
      }"
    > -->

  <!--  <div class="row full-height d-none">
     <div class="col-md-6 offset-md-6">
       <div class="row">
         <div class="col-md-8 offset-md-2">
           <q-card class="bg-white q-pa-xs" style="min-width: 350px;">
             <q-card-section>
               <h4 class="q-ma-xs text-3 text-center logo">
                 <i>NexArg</i></h4>
               <q-form
                 @submit="onSubmit"
                 class="q-gutter-md"
               >
                 <q-input v-model="form.email"
                         placeholder="Ingrese su email" filled
                         type="email" hint="Email" />
                 <q-input v-model="form.password"
                          placeholder="Ingrese su contraseña"
                          filled type="password" hint="Contraseña" />

                 <div v-if="error != ''"
                   class="bg-negative text-center white-color q-pa-sm">
                   <span v-text="error"></span>
                 </div>
                 <div class="text-center"> -->
  <!-- <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" /> -->
  <!-- <q-btn class="full-width" label="Iniciar sesión" -->
  <!-- :loading="loading" -->
  <!-- type="submit" color="primary"/> <br> -->
  <!-- <a align="left" flat round label=""  /> -->
  <!-- </div>
</q-form>
</q-card-section>
<q-card-actions align="around">
<a align="right" class="link" href="registrarse">Registrarse</a>
<q-btn align="right" flat round label="Registrarse" />
<a align="right" class="link" href="#">Olvidaste tu contraseña ?</a>
</q-card-actions>
</q-card>
</div>
</div> -->

  <!-- </div> -->
  <!-- </div> -->
  <!-- </div> -->

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
    name: 'Login',
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
            url: `${ process.env.API_URL }/oauth/token`,
            data: { username: this.form.email, password: this.form.password },
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

</

style

>
