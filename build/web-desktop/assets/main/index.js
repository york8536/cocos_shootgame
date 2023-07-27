System.register("chunks:///_virtual/main",["./shoot.ts"],(function(){"use strict";return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/shoot.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var e,i,n,o,r,l,u,c,s,a,h,v,b,p,f,w;return{setters:[function(t){e=t.applyDecoratedDescriptor,i=t.inheritsLoose,n=t.initializerDefineProperty,o=t.assertThisInitialized},function(t){r=t.cclegacy,l=t._decorator,u=t.Node,c=t.Button,s=t.Prefab,a=t.Label,h=t.input,v=t.Input,b=t.KeyCode,p=t.instantiate,f=t.Animation,w=t.Component}],execute:function(){var g,y,d,m,E,A,D,z,K,k,C,O,P,T,_,N,S,I,F,H,L,W,Y;r._RF.push({},"01d614sRHFOgrn/QL/GSTnq","shoot",void 0);var R=l.ccclass,B=l.property;t("shoot",(g=R("shoot"),y=B(u),d=B(u),m=B(u),E=B(c),A=B(s),D=B(u),z=B(a),K=B(a),k=B(a),C=B(a),g((T=e((P=function(t){function e(){for(var e,i=arguments.length,r=new Array(i),l=0;l<i;l++)r[l]=arguments[l];return e=t.call.apply(t,[this].concat(r))||this,n(e,"startview",T,o(e)),n(e,"gameview",_,o(e)),n(e,"endview",N,o(e)),n(e,"shoot",S,o(e)),n(e,"bulletPrefab",I,o(e)),n(e,"enemy",F,o(e)),n(e,"hitcount",H,o(e)),n(e,"total",L,o(e)),n(e,"time",W,o(e)),n(e,"bulletcountview",Y,o(e)),e.bulletAry=[],e.score=0,e.prepare=3,e.countdown=10,e.bulletcount=10,e}i(e,t);var r=e.prototype;return r.onLoad=function(){this.hitcount.string="",this.bulletAry=[],this.startview.active=!0,this.endview.active=!1,this.gameview.active=!1},r.start=function(){},r.update=function(t){for(var e=this.bulletAry.length-1;e>=0;e--){var i=this.bulletAry[e];this.hit(i,this.enemy)&&this.bulletAry.splice(e,1)}},r.startgame=function(){var t=this;console.log("startgame"),this.startview.active=!1,this.endview.active=!1,this.gameview.active=!1,this.time.node.active=!0,this.schedule((function(){t.prepare>0&&(t.prepare=t.prepare-1,t.time.string=""+t.prepare)}),1),this.scheduleOnce((function(){t.shoot.node.on("click",t.onclickshoot,t),h.on(v.EventType.KEY_DOWN,t.onKeyDown,t),t.time.string="10",t.startview.active=!1,t.endview.active=!1,t.gameview.active=!0,t.schedule((function(){t.countdown>0&&(t.countdown=t.countdown-1,t.time.string=""+t.countdown)}),1)}),3.1),this.scheduleOnce((function(){t.startview.active=!1,t.endview.active=!0,t.gameview.active=!1,t.time.node.active=!1,t.total.string="score:"+t.score,h.off(v.EventType.KEY_DOWN,t.onKeyDown,t)}),13),this.bulletcountview.string="bullet count : "+this.bulletcount},r.onKeyDown=function(t){if(t.keyCode===b.SPACE){console.log("按下SPACE");new Event("click");this.onclickshoot(t)}},r.onclickshoot=function(t){var e=this;if(this.bulletcount>0){console.log("Shoot");var i=p(this.bulletPrefab);this.node.addChild(i),i.getComponent(f).on(f.EventType.FINISHED,(function(){i.parent=null;for(var t=0;t<e.bulletAry.length;t++)if(i==e.bulletAry[t]){e.bulletAry.splice(t,1);break}i.destroy,console.log("Miss")}),this),this.bulletAry.push(i),this.bulletcount=this.bulletcount-1,this.bulletcountview.string="bullet count : "+this.bulletcount}},r.collision=function(t,e){return t.position.subtract(e.position).length()},r.hit=function(t,e){if(this.collision(t,e)<100)return console.log("Hit"),t.getComponent(f).off(f.EventType.FINISHED,(function(){}),this),t.parent=null,console.log(typeof this.score),this.score++,this.hitcount.string="hit:"+this.score,!0},r.Again=function(){var t=this;console.log("再一局"),this.startview.active=!1,this.endview.active=!1,this.gameview.active=!0,this.time.node.active=!0,this.shoot.interactable=!0,this.score=0,this.countdown=10,this.bulletcount=10,this.hitcount.string="",this.bulletcountview.string="bullet count : "+this.bulletcount,this.time.string=""+this.countdown,this.shoot.interactable=!0,h.on(v.EventType.KEY_DOWN,this.onKeyDown,this),this.scheduleOnce((function(){t.startview.active=!1,t.endview.active=!0,t.gameview.active=!1,t.time.node.active=!1,t.total.string="score:"+t.score,h.off(v.EventType.KEY_DOWN,t.onKeyDown,t)}),10)},e}(w)).prototype,"startview",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_=e(P.prototype,"gameview",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),N=e(P.prototype,"endview",[m],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),S=e(P.prototype,"shoot",[E],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),I=e(P.prototype,"bulletPrefab",[A],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),F=e(P.prototype,"enemy",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),H=e(P.prototype,"hitcount",[z],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),L=e(P.prototype,"total",[K],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),W=e(P.prototype,"time",[k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),Y=e(P.prototype,"bulletcountview",[C],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),O=P))||O));r._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});