<template>
  <div class="update_index">
    <div class="title">
      <a href="/index"><img class="title_img" src="http://uyi.uyidoctor.com/assets/c02f7e01a64b8abda1a1bf9b053ad4f2.png" alt="">
      </a>
    </div>
    <hr class="hr_style">
    <div class="content">
      <div class="top" >
        <div class="top_1" :class="{ active : isActive1}">
          修改资料
        </div>
        <div class="top_2" :class="{ active : isActive2}">
        </div>

        <!--<div class="top_3">

        </div>-->
      </div>
      <div class="content_data">
        <div class="data_2">
          <span>
            <div class="update">
        <span class="update_total">
          <span class="update_text">登录账号：</span>
          <span class="update_account">
            {{ userintro.account }}
          </span>
        </span>
        <span class="update_total">
          <span class="update_text">真实姓名：</span>
          <span class="update_input">
            <input  class="Input" type="text" id="new_name" name="new_name" :value="userintro.realName" placeholder="10字符内">
          </span>
          <span style="color: red;">*</span>
        </span>
        <span class="update_total">
          <span class="update_text">性别：</span>
          <span class="update_input" style="color:#000;">
            <span  v-if="userintro.gender=='男'">
              <input class="radio_style" type="radio" name="new_sex" value="男" checked>男
              <input class="radio_style" type="radio" name="new_sex" value="女">女
            </span>
            <span v-else>
              <input class="radio_style" type="radio" name="new_sex" value="男" >男
              <input class="radio_style" type="radio" name="new_sex" value="女" checked>女
            </span>

          </span>
          <span style="color: red;">*</span>
        </span>
        <span class="update_total">
          <span class="update_text">身份证号：</span>
          <span class="update_input">
            <input class="Input" type="text" name="new_cardnumber" id="new_cardnumber"
                   :value="userintro.idCardNumber">
          </span>
          <span style="color: red;">*</span>
        </span>
        <span class="update_total">
          <span class="update_text">电话：</span>
          <span class="update_input">
            <input class="Input" type="text" name="new_phone" id="new_phone" :value="userintro.phoneNumber">
          </span>
          <span style="color: red;">*</span>
        </span>
        <span class="update_total">
          <span class="update_text">头像：</span>
          <span class="update_input">
            <input class="file_style" type="file" name="new_icon" id="new_icon" @change="upImg">
            <!--<input type="hidden" name="hidden" id="hidden">-->
          </span>
        </span>
              <span class="update_total">
          <span class="update_text">图片预览：</span>
          <span style="margin-left:20px">
            <img id="goodimages" :src="userintro.iconUrl" alt="" width="100px">
          </span>
        </span>
        <span class="update_total2">
          <span class="update_text">既往病史：</span>
          <span class="update_input2">
            <textarea class="Input2" type="text" name="new_history" id="new_history" :value="userintro.pastHistory">
            </textarea>
          </span>
        </span>
        <span v-show="isShow2" style=" display: inline-block; color: red; margin-top: 20px;">*请填写完整信息</span>
        </div>
          </span>
          <span class="notice" v-show="isShow4">
            {{message2}}
          </span>
          <span class="total_2">
            <button class="btn" @click="update_ok()">提交</button>

             <button class="btn" style="background:rgb(210,210,210);border:0; color:#000;margin-left:20px;" @click="Return()">返回</button>
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
  /*var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');
  var userVip =sessionStorage.getItem('VIP');*/
  export default{
    name: 'update_index',
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
        userintro:'',
        userid: sessionStorage.getItem('Userid'),
        authtoken: sessionStorage.getItem('Token')
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
      getUserData(){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icpuser/findIcpUserList?id='+this.userid,
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then( (res) =>{
            this.userintro = res.data.results[0];
          }).catch( (res) =>{
//          alert('fail'+res);
            this.$message.error('网络错误！');
          })
        },
      update_ok(){
//        var oNewpwd = document.getElementById('new_pwd');
        var oNewname = document.getElementById('new_name');
        var oNewsex = document.getElementsByName('new_sex');
        var oNewcard = document.getElementById('new_cardnumber');
        var oNewphone = document.getElementById('new_phone');
        var oNewicon =document.getElementById('new_icon');
        var oNewhistory =document.getElementById('new_history');
//        var oHidden = document.getElementById('hidden');
        var oGoodimages = document.getElementById('goodimages');
        var img = oGoodimages.src;
        /* 去除字符串  */
        var ss=img.split('base64,');
        var r = ss[1];

        var selectvalue=null;
        for(var i=0;i<oNewsex.length;i++){
          if(oNewsex[i].checked==true) {
            selectvalue=oNewsex[i].value;
            break;
          }
        }
        if(oNewname.value == '' || selectvalue == null || oNewcard.value == '' || oNewphone.value == ''){
          this.isShow2 = true;
          return;
        }
        if(oNewname.value.length>10){
          alert('姓名输入太长，超出限制！');
          return;
        }
        var o = this.IdentityCodeValid(oNewcard.value);
        // console.log(this.IdentityCodeValid(oNum.value));
        if(o.passes == false){
          alert(o.tips);
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/update',
          method: 'post',
          data:{
            id: this.userid,
            account: this.userintro.account,
            phoneNumber: oNewphone.value,
            realName: oNewname.value,
            gender: selectvalue,
            idCardNumber: oNewcard.value,
            iconUrl:r ,
            pastHistory: oNewhistory.value,
          },
          headers:{
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          alert('个人信息修改成功！');
          sessionStorage.setItem('Username',oNewname.value);
          this.$router.push('/index');
        }).catch( (res) => {
//          alert('fail'+res);
          this.$message.error('修改失败！');
        })


      },
      Return(){
        this.$router.push('/index');
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


    },
    watch: {
    },
    created(){
      this.getUserData();
    }

  }
