import { useState, useEffect, useRef } from "react";

/* ───────── 9 DAYS OVERVIEW ───────── */
const DAYS_OVERVIEW = [
    { day: 1, date: "3/7", weekday: "六", title: "抵達高松", route: "桃園 ✈ 高松", hotel: "高松", jrpass: false },
    { day: 2, date: "3/8", weekday: "日", title: "直島藝術巡禮", route: "高松 ⇄ 直島", hotel: "高松", jrpass: false },
    { day: 3, date: "3/9", weekday: "一", title: "豐島・移動日", route: "高松 → 岡山 → 廣島", hotel: "廣島", jrpass: true, jrday: 1 },
    { day: 4, date: "3/10", weekday: "二", title: "廣島市區", route: "廣島", hotel: "廣島", jrpass: true, jrday: 2 },
    { day: 5, date: "3/11", weekday: "三", title: "宮島一日遊", route: "廣島 ⇄ 宮島", hotel: "廣島", jrpass: true, jrday: 3 },
    { day: 6, date: "3/12", weekday: "四", title: "尾道・移動日", route: "廣島 → 尾道 → 岡山", hotel: "岡山", jrpass: true, jrday: 4 },
    { day: 7, date: "3/13", weekday: "五", title: "姬路城", route: "岡山 ⇄ 姬路", hotel: "岡山", jrpass: true, jrday: 5 },
    { day: 8, date: "3/14", weekday: "六", title: "倉敷美觀", route: "岡山 ⇄ 倉敷", hotel: "岡山", jrpass: false },
    { day: 9, date: "3/15", weekday: "日", title: "返回台北", route: "岡山 → 高松 ✈ 桃園", hotel: null, jrpass: false },
];

