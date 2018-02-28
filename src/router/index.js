import Vue from 'vue'
import Router from 'vue-router'
import admin_main from '@/components/admin/admin_main'
import admin_manager from '@/components/admin/admin_manager'
import doctor_manager from '@/components/admin/doctor_manager'
import store_manager from '@/components/admin/store_manager'
import recruit_manager from '@/components/admin/recruit_manager'
import key_manager from '@/components/admin/key_manager'
import user_logo_file from '@/components/admin/user_logo_file'
import examine_logo_file from '@/components/admin/examine_logo_file'
import admin_login from '@/components/admin/admin_login'
import admin_add from '@/components/admin/admin_add'
import doctor_add from '@/components/admin/doctor_add'
import commodity_add from '@/components/admin/commodity_add'
import recruit_add from '@/components/admin/recruit_add'

import login from '@/components/login'
import register from '@/components/user/register'
import register_intro from '@/components/user/register_intro'
import userInfo from '@/components/user/userInfo'
import introduction from '@/components/common/introduction'
import askDoctor from '@/components/doctor/askDoctor'


/***************************************/
import index from '@/components/index_1'
import goodList from '@/components/common/goodList'
import recruitList from '@/components/common/recruitList'
import zixun_manager from '@/components/admin/zixun_manager'
import user_manager from '@/components/admin/user_manager'
import zixun_add from '@/components/admin/zixun_add'
import zixunList from '@/components/common/zixunList'
import doVip from '@/components/user/doVip'
import askList from '@/components/common/askList'
import forget from '@/components/user/forget'
import newPassword from '@/components/user/newPassword'
import updateInfo from '@/components/user/updateInfo'




Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/goodList',
      name: 'goodList',
      component: goodList,
    },
    {
      path: '/recruitList',
      name: 'recruitList',
      component: recruitList,
    },
    {
      path: '/zixunList',
      name: 'zixunList',
      component: zixunList,
    },
    {
      path: '/askList',
      name: 'askList',
      component: askList,
    },
    {
      path: '/doVip',
      name: 'doVip',
      component: doVip,
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget,
    },
    {
      path: '/newPassword',
      name: 'newPassword',
      component: newPassword,
    },
    {
      path: '/updateInfo',
      name: 'updateInfo',
      component: updateInfo,
    },
    /***************/
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/admin_login',
      name: 'admin_login',
      component: admin_login,
    },
    {
      path: '/admin_main',
      name: 'admin_main',
      component: admin_main,

    },
   {
      path:'/zixun_manager',
      name: 'zixun_manager',
      component: zixun_manager,
    },
    {
      path:'/zixun_add',
      name: 'zixun_add',
      component: zixun_add,
    },
    {
      path:'/admin_manager',
      name: 'admin_manager',
      component: admin_manager,
    },
    {
      path: '/doctor_manager',
      name: 'doctor_manager',
      component: doctor_manager,
    },
    {
      path: '/user_manager',
      name: 'user_manager',
      component: user_manager,
    },
    {
      path: '/store_manager',
      name: 'store_manager',
      component: store_manager,
    },
    {
      path: '/recruit_manager',
      name: 'recruit_manager',
      component: recruit_manager,
    },
    {
      path: '/key_manager',
      name: 'key_manager',
      component: key_manager,
    },
    {
      path: '/user_logo_file',
      name: 'user_logo_file',
      component: user_logo_file,
    },
    {
      path: '/examine_logo_file',
      name: 'examine_logo_file',
      component: examine_logo_file,
    },
    {
      path: '/admin_add',
      name: 'admin_add',
      component: admin_add,
    },
    {
      path: '/doctor_add',
      name: 'doctor_add',
      component: doctor_add,
    },
    {
      path: '/commodity_add',
      name: 'commodity_add',
      component: commodity_add,
    },
    {
      path: '/recruit_add',
      name: 'recruit_add',
      component: recruit_add,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      children:[

      ]
    },
    {
      path: '/register_intro',
      name: 'register_intro',
      component: register_intro,
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo,
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: introduction,
    },
    {
      path: '/askDoctor',
      name: 'askDoctor',
      component: askDoctor,
    },

    /*{
      path: '/test',
      name: 'test',
      component: test,
    },*/
  ]
})
