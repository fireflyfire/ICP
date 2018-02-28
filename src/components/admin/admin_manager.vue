<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  
<div class="admin_manager">
    <div class="title">
      <span class="list">管理员列表</span>
    </div>
    <div class="content">
      <div class="search">
        <span class="search_text">管理员账号：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入管理员账号，20字符内">
        <button class="btn btn1" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>
        <span class="add"><router-link :to="{name: 'admin_add'}" class="btn add_admin">+添加</router-link></span>
      </div>
      <div class="search_notice" v-if="content == '' || content == null">
        <span>*没有搜索到相关信息，请重新搜索！</span>
      </div>
      <div class="content_data" v-else>
        <table cellpadding="0" cellspacing="0" border="0">
          <tr class="table_title">
            <td class="td1">序号</td>
            <td class="td1">账号</td>
            <td class="td1">类型</td>
            <!--<td class="td2"></td>-->
            <td class="td2"></td>
            <!--<td class="td2"></td>-->
          </tr>
          <tr class="table_data " v-for="(item,index) in content">
            <td class="td1 td4">
              {{ index + 1 + (page - 1) * pageSize }}
            </td>
            <td class="td1 td4">
              {{item.username}}
            </td>
            <td class="td1 td4">
              {{item.adminType == 1 ? '系统管理员' : '其他管理员'}}
            </td>
            <!--<tr  class="table_data " >
              <td></td>
              <td></td>
              <td></td>-->
           <!-- <td class="td2">
              <button class="btn_update" @click="update(item)">编辑</button>
            </td>-->

            <td class="td2">
              <button class="btn_del1" @click="up_admin(item)" v-if="item.active== false">启用</button>
              <button class="btn_del2" @click="delete_admin(item)" v-else>禁用</button>
            </td>

          </tr>
        </table>
        <div class="page">
          <ul>
            <li v-if="page>1"><a @click="pageClick(0)">首页</a></li>
            <li v-if="page==1"><a class="banclick">首页</a></li>
            <li v-if="page>1"><a @click="pageClick(1)">上一页</a></li>
            <li v-if="page==1"><a class="banclick">上一页</a></li>
            <li v-if="pages<6">
          <span class="page_style" v-for="index in pages" :class="{ 'active': page == index }">
           <a @click="btnClick(index)">{{ index }}</a>
          </span>
            </li>
            <li v-else>
          <span class="page_style" :class="{ 'active': page == 1 }">
            <a @click="btnClick(1)" >1</a>
          </span>
              <span v-if="page>0 && page<4">
            <span class="page_style" :class="{ 'active': page == 2 }">
              <a @click="btnClick(2)" >2</a>
            </span>
            <span class="page_style" :class="{ 'active': page == 3 }">
              <a @click="btnClick(3)" >3</a>
            </span>
          </span>
              <span v-if="page>3">
            <span class="page_style">
            ...
            </span>
            <span v-if="page<pages-2 && page>3">
              <span class="page_style">
                <a @click="btnClick(page-1)">{{ page - 1 }}</a>
              </span>
              <span class="page_style" :class="{ 'active': page == page }">
                <a @click="btnClick(page)" >{{ page }}</a>
              </span>
              <span class="page_style">
               <a @click="btnClick(page+1)">{{ page + 1 }}</a>
              </span>
            </span>
            <span v-else>
              <span class="page_style" :class="{ 'active': page == pages-2 }">
                <a @click="btnClick(pages-2)" >{{ pages - 2 }}</a>
              </span>
              <span class="page_style" :class="{ 'active': page == pages-1 }">
                <a @click="btnClick(pages-1)" >{{ pages - 1 }}</a>
              </span>
            </span>

          </span>

              <span class="page_style" v-if="page+2<pages">
            ...
          </span>
              <span class="page_style" :class="{ 'active': page == pages }">
            <a @click="btnClick(pages)" >{{ pages }}</a>
          </span>
            </li>
            <li v-if="page!=pages"><a @click="pageClick(2)">下一页</a></li>
            <li v-if="page==pages"><a class="banclick">下一页</a></li>
            <li v-if="page!=pages"><a @click="pageClick(3)">末页</a></li>
            <li v-if="page==pages"><a class="banclick">末页</a></li>
            <li>
              <input class="input_style" type="text" v-model="Tpage">
            </li>
            <li><a @click="TpageClick(Tpage)">跳转</a></li>
            <li><a>共<i>{{ pages }}</i>页</a></li>
          </ul>

        </div>
      </div>
    </div>

  </div>
</div>
 
</template>

