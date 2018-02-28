<template>
  <div class="forget">
    <div class="title">
      <a href="/index"><img class="title_img" src="http://uyi.uyidoctor.com/assets/c02f7e01a64b8abda1a1bf9b053ad4f2.png" alt="">
      </a>
    </div>
    <hr class="hr_style">
    <div class="content">
      <div class="top" >
        <div class="top_1" :class="{ active : isActive1}">
          身份验证
        </div>
        <div class="top_2" :class="{ active : isActive2}">
          修改完成
        </div>
        <!--<div class="top_3">

        </div>-->
      </div>
      <div class="content_data">
        <div class="data_1" v-show="isShow1">
          <span class="total" style="margin-top: 50px;">
            <span class="txt">账号:</span>
            <input class="Input" type="text"  v-model="account">
            <span class="notice_2">*</span>
          </span>
          <span class="total">
            <span class="txt">身份证号:</span>
            <input class="Input" type="text" v-model="idCardnumber">
            <span class="notice_2">*</span>
          </span>
          <span class="notice" v-show="isShow3">
             {{message1}}
          </span>
          <span class="total" style="margin-top: 100px;">
            <button class="btn" @click="next_1()">下一步</button>
          </span>
        </div>
        <div class="data_2" v-show="isShow2">
          <span class="total" style="margin-top: 50px;">
            <span class="txt">新密码:</span>
            <input class="Input" type="password"  v-model="newPsw_1" placeholder="须英文、数字、字符任意组合且大于8位">
            <span class="notice_2">*{{message3}}</span>
          </span>
          <span class="total" style="margin-top: 50px;">
            <span class="txt">确认密码:</span>
            <input class="Input" type="password"  v-model="newPsw_2" placeholder="须英文、数字、字符任意组合且大于8位">
            <span class="notice_2">*</span>
          </span>
          <span class="notice" v-show="isShow4">
            {{message2}}
          </span>
          <span class="total_2">
            <button class="btn" @click="next_2()">提交</button>
          </span>
        </div>
      </div>
    </div>
    <div style="margin-left:-70px;">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
  import footer from '../common/footer'
  export default{
    name: 'register_intro',
    data() {
      return{
        isShow1: true ,
        isShow2: false,
        isShow3: false,
        isShow4: false,
        isActive1: true,
        isActive2: false,
        account: '',
        idCardnumber: '',
        newPsw_1: '',
        newPsw_2: '',
        password: '',
        message1: '',
        message2: '',
        message3: '',
        b: '',
        aid:'',
      };
    },
    components:{
      'v-footer': footer,
    },
    methods:{
      /*checkString(str){
        if(str.length < 3){
          this.message1 = '用户名不能少于3位';
          return false;
        }else if( str.length > 14){
          this.message1 = '用户名不能超过14位';
          return false;
        }else{
          this.message1='';
          return true;
        }
      },*/
      Reg(str, rStr){
        var reg = new RegExp(rStr);
        if(reg.test(str)) return true;
        else return false;
      },

      checkString2(str){
        console.log('str:'+str);
        /*if( str.length <3 ){
          this.message2 = '输入不符合要求';
          return false;
        }
        var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
        if(!reg1.test(str)){
          this.message2 = '输入不符合要求';
          return false;
        }
        var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
        if(reg.test(str)){
          this.message2 = '';
          return true;
        }else{
          this.message2 = '输入不符合要求';
          return false;
        }*/

        if( str.length <9 ){
          this.message3 = '输入不符合要求';
          return false;
        }
        var a1 = new RegExp("[a-zA-z]");
//        var a2 = new RegExp("[A-Z]");
        var a3 = new RegExp("[0-9]");
        var a4 = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        var q1 =a1.test(str);
//        var q2 =a2.test(str);
        var q3 =a3.test(str);
        var q4 = a4.test(str);

        console.log('q1:'+q1+' q4: '+q4+' q3: '+q3);
        if(q1 && q3 || q1 && q4 || q3 && q4){
          this.message3 = '';
          return true;
        }else{
          this.message3 = '输入不符合要求';
          return false;
        }


      },
      next_1(){

        if( this.account == '' || this.idCardnumber == '' ){
          this.message1 = '请填写完整信息';
          this.isShow3 = true;
          return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/checkUser?account='+this.account+'&idCardNumber='+this.idCardnumber,
          method: 'get',

        }).then( (res)=>{
          if(res.data.success ==true ){
            this.aid = res.data.id;
            this.isShow1 = false;
            this.isShow2 = true;
            this.isActive1 = false;
            this.isActive2 = true;
          }else{
            this.message1 = '账号或身份信息不正确';
            this.isShow3 = true;
          }
        }).catch( (e) =>{
          // alert('fail');
        })


      },
      next_2(){

        if(this.newPsw_1 == ''||this.newPsw_2 == ''){
          this.message2='请填写完整信息';
          this.isShow4 = true;
          return;
        }
        var tag = this.checkString2(this.newPsw_1);
        if(tag == false ){
          return;
        }
        if(this.newPsw_1 != this.newPsw_2){
          this.message2='两次密码不一致，请重新输入';
          this.isShow4 =true;
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/updatePassword?id='+this.aid+'&password='+this.newPsw_1,
          method: 'get',
        }).then((res)=>{
          alert('修改密码成功，请登录！');
          this.$router.push('/login');
        }).catch( (e)=>{
          this.$message.error('修改失败！');
        })




      },

    },
    watch: {
    },

  }
