<template>
  <div class="login" v-on:keyup.enter="checkLogin()">
    <div class="title">
      <a href="/index"><img class="title_img" src="http://uyi.uyidoctor.com/assets/c02f7e01a64b8abda1a1bf9b053ad4f2.png" alt="">
      </a>
    </div>
    <hr class="hr_style">
    <div class="content">
      <div class="content_img">
        <img src="http://uyi.uyidoctor.com/assets/82756fab7289ac4193c112a869776acc.jpg" alt="">
      </div>
      <div class="content_data">
        <span class="content_total">
          <span class="content_txt">账号：</span>
          <input class="Input" type="text" name="account" id="account" >
        </span>
        <span class="content_total">
          <span class="content_txt">密码：</span>
          <input class="Input" name="password" id="password" type="password">
        </span>
        <span class="content_total">
          <span class="content_txt">验证码：</span>
          <input class="Input" style="width:100px;" v-model="yzNumber">
          <img id="img" style="width: 100px;vertical-align: top;" @click="captcha()">
        </span>
        <span class="content_url">
          <a class="url_style" href="/forget">忘记密码</a>
          <span>|</span>
          <a class="url_style" href="/register">注册账号</a>
        </span>
        <div  class="span" >
          <span v-show="isShow" >*请填写账号、密码、验证码</span>
        </div>

        <span class="content_total" style="text-align: right;">
          <button class="login_btn" @click="checkLogin()">登录</button>
        </span>
      </div>
    </div>
    <div style="margin-left:-70px;">
      <v-footer></v-footer>
    </div>
  </div>

</template>

<script>
  import footer from './common/footer'

  export default{
    name: 'login',
    data() {
      return{
        isShow: false,
        authtoken: '',
        logintag: 0,
        yzNumber: '',
        content: {
          id: '',
          account: '',
          type: '',
          phoneNumber: '',
          realName: '',
          gender: '',
          idCardNumber: '',
          icon: '',
          lastLoginTime: '',
          email: '',
          pastHistory: '',
          restrict: '',
        }
        /*content: '',*/
      };
    },
    components: {
      'v-footer':footer
    },
    methods: {
      checkLogin(){
        var oAccount = document.getElementById('account');
        var oPwd = document.getElementById('password');
        if( oAccount.value == '' || oPwd.value == '' || this.yzNumber == ''){
          this.isShow = true;
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/login',
//          url: 'http://192.168.0.10:8082/app/api/icpuser/login',
          method: 'post',
          data:{
            account: oAccount.value,
            password: oPwd.value,
            captcha: this.yzNumber,
          },
        }).then( (res) =>{
          this.logintag =1;
          sessionStorage.clear();
          sessionStorage.setItem('Token',res.data.authToken);
          sessionStorage.setItem('Logintag',this.logintag);
          sessionStorage.setItem('Userid',res.data.id);
          sessionStorage.setItem('Username',res.data.realName);
          sessionStorage.setItem('Usertype',res.data.type);
          sessionStorage.setItem('VIP',res.data.vip);
//          alert('VIP'+res.data.vip);
//           this.$router.go(0);
          this.$router.push('/index');
        }).catch( (res) =>{
          this.$message.error("用户名、密码或验证码错误！");
        })
      },
      captcha(){
        var num = Math.random();
        var oImg =document.getElementById('img');
        oImg.src = this.GLOBAL.url+'/captcha?'+num;
//        oImg.src = ' http://192.168.0.10:8082/captcha?'+num;

      },
    },
    created(){
      sessionStorage.setItem('tag',1);
    },
    mounted(){
//      var oImg =document.getElementById('img');
//      console.log('img1'+oImg.src);
      this.captcha();
//      console.log('img2'+oImg.src);
    }
  }
</script>

<style scoped>
  .login{
    width:1200px;
    height:700px;
    margin:0 auto;
    /*border:1px solid #000;*/
    color: #666;
  }
  .title{
    height:50px;
    margin:20px 10px 10px 50px;
    text-align: left;
  }
  .hr_style{
    margin-left:50px;
    margin-right:10px;
    border:none;
    border-top:1px solid rgb(212,212,212);
  }
  .content{
    height:600px;
    /*border: 1px solid #000;*/
    margin-top: 50px;
    margin-left:50px;
  }
  .content_img{
    width:550px;
    height:500px;
    /*border:1px solid #000;*/
    float: left;
  }
  .content_data{
    width:500px;
    height:500px;
    float: right;
    /*border:1px solid #000;*/
    text-align: left;
    font-size:14px;
  }
  .content_total{
    display: inline-block;
    width:300px;
    height:40px;
    line-height:40px;
    margin-top:20px;
    /*border:1px solid #000;*/
    text-align: left;
  }
  .content_txt{
    display: inline-block;
    width:80px;
    text-align: right;
    /*border:1px solid #000;*/
  }
  .Input{
    width:200px;
    height:30px;
    border:1px solid rgb(212,212,212);
    border-radius:5px;
  }
  .radio_style{
    margin:0 0 0 50px;
  }
  .content_url{
    display: inline-block;
    width:300px;
    height:40px;
    line-height:40px;
    margin-top:20px;
    /*border:1px solid #000;*/
    text-align: right;
  }
  .content_url a:link,.content_url a:visited{
    text-decoration: none;
    cursor: pointer;
    color: #666;
  }
  .content_url a:hover{
    color: rgb(33,137,163);
  }
  .login_btn{
    width:100px;
    height:35px;
    line-height:35px;
    font-size:14px;
    color: #fff;
    background: rgb(1,1,95);
    border:1px solid rgb(1,1,95);
    border-radius:3px;
    cursor: pointer;
  }
  .span{
    width:300px;
    height:30px;
    line-height:30px;
    margin-top:10px;
    /*border:1px solid #000;*/
    text-align: right;
    color: red;
  }
</style>
