<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="doctor_add">
    <div class="title">
      <span class="list">添加医生信息</span>
    </div>
    <div class="content">
      <div class="content_data">
        <div class="c1">
          <span class="txt">医生账号：</span>
          <input  class="Input" type="text" name="doctorUser" id="doctorUser" placeholder="20字符内">
          <span class="span" v-show="isShow1">*请输入账号名</span>
        </div>
        <div class="c1">
          <span class="txt">密码：</span>
          <input class="Input" type="password" name="doctorPsw" id="doctorPsw" >
          <span class="span" v-show="isShow2">*请输入密码</span>
        </div>
        <div class="c1">
          <span class="txt">真实姓名：</span>
          <input class="Input" type="text" name="doctorName" id="doctorName" placeholder="10字符内">
          <span class="span" v-show="isShow3">*请输入真实姓名</span>
        </div>
        <div class="c1">
          <span class="txt">头像：</span>
          <input class="Input" type="file" name="doctorImg" id="doctorImg" @change="upImg">
        </div>
        <div class="c2">
          <span class="txt">图片预览：</span>
          <img id="goodimages" src="" alt="" width="100px">
        </div>
        <div class="c1" style="height: 200px;">
          <span class="txt">个人简介：(200字内)</span>
          <textarea  name="doctorIntro" id="doctorIntro" cols="40" rows="10"></textarea>
        </div>

        <div class="btn">
          <button @click="add_OK" class="add_btn">保存</button>
          <button @click="add_Ret" class="add_return">返回</button>
        </div>


      </div>
    </div>

  </div>
  </div>
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  import adminmain from './admin_main'
  
  export default{
    name: 'admin_add',
    data() {
      return{
        isShow1: false,
        isShow2: false,
        isShow3: false,
          authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      upImg(file){
        var reader = new FileReader();
        reader.onload = function(e){
          var oGoodimages = document.getElementById('goodimages');
          oGoodimages.src = e.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      },
      add_OK() {
        var oUser=document.getElementById('doctorUser');
        var oPsw=document.getElementById('doctorPsw');
        var oName=document.getElementById('doctorName');
        var oImg=document.getElementById('doctorImg');
        var oIntro=document.getElementById('doctorIntro');
        var newImg = document.getElementById('goodimages');
        var img = newImg.src;
        /* 去除字符串  */
        var ss=img.split('base64,');
        var r = ss[1];
        if(oUser.value==''){
          this.isShow1=true;
        }else{
          this.isShow1=false;
        }
        if(oPsw.value==''){
          this.isShow2=true;
        }else{
          this.isShow2=false;
        }
        if(oName.value==''){
          this.isShow3=true;
        }else{
          this.isShow3=false;
        }
        if(oUser.value=='' || oPsw.value=='' || oName.value==''){
          return;
        }
        if(oUser.value.length>20) {
          alert('用户名输入太长，超出限制！');
          return;
        }
        if(oName.value.length >10){
          alert('姓名输入太长，超出限制！');
          return;
        }
        if(oIntro.value.length>200) {
          alert('简介输入太长，超出限制！');
          return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpdoctor/save',
          method: 'post',
          data: {
            account: oUser.value,
            password: oPsw.value,
            realName: oName.value,
            iconUrl: r,
            introduction: oIntro.value,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) => {
          alert('添加医生成功！');
          this.$router.push({name: 'doctor_manager'});
        }).catch( (res) =>{
//          alert('fail');
          this.$message.error('添加医生失败！');
        })
      },
      add_Ret() {
        this.$router.push({name: 'doctor_manager'});
      },
      textNumber1(text){
        if(text.length>20) {
          alert('输入太长，超出限制！');
          return;
        }
      },
      textNumber2(text){
        if(text.length>200) {
          alert('输入太长，超出限制！');
          return;
        }
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
  .doctor_add{
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

  .c2{
    width:800px;
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
