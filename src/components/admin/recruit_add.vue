<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="recruit_manager">
    <div class="title">
      <span class="list">添加招聘信息</span>
    </div>
    <div class="content">
      <span style="color:red;font-size:12px; margin-bottom:30px; float:left;">（带*为必填项）</span>
      <div class="content_data" style="text-align: left;">
        <el-row >
          <el-col :span="24">
            <span class="text_1">职位名称：</span>
            <input class="input_1" type="text" v-model="position">
            <span class="span">*</span>
          </el-col>
          <el-col :span="24">
            <span class="text_1">公司名称：</span>
            <input class="input_1" type="text" v-model="companyName">
            <span class="span">*</span>
          </el-col>
          <el-col :span="8">
            <span  class="text_2">工作地点：</span>
            <input class="input_2" type="text" v-model="workPlace" >
            <span class="span">*</span>
          </el-col>
          <el-col :span="12">
            <span class="text_2">薪资：</span>
            <input class="input_2" type="text" v-model="salary">
            <span class="span">*</span>
          </el-col>
          <el-col :span="8">
            <span class="text_2">招聘人数：</span>
            <input class="input_2" type="text" v-model="number">
            <span class="span">*</span>
          </el-col>
          <el-col :span="12">
            <span class="text_2">是否全职：</span>
            <input  type="radio" name="quan" value="全职" checked>是
            <input type="radio" name="quan" value="非全职">否
          </el-col>
          <el-col :span="8">
            <span class="text_2">学历：</span>
            <input class="input_2" type="text" v-model="education">
          </el-col>
          <el-col :span="12">
            <span class="text_2">经验：</span>
            <input class="input_2" type="text" v-model="experience">
          </el-col>
          <el-col :span="8">
            <span class="text_2">联系人：</span>
            <input class="input_2" type="text" v-model="contacts">
          </el-col>
          <el-col :span="12">
            <span class="text_2">联系人电话：</span>
            <input class="input_2" type="text" v-model="phone">
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <div class="text_1">职位介绍</div>
          <el-col :span="24" class="col">
            1.<input class="input_3" type="text" v-model="post1"><span class="span">*</span>
          </el-col>
          <el-col :span="24" class="col">
            2.<input class="input_3" type="text" v-model="post2">
          </el-col>
          <el-col :span="24" class="col">
            3.<input class="input_3" type="text" v-model="post3">
          </el-col>
          <el-col :span="24" class="col">
            4.<input class="input_3" type="text" v-model="post4">
          </el-col>
          <el-col :span="24" class="col">
            5.<input class="input_3" type="text" v-model="post5">
          </el-col>
        </el-row>
        <el-row style="margin-top:20px;">
          <div class="text_1">职位要求</div>
          <el-col :span="24"  class="col">
            1.<input class="input_3" type="text" v-model="req1"><span class="span">*</span>
          </el-col>
          <el-col :span="24"  class="col">
            2.<input class="input_3" type="text" v-model="req2">
          </el-col>
          <el-col :span="24"  class="col">
            3.<input class="input_3" type="text" v-model="req3">
          </el-col>
          <el-col :span="24"  class="col">
            4.<input class="input_3" type="text" v-model="req4">
          </el-col>
          <el-col :span="24"  class="col">
            5.<input class="input_3" type="text" v-model="req5">
          </el-col>
        </el-row>

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
    name: 'recruit_add',
    data() {
      return{
        position:'',
        companyName:'',
        workPlace:'',
        salary: '',
        number: '',
        education: '',
        experience: '',
        contacts: '',
        phone: '',
        post1: '',
        post2: '',
        post3: '',
        post4: '',
        post5: '',
        req1: '',
        req2: '',
        req3: '',
        req4: '',
        req5: '',
          authtoken: sessionStorage.getItem('Token'),


      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      add_OK(){
        var oQuan = document.getElementsByName('quan');
        var select = null;
        for( var  i=0;i<oQuan.length; i++){
          if( oQuan[i].checked ){
            select = oQuan[i].value;
          }
        }
        console.log('select: '+select);
        if( this.position == '' || this.companyName == '' || this.workPlace == '' || this.salary == ''||
            this.number == '' || this.post1 == '' || this.req1 == ''){
          alert('请填写完整信息！');
          return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icprecruitment/save',
          method: 'post',
          data: {
            position: this.position,
            companyName: this.companyName,
            workPlace: this.workPlace,
            salary: this.salary,
            theNumberOf: this.number,
            fullTime: select,
            education: this.education,
            experience: this.experience,
            contacts: this.contacts,
            phone: this.phone,
            postResponsibility1: this.post1,
            postResponsibility2: this.post2,
            postResponsibility3: this.post3,
            postResponsibility4: this.post4,
            postResponsibility5: this.post5,
            jobRequirements1: this.req1,
            jobRequirements2: this.req2,
            jobRequirements3: this.req3,
            jobRequirements4: this.req4,
            jobRequirements5: this.req5,
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) => {
          alert('新增招聘信息成功！');
          this.$router.push({name: 'recruit_manager'});
        }).catch( (res) => {
          this.$message.error('新增招聘信息失败！');
        });

      },
      add_Ret(){
        this.$router.push({name: 'recruit_manager'});
      }
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

  .text_1{
    display:inline-block;
    width:150px;
    height:40px;
    /*border: 1px solid #000;*/
    font-size:18px;
    font-weight:bold;
  }
  .text_2{
    display: inline-block;
    width:120px;
    height:30px;
    /*border: 1px solid #000;*/
    font-size: 16px;
    font-weight: 300;

  }
  .input_1{
    width: 200px;
    height:25px;
    border:1px solid #a8a8a8;
    border-radius:5px;

  }
  .input_2{
    width:100px;
    height:20px;
    border: 1px solid #a8a8a8;
    border-radius:5px;
  }

  .col{
    height:30px;
    margin-top:10px;
    /*border:1px solid #000;*/
    font-size: 14px;
    color: #939999;
  }
  .input_3{
    width:450px;
    height: 25px;
    border: 1px solid #a8a8a8;
    border-radius:3px;
    margin-left:30px;
  }
  /************************************/

  .content_data{
    width: 900px;
    height: 500px;
    padding-top:20px;
    /*border:1px solid #000;*/

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
    color:red;
  }
  /************************************/
  .recruit_manager{
    padding-top: 50px;
    height: 100%;
    width: 100%;
    font-size: 0;
    /*border: 1px solid #000;*/
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
 /* .content_data{
    width:800px;
    !*border:1px solid #000;*!
  }
  .recruit_1{
    display: inline-block;
    width:150px;
    height:100px;
    margin-top:10px;
    margin-left:30px;
    padding-top:10px;
    !*border:1px solid red;*!
    float: left;
  }
  .txt,.Input{
    display: inline-block;
    height: 40px;
    width:150px;
    line-height:40px;
    text-align: center;
    padding-left:10px;
    font-size:18px;
  }
  .input_style{
    width: 100px;
    height:30px;
    border-radius:5px;
    border:1px solid rgb(19,206,211);
  }
  .span{
    display: inline-block;
    height: 20px;
    width:150px;
    line-height:20px;
    text-align: center;
    padding-left:10px;
    font-size:14px;
    color:rgb(66,189,251) ;
  }
  .recruit_2{
    display: inline-block;
    width:700px;
    height: 300px;
    margin-top:10px;
    margin-left:30px;
    !*border: 1px solid #000;*!
    float: left;
  }
  .txt2{
    display: inline-block;
    height: 300px;
    width:150px;
    line-height:300px;
    text-align: center;
    padding-left:10px;
    !*border:1px solid #000;*!
    float: left;
    font-size: 18px;
  }
  .Input2{
    display: inline-block;
    height: 300px;
    width:500px;
    line-height:300px;
    text-align: left;
    padding-left:10px;
    !*border:1px solid #000;*!
    float: left;
  }
  .input2_style{
    width:500px;
    height:300px;
    border-radius:5px;
    border:1px solid rgb(19,206,211);
  }
  .button{
    display: inline-block;
    width:700px;
    height: 100px;
    line-height:100px;
    margin-top:100px;
    margin-left:30px;
    !*border: 1px solid #000;*!
    float: left;
  }
  .add_OK,.add_Return{
    width: 150px;
    height: 40px;
  }
  .add_OK{
    background: rgb(66,189,251);
    border-radius: 5px;
    border:1px solid rgb(66,189,251);
    margin-left:50px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
  }
  .add_Return{
    background: rgb(185,185,185);
    border-radius: 5px;
    border:1px solid rgb(185,185,185);
    margin-left:200px;
    font-size:20px;
    color: rgb(113,113,113);
    cursor: pointer;

  }
*/

</style>
