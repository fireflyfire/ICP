<template>
  <div class="doVip">
    <!--<form id="alipaysubmit" name="alipaysubmit" action="https://mapi.alipay.com/gateway.do?_input_charset=utf-8" method="get">
    </form>-->
    <div v-html="vhtml"></div>
  </div>
</template>
<script>
  /*var authtoken = sessionStorage.getItem('Token');
  var logintag = sessionStorage.getItem('Logintag');
  var userid = sessionStorage.getItem('Userid');
  var username = sessionStorage.getItem('Username');
  var usertype = sessionStorage.getItem('Usertype');
  var userVip =sessionStorage.getItem('VIP');
  var userType =sessionStorage.getItem('vtype');*/
  export default{
    name: 'doVip',
    data() {
      return{
        vhtml: '',
        vhtml1:'',
        v_type:sessionStorage.getItem('vtype') ,
        authtoken: sessionStorage.getItem('Token'),
      };
    },
    methods:{
      doVip(){
        console.log('v_type'+this.v_type);
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpuser/doVip?type='+this.v_type,
//          url: this.GLOBAL.url+'/app/api/icpuser/doVip?type=10',
          method: 'get',
          headers:{
            authToken: this.authtoken,
          }
        }).then( (res) =>{
//          console.log('success');
          var str = res.data.result;
//          console.log(str);
          var ss=str.split('<script>');
          this.vhtml = ss[0];
//          console.log('2:'+this.vhtml);
        }).catch( (res) =>{
//          alert('fail'+res);
          console.log(res);
          this.$message.error('网络错误！');
        })
      },
      doSecond(){
//        console.log('doSecond');
        document.forms['alipaysubmit'].submit();
      }
    },
    created(){
      this.doVip();
    },
    watch: {
      vhtml(){
        this.$nextTick(function(){
          this.doSecond();
        })
      }
    }
  }
</script>
<style>

</style>
