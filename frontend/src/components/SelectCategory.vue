  <template>
	<span class="row" :class="classProp">
		<na-select
      class="col-12"
			:options="catOptions"
			:placeholder="catLabel"
			prop-key="category-selected"
      :value="category"
      :disable="disabledCategory"
      @update:category-selected="selectedCategory"
      :has-error="errorCategory"
    >
		</na-select>
    <na-select
      v-if="withSubCategory"
      class="col-12"
      :disable="!subcatOptions.length"
      :options="subcatOptions"
      :placeholder="subcatLabel"
      prop-key="subcategory-selected"
      :value="subcategory"
      @update:subcategory-selected="selectedSubcategory"
    >
    </na-select>
	</span>
</template>

<script>
	import NaSelect from './Nexarg/NaSelect'
	import { mapActions, mapGetters } from 'vuex'
	// imporcatsF { MapGetters } from 'vSubcex'
	// imporcatsF { MapGettersubs } from 'vuex'

	export default {
		components: {
			NaSelect
		},
		props: {
			classProp: {
				required: false,
				type: String
			},
      errorCategory: {
			  type: Boolean,
        default: false,
        required: false
      },
      disabledCategory: {
			  type: Boolean,
        default: false,
        required: false
      },
			catLabel: {
				required: false,
				type: String,
        default: 'Select'
			},
      subcatLabel: {
        required: false,
        type: String,
        default: 'Select'
      },
      category: {
        required: false,
        default: null
      },
      subcategory: {
        required: false,
        default: null
      },
      withSubCategory: {
			  type: Boolean,
        required: false,
        default: false
      }
		},
		data() {
			return {
			}
		},
		computed: {
			...mapGetters({
				catOptions: 'serviceCategories/forSelectCats',
        loading: 'serviceCategories/forSelectLoading',
        subcatOptions: 'serviceCategories/forSelectSubcats',
			})
		},
		mounted() {
			this.getServiceCategories()
		},
		methods: {
		  ...mapActions({
        getServiceCategories: 'serviceCategories/catsForSelect',
        getServiceSubcategories: 'serviceCategories/subcatsForSelect',
        // getServiceSubCategories: 'getServiceSubCategories/forSelect',
      }),
      selectedCategory(category) {
        this.$emit('update:category-selected', category)
		    if (category) {
          this.getServiceSubcategories({
            category_id: category.value
          })
        }
		  },
      selectedSubcategory(value) {
        this.$emit('update:subcategory-selected', value)
      },

		},
		events: {
      'category-selected'(category) {
        this.selectedCategory(category)
      }
		}
	}
</script>

<style>

</style>
