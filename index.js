var str="<p>nihao(this.name) how are you</p>";
var data={name:1};
var vue=new View(str,data);
function View(str,data){
  this.render=function (str){
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
    body=document.getElementById("root");
    body.innerHTML='';
    ele=document.createElement(tagName);
    ele.innerHTML= tagContent.replace(/\(.*\)/,eval(varVal));
    body.appendChild(ele);
  }
  Object.defineProperty(this,Object.keys(data)[0],{
    get(){
      return data[Object.keys(data)[0]];
    },
    set(val){
      data[Object.keys(data)[0]]=val;
      this.render(str);
    }
  })
  this.changeData=function(){
    console.log(this);
    this[Object.keys(data)[0]]+=1;
  };
  document.getElementById("app").onclick=this.changeData.bind(this);
  this.render(str);
  //Object.keys(data);
}

function defineReactive(data, key, value) {
  //递归调用，监听所有属性
  observer(value);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    get: function () {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set: function (newVal) {
      if (value !== newVal) {
        value = newVal;
        dep.notify(); //通知订阅器
      }
    }
  });
}

function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

function Dep() {
  this.subs = [];
}
Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}
Dep.prototype.notify = function () {
  console.log('属性变化通知 Watcher 执行更新视图函数');
  this.subs.forEach(sub => {
    sub.update();
  })
}
Dep.target = null;
var mydata={ll:15,jj:18};
observer(mydata);

