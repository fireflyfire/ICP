<template>
  <div class="banner">
    <div class="banner-left">
      <!--<span class="txt1">
        <img src="http://www.uyidoctor.com/assets/5c55ebf094470f5bb38f3b68d8a3ead9.png">
        <span>手机端APP</span>
      </span>-->
      <span class="txt2">
        <img src="http://uyi.uyidoctor.com/assets/2299ab924d07ac726dbe23eef725a428.png" alt="">
        <span>400-080-8820</span>
      </span>
    </div>
    <div class="banner-right">
      <span v-show="isShow1">
        <div>
          <span @click="clickUrl()" style="cursor: pointer">登录</span>
          <!--<a href="/login">登录</a>-->
        </div>
        <div class="c1">|</div>
        <div>
          <a href="/register">注册</a>
        </div>
        <div class="c1">|</div>
        <!--<div>
          <a href="#/admin_login">管理员</a>
        </div>
        <div class="c1">|</div>-->
        <div>
          <a href="/introduction">公司简介</a>
        </div>
      </span>
      <span v-show="isShow2">
        <div>
          <!--{{ SessionData.SuserName }}{{ message }}-->
          <span >
            <span v-if="userType==5">{{userName}}{{message}}</span>
            <el-dropdown  v-if="userType==4">
             <span class="el-dropdown-link">
              {{userName}}{{message}}<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a href="/updateInfo">修改资料</a></el-dropdown-item>
                <el-dropdown-item><a href="/newPassword">修改密码</a></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>

          <span v-if="userType==4">
            <span v-if="userData.vip==true">
            <img src="../../assets/vip2.png" width="30" style="vertical-align: top" alt="">
              <span>会员</span>
          </span>
            <span v-else>
            <img src="../../assets/vip1.png" width="30" style="vertical-align: top" alt="">
            <span class="vip" @click="dialogVisible = true">购买VIP</span>
          </span>
          </span>
        </div>
        <div class="c1">|</div>
        <div>
          <a href="/index" @click="exit()">退出</a>
        </div>
        <div class="c1">|</div>
        <div>
          <a href="/introduction">公司简介</a>
        </div>
      </span>
    </div>
    <el-dialog title="购买VIP" :visible.sync="dialogVisible" size="tiny" >
      <span style="display:inline-block;width: 100%;">
        <input type="radio" name="vtype" value="10" checked>1个月(￥10.00)
        <br>
        <input type="radio" name="vtype" value="100" >1年(￥100.00)
      </span>
      <span style="display: inline-block;width:100%;color:red;">(*支付宝支付)</span>
      <a href="/doVip" @click="doVip()" target="_blank" >
        <span class="vipSpan">
          确定
        </span>
      </a>
        <!--<span class="vipSpan" style="cursor:pointer;" @click="doVip()">
          确定
        </span>-->
    </el-dialog>


  </div>
</template>

<script>
 /* var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');
  var userVip =sessionStorage.getItem('VIP');*/
  export default{
    name: 'banner',
    data(){
      return{
        isShow1: '',
        isShow2: '',
        content: '',

        message: '',
        userName: sessionStorage.getItem('Username'),
        vip: sessionStorage.getItem('VIP'),
        userType: sessionStorage.getItem('Usertype'),
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
        html: '',
        dialogVisible: false,
        v_type:'',
        userData:[],
        vhtml: '',
      };
    },
//    props: ['SessionData'],
    methods:{
      clickUrl(){
        this.$router.push({name: 'login'});
      },
      getUserdata(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/findIcpUserList?id='+this.userid,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          this.userData = res.data.results[0];
//          console.log('this.data'+this.userData.vip);
        }).catch( (res) =>{
          this.$message.error('网络错误！');
        })
      },
      check(){
//        alert('banner logintag '+logintag);
        if(this.logintag == 1){
          this.isShow2 = true;
          this.isShow1 = false;
        }else{
          this.isShow1 = true;
          this.isShow2 = false;
        }
      },
      exit(){
        sessionStorage.clear();
        this.$router.go(0);
      },
      doVip(){
        var oType = document.getElementsByName('vtype');
        var select = '';
        for( var i=0; i<oType.length;i++){
          if(oType[i].checked){
            select = oType[i].value;
          }
        }
        console.log('vtype'+select);
        sessionStorage.setItem('vtype',select);


      },


    },
    created(){
      this.check();
      if(this.logintag == 1){
        this.getUserdata();
      }
      if(this.usertype==5){
        this.message = '医生';
      }else if(this.usertype == 4){
        this.message = '用户';
      }

    },


  }
</script>

<style scoped>
  .banner{
    width:1340px;
    height:40px;
    margin:0 auto;
    line-height:40px;
    background:rgba(212,212,212,0.3);
  }
  .banner-left{
    font-size:16px;
    width:500px;
    float: left;
    text-align: left;
    margin-left:100px;
  }
  .txt1,.txt2{
    margin-left: 10px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    margin-right: 20px;
  }
  .banner-right{
    font-size:14px;
    width:500px;
    float: right;
    text-align: right;
    margin-right:100px;
  }
  .banner-right div{
    display: inline-block;
  }
  .banner-right a:link,.banner-right a:visited{
    color:#666;
    text-decoration: none;
  }
  .banner-right a:hover{
    color: #000;
    text-decoration: none;
  }
  .c1{
    margin:0 20px;
  }
  .vip{
    color:#ff6820;
    font-size: 14px;
    cursor:pointer;
  }
  .vipSpan{
    display: inline-block;
    width:100px;
    height:30px;
    line-height:30px;
    background:rgb(1,1,95);
    color:#fff;
    font-size:18px;
    margin-top:20px;
  }
  a:hover,a:link,a:visited{
    color:#000;
  }
</style>
