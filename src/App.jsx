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

const HOTELS = [
    { name: "Airbnb 日本 Kagawa Takamatsu 的小屋", location: "高松", dates: "3/7 – 3/8", nights: 2, breakfast: false },
    { name: "廣島南門格蘭比亞大飯店", location: "廣島", dates: "3/9 – 3/11", nights: 3, breakfast: true },
    { name: "岡山 ANA 皇冠假日酒店", location: "岡山", dates: "3/12 – 3/14", nights: 3, breakfast: true },
];

const HOTEL_INFO = {
    "高松": { name: "小屋", breakfast: false },
    "廣島": { name: "格蘭比亞", breakfast: true },
    "岡山": { name: "皇冠假日", breakfast: true },
};

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
    { icon: "🎨", title: "美術館預約", text: "地中美術館、豐島美術館務必提前1個月預約" },
    { icon: "🧳", title: "3/9 行李", text: "早上出發前將大行李寄放 JR 高松站，效率最高" },
    { icon: "🎫", title: "JR Pass 啟用", text: "3/9 從高松出發時啟用，可用至 3/13（共5日）" },
    { icon: "⛴️", title: "船班天候", text: "瀨戶內海 3 月仍可能有強風，請關注當日運航資訊" },
    { icon: "🧥", title: "穿著建議", text: "3 月氣溫約 8-15°C，建議洋蔥式穿搭" },
    { icon: "⏰", title: "時刻確認", text: "以上時刻為參考，出發前請再確認最新班次" },
];

const TICKET_CATEGORIES = [
    { id: "flight", name: "機票", icon: "✈️" },
    { id: "jrpass", name: "JR Pass", icon: "🚄" },
    { id: "museum", name: "美術館", icon: "🎨" },
    { id: "ferry", name: "船票", icon: "🚢" },
    { id: "hotel", name: "住宿", icon: "🏨" },
    { id: "other", name: "其他", icon: "📄" },
];

const ACTIVITY_GROUPS = [
    { location: "高松", days: [1, 2, 3] },
    { location: "廣島", days: [4, 5] },
    { location: "岡山", days: [6, 7, 8] },
    { location: null, days: [9] },
];

/* ───────── ICONS ───────── */
const I = {
    plane: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.7.5-1.1z" /></svg>,
    train: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16" /><circle cx="8" cy="15" r="1" /><circle cx="16" cy="15" r="1" /></svg>,
    chevron: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    back: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    plus: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>,
    image: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L9 18" /></svg>,
    x: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>,
};

