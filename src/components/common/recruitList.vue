<template>
  <div class="recruitList">
    <v-banner></v-banner>
    <v-header></v-header>
    <div class="content">
      <div class="title">
        <span class="title_text" @click="returnRecruit()">招聘信息</span>
        <span class="title_text2" v-show="isShow2">详情</span>
      </div>
      <div class="part" v-show="isShow1">
        <el-table :data="tableData" style="width: 95%;text-align:left;">
          <el-table-column prop="position" label="职位名称" ></el-table-column>
          <el-table-column prop="companyName" label="公司名称" ></el-table-column>
          <el-table-column prop="salary" label="薪资"></el-table-column>
          <el-table-column prop="releaseTime" label="发布时间"  ></el-table-column>
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
            <span class="card_title">招聘详情</span>
          </div>
          <div class="detail_head">
            <div class="head_title">{{this.detailData.position}}</div>
            <div class="head_part">
              <span class="font_1">{{this.detailData.salary}}</span>
              &nbsp;|&nbsp;<span class="font_2">{{ this.detailData.workPlace}}</span>
              &nbsp;|&nbsp;<span class="font_2">{{this.detailData.fullTime}}</span>
              &nbsp;|&nbsp;<span class="font_2">招聘{{this.detailData.theNumberOf}}人</span>
              &nbsp;|&nbsp;<span class="font_2">{{this.detailData.education}}</span>
              &nbsp;|&nbsp;<span class="font_2">经验{{this.detailData.experience}}年</span>
              &nbsp;|&nbsp;<span class="font_2">{{this.detailData.releaseTime}}</span>
            </div>
            <div class="head_part">
              <span class="font_2" style="margin-left:0px;margin-right:10px;" v-if="this.detailData.contacts!='' ">联系人：{{this.detailData.contacts}}</span><span class="font_2" v-if=" this.detailData.phone != '' ">&nbsp;|&nbsp;联系人电话：{{ this.detailData.phone}}</span>
            </div>
          </div>
          <div class="detail_body">
            <div class="body_title">职位介绍</div>
            <div class="body_part">
              <span>
                {{this.detailData.postResponsibility1}}<br>
                {{this.detailData.postResponsibility2}}<br>
                {{this.detailData.postResponsibility3}}<br>
                {{this.detailData.postResponsibility4}}<br>
                {{this.detailData.postResponsibility5}}
              </span>
            </div>
          </div>
          <div class="detail_body">
            <div class="body_title">职位要求</div>
            <div class="body_part">
              <span>
                {{this.detailData.jobRequirements1}}<br>
                {{this.detailData.jobRequirements2}}<br>
                {{this.detailData.jobRequirements3}}<br>
                {{this.detailData.jobRequirements4}}<br>
                {{this.detailData.jobRequirements5}}
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
  import banner from './banner'
  import header from './header'
  import footer from './footer'
  export default{
    name: 'recruitList',
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
      };
    },
    methods: {
      more(index){
        this.detailData = this.tableData[index];
        console.log('deteil'+this.detailData);
        this.isShow1 = false;
        this.isShow2 = true;

      },
      returnRecruit(){
        this.isShow1 = true;
        this.isShow2 = false;
      },
      getData(v_page, v_pageSize) {
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icprecruitment/findRecruitment?page='+v_page+'&pageSize='+v_pageSize,
          method: 'get',
          headers:{
            authToken: '',
          }
        }).then((res) => {
          this.tableData = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
        }).catch((res) => {
//          alert('数据错误！');
//        this.$router.push('../admin_login');
this.$message.error('网络错误！');
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
      sessionStorage.setItem('tag',4);
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
  .recruitList{
    margin:0 auto;
    width:1340px;
    /*border:1px solid #000;*/
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
