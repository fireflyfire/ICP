<template>
  <div class="admin_t">
    <div class="admin_part1">
      <v-main></v-main>
    </div>
    <div class="admin_add">
      <div class="title">
        <span class="list">添加角色管理员</span>
      </div>
      <div class="content">
        <div class="content_data">
          <div class="c1">
            <span class="txt">用户名名称：</span>
            <input  class="Input" type="text" name="add_user" id="add_user" placeholder="用户名,20字符内">
            <span class="span" v-show="isShow1">*请输入符合的用户名</span>
          </div>
          <div class="c1">
            <span class="txt">密码：</span>
            <!--<input class="Input" type="password" name="add_psw" id="add_psw" placeholder="密码">-->
            <span class="span">*默认密码UYI123456t</span>
          </div>
          <div class="c1">
            <span  class="txt">类型：</span>
            <select class="Input" name="add_type" id="add_type">
              <option value="1">系统管理员</option>
            </select>
          </div>

          <div class="btn">
            <button @click="add_OK" class="add_btn">保存</button>
            <button @click="add_Ret" class="add_return">返回</button>
          </div>


          <span></span>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  import { textNumber1, textNumber2 } from '../ut/textNumber'
  import adminmain from './admin_main'

  export default{
    name: 'admin_add',
    data() {
      return{
        isShow1: false,
        isShow2: false,
        authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      getCode(str){
        var patt = new RegExp("400");
        var result = patt.exec(str);
        if(result != ''){
          return result;
        }
      },
      add_OK() {
        var oUser=document.getElementById('add_user');
//        var oPsw=document.getElementById('add_psw');
var oType=document.getElementById('add_type');
if(oUser.value=='' || oUser.value.length >16 ){
  this.isShow1=true;
}else{
  this.isShow1=false;
}
//        if(oPsw.value==''){
//          this.isShow2=true;
//        }else{
//          this.isShow2=false;
//        }
if(oUser.value==''|| oUser.value.length >16 ){
  return;
}
this.$ajax({
  url: this.GLOBAL.url+'/app/api/admin/save',
  method: 'post',
  data: {
    username: oUser.value,
    password: '',
    adminType: oType.value,
  },
  headers: {
    authToken:this.authtoken,
  },
}).then( (res) => {
  alert('添加管理员成功！');
  this.$router.push({name: 'admin_manager'});
}).catch( (res) =>{
  var code = this.getCode(res);
  if(code == '400'){
    alert('该账号已被使用，请重新添加！');
  }
})
},
add_Ret() {
  this.$router.push({name: 'admin_manager'});
},
}
}
</script>

<style scoped>
  .admin_t{
   display: inline-block;
   width:1300px ;
   height: 1000px;
   /*border:1px solid #000;*/
   background: rgba(255,255,255,0.8);

 }
 .admin_part1{
  float:left;
  margin-right: 30px;
}
.admin_add{
  margin:0px;
  padding-top: 50px;
  height: 800px;
  width:100%;
  font-size: 0;
  /*border:1px solid #000;*/
}

.title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 25px;
  color: #444;
  text-align: left;
  /*border:1px solid red;*/
  /*border-bottom:2px solid rgb(147,153,159);*/
  /*display: inline-block;*/
}

.list {
  width: 50%;
  /*border: 1px solid #000;*/
  line-height: 50px;
  margin-left: 30px;
  border-bottom: 2px solid orange;
}

.content {
  float: left;
  font-size: 16px;
  width: 900px;
  height: 800px;
  margin-left: 30px;
  padding-top: 30px;
  /*border: 1px solid blue;*/
  border-top: 2px solid rgb(147, 153, 153);
  /*display: inline-block;*/
}
.content_data{
  width: 900px;
  height: 500px;
  padding-top:20px;

}
.c1{
  width:800px;
  height:50px;
  line-height:50px;
  font-size: 16px;
  font-weight:bold;
  color: #000;
  /*border:1px solid #000;*/
  text-align: left;
  padding-left:50px;
}
.txt{
  display: inline-block;
  width:200px;
}
.Input{
  width:300px;
  height: 30px;
  border-radius: 5px;
  border:1px solid rgb(153,153,153);
}
.btn{
  width:900px;
  height:50px;
  line-height:50px;
  margin-top:30px;
  text-align: left;
  padding-left:300px;
  /*border:1px solid #000;*/
}
.add_btn{
  width:150px;
  height:40px;
  line-height: 40px;
  text-align: center;
  background: rgb(66,189,251);
  color: #fff;
  font-size:18px;
  border:0;
  border-radius:5px;
  cursor: pointer;
}
.add_return{
  width:100px;
  height: 40px;
  line-height:40px;
  text-align: center;
  font-size:18px;
  background: rgb(185,185,185);
  color: rgb(113,113,113);
  border:0;
  border-radius:5px;
  margin-left:30px;
  cursor: pointer;
}

.span{
  display: inline-block;
  font-size:14px;
  font-weight:200;
  color:rgb(73,153,207);
  margin-left:30px;
}
</style>
