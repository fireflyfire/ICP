<template>
  <div class="admin_main">
    <div class="admin_left">
      <div class="logo">
        <span class="admin_logo">
          优医
        </span>
      </div>
      <div class="admin_menu">
        <ul>
          <li>
            <router-link :to="{name: 'admin_manager'}">管理员</router-link>
          </li>
          <li>
            <router-link :to="{name: 'doctor_manager'}">医生管理</router-link>
          </li>
          <li>
            <router-link :to="{name: 'user_manager'}">用户列表</router-link>
          </li>
          <li>
            <router-link :to="{name: 'store_manager'}">药品管理</router-link>

          </li>
          <li>
            <router-link :to="{name: 'zixun_manager'}">资讯管理</router-link>
          </li>
          <li>
            <router-link :to="{name: 'recruit_manager'}">招聘管理</router-link>

          </li>
          <li>
            <router-link :to="{name: 'key_manager'}">关键词</router-link>

          </li>
          <li>
            <router-link :to="{name: 'user_logo_file'}">用户日志</router-link>

          </li>
          <li>
            <router-link :to="{name: 'examine_logo_file'}">审查日志</router-link>
          </li>
          <li class="exit">
            <span class="logout" @click="Update">修改密码</span>
          </li>
          <li class="exit">
            <span>{{ username}}</span>
            <span class="logout" @click="logout">退出</span>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="upShow" size="tiny">
      <el-row style="text-align:left; margin-left:50px;">
        <el-col :span="24">
          <span class="title_z">登录账号：</span>
          {{ username }}
        </el-col>
        <el-col :span="24">
          <span class="title_z">新密码：</span>
          <input class="Input" type="password" v-model="newpassword">
          <span class="span" v-show="isShow1">*请输入新密码</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
         <el-button @click="updateReturn()">取 消</el-button>
         <el-button type="primary" @click="updateOK()">确 定</el-button>
         </span>
    </el-dialog>

  </div>
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  // var Username = sessionStorage.getItem('Username');
  export default{
    name: 'admin_main',
    data() {
      return{
        username :sessionStorage.getItem('Username'),
        upShow: false,
        newpassword: '',
        isShow1: false,
        content:[],
        authtoken: sessionStorage.getItem('Token'),

      };
    },
    methods: {
      getData(){
        var oUrl = this.GLOBAL.url+'/app/api/admin/findAdminUser?page=1&pageSize=1&username='+ this.username;
        this.$ajax({
          url: oUrl ,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then((res) => {
          this.content = res.data.results[0];
        }).catch((res) => {
//          alert('数据错误！');

//        this.$router.push('../admin_login');
          this.$message.error('网络错误！');
        })
      },
      logout() {
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/admin/logout',
          method: 'post',
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) => {
          alert('退出成功！');
          sessionStorage.clear();
          this.$router.push({name: 'admin_login'});
        }).catch( (res) => {
//          alert('fail');
          this.$message.error('网络错误！');
        })
      },
      Update(){
        this.getData();

        this.upShow = true;

      },
      updateReturn(){
        this.upShow = false;
      },
      updateOK(){
        if(this.newpassword == ''){
          this.isShow1 = true;
          return;
        }else{
          this.isShow1 = false;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/admin/edit',
          method: 'post',
          data: {
            id: this.content.id,
            username: this.username,
            password: this.newpassword,
            adminType: this.content.adminType,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) => {
          alert('密码修改成功！');
          this.upShow=false;
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('修改失败！');
        })


      }
    },
    created(){
//    alert('admin_main authtoken'+authtoken);
    }


  }
</script>

<style scoped>
  .admin_main {
    display: inline-block;
    width:300px ;
    height: 1000px;
    /*border:1px solid #000;*/
    background: rgba(255,255,255,0.8);

  }
  .admin_left{
    display: inline-block;
    float: left;
    width:300px;
    height: 1000px;
    text-align: center;
    margin-left:15px;
    /*margin-top: 80px;*/
    padding-left:20px;
    /*border:1px solid #000;*/
    border-right:2px solid rgb(147,153,159);
  }
  .logo{
    width:250px;
  }
  .admin_logo{
    width: 250px;
    height: 80px;
    line-height: 80px;
    display: inline-block;
    text-align: center;
    font-size: 26px;
    background: #ffb049;
    color: #fff;
  }

  .admin_menu{
    width:250px;
    height:850px;
    background: #2e3e4e;
  }
  .admin_menu a:link,.admin_menu a:hover,.admin_menu a:visited{
    color: #fff;
    text-decoration: none;
  }
  .admin_menu ul{
    list-style: none;
    padding-top:20px;
  }
  .admin_menu li{
    height:40px;
    line-height:40px;
  }
  .admin_menu li:hover{
    background: rgba(255,255,255,0.4);
  }

  .admin_right{
    width:100%;
    /*border:1px solid #000;*/
  }
  .exit{
    color:red;
    font-size:15px;
  }

  .logout{
    color:orange;
    cursor:pointer;
  }
  .Input{
    height:30px;
    width:200px;
    line-height:30px;
  }
  .title_z{
    display: inline-block;
    height:30px;
    font-size:16px;
    font-weight:bold;
    color: #000;
    margin:10px 0;
  }
  .span{
    display: inline-block;
    font-size:14px;
    font-weight:200;
    color:red;
    margin-left:30px;
  }
</style>
