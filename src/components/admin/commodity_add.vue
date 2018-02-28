<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="commodity_add">
    <div class="title">
      <span class="list">添加商品信息</span>
    </div>
    <div class="content">
      <div class="content_data">
        <div class="c1">
          <span class="txt">商品名：</span>
          <input  class="Input" type="text" name="commodityName" id="commodityName">
          <span class="span" v-show="isShow1">*请输入商品名</span>
        </div>
        <div class="c1">
          <span class="txt">商品编码：</span>
          <input class="Input" type="text" name="commodityCode" id="commodityCode">
          <span class="span" v-show="isShow2">*请输入编码</span>
        </div>
        <div class="c1">
          <span class="txt">商品价格：</span>
          <input class="Input" type="text" name="commodityPrice" id="commodityPrice">
          <span class="span" v-show="isShow3">*请输入商品价格</span>
        </div>
        <div class="c1">
          <span class="txt">商品厂家：</span>
          <input class="Input" type="text" name="commodityManufacturers" id="commodityManufacturers">
        </div>
        <div class="c1">
          <span class="txt">商品电话：</span>
          <input class="Input" type="text" name="commodityPhone" id="commodityPhone">
        </div>
        <div class="c1" >
          <span class="txt">商品图片：</span>
          <input class="Input" type="file" name="commodityImg" id="commodityImg"  @change="upImg">
        </div>
        <div class="c2" >
          <span class="txt">图片预览：</span>
          <img id="goodimages" src="" alt="" width="100px">
        </div>
        <div class="c1" style="height: 300px;">
          <span class="txt">商品介绍：</span>
          <textarea  name="commodityIntro" id="commodityIntro" cols="40" rows="10"></textarea>
        </div>

        <div class="btn">
          <button @click="add_OK" class="add_btn">保存</button>
          <button @click="add_Ret" class="add_return">返回</button>
        </div>


      </div>
    </div>

  </div>
  </div>
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  import adminmain from './admin_main'

  export default {
    name: 'commodity_add',
    data() {
      return {
        isShow1: false,
        isShow2: false,
        isShow3: false,
        image: '',
        authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      upImg(file){
        var reader = new FileReader();
        reader.onload = function(e){
          var oGoodimages = document.getElementById('goodimages');
          oGoodimages.src = e.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      },
      add_OK() {
        var oName = document.getElementById('commodityName');
        var oCode = document.getElementById('commodityCode');
        var oPrice = document.getElementById('commodityPrice');
        var oManufacturers = document.getElementById('commodityManufacturers');
        var oPhone = document.getElementById('commodityPhone');
        var oImg = document.getElementById('commodityImg');
        var oIntro = document.getElementById('commodityIntro');
        var newImg = document.getElementById('goodimages');
        var img = newImg.src;
        /* 去除字符串  */
        var ss=img.split('base64,');
        var r = ss[1];

        if (oName.value == '') {
          this.isShow1 = true;
        } else {
          this.isShow1 = false;
        }
        if (oCode.value == '') {
          this.isShow2 = true;
        } else {
          this.isShow2 = false;
        }
        if (oPrice.value == '') {
          this.isShow3 = true;
        } else {
          this.isShow3 = false;
        }
        if (oName.value == '' || oCode.value == '' || oPrice.value == '') {
          return;
        }
        if(oIntro.value.length>200 ){
          alert('介绍输入太长，超出限制');
          return;
        }

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpcommodity/save',
          method: 'post',
          data: {
            tradeName: oName.value,
            commodityCode: oCode.value,
            commodityPictures: r,
            commodityPrice: oPrice.value,
            commodityIntroduction: oIntro.value,
            commodityManufacturers: oManufacturers.value,
            commodityPhone: oPhone.value,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then((res) => {
          alert('添加商品成功！');
          this.$router.push({name: 'store_manager'});
        }).catch((res) => {
//          alert('fail' );
          this.$message.error('添加失败！');
        })
      },
      add_Ret() {
        this.$router.push({name: 'store_manager'});
      },
    }
  }
</script>

<style scoped>
.admin_t{
   display: inline-block;
    width:1300px ;
    height: 1000px;
    /*border:1px solid #000;*/
    background: rgba(255,255,255,0.8);

}
.admin_part1{
  float:left;
  margin-right: 30px;
}
  .commodity_add{
    margin:0px;
    padding-top: 50px;
    height: 800px;
    width:100%;
    font-size: 0;
    /*border:1px solid #000;*/
  }
  .title {
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 25px;
    color: #444;
    text-align: left;
    /*border:1px solid red;*/
    /*border-bottom:2px solid rgb(147,153,159);*/
    /*display: inline-block;*/
  }
  .list {
    width: 50%;
    /*border: 1px solid #000;*/
    line-height: 50px;
    margin-left: 30px;
    border-bottom: 2px solid orange;
  }
  .content {
    float: left;
    font-size: 16px;
    width: 900px;
    height: 800px;
    margin-left: 30px;
    padding-top: 30px;
    /*border: 1px solid blue;*/
    border-top: 2px solid rgb(147, 153, 153);
    /*display: inline-block;*/
  }
  .content_data{
    width: 900px;
    height: 500px;
    padding-top:20px;
    /*border:1px solid #000;*/

  }
  .c1{
    width:800px;
    height:50px;
    line-height:50px;
    font-size: 16px;
    font-weight:bold;
    color: #000;
    /*border:1px solid #000;*/
    text-align: left;
    padding-left:50px;
  }
.c2{
  width:800px;
  line-height:50px;
  font-size: 16px;
  font-weight:bold;
  color: #000;
  /*border:1px solid #000;*/
  text-align: left;
  padding-left:50px;
}
  .txt{
    display: inline-block;
    width:200px;
  }
  .Input{
    width:300px;
    height: 30px;
    border-radius: 5px;
    border:1px solid rgb(153,153,153);
  }
  .btn{
    width:900px;
    height:50px;
    line-height:50px;
    margin-top:30px;
    text-align: left;
    padding-left:300px;
    /*border:1px solid #000;*/
  }
  .add_btn{
    width:150px;
    height:40px;
    line-height: 40px;
    text-align: center;
    background: rgb(66,189,251);
    color: #fff;
    font-size:18px;
    border:0;
    border-radius:5px;
    cursor: pointer;
  }
  .add_return{
    width:100px;
    height: 40px;
    line-height:40px;
    text-align: center;
    font-size:18px;
    background: rgb(185,185,185);
    color: rgb(113,113,113);
    border:0;
    border-radius:5px;
    margin-left:30px;
    cursor: pointer;
  }
  .span{
    display: inline-block;
    font-size:14px;
    font-weight:200;
    color:rgb(73,153,207);
    margin-left:30px;
  }
</style>
