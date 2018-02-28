<template>
  <div class="askDoctor">
    <v-banner></v-banner>
    <v-header></v-header>
    <div class="content">
      <div class="part1">
        <img src="http://uyi.uyidoctor.com/assets/ddaf86ea63785a6c7493752b67b06c4f.png"
             width="1340" alt="">
        <div v-if="isShow">
          <v-user></v-user>
        </div>
        <div v-else>
          <v-doctor></v-doctor>
        </div>
      </div>

    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
 /* var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');*/
  import banner from '../common/banner'
  import header from '../common/header'
  import footer from '../common/footer'
  import user_ask from './user_ask'
  import doctor_answer from './doctor_answer'
  export default{
    name: 'askDoctor',
    data(){
      return{
        isShow:'',
        userInfo: '',
        userName: sessionStorage.getItem('Username'),
        userType: sessionStorage.getItem('Usertype'),
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
      };
    },
    methods:{

    },
    created(){
      sessionStorage.setItem('tag',2);
//        alert('askDoctor.usertype'+usertype);
      if(this.logintag != 1){
        this.$router.push('/login');
      }else{
        if(this.userType==4){
          this.isShow = true;
        }else if(this.userType==5){
          this.isShow = false;
        }
      }


    },
    components: {
      'v-banner':banner,
      'v-header':header,
      'v-footer':footer,
      'v-user': user_ask,
      'v-doctor':doctor_answer,
    },
  }
</script>

<style scoped>
  .askDoctor{
    width: 1340px;
    margin:0 auto;
  }
  .content{
    width:1340px;
    /*border:1px solid #000;*/
  }

</style>

