<template>
  <div class="footer">
    <div class="part1">
      <span class="txt1">关于我们</span>
      <span class="txt2">about us</span>
      <span class="style_1">
        <a href="/introduction">公司简介</a>
      </span>
    </div>
    <div class="part2">
      <span class="txt1">客服热线</span>
      <span class="txt2">customer service</span>
      <span class="style_2">
        <span class="s1">400-080-8820</span>
        <span class="s2">周一至周五（8:30-18:00）</span>
        <span class="s3">周六至周末（9:30-18:00）</span>
      </span>
    </div>
    <div class="part3">
      <span class="txt1">微信关注</span>
      <span class="txt2">wechat</span>
      <span class="style_3">
        <img class="image" src="http://uyi.uyidoctor.com/assets/a8a337e3865292e914ad4d24d93ccb52.png" alt="">
      </span>
    </div>
    <div class="part4">
      <span class="txt1">优医用户下载</span>
      <span class="txt2">user app</span>
      <span class="style_4">
         <img class="image" src="http://uyi.uyidoctor.com/assets/237fccb11d2685e57c842bff09845fdf.png" alt="">
      </span>
    </div>
    <div class="part5">
      <span class="txt1">优医医生下载</span>
      <span class="txt2">doctor app</span>
      <span class="style_5">
         <img class="image" src="http://uyi.uyidoctor.com/assets/f5f1eaea8e534428de9a7dcf61bd7e51.png" alt="">
      </span>
    </div>
    <div class="part6">
      <span>深圳优医汇技术有限公司 版权所有 Copyright © 2015-2017 All Rights Reserved <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备15062279号-1</a> 电话400-080-8820
      <br>
        公司注册地址：深圳市罗湖区莲塘街道国威路雍翠豪园C栋5B
      </span>
    </div>
  </div>

</template>

<script>
  export default{
    name: 'footer',
    data() {
      return{

      };
    }
  }
</script>

<style scoped>
  .footer{
    width:1340px;
    height:350px;
    /*border:1px solid #000;*/
    /*margin-left:-70px;*/
    background: rgba(68,68,68,1);
    color: #fff;

  }
  .part1,.part2,.part3,.part4,.part5{
    width:200px;
    height:250px;
    /*border: 1px solid #fff;*/
    float: left;
    margin:20px 20px;
  }
  .part1{
    margin-left:70px;
  }
  .part5{
  }
  .part6{
    display: inline-block;
    width:1340px;
    /*height:40px;*/
    line-height:40px;
    font-size: 14px;
    background: rgb(40,40,40);
    /*border:1px solid #000;*/
    margin-top:19px;
  }
  .txt1{
    display: inline-block;
    width:200px;
    height:50px;
    line-height:50px;
    font-size:20px;
    /*line-height:250px;*/

  }
  .txt2{
    display: inline-block;
    width:200px;
    height:30px;
    line-height:30px;
    font-size:12px;
    margin-bottom:20px;
  }
  .style_1{
    font-size:14px;
  }

  .style_2{

  }
  .s1{
    display: inline-block;
    width:200px;
    height:30px;
    line-height: 30px;
    font-size:20px;
  }
  .s2,.s3{
    display: inline-block;
    width:200px;
    height:30px;
    line-height:30px;
    font-size:14px;
    margin-top:10px;
  }

  .image{
    width:100px;
    height:100px;
  }
  a:link,a:hover,a:visited{
    color: #fff;
  }
</style>
