<template>
  <div class="admin_login" v-on:keyup.enter="clickLogin()">
    <div class="login_content">
      <div class="content_top">
        <a>
          <img src="http://uyi.uyidoctor.com/images/logo.png"  >
        </a>
      </div>
      <div class="content">
        <div class="id">
          <label class="login1">账号：</label>
          <label class="login1 login2">
            <input type="text" name="admin_id" id="admin_id" size="30" style="height: 40px;" placeholder="请输入账号">
            <br>
            <span class="span1" v-show="isShow1">*请输入账号</span>
          </label>
        </div>
        <div class="psw">
          <label class="login1">密码：</label>
          <label class="login1 login2">
            <input type="password" name="admin_psw" id="admin_psw" size="30" style="height: 40px;" placeholder="请输入密码">
            <br>
            <span class="span1"  v-show="isShow2">*请输入密码</span>
          </label>
        </div>
        <div class="psw">
          <label class="login1">验证码：</label>
          <label class="login1 login2">
            <input type="text" name="number" id="number" size="30" style="height: 40px;width:145px;" placeholder="请输入验证码">
            <img id="img" height="35px" style="vertical-align: bottom;" src="" @click="captcha()">
            <br>
            <span class="span1"  v-show="isShow3">*请输入验证码</span>
          </label>
        </div>
        <div class="click_login">
          <button class="btn" @click="clickLogin">立即登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'admin_login',
    data() {
      return {
        isShow1: false,
        isShow2: false,
        isShow3: false,
      };
    },
    methods: {
      clickLogin() {
        //判断是否输入
        var oAdminId = document.getElementById('admin_id');
        var oAdminPsw = document.getElementById('admin_psw');
        var oNumber = document.getElementById('number');
        if (oAdminId.value == '') {
          this.isShow1 = true;
        } else {
          this.isShow1 = false;
        }
        if (oAdminPsw.value == '') {
          this.isShow2 = true;
        } else {
          this.isShow2 = false;
        }
        if (oNumber.value == '') {
          this.isShow3 = true;
        } else {
          this.isShow3 = false;
        }
        if (oAdminId.value == '' || oAdminPsw.value == '' || oNumber.value == '') {
          return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/admin/login',
          method: 'post',
          data: {
            username: oAdminId.value,
            password: oAdminPsw.value,
            captcha: oNumber.value,
          },
          headers: {
//            authToken:'asdfdfd',
          },
        }).then((res) => {
          // alert('登陆成功！');
          /*this.GLOBAL.Token= res.data.authToken;
          this.GLOBAL.Username=res.data.username;*/
          /*localStorage.setItem('Token', res.data.authToken);
          localStorage.setItem('Username', res.data.username);*/
          sessionStorage.setItem('Token', res.data.authToken);
          sessionStorage.setItem('Username', res.data.username);
//         alert(res.data.authToken);
          // this.$router.go(0);
          this.$router.push({name: 'admin_manager'});
        }).catch((res) => {
//          alert('用户名或密码错误！');
          this.$message.error('用户名、密码或验证码错误！');
        })
      },
      captcha(){
        var num = Math.random();
        var oImg =document.getElementById('img');
        oImg.src = this.GLOBAL.url+'/captcha?'+num;


      },
    },
    created(){
      sessionStorage.setItem('tag',1);
    },
    mounted(){

      this.captcha();

    }
  }
</script>

<style scoped>
  .admin_login{
    width:100%;
    height:650px;
    background: rgba(192,192,192,0.5);
    display: inline-block;
  }

  .login_content{
    width: 400px;
    height: 400px;
    margin: 0 auto;
    margin-top:100px;
    /*border:1px solid #000;*/
    background: rgba(255,255,255,1);
  }
  .content_top img{
    margin:20px 0 ;
  }
  .id{
    margin: 30px 0;
    /*border:1px solid #000;*/
  }
  .psw{
    margin:30px 0;
    /*border:1px solid #000;*/
  }

  .login1{
    font-size:18px;
    height:25px;
    line-height:25px;
  }
  .span1{
    display: inline-block;
    font-size:14px;
    color:red;
    float: left;
    margin-top:5px;
    margin-left:102px;

  }
  .btn{
    width:300px;
    height:40px;
    border:0;
    font-size:20px;
    color: #fff;
    cursor: pointer;
    background: rgb(66,189,251);
  }
  button:hover{
    background:rgb(92,174,188) ;
  }
</style>
