System.register("chunks:///_virtual/main", ['./shoot.ts'], function () {
  'use strict';

  return {
    setters: [null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/shoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, Button, Prefab, Label, _decorator, Component, input, Input, KeyCode, instantiate, Animation;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Button = module.Button;
      Prefab = module.Prefab;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      instantiate = module.instantiate;
      Animation = module.Animation;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "01d614sRHFOgrn/QL/GSTnq", "shoot", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let shoot = exports('shoot', (_dec = ccclass('shoot'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Button), _dec6 = property(Prefab), _dec7 = property(Node), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(Label), _dec11 = property(Label), _dec(_class = (_class2 = class shoot extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "startview", _descriptor, this);

          _initializerDefineProperty(this, "gameview", _descriptor2, this);

          _initializerDefineProperty(this, "endview", _descriptor3, this);

          _initializerDefineProperty(this, "shoot", _descriptor4, this);

          _initializerDefineProperty(this, "bulletPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "enemy", _descriptor6, this);

          _initializerDefineProperty(this, "hitcount", _descriptor7, this);

          _initializerDefineProperty(this, "total", _descriptor8, this);

          _initializerDefineProperty(this, "time", _descriptor9, this);

          _initializerDefineProperty(this, "bulletcountview", _descriptor10, this);

          this.bulletAry = [];
          this.score = 0;
          this.countdown = 10;
          this.bulletcount = 10;
        } //子彈數量


        onLoad() {
          // 將HIT字串設定為空值
          this.hitcount.string = ""; // 將bulletAry陣列設定為空值

          this.bulletAry = [];
          this.startview.active = true;
          this.endview.active = false;
          this.gameview.active = false;
        }

        start() {
          this.shoot.node.on('click', this.onclickshoot, this);
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }

        update(deltaTime) {
          for (let i = this.bulletAry.length - 1; i >= 0; i--) {
            let addbullet = this.bulletAry[i];

            if (this.hit(addbullet, this.enemy)) {
              // 清除陣列中檢查完的擊中事件
              this.bulletAry.splice(i, 1);
            }
          }
        } // 開始遊戲


        startgame() {
          console.log("startgame"); // 按下開始後隱藏start畫面

          this.startview.active = false;
          this.endview.active = false;
          this.gameview.active = true; // 10秒後隱藏game畫面

          this.scheduleOnce(() => {
            this.startview.active = false;
            this.endview.active = true;
            this.gameview.active = false;
            this.total.string = "score:" + this.score;
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          }, 10);
          this.bulletcountview.string = "bullet count : " + this.bulletcount;
          this.schedule(() => {
            if (this.countdown > 0) {
              this.countdown = this.countdown - 1;
              this.time.string = "" + this.countdown; //為啥+""就可以?????????
            }
          }, 1);
        } // 空白鍵可以射擊


        onKeyDown(event) {
          if (event.keyCode === KeyCode.SPACE) {
            console.log("按下SPACE");
            let clickshoot = new Event('click');
            this.onclickshoot(event);
          }
        } // 射擊按鍵


        onclickshoot(event) {
          if (this.bulletcount > 0) {
            console.log("Shoot"); // 複製bulletPrefab(子彈)至addbullet中

            let addbullet = instantiate(this.bulletPrefab); // 將addbullet新增至場景

            this.node.addChild(addbullet); // 獲取addbullet的動畫資訊並放入bulletAni

            let bulletAni = addbullet.getComponent(Animation); // 偵測子彈動畫撥放完畢後從addbullet中移除

            bulletAni.on(Animation.EventType.FINISHED, () => {
              addbullet.parent = null;

              for (let i = 0; i < this.bulletAry.length; i++) {
                if (addbullet == this.bulletAry[i]) {
                  this.bulletAry.splice(i, 1);
                  break;
                }
              } //銷毀子彈節點


              addbullet.destroy;
              console.log("Miss");
            }, this); // 將擊中事件放進陣列

            this.bulletAry.push(addbullet);
            this.bulletcount = this.bulletcount - 1;
            this.bulletcountview.string = "bullet count : " + this.bulletcount;
          }
        } // 計算子彈與敵人距離


        collision(addbullet, enemy) {
          // 計算子彈與敵人間的距離
          let dist = addbullet.position.subtract(enemy.position).length(); // 回傳dist數值

          return dist;
        } // 定義擊中事件


        hit(addbullet, enemy) {
          if (this.collision(addbullet, enemy) < 100) {
            console.log("Hit");
            let bulletAni = addbullet.getComponent(Animation); // 停止監聽子彈移動事件

            bulletAni.off(Animation.EventType.FINISHED, () => {}, this); // 將子彈父節點清空

            addbullet.parent = null;
            console.log(typeof this.score);
            this.score++; // 顯示hit

            this.hitcount.string = "hit:" + this.score;
            return true;
          }
        } // 再來一局


        Again() {
          console.log("再一局");
          this.startview.active = false;
          this.endview.active = false;
          this.gameview.active = true;
          this.shoot.interactable = true;
          this.score = 0;
          this.countdown = 10;
          this.bulletcount = 10;
          this.hitcount.string = "";
          this.bulletcountview.string = "bullet count : " + this.bulletcount;
          this.time.string = "" + this.countdown;
          this.shoot.interactable = true;
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          this.scheduleOnce(() => {
            this.startview.active = false;
            this.endview.active = true;
            this.gameview.active = false;
            this.total.string = "score:" + this.score;
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          }, 10);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startview", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameview", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "endview", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "shoot", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bulletPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "enemy", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "hitcount", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "total", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "time", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "bulletcountview", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

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