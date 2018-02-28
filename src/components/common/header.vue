<template>
  <div class="header">
    <div class="header_left">
      <a href="/index"><img class="title_img" src="http://uyi.uyidoctor.com/assets/c02f7e01a64b8abda1a1bf9b053ad4f2.png" alt="">
      </a>
    </div>
    <div class="header_right">
      <div id="header_part1" class="part" :class="{'part_r': part1Class}">
        <span class="txt" v-if='rtag==1'>
          <a href="/index" @click="tag(1)">
          <el-dropdown>
            <span class="el-dropdown-link txt2">
              首页<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-right:-30px;width:120px;">
           <a @click='ref(1)'><el-dropdown-item>最新咨询</el-dropdown-item></a>
            <a @click='ref(2)'><el-dropdown-item>热点招聘</el-dropdown-item></a>
           <a @click='ref(3)'><el-dropdown-item>药品资讯</el-dropdown-item></a>
            <a @click='ref(4)'><el-dropdown-item>行业资讯</el-dropdown-item></a>
            <a @click='ref(5)'><el-dropdown-item>药品信息</el-dropdown-item></a>

           </el-dropdown-menu>
          </el-dropdown>
          </a>
        </span>

        <span class='txt' v-else>
          <a href="/index" @click='tag(1)'>
            首页
          </a>
        </span>
      </div>

      <div id="header_part2" class="part" :class="{'part_r': part2Class}">
        <span class="txt" v-if="isShow2 == true" >
          <a href="/askDoctor" @click="tag(2)">
          健康咨询


          </a>
        </span>
        <span class="txt" v-else >
          <a href="/askList" @click="tag(2)">
          健康咨询
           <!--  <el-dropdown>
           <span class="el-dropdown-link txt2">
            健康咨询<i class="el-icon-arrow-down el-icon--right"></i>
           </span>
           <el-dropdown-menu slot="dropdown">
           <el-dropdown-item>立即咨询</el-dropdown-item>
           <el-dropdown-item>全部咨询</el-dropdown-item>
                      </el-dropdown-menu>
                     </el-dropdown> -->
          </a>
        </span>
      </div>
      <div id="header_part6" class="part" :class="{'part_r': part6Class}">
        <span class="txt">
          <span @click="clickUrl()" style="cursor: pointer">
            资讯信息
          </span>
          <!--<a href="/zixunList/1" @click="tag(6)">
          资讯信息

          </a>-->
        </span>
      </div>
      <div id="header_part3" class="part" :class="{'part_r': part3Class}">
        <span class="txt">
          <a href="/goodList" @click="tag(3)">药品信息</a>
        </span>
      </div>
      <div id="header_part4" class="part" :class="{'part_r': part4Class}">
        <span class="txt">
          <a href="/recruitList" @click="tag(4)">招聘信息</a>
        </span>
      </div>
      <div id="header_part5" class="part" :class="{'part_r': part5Class}" v-show="isShow">
        <span class="txt">
          <a href="/userInfo" @click="tag(5)">个人中心</a>
        </span>
      </div>



    </div>


  </div>
</template>

