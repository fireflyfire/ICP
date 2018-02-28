<template>
  <div class="register_intro">
    <div class="title">
      <a href="/index"><img class="title_img" src="http://uyi.uyidoctor.com/assets/c02f7e01a64b8abda1a1bf9b053ad4f2.png" alt="">
      </a>
    </div>
    <hr class="hr_style">
    <div class="content">
      <div class="top" >
        <div class="top_1" :class="{ active : isActive1}">
          填写账号信息
        </div>
        <div class="top_2" :class="{ active : isActive2}">
          填写个人资料
        </div>
        <!--<div class="top_3">

        </div>-->
      </div>
      <div class="content_data">
        <div class="data_1" v-show="isShow1">
          <span class="total" style="margin-top: 50px;">
            <span class="txt">账号:</span>
            <input class="Input" type="text"  v-model="account"
                   placeholder="8-16字符，中文字符/英文字符/数字">
            <span class="notice_2">*{{ this.message1 }}</span>
          </span>
          <span class="total">
            <span class="txt">密码:</span>
            <input class="Input" type="password" v-model="add_pwd1"
                   placeholder="须英文、数字、字符任意组合且大于8位">
            <span class="notice_2">*{{ this.message2}}</span>
          </span>
          <span class="total">
            <span class="txt">确认密码:</span>
            <input class="Input" type="password" v-model="add_pwd2"
                   placeholder="须英文、数字、字符任意组合且大于8位">
            <span class="notice_2">*</span>
          </span>
          <span class="total" style="text-align: left; margin-left: 20px;">
            <span class="txt">验证码:</span>
            <input class="Input" style="width:150px;" v-model="yzNumber">
            <img id="img" style="width: 150px;vertical-align:top;margin-top:20px;" @click="captcha()">
          </span>
          <span class="notice" v-show="isShow3">
            请填写完整信息 {{message}}
          </span>
          <span class="total" style="margin-top: 100px;">
            <button class="btn" @click="next_1()">下一步</button>
          </span>
        </div>

        <div class="data_2" v-show="isShow2">
          <span class="total_2" style="margin-top: 50px;">
            <span class="txt_2">姓名:</span>
            <input class="Input_2" type="text" name="add_name" id="add_name">
            <span class="notice_2">*</span>
          </span>
          <span class="total_2">
            <span class="txt_2">性别:</span>
            <span class="Input_2" style="border: 0;">
              <input type="radio" name="add_sex"  value="男">男
              &nbsp;&nbsp;
              <input type="radio" name="add_sex" value="女">女
            </span>

            <!--<input class="Input_2" type="text" name="add_sex" id="add_sex">-->
            <span class="notice_2">*</span>
          </span>
          <span class="total_2">
            <span class="txt_2">身份证号码:</span>
            <input class="Input_2" type="text" name="add_num" id="add_num">
            <span class="notice_2">*{{msgid}}</span>
          </span>
          <span class="total_2">
            <span class="txt_2">电话:</span>
            <input class="Input_2" type="text" name="add_phone" id="add_phone">
            <span class="notice_2">*</span>
          </span>
          <span class="total_2">
            <span class="txt_2">头像:</span>
            <input class="Input_2" type="file" name="new_icon" id="new_icon"  @change="upImg">
            <span class="notice_2"></span>
          </span>
          <span class="total_2">
          <span class="txt_2" style="margin-left:-140px;">图片预览:</span>
          <span class="Input_2" style="border:0;margin-left:20px">
            <img id="goodimages" src="" alt="" width="100px">
          </span>
        </span>
          <span class="total_2" style="height: 200px;">
            <span class="txt_2" style="height: 100px; line-height: 100px; vertical-align: top">既往病史:</span>
            <textarea name="add_history" id="add_history" class="textarea">
            </textarea>
            <span class="notice_2"></span>
          </span>
          <span class="notice" v-show="isShow4">
            请完整填写账号信息
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
  import {IdentityCodeValid} from '../ut/IDNumberCheck'
  import {textNumber1,textNumber2} from '../ut/textNumber'
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
        add_pwd1: '',
        add_pwd2: '',
        password: '',
        message: '',
        message1: '',
        message2: '',
        b: '',
        yzNumber:'',
        msgid:'',
      };
    },
    components:{
      'v-footer': footer,
    },
    methods:{
     IdentityCodeValid(code) {
    const city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' };
    let tip = '';
    let pass = true;
    let Ncode = '';
    const cityName = city[code.substr(0, 2)];
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = '身份证号格式错误';
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      tip = '地址编码错误';
      pass = false;
    } else {
      // 18位身份证需要验证最后一位校验位
      Ncode = code.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i += 1) {
        ai = Ncode[i];
        wi = factor[i];
        sum += ai * wi;
      }
      const A = parity[sum % 11];
      const B = Ncode[17];
      if (Number(A) !== Number(B)) {
        tip = '校验位错误';
        pass = false;
      }
    }
    const o = { passes: pass, city: cityName, tips: tip };
    return o;
  },
      checkString(str){
        if(str.length < 8){
          this.message1 = '用户名不能少于8位';
          return false;
        }else if( str.length > 16){
          this.message1 = '用户名不能超过16位';
          return false;
        }else{
          this.message1='';
          return true;
        }
      },
      Reg(str, rStr){
        var reg = new RegExp(rStr);
        if(reg.test(str)) return true;
        else return false;
      },
     /* checkString3(str){
        var objStr=new String("Yue I love you till the end of my life!");
        var re=/[a-z]/;
        var arr=str.match(re);
        console.log("匹配前的字符串:"+str+"");
        if(arr!=null) {
          for (var i = 0; i < arr.length; i++) {
            console.log("**" + arr[i]);
          }
        }
      },*/
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
          this.message2 = '输入不符合要求';
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
          this.message2 = '';
          return true;
        }else{
          this.message2 = '输入不符合要求';
          return false;
        }

       /* var rC = {
          lW:'[a-z]',
          uW:'[A-Z]',
          nW:'[0-9]',
          sW:'[`~!@#$%^&*()_+<>?:"{},.\\/;\'[\\]]',
        };
          var tR = {
            l:this.Reg(str, rC.lW),
            u:this.Reg(str, rC.uW),
            n:this.Reg(str, rC.nW),
            s:this.Reg(str, rC.sW)
          };
          if((tR.l && tR.u && tR.n) || (tR.l && tR.u && tR.s) || (tR.s && tR.u && tR.n) || (tR.s && tR.l && tR.n)){
            this.message2 = '';
            console.log(tR);
            return true;
          }else{
            this.message2 = '输入不符合要求';
            console.log(tR);
            return false;
          }*/
      },
      checkAccount(val){
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/checkName?account='+val,
          method: 'get',
          headers: {
            authToken: '',
          }
        }).then( (res) =>{
          this.b = res.data.success;
        }).catch( (res) => {
//          alert('checkName fail '+ res);
        })
      },
      captcha(){
        var num = Math.random();
        var oImg =document.getElementById('img');
        oImg.src = this.GLOBAL.url+'/captcha?'+num;
//        oImg.src = ' http://192.168.1.121:8082/captcha?'+num;

      },
      next_1(){
//        this.checkAccount(this.account);
        if( this.account == '' || this.add_pwd1 == '' || this.add_pwd2 == '' || this.yzNumber == ''){
          this.isShow3 = true;
          return;
        }
        if(this.b == true){
          this.isShow3 = true;
          this.message = '账号已被注册，请重新输入！';
          return;
        }else{
          this.message = '';
        }
        var ta = this.checkString(this.account);
        if( ta == false ){
          return;
        }

        if( this.checkString2(this.add_pwd1) == false){
          return;
        }

        if(this.add_pwd1 != this.add_pwd2){
          alert('两次密码不一致，请重新输入');
          return;
        }
        this.isShow1 = false;
        this.isShow2 = true;
        this.isActive1 = false;
        this.isActive2 = true;
        this.password = this.add_pwd1;

      },
      upImg(file){
        var oIcon = document.getElementById("new_icon");
        var f= oIcon.value;
        if(f=="")
        { alert("请上传图片");return;}
        else
        {
          if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(f))
          {
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            oIcon.value = "";
            return;
          }
        }
        var reader1 = new FileReader();
