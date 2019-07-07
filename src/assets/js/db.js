import { axios } from './axios';
/**
*   @database: { 微信开发 }
*   @desc:     { 批量绩效_投票 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{`user`,dpt,score,usertype,isgm,sportid,votedate,votetime }]，数组的每一项表示一条数据*/
export const addCbpcPerformance = (values) =>
  axios({
    method: 'post',
    data: {
      values,
      id: 155,
      nonce: 'c8a91eaea6'
    }
  });

/** 数据量较大时建议使用post模式：
 *
 *   @database: { 微信开发 }
 *   @desc:     { 批量印钞管理部门绩效评价 } */
export const addCbpcPerformancePrint = (values) =>
  axios({
    method: 'post',
    data: {
      values,
      id: 187,
      nonce: 'f3fd19a183'
    }
  });

/** 数据量较大时建议使用post模式：
 *
 *   @database: { 微信开发 }
 *   @desc:     { 批量客户满意度投票 } */
export const addCbpcPerformanceByCustomer = (values) =>
  axios({
    method: 'post',
    data: {
      values,
      id: 186,
      nonce: '1b3803417c'
    }
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 绩效_查看得分 }
 */
export const getCbpcPerformance = (sid) =>
  axios({
    url: '/156/274ff67aec.json',
    params: {
      sid
    }
  });
/**
 *   @database: { 微信开发 }
 *   @desc:     { 绩效得分查看 }
 */
export const getCbpcPerformancePrint = (sid) =>
  axios({
    url: '/188/36e0aafbbf.json',
    params: {
      sid
    }
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 绩效_得分明细 }
 */
export const getCbpcPerformanceDetail = (sid) =>
  axios({
    url: '/157/0e9de788d8.json',
    params: {
      sid
    }
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 绩效评分详情 }
 */
export const getCbpcPerformanceDetailPrint = (sid) =>
  axios({
    url: '/189/b6f38a68cd.json',
    params: {
      sid
    }
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 客户满意度评分用户登录 } 
    const { username, card_no } = params;
*/
export const getCbpcUserList = (params) =>
  axios({
    url: '/184/d61e2a8b11.json',
    params
  });

// update
// 	`tbl_cbpc_user_list`  set provider = 1
// WHERE
// 	username IN ( '胡新玥', '蒲明玥', '李宾', '朱振华', '潘成', '张立力', '杨林', '马可', '冯诗伟', '任礼科', '李超群', '蒋荣' ) and dept_id=6;

// update
// 	`tbl_cbpc_user_list`  set customer = 1
// WHERE
// 	username IN ( '秦鹏','杨波','唐永明','袁长虹','谢清松','刘天亮','黄小平','彭俊林' )

// update
// 	`tbl_cbpc_user_list`  set customer = 1
// WHERE
// 	username IN ('朱江','郑强','郑昭辉','张洪','党委','游泳','丁波','吉晓辉','陈红志','祖波')  and dept_id=18

/**
 *   @database: { 微信开发 }
 *   @desc:     { 参评用户列表 }
 */
export const getCbpcUserListByDept = (provider) =>
  axios({
    url: '/185/8757527d72.json',
    params: {
      provider
    }
  });
