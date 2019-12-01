var str="<p>nihao(this.name) how are you</p>";
var data={name:'xiaoliu'};
new View(str,data);
function View(str,data){
  this.render=function (str,data){
    var hasEndTag;
    var tagName;
    var tagContent;
    var native;
    var varVal;
    var body;
    var ele;
    var that=this;
    var reg=/<\w+>(.*)<\/\w+>/;
    hasEndTag=reg.test(str);
    if(!hasEndTag){
      console.log("标签书写格式不正确");
      return
    }
    var regTwo=/<\w+>/;
    tagName = regTwo.exec(str)[0].replace(/[<>]/g,'');
    tagContent=str.replace(reg,"$1");
    var regThree=/\(.*\)/;
    varVal=regThree.exec(tagContent)[0].replace(/[()]/g,'');
    native=tagContent.replace(varVal,'');
    body=document.body;
    ele=document.createElement(tagName);
    ele.innerHTML= tagContent.replace(/\(.*\)/,eval(varVal));
    body.appendChild(ele);
  }
  this[Object.keys(data)[0]]=data[Object.keys(data)[0]];
  this.render(str,data)
  //Object.keys(data);
}
