<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="zixun_manager">
    <div class="title">
      <span class="list">资讯管理</span>
    </div>
    <div class="content">
      <div class="search">
        <!--<span class="search_text">商品关键字：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入搜索关键字">
        <button class="btn btn1" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>-->
        <span class="add"><router-link :to="{name: 'zixun_add'}" class="btn add_admin">+添加</router-link></span>
      </div>
      <div class="content_data">
        <div class="data_title">
          <span class="title_1" :class="{active1: isActive1}" @click="updateData(1)">药品资讯</span><span @click="updateData(2)" class="title_1" :class="{active1: isActive2}">行业资讯</span>
        </div>
        <div class="data_body">
          <el-table :data="tableData" style="width: 100%;font-size:10px">
            <el-table-column label="标题" width="200px"  >
              <template scope="scope">
                <span style="font-size:10px">{{xtitle[scope.$index]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="70px" ></el-table-column>
            <el-table-column label="内容" width="200px"  >
              <template scope="scope">
                <span >{{xcontent[scope.$index]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="source" label="来源" width="130px" ></el-table-column>
            <el-table-column prop="releaseTime" width="110px" label="发布时间"></el-table-column>
            <el-table-column prop="name" label="创建者" width="100px" ></el-table-column>
            <el-table-column width="120px" >
              <template scope="scope">
                <span class="sc1" style="float:left;" @click="chang(scope.$index)">修改</span>
                &nbsp;&nbsp;
                <span class="sc2" @click="Delete(scope.$index)">删除</span>
              </template>
            </el-table-column>
           <!-- <el-table-column width="70px"  >
              <template scope="scope">
                <span class="sc2" @click="Delete(scope.$index)">删除</span>
              </template>
            </el-table-column>-->
          </el-table>
        </div>
      </div>
      <div class="page" v-if="tableData !=''">
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

      <el-dialog title="资讯详细" :visible.sync="dialogVisible" >
        <el-row style="text-align:left;">
          <el-col :span="24">
            <span class="title_z">标题：</span><input type="text" v-model="ztitle" class="input_1">
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
            <span class="title_c">内容：</span>
          </el-col>
          <el-col :span="24">
            <textarea class="textarea_c" type="text" v-model="zcontent"></textarea>
          </el-col>
        </el-row>
         <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="updateOK()">确 定</el-button>
         </span>
      </el-dialog>
    </div>
  </div>
  </div>

</template>

<script>
  // var Username = sessionStorage.getItem('Username');
  // var authtoken = sessionStorage.getItem('Token');
  import adminmain from './admin_main'

  export default {
    name: 'admin_manager',
    data() {
      return {
        content: [],
        total: '',
        pages: '',
        page: 1,
        pageSize: 5,
        Tpage: 1,
        update_type:1,
        upShow: false,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        update_data: [],
        searchShow: false,
        searchName: '',
        returnShow: false,
        /*******************/
        isActive1: true,
        isActive2: false,
        dialogVisible: false,
        tableData: [],
        zid: '',
        ztitle: '',
        zauthor: '',
        ztype: '',
        ztime: '',
        zsource:'',
        zcontent: '',
        xtitle:[],
        xcontent:[],
        Username: sessionStorage.getItem('Username'),
        authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      chang(index){
        this.dialogVisible = true;
        this.zid = this.tableData[index].id;
        this.ztitle = this.tableData[index].title;
        this.zauthor = this.tableData[index].author;
        this.ztype = this.tableData[index].type;
        this.zsource = this.tableData[index].source;
        this.zcontent = this.tableData[index].content;
        this.ztime = this.tableData[index].releaseTime;
      },
      updateData(val){

        if(val == 1){
          this.isActive1 = true;
          this.isActive2 = false;
          this.update_type=1;
        }
        if( val == 2){
          this.isActive1 = false;
          this.isActive2 = true;
          this.update_type=2;
        }
        this.page =1;
        this.getData(this.update_type,this.page,this.pageSize,this.searchName);
      },
      getData(v_type,v_page, v_pageSize,v_searchname) {
        var oUrl = '';
        if(v_searchname == ''){
          oUrl = this.GLOBAL.url+'/app/api/information/findInformationList?page=' + v_page + '&pageSize='
            + v_pageSize+'&type='+v_type;
        }else{
          oUrl = this.GLOBAL.url+'/app/api/information/findInformationList?page=' + v_page + '&pageSize='
            + v_pageSize +'&name='+ v_searchname+'&type='+v_type;
        }
        this.$ajax({
          url: oUrl,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then((res) => {
          this.tableData = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
          for( var i = 0;i<this.tableData.length;i++){
            var str = this.tableData[i].title;
            if(str.length > 12){
              str=str.substring(0,12)+'...';
            }
            this.xtitle[i]=str;
          }

          for( var i = 0;i<this.tableData.length;i++){
            var str = this.tableData[i].content;
            if(str.length > 12){
              str=str.substring(0,12)+'...';
            }
            this.xcontent[i]=str;
          }

        }).catch((res) => {
//          alert('数据错误！');
//        this.$router.push('../admin_login');
          this.$message.error('网络错误！');
        })
      },
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
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
        this.getData(1,this.page,this.pageSize,this.searchName);
      },

      updateOK(){
        /*ztitle: '',
          zauthor: '',
          ztype: '',
          zsource:'',
          zcontent: '',*/
        if( this.ztitle == '' || this.ztime == '' || this.ztype == '' || this.zsource == '' || this.zcontent ==''){
          alert('请填写完整信息！');
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/information/update',
          method: 'post',
          data: {
            id: this.zid,
            title: this.ztitle,
            author: this.zauthor,
            type: this.ztype,
            content: this.zcontent,
            name: this.Username,
            releaseTime: this.ztime,
            source: this.zsource,
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          alert('资讯信息修改成功！');
          this.dialogVisible = false;
          this.updateData(1);
        }).catch( (e) =>{
//          alert('fail');
          this.$message.error('网络错误！');
        })
      },
      Delete(index){
        if(confirm('你确定要删除此资讯信息吗?')){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/information/delete?id='+this.tableData[index].id,
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then( (res) => {
            alert("资讯信息删除成功！");
            this.updateData(1);
          }).catch( (res) => {
            this.$message.error('资讯信息删除失败！');
          })
        }else{

        }
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
        this.getData(this.update_type,this.page,this.pageSize,this.searchName);

      }
    },
    created() {
      /*alert(this.page);
      getData(this.page,this.pageSize);*/
      this.getData(this.update_type,this.page,this.pageSize,this.searchName);
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
  .data_title{
    height: 40px;
    /*border:1px solid #000;*/
  }
  .title_1{
    display: inline-block;
    width:100px;
    font-size:18px;
    line-height:40px;
    /*border:1px solid #000;*/
    background: #b9b9b9;
    padding-left:10px;
    cursor: pointer;

  }

  .active1{
    background: rgb(1,1,95);
    color:#fff;
  }
  .data_body{
    width:940px;
    margin-top:30px;
    /*border:1px solid #000;*/
    font-size:13px;
  }
  .sc1{
    color: #30d66a;
    cursor:pointer;
  }
  .sc2{
    color: #32a8e7;
    cursor: pointer;
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
    height:400px;
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    margin-top: 10px;
    resize:none;
  }

  /************************************************/
  .zixun_manager{
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
    /*height: 800px;*/
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
    /*margin-left: 100px;*/
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
  .btn1:hover{
    background:rgb(120,120,120) ;
  }
  .add_admin a:hover {
    background: rgb(84, 167, 241);
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
  .content_data{
    margin: 50px 10px 0 10px;
    /*height:700px;*/
    /*border:1px solid #000;*/
    text-align: left;
    position:relative;
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

  .update_intro {
    display: inline-block;
    width: 500px;
    height: 550px;
    position: absolute;
    border: 1px solid rgb(200,200,200);
    border-radius: 8px;
    top: 50px;
    left: 100px;
    z-index: 100;
    padding-top:30px;
    padding-left:80px;
    background:rgba(125,125,125,0.8);
  }

  .ud{
    height:30px;
    line-height:30px;
    margin-top: 20px;
    font-size: 16px;
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

  .textarea_style{
    width:200px;
    height:80px;
    color:#000;
    font-size:12px;
  }
</style>