</script>

<style scoped>
  .forget{
    width:1200px;
    height:900px;
    margin:0 auto;
    /*border:1px solid #000;*/
    color: #666;
  }
  .title{
    width:1100px;
    height:50px;

    text-align: left;
    margin:20px 10px 10px 50px;
    /*border: 1px solid #000;*/
  }
  .hr_style{
    width:1100px;
    margin-left:50px;
    margin-right:10px;
    border:none;
    border-top:1px solid rgb(212,212,212);
  }
  .content{
    width:1100px;
    height:800px;
    /*border: 1px solid #000;*/
    margin-top: 30px;
    margin-left:50px;
  }
  .top{
    width:1100px;
    height:50px;
    line-height:50px;
    /*border:1px solid #000;*/
    text-align: center;

  }
  .top_1,.top_2,.top_3{
    width:350px;
    height:50px;
    line-height:50px;
    font-size:18px;
    font-weight:bold;
    border-bottom:1px solid rgb(200,200,200);
    /*border:1px solid #000;*/
    float: left;
    text-align: center;
  }
  .top_1{
    margin-left:150px;
  }
  .content_data{
    width: 1100px;
    height: 600px;
    margin-top:20px;
    /*border:1px solid #000;*/

  }
  .data_1{
    width:500px;
    height:550px;
    /*border:1px solid #000;*/
    margin: 30px auto;
  }
  .data_2{
    width:500px;
    height:550px;
    /*border:1px solid #000;*/
    margin:30px auto;
  }
  .total{
    display: inline-block;
    width:600px;
    height:80px;
    line-height:80px;
    font-size:16px;
    /*border:1px solid #000;*/
  }
  .total_2{
    display: inline-block;
    width:500px;
    height:60px;
    line-height:60px;
    font-size:16px;
    /*border:1px solid #000;*/
  }
  .txt{
    display: inline-block;
    width:100px;
    height:80px;
    line-height:80px;
    text-align: right;
    /*border:1px solid #000;*/
    color: #000;
  }
  .txt_2{
    display: inline-block;
    width:100px;
    height:60px;
    line-height:60px;
    text-align: right;
    /*border:1px solid #000;*/
    color: #000;
  }
  .Input{
    display: inline-block;
    width:300px;
    height:30px;
    border:1px solid rgb(153,153,153);
  }
  .Input_2{
    display: inline-block;
    width:200px;
    height:30px;
    border:1px solid rgb(153,153,153);
  }
  .btn{
    width:100px;
    height:40px;
    background: rgb(1,1,95);
    border:1px solid rgb(1,1,95);
    border-radius:5px;
    color: #fff;
    cursor: pointer;
  }
  .textarea{
    width:200px;
    height:100px;
  }
  .active{
    border-bottom:1px solid #000;
    color:rgb(1,1,95);
  }
  .notice{
    display: inline-block;
    height:30px;
    width:500px;
    line-height:30px;
    color: red;
    font-size: 14px;
    /*border:1px solid #000;*/
  }
  .notice_2{
    display:inline-block;
    width: 150px;
    /* height:30px;
     line-height:30px;*/
    font-size: 12px;
    color:red;
    text-align: left;
    /*border:1px solid #000;*/
  }
</style>
