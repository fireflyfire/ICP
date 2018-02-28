<template>
  <div class="userInfo">
    <v-banner></v-banner>
    <v-header></v-header>
    <div class="content">
      <span class="content_title">个人信息</span>
      <span class="content_data">
        <span class="img">
          <img :src="userintro.iconUrl" width="300" alt="">
        </span>
        <span class="text">
          <span class="total">
            <b>账号：</b>
            {{ userintro.account }}
          </span>
          <span class="total">
            <b>真实姓名：</b>
            {{  userintro.realName }}
          </span>

          <span class="total">
            <b>性别：</b>
            {{ userintro.gender }}
          </span>
          <span class="total">
            <b>身份证号：</b>
            {{ userintro.idCardNumber }}
          </span>
          <span class="total">
            <b>电话：</b>
            {{ userintro.phoneNumber }}
          </span>
          <span class="text2">
          <b>既往病史：</b>
          <span class="past">{{ userintro.pastHistory }}</span>
          </span>

        </span>

      </span>

    </div>

    <v-footer></v-footer>
  </div>
</template>

<script>
  import banner from '../common/banner'
  import header from '../common/header'
  import footer from '../common/footer'
 /* var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');*/
  export default{
    name: 'userInfo',
    data(){
      return{
        isShow: false,
        isShow2: false,
        userintro: [],
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
        userid: sessionStorage.getItem('Userid'),
      };
    },
    methods:{
      getUserdata(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/findIcpUserList?id='+this.userid,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          this.userintro = res.data.results[0];
//          alert(this.userintro.iconUrl);
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('网络错误！');
        })
      },
      update(){
        this.isShow = true;
      },
      update_ok(){
//        var oNewpwd = document.getElementById('new_pwd');
        var oNewname = document.getElementById('new_name');
        var oNewsex = document.getElementsByName('new_sex');
        var oNewcard = document.getElementById('new_cardnumber');
        var oNewphone = document.getElementById('new_phone');
        var oNewicon =document.getElementById('new_icon');
        var oNewhistory =document.getElementById('new_history');
        var selectvalue=null;
        for(var i=0;i<oNewsex.length;i++){
          if(oNewsex[i].checked==true) {
            selectvalue=oNewsex[i].value;
            break;
          }
        }
//        alert('sex '+selectvalue);
//        alert('idcard '+oNewcard.value);
        if(oNewname.value == '' || selectvalue == null || oNewcard.value == '' || oNewphone.value == ''){
          this.isShow2 = true;
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/update',
          method: 'post',
          data:{
            id: this.userid,
            account: this.userintro.account,
            phoneNumber: oNewphone.value,
            realName: oNewname.value,
            gender: selectvalue,
            idCardNumber: oNewcard.value,
            iconUrl: oNewicon.value,
            pastHistory: oNewhistory.value,
          },
          headers:{
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          alert('个人信息修改成功！');
          sessionStorage.setItem('Username',oNewname.value);
          this.$router.go(0);
        }).catch( (res) => {
//          alert('fail'+res);
          this.$message.error('网络错误！');
        })


      },
      update_return(){
        this.isShow = false;
        this.isShow2 = false;
      }

    },
    components: {
      'v-banner':banner,
      'v-header':header,
      'v-footer':footer,
    },
    created(){
//      alert('logintag='+logintag);
//      alert('authtoken'+authtoken);
      if(this.logintag != 1){
        this.$router.push('./login');
      }else{
//        alert(userid);
        this.getUserdata();
      }
    }
  }
</script>

