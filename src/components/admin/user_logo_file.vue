<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="userfile_manager">
    <div class="title">
      <span class="list">用户日志</span>
    </div>
    <div class="content">
      <div class="search">
        <span class="search_text">搜索关键字：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入用户账号,20字符内">
        <button class="btn" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>
      </div>
      <div class="content_data">
        <div class="content_title">
          <span class="total">用户ID</span>
          <span class="total">用户账号</span>
          <span class="total">用户真实姓名</span>
          <span class="total">登陆次数</span>
          <span class="total">最后登录时间</span>
          <span class="total">用户IP</span>
        </div>
        <div class="search_notice" v-if="content == '' || content == null">
          <span>*没有搜索到相关信息，请重新搜索！</span>
        </div>
        <div class="file_one" v-for="item in content">
          <span class="total">{{ item.userId }}</span>
          <span class="total">{{ item.userName }}</span>
          <span class="total">{{ item.realName }}</span>
          <span class="total">{{ item.loginCount }}</span>
          <span class="total">{{ item.lastLoginTime }}</span>
          <span class="total">{{ item.loginIp }}</span>
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
    </div>
  </div>
  </div>
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  import adminmain from './admin_main'
  
  export default{
    name: 'user_logo_file',
    data() {
      return{
        returnShow: false,
        content: [],
        total: '',
        pages: '',
        page: 1,
        pageSize: 10,
        Tpage: 1,
        searchShow: false,
        searchName: '',
          authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      getData(v_page, v_pageSize, v_searchname) {
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpcommon/findUserLogIcp?page=' + v_page
          + '&pageSize=' + v_pageSize + '&name='+v_searchname ,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then((res) => {
          this.content = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
        }).catch((res) => {
//          alert('fail');
          this.$message.error('网络错误！');
        });
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
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
          return;
        }
        this.textNumber1(oSearchname);
        this.searchName = oSearchname.value;
        this.page =1;
        this.getData(this.page,this.pageSize,this.searchName);
        this.returnShow = true;
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
        this.getData(this.page,this.pageSize,this.searchName);
      }
    },
    created() {
      this.getData(this.page , this.pageSize,this.searchName );
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

  .userfile_manager{
    padding-top: 50px;
    height: 100%;
    width: 100%;
    font-size: 0;
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

  .btn {
    height: 35px;
    width: 80px;
    color: #fff;
    cursor: pointer;
    /*border:1px solid rgb(66,189,251);*/
    border: 0;
    border-radius: 5px;
    background:rgb(153,153,153);
  }
  .btn:hover{
    background:rgb(120,120,120) ;
  }
  .search_notice{
    color: red;
    font-size:18px;
    margin-top: 20px;
  }
  .content_data {
    margin: 50px 10px 0 10px;
    height: 700px;
    /*border:1px solid #000;*/
    text-align: center;
    position: relative;
  }
  .content_title{
    height: 40px;
    line-height: 40px;
    background:rgba(61,158,158,0.4);
    font-size: 16px;
    font-weight: bold;
    color: #000;
    border-top:1px solid #000;
  }
  .total{
    display: inline-block;
    width:130px;
    /*border: 1px solid #000;*/
    padding-left:10px;
  }
  .file_one{
    height: 30px;
    line-height: 30px;
    /*background:rgba(153,153,153,0.4);*/
    font-size: 14px;
    color: rgb(153,153,153);
    margin:10px 0;
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
</style>
