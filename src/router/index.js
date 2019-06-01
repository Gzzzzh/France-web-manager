import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  //首页
  {
    path: '/home',
    component: Layout,
    name: 'Home',
    redirect:'/home/carousel/edit',
    meta: {
      title: '前台首页',
      icon: 'nested'
    },
    children: [
      {
        path: 'carousel/edit',
        component: () => import('@/views/home/carousel/edit'), 
        name: 'carouselEdit',
        meta: { title: '轮播图编辑' },
      },
      {
        path: 'homeactivity',
        component: () => import('@/views/nested/menu1/index'), 
        name: 'homeActivity',
        meta: { title: '最近活动管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'homeActivityList',
            meta: { title: '最近活动列表' }
          },
          {
            path: 'edit',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'homeActivityEdit',
            hidden:true,
            meta: { title: '最近活动编辑' }
          },
          {
            path: 'create',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'homeActivityCreate',
            meta: { title: '最近活动上传' },
          } 
        ]
      },
      {
        path: 'homeevent',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'homeEvent',
        meta: { title: '重大活动管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'homeEventList',
            meta: { title: '重大活动列表' }
          },
          {
            path: 'edit',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'homeEventEdit',
            hidden:true,
            meta: { title: '重大活动编辑' }
          },
          {
            path: 'create',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'homeEventCreate',
            meta: { title: '重大活动上传' },
          } 
        ]
      },

    ]
  },
  //关于我们
  {
    path: '/about',
    component: Layout,
    name: 'About',
    meta: {
      title: '前台关于我们',
      icon: 'nested'
    },
    children: [
      {
        path: 'association/edit',
        component: () => import('@/views/about/association/index'), // Parent router-view
        name: 'association',
        meta: { title: '协会介绍编辑' },
      },
      {
        path: 'members',
        component: () => import('@/views/about/members/index'), // Parent router-view
        name: 'Members',
        meta: { title: '协会人员管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/about/members/list'),
            name: 'MembersList',
            meta: { title: '协会人员列表' }
          },
          {
            path: 'edit/:id',
            component: () => import('@/views/about/members/edit'),
            name: 'MembersEdit',
            hidden:true,
            meta: { title: '协会人员编辑' }
          },
          {
            path: 'create',
            component: () => import('@/views/about/members/create'),
            name: 'MembersCreate',
            meta: { title: '协会人员上传' },
          } 
        ]
      },
    ]
  },

  //活动信息
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: 'Activity',
    meta: {
      title: '前台活动信息',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'activityList',
        meta: { title: '活动信息列表' },
      },
      {
        path: 'edit',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'activityEdit',
        hidden:true,
        meta: { title: '活动信息编辑' },
      },
      {
        path: 'create',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'activityCreate',
        meta: { title: '活动信息上传' },
      },
    ]
  },

  {
    path: '/report',
    component: Layout,
    name: 'Report',
    meta: {
      title: '前台专题报道',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'reportList',
        meta: { title: '专题报道列表' },
      },
      {
        path: 'edit',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'reportEdit',
        hidden:true,
        meta: { title: '专题报道编辑' },
      },
      {
        path: 'create',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'reportCreate',
        meta: { title: '专题报道上传' },
      },
    ]
  },

  //社会文化
  {
    path: '/culture',
    component: Layout,
    name: 'Culture',
    meta: {
      title: '前台社会文化',
      icon: 'nested'
    },
    children: [
      {
        path: 'service',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Service',
        meta: { title: '社会服务管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'serviceList',
            meta: { title: '社会服务列表' }
          },
          {
            path: 'edit',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'serviceEdit',
            hidden:true,
            meta: { title: '社会服务编辑' }
          },
          {
            path: 'create',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'serviceCreate',
            meta: { title: '社会服务上传' },
          } 
        ]
      },
      {
        path: 'school',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'School',
        meta: { title: '语言学校管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'schoolList',
            meta: { title: '语言学校列表' }
          },
          {
            path: 'edit',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'schoolEdit',
            hidden:true,
            meta: { title: '语言学校编辑' }
          },
          {
            path: 'create',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'schoolCreate',
            meta: { title: '语言学校上传' },
          } 
        ]
      },
      {
        path: 'exchange',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Exchange',
        meta: { title: '文化交流管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'exchangeList',
            meta: { title: '文化交流列表' }
          },
          {
            path: 'edit',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'exchangeEdit',
            hidden:true,
            meta: { title: '文化交流编辑' }
          },
          {
            path: 'create',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'exchangeCreate',
            meta: { title: '文化交流上传' },
          } 
        ]
      },

    ]
  },

  //精彩回顾
  {
    path: '/review',
    component: Layout,
    name: 'Review',
    meta: {
      title: '前台精彩回顾',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'reviewList',
        meta: { title: '精彩回顾列表' },
      },
      {
        path: 'edit',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'reviewEdit',
        hidden:true,
        meta: { title: '精彩回顾编辑' },
      },
      {
        path: 'create',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'reviewCreate',
        meta: { title: '精彩回顾上传' },
      },
    ]
  },
   
  //友情链接
  {
    path: '/link',
    component: Layout,
    name: 'Link',
    meta: {
      title: '前台友情链接',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'linkList',
        meta: { title: '友情链接列表' },
      },
      {
        path: 'create',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'linkCreate',
        meta: { title: '友情链接上传' },
      },
    ]
  },

  //联系我们
  {
    path: '/contact',
    component: Layout,
    name: 'Contact',
    meta: {
      title: '前台联系我们',
      icon: 'nested'
    },
    children: [
      {
        path: 'content/edit',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'contentEdit',
        meta: { title: '联系内容编辑' },
      },
      {
        path: 'form',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Form',
        meta: { title: '联系表单管理' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'formList',
            meta: { title: '联系表单列表' }
          },
        ]
      },
    ]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: { title: '文章', icon: 'dashboard' },
    children: [
      {
        path: 'list',
        name: 'articleList',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: 'dashboard' }
      },
      {
        path: 'edit',
        name: 'articleEdit',
        component: () => import('@/views/article/edit'),
        meta: { title: '编辑文章', icon: 'dashboard' }
      },
      {
        path: 'create',
        name: 'articleCreate',
        component: () => import('@/views/article/create'),
        meta: { title: '发布文章', icon: 'dashboard' }
      }
    ]
  },

 /*  {
    path: '/association',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'association',
        component: () => import('@/views/association/index'),
        meta: { title: '协会介绍管理', icon: 'form' }
      }
    ]
  }, */

  /* {
    path: '/members',
    component: Layout,
    redirect: '/members/list',
    name: 'Members',
    meta: { title: '成员管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'membersList',
        component: () => import('@/views/members/list'),
        meta: { title: '成员列表', icon: 'user' }
      },
      {
        path: 'edit/:id',
        name: 'membersEdit',
        hidden:true,
        component: () => import('@/views/members/edit'),
        meta: { title: '编辑成员', icon: 'user' }
      },
      {
        path: 'create',
        name: 'membersCreate',
        component: () => import('@/views/members/create'),
        meta: { title: '添加成员', icon: 'user' }
      }
    ]
  }, */

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },


  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
/* export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
} */

export default router
