<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="key_manager">
    <div class="title">
      <span class="list">关键词</span>
    </div>
    <div class="content">
      <div class="search">
        <span class="search_text">搜索关键字：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入搜索关键字,10字符内">
        <button class="btn" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>
        <input type="text" class="key_add" name="key_add" id="key_add"
               placeholder="请输入关键词,10字符内">
        <span class="add_btn" @click="addKey()">+添加关键词</span>
      </div>

      <div class="content_data">
        <div class="search_notice" v-if="content == '' || content == null">
          <span>*没有搜索到相关信息，请重新搜索！</span>
        </div>
        <div class="key_one" v-for="item in content">
          <span class="key_word" @click="Show(item)">{{ item.keyWord }}</span>
          <div class="show_key" :id="item.id">
            <span class="key_name">
              <span>添加人：</span>
              <span>{{ item.name }}</span>
            </span>
            <span class="key_time">
              <span>添加时间：</span>
              <span>{{ item.createTime }}</span>
            </span>
            <span class="button">
              <button class="btn_update" @click="update_key(item)">修改</button>
              <button class="btn_delete" @click="delete_key(item)">删除</button>
            </span>
          </div>
        </div>

        <el-dialog title="修改关键词" :visible.sync="isShow1" size="tiny">
          <el-row style="width:100%">
            <el-col :span="24">
              <input class="Input" style="border: 1px solid #282828;" name="keyword" id="keyword" type="text" :value="update_data.keyWord" placeholder="10字符内">
            </el-col>
            <el-col :span="24">
              <span class="span" v-show="isShow2">*请输入关键词</span>
            </el-col>
            <el-col :span="24">
              <span class="update_button">
                <button class="update_ok" @click="update_ok()">确认修改</button>
                <button class="update_return" @click="update_return()">返回</button>
              </span>
            </el-col>
          </el-row>

        </el-dialog>
       <!-- <el-dialog :visible.sync="isShow1" size="tiny" >
          <span class="update_title">修改关键词</span>
          <span class="update_input">
            <input class="Input" name="keyword" id="keyword" type="text" :value="update_data.keyWord">
          </span>
          <span class="span" v-show="isShow2">*请输入关键词</span>
          <span class="update_button">
            <button class="update_ok" @click="update_ok()">确认修改</button>
            <button class="update_return" @click="update_return()">返回</button>
          </span>
        </el-dialog>-->
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
    name: 'key_manager',
    data() {
      return{
        content: [],
        total: '',
        pages: '',
        page: 1,
        pageSize: 10,
        Tpage: 1,
        username : sessionStorage.getItem('Username'),
        update_data: [],
        isShow1: false,
        isShow2: false,
        searchShow: false,
        searchName: '',
        returnShow: false,
          authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods:{
      getData(v_page, v_pageSize,v_searchname) {
        var oUrl = '';
        if(v_searchname == ''){
          oUrl = this.GLOBAL.url+'/app/api/icpkeywords/findKeyWordList?page=' + v_page + '&pageSize='
            + v_pageSize;
        }else{
          oUrl = this.GLOBAL.url+'/app/api/icpkeywords/findKeyWordList?page=' + v_page + '&pageSize='
            + v_pageSize +'&name='+ v_searchname;
        }
        this.$ajax({
          url: oUrl ,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then((res) => {
          this.content = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
        }).catch((res) => {
          // alert('数据错误！');
          this.$message.error('网络错误！');

//        this.$router.push('../admin_login');
        })
      },
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
          return;
        }
        if(oSearchname.value.length>10) {
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
      addKey(){
        var keyWord = document.getElementById('key_add');
        if( keyWord.value == ''){
          alert('关键词不能为空！');
          return;
        }
        if(keyWord.value.length>10) {
          alert('输入太长，超出限制！');
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpkeywords/save',
          method: 'post',
          data: {
            keyWord: keyWord.value,
            /* name: this.username,*/
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) => {
          alert('添加关键词成功！');
           keyWord.value = '';
          this.getData(this.page, this.pageSize,this.searchName);
//          this.$router.go(0);

        }).catch( (res) => {
          alert('fail'+res);
        })
      },
      Show(item){
        var oDiv = document.getElementById( item.id );
        if(oDiv.style.display == ''){
          oDiv.style.display = 'block';
        }else if (oDiv.style.display == 'block'){
          oDiv.style.display = 'none';
        }else if(oDiv.style.display == 'none'){
          oDiv.style.display = 'block';
        }

      },
      show_del(){
       var oDiv = document.getElementsByClassName('show_key');
       for( var i = 0;i<oDiv.length;i++){
         oDiv[i].style.display = 'none';
       }
      },
      update_key(item){
        this.update_data = item;
        this.isShow1 = true;
      },
      delete_key(item){
        if(confirm('你确定要删除此关键词吗?')){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icpkeywords/delete?id='+item.id,
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then( (res) => {
            alert("关键词删除成功！");
            // this.$router.push({name: 'key_manager'});
            this.$router.go(0);
          }).catch( (res) => {
//            alert("关键词删除失败！"+res);
            this.$message.error('关键词删除失败！');
          })
        }else{
        }
      },
      update_ok(){
        var oKey = document.getElementById('keyword');
        if( oKey.value == ''){
          this.isShow2 = true;
          return;
        }
        if(oKey.value.length>10){
          alert('输入太长，超出限制');
          return;

        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpkeywords/update',
          method: 'post',
          data: {
            id: this.update_data.id,
            keyWord: oKey.value,
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          alert('修改关键词成功！');
          this.isShow1 = false;
          this.isShow2 = false;
          this.page = 1;
          this.getData(this.page, this.pageSize,this.searchName);
//          this.$router.go(0);
        }).catch( (res) => {
//          alert('修改关键词失败！'+res);
          this.$message.error('修改关键词失败！');
        })
      },
      update_return(){
        this.isShow1 = false;
        this.isShow2 = false;
      }
    },
    watch: {
      page() {
        this.show_del();
        this.getData(this.page, this.pageSize,this.searchName);
      }
    },
    created() {
      this.getData(this.page, this.pageSize,this.searchName);
    },
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
  .key_manager{
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
  .key_add{
    width:200px;
    height:30px;
    border:1px solid rgb(66, 189, 251);
    border-radius:5px;
    margin-right:10px;
    margin-left: 40px;
  }
  .add_btn{
    display: inline-block;
    height: 30px;
    width: 100px;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
    /*border:1px solid rgb(66,189,251);*/
    border: 0;
    border-radius: 5px;
    background: rgb(66,189,251);
    margin-left: 10px;
  }
  .content_data {
    margin: 50px 10px 0 10px;
    height: 700px;
    border-top:2px solid rgb(153,153,153);
    text-align: center;
    position: relative;
  }
  .key_one{
    width:150px;
    height:150px;
    /*border: 1px solid #000;*/
    float: left;
    margin:20px 0 0 20px;
  }
  .key_word{
    display: inline-block;
    width:100px;
    height:40px;
    line-height:20px;
    background: rgba(255,255,255,0);
    /*border-radius: 30px;*/
    /*border:1px solid #b9b9b9;*/
    color:#8c939d;
    font-size: 16px;
    cursor: pointer;
    text-align:left;
  }
  .key_word:hover{
    /*background:#6e6e6e;*/
    /*color:#fff;*/
    color:#2e3e4e;
  }
  .show_key{
    width:150px;
    height:100px;
    background: rgba(51,51,51,0.2);
    margin-top:10px;
    border-radius:5px;
    font-size: 12px;
    color: #000;
    display: none;
  }
  .key_name,.key_time{
    display: inline-block;
    width:130px;
    height:30px;
    line-height:30px;
    text-align: left;
    padding-left: 20px;
  }
  .button{
    display: inline-block;
    width:150px;
    height:50px;
    line-height:50px;
    text-align: left;
    padding-left: 20px;
  }
  .btn_update{
    width:35px;
    height:25px;
    background: rgba(255,255,255,0);
    border:1px solid rgb(255,104,32);
    border-radius:5px;
    color: rgb(255,104,32);
    cursor: pointer;
    margin-right:30px;
  }
  .btn_update:hover{
    background: rgb(255,104,32);
    color: #fff;
  }

  .btn_delete{
    width:35px;
    height:25px;
    background: rgba(255,255,255,0);
    border:1px solid rgb(207,80,204);
    border-radius:5px;
    color: rgb(207,80,204);
    cursor: pointer;
    margin-right:30px;
  }
  .btn_delete:hover{
    background:rgb(207,80,204);
    color: #fff;
  }
  .update_show{
    position: absolute;
    top:150px;
    left:200px;
    width:300px;
    height:300px;
    border: 1px solid rgb(153,153,153);
    background: rgba(0,0,0,0.5);
    color: #fff;
    border-radius:7px;
  }
  .update_title{
    display: inline-block;
    width:300px;
    height:50px;
    line-height: 50px;
    font-size:25px;
    font-weight:bold;
    margin-top:10px;
  }
  .update_input{
    display: inline-block;
    width:300px;
    height:50px;
    line-height: 50px;
    margin-top:30px;
  }
  .Input{
    width:200px;
    height:30px;
    font-size:20px;
    border: 1px solid rgb(255,255,255);
    border-radius:5px;
  }
  .span{
    display: inline-block;
    width:300px;
    height: 30px;
    line-height:30px;
    font-size: 14px;
    color: rgb(66,189,251);
  }
  .update_button{
    display: inline-block;
    width:300px;
    height:50px;
    line-height: 50px;
    margin-top:30px;
  }
  .update_ok{
    width: 80px;
    height:30px;
    background: rgb(66,189,251);
    border:1px solid rgb(66,189,251);
    border-radius:5px;
    cursor: pointer;
    font-size:14px;
    color: #fff;

  }
  .update_return{
    width: 80px;
    height:30px;
    background: rgb(185,185,185);
    border-radius: 5px;
    border:1px solid rgb(185,185,185);
    margin-left:50px;
    font-size:14px;
    color: rgb(113,113,113);
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
</style>
