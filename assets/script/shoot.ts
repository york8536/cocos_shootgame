import { _decorator, Button, Component, instantiate, Node, Prefab, Animation, Label, Canvas, Input, EventKeyboard, KeyCode, input, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shoot')
export class shoot extends Component {

    @property(Node)
    startview: Node = null;
    @property(Node)
    gameview: Node = null;
    @property(Node)
    endview: Node = null;
    @property(Button)
    shoot:Button = null;
    @property(Prefab)
    bulletPrefab: Prefab = null;
    @property(Node)
    enemy: Node = null;
    @property(Label)
    hitcount: Label = null;
    @property(Label)
    total: Label = null;
    @property(Label)
    time: Label = null;
    @property(Label)
    bulletcountview: Label = null;
    @property(Prefab)
    missPrefab: Prefab = null;

    // 定義bulletAry為陣列，用於存放擊中事件
    bulletAry:Node[] = [];
    score : number = 0 ; //擊中次數
    prepare : number = 3 ; //預備時間
    countdown : number = 10 ; //遊戲時間
    bulletcount : number = 10 ; //子彈數量


    onLoad() {
        // 將HIT字串設定為空值
        this.hitcount.string = "";
        // 將bulletAry陣列設定為空值
        this.bulletAry =[];
        this.startview.active = true;
        this.endview.active = false;
        this.gameview.active = false;
    }

    start() {
    }

    update(deltaTime: number) {
        for(let i = this.bulletAry.length - 1; i >= 0; i--){
            let addbullet = this.bulletAry[i];
            if(this.hit(addbullet, this.enemy)){
                // 清除陣列中檢查完的擊中事件
                this.bulletAry.splice(i,1);
            };
        }
    }


    // 開始遊戲
    startgame(){
        console.log("startgame");
        // // 每0.5秒將addbullet新增至場景,複製bulletPrefab(子彈)至addbullet中 
        // this.schedule(()=>{
        //     let addenemy = instantiate(this.enemy);
        //     this.node.addChild(addenemy)
        // },0.5);
        // 按下開始後隱藏start畫面
        this.startview.active = false;
        this.endview.active = false;
        this.gameview.active = false;
        this.time.node.active = true ;
        // 預備時間
        this.schedule(()=>{
            if(this.prepare>0) {
                this.prepare = this.prepare-1;
                this.time.string = ""+this.prepare; //為啥+""就可以?????????
            }
        },1)
        // 按鍵置能 + 設定預設參數
        this.scheduleOnce(() => {
            this.shoot.node.on('click', this.onclickshoot, this);
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            this.time.string = "10" ;
            this.startview.active = false;
            this.endview.active = false;
            this.gameview.active = true ;
            // 遊戲倒數
            this.schedule(()=>{
                if(this.countdown>0) {
                    this.countdown = this.countdown-1;
                    this.time.string = ""+this.countdown; //為啥+""就可以?????????
                }
            },1)

        }, 3.1);

        // 10秒後隱藏game畫面
        this.scheduleOnce(() => {
            this.startview.active = false;
            this.endview.active = true;
            this.gameview.active = false;
            this.time.node.active = false ;
            this.total.string = "score:" + this.score;
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }, 13);
        this.bulletcountview.string = "bullet count : " + this.bulletcount

        
    }
    // 空白鍵可以射擊
    onKeyDown(event) {
        if(event.keyCode === KeyCode.SPACE) {
            console.log("按下SPACE");
            let clickshoot = new Event('click');
            this.onclickshoot(event);
        }
    }
        // 射擊按鍵
        onclickshoot(event){
        if(this.bulletcount > 0) {
            console.log("Shoot");
            // 複製bulletPrefab(子彈)至addbullet中
            let addbullet = instantiate(this.bulletPrefab);
            // 將addbullet新增至場景
            this.node.addChild(addbullet);
            // 獲取addbullet的動畫資訊並放入bulletAni
            let bulletAni = addbullet.getComponent(Animation);
            // 偵測子彈動畫撥放完畢後從addbullet中移除
            bulletAni.on(Animation.EventType.FINISHED, () => {
                addbullet.parent = null;
                for(let i=0; i<this.bulletAry.length; i++){
                    if(addbullet == this.bulletAry[i]){
                        this.bulletAry.splice(i,1);
                        break;
                    }
                }
                //銷毀子彈節點
                addbullet.destroy;
                console.log("Miss");
                // 複製missPrefab(子彈)至addmiss中                
                let addmiss = instantiate(this.missPrefab);
                // 將addmiss新增至場景
                this.node.addChild(addmiss);
                //0.3秒後移除MISS
                this.scheduleOnce(() => {
                    addmiss.removeFromParent();
                },0.3)
            }, this);
            // 將擊中事件放進陣列
            this.bulletAry.push(addbullet); 
            this.bulletcount = this.bulletcount - 1;
            this.bulletcountview.string = "bullet count : " + this.bulletcount; 
        }

    }
    // 計算子彈與敵人距離
    collision(addbullet, enemy) {
        // 計算子彈與敵人間的距離
        let dist = addbullet.position.subtract(enemy.position).length();
        // 回傳dist數值
        return dist;

    }
    // 定義擊中事件
    hit(addbullet, enemy) {
        if(this.collision(addbullet, enemy) < 100){
            
            console.log("Hit");
            let bulletAni = addbullet.getComponent(Animation);
            // 停止監聽子彈移動事件
            bulletAni.off(Animation.EventType.FINISHED, () => {}, this); 
            // 將子彈父節點清空
            addbullet.parent = null;
            console.log(typeof this.score);

            this.score++;
            // 顯示hit
            this.hitcount.string = "hit:" + this.score;

            return true;
        }
    }
    // 再來一局
    Again() {
        console.log("再一局");
        this.startview.active = false;
        this.endview.active = false;
        this.gameview.active = true;
        this.time.node.active = true ;
        this.shoot.interactable = true; // 按鍵可被點擊
        this.score = 0;
        this.countdown = 10;
        this.bulletcount = 10;
        this.hitcount.string = ""
        this.bulletcountview.string = "bullet count : " + this.bulletcount; 
        this.time.string = ""+this.countdown;
        this.shoot.interactable = true;
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.scheduleOnce(() => {
            this.startview.active = false;
            this.endview.active = true;
            this.gameview.active = false;
            this.time.node.active = false ;
            this.total.string = "score:" + this.score;
            input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }, 10);
    }
}


