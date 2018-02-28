<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="doctor_manager">
    <div class="title">
      <span class="list">医生列表</span>
    </div>
    <div class="content">
      <div class="search">
        <span class="search_text">医生姓名：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入医生姓名,20字符内">
        <button class="btn btn1" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>
        <span class="add"><router-link :to="{name: 'doctor_add'}" class="btn add_admin">+添加</router-link></span>
      </div>
      <!--<hr style="margin-top: 30px; width: 900px;border: 1px solid rgb(153,153,153);">-->
      <div class="content_data">
        <div class="data_title" >
          <span class="data_title_1">
          </span>
          <span class="data_title_2">
            账号
          </span>
          <span class="data_title_2">
            姓名
          </span>
          <span class="data_title_3">
            个人简介
          </span>
          <span class="data_title_2" style="width:120px;">
            上一次登录时间
          </span>
        </div>
        <div class="data" v-for="item in content">
          <span class="doctor_img" title="头像">
            <img :src="img" width="60" v-if="item.iconUrl=='' || item.iconUrl == null">
            <img :src="item.iconUrl" width="60"  >
          </span>
          <span class="doctor_id" title="账号">
            {{ item.account }}
          </span>
          <span class="doctor_name" title="医生姓名">
            {{item.realName}}
          </span>
          <span class="doctor_intro" title="个人简历" >
            {{ item.introduction? item.introduction : '空'}}
          </span>
          <span class="doctor_lasttime" title="上一次登录时间">
            {{ item.lastLoginTime}}
          </span>
          <span class="doctor_deal">
            <button class="doctor_update" @click="update(item)">修改</button>
            <button class="doctor_delete" @click="delete_doctor(item)">删除</button>
          </span>
        </div>
        <div class="search_notice" v-if="content == null || content == ''">
          <span>*没有搜索到相关信息，请重新搜索！</span>
        </div>
        <el-dialog title="医生详细" :visible.sync="upShow" >
          <el-row style="text-align:left; margin-left:50px;">
            <el-col :span="24">
              <span class="title_z">登录账号：</span>
              {{ update_data.account }}
            </el-col>
            <el-col :span="24">
              <span class="title_z">新密码：</span>
              <input class="Input" type="password" id="newPsw" name="newPsw">
              <span class="span" v-show="isShow1">*请输入新密码</span>
            </el-col>

            <el-col :span="24">
              <span class="title_z">真实姓名：</span>
              <input class="Input" type="text" :value="update_data.realName" id="newName" name="newName"  placeholder="10字符内">
              <span class="span" v-show="isShow2">*请输入真实姓名</span>
            </el-col>
            <el-col :span="24">
              <span class="title_z">头像：</span>
              <input class="Input" type="file" id="newImg" name="newImg"  @change="upImg">
            </el-col>
            <el-col :span="24">
              <span class="title_z">图片预览：</span>
              <img id="goodimages" :src="update_data.iconUrl" width="100px">
            </el-col>
            <el-col :span="24" >
              <span class="title_z">个人简介： </span>
              <textarea :value="update_data.introduction"  name="newIntro" id="newIntro" cols="30" rows="5"></textarea>

            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
         <el-button @click="updateReturn()">取 消</el-button>
         <el-button type="primary" @click="updateOK()">确 定</el-button>
         </span>
        </el-dialog>
        <div class="page">
          <ul>
            <li v-if="page>1"><a @click="pageClick(0)">首页</a></li>
            <li v-if="page==1"><a class="banclick">首页</a></li>
            <li v-if="page>1"><a @click="pageClick(1)">上一页</a></li>
            <li v-if="page==1"><a class="banclick">上一页</a></li>
            <li v-if="pages<6">
          <span class="page_style" v-for="index in pages" :class="{ 'active': page == index }">
           <a @click="btnClick(index)">{{ index }}</a>
          </span>
            </li>
            <li v-else>
          <span class="page_style" :class="{ 'active': page == 1 }">
            <a @click="btnClick(1)" >1</a>
          </span>
              <span v-if="page>0 && page<4">
            <span class="page_style" :class="{ 'active': page == 2 }">
              <a @click="btnClick(2)" >2</a>
            </span>
            <span class="page_style" :class="{ 'active': page == 3 }">
              <a @click="btnClick(3)" >3</a>
            </span>
          </span>
              <span v-if="page>3">
            <span class="page_style">
            ...
            </span>
            <span v-if="page<pages-2 && page>3">
              <span class="page_style">
                <a @click="btnClick(page-1)">{{ page - 1 }}</a>
              </span>
              <span class="page_style" :class="{ 'active': page == page }">
                <a @click="btnClick(page)" >{{ page }}</a>
              </span>
              <span class="page_style">
               <a @click="btnClick(page+1)">{{ page + 1 }}</a>
              </span>
            </span>
            <span v-else>
              <span class="page_style" :class="{ 'active': page == pages-2 }">
                <a @click="btnClick(pages-2)" >{{ pages - 2 }}</a>
              </span>
              <span class="page_style" :class="{ 'active': page == pages-1 }">
                <a @click="btnClick(pages-1)" >{{ pages - 1 }}</a>
              </span>
            </span>

          </span>

              <span class="page_style" v-if="page+2<pages">
            ...
          </span>
              <span class="page_style" :class="{ 'active': page == pages }">
            <a @click="btnClick(pages)" >{{ pages }}</a>
          </span>
            </li>
            <li v-if="page!=pages"><a @click="pageClick(2)">下一页</a></li>
            <li v-if="page==pages"><a class="banclick">下一页</a></li>
            <li v-if="page!=pages"><a @click="pageClick(3)">末页</a></li>
            <li v-if="page==pages"><a class="banclick">末页</a></li>
            <li>
              <input class="input_style" type="text" v-model="Tpage">
            </li>
            <li><a @click="TpageClick(Tpage)">跳转</a></li>
            <li><a>共<i>{{ pages }}</i>页</a></li>
          </ul>

        </div>
      </div>

      <!--<hr style="margin-top: 30px; width: 900px;border: 1px dashed rgb(153,153,153);">-->

    </div>

  </div>
  </div>
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  import adminmain from './admin_main'

  export default {
    name: 'admin_manager',
    data() {
      return {
        img: require('../../assets/doctor.jpg'),
        content: [],
        total: '',
        pages: '',
        page: 1,
        pageSize: 5,
        Tpage: 1,
        upShow: false,
        isShow1: false,
        isShow2: false,
        update_data: [],
        searchShow: false,
        searchName: '',
        returnShow: false,
          authtoken: sessionStorage.getItem('Token'),
//        introShow: false,
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
        if(text.length>200) {
          alert('输入太长，超出限制！');
          return;
        }
      },
      getData(v_page,v_pageSize,v_searchname){
        var oUrl = '';
        if(v_searchname == ''){
          oUrl = this.GLOBAL.url+'/app/api/icpdoctor/findDoctorList?page=' + v_page + '&pageSize='
            + v_pageSize;
        }else{
          oUrl = this.GLOBAL.url+'/app/api/icpdoctor/findDoctorList?page=' + v_page + '&pageSize='
            + v_pageSize +'&name='+ v_searchname;
        }
        this.$ajax({
          url: oUrl ,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) => {
          this.content = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
        }).catch( (res) => {
//          alert('数据错误！');
          this.$message.error('网络错误！');
        } );
      },
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
          return;
        }
        if(oSearchname.value.length>20) {
          alert('输入太长，超出限制！');
          return;
        }
        this.searchName = oSearchname.value;
        this.page =1;
        this.returnShow =true;
        this.getData(this.page,this.pageSize,this.searchName);
        if(this.content == ''){
          this.searchShow = true;
        }else{
          this.searchShow = false;
        }

      },
      return_main(){
        this.returnShow = false;
        this.searchName = '';
        this.page =1;
        var oSearchname = document.getElementById('search_key');
        oSearchname.value = '';
        this.getData(this.page,this.pageSize,this.searchName);
      },
      update(item) {
        this.upShow = true;
        this.update_data = item;
      },
      updateOK(){
        var oNewpsw = document.getElementById('newPsw');
        var oNewname = document.getElementById('newName');
        var oNewimg = document.getElementById('newImg');
        var oNewintro = document.getElementById('newIntro');

        var newImg = document.getElementById('goodimages');
        var img = newImg.src;
        /* 去除字符串  */
        var ss=img.split('base64,');
        var r = ss[1];
         if(oNewpsw.value == ''){
           this.isShow1 =true;
           return;
         }else{
           this.isShow1 =false;
         }
        if(oNewname.value ==''){
          this.isShow2 =true;
          return;
        }else{
          this.isShow2 =false;
        }
        if(oNewname.value.length>10) {
          alert('姓名输入太长，超出限制！');
          return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpdoctor/update',
          method: 'post',
          data: {
            id: this.update_data.id,
            account: this.update_data.account,
            password: oNewpsw.value,
            realName: oNewname.value,
            iconUrl: r,
            introduction: oNewintro.value,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) => {
          /*var status=res.data.status;
          alert(status);*/
          alert('修改医生信息成功！');
          this.upShow=false;
          // this.getData(this.page,this.pageSize,this.searchName);
          this.$router.go(0);
          // this.$router.push({name: 'doctor_manager'});
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('修改医生信息失败！');
        })


      },
      upImg(file){
        var reader = new FileReader();
        reader.onload = function(e){
          var oGoodimages = document.getElementById('goodimages');
          oGoodimages.src = e.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      },
      updateReturn(){
        this.upShow=false;
        this.isShow1=false;
        this.isShow2=false;

        var oNewimg = document.getElementById('newImg');
        var oGoodimages = document.getElementById('goodimages');
        oGoodimages.src = this.update_data.iconUrl;
        oNewimg.value = '';
        this.$router.push({name: 'doctor_manager'});
      },
      pageClick(v) {
        if (v == 0) {
          this.page = 1;
        }
        if (v == 1) {
          this.page--;
        }
        if (v == 2) {
          this.page++;
        }
        if (v == 3) {
          this.page = this.pages;
        }
      },
      btnClick(v_page) {
        var page = parseInt(v_page);
        if (page != this.page) {
          this.page = page;
        }
      },
      TpageClick(Tpage){
        var page = parseInt(Tpage);
        if(page > this.pages || page < 1){
          alert('超出页码范围！');
          return;
        }
        this.btnClick(page);

      },
      delete_doctor(item){
        if(confirm('你确定要删除此医生信息吗?')){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icpdoctor/delete?id='+item.id,
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then( (res) => {
            alert("医生信息删除成功！");
            this.$router.go(0);
            // this.$router.push({name: 'doctor_manager'});
          }).catch( (res) => {
//            alert("医生删除失败！"+res);
            this.$message.error('删除失败！');
          })

        }else{

        }

      }
    },
    watch: {
      page() {
        this.getData(this.page,this.pageSize,this.searchName);
      }
    },
    created() {
      this.getData(this.page,this.pageSize,this.searchName);
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
  .doctor_manager {
    /*border:1px solid #000;*/
    padding-top: 50px;
    height: 100%;
    width: 100%;
    font-size: 0;
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
  }

  .search {
    /*float: left;*/
    height: 40px;
    width: 900px;
    line-height: 40px;
    margin-left: 10px;
    text-align:left;

  }

  .search_text {
    font-size: 15px;
    color: #000;
    margin-left:10px;
  }

  .search_input {
    height: 35px;
    border: 1px solid rgba(146, 146, 146, 0.4);
    border-radius: 5px;
    margin-right: 30px;
  }
  .add{
    display:inline-block;
    width:100px;
    height:35px;
    line-height:35px;
    color:#fff;
    background: rgb(66, 189, 251);
    border: 1px solid rgb(66, 189, 251);
    border-radius: 5px;
    text-align: center;
    margin-left: 100px;
  }
  .btn {
    height: 35px;
    width: 80px;
    color: #fff;
    cursor: pointer;
    /*border:1px solid rgb(66,189,251);*/
    border: 0;
    border-radius: 5px;

  }
  .btn1{
    background:rgb(153,153,153);
  }
  .add_admin {
    line-height: 35px;
    margin-left: 10px;
    color: #fff;
    cursor: pointer;

  }
  .search_notice{
    color: red;
    font-size:18px;
  }
  .return_main{
    height: 35px;
    width: 80px;
    color: #fff;
    cursor: pointer;
    /*border:1px solid rgb(66,189,251);*/
    border: 0;
    border-radius: 5px;
    background:rgb(168,168,168);
    margin-left:10px;
  }
  .content_data {
    margin: 50px 10px 0 10px;
    height:500px;
    /*border:1px solid #000;*/
    text-align: left;
    position:relative;
  }
  .data{
    /*height:60px;*/
    /*line-height:60px;*/
    width:850px;
    margin-bottom: 20px;
    /*border:1px solid #000;*/
    font-size:13px;
    color: rgb(153,153,153);
  }

  .data_title{
    height:40px;
    line-height:40px;
    width:850px;
    margin-bottom: 20px;
    /*border:1px solid #000;*/
    font-size:16px;
    color: #000;
    background:rgba(173, 173, 173, 0.3);
  }
  .data_title_1{
    display: inline-block;
    width:60px;;
    height: 40px;
    line-height:40px;
  }
  .data_title_2,.data_title_3,.data_title_4{
    display: inline-block;
    line-height:40px;
    text-align: center;
    vertical-align: top;
    width:100px;
    height:40px;
  }
  .data_title_3{
    width:250px;
  }
  .data_title_4{
    width:200px;
  }
  .doctor_img{
    display: inline-block;
    width: 60px;
    /*height: 60px;*/
    /*line-height:60px;*/
    /*background: url('../../assets/doctor.jpg');*/
    background-size:60px 60px;
  }
  .doctor_id,.doctor_name,.doctor_intro,.doctor_lasttime,.doctor_deal,.doctor_update,.doctor_delete{
    display: inline-block;
    line-height:60px;
    text-align: center;
    vertical-align: top;
    /*border:1px solid #000;*/
  }
  .doctor_id,.doctor_name,.doctor_lasttime{
    width:100px;
    height: 60px;
  }
  .doctor_name{

  }
  .doctor_intro{
    width:250px;
    height: 60px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .doctor_lasttime{

  }
  .doctor_deal{
    width:200px;
  }
  .doctor_update{
    width: 40px;
    height: 25px;
    line-height: 25px;
    background: rgba(255,255,255,0);
    color: red;
    border:1px solid red;
    border-radius:6px;
    vertical-align: middle;
    cursor: pointer;
  }
  .doctor_update:hover{
    color: #fff;
    background: red;
  }
  .doctor_delete{
    width: 40px;
    height: 25px;
    line-height: 25px;
    margin-left:30px;
    background: rgba(255,255,255,0);
    color: orange;
    border:1px solid orange;
    border-radius:6px;
    vertical-align: middle;
    cursor: pointer;
  }
  .doctor_delete:hover{
    color: #fff;
    background: orange;
  }
  .update_intro {
    display: inline-block;
    width: 500px;
    height: 500px;
    position: absolute;
    border: 1px solid rgb(200,200,200);
    border-radius: 8px;
    top: 100px;
    left: 100px;
    z-index: 100;
    padding-top:50px;
    padding-left:80px;
    background:rgba(125,125,125,0.8);
  }

  .ud{
    height:40px;
    line-height: 40px;
    margin-top: 20px;
    font-size: 20px;
    color: #fff;
  }
  .ud_1{
    height:40px;
    line-height: 40px;
    margin-top:80px;
    font-size: 20px;
    color: #fff;
  }
  .Input{
    height:30px;
    width:200px;
    line-height:30px;
  }

  .txt{
    display: inline-block;
    font-weight:bold;
    width:150px;
    text-align: left;
  }
  .update_OK{
    width:100px;
    height:40px;
    background: rgb(66,189,251);
    border-radius:5px;
    border:0;
    margin-left:30px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .update_return{
    width:100px;
    height:40px;
    background: rgba(255,255,255,0.5);
    border-radius:5px;
    border:0;
    margin-left:130px;
    color: rgb(153,153,153);
    font-size: 16px;
    cursor: pointer;
  }
  .page {
    float: right;
    margin-top: 50px;
    margin-right: 50px;
    width: 100%;
    height: 60px;

  }

  ul {
    margin: 0;
    padding: 0;
    float: right;
  }

  li {
    margin: 0;
    padding: 0;
    list-style: none;
    float: left;
  }

  .page a {
    font-size: 12px;
    color: rgb(130, 130, 130);
    padding: 5px 8px;
    border: 1px solid rgb(165, 165, 165);
  }

  .page a:hover {
    color: rgb(50, 168, 231);
    cursor: pointer;
  }

  .page a.banclick {
    cursor: not-allowed;
    color: rgb(130, 130, 130);
  }

  .page .active a {
    color: #fff;
    background: rgb(50, 168, 231);
  }

  .page i {
    font-size: 12px;
    color: #d44950;
    margin: 0 4px;

  }

  .page_style {
    display: inline-block;
    width: 30px;
    height: 25px;
    float: left;
    /*border:1px solid #000;*/
    /*margin:0 5px;*/
  }
  .input_style{
    width:35px;
    height:25px;
    line-height:25px;
    border: 1px solid rgb(153,153,153);
    margin-top: -10px;
    margin-left: 5px;
    margin-right:5px;
    background: rgba(153,153,153,0.4);
  }

  .span{
    display: inline-block;
    font-size:14px;
    font-weight:200;
    color:red;
    margin-left:30px;
  }
  .title_z{
    display: inline-block;
    height:30px;
    font-size:16px;
    font-weight:bold;
    color: #000;
    margin:10px 0;
  }
</style>
