<template>
        <div class="d-flex align-center justify-center" style="height: 60vh">
                <v-sheet width="400" class="mx-auto">
                        <div class="d-flex align-top justify-center LoginHeader">
                                <h1>Login</h1>
                        </div>
                        <v-form fast-fail @submit.prevent="login">
                                <v-text-field variant="underlined" v-model="username" label="User Name"></v-text-field>

                                <v-text-field type="password" variant="underlined" v-model="password" label="password"></v-text-field>
                                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                                <v-btn type="submit" variant="outlined" color="primary" block class="mt-2">Sign in</v-btn>

                        </v-form>
                        <div class="mt-2">
                                <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
                        </div>
                </v-sheet>
        </div>
</template>
      
<script>
import axios from 'axios'
export default {
        data() {
                return {
                        username: '',
                        password: '',
                        rememberMe: false
                }
        },
        methods: {

                async login() {
                        const params = {
                                username: this.username,
                                password: this.password,
                                rememberMe: this.rememberMe
                        };

                        try {
                                const response = await axios.post("https://interview.issgate.com/api/Auth/Authenticate", params);
                                console.log(response.data);
                                if (response.data.IsSuccess) {
                                        this.$router.push('/Home');
                                        localStorage.setItem('Token', response.data.Data.Token);
                                        localStorage.setItem('UserData', JSON.stringify(response.data.Data));
                                        setTimeout(() => {
                                                location.reload();
                                        }, 50);
                                }
                        } catch (error) {
                                console.error(error);
                                // Handle login error (e.g., show error message)
                        }
                }
        }
}
</script>
<style>
.LoginHeader {
        margin-bottom: 95px;
        font-size: 40px;
}
</style>
      