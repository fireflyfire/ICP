<template>
  <div class="part2">
    <div class="part2_title">
      <span class="title_text">问医生</span>
      <hr class="hr_style">
    </div>
    <div class="part2_content">
      <span class="part2_left">
        <span class="left_1">
          <span class="advisory_title">全部咨询</span>
          <span class="left_1_content">
            <span class="left_1_one" v-for="item in content">
              <span class="one_title" @click="clickShow(item,0)">{{ item.title }}</span>
              <span class="one_user">{{ item.name }}</span>
              <span class="one_time">{{ item.createTime}}</span>
            </span>
          </span>
          <span class="page">
          <ul>
            <li v-if="page>1"><a @click="pageClick(0)">首页</a></li>
            <li v-if="page==1"><a class="banclick">首页</a></li>
            <li v-if="page>1"><a @click="pageClick(1)">上一页</a></li>
            <li v-if="page==1"><a class="banclick">上一页</a></li>
            <li v-for="index in pages" :class="{ 'active': page == index }">
              <a @click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="page!=pages"><a @click="pageClick(2)">下一页</a></li>
            <li v-if="page==pages"><a class="banclick">下一页</a></li>
            <li v-if="page!=pages"><a @click="pageClick(3)">末页</a></li>
            <li v-if="page==pages"><a class="banclick">末页</a></li>
            <li><a>共<i>{{ pages }}</i>页</a></li>
          </ul>
        </span>
        </span>
        <span class="left_2">
          <span class="advisory_title">
              <img src="http://uyi.uyidoctor.com/assets/bf92985fb5a7118295db276ad5a72695.png"
                   width="30" alt="">
              立即提问
            </span>
          <span class="text">
              *问题描述
            </span>
          <span class="advisory_content">
              <textarea class="textarea_style" name="advisory" id="advisory"></textarea>
            </span>
          <span class="notice" v-show="isShow1">*问题不能为空</span>
          <span class="advisory_btn">
              <button class="btn" @click="Submit()">提交问题</button>
            </span>
        </span>


      </span>
      <span class="part2_right">
        <span class="right_1">
          <span class="right_title">
              我的咨询记录
            </span>
          <span class="right_content">
              <span class="question_one" v-for="item in question_data">
                <span class="question_title" @click="clickShow(item,1)">
                  {{ item.title }}
                </span>
                <span class="question_time">
                  {{ item.createTime }}
                </span>
              </span>
            </span>
        </span>

      </span>
    </div>




    <el-dialog title="咨询详细" :visible.sync="isShow2" >
      <el-row style="text-align:left; margin-left:50px;">
        <el-col :span="24">
          <span class="part1_img">
             <img :src="img" alt="" width="100" v-if="imageURL =='' || imageURL == null ">
              <img :src="imageURL" alt="" width="80" v-else >
            </span>
          <span style="display: inline-block;width:400px;">
          <span class="part1_name">提问人名称：{{ advisory.name }}</span>
          <span class="part1_time">提问时间 ：{{advisory.createTime }}</span>
          </span>
        </el-col>
        <el-col :span="24">
          <span class="title_z" style="font-size:16px;margin-top:20px;">问题详情：</span>
        </el-col>
        <el-col :span="24">
          <span class="content_part2_data">
            <span style="display:inline-block;margin: 10px auto; width:100%;" v-for="item in question_one_data">
              <span v-if="item.type==0" class="zixun_left">
                <span class="zixun_left_1">
                  <span class="zixun_left_img">
                    <img :src="img" alt="" width="40px" v-if="item.iconUrl =='' || item.iconUrl == null ">
                     <img  :src="item.iconUrl" alt="" width="40px" v-else >

                  </span>
                  <br>
                  <span style="display: inline-block;">{{item.doctorName}}</span>

                </span>
                <span class="zixun_left_2">{{ item.content}}</span><br>
              </span>
               <span v-if="item.type==1" class="zixun_right">
                <span class="zixun_right_1">{{ item.content}}</span>
                <span class="zixun_right_2">
                  <span class="zixun_right_img">
                    <img :src="img2" alt="" width="40px" v-if="item.iconUrl == '' || item.iconUrl == null">
                    <img :src="item.iconUrl" width="40px"  alt="" v-else></span>
                  <br>
                  <span style="display: inline-block;">{{item.doctorName}}医生</span>
                </span>
              </span>
            </span>
          </span>
        </el-col>

        <el-col :span="24" v-show="myShow">
          <span class="part3_title">继续咨询</span>
          <span class="part3_data">
            <textarea name="newAsk" id="newAsk" class="part3_text">
            </textarea>
          </span>
          <span class="part3_btn">
            <button class="part3_button" @click="submitAsk()">提交</button>
          </span>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>

