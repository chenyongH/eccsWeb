/**
 * Created by Administrator on 2018/10/19 0019.
 */
/* eslint-disable */
export function FormatDate(obj){
    let date =  new Date(obj);
    let y = 1900+date.getYear();
    let m = "0"+(date.getMonth()+1);
    let d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}