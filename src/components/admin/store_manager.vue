<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="store_manager">
    <div class="title">
      <span class="list">药品管理</span>
    </div>
    <div class="content">
      <div class="search">
        <span class="search_text">药品关键字：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入搜索关键字，20字符内">
        <button class="btn btn1" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>
        <span class="add"><router-link :to="{name: 'commodity_add'}" class="btn add_admin">+添加</router-link></span>
      </div>

      <div class="content_data">
      <div class="search_notice" v-if="content =='' || content == null">
          <span>*没有搜索到相关信息，请重新搜索！</span>
        </div>
        <div class="commodity">
          <div class="commodity_one" v-for="item in content">
            <span class="img">
              <img :src="item.commodityPictures" width="150" height="150">
            </span>
            <span class="intro">
              <span class="total_name" :title="item.tradeName">
                <span class="ss">药品名：</span>{{ item.tradeName }}
              </span>
              <span class="total code" :title="item.commodityCode">
                <span class="ss">药品编码：</span>{{ item.commodityCode }}</span>
              <span class="total price" :title="item.commodityPrice">
                <span class="ss">药品价格：</span>{{ item.commodityPrice }}</span>
              <span class="total manufacturers" :title="item.commodityManufacturers">
                <span class="ss">药品厂家：</span>{{ item.commodityManufacturers }}</span>
              <span class="total introduction" :title="item.commodityIntroduction">
                <span class="ss">药品介绍：</span>{{ item.commodityIntroduction }}</span>
              <span class="total time" :title="item.releaseTime">
                <span class="ss">发布时间：</span>{{ item.releaseTime }}</span>
              <span class="total phone" :title="item.commodityPhone">
                <span class="ss">厂家电话：</span>{{ item.commodityPhone }}</span>
            </span>
            <span class="button">
              <button class="update" @click="update_commodity(item)">编辑</button>
              <button class="delete" @click="delete_commodity(item)">删除</button>
            </span>
          </div>
        </div>


        <el-dialog title="药品详细" :visible.sync="upShow" >
          <el-row style="text-align:left; margin-left:50px;">
            <el-col :span="24">
              <span class="txt">药品名：</span>
              <input class="Input" type="text" :value="update_data.tradeName"
                     id="newName" name="newName">
              <span class="span" v-show="isShow1">*请输入药品名</span>
            </el-col>

            <el-col :span="24">
              <span class="txt">药品编码：</span>
              <input class="Input" type="text" :value="update_data.commodityCode"
                     id="newCode" name="newCode">
              <span class="span" v-show="isShow2">*请输入药品编码</span>
            </el-col>
            <el-col :span="24">
              <span class="txt">药品价格：</span>
              <input class="Input" type="text" :value="update_data.commodityPrice"
                     id="newPrice" name="newPrice">
              <span class="span" v-show="isShow3">*请输入药品价格</span>
            </el-col>
            <el-col :span="24" >
              <span class="txt">药品厂家：</span>
              <input class="Input" type="text" :value="update_data.commodityManufacturers"
                     id="newManufacturers" name="newManufacturers">
            </el-col>
            <el-col :span="24" >
              <span class="txt">厂家电话：</span>
              <input class="Input" type="text" :value="update_data.commodityPhone"
                     id="newPhone" name="newPhone">
            </el-col>
            <el-col :span="24" >
              <span class="txt">发布时间：</span>
              <input class="Input" type="text" :value="update_data.releaseTime"
                     id="newTime" name="newTime">
            </el-col>
            <el-col :span="24" >
              <span class="txt">药品图片：</span>
              <input class="Input" type="file" id="newImg" name="newImg" @change="upImg">
            </el-col>
            <el-col :span="24">
              <span class="txt">图片预览：</span>
              <img id="goodimages" :src="update_data.commodityPictures" alt="" width="100px">
            </el-col>
            <el-col :span="24" >
              <span class="txt">药品介绍：(200字符内)</span>
              <textarea class="textarea_style"  name="newIntro" id="newIntro" cols="30" rows="5">
              {{update_data.commodityIntroduction}}
            </textarea>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
         <el-button @click="updateReturn()">取 消</el-button>
         <el-button type="primary" @click="updateOK()">确 定</el-button>
         </span>
        </el-dialog>
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
  import adminmain from './admin_main'

  export default {
    name: 'store_manager',
    data() {
      return {
        content: [],
        total: '',
        pages: '',
        page: 1,
        pageSize: 3,
        Tpage: 1,
        upShow: false,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        update_data: [],
        searchShow: false,
        searchName: '',
        returnShow: false,
        image:'',
          authtoken: sessionStorage.getItem('Token'),
//        introShow: false,
      };
    },
    components: {
      'v-main':adminmain,
    },
    methods: {
      getData(v_page, v_pageSize,v_searchname) {
        var oUrl = '';
        if(v_searchname == ''){
          oUrl = this.GLOBAL.url+'/app/api/icpcommodity/findCommodityList?page=' + v_page + '&pageSize='
            + v_pageSize ;
        }else{
          oUrl = this.GLOBAL.url+'/app/api/icpcommodity/findCommodityList?page=' + v_page + '&pageSize='
            + v_pageSize +'&name='+ v_searchname;
        }
        this.$ajax({
          url: oUrl,
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
      textNumber1(text){
        if(text.length>20) {
          alert('输入太长，超出限制！');
          return;
        }
      },
      textNumber2(text){
        if(text.length>200) {
          alert('输入太长，超出限制！');
          return;
        }
      },
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
          return;
        }
        this.textNumber1(oSearchname.value);
        this.searchName = oSearchname.value;
        this.page =1;
        this.returnShow =true;
        this.getData(this.page,this.pageSize,this.searchName);
        if(this.content == ''){
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
      update_commodity(item){
        this.update_data = item;
        this.upShow = true;
      },
      upImg(file){
        var reader = new FileReader();
        reader.onload = function(e){
          var oGoodimages = document.getElementById('goodimages');
          oGoodimages.src = e.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      },
      updateOK(){
        var newName = document.getElementById('newName');
        var newCode = document.getElementById('newCode');
        var newPrice = document.getElementById('newPrice');
        var newManufacturers = document.getElementById('newManufacturers');
        var newPhone = document.getElementById('newPhone');
        var newTime = document.getElementById('newTime');
        var newImg = document.getElementById('goodimages');
        var newIntro = document.getElementById('newIntro');

        var img = newImg.src;
        /* 去除字符串  */
        var ss=img.split('base64,');
        var r = ss[1];

        if(newName.value == ''){
          this.isShow1 = true;
        }else{
          this.isShow1 = false;
        }
        if(newCode.value == ''){
          this.isShow2 = true;
        }else{
          this.isShow2 = false;
        }
        if(newPrice.value == ''){
          this.isShow3 = true;
        }else{
          this.isShow3 = false;
        }

        if(newName.vlue=='' || newCode.value=='' || newPrice.value==''){
          return;
        }
        this.textNumber2(newIntro.value);

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icpcommodity/edit',
          method: 'post',
          data:{
            id: this.update_data.id,
            tradeName: newName.value,
            commodityCode: newCode.value,
            commodityPictures: r,
            commodityPrice: newPrice.value,
            commodityIntroduction: newIntro.value,
            commodityManufacturers: newManufacturers.value,
            releaseTime: newTime.value,
            commodityPhone: newPhone.value,
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) =>{
          alert('修改药品信息成功！');
          this.$router.go(0);
          // this.$router.push({name: 'store_manager'});
        }).catch( (res) =>{
//          alert('修改商品信息失败！'+res);
          this.$message.error('修改药品信息失败！');
        })

      },
      updateReturn(){
        this.upShow=false;
        this.isShow1=false;
        this.isShow2=false;
        this.isShow3=false;
        var oGoodimages = document.getElementById('goodimages');
        oGoodimages.src = this.update_data.commodityPictures;
        var oNewimg = document.getElementById('newImg');
        oNewimg.value = '';
        this.$router.push({name: 'store_manager'});
      },
      delete_commodity(item){
        if(confirm('你确定要删除此药品信息吗?')){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icpcommodity/delete?id='+item.id,
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then( (res) => {
            alert("药品信息删除成功！");
            this.$router.go(0);
            // this.$router.push({name: 'store_manager'});
          }).catch( (res) => {
//            alert("商品信息删除失败！"+res);
            this.$message.error('药品信息删除失败！');
          })
        }else{

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
      /*alert(this.page);
      getData(this.page,this.pageSize);*/
      this.getData(this.page, this.pageSize,this.searchName);
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
  .store_manager{
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
  .content_data{
    margin: 50px 10px 0 10px;
    height:700px;
    /*border:1px solid #000;*/
    text-align: left;
    position:relative;
  }

  .commodity{
    height: 600px;
    /*border: 1px solid #000;*/
  }
  .commodity_one{
    width:250px;
    height:480px;
    float:left;
    margin-top:30px;
    margin-left: 10px;
    margin-right:30px;
    padding-top:20px;
    background: rgba(173,173,173,0.4);
    border-radius:7px;
    /*border:1px solid #000;*/
  }
  .img{
    display: inline-block;
    width:150px;
    height:150px;
    margin:0 45px;
    /*border:1px solid red;*/
    background: url('../../assets/goods_1.png');
    background-size:150px 150px ;
  }
  .intro{
    display: inline-block;
    margin-top:10px;
  }
  .ss{
    display: inline-block;
    width:100px;
    color: rgb(110,110,110);
    font-size: 16px;
    margin-right:5px;
  }
  .total{
    display: inline-block;
    width: 200px;
    height:30px;
    line-height:30px;
    text-align: left;
    padding-left:15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size:12px;
  }
  .total_name{
    color: red;
    font-size:14px;
    display: inline-block;
    width: 230px;
    height:30px;
    line-height:30px;
    text-align: left;
    padding-left:15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;

  }
  .button{
    display: inline-block;
    width: 200px;
    height:30px;
    line-height:30px;
    margin-top:20px;
    padding-left:10px;
  }
  .update{
    width: 70px;
    height: 25px;
    line-height: 25px;
    background: rgba(255,255,255,0);
    color: rgb(35,198,226);
    border:1px solid rgb(35,198,226);
    border-radius:6px;
    vertical-align: middle;
    cursor: pointer;
    margin:0 20px;
  }
  .update:hover{
    background: rgb(35,198,226);
    color: #fff;
  }
  .delete{
    width: 70px;
    height: 25px;
    line-height: 25px;
    background: rgba(255,255,255,0);
    color: rgb(48,214,106);
    border:1px solid rgb(48,214,106);
    border-radius:6px;
    vertical-align: middle;
    cursor: pointer;

  }
  .delete:hover{
    background: rgb(48,214,106);
    color: #fff;
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

  .update_intro {
    display: inline-block;
    width: 500px;
    height: 550px;
    position: absolute;
    border: 1px solid rgb(200,200,200);
    border-radius: 8px;
    top: 50px;
    left: 100px;
    z-index: 100;
    padding-top:30px;
    padding-left:80px;
    background:rgba(125,125,125,0.8);
  }

  .ud{
    height:30px;
    line-height:30px;
    margin-top: 20px;
    font-size: 16px;
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
    margin: 15px 0;
  }
  .update_OK{
    width:100px;
    height:40px;
    background: rgb(66,189,251);
    border-radius:5px;
    border:0;
    margin-left:30px;
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
    margin-left:130px;
    color: rgb(153,153,153);
    font-size: 16px;
    cursor: pointer;
  }

  .textarea_style{
    width:200px;
    height:80px;
    color:#000;
    font-size:12px;
  }
</style>
