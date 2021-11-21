<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
               col-md-10 offset-md-1 q-pa-xs">
        <q-card class="bg-white">
          <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
            >
              <div class="row">
                <div class="col-xs-12 text-center">
                  <strong class="advise">Complete formulario para registrarse</strong> <br><br>
                </div>
                <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
                        col-sm-6 col-md-6 q-pa-xs">
                  <q-input dense
                           filled
                           v-model="form.name"
                           :error="$v.form.name.$error"
                           label="Ingresar nombre *"
                           lazy-rules
                           :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre']"
                  />
                </div>
                <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
                col-sm-6 col-md-6 q-pa-xs">
                  <q-input dense
                           filled
                           v-model="form.last_name"
                           :error="$v.form.last_name.$error"
                           label="Ingrese su apellido *"
                           lazy-rules
                           :rules="[
                  val => val !== null && val !== '' || 'Ingrese su apellido'
                ]"
                  />
                </div>
                <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
                      col-sm-6 q-pa-xs">
                  <q-input dense v-model="form.email"
                           :error="$v.form.email.$error"
                           label="Ingrese su email *"
                           filled type="email"/>
                </div>
                <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
                    col-sm-6 col-md-6 q-pa-xs">
                  <q-input dense v-model="form.password"
                           :error="$v.form.password.$error"
                           :type="isPwd ? 'password' : 'text'"
                           filled label="Contraseña *">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
                        col-sm-6 col-md-6 q-mt-xs q-pl-xs">
                  <q-input dense v-model="form.password_confirmation" filled
                           :error="$v.form.password_confirmation.$error"
                           :type="'password'" label="Repetir contraseña *"
                           hint="Debe repetir la contraseña">
<!--                    <template v-slot:append>-->
<!--                      <q-icon-->
<!--                        :name="isPwd ? 'visibility_off' : 'visibility'"-->
<!--                        class="cursor-pointer"-->
<!--                        @click="isPwd = !isPwd"-->
<!--                      />-->
<!--                    </template>-->
                  </q-input>
                </div>
                <div class="col-xs-12 offset-xs-0 col-sm-12 offset-sm-0
                        col-sm-6 q-pa-xs">
                  <q-input dense v-model="form.phone"
                           filled type="tel" label="Número de teléfono"/>
                </div>
                <div class="col-md-12 text-center">
                  <p class="text-primary">(*) Campos requeridos</p>
                </div>
                <div class="col-md-12 text-center">
                  <q-btn label="Ver términos y condiciones" flat color="primary"
                        @click="showTerms = true"/>
                </div>
              </div>
              <div class="q-pa-xs">
                <q-btn class="full-width" icon="fact_check"
                       label="Registrarse" type="submit" color="primary"/>
              </div>
            </q-form>
          </q-card-section>
          <q-card-section align="around">
            <q-btn v-if="$route.params.name === 'login'"
                  flat align="center" :to="{ name: 'recover-password'}"
                   color="primary" label="Olvidaste tu contraseña ?"></q-btn>
          </q-card-section>
        </q-card>
      </div>

      <q-dialog v-model="showTerms">
        <q-card class="bg-white" style="min-width: 800px; max-width: 95vw;">
          <q-card-section>
            <div class="text-h6">Términos y condiciones</div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="container">
              <q-pdfviewer
                v-model="show"
                :src="'/statics/pdf/Terminos_condiciones.pdf'"
                type="pdfjs"
                content-class="fit container"
                inner-content-class="fit container"
              />
            </div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-actions align="center">
              <q-toggle v-model="form.accept" label="Acepto los términos y condiciones"
                        @input="showTerms = false"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alert">
        <q-card class="bg-white" style="min-width: 300px; max-width: 90vw;">
          <q-card-section>
            <div class="text-h6">Bienvenido a NexArg!</div>
          </q-card-section>

          <q-card-section class="bg-white">
            Te has registrado exitosamente !
            Podes acceder con tu usuario y contraseña
          </q-card-section>

          <q-card-actions align="center">
            <q-btn flat :to="{ name: 'login' }" label="Acceder"
                   color="primary" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
  import {
    QInput,
    QCard,
    // QField,
    QForm,
    QToggle,
    QCardActions,
    QCardSection,
    QIcon,
    QDialog,
  } from 'quasar'

  const {required, minLength, email} = require('vuelidate/lib/validators')
  import userApi from '../../services/api/User'

  export default {
    components: {
      QInput,
      QCard,
      // QField,
      QForm,
      QCardSection,
      QToggle,
      QIcon,
      QCardActions,
      QDialog,
    },
    mixins: [],
    data() {
      return {
        show: true,
        isPwd: true,
        showTerms: false,
        form: {
          name: null,
          last_name: null,
          password: null,
          password_confirmation: null,
          dni: null,
          phone: null,
          address: null,
          email: null,
          accept: false,
        },
        alert: false,
      }
    },
    validations: {
      form: {
        name: { required },
        last_name: { required },
        phone: { required },
        email: { required, email },
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
    methods: {
      async onSubmit() {
        try {
          if (!this.form.accept) {
            this.$events.fire('notify', 'Primero debe aceptar los términos y condiciones')
            return false
          }
          this.loading = true
          this.$v.form.$touch()
          if (!this.$v.form.$error) {
            const resp = await userApi.register(this.form)
            if (!resp.error) {
              this.alert = true
            }
          }
          this.loading = false
        } catch (e) {
          this.loading = false
        }
      },
      onReset() {

      }
    }
  }
</script>

<style scoped>
  .container {
    min-width: 300px;
    min-height: 450px;
    width: 100%;
    height: 100%;
  }

</style>