</script>

<style scoped>
  .update_index{
    width:1200px;
   /* height:900px;*/
    margin:0 auto;
    margin-bottom:150px;
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
    margin-top:50px;
    margin-bottom:150px;
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
    /*height:550px;*/
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
    margin-top:20px;
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



  .update_data{
    width:500px;
    height:600px;
    z-index: 100;
    border:1px solid #fff;
    border-radius:5px;
    background: rgba(65,65,65,0.8);
    position: absolute;
    top:300px;
    left:400px;
  }
  .update_title{
    width:500px;
    height: 50px;
    line-height:50px;
    font-size:25px;
    color: #000;
    margin:20px 0;
  }
  .update{
    width:500px;
    /*height:400px;*/
    /*border: 1px solid #000;*/
  }
  .update_total,.update_total2{
    display: inline-block;
    width:500px;
    height:40px;
    text-align: left;
    /*border: 1px solid #000;*/
  }
  .update_total2{
    height:100px;
  }
  .update_text{
    display: inline-block;
    width:150px;
    height:40px;
    line-height: 40px;
    font-size:16px;
    font-weight:bold;
    color:#000;
    /*border:1px solid #fff;*/
    margin-left:30px;
    vertical-align: top;
  }
  .update_account{
    display: inline-block;
    width:250px;
    height: 40px;
    line-height:40px;
    color:orange;
    font-size:20px;
    margin-left:20px;
    /*border:1px solid red;*/
  }
  .update_input,.update_input2{
    display: inline-block;
    width:250px;
    height: 40px;
    /*border:1px solid red;*/
  }
  .update_input2{
    height:100px;
  }
  .Input,.Input2{
    display: inline-block;
    width:200px;
    height:30px;
    border:1px solid #99d9ea;
    border-radius:5px;
    margin-left:20px;
  }
  .Input2{
    height:100px;
  }
  .radio_style{
    display: inline-block;
    width:50px;
    margin-left:30px;
  }
  .file_style{
    display: inline-block;
    margin-left:30px;
  }

</style>
