import request from '@/utils/request';

// 获取商品列表
export async function getGoods(params) {
  return request('/admin/goods', { params });
}

/**
 * 上架和下架商品
 * @param {商品id} goodsid
 * @returns
 */
export async function isOn(goodsId) {
  return request.patch(`/admin/goods/${goodsId}/on`);
}
/**
 * 推荐和不推荐商品
 * @param {商品id} goodsid
 * @returns
 */
export async function isRecommend(goodsId) {
  return request.patch(`/admin/goods/${goodsId}/recommend`);
}
