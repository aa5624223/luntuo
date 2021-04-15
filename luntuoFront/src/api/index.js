//import jsonp from 'jsonp'
//import {message} from 'antd'
import ajax from './ajax'
import localStore from '../utils/storageUtils'
//import Base from 'antd/lib/typography/Base'
const BASE = window.location.origin+"/";
/* 获取数据 */ 
//登录
export const reqLogin = (formData)=>ajax(BASE+'Home/Login',formData,'POST')
//获得采购订单
export const getG_Polist = (formdata) =>ajax(BASE+'Home/getG_Polist',formdata)
//根据用户权限 获取改用户拥有的权限字符串 suchas:{AuthConfig:'1,2,3,4'}
export const getSite_Roles = (formdata) =>ajax(BASE+'Home/getSite_Roles',formdata,'POST')
//获取用户数据 
export const getUserList = (formdata) =>ajax(BASE+'Home/getUserList',formdata)
//获取用户对单个页面的权限
export const getSite_Roles_Opt = (formdata) =>ajax(BASE+'Home/getSite_Roles_Opt',formdata,'POST');
//获得钣金需求分解数据
export const getBjInfo =  (formdata) =>ajax(BASE+'Home/getBjInfo',formdata,'POST');
//
export const getJjInfo =  (formdata) =>ajax(BASE+'Home/getJjInfo',formdata,'POST');
//
export const getCgInfo =  (formdata) =>ajax(BASE+'Home/getCgInfo',formdata,'POST');
//
export const getWBInfo =  (formdata) =>ajax(BASE+'Home/getWBInfo',formdata,'POST');
//
export const getV_MRPInfo = (formdata) =>ajax(BASE+'Home/getV_MRPInfo',formdata,'POST');
//
export const getTypeInfo = (formdata) =>ajax(BASE+'Home/getTypeInfo',formdata,'POST');
//
export const getV_BjInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_BjInfo',formdata,'POST')
}
//
export const getV_JjInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_JjInfo',formdata,'POST')
}
//
export const getV_CgInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_CgInfo',formdata,'POST')
}
export const getDdOrder = (formdata)=>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getDdOrder',formdata,'POST')
}
//getUploadInfo
export const getUploadInfo = (formdata) =>ajax(BASE+'Home/getUploadInfo',formdata,'POST');

export const getLogInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getLogInfo',formdata,'POST')
}
export const getBjImp = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getBjImp',formdata,'POST')
}
//
export const getJjImp = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getJjImp',formdata,'POST')
}
//
export const getCgImp = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getCgImp',formdata,'POST')
}

export const getV_DdOrder_Det = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_DdOrder_Det',formdata,'POST')
}

export const getV_Sum_Num_JiInfo = (formdata)=>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_Sum_Num_JiInfo',formdata,'POST')
}
export const getV_Sum_Num_CgInfo = (formdata)=>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_Sum_Num_CgInfo',formdata,'POST')
}
export const getV_Sum_Num_BjInfo = (formdata)=>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/getV_Sum_Num_BjInfo',formdata,'POST')
}

/* 获取数据End */

/* 添加数据 */
//添加用户
export const addUser = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/addUser',formdata,'POST')
}
//添加钣金需求分解
export const addBjInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/addBjInfo',formdata,'POST')
}
//添加物料数据
export const addWBInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/addWBInfo',formdata,'POST')
}
//
export const addMRPInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/addMRPInfo',formdata,'POST')
}
/* 添加数据End */
/* 修改 */
//修改用户
export const editUser = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/editUser',formdata,'POST')
}
//修改钣金需求分解
export const editBjInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/editBjInfo',formdata,'POST')
}
//修改物料数据
export const editWBInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/editWBInfo',formdata,'POST')
}
//
export const editMRPInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/editMRPInfo',formdata,'POST')
}
//修改调度单 editDdOrder
export const editDdOrder = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/editDdOrder',formdata,'POST')
}
export const editDdOrder_status = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/editDdOrder_status',formdata,'POST')
}
/* 修改End */
/* 删除 */
//删除用户
export const delUser = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delUser',formdata,'POST')
}
//删除钣金需求分解
export const delBjInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delBjInfo',formdata,'POST')
}
//删除物料
export const delWBInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delWBInfo',formdata,'POST')
}
//
export const delMRPInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delMRPInfo',formdata,'POST')
}
//
export const delUploadInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delUploadInfo',formdata,'POST')
}
//
export const delMRPInfos = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delMRPInfos',formdata,'POST')
}
//
export const delWBInfos = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delWBInfos',formdata,'POST')
}
//删除调度单版本2
export const delDdOrder = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/delDdOrder',formdata,'POST')
}
/* 提交更新请求  */
//提交钣金需求分解更新
export const submitBjImp = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/submitBjImp',formdata,'POST')
}
//采购
export const submitCgImp = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/submitCgImp',formdata,'POST')
}
//机加
export const submitJjImp = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/submitJjImp',formdata,'POST')
}
//物料班组
export const submitWBInfo = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/submitWBInfo',formdata,'POST')
}
//提交调度单
export const submitDdOrder = (formdata)=>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/submitDdOrder',formdata,'POST')
}
//调度单需求计划执行
export const demantExe = (formdata) =>{
    const user = localStore.getUser();
    formdata.append("OptUserCode",user.UserCode);
    return ajax(BASE+'Home/demantExe',formdata,'POST')
}