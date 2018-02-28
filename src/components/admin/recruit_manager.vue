<template>
<div class="admin_t">
<div class="admin_part1">
  <v-main></v-main>
</div>
  <div class="recruit_manager">
    <div class="title">
      <span class="list">招聘管理</span>
    </div>
    <div class="content">
      <div class="search">
        <span class="search_text">职位关键字：</span>
        <input type="text" class="search_input" name="search_key" id="search_key" size="20"
               placeholder="请输入职位名称">
        <button class="btn" @click="search()">搜索</button>
        <button class="return_main" v-show="returnShow" @click="return_main()">返回主列表</button>
        <span class="add"><router-link :to="{name: 'recruit_add'}" class="add_admin">+添加</router-link></span>
      </div>
      <div class="content_data">

        <div class="recruit" v-show="reShow">
          <div class="recruit_title">
            <span class="total title_name">职位名称</span>
            <span class="total title_cname" style="width: 200px;padding:5px;">公司名称</span>
            <span class="total title_money">薪资</span>
            <span class="total title_time">发布时间</span>
          </div>
          <div class="search_notice" v-if="content == '' || content == null">
            <span>*没有搜索到相关信息，请重新搜索！</span>
          </div>
          <div class="recruit_one" v-for="item in content">
            <span class="total work_name">
              {{ item.position }}
            </span>
            <span class="total company_name" style="width: 200px;padding:5px;">
              {{ item.companyName }}
            </span>
            <span v-if="item.salary" class="total work_money">
              ￥{{ item.salary }}
            </span>
            <span class="total work_money" v-else>
              {{ item.salary }}
            </span>

            <span class="total releaseTime">
              {{ item.releaseTime }}
            </span>
            <span class="more">
              <span class="click_more" @click="more(item)">了解详情</span>
            </span>
          </div>
        </div>

        <div class="one_more" v-show="oneShow">
          <div class="table">
            <div class="table_title">
              <span class="table_total">职位名称</span>
              <span class="table_total">公司名称</span>
              <span class="table_total">工作地点</span>
              <span class="table_total">薪资</span>
              <span class="table_total">发布时间</span>

            </div>
            <div class="table_data">
              <span class="table_total"  style="line-height:30px; overflow: hidden;">{{ more_data.position }}</span>
              <span class="table_total" style="line-height:30px; overflow: hidden;" >{{ more_data.companyName }}</span>
              <span class="table_total">{{ more_data.workPlace }}</span>
              <span class="table_total">{{ more_data.salary }}</span>
              <span class="table_total">{{ more_data.releaseTime }}</span>

            </div>
            <div class="table_title" >
              <span class="table_total_2">招聘人数</span>
              <span class="table_total_2">学历</span>
              <span class="table_total_2">经验</span>
              <span class="table_total_2">是否全职</span>
              <span class="table_total_2">联系人</span>
              <span class="table_total_2">联系人电话</span>
            </div>
            <div class="table_data">
              <span class="table_total_2">{{ more_data.theNumberOf }}</span>
              <span class="table_total_2" style="line-height:30px;" >{{ more_data.education }}</span>
              <span class="table_total_2">{{ more_data.experience }}</span>
              <span class="table_total_2">{{ more_data.fullTime }}</span>
              <span class="table_total_2">{{more_data.contacts}}</span>
              <span class="table_total_2">{{more_data.phone}}</span>
            </div>
            <div class="table_data2">
              <span class="table_require">职位介绍</span>
              <span class="table_r" style="font-size:12px; text-overflow: ellipsis;">
                {{ more_data.postResponsibility1}}<br>
                {{ more_data.postResponsibility2}}<br>
                {{ more_data.postResponsibility3}}<br>
                {{ more_data.postResponsibility4}}<br>
                {{ more_data.postResponsibility5}}
              </span>
            </div>
            <div class="table_data2">
              <span class="table_require">职位要求</span>
              <span class="table_r" style="font-size:12px;text-overflow: ellipsis">
                {{ more_data.jobRequirements1}}<br>
                {{ more_data.jobRequirements2}}<br>
                {{ more_data.jobRequirements3}}<br>
                {{ more_data.jobRequirements4}}<br>
                {{ more_data.jobRequirements5}}
              </span>
            </div>
          </div>
          <div class="button">
            <button class="btn1" @click="update()">修改</button>
            <button class="btn2" @click="Delete()">删除</button>
            <button class="btn3" @click="Return()">返回</button>
          </div>
        </div>


        <el-dialog title="招聘详细" :visible.sync="dialogVisible" >
          <el-row >
            <el-col :span="24">
              <span class="text_1">职位名称：</span>
              <input class="input_1" type="text" v-model="position">
              <span class="span">*</span>
            </el-col>
            <el-col :span="24">
              <span class="text_1">公司名称：</span>
              <input class="input_1" type="text" v-model="companyName">
              <span class="span">*</span>
            </el-col>
            <el-col :span="12">
              <span  class="text_2">工作地点：</span>
              <input class="input_2" type="text" v-model="workPlace" >
              <span class="span">*</span>
            </el-col>
            <el-col :span="12">
              <span class="text_2">薪资：</span>
              <input class="input_2" type="text" v-model="salary">
              <span class="span">*</span>
            </el-col>
            <el-col :span="12">
              <span class="text_2">招聘人数：</span>
              <input class="input_2" type="text" v-model="number">
              <span class="span">*</span>
            </el-col>
            <el-col :span="12">
              <span class="text_2">是否全职：</span>
              <span v-if="select=='全职'"><input  type="radio" name="quan" value="全职"  checked>是</span>
              <span v-else><input  type="radio" name="quan" value="全职">是</span>
              <span v-if="select=='非全职'"><input type="radio" name="quan" value="非全职"  checked >否</span>
              <span v-else><input type="radio" name="quan" value="非全职" >否</span>
            </el-col>
            <el-col :span="12">
              <span class="text_2">学历：</span>
              <input class="input_2" type="text" v-model="education">
            </el-col>
            <el-col :span="12">
              <span class="text_2">经验：</span>
              <input class="input_2" type="text" v-model="experience">
            </el-col>
            <el-col :span="12">
              <span class="text_2">联系人：</span>
              <input class="input_2" type="text" v-model="contacts">
            </el-col>
            <el-col :span="12">
              <span class="text_2">联系人电话：</span>
              <input class="input_2" type="text" v-model="phone">
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
            <div class="text_1">职位介绍</div>
            <el-col :span="24" class="col">
              1.<input class="input_3" type="text" v-model="post1"><span class="span">*</span>
            </el-col>
            <el-col :span="24" class="col">
              2.<input class="input_3" type="text" v-model="post2">
            </el-col>
            <el-col :span="24" class="col">
              3.<input class="input_3" type="text" v-model="post3">
            </el-col>
            <el-col :span="24" class="col">
              4.<input class="input_3" type="text" v-model="post4">
            </el-col>
            <el-col :span="24" class="col">
              5.<input class="input_3" type="text" v-model="post5">
            </el-col>
          </el-row>
          <el-row style="margin-top:20px;">
            <div class="text_1">职位要求</div>
            <el-col :span="24"  class="col">
              1.<input class="input_3" type="text" v-model="req1"><span class="span">*</span>
            </el-col>
            <el-col :span="24"  class="col">
              2.<input class="input_3" type="text" v-model="req2">
            </el-col>
            <el-col :span="24"  class="col">
              3.<input class="input_3" type="text" v-model="req3">
            </el-col>
            <el-col :span="24"  class="col">
              4.<input class="input_3" type="text" v-model="req4">
            </el-col>
            <el-col :span="24"  class="col">
              5.<input class="input_3" type="text" v-model="req5">
            </el-col>
          </el-row>
          <span style="font-size:12px;color:red;" v-show="isShow">*请填写完整信息</span>
           <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="updateOK()">确 定</el-button>
           </span>
        </el-dialog>




        <div class="page" v-show="page_show">
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
    name: 'recruit_manager',
    data() {
      return {
        content: [],
        pages: '',
        total: '',
        page: 1,
        pageSize: 8,
        Tpage: 1,
        more_data: [],
        reShow: true,
        oneShow: false,
        updateShow: false,
        isShow1: false,
        isShow2: false,
        isShow3: false,
        isShow4: false,
        searchShow: false,
        searchName: '',
        returnShow: false,
        page_show: true,
        dialogVisible: false,
        recruitid: '',
        position:'',
        companyName:'',
        workPlace:'',
        salary: '',
        select: '',
        number: '',
        education: '',
        experience: '',
        contacts: '',
        phone: '',
        post1: '',
        post2: '',
        post3: '',
        post4: '',
        post5: '',
        req1: '',
        req2: '',
        req3: '',
        req4: '',
        req5: '',
        isShow: false,
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
          oUrl =this.GLOBAL.url+'/app/api/icprecruitment/findRecruitment?page=' + v_page + '&pageSize='
            + v_pageSize ;
        }else{
          oUrl = this.GLOBAL.url+'/app/api/icprecruitment/findRecruitment?page=' + v_page + '&pageSize='
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
      search(){
        var oSearchname = document.getElementById('search_key');
        if(oSearchname.value == ''){
          alert('请输入搜索关键字！');
          return;
        }
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
      more(item) {
        this.more_data = item;
        this.reShow = false;
        this.oneShow = true;
        this.page_show = false;

      },
      update(){
//        this.oneShow = false;
//        this.updateShow = true;
        this.dialogVisible = true;
        this.recruitid = this.more_data.id;
        this.position = this.more_data.position;
        this.companyName = this.more_data.companyName;
        this.workPlace = this.more_data.workPlace;
        this.salary = this.more_data.salary;
        this.number = this.more_data.theNumberOf;
        this.select = this.more_data.fullTime;
        this.education = this.more_data.education;
        this.experience = this.more_data.experience;
        this.contacts = this.more_data.contacts;
        this.phone = this.more_data.phone;
        this.post1 = this.more_data. postResponsibility1;
        this.post2 = this.more_data. postResponsibility2;
        this.post3 = this.more_data. postResponsibility3;
        this.post4 = this.more_data. postResponsibility4;
        this.post5 = this.more_data. postResponsibility5;
        this.req1 = this.more_data.jobRequirements1;
        this.req2 = this.more_data.jobRequirements2;
        this.req3 = this.more_data.jobRequirements3;
        this.req4 = this.more_data.jobRequirements4;
        this.req5 = this.more_data.jobRequirements5;
      },
      Return(){
        this.reShow = true;
        this.oneShow = false;
        this.dialogVisible = false;
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = false;
        this.isShow4 = false;
        this.page_show = true;
      },
      Delete(){
        if(confirm('你确定要删除此招聘信息吗?')){
          this.$ajax({
            url: this.GLOBAL.url+'/app/api/icprecruitment/delete?id='+this.more_data.id,
            method: 'get',
            headers: {
              authToken: this.authtoken,
            }
          }).then( (res) => {
            alert("招聘信息删除成功！");
           this.$router.push({name: 'recruit_manager'});
            this.page = 1;
            this.getData(this.page, this.pageSize,this.searchName);
          }).catch( (res) => {
//            alert("招聘信息删除失败！"+res);
            this.$message.error('招聘信息删除失败！');
          })
        }else{
        }
      },
      updateOK(){
        var oQuan = document.getElementsByName('quan');
        var select = null;
        for( var  i=0;i<oQuan.length; i++){
          if( oQuan[i].checked ){
            select = oQuan[i].value;
          }
        }
        if(  this.position == '' || this.companyName == '' || this.workPlace == '' || this.salary == ''||
          this.number == '' || this.post1 == '' || this.req1 == ''){

          this.isShow = true;
          return;
        }else{ this.isShow = false;}

        this.$ajax({
          url: this.GLOBAL.url+'/app/api/icprecruitment/edit',
          method: 'post',
          data: {
            id: this.recruitid,
            position: this.position,
            companyName: this.companyName,
            workPlace: this.workPlace,
            salary: this.salary,
            theNumberOf: this.number,
            fullTime: select,
            education: this.education,
            experience: this.experience,
            contacts: this.contacts,
            phone: this.phone,
            postResponsibility1: this.post1,
            postResponsibility2: this.post2,
            postResponsibility3: this.post3,
            postResponsibility4: this.post4,
            postResponsibility5: this.post5,
            jobRequirements1: this.req1,
            jobRequirements2: this.req2,
            jobRequirements3: this.req3,
            jobRequirements4: this.req4,
            jobRequirements5: this.req5,
          },
          headers: {
            authToken: this.authtoken,
          }
        }).then( (res) => {
          alert('修改招聘信息成功！');
          this.dialogVisible = false;
          this.Return();
          this.page = 1;
          this.getData(this.page, this.pageSize,this.searchName);
//          this.$router.go(0);
        }).catch( (res) => {
          alert('fail');
        });

      },

    },
    watch: {
      page() {
        this.getData(this.page, this.pageSize,this.searchName);
      }
    },
    created() {
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
  .recruit_manager {
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
    background:rgb(153,153,153);
  }
  .btn:hover{
    background:rgb(120,120,120) ;
  }
  .add_admin {
    height: 35px;
    width: 80px;
    color: #fff;
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    line-height: 35px;
    margin-left: 10px;

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
    margin: 50px 10px 0 10px;
    height: 700px;
    /*border:1px solid #000;*/
    text-align: left;
    position: relative;
  }

  .recruit {
    width: 900px;
    height: 500px;
    /*border:1px solid #000;*/
  }

  .recruit_title {
    width: 900px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #000;
    font-weight: bold;
    border-top: 1px solid #000;
    background: rgba(153, 153, 153, 0.3);
  }

  .total {
    display: inline-block;
    width: 130px;
    vertical-align: top;
    padding: 0 10px ;
    box-sizing: border-box;
  }

  .recruit_one {
    /*height: 25px;*/
    line-height: 25px;
    font-size: 14px;
    color: rgb(153, 153, 153);
    margin-top: 10px;
  }

  .more {
    display: inline-block;
    width: 200px;
    /*border:1px solid #000;*/
    text-align: right;
  }

  .click_more {
    display: inline-block;
    width: 80px;
    height: 25px;
    line-height: 25px;
    border: 1px solid rgb(153, 217, 234);
    border-radius: 5px;
    margin-right: 30px;
    text-align: center;
    color: rgb(153, 217, 234);
    cursor: pointer;
  }

  .click_more:hover {
    color: #fff;
    background: rgb(153, 217, 234);
  }

  .one_more{
    width: 800px;
    /*height:600px;*/
    /*border: 1px solid #000;*/
  }
  .table {
    width: 800px;
    /*height: 300px;*/
    /*border:1px solid rgb(197,197,197);*/
    font-size: 0;
  }

  .table_title {
    width: 800px;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    text-align: left;
    background: rgba(153, 153, 153, 0.4);
    border-bottom: 1px solid #000;
    /*border:1px solid rgb(153,153,153);*/
  }

  .table_data {
    width: 800px;
    /*height: 80px;*/
    padding-left: 10px;
    line-height: 50px;
    font-size: 16px;
    color: rgb(153, 153, 153);
    text-align: left;
    border-bottom: 1px solid rgb(153, 153, 153);
  }

  .table_data2 {
    width: 800px;
    height: 150px;
    /*padding-left:10px;*/
    font-size: 16px;
    color: rgb(153, 153, 153);
    text-align: left;
  }

  .table_require {
    display: inline-block;
    width: 100px;
    height: 150px;
    line-height: 150px;
    vertical-align: top;
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
    background: rgba(153, 153, 153, 0.4);
  }

  .table_r {
    display: inline-block;
    width: 683px;
    height: 150px;
    border: 1px solid rgb(153, 153, 153);
  }

  .table_total {
    display: inline-block;
    width: 150px;
    /*border:1px solid #000;*/
  }

  .table_total_2{
    display: inline-block;
    width: 120px;
  }

  .update_data {
    width: 800px;
    height: 50px;
    padding-left: 10px;
    line-height: 50px;
    font-size: 16px;
    color: rgb(153, 153, 153);
    text-align: left;
  }

  .update_total {
    width: 100px;
    height: 30px;
    border: 1px solid rgb(153, 153, 153);
    border-radius: 5px;
  }

  .update_r{
    width: 683px;
    height: 200px;

  }
  .button {
    width: 800px;
    height: 50px;
    line-height: 50px;
    /*border: 1px solid #000;*/
    margin-top: 50px;
  }

  .btn1 {
    width: 150px;
    height: 40px;
    margin: 0 70px 0 70px;
    font-size: 18px;
    color: #fff;
    background: rgb(66, 189, 251);
    border: 1px solid rgb(66, 189, 251);
    border-radius: 5px;
    cursor: pointer;
  }

  .btn2 {
    width: 150px;
    height: 40px;
    margin-right: 70px;
    font-size: 18px;
    color: #fff;
    background: rgb(235, 170, 73);
    border: 1px solid rgb(235, 170, 73);
    border-radius: 5px;
    cursor: pointer;
  }

  .btn3 {
    width: 150px;
    height: 40px;
    font-size: 18px;
    color: #fff;
    background: rgb(185, 185, 185);
    color: rgb(113, 113, 113);
    border: 1px solid rgb(185, 185, 185);
    border-radius: 5px;
    cursor: pointer;
  }

  .update_span{
    width: 800px;
    height: 30px;
    padding-left: 10px;
    line-height: 30px;
    font-size: 12px;
    text-align: left;
    border-bottom: 1px solid rgb(153, 153, 153);
    /*border:1px solid #000;*/
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

  .text_1{
    display:inline-block;
    width:150px;
    height:40px;
    /*border: 1px solid #000;*/
    font-size:18px;
    font-weight:bold;
  }
  .text_2{
    display: inline-block;
    width:100px;
    height:30px;
    /*border: 1px solid #000;*/
    font-size: 16px;
    font-weight: 300;

  }
  .input_1{
    width: 200px;
    height:25px;
    border:1px solid #a8a8a8;
    border-radius:5px;

  }
  .input_2{
    width:100px;
    height:20px;
    border: 1px solid #a8a8a8;
    border-radius:5px;
  }

  .col{
    height:20px;
    margin-top:5px;
    /*border:1px solid #000;*/
    font-size: 12px;
    color: #939999;
  }
  .input_3{
    width:450px;
    height: 20px;
    border: 1px solid #a8a8a8;
    border-radius:3px;
    margin-left:30px;
  }

  .span{
    display: inline-block;
    color:red;
    /*border:1px solid #000;*/
  }
</style>