<script>
  // var authtoken = sessionStorage.getItem('Token');
  import { textNumber1, textNumber2 } from '../ut/textNumber'
  import adminmain from './admin_main'
  
  export default {
    name: 'admin_manager',
    data() {
      return {
        content: [],
        total: '',
        pages: '',
        page: 1,
        pageSize: 5,
        Tpage: 1,
        upShow: false,
        update_data: [],
        isShow1: false,
        returnShow: false,
        searchShow: false,
        searchName: '',
        authtoken: sessionStorage.getItem('Token'),
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      getData(v_page, v_pageSize,v_searchname) {
        var oUrl = '';
        if(v_searchname == ''){
          oUrl = this.GLOBAL.url+'/app/api/admin/findAdminUser?page=' + v_page + '&pageSize='
            + v_pageSize;
        }else{
          oUrl = this.GLOBAL.url+'/app/api/admin/findAdminUser?page=' + v_page + '&pageSize='
            + v_pageSize +'&username='+ v_searchname;
        }
        this.$ajax({
          url: oUrl ,
          method: 'get',
          headers: {
            authToken: this.authtoken,
          }
        }).then((res) => {
          this.content = res.data.results;
          this.total = res.data.total;
          this.pages = res.data.pages;
        }).catch((res) => {
//          alert('数据错误！');

//        this.$router.push('../admin_login');
          this.$message.error('网络错误！');
        })
      },
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
          return;
        }
        if(oSearchname.value.length>20){
          alert('输入太长，超出限制');
          return;
        }
        this.searchName = oSearchname.value;
        this.page =1;
        this.returnShow =true;
        this.getData(this.page,this.pageSize,this.searchName);
//        alert(this.total);
        if(this.total == 0){
          this.searchShow = true;
        }else{
          this.searchShow = false;
        }

      },
      return_main(){
        this.returnShow = false;
        this.searchName = '';
        this.page =1;
        var oSearchname = document.getElementById('search_key');
        oSearchname.value = '';
        this.getData(this.page,this.pageSize,this.searchName);
      },
      update(item) {
        this.upShow = true;
        this.update_data = item;
      },
      updateOK(){
        var oNewpsw = document.getElementById('newPsw');
        var oNewtype = document.getElementById('new_type');
        if(oNewpsw.value == ''){
          this.isShow1 =true;
          return;
        }
        this.$ajax({
          url: this.GLOBAL.url+'/app/api/admin/edit',
          method: 'post',
          data: {
            id: this.update_data.id,
            username: this.update_data.username,
            password: oNewpsw.value,
            adminType: oNewtype.value,
          },
          headers: {
            authToken: this.authtoken,
          },
        }).then( (res) => {
          alert('修改管理员成功！');
          this.upShow=false;
          oNewpsw.value=null;
          this.page=1;
          this.getData(this.page, this.pageSize,this.searchName);
          this.$router.push({name: 'admin_manager'});
        }).catch( (res) =>{
//          alert('fail'+res);
          this.$message.error('修改失败！');
        })


      },
      updateReturn(){
        this.upShow=false;
        this.isShow1=false;
        this.$router.push('../admin_main/admin_manager');
      },
      up_admin(item) {

        if (confirm('你确定要启用该管理员吗?')) {
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/admin/delete?Id=' + item.id+ '&status=true',
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then((res) => {
            alert("管理员启用成功！");
            this.getData(this.page, this.pageSize,this.searchName);
            // this.$router.push({name: 'admin_manager'});
            this.$router.go(0);
          }).catch((res) => {
//            alert("管理员删除失败！");
            this.$message.error('启用失败！');
          })

        } else {

        }
      },
      delete_admin(item) {

        if (confirm('你确定要禁用该管理员吗?')) {
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/admin/delete?Id=' + item.id + '&status=false',
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then((res) => {
            alert("管理员信息禁用成功！");
            // this.$router.push({name: 'admin_manager'});

            this.$router.go(0);
          }).catch((res) => {
//            alert("管理员删除失败！");
            this.$message.error('禁用失败！');
          })

        } else {

        }
      },
      pageClick(v) {
        if (v == 0) {
          this.page = 1;
        }
        if (v == 1) {
          this.page--;
        }
        if (v == 2) {
          this.page++;
        }
        if (v == 3) {
          this.page = this.pages;
        }
      },
      btnClick(v_page) {
        var page = parseInt(v_page);
        if (page != this.page) {
          this.page = page;
        }
      },
      TpageClick(Tpage){
        var page = parseInt(Tpage);
        if(page > this.pages || page < 1){
          alert('超出页码范围！');
          return;
        }
        this.btnClick(page);

      },

    },
    watch: {
      page() {
        this.getData(this.page, this.pageSize,this.searchName);
      }
    },
    created() {

      this.getData(this.page, this.pageSize,this.searchName);
    },

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
  .admin_manager {
    /*border:1px solid #000;*/
    padding-top: 50px;
    height: 100%;
    width: 100%;
    font-size: 0;
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

  .search {
    /*float: left;*/
    height: 40px;
    width: 900px;
    line-height: 40px;
    margin-left: 10px;
    text-align:left;

  }

  .search_text {
    font-size: 15px;
    color: #000;
    margin-left:10px;
  }

  .search_input {
    height: 35px;
    border: 1px solid rgba(146, 146, 146, 0.4);
    border-radius: 5px;
    margin-right: 30px;
  }
  .add{
    display:inline-block;
    width:100px;
    height:35px;
    line-height:35px;
    color:#fff;
    background: rgb(66, 189, 251);
    border: 1px solid rgb(66, 189, 251);
    border-radius: 5px;
    text-align: center;
    margin-left: 100px;
  }
  .btn {
    height: 35px;
    width: 80px;
    color: #fff;
    cursor: pointer;
    /*border:1px solid rgb(66,189,251);*/
    border: 0;
    border-radius: 5px;
  }
  .btn1{
    background:rgb(153,153,153);
  }
  .btn1:hover{
    background:rgb(120,120,120) ;
  }
  .add_admin a:hover {
    background: rgb(84, 167, 241);
  }

  .add_admin {
    line-height: 35px;
    margin-left: 10px;
    color: #fff;
    cursor: pointer;

  }
  .search_notice{
    color: red;
    font-size:18px;
    margin-top: 20px;
  }
  .return_main{
    height: 35px;
    width: 80px;
    color: #fff;
    cursor: pointer;
    /*border:1px solid rgb(66,189,251);*/
    border: 0;
    border-radius: 5px;
    background:rgb(168,168,168);
    margin-left:10px;
  }
  .content_data {
    margin: 20px 10px 0 10px;
    /*border:1px solid #000;*/
    text-align: left;
    position: relative;
  }

  .table_title {
    background: rgba(173, 173, 173, 0.3);
  }

  .table_data {
    border: 1px dashed rgb(134, 134, 134);
    line-height: 50px;
    height: 50px;
  }

  .td1 {
    width: 360px;
    height: 40px;
    line-height: 40px;
    color: #000;
    padding-left: 10px;

  }

  .td2 {
    width: 150px;
  }

 .btn_del1,.btn_del2 {
    width: 50px;
    height: 30px;
    margin-top: 10px;
    font-size: 14px;
    border-radius: 5px;



    cursor: pointer;
  }
 .btn_del2{
   color: red;
   background: rgba(255, 255, 255, 0);
   border: 1px solid red;
 }
 .btn_del1{
   color:#42d885;
   background: rgba(255, 255, 255, 0);
   border: 1px solid #42d885;

 }


  .update_intro {
    display: inline-block;
    width: 400px;
    height: 400px;
    position: absolute;
    border: 1px solid rgb(200,200,200);
    border-radius: 8px;
    top: 100px;
    left: 200px;
    z-index: 100;
    padding-top:50px;
    padding-left:30px;
    background:rgba(125,125,125,0.8);
  }

  .ud{
    height:40px;
    line-height: 40px;
    margin-top: 20px;
    font-size: 20px;
    color: #fff;
  }
  .ud_1{
    height:40px;
    line-height: 40px;
    margin-top:80px;
    font-size: 20px;
    color: #fff;
  }
  .Input{
    height:30px;
    width:200px;
    line-height:30px;
  }

  .txt{
    display: inline-block;
    font-weight:bold;
    width:150px;
    text-align: left;
  }
  .update_OK{
    width:100px;
    height:40px;
    background: rgb(66,189,251);
    border-radius:5px;
    border:0;
    margin-left:20px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .update_return{
    width:100px;
    height:40px;
    background: rgba(255,255,255,0.5);
    border-radius:5px;
    border:0;
    margin-left:100px;
    color: rgb(153,153,153);
    font-size: 16px;
    cursor: pointer;
  }

  .btn_del {
    border: 1px solid red;
    color: red;
  }

  .btn_del:hover {
    background: red;
    color: #fff;
  }

  .td3 {
    float: right;
    /*padding-right:100px;*/
  }

  .td4 {
    color: rgb(130, 130, 130);
  }

  .page {
    float: right;
    margin-top: 50px;
    margin-right: 50px;
    width: 100%;
    height: 60px;

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

  .page_style {
    display: inline-block;
    width: 30px;
    height: 25px;
    float: left;
    /*border:1px solid #000;*/
    /*margin:0 5px;*/
  }
  .input_style{
    width:35px;
    height:25px;
    line-height:25px;
    border: 1px solid rgb(153,153,153);
    margin-top: -10px;
    margin-left: 5px;
    margin-right:5px;
    background: rgba(153,153,153,0.4);
  }

  .span{
    display: inline-block;
    font-size:14px;
    font-weight:200;
    color:red;
    margin-left:30px;
  }

</style>
