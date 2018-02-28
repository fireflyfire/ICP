<template>
  <div class="doctor_answer">
    <div class="doctor_title">
      <span class="title_text">回答问题</span>
      <hr class="hr_style">
    </div>
    <div class="doctor_content">
      <span class="content_left">
        <span class="left_title">
          <img src="http://uyi.uyidoctor.com/assets/bf92985fb5a7118295db276ad5a72695.png"
               width="30" alt="">
          全部咨询
        </span>
        <span class="left_data">
          <span class="data_one" v-for="item in content" >
         <!-- <span class="data_one" >-->
              <span class="item_title" @click="clickMe(item)">
              {{ item.title }}
              </span>
              <span class="item_user">
              {{item.name }}
              </span>
              <span class="item_time">
              {{ item.createTime }}
              </span>
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
      <span class="content_right" >
        <span class="right_title">
          咨询详情
        </span>
        <span class="advisory_data"  v-show="right_show">
          <span class="advisory_part1">
            <span class="part1_img">
            <img :src="img" alt="" width="100" v-if="imageURL =='' || imageURL == null ">
              <img :src="imageURL" alt="" width="100" v-else >
            </span>
            <span style="display: inline-block;width:300px;">
              <span class="part1_name">提问人名称：{{ advisory.name }}</span>
             <span class="part1_time">提问时间 ：{{advisory.createTime }}</span>
            </span>
          </span>
          <span class="part1_content">
            <span class="part1_text">问题详情：</span>
            <span class="part1_info" >
              <span style="display:inline-block;margin: 10px auto; width:100%;"  v-for="item in advisory_data">
                <span v-if="item.type==0" class="zixun_left">
                <span class="zixun_left_1">
                  <span class="zixun_left_img">
                    <img :src="img" alt="" width="40px" v-if="item.iconUrl =='' || item.iconUrl == null ">
                    <img :src="item.iconUrl" width="40px" v-else></span>
                  <br>
                  <span style="display: inline-block;">{{item.doctorName}}</span>

                </span>
                <span class="zixun_left_2">{{ item.content}}</span><br>
              </span>
               <span v-if="item.type==1" class="zixun_right">
                <span class="zixun_right_1">{{ item.content}}</span>
                <span class="zixun_right_2">
                  <span class="zixun_right_img">
                    <img :src="img2" alt="" width="40px" v-if="item.iconUrl =='' || item.iconUrl == null ">
                    <img :src="item.iconUrl" width="40px"  alt="" v-else></span>
                  <br>
                  <span style="display: inline-block;">{{item.doctorName}}医生</span>
                </span>
              </span>
              </span>
            </span>
          </span>
          </span>
        <span class="answer" v-show="right_show">
          <span class="answer_text">我的回答</span>
          <span class="answer_input">
            <textarea class="textarea_style" name="answer" id="answer" cols="30" rows="10"></textarea>
          </span>
          <span class="answer_btn">
            <button class="btn" @click="Submit_answer()">提交回答</button>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
 /* var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');*/

  export default{
    name: 'doctor_answer',
    data(){
      return{
        img:require('../../assets/user.png'),
        img2: require('../../assets/doctor.jpg'),
        advisory_type: 2,
        content:[],
        advisory_data: '',
        right_show: false,
        advisory:'',
        AdvisoryId: '',
        total: '',
        pages: '',
        page: 1,
        pageSize:7,
        imageURL:'',
        userName: sessionStorage.getItem('Username'),
        userType: sessionStorage.getItem('Usertype'),
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
      };
    },
    methods:{
      getData(v_page,v_pageSize){
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
          this.$message.error('网络错误！');
        })

      },
      clickMe(item){
        this.right_show = true;
        this.advisory = item;
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/findAllAdvisory?id='+item.id,
          method: 'get',
          /*headers: {
            authToken: authtoken,
          },*/
        }).then( (res) =>{
//          alert('success');
          this.AdvisoryId = res.data.advisoryId;
          this.advisory_data = res.data.onlineAdvisory;
          this.imageURL = res.data.onlineAdvisory[0].iconUrl;
          this.right_show = true;

        }).catch( (res)=>{
//          alert('fail'+res);
        })
      },
      Submit_answer(){
        var oAnswer = document.getElementById('answer');
        if(oAnswer.value == ''){
          alert('请填写你的回答！');
          return;
        }
        if(oAnswer.value.length>200){
          alert('输入太长，超出限制');
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpadvisory/savedoctorOnline',
          method: 'post',
          data:{
            advisoryId: this.AdvisoryId,
            content: oAnswer.value,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) =>{
          alert('你的回答已提交！');
          this.$router.go(0);
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('提交失败，请重试！');
        })

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
        this.getData(this.page, this.pageSize);
      }
    },
    created(){
      // console.log(this.authtoken);
      this.getData(this.page, this.pageSize);
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

  .doctor_answer{
    width:1340px;
    height:1200px;
    /*border:1px solid #000;*/
    margin-top:30px;
  }
  .doctor_title{
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
  .doctor_content{
    width: 1340px;
    height:900px;
    /*border: 1px solid #000;*/
    text-align: left;
  }
  .content_left{
    display: inline-block;
    width:600px;
    height: 500px;
    /*border: 1px solid #000;*/
    margin-left:100px;
    vertical-align: top;
  }
  .left_title{
    display: inline-block;
    width: 400px;
    height:50px;
    line-height:50px;
    background: rgb(1,1,95);
    color: #fff;
    font-size:20px;
    padding-left:10px;
  }
  .left_data{
    display:inline-block;
    width:500px;
    height:300px;
    /*border:1px solid #000;*/
    margin-top: 30px;
  }
  .data_one{
    display:inline-block;
    width:500px;
    height:20px;
    line-height:20px;
    /*border:1px solid #000;*/
    margin-top:10px;
    margin-left:10px;
    font-size:12px;
    color:rgb(153,153,153);
  }
  .item_title{
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
  .item_title:hover{
    color: rgb(23,23,95);
  }
  .item_user{
    display: inline-block;
    width:80px;
    height:30px;
    /*border:1px solid #000;*/
    vertical-align:top;
  }
  .item_time{
    display: inline-block;
    width: 80px;
    height: 30px;
    /*border:1px solid #000;*/
    vertical-align:top;
  }
  .content_right{
    display: inline-block;
    width:600px;
    height: 800px;
    /*border: 1px solid #000;*/
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
  .advisory_data{
    display:inline-block;
    width:600px;
    height:450px;
    /*border:1px solid #000;*/
    text-align:left;
  }
  .advisory_part1{
    display:inline-block;
    width:600px;
    /*height:100px;*/
    margin-top: 30px;
  }
  .part1_img{
    display:inline-block;
    width:100px;
    /*height:100px;*/
    /*background: url('../../assets/user.png');*/
    background-size:100px 100px ;
    float: left;
    margin-left: 30px;
  }
  .part1_name,.part1_time{
    display: inline-block;
    width:300px;
    height:40px;
    line-height: 40px;
    /*border:1px solid #000;*/
    font-size:14px;
    color: rgb(153,153,153);
    margin-left: 20px;
  }
  .part1_content{
    display: inline-block;
    width: 600px;
    height:300px;
    /*border:1px solid #000;*/
    margin-top:10px;
    text-align: left;
  }
  .part1_text{
    display: inline-block;
    width:500px;
    height:50px;
    margin-left:10px;
    font-size: 16px;
    color: rgb(1,1,95);
  }
  .part1_info{
    display: inline-block;
    width:500px;
    height:300px;
    border:1px solid  rgb(153,217,234);
    border-radius:3px;
    font-size: 12px;
    color: rgb(153,153,153);
    margin-left:50px;
    overflow-y: scroll;
  }
  .answer{
    display: inline-block;
    width: 600px;
    height:300px;
    /*border:1px solid #000;*/
  }
  .answer_text{
    display: inline-block;
    width: 600px;
    height:30px;
    line-height:30px;
    border-left: 3px solid rgb(153,153,153);
    margin-left: 10px;
  }
  .answer_input{
    display: inline-block;
    width:600px;
    height:200px;
    margin-top:10px;
    text-align: center;

  }
  .textarea_style{
    width:500px;
    height:200px;
    border:1px solid rgb(153,217,234);
    border-radius:5px;
  }
  .answer_btn{
    display: inline-block;
    width:600px;
    height: 50px;
    text-align: center;
  }
  .btn{
    width:150px;
    height:40px;
    line-height:40px;
    border: 0;
    border-radius:5px;
    background: rgb(1,1,95);
    color: #fff;
    font-size:18px;
    cursor: pointer;
  }
  .ask{
    display: inline-block;
    width:300px;
    margin-left:20px;
  }
  .page {
    display:inline-block;
    float: right;
    margin-top: 10px;
    margin-bottom:20px;
    margin-right: 100px;
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
