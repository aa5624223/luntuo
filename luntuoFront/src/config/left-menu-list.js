/*
  这是侧边栏
  这里显示所有的侧边栏
*/
const menuList = [
    {
      id:"1",
      title: '首页', // 菜单标题名称
      key: '/Admin/Deskop', // 对应的path
      icon: 'home', // 图标名称
      isPublic: true, // 公开的
      isMenu:true,
      isAuth:false,//是否需要权限配置
      isSubMenu:false,
      children:[] 
    },
    {
      id:"2", 
      title: '业务菜单',
      key: '/Admin/ReportSearch',
      icon: 'appstore',
      isMenu:true,
      isAuth:true,
      isSubMenu:true,
      children: [ // 子菜单列表
        {
          id:"3",
          title: '调度单发布与执行',
          key: '/Admin/DdOrder/DdOrder',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'bars'
        },
        {
          id:"4",
          title: '钣金需求分解',
          key: '/Admin/Service/Service2',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'tool'
        },
        {
          id:"5",
          title: '机加需求分解',
          key: '/Admin/Service/Service3',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'tool'
        },
        {
          id:"6",
          title: '采购需求分解',
          key: '/Admin/Service/Service4',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'tool'
        },
      ]
    },
    {
      id:"7",
      title: '报表查询',
      key: '/Admin/Service',
      icon: 'appstore',
      isMenu:true,
      isAuth:true,
      isSubMenu:true,
      children: [ // 子菜单列表
        {
          id:"8",
          title: '钣金需求单查询',
          key: '/Admin/ReportSearch/Report2_1',
          isMenu:true,
          isAuth:true,
          icon: 'bars',
          isSubMenu:false,
          children:[
            {
              id:"9",
              title:'添加',
              key:'Service1_Add',
              isMenu:false,
              isAuth:true,
              isOpt:true,
              isSubMenu:false,
            },
            {
              id:"10",
              title:'Excel导入',
              key:'Service1_ExcelAdd',
              isMenu:false,
              isAuth:true,
              isOpt:true,
              isSubMenu:false,
            },
            {
              id:"11",
              title:'删除',
              key:'Service1_ExcelDel',
              isMenu:false,
              isAuth:true,
              isOpt:true,
              isSubMenu:false,
            },
          ]
        },
        {
          id:"12",
          title: '钣金需求单查询',
          key: '/Admin/ReportSearch/Report2_1',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'tool'
        },
        {
          id:"13",
          title: '机加需求单查询',
          key: '/Admin/ReportSearch/Report3_1',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'tool'
        },
        {
          id:"14",
          title: '采购需求单查询',
          key: '/Admin/ReportSearch/Report4_1',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'tool'
        },
      ]
    },
    {
      id:"15",
      title: '系统管理',
      key: '/Admin/Admin',
      icon: 'appstore',
      isMenu:true,
      isAuth:true,
      isSubMenu:true,
      children: [ // 子菜单列表
        {
          id:"16",
          title: '密码修改',
          key: 'PasEdit',
          isMenu:true,
          isAuth:false,
          isSubMenu:false,
          icon: 'bars'
        },
        {
          id:"17",
          title: '用户管理',
          key: '/Admin/Admin/AdminUserConfig',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'bars'
        },
        {
          id:"18",
          title: '操作记录',
          key: '/Admin/Admin/OptRecord',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'bars'
        },
        {
          id:"19",
          title: 'MRP控制者维护',
          key: '/Admin/Admin/MRP',
          isMenu:true,
          isAuth:true,
          isSubMenu:false,
          icon: 'bars'
        },
        {
          id:"20",
          title: '物料班组对照维护',
          key: '/Admin/Admin/Matrial',
          isMenu:true,
          isAuth:true,
          icon: 'bars',
          isSubMenu:false,
          children:[
            {
              id:"21",
              title:'添加',
              key:'Matrial_Add',
              isMenu:false,
              isAuth:true,
              isOpt:true,
              isSubMenu:false,
            },
            {
              id:"22",
              title:'Excel导入',
              key:'Matrial_ExcelAdd',
              isMenu:false,
              isAuth:true,
              isOpt:true,
              isSubMenu:false,
            },
            {
              id:"23",
              title:'删除',
              key:'Matrial_Del',//key不能重复
              isMenu:false,
              isAuth:true,
              isOpt:true,
              isSubMenu:false,
            }
          ]
        },
      ]
    },
]
  
export default menuList