//        console.log(file);
        reader1.onload = function(e){
          var oGoodimages = document.getElementById('goodimages');
          oGoodimages.src = e.target.result;
          console.log(oGoodimages.src);
        }
        reader1.readAsDataURL(file.target.files[0]);
        /*   var reader2 = new FileReader();
           reader2.addEventListener("loadend", function () {
             var icon_base64 = this.arrayBufferToBase64(reader2.result);
             var icon = "data:image/png;base64," + icon_base64;
             var oHidden = document.getElementById('hidden');
             oHidden.value = icon;
             alert(oHidden.value);
           });
           reader2.readAsArrayBuffer(file.files[0]);*/
      },
      next_2(){
        var oName = document.getElementById('add_name');
        var oSex = document.getElementsByName('add_sex');
        var oNum = document.getElementById('add_num');
        var oPhone = document.getElementById('add_phone');
        var oIcon = document.getElementById('add_icon');
        var oHistory = document.getElementById('add_history');
        var oGoodimages = document.getElementById('goodimages');
        var img = oGoodimages.src;
        /* 去除字符串  */
        var ss=img.split('base64,');
        var r = ss[1];
        var selectvalue=null;
        for(var i=0;i<oSex.length;i++){
          if(oSex[i].checked==true) {
            selectvalue=oSex[i].value;
            break;
          }
        }
//        alert('sex '+selectvalue);

        if( oName.value == '' || selectvalue == '' || oNum.value == '' || oPhone.value == ''){
          this.isShow4 = true;
          return;
        }

        var o = this.IdentityCodeValid(oNum.value);
        // console.log(this.IdentityCodeValid(oNum.value));
        if(o.passes == false){
          this.msgid = o.tips;
          return;
        }else{
          this.msgid = '';
          // return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/register',
//          url: 'http://192.168.1.121:8082/app/api/icpuser/register',

          method: 'post',
          data: {
            account: this.account,
            password: this.password,
            phoneNumber:oPhone.value,
            realName: oName.value,
            gender: selectvalue,
            idCardNumber: oNum.value,
            iconUrl: r,
            pastHistory: oHistory.value,
            captcha: this.yzNumber,
//            新增验证码
          },
          headers:{
            authToken: '',
          }
        }).then( (res) =>{
          alert('注册成功，请登录！');
          this.$router.push('../login')
        }).catch( (res) => {
//          alert('注册失败，请重试！');
          this.$message.error('注册失败，请重试！');

        })



      },

    },
    watch: {
      account(){
        this.checkAccount(this.account);
      }
    },
    mounted(){
      // console.log(IdentityCodeValid('500221199603151302'));
      this.captcha();
    }

  }
</script>

<style scoped>
  .register_intro{
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
