<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="btnColor"
        light
        v-bind="attrs"
        v-on="on"
        :style="{ color: fontColor, 'margin-left': `${space}px` }"
        ><slot name="title"></slot
      ></v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">글 {{ edit ? "수정" : "등록" }}  {{data}}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="제목" required v-model="data.title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea outlined label="내용" v-model="data.contents"></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"> 취소 </v-btn>
        <v-btn color="blue darken-2" text @click="submit"> 등록 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    edit: {
      type: Boolean,
      default: false,
    },

    data: {
      type: Object,
      default: () => ({
        bno : 0,
        title: "",
        contents: "",
      }),
    },

    btnColor: {
      type: String,
      default: "",
    },

    fontColor: {
      type: String,
      default: "black",
    },

    space: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    async submit() {
      if(this.edit){
        // 수정
        const response = await this.$api('/api/board', 'PATCH', {
          bno : this.data.bno,
          title : this.data.title,
          contents : this.data.contents
        });
        if(response.status === 201 || response.status === 200){
          alert('수정되었습니다.');
          this.dialog = false;
        }else if(response?.data?.error){
          alert(response.data.error);
        }
      } else {
        // 신규 등록
        const response = await this.$api('/api/board', 'POST', {
          title : this.data.title,
          contents : this.data.contents
        });
        if(response.status === 201 || response.status === 200){
          alert('등록되었습니다.');
          this.dialog = false;
        }else if(response?.data?.error){
          alert(response.data.error);
        }
      }
      
      this.$emit('callback');

    },
  },
};
</script>