function Chev({ open }) {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ transition: "transform .25s cubic-bezier(.165,.84,.44,1)", transform: open ? "rotate(180deg)" : "" }}>
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/* ───────── ITINERARY TAB ───────── */
function ItineraryTab({ onSelectDay }) {
    return (
        <div style={{ paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 4px 14px", fontSize: 12, color: "var(--mu)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--acc)" }}></span>
                    JR Pass
                </span>
            </div>
            {ACTIVITY_GROUPS.map((group, gi) => {
                const groupDays = group.days.map(dayNum => DAYS_OVERVIEW.find(d => d.day === dayNum));
                return (
                    <div key={gi} style={{ marginBottom: 16 }}>
                        {group.location && (
                            <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px" }}>{group.location}</p>
                        )}
                        <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                            {groupDays.map((d, i) => (
                                <div key={d.day} onClick={() => onSelectDay(d.day)} style={{
                                    display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 10,
                                    padding: "14px 16px", borderBottom: i < groupDays.length - 1 ? "1px solid var(--ln)" : "none",
                                    alignItems: "center", cursor: "pointer",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 3, height: 40, borderRadius: 2, background: d.jrpass ? "var(--acc)" : "transparent" }} />
                                        <div style={{ textAlign: "center", minWidth: 40 }}>
                                            <p style={{ fontSize: 10, color: "var(--li)", fontWeight: 500 }}>Day {d.day}</p>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)", marginTop: 1 }}>{d.date}</p>
                                            <p style={{ fontSize: 10, color: "var(--li)" }}>{d.weekday}</p>
                                        </div>
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)", marginBottom: 3 }}>{d.title}</p>
                                        <p style={{ fontSize: 12, color: "var(--mu)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.route}</p>
                                    </div>
                                    {d.hotel && HOTEL_INFO[d.hotel] && (
                                        <p style={{ fontSize: 11, color: "var(--li)", whiteSpace: "nowrap", textAlign: "right" }}>
                                            {d.hotel}・{HOTEL_INFO[d.hotel].name}{HOTEL_INFO[d.hotel].breakfast && <span style={{ opacity: 0.7 }}>・含早</span>}
                                        </p>
                                    )}
                                    <span style={{ color: "var(--li)" }}>{I.chevron}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ───────── DAY DETAIL PAGE ───────── */
function DayDetail({ dayNum, onBack }) {
    const overview = DAYS_OVERVIEW.find(d => d.day === dayNum);
    return (
        <div style={{ paddingTop: 8, animation: "fadeUp .25s ease" }}>
            <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 14, color: "var(--mu)", cursor: "pointer", padding: "12px 0", display: "flex", alignItems: "center", gap: 4 }}>
                {I.back} 返回
            </button>
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, color: "var(--li)", letterSpacing: 1 }}>DAY {overview.day} — {overview.date}（{overview.weekday}）</p>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--t1)", fontFamily: "var(--serif)", marginTop: 6 }}>{overview.title}</h2>
                <p style={{ fontSize: 13, color: "var(--mu)", marginTop: 6 }}>{overview.route}</p>
                {overview.hotel && <p style={{ fontSize: 13, color: "var(--mu)", marginTop: 4 }}>🏨 住宿：{overview.hotel}</p>}
            </div>
            <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", padding: "24px 20px", textAlign: "center", color: "var(--li)" }}>
                <p style={{ fontSize: 14 }}>詳細行程請查看完整版...</p>
            </div>
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

    const grouped = TICKET_CATEGORIES.map(cat => ({
        ...cat,
        tickets: tickets.filter(t => t.category === cat.id)
    })).filter(g => g.tickets.length > 0);

    return (
        <div style={{ paddingTop: 12 }}>
            <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", padding: "14px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #ae5630 0%, #c96a3d 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>{I.train}</div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)" }}>JR 關西＆廣島地區周遊券</p>
                    <p style={{ fontSize: 12, color: "var(--mu)", marginTop: 2 }}>5日券 ¥17,000 · <span style={{ color: "var(--acc)" }}>3/9 – 3/13</span></p>
                </div>
            </div>
            <button onClick={() => setShowAdd(true)} style={{ width: "100%", padding: "14px", background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "var(--acc)", marginBottom: 20 }}>
                {I.plus} 新增票券
            </button>
            {grouped.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--li)" }}>
                    <p style={{ fontSize: 36, marginBottom: 12 }}>🎫</p>
                    <p style={{ fontSize: 14 }}>尚未新增票券</p>
                </div>
            ) : (
                grouped.map(group => (
                    <div key={group.id} style={{ marginBottom: 20 }}>
                        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "6px 4px", display: "flex", alignItems: "center", gap: 6 }}><span>{group.icon}</span> {group.name}</p>
                        <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                            {group.tickets.map((t, i) => (
                                <div key={t.id} style={{ padding: "12px 16px", borderBottom: i < group.tickets.length - 1 ? "1px solid var(--ln)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                                    {t.image ? <img src={t.image} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} /> : <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--li)" }}>{I.image}</div>}
                                    <p style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "var(--t1)" }}>{t.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
            {showAdd && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 100 }} onClick={() => setShowAdd(false)}>
                    <div style={{ background: "var(--card)", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 480, padding: "20px 20px 28px" }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--t1)" }}>新增票券</h3>
                            <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", color: "var(--li)", cursor: "pointer" }}>{I.x}</button>
                        </div>
                        <input type="text" placeholder="名稱" value={newTicket.name} onChange={e => setNewTicket(t => ({ ...t, name: e.target.value }))} style={{ width: "100%", padding: "12px 14px", fontSize: 15, border: "1px solid var(--ln2)", borderRadius: 10, marginBottom: 14, outline: "none", background: "var(--bg)" }} />
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                            {TICKET_CATEGORIES.map(cat => (
                                <button key={cat.id} onClick={() => setNewTicket(t => ({ ...t, category: cat.id }))} style={{ padding: "6px 12px", borderRadius: 16, border: "none", cursor: "pointer", background: newTicket.category === cat.id ? "var(--acc)" : "var(--bg)", color: newTicket.category === cat.id ? "#fff" : "var(--mu)", fontSize: 12, fontWeight: 500 }}>{cat.icon} {cat.name}</button>
                            ))}
                        </div>
                        <input type="file" ref={fileRef} accept="image/*" onChange={handleFile} style={{ display: "none" }} />
                        <button onClick={() => fileRef.current?.click()} style={{ width: "100%", padding: "32px 16px", border: "2px dashed var(--ln2)", borderRadius: 10, background: newTicket.image ? "var(--bg)" : "transparent", cursor: "pointer", marginBottom: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "var(--mu)" }}>
                            {newTicket.image ? <img src={newTicket.image} alt="" style={{ maxHeight: 100, borderRadius: 6 }} /> : <>{I.image}<span style={{ fontSize: 13 }}>點擊上傳圖片</span></>}
                        </button>
                        <button onClick={addTicket} disabled={!newTicket.name} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", cursor: "pointer", background: newTicket.name ? "var(--acc)" : "var(--ln2)", color: newTicket.name ? "#fff" : "var(--li)", fontSize: 15, fontWeight: 600 }}>新增</button>
                    </div>
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

    useEffect(() => { localStorage.setItem("travel-checklist-v1", JSON.stringify(checkedItems)); }, [checkedItems]);

    const totalBudget = BUDGET.reduce((sum, cat) => sum + cat.items.reduce((s, item) => s + item.price, 0), 0);

    return (
        <div style={{ paddingTop: 12 }}>
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3 }}>行前準備</p>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {CHECKLIST.map((item, i) => (
                        <div key={item.id} onClick={() => setCheckedItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < CHECKLIST.length - 1 ? "1px solid var(--ln)" : "none", cursor: "pointer" }}>
                            <div style={{ width: 20, height: 20, borderRadius: 6, border: checkedItems[item.id] ? "none" : "1.5px solid var(--li)", background: checkedItems[item.id] ? "var(--acc)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {checkedItems[item.id] && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: 14, color: checkedItems[item.id] ? "var(--li)" : "var(--t1)", textDecoration: checkedItems[item.id] ? "line-through" : "none" }}>{item.text}</p>
                                {item.note && <p style={{ fontSize: 11, color: "var(--li)", marginTop: 2 }}>{item.note}</p>}
                            </div>
                            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ fontSize: 11, color: "var(--acc)", textDecoration: "none" }}>預約 →</a>}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3 }}>預算估算</p>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {BUDGET.map((cat) => (
                        <div key={cat.category}>
                            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--li)", padding: "10px 16px 6px", background: "var(--bg)" }}>{cat.category}</p>
                            {cat.items.map((item, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid var(--ln)" }}>
                                    <span style={{ fontSize: 13, color: "var(--t1)" }}>{item.name}</span>
                                    <span style={{ fontSize: 13, color: "var(--mu)", fontFamily: "var(--mono)" }}>¥{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", background: "var(--hl)" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)" }}>交通 + 門票 小計</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--acc)", fontFamily: "var(--mono)" }}>¥{totalBudget.toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "var(--mu)", padding: "0 4px 8px", letterSpacing: 0.3 }}>重要提醒</p>
                <div style={{ background: "var(--card)", borderRadius: 14, boxShadow: "var(--shadow)", overflow: "hidden" }}>
                    {TIPS.map((tip, i) => (
                        <div key={i} style={{ padding: "12px 16px", borderBottom: i < TIPS.length - 1 ? "1px solid var(--ln)" : "none" }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--t1)", marginBottom: 4 }}><span style={{ marginRight: 8 }}>{tip.icon}</span>{tip.title}</p>
                            <p style={{ fontSize: 12, color: "var(--mu)", paddingLeft: 26 }}>{tip.text}</p>
                        </div>
                    ))}
                </div>
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
        { id: "itinerary", name: "行程", icon: "📅" },
        { id: "tickets", name: "票券", icon: "🎫" },
        { id: "hotels", name: "住宿", icon: "🏨" },
        { id: "info", name: "資訊", icon: "ℹ️" },
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
                {selectedDay ? <DayDetail dayNum={selectedDay} onBack={() => setSelectedDay(null)} /> : (
                    <>
                        {tab === "itinerary" && <ItineraryTab onSelectDay={setSelectedDay} />}
                        {tab === "tickets" && <TicketsTab />}
                        {tab === "hotels" && <HotelsTab />}
                        {tab === "info" && <InfoTab />}
                    </>
                )}
            </div>
            {!selectedDay && (
                <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "var(--card)", borderTop: "1px solid var(--ln2)", display: "flex", padding: "8px 16px", paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))" }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "8px 0", border: "none", cursor: "pointer", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <span style={{ fontSize: 20 }}>{t.icon}</span>
                            <span style={{ fontSize: 11, fontWeight: 500, color: tab === t.id ? "var(--acc)" : "var(--li)" }}>{t.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
