<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="doctor_manager">
    <div class="title">
      <span class="list">用户列表</span>
    </div>
    <div class="content">
    <!--  <hr style="margin-top: 30px; width: 900px;border: 1px dashed rgb(153,153,153);">-->
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
          <span class="data_title_2">
            性别
          </span>
          <span class="data_title_3">
            电话
          </span>
          <span class="data_title_3">
            身份证号
          </span>
          <span class="data_title_2">
            类型
          </span>
        </div>
        <div class="data" v-for="item in content">
          <span class="doctor_img" title="头像">
            <img :src="img" width="60" v-if="item.iconUrl=='' || item.iconUrl == null">
            <img :src="item.iconUrl" width="60"  >
          </span>
          <span class="doctor_id" title="账号">
            {{ item.account}}
          </span>
          <span class="doctor_name" title="姓名">
            {{ item.realName}}
          </span>
          <span class="doctor_name" title="性别">
            {{ item.gender}}
          </span>
          <span class="number" title="电话">
            {{ item.phoneNumber}}
          </span>
          <span class="number" title="身份证号">
            {{ item.idCardNumber}}
          </span>
          <span class="doctor_name" title="类型">
            {{ item.vip==true ? '会员': '普通用户'}}
          </span>
        </div>


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
    name: 'user_manager',
    data() {
      return {
        img: require('../../assets/user.png'),
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
      getData(v_page,v_pageSize){

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/findIcpUserList?page='+v_page+'&pageSize='+v_pageSize,
          method: 'get',
          headers:{
            authToken: '',
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
    },
    watch: {
      page() {
        this.getData(this.page,this.pageSize);
      }
    },
    created() {
      this.getData(this.page,this.pageSize);
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
    width: 60px;
    height: 40px;
    line-height:40px;
  }
  .data_title_2,.data_title_3{
    display: inline-block;
    line-height:40px;
    text-align: center;
    vertical-align: top;
    width:100px;
    height:40px;
  }
  .data_title_3{
    width:150px;
  }

  .doctor_img{
    display: inline-block;
    width: 60px;
    /*height: 60px;*/
    /*line-height:60px;*/
    /*overflow: hidden;*/
    /*background: url('../../assets/user.png');*/
    background-size:60px 60px;
  }
  .doctor_id,.doctor_name,.number{
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
  .number{
    width:150px;
    height: 60px;
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