<script>
  /*var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');
  var top = sessionStorage.getItem('Top');*/
  export default{
    name: 'header',
    data() {
      return{
        isShow: false,
        isShow2: true,
        part1Class: true,
        part2Class: false,
        part3Class: false,
        part4Class: false,
        part5Class: false,
        part6Class: false,
        re:'',
        rtag: sessionStorage.getItem('tag'),
        userName: sessionStorage.getItem('Username'),
        vip: sessionStorage.getItem('VIP'),
        userType: sessionStorage.getItem('Usertype'),
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token'),
        logintag: sessionStorage.getItem('Logintag'),
      };
    },
    methods: {
      ref(val){
        this.tag(1);
        if(val == 1|| val == 2|| val == 3 || val == 4 || val == 5){
          this.re = val;
        }else {
          this.re = 6;
        }

        // console.log(this.re);
        // console.log(val);
        // sessionStorage.setItem('Top',val);
        this.$emit('rtop',this.re);

      },
      getUserdata(){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/findIcpUserList?id='+this.userid,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) =>{
        }).catch( (res) =>{
//          alert('fail'+res);
        })
      },
      tag(val){
        var tag = sessionStorage.getItem('tag');
        sessionStorage.setItem('tag',val);
        if((tag ==1 || tag == 3 || tag == 4) &&(val == 1 || val == 3 || val == 4)){
          this.checktag();
          /*if(tag == 3){
            this.goAnchor('#part3');
          }*/

        }

      },
      checktag(){
        var tag = sessionStorage.getItem('tag');
        if(tag != null){
          if(tag == 1){
            this.part1Class = true;
            this.part2Class = false;
            this.part3Class = false;
            this.part4Class = false;
            this.part5Class = false;
            this.part6Class = false;

          }else if(tag == 2){
            this.part2Class = true;
            this.part1Class = false;
            this.part3Class = false;
            this.part4Class = false;
            this.part5Class = false;
            this.part6Class = false;

          }else if( tag == 3){
            this.part3Class = true;
            this.part2Class = false;
            this.part1Class = false;
            this.part4Class = false;
            this.part5Class = false;
            this.part6Class = false;

          }else if( tag == 4){
            this.part4Class = true;
            this.part2Class = false;
            this.part3Class = false;
            this.part1Class = false;
            this.part5Class = false;
            this.part6Class = false;

          }else if( tag == 5){
            this.part5Class = true;
            this.part2Class = false;
            this.part3Class = false;
            this.part4Class = false;
            this.part1Class = false;
            this.part6Class = false;
          }else if ( tag == 6){
            this.part6Class = true;
            this.part2Class = false;
            this.part3Class = false;
            this.part4Class = false;
            this.part1Class = false;
            this.part5Class = false;
          }else if ( tag == 7){
            this.part6Class = false;
            this.part2Class = false;
            this.part3Class = false;
            this.part4Class = false;
            this.part1Class = false;
            this.part5Class = false;
          }
        }

      },
      clickUrl(){
        this.tag(6);
        this.$router.push({name: 'zixunList',params:{id: 1}});
      }
    },
    created(){
//      alert('usertype'+usertype);
      if(this.logintag !=1){
        this.isShow2 = false;
      }else{
        this.isShow2 = true;
      }
      if(this.userType == 4){
        this.isShow = true;
        this.getUserdata();
      }
      this.checktag();
    }
  }
</script>

<style scoped>
 .txt2{
font-size:18px;
color: #000;
 }


  .header{
    width:1340px;
    height:100px;
    line-height:100px;
    margin:0 auto;
    line-height:100px;
    /*border:1px solid #000;*/
    border-bottom: 2px solid rgb(1,1,95);
  }
  .header_left{
    width:300px;
    height:100px;
    line-height:150px;
    /*border:1px solid #000;*/
    text-align:left;
    margin-left:100px;
    float: left;
  }
  .left_img{
    /*border:1px solid #000;*/
    margin-top:25px;
  }
  .header_right{
    width:850px;
    height: 100px;
    line-height: 100px;
    /*border: 1px solid #000;*/
    float: right;
  }
  a:link,a:hover,a:visited{
    color: #000;
  }
  .part{
    /*display: inline-block;*/
    width:120px;
    height:100px;
    line-height:70px;
    /*border:1px solid #000;*/
    float: left;
    font-size:18px;

  }
  .part:hover{
    background: rgba(239,239,239,0.8) url(../../assets/2-2.png) no-repeat 50px 70px;
  }

  .part_r{
    width:120px;
    height:100px;
    line-height:70px;
    /*border:1px solid #000;*/
    float: left;
    font-size:18px;
    background: url(../../assets/2-1.png) no-repeat 50px 70px;
  }
  .part_r:hover{
    background: rgba(239,239,239,0.8) url(../../assets/2-1.png) no-repeat 50px 70px;
  }
  .txt{
    display: inline-block;
    width:120px;
    height:50px;
    /*border:1px solid #000;*/
    vertical-align: bottom;
  }
  .part_img{
    display: inline-block;
    /*border:1px solid #000;*/
    width:50px;
    height:30px;
    line-height: 20px;
    overflow: hidden;
    vertical-align: top;
  }
  .part_img_2{
    display: none;
    /*border:1px solid #000;*/
    width:50px;
    height:30px;
    line-height: 20px;
    overflow: hidden;
    vertical-align: top;
  }
</style>
