System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, instantiate, Node, Prefab, Animation, Label, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, shoot;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      instantiate = _cc.instantiate;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Animation = _cc.Animation;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "01d614sRHFOgrn/QL/GSTnq", "shoot", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'instantiate', 'Node', 'Prefab', 'Animation', 'Label']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("shoot", shoot = (_dec = ccclass('shoot'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Label), _dec(_class = (_class2 = class shoot extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "bulletPrefab", _descriptor, this);

          _initializerDefineProperty(this, "enemy", _descriptor2, this);

          _initializerDefineProperty(this, "hit", _descriptor3, this);

          this.bulletAry = [];
        }

        onLoad() {
          this.hit.string = "";
          this.bulletAry = [];
        } // @property(Button)
        // shoot_btn: Button=null;


        start() {// this.shoot_btn.node.on('click', this.onclickshoot,this);
        }

        update(deltaTime) {
          for (var i = 0; i < this.bulletAry.length; i++) {
            var addbullet = this.bulletAry[i];

            if (this.hittime(addbullet, this.enemy)) {
              //清除陣列中檢查完的數
              this.bulletAry.splice(i, 1);
            }

            ;
          }
        }

        onclickshoot(evt) {
          //確認按鍵有吃到此函數
          console.log("按下射擊"); //複製bulletPrefab(子彈)

          var addbullet = instantiate(this.bulletPrefab); //在場景中新增節點

          this.node.addChild(addbullet); //子彈消失

          var bulletAni = addbullet.getComponent(Animation);
          bulletAni.on(Animation.EventType.FINISHED, () => {
            addbullet.parent = null;
          }, this);
          this.bulletAry.push(addbullet);
        }

        collision(addbullet, enemy) {
          var dist = addbullet.position.sub(enemy.position).mag();
          return dist;
        }

        hittime(addbullet, enemy) {
          if (this.collision(addbullet, enemy) < 10) {
            var bulletAni = addbullet.getComponent(Animation); //停止監聽子彈移動事件

            bulletAni.off(Animation.EventType.FINISHED, () => {
              addbullet.parent = null;
            }, this);
            addbullet.parent = null;
            this.hit.string = "hit";
            this.scheduleOnce(function () {
              this.hit.string = "";
            }.bind(this), 1);
            return true;
          }

          return false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bulletPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enemy", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hit", [_dec4], {
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
//# sourceMappingURL=bec02b909642713cf4cc8274ace8ede5fa233ff9.js.map