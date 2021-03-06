/**
 * 处理利用分组查询后得到得数据，将其转换为前端所需结构
 * @param Array 
 * @return Array 
 * [{date: 12-20, title: '好好学习闭包'}, ...]
 */
function handleGroupBy(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        arr[i]['content'] = transformToArr(arr[i]['dates'], arr[i]['titles'], arr[i]['article_id']);
        Reflect && Reflect.deleteProperty(arr[i], 'dates') && Reflect.deleteProperty(arr[i], 'titles') && Reflect.deleteProperty(arr[i], 'article_id');
    }
    return arr;
}
function transformToArr(str1 = '', str2 = '', str3 = '') {
    let arr1 = str1.split(','),
        arr2 = str2.split(','),
        arr3 = str3.split(','),
        content = [];
    for (let i = 0; i < arr1.length; i++) {
        content.push({
            date: arr1[i],
            title: arr2[i],
            article_id: arr3[i]
        })
    }
    return content;
}
module.exports = {
    handleGroupBy,
    transformToArr
}