<template>
  <div class="index">
    <v-banner></v-banner>
    <v-header @rtop="taketop"></v-header>
    <div class="content">
      <div class="part1" id="part1">
        <img width="1340px;"
             src="http://uyi.uyidoctor.com/assets/604c2831ea961918158bedf6e9083d28.png">
      </div>

      <div class="part2" id="part2">
        <div class="part2_left">
          <img
            src="http://uyi.uyidoctor.com/assets/f0419c31a984a3f8728d9b6f8897f523.png" alt="">
        </div>
        <div class="part2_right">
          <span class="text1">问医生</span>
          <span class="text2">referring physician</span>
          <span class="text3">
            问医生是由优医推出的一个在线询问医生疾病的咨询平台，是为了服务于中老年人群，
            帮助中老年慢病患者在线询问自身病理，管理自身健康状况。 优医的愿景是打造专业的
            慢病管理服务体系，降低各类心血管事件的发生率，提高高血压与糖尿病人群的健康管理水平。
          </span>
          <span class="span">
            <span class="btn" @click="askDoctor()" v-if="susertype == 5">回答咨询</span>
            <span class="btn" @click="askDoctor()" v-else>立即提问</span>
          </span>

        </div>
      </div>
      <div class="spart3">
        <div class="spart3_1" ref='t1'>
          <div class="spart3_2_title">
            <span class="border1"></span>
            <span class="title_text">最新咨询</span>
            <span class="border2"></span>
            <a href="/askList" v-if="this.userlogintag !=1 ">
              <span style="font-size:14px;color:rgb(185,185,185);">更多<i class="el-icon-d-arrow-right"></i></span>
            </a>
            <a href="/askDoctor" v-else>
              <span style="font-size:14px;color:rgb(185,185,185);">更多<i class="el-icon-d-arrow-right"></i></span>
            </a>
          </div>
          <div class="spart3_2_content">
            <span class="recruit_one_1" v-for="item in this.questionList" @click="more(item,0)">
              <span>-</span>
              <span>{{ item.title }}&nbsp;/&nbsp;{{ item.name }}&nbsp;/&nbsp;{{ item.createTime }}</span>
            </span>
          </div>
          <!--<div style="width:100%;">
            <span class="spart4_btn"><a href="#/askDoctor"><i class="el-icon-edit" style="color: #2c3e50;"></i>我也要咨询...</a></span>
          </div>-->
        </div>
        <div class="spart3_2" ref='t2'>
          <div class="spart3_2_title">
            <span class="border1"></span>
            <span class="title_text">热点招聘</span>
            <span class="border2"></span>
            <a href="/recruitList">
              <span style="font-size:14px;color:rgb(185,185,185);">更多<i class="el-icon-d-arrow-right"></i></span>
            </a>
          </div>
          <div class="spart3_2_content">
            <span class="recruit_one_1" v-for="item in content_recruitment" @click="more(item,1)">
              <span>-</span>
              <span>{{ item.position }}&nbsp;/&nbsp;{{ item.workPlace}}&nbsp;/&nbsp;{{ item.companyName}}&nbsp;|&nbsp;{{item.releaseTime}}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="spart3" ref='t3'>

        <div class="spart3_1">

          <div class="spart3_2_title">
            <span class="border1"></span>
            <span class="title_text">药品资讯</span>
            <span class="border2"></span>
            <a @click="clickUrl(1)">
              <span style="font-size:14px;color:rgb(185,185,185);cursor: pointer">更多<i class="el-icon-d-arrow-right"></i></span>
            </a>
          </div>
          <div class="spart3_2_content">
            <span class="recruit_one_1" v-for="item in zixunData1" @click="more(item,2)">
              <span>-</span>
              <span>{{ item.title.length > 40 ? item.title.substring(0,40)+'...': item.title}}</span>
            </span>
          </div>



        </div>
        <div class="spart3_2" ref='t4'>
          <div class="spart3_2_title">
            <span class="border1"></span>
            <span class="title_text">行业资讯</span>
            <span class="border2"></span>
            <a @click="clickUrl(2)">
              <span style="font-size:14px;color:rgb(185,185,185);cursor: pointer">更多<i class="el-icon-d-arrow-right"></i></span>
            </a>
          </div>
          <div class="spart3_2_content">
            <span class="recruit_one_1" v-for="item in zixunData2" @click="more(item,3)">
              <span>-</span>
              <span>{{ item.title.length > 40 ? item.title.substring(0,40)+'...': item.title}}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="spart3" ref='t5'>
        <div class="spart3_1">
          <div class="spart3_1_title">
            <span class="border1"></span>
            <span class="title_text">药品信息</span>
            <span class="border3"></span>
            <a href="/goodList">
              <span style="font-size:14px;color:rgb(185,185,185);">更多<i class="el-icon-d-arrow-right"></i></span>
            </a>
          </div>
          <div class="spart3_2_content">
            <span class="good_one" v-for="item in content_commodity">
              <span class="goodsimage"><img :src="item.commodityPictures" width="40" height="40" style="vertical-align: top"></span>
              <span class="good_text" @click="more(item,4)">{{ item.tradeName}}</span>
            </span>
          </div>
        </div>
      </div>


      <el-dialog title="招聘详细" :visible.sync="dialogVisible" >
        <div class="detail_head">
          <div class="head_title">{{this.detailData.position}}</div>
          <div class="head_part">
            <span class="font_1">薪资{{this.detailData.salary}}</span>
            &nbsp;|&nbsp;<span class="font_2">{{ this.detailData.workPlace}}</span>
            &nbsp;|&nbsp;<span class="font_2">{{this.detailData.fullTime}}</span>
            &nbsp;|&nbsp;<span class="font_2">招聘{{this.detailData.theNumberOf}}人</span>
            &nbsp;|&nbsp;<span class="font_2">{{this.detailData.education}}</span>
            &nbsp;|&nbsp;<span class="font_2">经验{{this.detailData.experience}}年</span>
          </div>
          <div class="head_part">
            <span class="font_2" style="margin-left:0px;margin-right:10px;" v-if="this.detailData.contacts != ''">联系人：{{this.detailData.contacts}}&nbsp;|&nbsp;</span><span class="font_2" v-if="this.detailData.phone !=''">联系人电话：{{ this.detailData.phone}}</span>
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
       <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
        </span>-->
      </el-dialog>

      <el-dialog title="资讯详细" :visible.sync="dialogVisible_2" >
        <div class="detail_head">
          <div class="head_title">{{this.detailData.title}}</div>
          <div class="head_part">
            <span class="font_1">{{this.detailData.author}}</span>
            &nbsp;|&nbsp;<span class="font_2">{{ this.detailData.releaseTime}}</span>
          </div>
        </div>
        <div class="detail_body">
          <div class="body_title">内容</div>
          <div class="body_part">
            <span>
              {{this.detailData.content}}<br>

            </span>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="change">确 定</el-button>
         </span>-->
      </el-dialog>

      <el-dialog title="资讯详细" :visible.sync="dialogVisible_3" >
        <div class="detail_head">
          <div class="head_title">{{this.detailData.title}}</div>
          <div class="head_part">
            <span class="font_1">{{this.detailData.author}}</span>
            &nbsp;|&nbsp;<span class="font_2">{{ this.detailData.releaseTime}}</span>
          </div>
        </div>
        <div class="detail_body">
          <div class="body_title">内容</div>
          <div class="body_part">
            <span>
              {{this.detailData.content}}<br>

            </span>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="change">确 定</el-button>
         </span>-->
      </el-dialog>

      <el-dialog title="咨询详细" :visible.sync="dialogVisible_0" >
        <div class="detail_head">
          <div class="head_title">{{this.detailData.title}}</div>
          <div class="head_part">
            <span class="font_1">{{this.detailData.name}}</span>
            &nbsp;|&nbsp;<span class="font_2">{{ this.detailData.createTime}}</span>
          </div>
        </div>
        <div class="detail_body">
          <!--<div class="body_title">内容</div>-->
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
        <!-- <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="change">确 定</el-button>
         </span>-->
      </el-dialog>

      <el-dialog title="药品详细" :visible.sync="dialogVisible_4">
        <el-row>
          <el-col >
            <el-card>
              <div slot="header" style="text-align: left;height: 30px;" >
                <span class="card_title">药品信息</span>
              </div>
              <div class="detail_content">
                <div>

                  <span class="image"><img :src="this.detailData.commodityPictures" width="300px" height="300px" ></span>
                </div>
                <div>
                  <span class="detail_1">{{ this.detailData.tradeName }}</span>
                  <span class="detail_2">{{ this.detailData.commodityIntroduction}}</span>
                  <span class="detail_3">
                    <span class="d1"><time class="time">{{ this.detailData.releaseTime}}</time></span>
                    <span class="d2">{{ this.detailData.commodityManufacturers}}</span>
                  </span>
                  <!--<span class="detail_4"></span>-->
                </div>


              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-dialog>




    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  /*var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');
  var top = sessionStorage.getItem('Top');*/
  import banner from './common/banner'
  import header from './common/header'
  import footer from './common/footer'
  export default{
    name: 'index',
    data() {
      return{
        content_commodity: [],
        content_recruitment: [],
        once: true,
        susertype: sessionStorage.getItem('Usertype'),
        dialogVisible: false,
        detailData: [],
        questionList: [],
        postRecruit: [],
        jobRecruit: [],
        zixunData1:[],
        zixunData2:[],
        dialogVisible_0:false,
        dialogVisible_2:false,
        dialogVisible_3:false,
        dialogVisible_4:false,
        askDetail: [],
        userlogintag: sessionStorage.getItem('Logintag'),
        top: sessionStorage.getItem('Top'),

      };
    },
    methods:{
      clickUrl(val){
        this.$router.push({name: 'zixunList',params:{id: val}});
      },
      taketop(re){
        // console.log(this.$refs);
        // console.log('re'+re);
        // console.log(r);
        var ot = '';
        if(re ==1){
          ot = this.$refs.t1.offsetTop;
        }else if (re==2){
           ot = this.$refs.t2.offsetTop;

        }else if(re==3){
           ot = this.$refs.t3.offsetTop;

        }else if(re==4){
           ot = this.$refs.t4.offsetTop;

        }else if(re ==5){
           ot = this.$refs.t5.offsetTop;

        }else if ( re == 6){
           ot = 0;
        }
        console.log(ot);
        document.body.scrollTop = ot;
        document.documentElement.scrollTop = ot;

      },
      more(item,val){
        this.detailData = item;
        if(val ==0 ){
          this.dialogVisible_0 = true;
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icpadvisory/findAllAdvisory?id='+item.id,
            method: 'get',
          }).then( (res) =>{
            this.askDetail = res.data.onlineAdvisory;
          }).catch( (res) =>{
            this.$message.error('网络错误');
          })


        }else if( val== 1){
          this.dialogVisible = true;
        }else if( val == 2){
          this.dialogVisible_2 = true;
        }else if( val ==3){
          this.dialogVisible_3 = true;
        }else if( val == 4){
          this.dialogVisible_4 = true;
        }

      },
      askDoctor(){
        sessionStorage.setItem('tag',2);
        this.$router.push('askDoctor');
      },
      getCommodityData(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpcommodity/findCommodityList?page=1&pageSize=9',
          method: 'get',
          headers:{
            authToken: '',
          }
        }).then( (res) => {
//          alert("success!");
          this.content_commodity = res.data.results;
        }).catch( (res) => {
//          alert('fail'+res);
          this.$message.error('网络错误！');
        })
      },
      getRecruitmentData(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icprecruitment/findRecruitment?page=1&pageSize=12',
          method: 'get',
          headers:{
            authToken: '',
          }
        }).then( (res) => {
//          alert("success!");
          this.content_recruitment = res.data.results;
        }).catch( (res) => {
//          alert('fail'+res);

        })
      },
      getUserData(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/findIcpUserList',
          method: 'get',
          headers:{
            authToken: '',
          }
        }).then( (res) => {
//          alert("success!");

        }).catch( (res) => {
//          alert('fail'+res);

        })
      },
      getQuestionData(){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icpadvisory/advisory?'
            +'&page=1&pageSize=12',
            method: 'get',

          }).then( (res) =>{
//          alert('success');
            this.questionList = res.data.results;
          }).catch( (res) =>{
//            alert('fail'+res);
          })

      },
      getZixunData(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/information/findInformationList?page=1&pageSize=12&type=1',
          method: 'get',
        }).then( (res)=>{
          this.zixunData1 = res.data.results;
          // console.log(this.zixunData1);
        }).catch( (e) =>{
//          alert('fail');
        });
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/information/findInformationList?page=1&pageSize=12&type=2',
          method: 'get',
        }).then( (res)=>{
          this.zixunData2 = res.data.results;
//          console.log(this.zixunData2);
        }).catch( (e) =>{
//          alert('fail');
        })
      }
    },
    created(){
//      alert('index userid='+userid);
//      alert('authtoken '+authtoken);
      sessionStorage.setItem('tag',1);
      this.getCommodityData();
      this.getRecruitmentData();
      this.getUserData();
      this.getQuestionData();
      this.getZixunData();
    },
    mounted(){
      this.taketop();
    },
    components: {
      'v-banner':banner,
      'v-header':header,
      'v-footer':footer,
    },
    watch:{
      top(){
        // console.log(this.top);
        this.taketop();
      }
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
    background: url('../assets/user.png');
    background-size:40px 40px ;
    /*vertical-align: top;*/
  }

  .zixun_right_img{
    width: 40px;
    height: 40px;
    display: inline-block;
    border:0;
    margin-top:10px;
    background: url('../assets/doctor.jpg');
    background-size:40px 40px ;
    /*vertical-align: top;*/
  }
  .textt{
    display:inline-block;
    width:250px;
    line-height:20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
.yaopin{
  width: 1340px;
    height:400px;
    /*border:1px solid #000;*/
    margin-top:50px;
}
.yaopin_1{
  width: 100%;
  float: left;
  height: 400px;
  margin-left:30px;
  /*border: 1px solid #000;*/
}
.yaopin_content{
  width: 45%;
  /*border: 1px solid #000;*/
  float: left;
}

  .spart3{
    width: 1340px;
    height:400px;
    /*border:1px solid #000;*/
    margin-top:50px;
  }



  .spart3_1{
    width: 45%;
    /*border: 1px solid #000;*/
    float: left;
    height: 400px;
    margin-left:30px;
  }

  .spart3_1_title,.spart3_2_title{
    display: inline-block;
    text-align: left;
    /*border: 1px solid #000;*/
    float: left;
    height:50px;
    margin-bottom:30px;
    /*line-height:50px;*/
  }
  .border1,.border2,.border3{
    display: inline-block;
    width:20px;
    height:50px;
    /*border:1px solid red;*/
    border-bottom:1px solid rgb(153,153,153);
    vertical-align: top;
  }
  .border3{
    width:350px;
  }
  .border2{
    width:300px;
  }
  .title_text{
    display: inline-block;
    width:100px;
    height:50px;
    line-height:100px;
    color: rgb(145,72,0);
    /*border:1px solid blue;*/
  }

  .spart3_1_content{
    width:100%;
    /*border:1px solid #000;*/
  }
  .good_one{
    display: inline-block;
    width: 30%;
    /*border: 1px solid #000;*/
    float: left;
    margin-left:10px;
    margin-bottom:10px;
  }

  .good_text{
    display: inline-block;
    width:120px;
    height:50px;
    line-height:50px;
    /*border:1px solid #000;*/
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    color: #7d7d7d;
  }
  .good_text:hover{
    text-decoration: underline;
  }
  .spart3_2{
    width:45%;
    /*border: 1px solid #000;*/
    float: right;
    height:400px;
    margin-right:30px;
  }

  .spart3_2_content{
    width:100%;
    /*border:1px solid #000;*/
  }
  .recruit_one{
    display: inline-block;
    width:90%;
    height: 30px;
    line-height:30px;
    font-size: 13px;
    color: #01015f;
    text-align: left;
    /*border: 1px solid #000;*/
    padding-left:10px;


  }
  .recruit_one_1{
    display: inline-block;
    width:90%;
    height: 30px;
    line-height:30px;
    font-size: 13px;
    color: #01015f;
    text-align: left;
    /*border: 1px solid #000;*/
    padding-left:10px;


  }
  .recruit_one_1:hover{
    text-decoration: underline;
  }
  .spart4{
    width: 1340px;
    height:500px;
    /*border:1px solid #000;*/
    margin-top:50px;
  }
  .spart4_1{
    width:45%;
    float: left;
    height: 400px;
    margin-left:30px;
    /*border:1px solid #000;*/
  }
  .spart4_2{
    width: 45%;
    float: right;
    height: 400px;
    margin-right:30px;
    /*border:1px solid #000;*/
  }
  .title4_text{
    display: inline-block;
    width: 200px;
    height:40px;
    line-height:40px;
    background: rgb(1,1,95);
    color: #fff;
    float: left;
    font-size: 20px;
    margin-bottom:10px;
  }
  .spart4_1_content{
    width:100%;
    margin-top: 10px;
    /*border:1px solid #000;*/
    text-align: center;
  }
  .ask_title{
    display: inline-block;
    width:90%;
    /*border:1px solid #000;*/
    margin-top:10px;
    text-align: left;
  }
  .hr_style{
    width:90%;
    margin-left: 30px;
    margin-top:10px;
    border:0;
    border-bottom:1px dashed;
  }

  .spart4_btn{
    display: inline-block;
    width:200px;
    height: 30px;
    line-height: 30px;
    color: rgb(1,1,95);
    border: 0;
    border-radius:3px;
    background: #b9b9b9;
    float: right;
    margin-top:20px;
    margin-right: 230px;
    cursor:pointer;

  }
  .spart4_btn a:hover,.spart4_btn a:link,.spart4_btn a:visited{
    color:#000;

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
    width:95%;
    /*border: 1px solid #000;*/
    border-left:1px solid #a8a8a8;
    line-height:20px;
    padding:10px 10px 10px 20px;
  }
  .spart4_2_content{
    width:100%;
    margin-top: 10px;
    /*border:1px solid #000;*/
    text-align: left;
  }
  .content_1{
    width:100%;
    /*border:1px solid #000;*/
  }
  .span_title{
    display: inline-block;
    width:100%;
    height:30px;
    /*border:1px solid #000;*/
    font-size:14px;
    font-weight:bold;
    color: #6e6e6e;
    text-align:left;
  }
  .content_2{
    width:100%;
    /*border:1px solid #000;*/
    margin-top: 20px;
  }
  .row{
    width:100%;
    font-size:14px;
    color: #282828;
    margin-top:5px;
  }

  .span_1{
    display: inline-block;
    width:100%;
    text-align:left;
    font-size:16px;
    color:rgb(89,89,89);
    margin-top:10px;
    padding-left:20px;
  }

  .card_title{
    text-align: left;
    color: rgb(1,1,95);
    display: inline-block;
    height:40px;
    font-size: 20px;
  }
  .detail_content{
    width:100%;
    /*margin-bootom: 30px;*/
    /*border: 1px solid #000;*/
  }

  .image {
    width: 300px;
    height: 300px;
    display: inline-block;
    float: left;
    margin-bottom:40px;
    background: url('../assets/goods_1.png');
    background-size:300px 300px ;
    vertical-align: top;
  }
  .detail_1{
    display: inline-block;
    width: 45%;
    font-size:16px;
    text-align: left;
    margin-bottom:20px;
  }
  .detail_2{
    display: inline-block;
    width: 45%;
    text-align: left;
  }
  .detail_3{
    display: inline-block;
    width:45%;
    margin-top: 10px;
    text-align: left;
    font-size: 12px;
  }
  .d1{
    display: inline-block;
    width:40%;
  }
  .d2{
    display: inline-block;
    width:45%;
  }
  .detail_4{
    display: inline-block;
    width:45%;
    text-align: left;
    margin-top:10px;
    margin-bottom:40px;
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
    margin-top:20px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  /*****************************/

  .index{
    margin:0 auto;
    width:1340px;
  }
  .part1{
    width:1340px;
    height:400px;
  }
  .part2{
    width:1340px;
    height:500px;
    /*border:1px solid #000;*/
    background: rgba(225,225,225,0.3);
  }
  .part2_left{
    width:700px;
    height:400px;
    margin-top:30px;
    /*border:1px solid #000;*/
    float: left;
  }
  .part2_right{
    width:600px;
    height:400px;
    margin-top:30px;
    float: right;
    /*border: 1px solid #000;*/
  }
  .text1{
    display: inline-block;
    width:600px;
    height:60px;
    line-height: 60px;
    font-size:30px;
    color: #000;
    text-align: left;
    margin-top:20px;
  }
  .text2{
    display: inline-block;
    width:600px;
    height:20px;
    line-height:20px;
    font-size:14px;
    color: rgb(200,191,231);
    text-align: left;

  }
  .text3{
    display: inline-block;
    float: left;
    width:500px;
    line-height:25px;
    font-size:15px;
    color: rgb(98,98,98);
    text-align: left;
    margin-top:20px;
  }
  .span{
    display: inline-block;
    width:500px;
    height:50px;
    /*border:1px solid #000;*/
    float: left;
    margin-top:45px;
  }
  .btn{
    display: inline-block;
    width: 100px;
    height:40px;
    line-height:40px;
    background: rgb(1,1,95);
    color: #fff;
    font-size:16px;
    float: left;
    cursor: pointer;
    /*border:1px solid #000;*/
  }
  .part3{
    width:1340px;
    height:700px;
    margin-top:80px;
    border: 1px solid #000;
    /*background: rgba(210,210,210,0.5);*/
  }

  .part3_1{
    width: 50%;
    border: 1px solid #000;
    float: left;
  }
  .part3_2{
    width:50%;
    border:1px solid #000;
    float: right;
  }



  .part3_title,.part4_title{
    width:1340px;
    height:50px;
    /*border-bottom:1px solid #000;*/
    font-size: 20px;
    color: rgb(145,72,0);
    /*border:1px solid #000;*/

  }

  .part3_content{
    width:1340px;
    height:600px;
    margin-top:50px;
    /*border:1px solid #000;*/
  }
  .commodity_one{
    display: inline-block;
    width:400px;
    height:500px;
    /*border:1px solid #000;*/
    vertical-align: top;
    text-align: left;
    background: rgba(225,225,225,0.4);
  }

  .img{
    display: inline-block;
    width:150px;
    height:400px;
    margin: 30px 20px 0 20px;
    /*border:1px solid red;*/
    background: url('../assets/goods_2.png');
    background-size:150px 400px ;
    vertical-align: top;
  }
  .commodity_intro{
    display: inline-block;
    width:200px;
    height: 400px;
    /*border:1px solid #000;*/
    margin-top: 30px;
    overflow: hidden;


  }
  .total{
    display: inline-block;
    width:200px;
    height: 50px;
    line-height:50px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size:14px;
  }
  .total_intro{
    display: inline-block;
    width:200px;
    height: 100px;
    line-height:20px;
    /*border: 1px solid #000;*/
    /*text-overflow: ellipsis;
    overflow: hidden;*/
    /*white-space: nowrap;*/
    font-size:12px;
  }
  .total b{
    color: rgb(1,1,95);
    font-size:16px;
  }
  .total_intro b{
    color: rgb(1,1,95);
    font-size:16px;
  }

  .part4{
    width:1340px;
    height:1000px;
    /*background: rgba(210,210,210,0.5);*/
  }
  .part4_content{
    width:1340px;
    height:650px;
    margin-top:50px;
    /*border:1px solid #000;*/
  }
  .title_tr{
    height: 40px;
  }
  .title_td{
    width:240px;
    height:40px;
    font-size:16px;
    font-weight:bold;

  }
  .item_tr{
    height:40px;
    font-size: 14px;
    color: rgb(120,120,120);

  }
  .item_td{
    width:240px;
    height:40px;
    font-size:14px;
  }
  .require{
    font-size: 14px;
    color: rgb(120,120,120);
    padding-left:10px;
    text-align: left;
    vertical-align: top;
    line-height:30px;
  }

  .goodsimage{
    display: inline-block;
    width:40px;
    height:40px;
    background: url('../assets/goods_1.png');
    background-size:40px 40px ;
    vertical-align: top;
    border:0;
  }
</style>
