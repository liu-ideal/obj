const fs = require('fs');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const url = require('url');
let http=null;
let targetUrl='';
let resultContent="";
let dom=null;
let imgSrc='';
let title='';
let price='';
let totalArray=[];
function goStart(targetUrl){
  if(url.parse(targetUrl).protocol==="https:"){
    http=require("https")
  }else if(url.parse(targetUrl).protocol==="http:"){
    http=require("http")
  }else{
    console.log("传入的网址格式不正确");
    return
  }
  let options = {
      headers:{
        'user-agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
 }
}
  http.get(targetUrl,options,(res)=>{
    res.setEncoding("utf8");
    console.log(`请求状态码:${res.statusCode}`)

    res.on("data",(data)=>{
      resultContent+=data;
    });
    res.on("end",()=>{

       fs.writeFile("./ha.html",resultContent,{'flag':'w'},(err)=>{
         if (err) throw err
       })
      console.log("获取页面内容完毕--正在处理中......");
      dom=new JSDOM(resultContent);
      let objUl=dom.window.document.getElementsByClassName("gl-warp")[0];
      let objLi=objUl.getElementsByClassName("gl-item");
      // console.log(objLi[1])
      for(let i=0;i<16;i++){
      let imgElement=objLi[i].getElementsByClassName("p-img")[0].getElementsByTagName("img")[0];
      let priceElement=objLi[i].getElementsByClassName("p-price")[0].getElementsByTagName("i")[0];
      let titleElement=objLi[i].getElementsByClassName("p-name")[0].getElementsByTagName("em")[0];
       imgSrc=imgElement.getAttribute("source-data-lazy-img");
       title=titleElement.textContent;
       price=priceElement.textContent;
       totalArray.push({
         title:title,
         imgSrc:imgSrc,
         price:price
       })
      }
      fs.writeFile("./data.json",JSON.stringify(totalArray),(err)=>{
        if (err) throw err;
        console.log("数据爬取成功,文件生成")
      })
    })
  })
}
goStart("https://search.jd.com/Search?keyword=%E5%8D%8E%E4%B8%BA&enc=utf-8&wq=%E5%8D%8E%E4%B8%BA&pvid=144b332111e6441fab9c808c95bd235e")
