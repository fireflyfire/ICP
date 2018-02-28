<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="zixun_add">
    <div class="title">
      <span class="list">添加资讯信息</span>
    </div>
    <div class="content">
      <div class="content_data" style="text-align: left;">
        <el-row style="text-align:left;">
          <el-col :span="24">
            <span class="title_z">标题：</span>
            <input type="text" v-model="ztitle" class="input_1">
          </el-col>

          <el-col :span="12">
            <span class="title_z">类型：</span>
            <select v-model="ztype">
              <option value="1">药品资讯</option>
              <option value="2">行业资讯</option>
            </select>
          </el-col>
          <el-col :span="12">
            <span class="title_z">发布时间：</span>
            <input type="date" v-model="ztime" class="input_1">
          </el-col>
          <el-col :span="12" >
            <span class="title_z">作者： </span>
            <input type="text" v-model="zauthor" class="input_1">
          </el-col>
          <el-col :span="12">
            <span class="title_z">来源：</span>
            <input type="text" v-model="zsource" class="input_1">
          </el-col>
          <el-col :span="24">
            <span class="title_c">内容：(500字符内)</span>
          </el-col>
          <el-col :span="24">
            <textarea class="textarea_c" type="text" v-model="zcontent"></textarea>
          </el-col>
        </el-row>
      </div>

      <div class="btn">
        <button @click="add_OK()" class="add_btn">保存</button>
        <button @click="add_Ret()" class="add_return">返回</button>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
  // var Username = sessionStorage.getItem('Username');
  // var authtoken = sessionStorage.getItem('Token');
  import adminmain from './admin_main'
  
  export default{
    name: 'zixun_add',
    data() {
      return{
//        zid: '',
        ztitle: '',
        zauthor: '',
        ztype: 1,
        ztime: '',
        zsource:'',
        zcontent: '',
        Username: sessionStorage.getItem('Username'),
        authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      textNumber1(text){
        if(text.length>20) {
          alert('输入太长，超出限制！');
          return;
        }
      },
      textNumber2(text){
        if(text.length>500) {
          alert('输入太长，超出限制！');
          return;
        }
      },
      add_OK(){
        if( this.ztitle == '' || this.ztype == '' || this.ztime == '' ||
          this.zsource == '' || this.zcontent == ''){
          alert('请填写完整信息！');
          return;
        }
        this.textNumber2(this.zcontent);
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/information/save',
          method: 'post',
          data: {
            title: this.ztitle,
            author: this.zauthor,
            type: this.ztype,
            source: this.zsource,
            content: this.zcontent,
            name: this.Username,
            releaseTime: this.ztime,
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) => {
          alert('新增资讯信息成功！');
          this.$router.push({name:'zixun_manager'});
        }).catch( (res) => {
//          alert('fail');
          this.$message.error('新增资讯信息失败！');
        });

      },
      add_Ret(){
        this.$router.push({name: 'zixun_manager'});
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
  .title_z{
    display: inline-block;
    height:30px;
    font-size:16px;
    font-weight:bold;
    color: #000;
  }
  .input_1{
    border:1px solid #b9b9b9;
    width: 200px;
    height:20px;
    border-radius: 3px;
  }

  .title_c{
    display: inline-block;
    font-size: 16px;
    color:#000;
    font-weight:bold;

  }
  .textarea_c{
    width:100%;
    height: 100px;
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    margin-top: 10px;
  }
  /************************************/

  .content_data{
    width: 900px;
    /*height: 500px;*/
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
  .zixun_add{
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
</style>
