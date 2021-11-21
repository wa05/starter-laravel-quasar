<template>
  <q-page>
  <div class="row">
    <div class="col-xs-12 offset-xs-0 col-md-10 offset-md-1 q-pa-xs">
      <q-card>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <div class="row">
              <div class="col-xs-12 text-center q-mb-xs">
                <strong class="advise">Envíenos su mensaje o sugerencia</strong>
                <br>
                <strong class="advise">
                  <a href="mailto:info@nexarg.com.ar">info@nexarg.com.ar</a>
                </strong>

              </div>
              <div class="col-xs-12 col-sm-12 col-sm-6 col-md-6 q-pa-sm q-mb-sm">
                <q-input dense
                         filled
                         v-model="form.name"
                         :error="$v.form.name.$error"
                         label="Ingresar nombre *"
                         lazy-rules
                         :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre']"
                />
              </div>
              <div class="col-xs-12 col-sm-12 col-sm-6 col-md-6 q-pa-sm q-mb-sm">
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
              <div class="col-xs-12 col-sm-12 col-sm-6 q-pa-sm q-mb-sm">
                <q-input dense v-model="form.email"
                         :error="$v.form.email.$error"
                         filled type="email" label="Email"/>
              </div>
              <div class="col-xs-12 col-sm-12 col-sm-6 q-pa-sm q-mb-sm">
                <q-input dense v-model="form.phone"
                         filled type="tel" label="Número de teléfono"/>
              </div>
              <div class="col-xs-12 col-sm-12 q-pa-sm q-mb-sm">
                <q-input dense v-model="form.message"
                         :error="$v.form.message.$error" :rows="2"
                         filled type="textarea" label="Ingrese su mensaje"/>
              </div>

            </div>
            <div class="q-pl-sm q-pr-sm">
              <q-btn class="full-width" icon="mail"
                     label="ENVIAR MENSAJE" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="around">
        </q-card-actions>
      </q-card>
    </div>

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
    QParallax,
    QIcon,
    QDialog,
  } from 'quasar'

  const {required, minLength} = require('vuelidate/lib/validators')
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
      QParallax,
      QDialog,
    },
    mixins: [],
    data() {
      return {
        isPwd: true,
        form: {
          name: null,
          last_name: null,
          phone: null,
          address: null,
          email: null,
          accept: false,
          message: null
        },
        alert: false,
      }
    },
    validations: {
      form: {
        name: required,
        email: required,
        message: required,
        last_name: required,
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
          this.loading = true
          this.$v.form.$touch()
          if (!this.$v.form.$error) {
            // const resp = await userApi.register(this.form)
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
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