<script>
 /* var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');*/
  export default{
    name: 'user_ask',
    data(){
      return{
        isShow1: false,
        question_data: [],
        question_one_data: [],
        isShow2: false,
        content:[],
        askShow: false,
        advisoryId:'',
        advisory:'',
        total: '',
        pages: '',
        page: 1,
        pageSize:7,
        myShow: false,
        imageURL:'',
        img: require('../../assets/user.png'),
        img2: require('../../assets/doctor.jpg'),
        userName: sessionStorage.getItem('Username'),
        userType: sessionStorage.getItem('Usertype'),
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
      };
    },
    methods:{
      getData(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/myAdvisory?type=0'
          /*+'&page='+v_page+'&pageSize='+v_pageSize*/,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) =>{
//          alert('success');

          this.question_data = res.data.results;
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('网络错误！');
        })

      },
      getData2(v_page,v_pageSize){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/myAdvisory?type=2'
          +'&page='+v_page+'&pageSize='+v_pageSize,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) =>{
//          alert('success');
          this.total = res.data.total;
          this.pages = res.data.pages;
          this.content = res.data.results;
        }).catch( (res) =>{
//          alert('fail'+res);
        })

      },
      Submit(){
        var oDiv = document.getElementById('advisory');
//        alert(oDiv.value);
        if(oDiv.value == ''){
          this.isShow1 = true;
          return;
        }
        if(oDiv.value.length>200){
          alert('输入太长，超出限制');
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/save',
          method: 'post',
          data:{
            title: oDiv.value,
            userId: this.userid,
            name: this.username,
          },
          headers:{
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          alert('问题已提交，等待医生回答！');
          this.$router.go(0);
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('提交失败，请重试！');
        })
      },
      clickShow(item,val){
        this.advisory = item;
//        alert('advisory'+this.advisory.name);
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/findAllAdvisory?id='+item.id,
          method: 'get',
         /* headers: {
            authToken: authtoken,
          },*/
        }).then( (res) =>{
          this.advisoryId = res.data.advisoryId;
          this.question_one_data = res.data.onlineAdvisory;
          this.imageURL = res.data.onlineAdvisory[0].iconUrl;
          this.isShow2 = true;
        }).catch( (res) =>{

        });

        if(val==0){
          this.myShow = false;
        }else{
          this.myShow = true;
        }
      },
      submitAsk(){
        var oNewask = document.getElementById('newAsk');
        if(oNewask.value == ''){
          alert('咨询内容不能为空！');
          return;
        }
        if(oNewask.value.length>200){
          alert('输入太长，超出限制');
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/saveOnline',
          method: 'post',
          data:{
            advisoryId: this.advisoryId,
            content: oNewask.value,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) =>{
          alert('你的描述已提交,等待医生回复！');
          this.$router.go(0);
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('提交失败，请重试！');
        })


      },
      click_return(){
        this.isShow2 = false;
      },
      pageClick(v){
        if( v == 0 ){
          this.page=1;
        }
        if( v == 1 ){
          this.page --;
        }
        if( v == 2 ){
          this.page++;
        }
        if( v == 3 ){
          this.page = this.pages;
        }
      },
      btnClick(v_page) {
        if (v_page != this.page) {
          this.page = v_page;
        }
      },

    },
    watch: {
      page() {
        this.getData2(this.page, this.pageSize);
      }
    },
    created(){
      /* this.getData();*/
      // console.log(this.authtoken);
      this.getData();
      this.getData2(this.page,this.pageSize);
    },

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
    /*background: url('../../assets/user.png');*/
    background-size:40px 40px ;
    /*vertical-align: top;*/
  }

  .zixun_right_img{
    width: 40px;
    height: 40px;
    display: inline-block;
    border:0;
    margin-top:10px;
    /*background: url('../../assets/doctor.jpg');*/
    background-size:40px 40px ;
    /*vertical-align: top;*/
  }
  .part2{
    width:1340px;

    /*border:1px solid #000;*/
    margin-top:30px;
    position:relative;
  }
  .part2_title{
    width:1340px;
    height:50px;
    /*border:1px solid #000;*/
    text-align: left;
  }
  .title_text{
    display: inline-block;
    width:1200px;
    height:35px;
    line-height:35px;
    text-align: left;
    border: 0;
    border-left:4px solid rgb(189,189,189);
    font-size:25px;
    color: rgb(120,120,120);
    padding-left:20px;
    margin-left:100px;
  }
  .hr_style{
    margin-left:100px;
    margin-top: 10px;
    width:1200px;
    border:0;
    border-bottom:2px solid rgb(189,189,189);
  }
  .part2_content{
    width:1340px;
    margin-top:30px;
    /*border:1px solid #000;*/
    text-align: left;
  }
  .part2_left{
    display: inline-block;
    width:500px;
    height: 1000px;
    /*border:1px solid #000;*/
    margin-left:100px;
    vertical-align: top;
    /*border-right: 1px dashed #000;*/
  }

  .left_1{
    display:inline-block;
    width:500px;
    height:400px;
    /*margin-top:10px;*/
  }
  .left_1_content{
    display: inline-block;
    width:500px;
    height: 250px;
    /*border:1px solid #000;*/
    margin-top:10px;
  }
  .left_1_one{
    display: inline-block;
    width: 500px;
    height:20px;
    font-size: 12px;
    color:rgb(153,153,153);
    margin-left:10px;
  }
  .one_title{
    display:inline-block;
    width: 300px;
    height:30px;
    /*border:1px solid #000;*/
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    vertical-align:top;
  }
  .one_title:hover{
    color: rgb(23,23,95);
  }
  .one_user{
    display: inline-block;
    width:80px;
    height:30px;
    /*border:1px solid #000;*/
    vertical-align:top;
  }
  .one_time{
    display: inline-block;
    width: 80px;
    height: 30px;
    /*border:1px solid #000;*/
    vertical-align:top;
  }
  .left_2{
    display: inline-block;
    width: 500px;
    height:400px;
  }
  .advisory_title{
    display: inline-block;
    width: 400px;
    height:50px;
    line-height:50px;
    background: rgb(1,1,95);
    color: #fff;
    font-size:20px;
    padding-left:10px;
  }
  .text{
    display: inline-block;
    width: 400px;
    height:30px;
    line-height:30px;
    font-size:15px;
    color: #000;
    margin-top:30px;
  }
  .textarea_style{
    width:400px;
    height:200px;

    border:1px solid rgb(153,153,153);
  }
  .notice{
    display: inline-block;
    width:400px;
    height:30px;
    line-height:30px;
    color: red;
    text-align: left;
  }
  .advisory_btn{
    display: inline-block;
    width:400px;
    height:40px;
    line-height:40px;
    text-align: center;
    margin-top: 40px;
  }
  .btn{
    width: 150px;
    height:40px;
    font-size:20px;
    background: rgb(1,1,95);
    color: #fff;
    border:0;
    border-radius: 5px;
    cursor: pointer;
  }
  .right_title{
    display: inline-block;
    width:600px;
    height:30px;
    line-height:30px;
    border: 0;
    border-left:3px solid rgb(1,1,95);
    margin-left:10px;
  }
  .right_content{
    display: inline-block;
    width:600px;
    height:300px;
    margin-left: 10px;
    margin-top:30px;
    text-align: left;
    /*border:1px solid #000;*/
  }
  .question_one{
    display: inline-block;
    width:600px;
    height: 20px;
    /*margin-top:10px;*/
    font-size: 14px;
    color: rgb(153,153,153);
  }
  .question_title{
    display: inline-block;
    width:400px;
    height:20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  .question_title:hover{
    color: rgb(1,1,95);
  }
  .question_time{
    display: inline-block;
    width:150px;
    height:20px;
  }

  .part2_right{
    display: inline-block;
    width:600px;
    height:1000px;

    /*border:1px solid red;*/
  }
  .right_1{
    display: inline-block;
    width: 500px;
    height:450px;
    /*border: 1px solid #000;*/
    float:right;
    /*magin-right:50px;*/
  }


  .textarea_style{
    width:500px;
    height:200px;
    border:1px solid rgb(153,217,234);
    border-radius:5px;
  }

  .show_one{
    width:700px;
    /*height:700px;*/
    background: rgba(153,153,153,0.8);
    color: #fff;
    font-size:12px;
    position: absolute;
    top:130px;
    left:250px;
    color:#fff;
    border-radius:5px;
  }
  .show_title{
    display: inline-block;
    width: 600px;
    height:40px;
    border-left: 3px solid rgb(220,220,220);
    font-size: 25px;
    text-align:left;
    margin-left:30px;
    margin-top:30px;
  }
  .show_content{
    display: inline-block;
    width:600px;
    height: 300px;
    /*border:1px solid #000;*/
  }
  .content_part1{
    display: inline-block;
    width:600px;
    height:100px;
    margin-top:10px;
  }
  .part1_img{
    display:inline-block;
    width:100px;
    /*height:100px;*/
    /*background: url('../../assets/user.png');*/
    /*background-size:100px 100px ;*/
    float: left;
    margin-left: 30px;
    /*border:1px solid #000;*/
  }
  .part1_name,.part1_time{
    display: inline-block;
    width:400px;
    height:40px;
    line-height: 40px;
    /*border:1px solid #000;*/
    font-size:14px;
    margin-left: 20px;
    text-align: left;
  }
  .content_part2{
    display: inline-block;
    width: 600px;
    height:200px;
    /*border:1px solid #000;*/
    margin-top:10px;

  }
  .content_part2_title{
    display: inline-block;
    width:600px;
    height:25px;
    font-size: 16px;
    color: #fff;
    margin-left: 10px;
    text-align: left;
  }
  .content_part2_data{
    display: inline-block;
    width:500px;
  }
  .item_one{
    display: inline-block;
    width:400px;
    height:20px;
    font-size: 12px;
    text-align: left;
  }
  .content_part3{
    display: inline-block;
    width:600px;
    height:200px;
    /*border:1px solid #000;*/
  }
  .part3_title{
    display:inline-block;
    width:600px;
    height:25px;
    font-size: 18px;
    border-left: 3px solid rgb(1,1,95);
    text-align: left;
    margin-left: 10px;

  }
  .part3_data{
    display: inline-block;
    width:600px;
    height:100px;
    border-top:2px solid #fff;
    margin-top:5px;
  }
  .part3_text{
    width:500px;
    height:80px;
    border:1px solid rgb(82,226,226);
    border-radius:5px;
    margin-top:10px;
    background: rgba(255,255,255,0.6);
  }
  .part3_btn{
    display: inline-block;
    width:600px;
    height:30px;
  }
  .part3_button{
    width:100px;
    height:30px;
    background: rgb(1,1,95);
    color: #fff;
    font-size: 14px;
    border:0;
  }

  .show_part2{
    display: inline-block;
    width: 600px;
    height:50px;
    font-size: 30px;
    cursor: pointer;
    margin-top:50px;
    /*border: 1px solid #000;*/
  }


  .page {
    display:inline-block;
    float: right;
    margin-top: 10px;
    margin-bottom:20px;
    margin-right: 50px;
    width: 500px;
    height: 60px;
    /*border: 1px solid #000;*/


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

  .span{
    display: inline-block;
    font-size:14px;
    font-weight:200;
    color:red;
    margin-left:30px;
  }
</style>
