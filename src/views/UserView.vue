<template>
    <div>
        <v-card
        elevation="2"
        >
            <v-card-title>회원 정보 및 수정</v-card-title>
            <v-card-subtitle>* 는 필수 값입니다.</v-card-subtitle>
            <v-card-text>
                 <v-text-field v-model="user.id" label="* 아이디" disabled></v-text-field>
                 <v-text-field v-model="user.pwd" label="* 현재 비밀번호" type="password"></v-text-field>

                 <v-text-field v-model="user.newPwd" label="새로운 비밀번호" type="password"></v-text-field>
                 <v-text-field v-model="checkPwd" label="새로운 비밀번호 확인" type="password"></v-text-field>
                 <v-text-field v-model="user.name" label="* 이름"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-btn @click="modify">수정</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {

    data() {
        return {
            user : {
                id : '',
                name : '',
                pwd : '',
                newPwd : ''
            },

            checkPwd : ''
        }
    },

    created() {
        this.$store.state.title = "User";

        this.refreshUser();
    },

    methods: {

        ...mapActions(['setUserInfo']),

        async refreshUser(){
            const {data : user} = await this.$api(`/api/auth/user`, 'get')
            this.setUserInfo(user);

            this.user.id = this.$store.state.user.id;
            this.user.name = this.$store.state.user.name;
            this.user.pwd = '';
            this.user.newPwd = '';
            this.checkPwd = '';
        },

        async modify(){
            if(this.checkPwd !== this.user.newPwd){
                alert("비밀번호 확인이 일치하지 않습니다.");
                return false;
            }

            if(confirm('정말로 수정하시겠습니까?')){

                const response = await this.$api(`/api/auth/user`, 'patch', {
                    ...this.user,
                    newPwd : this.user.newPwd === '' ? null : this.user.newPwd
                });

                if(response.status === this.HTTP_OK || response.status === this.HTTP_CREATED){
                    alert("수정 되었습니다.");
                    this.refreshUser();
                }

            }
        }
    },




}
</script>