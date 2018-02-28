<template>
  <div class="zixunList">
    <v-banner></v-banner>
    <v-header></v-header>
    <div class="content">
      <div class="content_data" >
        <div class="data_title">
          <span class="title_1" :class="{active1: isActive1}" @click="updateData(1)">药品资讯</span><span @click="updateData(2)" class="title_1" :class="{active1: isActive2}">行业资讯</span>
        </div>
        <div class="data_body">
          <el-table :data="tableData" style="width: 90%;">
            <el-table-column  width="360px" label="标题">
              <template scope="scope">
              <span >{{title[scope.$index]}}</span>
              </template></el-table-column>
            <el-table-column prop="author" label="作者" class="textt"></el-table-column>
            <!--<el-table-column prop="content" width="300px" label="内容" class="textt"></el-table-column>-->
            <el-table-column prop="source" label="来源"></el-table-column>
            <el-table-column prop="releaseTime" width="118px" label="发布时间"></el-table-column>
            <el-table-column prop="name" label="创建者"></el-table-column>
            <el-table-column >
              <template scope="scope">
                <span class="sc1" @click="more(scope.$index)">查看详情</span>
              </template>
            </el-table-column>
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

      <el-dialog :visible.sync="dialogVisible" >
        <el-card>
          <div slot="header" style="height: 40px;text-align:left;" >
            <span class="card_title">资讯详细</span>
          </div>
          <div class="detail_head">
            <div class="head_title">{{this.detailData.title}}</div>
            <div class="head_part">
              <span class="font_1">{{this.detailData.author}}</span>&nbsp;|&nbsp;<span class="font_2">{{ this.detailData.type == 1?'药品资讯' :'行业资讯'}}</span>&nbsp;|&nbsp;<span class="font_2">{{this.detailData.releaseTime}}</span>
            </div>
          </div>
          <div class="detail_body">
            <div class="body_title">内容</div>
            <div class="body_part">
              {{this.detailData.content}}
            </div>
          </div>
        </el-card>
        <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="change">确 定</el-button>
         </span>-->
      </el-dialog>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import banner from './banner'
  import header from './header'
  import footer from './footer'
  export default{
    name: 'zixunList',
    data() {
      return{
        tableData1:[],
        tableData2:[],
        tableData:[],
        detailData: '',
        isActive1: true,
        isActive2: false,
        dialogVisible: false,
        total: '',
        pages: '',
        page: 1,
        pageSize: 8,
        Tpage: 1,
        update_type:1,
        title:[],
      };
    },
    methods:{

      more(index){
        this.dialogVisible = true;
        this.detailData = this.tableData[index];
//        console.log(this.detailData);

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
      getData(v_type,v_page, v_pageSize) {
        var oUrl = '';
        oUrl = this.GLOBAL.url+'/app/api/information/findInformationList?page=' + v_page + '&pageSize='
            + v_pageSize+'&type='+v_type;
        this.$ajax({
          url: oUrl,
          method: 'get',
        }).then((res) => {
          this.tableData = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
          for( var i = 0;i<this.tableData.length;i++){
            var str = this.tableData[i].title;
            if(str.length > 30){
              str=str.substring(0,30)+'...';
            }
            this.title[i]=str;
          }
        }).catch((res) => {
//        this.$router.push('../admin_login');
          this.$message.error('网络错误！');
        })
      },
      returnRecruit(){
        this.dialogVisible = false;
        this.detailData = '';
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
    created(){
      sessionStorage.setItem('tag',6);
      if(this.$route.params.id == 1){
        this.updateData(1);
      }else if( this.$route.params.id == 2 ){
        this.updateData(2);
      }
//      this.getData(this.update_type,this.page,this.pageSize);

    },
    watch:{
      page() {
        this.getData(this.update_type,this.page,this.pageSize);

      }
    },
    components: {
      'v-banner':banner,
      'v-header':header,
      'v-footer':footer,
    }
  }
</script>

<style scoped>
  .zixunList{
    margin:0 auto;
    width:1340px;
    /*border:1px solid #000;*/
  }
  .content{
    width:100%;
    /*height:700px;*/
    /*border:1px solid #000;*/
    margin-top: 50px;
    margin-bottom:150px;
  }

  .content_data{
    margin-left:100px;
    /*height:700px;*/
    /*border:1px solid #000;*/
    text-align: left;
    position:relative;
  }
  .data_title{
    height: 50px;
    /*border:1px solid #000;*/
  }
  .title_1{
    display: inline-block;
    width:150px;
    font-size:25px;
    line-height:50px;
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
    /*width:900px;*/
    width:100%;
    /*border:1px solid #000;*
    /*border:1px solid #000;*/
    font-size:13px;
    margin-top:10px;
  }
  .sc1{
    color: #30d66a;
    cursor:pointer;
  }


  /**********************************/
  .card_title{
    text-align: left;
    color: rgb(1,1,95);
    display: inline-block;
    height:40px;
    font-size: 20px;
  }
  .detail_head{
    width: 90%;
    height:100px;
    /*border:1px solid #000;*/
    text-align: left;
    padding-left: 10px;
  }

  .head_title{
    color:#000;
    font-size:18px;
    font-weight: bold;
  }
  .head_part{
    margin-top:10px;
    font-size:13px;
  }
  .font_1{
    color: #ff6820;
    margin-right:10px;
  }
  .font_2{
    color:#6e6e6e;
    margin: 0 10px;
  }

  .detail_body{
    width: 90%;
    padding-left:10px;
    margin-bottom:30px;
    /*border:1px solid #000;*/
    text-align: left;
    margin-top: 20px;
  }
  .body_title{
    color:#000;
    font-size:14px;
    font-weight: bold;
    margin-bottom:20px;
  }
  .body_part{
    width:85%;
    /*border: 1px solid #000;*/
    border-left:1px solid #a8a8a8;
    padding:10px 10px 10px 20px;
  }
  .detail_5{
    display: inline-block;
    width:100px;
    height: 30px;
    line-height: 30px;
    float: right;
    background: rgb(1,1,95);
    color:#fff;
    font-size:14px;
    position: relative;
    bottom:0px;
    right:10px;
    cursor: pointer;
    margin-bottom: 30px;
  }


  /*************************/
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
