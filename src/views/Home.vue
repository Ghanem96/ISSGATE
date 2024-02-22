<template>
        <v-data-table :headers="headers" :items="brands" :sort-by="[{ key: 'name', order: 'asc' }]" hide-default-footer>
                <template v-slot:top>
                        <v-toolbar flat>
                                <v-toolbar-title>Brands</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
                                        <template v-slot:activator="{ props }">
                                                <v-btn color="primary" dark class="mb-2" v-bind="props">
                                                        Add Brand
                                                </v-btn>
                                        </template>
                                        <v-card>
                                                <v-card-title>
                                                        <span class="text-h5">{{ formTitle }}</span>
                                                </v-card-title>

                                                <v-card-text>
                                                        <v-container>
                                                                <v-row>
                                                                        <v-col cols="12" sm="12" md="12">
                                                                                <v-text-field v-model="editedItem.name"
                                                                                        label="Brand name"></v-text-field>
                                                                        </v-col>
                                                                        <v-col cols="12" sm="12" md="12">
                                                                                <v-file-input v-model="file" accept="image/*"
                                                                                        label="Attach an image"
                                                                                        @change="onFileChange"></v-file-input>
                                                                        </v-col>

                                                                </v-row>
                                                        </v-container>
                                                </v-card-text>

                                                <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="blue-darken-1" variant="text" @click="close">
                                                                Cancel
                                                        </v-btn>
                                                        <v-btn color="blue-darken-1" variant="text" @click="save">
                                                                Save
                                                        </v-btn>
                                                </v-card-actions>
                                        </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                        <v-card>
                                                <v-card-title class="text-h5">Are you sure you want to delete this
                                                        item?</v-card-title>
                                                <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="blue-darken-1" variant="text"
                                                                @click="closeDelete">Cancel</v-btn>
                                                        <v-btn color="blue-darken-1" variant="text"
                                                                @click="deleteItemConfirm">OK</v-btn>
                                                        <v-spacer></v-spacer>
                                                </v-card-actions>
                                        </v-card>
                                </v-dialog>
                        </v-toolbar>
                </template>
                <template v-slot:item.image="{ item }">
                        <v-card class="my-2" elevation="2" rounded>
                                <v-img :src="item.image" height="64" cover></v-img>
                        </v-card>
                </template>
                <template v-slot:item.actions="{ item }">
                        <Pencil class="icon" :size="18" @click="editItem(item)" />
                        <Trash class="icon" :size="18" @click="deleteItem(item)" />
                </template>
                <template v-slot:bottom>
                        <div class="text-center">
                                <v-pagination v-model="page" @click="ChangePage" :length="Math.round(brands.length/10)" :total-visible="7"></v-pagination>
                        </div>
                </template>
        </v-data-table>
</template>
<script>
import { Trash, Pencil } from 'lucide-vue-next';
import axios from 'axios'
export default {

        components: {
                Pencil, Trash
        },
        data: () => ({
                dialog: false,
                dialogDelete: false,
                page: 1,
                headers: [
                        {
                                title: 'Name',
                                align: 'start',
                                sortable: false,
                                key: 'name',
                        },
                        { title: 'Image', key: 'image' },
                        { title: 'Actions', key: 'actions', sortable: false ,align: 'end',},
                ],
                brands: [],
                editedIndex: -1,
                editedItem: {
                        name: '',
                        image: ''
                },
                defaultItem: {
                        name: '',
                        image: ''
                },
        }),

        computed: {
                formTitle() {
                        return this.editedIndex === -1 ? 'Add Brand' : 'Edit Brand'
                },
        },

        watch: {
                dialog(val) {
                        val || this.close()
                },
                dialogDelete(val) {
                        val || this.closeDelete()
                },
        },

        created() {
                this.GetAllBrands()
        },

        methods: {
                async GetAllBrands() {
                        const url = 'https://interview.issgate.com/api/Brand';
                        const params = {
                                page: this.page ? this.page : 1,
                                limit: 10
                        };

                        const headers = {
                                'accept': '*/*',
                                'content-lang': 'en',
                                'Authorization': localStorage.getItem('Token')
                        };
                        try {
                                const response = await axios.get(url, { params, headers });
                                if (response.data.isSuccess) {
                                        let Brands = response.data.data;
                                        this.brands = Brands;
                                }
                        } catch (error) {
                                console.error(error);
                        }
                },
                async AddBrand() {
                        const formData = new FormData();
                        formData.append('Image', this.file);
                        formData.append('NameByLang', JSON.stringify({
                                value: this.editedItem.name,
                                langId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
                        }));

                        const headers = {
                                'accept': '*/*',
                                'Authorization': localStorage.getItem('Token'),
                                'Content-Type': 'multipart/form-data'
                        };

                        try {
                                const response = await axios.post('https://interview.issgate.com/api/Brand', formData, { headers });
                        } catch (error) {
                                console.error(error);
                        }
                },
                async updateBrand() {
                        const formData = new FormData();
                        let image = this.file ? this.file : this.editedItem.image ? this.editedItem.image : ""
                        formData.append('Image', image);
                        formData.append('NameByLang', JSON.stringify({
                                value: this.editedItem.name,
                                langId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
                        }));

                        const headers = {
                                'accept': '*/*',
                                'Authorization': localStorage.getItem('Token'),
                                'Content-Type': 'multipart/form-data'
                        };

                        try {
                                const response = await axios.put(`https://interview.issgate.com/api/Brand?BrandId=${this.editedItem.id}`, formData, { headers });
                        } catch (error) {
                                console.error(error);
                        }
                },
                async deleteBrand(brandId) {
                        const headers = {
                                'accept': '*/*',
                                'Authorization': localStorage.getItem('Token'),
                        };

                        try {
                                const response = await axios.delete(`https://interview.issgate.com/api/Brand/Remove/${brandId}`, { headers });
                        } catch (error) {
                                console.error(error);
                        }
                },
                onFileChange(event) {
                        this.file = event.target.files[0];
                },
                editItem(item) {
                        this.editedIndex = this.brands.indexOf(item)
                        this.editedItem = Object.assign({}, item)
                        this.dialog = true
                },

                deleteItem(item) {
                        this.editedIndex = this.brands.indexOf(item)
                        this.editedItem = Object.assign({}, item)
                        this.dialogDelete = true
                },

                deleteItemConfirm() {
                        this.deleteBrand(this.editedItem.id)
                        this.brands.splice(this.editedIndex, 1)
                        this.closeDelete()
                },

                close() {
                        this.dialog = false
                        this.$nextTick(() => {
                                this.editedItem = Object.assign({}, this.defaultItem)
                                this.editedIndex = -1
                        })
                },

                closeDelete() {
                        this.dialogDelete = false
                        this.$nextTick(() => {
                                this.editedItem = Object.assign({}, this.defaultItem)
                                this.editedIndex = -1
                        })
                },

                save() {
                        if (this.editedIndex > -1) {
                                Object.assign(this.brands[this.editedIndex], this.editedItem)
                                this.updateBrand()
                        } else {
                                this.AddBrand()
                                this.brands.push(this.editedItem)
                        }
                        this.close()
                },
                ChangePage() {
                        this.GetAllBrands();
                }
        },
}
</script>
<style> .icon {
         cursor: pointer !important;
         margin: 5px;
 }
</style>