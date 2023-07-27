System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, instantiate, Node, Prefab, Animation, Label, Canvas, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _crd, ccclass, property, shoot;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Animation = _cc.Animation;
      Label = _cc.Label;
      Canvas = _cc.Canvas;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "01d614sRHFOgrn/QL/GSTnq", "shoot", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'instantiate', 'Node', 'Prefab', 'Animation', 'Label', 'Canvas']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("shoot", shoot = (_dec = ccclass('shoot'), _dec2 = property(Button), _dec3 = property(Canvas), _dec4 = property(Canvas), _dec5 = property(Canvas), _dec6 = property(Prefab), _dec7 = property(Node), _dec8 = property(Label), _dec9 = property(Label), _dec(_class = (_class2 = class shoot extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "Start", _descriptor, this);

          _initializerDefineProperty(this, "StartCanvas", _descriptor2, this);

          _initializerDefineProperty(this, "Canvas", _descriptor3, this);

          _initializerDefineProperty(this, "endCanvas", _descriptor4, this);

          _initializerDefineProperty(this, "bulletPrefab", _descriptor5, this);

          _initializerDefineProperty(this, "enemy", _descriptor6, this);

          _initializerDefineProperty(this, "hitcount", _descriptor7, this);

          _initializerDefineProperty(this, "total", _descriptor8, this);

          this.bulletAry = [];
          this.x = 0;
        }

        onLoad() {
          // 將HIT字串設定為空值
          this.hitcount.string = ""; // 將bulletAry陣列設定為空值

          this.bulletAry = [];
          this.endCanvas.enabled = false;
          this.Canvas.enabled = false;
        } // @property(Button)
        // shoot_btn: Button=null;


        start() {// this.shoot_btn.node.on('click', this.onclickshoot,this);
        }

        update(deltaTime) {
          for (var i = this.bulletAry.length - 1; i >= 0; i--) {
            var addbullet = this.bulletAry[i];

            if (this.hit(addbullet, this.enemy)) {
              // 清除陣列中檢查完的擊中事件
              this.bulletAry.splice(i, 1);
            }

            ;
          }
        }

        startgame() {
          // 按下開始後隱藏start畫面
          this.StartCanvas.enabled = false;
          this.Canvas.enabled = true; // 10秒後隱藏game畫面

          this.scheduleOnce(() => {
            this.Canvas.enabled = false;
            this.endCanvas.enabled = true;
            this.total.string = "total:" + this.x;
          }, 10);
        }

        onclickshoot(evt) {
          console.log("Shoot"); // 複製bulletPrefab(子彈)至addbullet中

          var addbullet = instantiate(this.bulletPrefab); // 將addbullet新增至場景

          this.node.addChild(addbullet); // 獲取addbullet的動畫資訊並放入bulletAni

          var bulletAni = addbullet.getComponent(Animation); // 偵測子彈動畫撥放完畢後從addbullet中移除

          bulletAni.on(Animation.EventType.FINISHED, () => {
            addbullet.parent = null;

            for (var i = 0; i < this.bulletAry.length; i++) {
              if (addbullet == this.bulletAry[i]) {
                this.bulletAry.splice(i, 1);
                break;
              }
            } //銷毀子彈節點


            addbullet.destroy;
            console.log("Miss");
          }, this); // 將擊中事件放進陣列

          this.bulletAry.push(addbullet);
        }

        collision(addbullet, enemy) {
          // 計算子彈與敵人間的距離
          var dist = addbullet.position.subtract(enemy.position).length(); // 回傳dist數值

          return dist;
        }

        hit(addbullet, enemy) {
          if (this.collision(addbullet, enemy) < 50) {
            console.log("Hit");
            var bulletAni = addbullet.getComponent(Animation); // 停止監聽子彈移動事件

            bulletAni.off(Animation.EventType.FINISHED, () => {}, this); // 將子彈父節點清空

            addbullet.parent = null;
            this.x++; // 顯示hit

            this.hitcount.string = "hit:" + this.x; // 1秒後hit消失

            this.scheduleOnce(function () {
              this.hitcount.string = "";
            }.bind(this), 1);
            return true;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Start", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "StartCanvas", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Canvas", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "endCanvas", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bulletPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "enemy", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "hitcount", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "total", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=329ea732c642c317c22d8f6aab5c834200a467c2.js.map