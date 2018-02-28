<template>
  <div class="askList">
    <v-banner></v-banner>
    <v-header></v-header>
    <div class="content">
      <div class="title" style="margin-bottom:20px;">
        <a href="/askDoctor"><span class="title_text">立即提问</span></a>
      </div>
      <div class="title">
        <span class="title_text" @click="returnRecruit()">全部咨询</span>
        <span class="title_text2" v-show="isShow2">详情</span>
      </div>
      <div class="part" v-show="isShow1">
        <el-table :data="tableData" style="width: 95%;text-align:left;">
          <el-table-column prop="title" label="标题" ></el-table-column>
          <el-table-column prop="name" label="咨询者" ></el-table-column>
          <el-table-column prop="createTime" label="咨询时间"  ></el-table-column>
          <el-table-column  label="操作">
            <template scope="scope">
              <span class="more" @click="more(scope.$index)">查看详情</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page" v-show="isShow1">
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

      <div class="detail" v-show="isShow2">
        <el-row>
          <el-col >
            <el-card>
              <div slot="header" style="height: 40px;text-align:left;" >
                <span class="card_title">咨询详情</span>
              </div>
              <div class="detail_head">
                <div class="head_title">{{this.detailData.title}}</div>
                <div class="head_part">
                  <span class="font_1">{{this.detailData.name}}</span>&nbsp;|&nbsp;<span class="font_2">{{ this.detailData.createTime}}</span>
                </div>
              </div>
              <div class="detail_body">
                  <div class="body_part">
                   <span style="display:inline-block;margin: 10px auto; width:100%;" v-for="item in askDetail">
                     <span v-if="item.type==0" class="zixun_left">
                <span class="zixun_left_1">
                  <span class="zixun_left_img"><img :src="item.iconUrl" width="40px" height="40px" alt=""></span>
                  <br>
                  <span style="display: inline-block;">{{item.doctorName}}</span>

                </span>
                <span class="zixun_left_2">{{ item.content}}</span><br>
              </span>
                     <span v-if="item.type==1" class="zixun_right">
                <span class="zixun_right_1">{{ item.content}}</span>
                <span class="zixun_right_2">
                  <span class="zixun_right_img"><img :src="item.iconUrl" width="40px" height="40px" alt=""></span>
                  <br>
                  <span style="display: inline-block;">{{item.doctorName}}医生</span>
                </span>
              </span>
                  </span>
                </div>
              </div>
              <span class="detail_5" @click="returnRecruit()">返回</span>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
 /* var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');*/
  import banner from './banner'
  import header from './header'
  import footer from './footer'
  export default{
    name: 'askDoctor',
    data() {
      return{
        tableData:[],
        total: 0,
        pages: 0,
        page: 1,
        pageSize: 8,
        Tpage: 1,
        searchName: '',
        detailData:[],
        isShow1: true,
        isShow2: false,
        askDetail: [],
        userName: sessionStorage.getItem('Username'),
        userType: sessionStorage.getItem('Usertype'),
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
      };
    },
    methods: {
      more(index){
        this.detailData = this.tableData[index];
        /*********************************/
        /*****获取详情*******/
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/findAllAdvisory?id='+this.detailData.id,
          method: 'get',
        }).then( (res) =>{
          this.askDetail = res.data.onlineAdvisory;
        }).catch( (res) =>{
          this.$message.error('网络错误');
        })
//        console.log('deteil'+this.askDetail);
        this.isShow1 = false;
        this.isShow2 = true;

      },
      returnRecruit(){
        this.isShow1 = true;
        this.isShow2 = false;
      },
      getData(v_page, v_pageSize) {
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/advisory?'
          +'&page='+v_page+'&pageSize='+v_pageSize,
          method: 'get',

        }).then( (res) =>{
//          alert('success');
          this.tableData = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
        }).catch( (res) =>{
//            alert('fail'+res);
        })
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
        this.getData(this.page, this.pageSize);
      }
    },
    created(){
      sessionStorage.setItem('tag',2);
      this.getData(this.page, this.pageSize);
    },
    components: {
      'v-banner':banner,
      'v-header':header,
      'v-footer':footer,
    }
  }
</script>

<style scoped>

  .zixun_left{
    display:inline-block;
    width:100%;
    /*border:1px solid #000;*/
    text-align:left;
    line-height:25px;


  }
  .zixun_right{
    display:inline-block;
    width:100%;
    /*border:1px solid #000;*/
    text-align:right;
    line-height:25px;
  }

  .zixun_left_1{
    display:inline-block;
    color:#000;
    width:15%;
    /*border:1px solid #000;*/
    font-size:12px;

  }
  .zixun_left_2{
    display:inline-block;
    width:70%;
    background: rgba(210,210,210,0.7);
    border-radius:5px;
    margin:0;
    padding:10px;
    color:#000;
    vertical-align:top;
    margin-top:10px;
  }
  .zixun_right_1{
    display:inline-block;
    width:70%;
    text-align:left;
    background:rgba(150,150,150,0.7);
    border-radius:5px;
    margin:0;
    padding:10px;
    color:#000;
    vertical-align:top;
    margin-top:10px;
  }
  .zixun_right_2{
    display:inline-block;
    color:#000;
    width:15%;
    /*border:1px solid #000;*/
    font-size:12px;
  }


  .zixun_left_img{
    width: 40px;
    height: 40px;
    display: inline-block;
    border:0;
    margin-top:10px;
    background: url('../../assets/user.png');
    background-size:40px 40px ;
    /*vertical-align: top;*/
  }

  .zixun_right_img{
    width: 40px;
    height: 40px;
    display: inline-block;
    border:0;
    margin-top:10px;
    background: url('../../assets/doctor.jpg');
    background-size:40px 40px ;
    /*vertical-align: top;*/
  }
  .askList{
    width: 1340px;
    margin:0 auto;
  }
  .content{
    width:100%;
    margin-top: 50px;
    margin-bottom:150px;
    /*border:1px solid #000;*/
  }
  .title{
    width:100%;
    height:50px;
    /*border:1px solid #000;*/
  }
  .title_text{
    display: inline-block;
    width:200px;
    height:40px;
    line-height:40px;
    font-size:20px;
    /*border:1px solid #000;*/
    background: rgb(1,1,95);
    color: #fff;
    float: left;
    margin-left:100px;
    cursor: pointer;
  }
  .title_text2{
    display: inline-block;
    width:150px;
    height:40px;
    line-height: 40px;
    font-size: 20px;
    /*border:1px solid #000;*/
    background: #939999;
    color: #fff;
    float:left;
    margin-left: 10px;


  }
  .part{
    width:90%;
    /*border:1px solid #000;*/
    margin-left:100px;
    margin-bottom:30px;
  }
  .more{
    color:#30d66a;
    cursor:pointer;
  }

  .detail{
    width: 50%;
    /*border:1px solid #000;*/
    margin-left: 350px;
    margin-top:50px;
    margin-bottom:50px;
    font-size:13px;
  }
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
  }
  .body_title{
    color:#000;
    font-size:14px;
    font-weight: bold;
    margin-bottom:20px;
  }
  .body_part{
    width:95%;
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