<style scoped>
  .userInfo{
    width:1340px;
    margin:0 auto;
    position: relative;
  }
  .content{
    width:1340px;
    margin-bottom:150px;
  }
  .content_title{
    display: inline-block;
    width:1340px;
    height: 60px;
    line-height:60px;
    margin-top:50px;
    font-size:30px;
    color:rgb(1,1,95);
  }
  .content_data{
    display: inline-block;
    width:1200px;
    margin-bottom:100px;
    /*border: 1px solid #000;*/
    margin:0 auto;

  }
  .img{
    display: inline-block;
    width:300px;
    /*height:300px;*/
    margin-top:50px;
    /*background: url('http://www.uyidoctor.com/assets/8ee2433fb11ab35c45b9bec9e5ba778e.png');*/
    /*background-size:300px 300px ;*/
    vertical-align: top;
    /*border:1px solid #000;*/
  }
  .text{
    display: inline-block;
    width:700px;
    height:400px;
    margin-top:50px;
    vertical-align: top;
    color:#000;
    font-size:14px;
    /*border:1px solid #000;*/
  }
  .total{
    display: inline-block;
    width:600px;
    height:40px;
    line-height:40px;
    margin-left:30px;
    margin-top: 5px;
    text-align: left;
    /*border:1px solid #000;*/
    font-size: 14px;
    color: rgb(120,120,120);
  }
  .text2{
    display: inline-block;
    width:600px;
    height:40px;
    line-height:40px;
    margin-left:30px;
    margin-top: 5px;
    text-align: left;
    /*border:1px solid #000;*/
    font-size: 14px;
    color: rgb(120,120,120);
  }
  .past{
    line-height:30px;
  }
  .total b,.text2 b{
    display: inline-block;
    width:150px;
    font-size: 16px;
    color:rgb(1,1,95);
  }
  .content_btn{
    display: inline-block;
    width:1340px;
    height:70px;
    line-height:70px;
    /*border:1px solid #000;*/
  }
  .btn{
    display: inline-block;
    width:150px;
    height:40px;
    background: rgb(1,1,95);
    border:0;
    color: #fff;
    font-size:18px;
    cursor: pointer;
  }

  .update_data{
    width:500px;
    height:600px;
    z-index: 100;
    border:1px solid #fff;
    border-radius:5px;
    background: rgba(65,65,65,0.8);
    position: absolute;
    top:300px;
    left:400px;
  }
  .update_title{
    width:500px;
    height: 50px;
    line-height:50px;
    font-size:25px;
    color: #fff;
    margin:20px 0;
  }
  .update{
    width:500px;
    height:400px;
    /*border: 1px solid #000;*/
  }
  .update_total,.update_total2{
    display: inline-block;
    width:500px;
    height:40px;
    text-align: left;
    /*border: 1px solid #000;*/
  }
  .update_total2{
    height:100px;
  }
  .update_text{
    display: inline-block;
    width:150px;
    height:40px;
    line-height: 40px;
    font-size:16px;
    font-weight:bold;
    color:#fff;
    /*border:1px solid #fff;*/
    margin-left:30px;
    vertical-align: top;
  }
  .update_account{
    display: inline-block;
    width:250px;
    height: 40px;
    line-height:40px;
    color:orange;
    font-size:20px;
    margin-left:20px;
    /*border:1px solid red;*/
  }
  .update_input,.update_input2{
    display: inline-block;
    width:250px;
    height: 40px;
    /*border:1px solid red;*/
  }
  .update_input2{
    height:100px;
  }
  .Input,.Input2{
    display: inline-block;
    width:200px;
    height:30px;
    border:1px solid #fff;
    border-radius:5px;
    margin-left:20px;
  }
  .Input2{
    height:100px;
  }
  .radio_style{
    display: inline-block;
    width:50px;
    margin-left:30px;
  }
  .file_style{
    display: inline-block;
    margin-left:30px;
  }
  .update_btn{
    width:500px;
    height:50px;
    line-height:50px;
    margin-top:20px;
    text-align: center;
    color: #fff;
    /*border:1px solid blue;*/
  }
  .button_ok{
    width:100px;
    height:30px;
    font-size:18px;
    color: #fff;
    background: rgb(1,1,95);
    border:0;
    margin-right:30px;
    cursor: pointer;
  }
  .button_return{
    width:100px;
    height:30px;
    font-size:18px;
    color: rgb(89,89,89);
    background: rgb(153,153,153);
    border:0;
    margin-left:30px;
    cursor: pointer;
  }
</style>