/* ───────── DAY 1, 2, 3 DETAIL ───────── */
const DAYS_DETAIL = {
    1: {
        day: 1, date: "3/7", weekday: "六", title: "抵達高松", hotel: "高松",
        hotelInfo: { name: "小屋", night: 1, totalNights: 2 },
        sections: [
            {
                title: null, rows: [
                    { time: "14:30", event: "台北桃園起飛", transport: "中華航空 CI 178", info: "經濟艙", hl: true, ic: "plane" },
                    { time: "17:55", event: "抵達高松機場", info: "日本時間", ic: "pin" },
                    { time: "18:20", event: "高松機場出發", transport: "琴空巴士", info: "約45分・¥1,000", place: "高松空港", ic: "bus" },
                    { time: "19:05", event: "抵達JR高松站", place: "JR高松駅", ic: "train" },
                    { time: "19:15", event: "Check in 小屋", ic: "hotel", extra: "寄放行李後出門覓食。" },
                    { time: "19:45", event: "晚餐：一鶴骨付鳥", place: "一鶴 高松店", ic: "food", extra: "招牌是帶骨雞腿，分嫩雞（若）和老雞（親）。建議點若搭白飯。營業到 22:00。" },
                    { time: "21:00", event: "返回住宿", ic: "hotel" },
                ]
            }
        ],
        note: "建築迷加點：香川縣廳舍（丹下健三）步行 15 分",
    },
    2: {
        day: 2, date: "3/8", weekday: "日", title: "直島藝術巡禮", hotel: "高松",
        hotelInfo: { name: "小屋", night: 2, totalNights: 2 },
        sections: [
            {
                title: "去程", rows: [
                    { time: "07:40", event: "JR高松站出發", info: "步行至高松港", ic: "walk" },
                    { time: "08:12", event: "高松港出發", transport: "四國汽船｜渡輪", info: "約50分・¥530", hl: true, place: "高松港", ic: "ferry", extra: "建議上甲板看風景，到港前 10 分鐘回座位。" },
                    { time: "09:02", event: "抵達直島宮浦港", place: "直島宮浦港", ic: "pin" },
                ]
            },
            {
                title: "直島行程", rows: [
                    { time: "09:10", event: "租電動自行車", info: "約¥1,500/日", ic: "bike", extra: "港口出來右手邊就有租車店。島上坡道多，電動車是必須。" },
                    { time: "09:15", event: "紅南瓜", info: "免費", place: "直島 赤かぼちゃ", ic: "art", extra: "就在碼頭旁邊，可走進南瓜裡拍照。早上人少。" },
                    { time: "10:00", event: "地中美術館", info: "需預約・¥2,100", hl: true, place: "地中美術館", ic: "star", extra: "只靠自然光照明。必看：莫內睡蓮廳、James Turrell、Walter De Maria。禁止拍照。" },
                    { time: "12:00", event: "李禹煥美術館", info: "¥1,050", place: "李禹煥美術館", ic: "art", extra: "安藤忠雄設計，戶外廣場的石頭與鐵板作品值得細看。" },
                    { time: "13:00", event: "Benesse House 午餐", place: "ベネッセハウス", ic: "food", extra: "餐廳可看海，午餐套餐約 ¥1,500–2,500。" },
                    { time: "15:00", event: "家 Project", info: "共通券 ¥1,050", place: "家プロジェクト 直島", ic: "art", extra: "6 處藝術空間：角屋、南寺、護王神社、石橋、碁會所、はいしゃ。南寺需排隊，建議先去。" },
                    { time: "16:00", event: "黃南瓜", place: "直島 黄かぼちゃ", ic: "art", extra: "直島最有名的地標，下午順光拍照最美。" },
                    { time: "16:30", event: "還車", ic: "bike" },
                ]
            },
            {
                title: "回程", rows: [
                    { time: "17:00", event: "直島出發", transport: "四國汽船｜渡輪", info: "約60分・¥530", hl: true, ic: "ferry", extra: "最後一班渡輪，務必不要錯過！" },
                    { time: "18:00", event: "抵達高松港", ic: "pin" },
                    { time: "18:30", event: "晚餐：うどんバカ一代", place: "うどんバカ一代", ic: "food", extra: "招牌「釜バターうどん」奶油烏龍麵。" },
                    { time: "20:00", event: "返回住宿", ic: "hotel", extra: "回小屋休息，明天要早起去豐島。" },
                ]
            },
        ],
    },
    3: {
        day: 3, date: "3/9", weekday: "一", title: "豐島・移動日", hotel: "廣島",
        hotelInfo: { name: "格蘭比亞", night: 1, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 1,
        sections: [
            {
                title: "高松", collapsible: true, rows: [
                    { time: "06:30", event: "退房・寄放大行李", info: "JR高松站置物櫃", ic: "bag", extra: "大行李寄 JR 高松站置物櫃（¥600-800），只帶輕便背包去豐島。" },
                    { time: "07:00", event: "前往高松港", info: "步行約10分", ic: "walk" },
                    { time: "07:41", event: "高松港出發", transport: "豐島渡輪｜高速船", info: "約35分・¥1,380", hl: true, place: "高松港", ic: "ferry" },
                ]
            },
            {
                title: "豐島", collapsible: true, rows: [
                    { time: "08:16", event: "抵達豐島家浦港", place: "豐島家浦港", ic: "pin" },
                    { time: "08:30", event: "租電動自行車", info: "約¥1,500/日", ic: "bike", extra: "島上坡道比直島更陡，電動車必備。" },
                    { time: "08:45", event: "豐島橫尾館", info: "¥520", place: "豊島横尾館", ic: "art", extra: "橫尾忠則的作品，老民宅改建，紅色玻璃很有特色。" },
                    { time: "09:30", event: "前往唐櫃地區", info: "騎車約20分（上坡）", ic: "bike" },
                    { time: "10:00", event: "豐島美術館", info: "需預約・¥1,570", hl: true, place: "豊島美術館", ic: "star", extra: "內藤禮×西澤立衛。水滴藝術裝置，禁止拍照。建議停留 1 小時慢慢感受。" },
                    { time: "11:30", event: "唐櫃梯田散步", ic: "walk", extra: "拍照絕佳點，俯瞰瀨戶內海。" },
                    { time: "12:00", event: "島廚房午餐", place: "島キッチン", ic: "food", extra: "地產地消料理，建議預約或早點到。" },
                    { time: "13:00", event: "心臟音博物館", info: "¥520", place: "心臓音のアーカイブ", ic: "art", extra: "可錄下自己的心跳聲。" },
                    { time: "14:00", event: "返回家浦港・還車", info: "騎車約20分", ic: "bike" },
                    { time: "15:10", event: "豐島家浦港出發", transport: "豐島渡輪｜高速船", info: "經直島・約50分", hl: true, ic: "ferry" },
                ]
            },
            {
                title: "移動至廣島", collapsible: true, rows: [
                    { time: "16:00", event: "抵達高松港・取行李", info: "¥1,380", ic: "pin" },
                    { time: "16:40", event: "JR高松站出發", transport: "JR 快速 Marine Liner 48號", info: "岡山行", hl: true, ic: "train", extra: "JR Pass 第一天啟用！" },
                    { time: "17:32", event: "抵達JR岡山站", info: "約52分", place: "JR岡山駅", ic: "train" },
                    { time: "17:47", event: "JR岡山站出發", transport: "山陽新幹線 のぞみ41號", info: "博多行", hl: true, ic: "train" },
                    { time: "18:23", event: "抵達JR廣島站", info: "約36分", place: "JR広島駅", ic: "train" },
                ]
            },
            {
                title: "廣島", collapsible: true, rows: [
                    { time: "18:40", event: "Check in 格蘭比亞", ic: "hotel", extra: "JR 廣島站南口步行 1 分鐘。" },
                    { time: "19:30", event: "晚餐：廣島燒", place: "みっちゃん総本店", ic: "food", extra: "推薦「みっちゃん總本店」，廣島燒名店。" },
                    { time: "21:00", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
        note: "今日啟用 JR Pass（Day 1/5），大行李記得早上先寄放高松站",
    },
    4: {
        day: 4, date: "3/10", weekday: "二", title: "廣島市區", hotel: "廣島",
        hotelInfo: { name: "格蘭比亞", night: 2, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 2,
        sections: [
            {
                title: "和平紀念公園", collapsible: true, rows: [
                    { time: "08:30", event: "飯店出發", ic: "hotel" },
                    { time: "08:45", event: "JR廣島站出發", transport: "廣島電鐵｜2號線", info: "原爆圓頂前行", ic: "train" },
                    { time: "09:00", event: "抵達原爆圓頂前站", info: "約15分・¥220", ic: "pin" },
                    { time: "09:00", event: "廣島和平紀念資料館", info: "¥200・約2hr", hl: true, place: "広島平和記念資料館", ic: "star", extra: "非常震撼的展覽，建議預留充足時間。" },
                    { time: "11:00", event: "原爆圓頂・和平公園", place: "原爆ドーム", ic: "art", extra: "丹下健三設計的和平公園，世界遺產。" },
                    { time: "12:00", event: "午餐：長田屋", place: "長田屋", ic: "food", extra: "廣島燒名店，就在和平公園附近。" },
                ]
            },
            {
                title: "廣島城周邊", collapsible: true, rows: [
                    { time: "13:30", event: "原爆圓頂前站出發", transport: "廣島電鐵｜2號線", info: "廣島站行", ic: "train" },
                    { time: "13:40", event: "抵達紙屋町東站", info: "約10分", ic: "pin" },
                    { time: "14:00", event: "廣島城", info: "¥370", place: "広島城", ic: "art", extra: "步行 15 分可達，天守閣可眺望市區。" },
                    { time: "15:30", event: "紙屋町東站出發", transport: "廣島電鐵｜9號線", info: "白島行", ic: "train" },
                    { time: "15:40", event: "抵達縮景園前站", ic: "pin" },
                    { time: "15:45", event: "縮景園", info: "¥260", place: "縮景園", ic: "art", extra: "江戶時代的日式庭園，四季皆美。" },
                ]
            },
            {
                title: "晚間", collapsible: true, rows: [
                    { time: "17:00", event: "本通商店街購物", place: "本通商店街", ic: "walk" },
                    { time: "18:30", event: "晚餐", ic: "food" },
                    { time: "20:00", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
    },
    5: {
        day: 5, date: "3/11", weekday: "三", title: "宮島一日遊", hotel: "廣島",
        hotelInfo: { name: "格蘭比亞", night: 3, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 3,
        sections: [
            {
                title: "去程", collapsible: true, rows: [
                    { time: "08:30", event: "JR廣島站出發", transport: "JR山陽本線｜普通", info: "岩國行", hl: true, ic: "train" },
                    { time: "08:58", event: "抵達JR宮島口站", info: "約28分・JR Pass", place: "JR宮島口駅", ic: "train" },
                    { time: "09:05", event: "步行至宮島口棧橋", info: "約5分", ic: "walk" },
                    { time: "09:15", event: "宮島口棧橋出發", transport: "JR西日本宮島渡輪", info: "約10分・JR Pass", hl: true, ic: "ferry" },
                    { time: "09:25", event: "抵達宮島棧橋", info: "宮島訪問稅 ¥100", place: "宮島桟橋", ic: "pin" },
                ]
            },
            {
                title: "宮島", collapsible: true, rows: [
                    { time: "09:30", event: "嚴島神社", info: "¥300・世界遺產", hl: true, place: "厳島神社", ic: "star", extra: "海上神社，漲潮時大鳥居浮在海上特別美。" },
                    { time: "10:30", event: "海上大鳥居", place: "大鳥居", ic: "art", extra: "退潮時可走近鳥居。" },
                    { time: "11:00", event: "彌山纜車", transport: "紅葉谷線", info: "來回 ¥1,840", place: "宮島ロープウェイ", ic: "train", extra: "搭纜車上山，再步行約 30 分登頂。" },
                    { time: "12:30", event: "彌山山頂展望台", place: "弥山展望台", ic: "pin", extra: "瀨戶內海絕景，值得爬上去。" },
                    { time: "13:30", event: "午餐：穴子飯", place: "うえの", ic: "food", extra: "宮島名物星鰻飯，推薦「うえの」。" },
                    { time: "14:30", event: "表參道商店街", place: "表参道商店街", ic: "walk", extra: "紅葉饅頭、烤牡蠣，邊走邊吃。" },
                    { time: "15:30", event: "大願寺・五重塔", place: "大願寺", ic: "art" },
                ]
            },
            {
                title: "回程", collapsible: true, rows: [
                    { time: "16:00", event: "宮島棧橋出發", transport: "JR西日本宮島渡輪", info: "約10分・JR Pass", hl: true, ic: "ferry" },
                    { time: "16:10", event: "抵達宮島口棧橋", ic: "pin" },
                    { time: "16:20", event: "JR宮島口站出發", transport: "JR山陽本線｜普通", info: "廣島行", ic: "train" },
                    { time: "16:47", event: "抵達JR廣島站", info: "約27分・JR Pass", ic: "train" },
                    { time: "17:30", event: "自由活動・晚餐", ic: "food" },
                    { time: "20:00", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
        note: "記得查潮汐時間，退潮時可走到大鳥居下方",
    },
    6: {
        day: 6, date: "3/12", weekday: "四", title: "尾道・移動日", hotel: "岡山",
        hotelInfo: { name: "皇冠假日", night: 1, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 4,
        sections: [
            {
                title: "移動至尾道", collapsible: true, rows: [
                    { time: "08:00", event: "退房・寄物", info: "廣島站置物櫃", ic: "bag" },
                    { time: "08:24", event: "JR廣島站出發", transport: "山陽新幹線｜こだま840號", info: "新大阪行", hl: true, ic: "train" },
                    { time: "08:40", event: "抵達JR三原站", info: "約16分・JR Pass", ic: "train" },
                    { time: "08:55", event: "JR三原站出發", transport: "JR山陽本線｜普通", info: "岡山行", ic: "train" },
                    { time: "09:08", event: "抵達JR尾道站", info: "約13分・JR Pass", place: "JR尾道駅", ic: "train" },
                    { time: "09:15", event: "尾道站寄物", info: "置物櫃 ¥400", ic: "bag" },
                ]
            },
            {
                title: "尾道", collapsible: true, rows: [
                    { time: "09:30", event: "千光寺山纜車", transport: "纜車", info: "單程 ¥320", place: "千光寺山ロープウェイ", ic: "train", extra: "JR Pass 可享 9 折。" },
                    { time: "09:35", event: "抵達山頂站", ic: "pin" },
                    { time: "10:00", event: "千光寺・展望台", place: "千光寺", ic: "star", extra: "眺望瀨戶內海和尾道水道，絕景！" },
                    { time: "10:30", event: "貓之細道・文學小路", info: "下山步行約30分", place: "猫の細道", ic: "walk", extra: "沿途有很多貓咪石和文學碑，慢慢走很有味道。" },
                    { time: "11:30", event: "本通商店街散策", place: "尾道本通り商店街", ic: "walk" },
                    { time: "12:30", event: "尾道拉麵午餐", place: "朱華園", ic: "food", extra: "尾道拉麵特色是小魚乾湯底加豬背油。" },
                    { time: "14:00", event: "海岸通散步", ic: "walk" },
                ]
            },
            {
                title: "移動至岡山", collapsible: true, rows: [
                    { time: "15:25", event: "JR尾道站出發", transport: "JR山陽本線｜普通", info: "岡山行", ic: "train" },
                    { time: "15:45", event: "抵達JR福山站", info: "約20分", ic: "train" },
                    { time: "16:05", event: "JR福山站出發", transport: "山陽新幹線｜さくら556號", info: "新大阪行", hl: true, ic: "train" },
                    { time: "16:25", event: "抵達JR岡山站", info: "約20分・JR Pass", place: "JR岡山駅", ic: "train" },
                    { time: "17:00", event: "Check in 皇冠假日", ic: "hotel" },
                    { time: "18:00", event: "晚餐：デミカツ丼", ic: "food", extra: "岡山名物，豬排淋上特製醬汁。" },
                    { time: "20:00", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
    },
    7: {
        day: 7, date: "3/13", weekday: "五", title: "姬路城", hotel: "岡山",
        hotelInfo: { name: "皇冠假日", night: 2, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 5,
        sections: [
            {
                title: "去程", collapsible: true, rows: [
                    { time: "08:35", event: "JR岡山站出發", transport: "山陽新幹線｜さくら544號", info: "新大阪行", hl: true, ic: "train" },
                    { time: "08:55", event: "抵達JR姬路站", info: "約20分・JR Pass", place: "JR姫路駅", ic: "train" },
                ]
            },
            {
                title: "姬路", collapsible: true, rows: [
                    { time: "09:00", event: "步行至姬路城", info: "約15分・大手前通", ic: "walk", extra: "從車站一路延伸的大道，遠遠就能看到白色城堡。" },
                    { time: "09:15", event: "姬路城", info: "¥1,050・日本國寶", hl: true, place: "姫路城", ic: "star", extra: "白鷺城，日本現存最完整的城堡，世界遺產。建議預留 2-3 小時。" },
                    { time: "12:00", event: "好古園", info: "¥310", place: "好古園", ic: "art", extra: "姬路城旁的日式庭園，9 個不同風格的庭園。" },
                    { time: "13:00", event: "午餐", ic: "food" },
                    { time: "14:00", event: "姬路站周邊購物", ic: "walk" },
                ]
            },
            {
                title: "回程・岡山下午", collapsible: true, rows: [
                    { time: "15:14", event: "JR姬路站出發", transport: "山陽新幹線｜さくら561號", info: "鹿兒島中央行", hl: true, ic: "train" },
                    { time: "15:33", event: "抵達JR岡山站", info: "約19分・JR Pass", ic: "train" },
                    { time: "15:45", event: "JR岡山站出發", transport: "岡山電氣軌道｜東山線", info: "城下行", ic: "train" },
                    { time: "15:50", event: "抵達城下站", info: "約5分", ic: "pin" },
                    { time: "16:00", event: "岡山後樂園", info: "¥410・日本三大名園", place: "岡山後楽園", ic: "star", extra: "日本三大名園之一，從園內可眺望岡山城。" },
                    { time: "17:30", event: "岡山城", info: "¥400", place: "岡山城", ic: "art", extra: "黑色外觀又稱「烏城」。" },
                    { time: "18:30", event: "晚餐", ic: "food" },
                    { time: "20:00", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
        note: "JR Pass 最後一天！",
    },
    8: {
        day: 8, date: "3/14", weekday: "六", title: "倉敷美觀", hotel: "岡山",
        hotelInfo: { name: "皇冠假日", night: 3, totalNights: 3, breakfast: true },
        sections: [
            {
                title: "去程", collapsible: true, rows: [
                    { time: "09:03", event: "JR岡山站出發", transport: "JR山陽本線｜普通", info: "三原行", ic: "train" },
                    { time: "09:20", event: "抵達JR倉敷站", info: "約17分", place: "JR倉敷駅", ic: "train" },
                    { time: "09:30", event: "步行至美觀地區", info: "約15分", ic: "walk" },
                ]
            },
            {
                title: "倉敷美觀地區", collapsible: true, rows: [
                    { time: "10:00", event: "大原美術館", info: "¥2,000", hl: true, place: "大原美術館", ic: "star", extra: "日本最早的西洋美術館，收藏艾爾乔雷柯、莫內等大師作品。" },
                    { time: "12:00", event: "午餐：町家咖啡廳", ic: "food", extra: "美觀地區有很多改建自老町家的咖啡廳。" },
                    { time: "13:30", event: "倉敷常春藤廣場", place: "倉敷アイビースクエア", ic: "art", extra: "紅磚建築配上常春藤，很有氣氛。" },
                    { time: "14:30", event: "倉敷川遊船", info: "約20分・¥500", place: "くらしき川舟流し", ic: "ferry", extra: "搭小船遊覽倉敷川，從水面欣賞白壁街景。" },
                    { time: "15:30", event: "商店街・倉敷帆布購物", place: "倉敷帆布", ic: "walk", extra: "倉敷帆布是當地特產，包包很耐用。" },
                ]
            },
            {
                title: "回程", collapsible: true, rows: [
                    { time: "17:00", event: "JR倉敷站出發", transport: "JR山陽本線｜普通", info: "岡山行", ic: "train" },
                    { time: "17:17", event: "抵達JR岡山站", info: "約17分", ic: "train" },
                    { time: "18:00", event: "晚餐", ic: "food" },
                    { time: "20:00", event: "返回住宿", ic: "hotel", extra: "最後一晚，早點休息準備明天回程。" },
                ]
            },
        ],
    },
    9: {
        day: 9, date: "3/15", weekday: "日", title: "返回台北", hotel: null,
        sections: [
            {
                title: "岡山→高松", collapsible: true, rows: [
                    { time: "09:00", event: "退房", ic: "hotel" },
                    { time: "10:13", event: "JR岡山站出發", transport: "JR 快速 Marine Liner 29號", info: "高松行", hl: true, ic: "train" },
                    { time: "11:06", event: "抵達JR高松站", info: "約53分", place: "JR高松駅", ic: "train" },
                    { time: "11:15", event: "JR高松站寄物", info: "置物櫃", ic: "bag" },
                ]
            },
            {
                title: "高松", collapsible: true, rows: [
                    { time: "11:20", event: "JR高松站出發", transport: "JR高德線｜普通", info: "栗林公園北口行", ic: "train" },
                    { time: "11:23", event: "抵達栗林公園北口站", info: "約3分", ic: "pin" },
                    { time: "11:30", event: "栗林公園", info: "¥410・特別名勝", place: "栗林公園", ic: "star", extra: "日本三大名園之外的隱藏版，庭園造景非常精緻。" },
                    { time: "13:00", event: "午餐：讚岐烏龍麵巡禮", place: "竹清", ic: "food", extra: "推薦「竹清」或「がもう」，最後再吃一次讚岐烏龍麵！" },
                    { time: "15:00", event: "高松商店街採買伴手禮", place: "高松中央商店街", ic: "walk" },
                ]
            },
            {
                title: "返回台北", collapsible: true, rows: [
                    { time: "16:00", event: "JR高松站取行李", ic: "bag" },
                    { time: "16:30", event: "JR高松站出發", transport: "琴空巴士｜機場連絡巴士", info: "高松機場行", hl: true, ic: "bus" },
                    { time: "17:15", event: "抵達高松機場", info: "約45分・¥1,000", place: "高松空港", ic: "plane" },
                    { time: "17:30", event: "Check in・出境", ic: "plane" },
                    { time: "18:55", event: "高松機場起飛", transport: "中華航空 CI 179", hl: true, ic: "plane" },
                    { time: "21:05", event: "抵達台北桃園", info: "台灣時間", ic: "pin", extra: "回家！" },
                ]
            },
        ],
        note: "記得預留時間逛高松商店街買伴手禮",
    },
    4: {
        day: 4, date: "3/10", weekday: "二", title: "廣島市區", hotel: "廣島",
        hotelInfo: { name: "格蘭比亞", night: 2, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 2,
        sections: [
            {
                title: "和平公園", collapsible: true, rows: [
                    { time: "08:30", event: "飯店出發", ic: "hotel" },
                    { time: "08:45", event: "JR廣島站出發", transport: "廣島電鐵｜2號線", info: "原爆圓頂前行", ic: "train" },
                    { time: "09:00", event: "抵達原爆圓頂前站", info: "約15分・¥220", ic: "pin" },
                    { time: "09:00", event: "廣島和平紀念資料館", info: "¥200・約2hr", hl: true, place: "広島平和記念資料館", ic: "star", extra: "必看，了解原爆歷史。建議預留充足時間。" },
                    { time: "11:00", event: "原爆圓頂・和平公園", place: "原爆ドーム", ic: "art", extra: "丹下健三設計的和平公園，世界遺產。" },
                    { time: "12:00", event: "午餐：長田屋", place: "長田屋", ic: "food", extra: "和平公園附近的廣島燒名店。" },
                ]
            },
            {
                title: "廣島城・縮景園", collapsible: true, rows: [
                    { time: "13:30", event: "原爆圓頂前站出發", transport: "廣島電鐵｜2號線", info: "廣島站行", ic: "train" },
                    { time: "13:40", event: "抵達紙屋町東站", info: "約10分", ic: "pin" },
                    { time: "14:00", event: "廣島城", info: "¥370", place: "広島城", ic: "art", extra: "步行約 15 分鐘可到。" },
                    { time: "15:30", event: "紙屋町東站出發", transport: "廣島電鐵｜9號線", info: "白島行", ic: "train" },
                    { time: "15:40", event: "抵達縮景園前站", ic: "pin" },
                    { time: "15:45", event: "縮景園", info: "¥260", place: "縮景園", ic: "art", extra: "日式庭園，適合散步。" },
                    { time: "17:00", event: "本通商店街", place: "本通商店街", ic: "walk", extra: "購物、逛街。" },
                ]
            },
            {
                title: null, rows: [
                    { time: "18:30", event: "晚餐", ic: "food" },
                    { time: "20:30", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
    },
    5: {
        day: 5, date: "3/11", weekday: "三", title: "宮島一日遊", hotel: "廣島",
        hotelInfo: { name: "格蘭比亞", night: 3, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 3,
        sections: [
            {
                title: "去程", collapsible: true, rows: [
                    { time: "08:30", event: "JR廣島站出發", transport: "JR山陽本線｜普通", info: "岩國行", hl: true, ic: "train" },
                    { time: "08:58", event: "抵達JR宮島口站", info: "約28分・JR Pass", place: "JR宮島口駅", ic: "train" },
                    { time: "09:05", event: "步行至宮島口棧橋", info: "約5分", ic: "walk" },
                    { time: "09:15", event: "宮島口棧橋出發", transport: "JR西日本宮島渡輪", info: "約10分・JR Pass", hl: true, ic: "ferry" },
                    { time: "09:25", event: "抵達宮島棧橋", info: "需付宮島訪問稅¥100", place: "宮島桟橋", ic: "pin" },
                ]
            },
            {
                title: "宮島", collapsible: true, rows: [
                    { time: "09:30", event: "嚴島神社", info: "¥300・世界遺產", hl: true, place: "厳島神社", ic: "star", extra: "步行約 10 分鐘。海上神社，必看。" },
                    { time: "10:30", event: "海上大鳥居", place: "大鳥居", ic: "art", extra: "退潮時可走近拍照。" },
                    { time: "11:00", event: "彌山纜車", info: "來回¥1,840", place: "宮島ロープウェイ", ic: "train", extra: "紅葉谷線上山。" },
                    { time: "12:30", event: "彌山山頂展望台", place: "弥山展望台", ic: "walk", extra: "步行約 30 分登頂，眺望瀨戶內海。" },
                    { time: "13:30", event: "午餐：穴子飯", place: "うえの", ic: "food", extra: "推薦「うえの」，宮島名物星鰻飯。" },
                    { time: "14:30", event: "表參道商店街", place: "表参道商店街", ic: "walk", extra: "紅葉饅頭、牡蠣、名產購物。" },
                    { time: "15:30", event: "大願寺・五重塔", place: "大願寺", ic: "art" },
                ]
            },
            {
                title: "回程", collapsible: true, rows: [
                    { time: "16:00", event: "宮島棧橋出發", transport: "JR西日本宮島渡輪", info: "約10分・JR Pass", hl: true, ic: "ferry" },
                    { time: "16:10", event: "抵達宮島口棧橋", ic: "pin" },
                    { time: "16:20", event: "JR宮島口站出發", transport: "JR山陽本線｜普通", info: "廣島行", ic: "train" },
                    { time: "16:47", event: "抵達JR廣島站", info: "約27分・JR Pass", ic: "train" },
                    { time: "17:30", event: "自由活動・晚餐", ic: "food" },
                    { time: "20:30", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
    },
    6: {
        day: 6, date: "3/12", weekday: "四", title: "尾道・移動日", hotel: "岡山",
        hotelInfo: { name: "皇冠假日", night: 1, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 4,
        sections: [
            {
                title: "移動至尾道", collapsible: true, rows: [
                    { time: "08:00", event: "退房・寄物", info: "廣島站置物櫃", ic: "bag" },
                    { time: "08:24", event: "JR廣島站出發", transport: "山陽新幹線｜こだま840號", info: "新大阪行", hl: true, ic: "train" },
                    { time: "08:40", event: "抵達JR三原站", info: "約16分・JR Pass", ic: "train" },
                    { time: "08:55", event: "JR三原站出發", transport: "JR山陽本線｜普通", info: "岡山行", ic: "train" },
                    { time: "09:08", event: "抵達JR尾道站", info: "約13分・JR Pass", place: "JR尾道駅", ic: "train" },
                    { time: "09:15", event: "尾道站寄物", info: "置物櫃¥400", ic: "bag" },
                ]
            },
            {
                title: "尾道", collapsible: true, rows: [
                    { time: "09:30", event: "千光寺山纜車", info: "單程¥320", place: "千光寺山ロープウェイ", ic: "train", extra: "JR Pass 可享 9 折。" },
                    { time: "09:35", event: "抵達山頂站", ic: "pin" },
                    { time: "10:00", event: "千光寺・展望台", place: "千光寺", ic: "art", extra: "眺望瀨戶內海絕景。" },
                    { time: "10:30", event: "貓之細道・文學小路", place: "猫の細道", ic: "walk", extra: "下山散步約 30 分鐘，很有氣氛的小路。" },
                    { time: "11:30", event: "本通商店街散策", place: "尾道本通り商店街", ic: "walk" },
                    { time: "12:30", event: "午餐：尾道拉麵", place: "朱華園", ic: "food", extra: "推薦「朱華園」，尾道拉麵名店。" },
                    { time: "14:00", event: "海岸通散步", ic: "walk" },
                ]
            },
            {
                title: "移動至岡山", collapsible: true, rows: [
                    { time: "15:25", event: "JR尾道站出發", transport: "JR山陽本線｜普通", info: "岡山行", ic: "train" },
                    { time: "15:45", event: "抵達JR福山站", info: "約20分", ic: "train" },
                    { time: "16:05", event: "JR福山站出發", transport: "山陽新幹線｜さくら556號", info: "新大阪行", hl: true, ic: "train" },
                    { time: "16:25", event: "抵達JR岡山站", info: "約20分・JR Pass", place: "JR岡山駅", ic: "train" },
                    { time: "17:00", event: "Check in 皇冠假日", ic: "hotel", extra: "岡山 ANA 皇冠假日酒店。" },
                    { time: "18:00", event: "晚餐：デミカツ丼", ic: "food", extra: "岡山名物炸豬排蓋飯。" },
                    { time: "20:30", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
    },
    7: {
        day: 7, date: "3/13", weekday: "五", title: "姬路城", hotel: "岡山",
        hotelInfo: { name: "皇冠假日", night: 2, totalNights: 3, breakfast: true },
        jrpass: true, jrday: 5,
        sections: [
            {
                title: "姬路", collapsible: true, rows: [
                    { time: "08:35", event: "JR岡山站出發", transport: "山陽新幹線｜さくら544號", info: "新大阪行", hl: true, ic: "train" },
                    { time: "08:55", event: "抵達JR姬路站", info: "約20分・JR Pass", place: "JR姫路駅", ic: "train" },
                    { time: "09:00", event: "步行至姬路城", info: "約15分・大手前通", ic: "walk" },
                    { time: "09:15", event: "姬路城", info: "¥1,050・日本國寶", hl: true, place: "姫路城", ic: "star", extra: "白鷺城，日本最美城堡。建議預留 2-3 小時。" },
                    { time: "12:00", event: "好古園", info: "¥310", place: "好古園", ic: "art", extra: "步行 5 分鐘，日式庭園。" },
                    { time: "13:00", event: "午餐", ic: "food" },
                    { time: "14:00", event: "姬路站周邊購物", ic: "walk" },
                ]
            },
            {
                title: "返回岡山・後樂園", collapsible: true, rows: [
                    { time: "15:14", event: "JR姬路站出發", transport: "山陽新幹線｜さくら561號", info: "鹿兒島中央行", hl: true, ic: "train" },
                    { time: "15:33", event: "抵達JR岡山站", info: "約19分・JR Pass", ic: "train" },
                    { time: "15:45", event: "JR岡山站出發", transport: "岡山電氣軌道｜東山線", info: "城下行", ic: "train" },
                    { time: "15:50", event: "抵達城下站", info: "約5分", ic: "pin" },
                    { time: "16:00", event: "岡山後樂園", info: "¥410", hl: true, place: "岡山後楽園", ic: "star", extra: "日本三大名園之一，步行 10 分鐘可到。" },
                    { time: "17:30", event: "岡山城", info: "¥400", place: "岡山城", ic: "art" },
                    { time: "18:30", event: "晚餐", ic: "food" },
                    { time: "20:30", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
    },
    8: {
        day: 8, date: "3/14", weekday: "六", title: "倉敷美觀", hotel: "岡山",
        hotelInfo: { name: "皇冠假日", night: 3, totalNights: 3, breakfast: true },
        sections: [
            {
                title: "倉敷", collapsible: true, rows: [
                    { time: "09:03", event: "JR岡山站出發", transport: "JR山陽本線｜普通", info: "三原行", ic: "train" },
                    { time: "09:20", event: "抵達JR倉敷站", info: "約17分", place: "JR倉敷駅", ic: "train" },
                    { time: "09:30", event: "步行至美觀地區", info: "約15分", ic: "walk" },
                    { time: "10:00", event: "大原美術館", info: "¥2,000", hl: true, place: "大原美術館", ic: "star", extra: "日本最早的西洋美術館，必看莫內、畢卡索等名作。" },
                    { time: "12:00", event: "午餐：町家咖啡廳", ic: "food" },
                    { time: "13:30", event: "倉敷常春藤廣場", place: "倉敷アイビースクエア", ic: "art", extra: "紅磚建築，很好拍。" },
                    { time: "14:30", event: "倉敷川遊船", info: "約20分・¥500", place: "倉敷川", ic: "ferry", extra: "從川上欣賞白壁建築群。" },
                    { time: "15:30", event: "商店街・倉敷帆布購物", place: "倉敷美観地区", ic: "walk", extra: "倉敷帆布是當地名產。" },
                ]
            },
            {
                title: "返回岡山", collapsible: true, rows: [
                    { time: "17:00", event: "JR倉敷站出發", transport: "JR山陽本線｜普通", info: "岡山行", ic: "train" },
                    { time: "17:17", event: "抵達JR岡山站", info: "約17分", ic: "train" },
                    { time: "18:00", event: "晚餐", ic: "food" },
                    { time: "20:30", event: "返回住宿", ic: "hotel" },
                ]
            },
        ],
        note: "今日 JR Pass 已過期，倉敷來回需自費（約¥660）",
    },
    9: {
        day: 9, date: "3/15", weekday: "日", title: "返回台北", hotel: null,
        sections: [
            {
                title: "栗林公園", collapsible: true, rows: [
                    { time: "09:00", event: "退房", ic: "bag" },
                    { time: "10:13", event: "JR岡山站出發", transport: "JR快速 Marine Liner 29號", info: "高松行", hl: true, ic: "train" },
                    { time: "11:06", event: "抵達JR高松站", info: "約53分", place: "JR高松駅", ic: "train" },
                    { time: "11:15", event: "JR高松站寄物", info: "置物櫃", ic: "bag" },
                    { time: "11:20", event: "JR高松站出發", transport: "JR高德線｜普通", info: "栗林公園北口行", ic: "train" },
                    { time: "11:23", event: "抵達栗林公園北口站", info: "約3分", ic: "pin" },
                    { time: "11:30", event: "栗林公園", info: "¥410・特別名勝", hl: true, place: "栗林公園", ic: "star", extra: "日本最大的迴遊式庭園。" },
                ]
            },
            {
                title: "午餐・返程", collapsible: true, rows: [
                    { time: "13:00", event: "午餐：讚岐烏龍麵", place: "竹清", ic: "food", extra: "推薦「竹清」或「がもう」。" },
                    { time: "15:00", event: "高松商店街採買伴手禮", place: "高松中央商店街", ic: "walk" },
                    { time: "16:00", event: "JR高松站取行李", ic: "bag" },
                    { time: "16:30", event: "JR高松站出發", transport: "琴空巴士｜機場連絡巴士", info: "高松機場行", ic: "bus" },
                    { time: "17:15", event: "抵達高松機場", info: "約45分・¥1,000", place: "高松空港", ic: "plane" },
                    { time: "17:30", event: "Check in・出境", ic: "plane" },
                    { time: "18:55", event: "高松機場起飛", transport: "中華航空 CI 179", hl: true, ic: "plane" },
                    { time: "21:05", event: "抵達台北桃園", info: "台灣時間", ic: "plane", extra: "旅程結束！" },
                ]
            },
        ],
        note: "回程班機 18:55，建議 16:30 前抵達機場",
    },
};

const HOTELS = [
    { name: "Airbnb 日本 Kagawa Takamatsu 的小屋", location: "高松", dates: "3/7 – 3/8", nights: 2, breakfast: false },
    { name: "廣島南門格蘭比亞大飯店", location: "廣島", dates: "3/9 – 3/11", nights: 3, breakfast: true },
    { name: "岡山 ANA 皇冠假日酒店", location: "岡山", dates: "3/12 – 3/14", nights: 3, breakfast: true },
];

/* ───────── INFO TAB DATA ───────── */
const CHECKLIST = [
    { id: "chichu", text: "地中美術館門票預約", link: "https://www.e-tix.jp/chichu/", note: "1個月前開放" },
    { id: "teshima", text: "豐島美術館門票預約", link: "https://www.e-tix.jp/teshima-artmuseum/", note: "1個月前開放" },
    { id: "jrpass", text: "JR瀨戶內地區鐵路周遊券購買", note: "¥22,000/5日" },
    { id: "offline", text: "下載 Google Maps 離線地圖", note: "直島、豐島收訊弱" },
];

const BUDGET = [
    {
        category: "交通", items: [
            { name: "JR瀨戶內地區鐵路周遊券（5日）", price: 22000 },
            { name: "直島船票（渡輪來回）", price: 1060 },
            { name: "豐島船票（高速船來回）", price: 2760 },
            { name: "機場巴士（來回）", price: 2000 },
            { name: "租自行車（2日）", price: 3000 },
        ]
    },
    {
        category: "門票", items: [
            { name: "地中美術館", price: 2100 },
            { name: "豐島美術館", price: 1570 },
            { name: "家 Project 共通券", price: 1050 },
            { name: "大原美術館", price: 2000 },
            { name: "姬路城 + 好古園", price: 1360 },
            { name: "彌山纜車", price: 1840 },
            { name: "千光寺纜車", price: 320 },
            { name: "宮島訪問稅", price: 100 },
        ]
    },
];

const TIPS = [
    { icon: "art", title: "美術館預約", text: "地中美術館、豐島美術館務必提前1個月預約" },
    { icon: "bag", title: "3/9 行李", text: "早上出發前將大行李寄放 JR 高松站，效率最高" },
    { icon: "ticket", title: "JR Pass 啟用", text: "3/9 從高松出發時啟用，可用至 3/13（共5日）" },
    { icon: "ferry", title: "船班天候", text: "瀨戶內海 3 月仍可能有強風，請關注當日運航資訊" },
    { icon: "walk", title: "穿著建議", text: "3 月氣溫約 8-15°C，建議洋蔥式穿搭" },
    { icon: "clock", title: "時刻確認", text: "以上時刻為參考，出發前請再確認最新班次" },
];

const FERRY_SCHEDULE = [
    { date: "3/8（日）", route: "高松港 → 直島宮浦港", depart: "08:12", arrive: "09:02", company: "四國汽船｜渡輪", price: "¥530" },
    { date: "3/8（日）", route: "直島宮浦港 → 高松港", depart: "17:00", arrive: "18:00", company: "四國汽船｜渡輪", price: "¥530" },
    { date: "3/9（一）", route: "高松港 → 豐島家浦港", depart: "07:41", arrive: "08:16", company: "豐島渡輪｜高速船", price: "¥1,380" },
    { date: "3/9（一）", route: "豐島家浦港 → 高松港", depart: "15:10", arrive: "16:00", company: "豐島渡輪｜高速船", price: "¥1,380" },
    { date: "3/11（三）", route: "宮島口 → 宮島", depart: "09:15", arrive: "09:25", company: "JR 宮島渡輪", price: "JR Pass" },
    { date: "3/11（三）", route: "宮島 → 宮島口", depart: "16:00", arrive: "16:10", company: "JR 宮島渡輪", price: "JR Pass" },
];

const JR_SCHEDULE = [
    { date: "3/9（一）", route: "高松 → 岡山", depart: "16:40", arrive: "17:32", train: "Marine Liner 48號" },
    { date: "3/9（一）", route: "岡山 → 廣島", depart: "17:47", arrive: "18:23", train: "のぞみ 41號" },
    { date: "3/11（三）", route: "廣島 → 宮島口", depart: "08:30", arrive: "08:58", train: "JR 山陽本線" },
    { date: "3/12（四）", route: "廣島 → 三原", depart: "08:24", arrive: "08:40", train: "こだま 840號" },
    { date: "3/12（四）", route: "三原 → 尾道", depart: "08:55", arrive: "09:08", train: "JR 山陽本線" },
    { date: "3/12（四）", route: "福山 → 岡山", depart: "16:05", arrive: "16:25", train: "さくら 556號" },
    { date: "3/13（五）", route: "岡山 → 姬路", depart: "08:35", arrive: "08:55", train: "さくら 544號" },
    { date: "3/13（五）", route: "姬路 → 岡山", depart: "15:14", arrive: "15:33", train: "さくら 561號" },
    { date: "3/14（六）", route: "岡山 → 倉敷", depart: "09:03", arrive: "09:20", train: "JR 山陽本線" },
    { date: "3/15（日）", route: "岡山 → 高松", depart: "10:13", arrive: "11:06", train: "Marine Liner 29號" },
];

const TICKET_CATEGORIES = [
    { id: "flight", name: "機票", icon: "✈️" },
    { id: "jrpass", name: "JR Pass", icon: "🚄" },
    { id: "museum", name: "美術館", icon: "🎨" },
    { id: "ferry", name: "船票", icon: "🚢" },
    { id: "hotel", name: "住宿", icon: "🏨" },
    { id: "other", name: "其他", icon: "📄" },
];

/* ───────── ICONS (手繪風格單色線條) ───────── */
const I = {
    plane: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2a4 4 0 0 0-4-4H8l-4-6" /><path d="M3 18h3" /><path d="M6 12l-3 6" /><path d="M8 10V6c0-.55.45-1 1-1h2" /><path d="M14 10l7-3" /><path d="M10 18h11" /></svg>,
    train: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 19V5c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v14" /><path d="M6 11h12" /><path d="M6 7h12" /><circle cx="9" cy="15" r="1.5" /><circle cx="15" cy="15" r="1.5" /><path d="M7 19l-2 3" /><path d="M17 19l2 3" /></svg>,
    bus: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18v2" /><path d="M19 18v2" /><path d="M5 18H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1" /><path d="M16 18H8" /><path d="M2 10h20" /><circle cx="7" cy="14" r="1.5" /><circle cx="17" cy="14" r="1.5" /></svg>,
    ferry: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17c1.5 2 4 3 6 3s3.5-1 6-3c2.5 2 4.5 3 6 3" /><path d="M5 14l2-6h10l2 6" /><path d="M12 8V4" /><path d="M9 4h6" /></svg>,
    bike: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5.5" cy="17.5" r="3" /><circle cx="18.5" cy="17.5" r="3" /><path d="M12 17.5l-3.5-7 5-3.5" /><path d="M15.5 17.5l-3-10.5" /><circle cx="14" cy="5" r="1.5" /></svg>,
    walk: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="4.5" r="2" /><path d="M7 21l3-9" /><path d="M15 21l-1-6" /><path d="M10 12l4-4" /><path d="M9.5 8l5 4" /></svg>,
    food: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4v16" /><path d="M5 10c3 0 4-2 4-6" /><path d="M5 10c-3 0-4-2-4-6" /><path d="M19 4v16" /><path d="M19 9a3 3 0 0 1-3-3V4" /></svg>,
    art: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-5 0-9 4-9 8.5 0 4 3 7.5 7 7.5h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5c0 0 8 0 8-7 0-5.5-3-12-7.5-12z" /><circle cx="8" cy="10" r="1.5" /><circle cx="12" cy="7" r="1.5" /><circle cx="16" cy="10" r="1.5" /></svg>,
    pin: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
    star: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l2.5 6.5L21 10l-5 4.5 1.5 6.5-5.5-3.5L6.5 21l1.5-6.5L3 10l6.5-.5L12 3z" /></svg>,
    hotel: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9 21v-5h6v5" /><path d="M10 10h.01" /><path d="M14 10h.01" /></svg>,
    bag: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3" /><path d="M9 5a3 3 0 0 1 6 0" /><path d="M14 11h.01" /></svg>,
    plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>,
    image: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>,
    x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>,
    chevron: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3.5l4 3.5-4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    back: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3.5L5 7l4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    // 新增手繪風格圖示
    clock: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></svg>,
    camera: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3.5" /></svg>,
    ticket: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v4h20v-4a3 3 0 0 1 0-6V5H2v4z" /><path d="M9 5v14" strokeDasharray="3 3" /></svg>,
    museum: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V10" /><path d="M19 21V10" /><path d="M9 21v-6h6v6" /><path d="M12 3L3 10h18L12 3z" /></svg>,
    calendar: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /></svg>,
    info: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
};

function Chev({ open }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transition: "transform .25s cubic-bezier(.165,.84,.44,1)", transform: open ? "rotate(180deg)" : "" }}>
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ───────── ROW COMPONENT ───────── */
function Row({ row, last }) {
    const [open, setOpen] = useState(false);
    const ex = !!row.extra, pl = !!row.place;
    const canExpand = ex && !pl; // 可展開條件：有 extra 且沒有地圖連結

    const handleRowClick = () => {
        if (ex) setOpen(!open);
    };

    return (
        <div style={{ borderBottom: last ? "none" : "1px solid var(--ln)" }}>
            <div
                onClick={canExpand ? handleRowClick : undefined}
                style={{
                    display: "grid", gridTemplateColumns: "52px 20px 1fr auto",
                    alignItems: "start", gap: "0 6px", padding: "16px 18px",
                    background: row.hl ? "var(--hl)" : "transparent",
                    cursor: canExpand ? "pointer" : "default",
                }}
            >
                <span style={{ fontSize: 13, fontWeight: 500, lineHeight: "22px", color: row.hl ? "var(--acc)" : "var(--mu)", fontFamily: "var(--mono)", textAlign: "right" }}>{row.time}</span>
                <span style={{ color: row.hl ? "var(--acc)" : "var(--li)", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 2 }}>{I[row.ic] || I.pin}</span>
                <div style={{ paddingLeft: 6 }}>
                    {pl ? (
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(row.place)}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                            style={{ fontSize: 15, fontWeight: row.hl ? 600 : 400, lineHeight: "22px", color: "var(--t1)", textDecoration: "none", backgroundImage: "linear-gradient(var(--ln2), var(--ln2))", backgroundSize: "100% 1px", backgroundPosition: "0 100%", backgroundRepeat: "no-repeat", paddingBottom: 1 }}>
                            {row.event}<span style={{ fontSize: 10, color: "var(--li)", marginLeft: 4 }}>↗</span>
                        </a>
                    ) : (
                        <span style={{ fontSize: 15, fontWeight: row.hl ? 600 : 400, lineHeight: "22px", color: "var(--t1)" }}>{row.event}</span>
                    )}
                    {(row.transport || row.info) && (
                        <p style={{ marginTop: 4, fontSize: 13, lineHeight: 1.5, color: "var(--mu)" }}>
                            {row.transport && <span>{row.transport}</span>}
                            {row.transport && row.info && <span style={{ margin: "0 6px", color: "var(--ln2)" }}>·</span>}
                            {row.info && <span style={{ color: "var(--li)" }}>{row.info}</span>}
                        </p>
                    )}
                </div>
                {ex ? (
                    <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} style={{ background: "none", border: "none", cursor: "pointer", width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--li)" }}>
                        <Chev open={open} />
                    </button>
                ) : <div style={{ width: 28 }} />}
            </div>
            {open && row.extra && (
                <div style={{ padding: "0 18px 16px", paddingLeft: 102 }}>
                    <p style={{ fontSize: 13.5, color: "var(--mu)", lineHeight: 1.85 }}>{row.extra}</p>
                </div>
            )}
        </div>
    );
}

function Section({ section }) {
    const [open, setOpen] = useState(true);
    const isCollapsible = section.collapsible;

    return (
        <div style={{ marginBottom: 16 }}>
            {section.title && (
                <div
                    onClick={() => isCollapsible && setOpen(!open)}
                    style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--mu)",
                        padding: "8px 18px",
                        letterSpacing: 0.3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: isCollapsible ? "pointer" : "default",
                    }}
                >
                    <span>{section.title}</span>
                    {isCollapsible && (
                        <span style={{ color: "var(--li)", transition: "transform .2s", transform: open ? "" : "rotate(-90deg)" }}>
                            <Chev open={!open} />
                        </span>
                    )}
                </div>
            )}
            {open && (
                <div style={{ background: "var(--card)", borderRadius: 16, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {section.rows.map((r, i) => <Row key={i} row={r} last={i === section.rows.length - 1} />)}
                </div>
            )}
        </div>
    );
}

/* ───────── ITINERARY TAB ───────── */
const ACTIVITY_GROUPS = [
    {
        location: "高松",
        days: [1, 2, 3],
    },
    {
        location: "廣島",
        days: [4, 5],
    },
    {
        location: "岡山",
        days: [6, 7, 8],
    },
    {
        location: null,
        days: [9],
    },
];

const HOTEL_INFO = {
    "高松": { name: "小屋", breakfast: false },
    "廣島": { name: "格蘭比亞", breakfast: true },
    "岡山": { name: "皇冠假日", breakfast: true },
};

function ItineraryTab({ onSelectDay }) {
    return (
        <div style={{ paddingTop: 12 }}>
            {/* Legend */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 4px 14px", fontSize: 12, color: "var(--mu)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--acc)" }}></span>
                    JR Pass
                </span>
            </div>

            {/* Grouped by activity location */}
            {ACTIVITY_GROUPS.map((group, gi) => {
                const groupDays = group.days.map(dayNum => DAYS_OVERVIEW.find(d => d.day === dayNum));

                return (
                    <div key={gi} style={{ marginBottom: 16 }}>
                        {/* Location header */}
                        {group.location && (
                            <p style={{
                                fontSize: 12,
                                fontWeight: 500,
                                color: "var(--mu)",
                                padding: "0 4px 8px",
                            }}>
                                {group.location}
                            </p>
                        )}

                        {/* Days card */}
                        <div style={{
                            background: "var(--card)",
                            borderRadius: 14,
                            boxShadow: "var(--shadow)",
                            overflow: "hidden",
                        }}>
                            {groupDays.map((d, i) => {
                                const showSpecialCheckIn = d.day === 3; // Day 3 入住廣島

                                return (
                                    <div
                                        key={d.day}
                                        onClick={() => onSelectDay(d.day)}
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "auto 1fr auto auto",
                                            gap: 10,
                                            padding: "14px 16px",
                                            borderBottom: i < groupDays.length - 1 ? "1px solid var(--ln)" : "none",
                                            alignItems: "center",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {/* Left: JR Pass bar + Date */}
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <div style={{
                                                width: 3,
                                                height: 40,
                                                borderRadius: 2,
                                                background: d.jrpass ? "var(--acc)" : "transparent",
                                            }} />
                                            <div style={{ textAlign: "center", minWidth: 40 }}>
                                                <p style={{ fontSize: 10, color: "var(--li)", fontWeight: 500 }}>Day {d.day}</p>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)", marginTop: 1 }}>{d.date}</p>
                                                <p style={{ fontSize: 10, color: "var(--li)" }}>{d.weekday}</p>
                                            </div>
                                        </div>

                                        {/* Middle: Title + Route */}
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)", marginBottom: 3 }}>{d.title}</p>
                                            <p style={{ fontSize: 12, color: "var(--mu)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.route}</p>
                                            {showSpecialCheckIn && (
                                                <p style={{ fontSize: 11, color: "var(--acc)", marginTop: 4, fontWeight: 500 }}>入住廣島</p>
                                            )}
                                        </div>

                                        {/* Hotel info */}
                                        {d.hotel && HOTEL_INFO[d.hotel] && (
                                            <p style={{ fontSize: 11, color: "var(--li)", whiteSpace: "nowrap", textAlign: "right" }}>
                                                {d.hotel}・{HOTEL_INFO[d.hotel].name}{HOTEL_INFO[d.hotel].breakfast && <span style={{ opacity: 0.7 }}>・含早</span>}
                                            </p>
                                        )}

                                        {/* Arrow */}
                                        <span style={{ color: "var(--li)" }}>{I.chevron}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ───────── DAY DETAIL PAGE ───────── */
function DayDetail({ dayNum, onBack }) {
    const detail = DAYS_DETAIL[dayNum];
    const overview = DAYS_OVERVIEW.find(d => d.day === dayNum);
    // 取得完整飯店資訊
    const fullHotel = overview.hotel ? HOTELS.find(h => h.location === overview.hotel) : null;

    if (!detail) {
        return (
            <div style={{ paddingTop: 8, animation: "fadeUp .25s ease" }}>
                <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mu)", cursor: "pointer", padding: "12px 0", display: "flex", alignItems: "center", gap: 4 }}>
                    {I.back} 返回
                </button>
                <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 11, color: "var(--li)", letterSpacing: 1 }}>DAY {overview.day} — {overview.date}（{overview.weekday}）</p>
                    <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--t1)", fontFamily: "var(--serif)", marginTop: 6 }}>{overview.title}</h2>
                    <p style={{ fontSize: 13, color: "var(--mu)", marginTop: 6 }}>{overview.route}</p>
                    {fullHotel && <p style={{ fontSize: 13, color: "var(--mu)", marginTop: 4 }}>🏨 住宿：{fullHotel.name}</p>}
                </div>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", padding: "24px 20px", textAlign: "center", color: "var(--li)" }}>
                    <p style={{ fontSize: 14 }}>詳細行程開發中...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: 8, animation: "fadeUp .25s ease" }}>
            <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mu)", cursor: "pointer", padding: "12px 0", display: "flex", alignItems: "center", gap: 4 }}>
                {I.back} 返回
            </button>

            <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <p style={{ fontSize: 11, color: "var(--li)", letterSpacing: 1 }}>DAY {detail.day} — {detail.date}（{detail.weekday}）</p>
                    {overview.jrpass && <span style={{ fontSize: 10, padding: "2px 6px", background: "var(--acc)", color: "#fff", borderRadius: 4 }}>JR Pass Day {overview.jrday}</span>}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--t1)", fontFamily: "var(--serif)" }}>{detail.title}</h2>

                {fullHotel && (
                    <div style={{ marginTop: 12, padding: "12px 14px", background: "var(--card)", borderRadius: 10, boxShadow: "var(--shadow)", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 20 }}>🏨</span>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)", lineHeight: 1.4 }}>{fullHotel.name}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 10px", marginTop: 4, fontSize: 11, color: "var(--li)" }}>
                                <span>📍 {fullHotel.location}</span>
                                <span>📅 {fullHotel.dates}</span>
                                {detail.hotelInfo && <span>🌙 第 {detail.hotelInfo.night} / {detail.hotelInfo.totalNights} 晚</span>}
                                {fullHotel.breakfast && <span>🍳 含早餐</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {detail.sections.map((s, i) => <Section key={i} section={s} />)}

            {detail.note && (
                <div style={{ marginTop: 8, padding: "14px 18px", background: "var(--card)", borderRadius: 16, boxShadow: "var(--shadow)", fontSize: 13.5, color: "var(--mu)", lineHeight: 1.8 }}>
                    <span style={{ color: "var(--acc)" }}>💡</span>　{detail.note}
                </div>
            )}
        </div>
    );
}

/* ───────── TICKETS TAB ───────── */
function TicketsTab() {
    const [tickets, setTickets] = useState(() => {
        const saved = localStorage.getItem("travel-tickets-v3");
        return saved ? JSON.parse(saved) : [];
    });
    const [showAdd, setShowAdd] = useState(false);
    const [preview, setPreview] = useState(null);
    const [newTicket, setNewTicket] = useState({ name: "", category: "flight", image: null });
    const fileRef = useRef(null);

    useEffect(() => { localStorage.setItem("travel-tickets-v3", JSON.stringify(tickets)); }, [tickets]);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setNewTicket(t => ({ ...t, image: ev.target.result }));
            reader.readAsDataURL(file);
        }
    };

    const addTicket = () => {
        if (!newTicket.name) return;
        setTickets([...tickets, { ...newTicket, id: Date.now() }]);
        setNewTicket({ name: "", category: "flight", image: null });
        setShowAdd(false);
    };

    const deleteTicket = (id) => {
        setTickets(tickets.filter(t => t.id !== id));
        setPreview(null);
    };

    const grouped = TICKET_CATEGORIES.map(cat => ({
        ...cat,
        tickets: tickets.filter(t => t.category === cat.id)
    })).filter(g => g.tickets.length > 0);

    return (
        <div style={{ paddingTop: 12 }}>
            {/* JR Pass Card */}
            <div style={{
                background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)",
                padding: "14px 16px", marginBottom: 16,
                display: "flex", alignItems: "center", gap: 12,
            }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "linear-gradient(135deg, #ae5630 0%, #c96a3d 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", flexShrink: 0,
                }}>
                    {I.train}
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)" }}>JR 關西＆廣島地區周遊券</p>
                    <p style={{ fontSize: 12, color: "var(--mu)", marginTop: 2 }}>5日券 ¥17,000 · <span style={{ color: "var(--acc)" }}>3/9 – 3/13</span></p>
                </div>
            </div>

            {/* Add Button */}
            <button onClick={() => setShowAdd(true)} style={{
                width: "100%", padding: "14px", background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)",
                border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontSize: 14, fontWeight: 500, color: "var(--acc)", marginBottom: 20,
            }}>
                {I.plus} 新增票券
            </button>

            {/* Ticket List */}
            {grouped.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--li)" }}>
                    <p style={{ fontSize: 36, marginBottom: 12 }}>🎫</p>
                    <p style={{ fontSize: 14 }}>尚未新增票券</p>
                    <p style={{ fontSize: 12, marginTop: 4, lineHeight: 1.6 }}>可上傳機票、門票等<br />方便查看或出示給工作人員</p>
                </div>
            ) : (
                grouped.map(group => (
                    <div key={group.id} style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "6px 4px", display: "flex", alignItems: "center", gap: 6 }}>
                            <span>{group.icon}</span> {group.name}
                        </p>
                        <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                            {group.tickets.map((t, i) => (
                                <div key={t.id} onClick={() => t.image && setPreview(t)} style={{
                                    padding: "12px 16px", borderBottom: i < group.tickets.length - 1 ? "1px solid var(--ln)" : "none",
                                    display: "flex", alignItems: "center", gap: 12, cursor: t.image ? "pointer" : "default",
                                }}>
                                    {t.image ? (
                                        <img src={t.image} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
                                    ) : (
                                        <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--li)" }}>{I.image}</div>
                                    )}
                                    <p style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "var(--t1)" }}>{t.name}</p>
                                    <button onClick={(e) => { e.stopPropagation(); deleteTicket(t.id); }} style={{ background: "none", border: "none", color: "var(--li)", cursor: "pointer", padding: 4 }}>{I.x}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            {/* Add Modal */}
            {showAdd && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }} onClick={() => setShowAdd(false)}>
                    <div style={{ background: "var(--card)", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480, padding: "20px 20px 28px" }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--t1)" }}>新增票券</h3>
                            <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", color: "var(--li)", cursor: "pointer" }}>{I.x}</button>
                        </div>
                        <input type="text" placeholder="名稱（如：CI178 機票）" value={newTicket.name} onChange={e => setNewTicket(t => ({ ...t, name: e.target.value }))}
                            style={{ width: "100%", padding: "12px 14px", fontSize: 15, border: "1px solid var(--ln2)", borderRadius: 10, marginBottom: 14, outline: "none", background: "var(--bg)" }} />
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                            {TICKET_CATEGORIES.map(cat => (
                                <button key={cat.id} onClick={() => setNewTicket(t => ({ ...t, category: cat.id }))} style={{
                                    padding: "6px 12px", borderRadius: 16, border: "none", cursor: "pointer",
                                    background: newTicket.category === cat.id ? "var(--acc)" : "var(--bg)",
                                    color: newTicket.category === cat.id ? "#fff" : "var(--mu)",
                                    fontSize: 12, fontWeight: 500,
                                }}>
                                    {cat.icon} {cat.name}
                                </button>
                            ))}
                        </div>
                        <input type="file" ref={fileRef} accept="image/*" onChange={handleFile} style={{ display: "none" }} />
                        <button onClick={() => fileRef.current?.click()} style={{
                            width: "100%", padding: "32px 16px", border: "2px dashed var(--ln2)", borderRadius: 10,
                            background: newTicket.image ? "var(--bg)" : "transparent", cursor: "pointer", marginBottom: 16,
                            display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--mu)",
                        }}>
                            {newTicket.image ? (
                                <img src={newTicket.image} alt="" style={{ maxHeight: 100, borderRadius: 6 }} />
                            ) : (
                                <>{I.image}<span style={{ fontSize: 13 }}>點擊上傳圖片</span></>
                            )}
                        </button>
                        <button onClick={addTicket} disabled={!newTicket.name} style={{
                            width: "100%", padding: "14px", borderRadius: 10, border: "none", cursor: "pointer",
                            background: newTicket.name ? "var(--acc)" : "var(--ln2)",
                            color: newTicket.name ? "#fff" : "var(--li)",
                            fontSize: 15, fontWeight: 600,
                        }}>
                            新增
                        </button>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {preview && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setPreview(null)}>
                    <button onClick={() => setPreview(null)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}>{I.x}</button>
                    <img src={preview.image} alt={preview.name} style={{ maxWidth: "92%", maxHeight: "85%", borderRadius: 8 }} />
                </div>
            )}
        </div>
    );
}

/* ───────── HOTELS TAB ───────── */
function HotelsTab() {
    return (
        <div style={{ paddingTop: 12 }}>
            {HOTELS.map((h, i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", padding: "16px", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <span style={{ fontSize: 24 }}>🏨</span>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--t1)", lineHeight: 1.4 }}>{h.name}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px", marginTop: 8, fontSize: 12, color: "var(--mu)" }}>
                                <span>📍 {h.location}</span>
                                <span>📅 {h.dates}</span>
                                <span>🌙 {h.nights} 晚</span>
                                {h.breakfast && <span>🍳 含早餐</span>}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ───────── INFO TAB ───────── */
function InfoTab() {
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem("travel-checklist-v1");
        return saved ? JSON.parse(saved) : {};
    });
    const [openSections, setOpenSections] = useState({ ferry: false, jr: false });

    useEffect(() => {
        localStorage.setItem("travel-checklist-v1", JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleCheck = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (key) => {
        setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const totalBudget = BUDGET.reduce((sum, cat) => sum + cat.items.reduce((s, item) => s + item.price, 0), 0);

    return (
        <div style={{ paddingTop: 12 }}>
            {/* 行前準備 Checklist */}
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3 }}>行前準備</p>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {CHECKLIST.map((item, i) => (
                        <div
                            key={item.id}
                            onClick={() => toggleCheck(item.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "14px 16px",
                                borderBottom: i < CHECKLIST.length - 1 ? "1px solid var(--ln)" : "none",
                                cursor: "pointer",
                            }}
                        >
                            <div style={{
                                width: 20, height: 20, borderRadius: 6,
                                border: checkedItems[item.id] ? "none" : "1.5px solid var(--li)",
                                background: checkedItems[item.id] ? "var(--acc)" : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                {checkedItems[item.id] && (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                    fontSize: 14,
                                    color: checkedItems[item.id] ? "var(--li)" : "var(--t1)",
                                    textDecoration: checkedItems[item.id] ? "line-through" : "none",
                                }}>{item.text}</p>
                                {item.note && <p style={{ fontSize: 11, color: "var(--li)", marginTop: 2 }}>{item.note}</p>}
                            </div>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ fontSize: 11, color: "var(--acc)", textDecoration: "none" }}
                                >
                                    預約 →
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 預算估算 */}
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3 }}>預算估算</p>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {BUDGET.map((cat, ci) => (
                        <div key={cat.category}>
                            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--li)", padding: "10px 16px 6px", background: "var(--bg)" }}>{cat.category}</p>
                            {cat.items.map((item, i) => (
                                <div key={i} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "10px 16px",
                                    borderBottom: "1px solid var(--ln)",
                                }}>
                                    <span style={{ fontSize: 13, color: "var(--t1)" }}>{item.name}</span>
                                    <span style={{ fontSize: 13, color: "var(--mu)", fontFamily: "var(--mono)" }}>¥{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "14px 16px",
                        background: "var(--hl)",
                    }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)" }}>交通 + 門票 小計</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--acc)", fontFamily: "var(--mono)" }}>¥{totalBudget.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* 重要提醒 */}
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3 }}>重要提醒</p>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {TIPS.map((tip, i) => (
                        <div key={i} style={{
                            padding: "12px 16px",
                            borderBottom: i < TIPS.length - 1 ? "1px solid var(--ln)" : "none",
                        }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--t1)", marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "var(--acc)" }}>{I[tip.icon]}</span>{tip.title}
                            </p>
                            <p style={{ fontSize: 12, color: "var(--mu)", paddingLeft: 24 }}>{tip.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 船班速查 */}
            <div style={{ marginBottom: 20 }}>
                <div
                    onClick={() => toggleSection('ferry')}
                    style={{
                        fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3,
                        display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
                    }}
                >
                    <span>🚢 船班速查</span>
                    <Chev open={openSections.ferry} />
                </div>
                {openSections.ferry && (
                    <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                        {FERRY_SCHEDULE.map((f, i) => (
                            <div key={i} style={{
                                padding: "12px 16px",
                                borderBottom: i < FERRY_SCHEDULE.length - 1 ? "1px solid var(--ln)" : "none",
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <span style={{ fontSize: 11, color: "var(--li)" }}>{f.date}</span>
                                    <span style={{ fontSize: 11, color: "var(--acc)", fontFamily: "var(--mono)" }}>{f.price}</span>
                                </div>
                                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--t1)", marginBottom: 4 }}>{f.route}</p>
                                <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--mu)" }}>
                                    <span style={{ fontFamily: "var(--mono)" }}>{f.depart}</span>
                                    <span>→</span>
                                    <span style={{ fontFamily: "var(--mono)" }}>{f.arrive}</span>
                                    <span style={{ color: "var(--li)" }}>｜{f.company}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* JR 速查 */}
            <div style={{ marginBottom: 20 }}>
                <div
                    onClick={() => toggleSection('jr')}
                    style={{
                        fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3,
                        display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
                    }}
                >
                    <span>🚄 JR 速查</span>
                    <Chev open={openSections.jr} />
                </div>
                {openSections.jr && (
                    <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                        {JR_SCHEDULE.map((j, i) => (
                            <div key={i} style={{
                                padding: "12px 16px",
                                borderBottom: i < JR_SCHEDULE.length - 1 ? "1px solid var(--ln)" : "none",
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                    <span style={{ fontSize: 11, color: "var(--li)" }}>{j.date}</span>
                                    <span style={{ fontSize: 11, color: "var(--mu)" }}>{j.train}</span>
                                </div>
                                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--t1)", marginBottom: 4 }}>{j.route}</p>
                                <div style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--mu)" }}>
                                    <span style={{ fontFamily: "var(--mono)" }}>{j.depart}</span>
                                    <span>→</span>
                                    <span style={{ fontFamily: "var(--mono)" }}>{j.arrive}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ───────── APP ───────── */
export default function App() {
    const [tab, setTab] = useState("itinerary");
    const [selectedDay, setSelectedDay] = useState(null);
    const ref = useRef(null);

    useEffect(() => { ref.current?.scrollTo({ top: 0, behavior: "instant" }); }, [tab, selectedDay]);

    const tabs = [
        { id: "itinerary", name: "行程", icon: "calendar" },
        { id: "tickets", name: "票券", icon: "ticket" },
        { id: "hotels", name: "住宿", icon: "hotel" },
        { id: "info", name: "資訊", icon: "info" },
    ];

    return (
        <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100dvh", background: "var(--bg)", fontFamily: "var(--sans)", color: "var(--t1)", WebkitFontSmoothing: "antialiased", display: "flex", flexDirection: "column" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&family=Noto+Serif+TC:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        :root {
          --bg: #F5F5F0;
          --card: #ffffff;
          --ln: #00000008;
          --ln2: #00000015;
          --hl: #FFFCF5;
          --t1: #1a1a18;
          --mu: #6b6a68;
          --li: #9a9893;
          --acc: #ae5630;
          --shadow: 0 2px 12px rgba(0,0,0,0.04);
          --sans: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif;
          --serif: 'Noto Serif TC', ui-serif, Georgia, serif;
          --mono: 'JetBrains Mono', monospace;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 0; }
        a { color: inherit; }
        a:active, button:active { opacity: 0.7; }
        input:focus { border-color: var(--acc) !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

            <header style={{ padding: "20px 20px 16px", background: "var(--card)", boxShadow: "var(--shadow)", flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: "var(--li)", letterSpacing: 1.5, marginBottom: 6 }}>2026.03.07 – 03.15</p>
                <h1 style={{ fontSize: 20, fontWeight: 600, color: "var(--t1)", fontFamily: "var(--serif)" }}>瀨戶內海建築藝術之旅</h1>
            </header>

            <div ref={ref} style={{ flex: 1, padding: "0 16px", paddingBottom: selectedDay ? 32 : 80, overflowY: "auto", animation: "fadeUp .25s ease" }}>
                {selectedDay ? (
                    <DayDetail dayNum={selectedDay} onBack={() => setSelectedDay(null)} />
                ) : (
                    <>
                        {tab === "itinerary" && <ItineraryTab onSelectDay={setSelectedDay} />}
                        {tab === "tickets" && <TicketsTab />}
                        {tab === "hotels" && <HotelsTab />}
                        {tab === "info" && <InfoTab />}
                    </>
                )}
            </div>

            {/* Bottom Tab Bar */}
            {!selectedDay && (
                <div style={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100%",
                    maxWidth: 480,
                    background: "var(--card)",
                    borderTop: "1px solid var(--ln2)",
                    display: "flex",
                    padding: "8px 16px",
                    paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
                }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{
                            flex: 1,
                            padding: "8px 0",
                            border: "none",
                            cursor: "pointer",
                            background: "transparent",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                        }}>
                            <span style={{ color: tab === t.id ? "var(--acc)" : "var(--li)" }}>{I[t.icon]}</span>
                            <span style={{
                                fontSize: 11,
                                fontWeight: 500,
                                color: tab === t.id ? "var(--acc)" : "var(--li)",
                            }}>{t.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}