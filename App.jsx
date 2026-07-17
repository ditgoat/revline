import React, { useState } from "react";
import { Home, Car, ShoppingBag, MapPin, User, Heart, MessageCircle, Share2, X, ChevronRight, Search, Plus, Sparkles, Camera, Image as ImageIcon } from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
.font-display { font-family: 'Oswald', sans-serif; }
.font-body { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }

@keyframes pulseRing {
  0% { box-shadow: 0 0 0 0 rgba(242,194,69,0.45); }
  70% { box-shadow: 0 0 0 9px rgba(242,194,69,0); }
  100% { box-shadow: 0 0 0 0 rgba(242,194,69,0); }
}
.pin-pulse { animation: pulseRing 2.2s infinite; }

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.screen-enter { animation: fadeSlideIn 0.32s ease-out both; }

@keyframes popIn {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}
.pop-in { animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

@keyframes heartBurst {
  0% { transform: scale(1); }
  35% { transform: scale(1.35); }
  100% { transform: scale(1); }
}
.heart-burst { animation: heartBurst 0.35s ease-out; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

// ---- Mock data ----------------------------------------------------------

const CATEGORIES = ["ALL", "JDM", "EURO", "MUSCLE", "OFFROAD"];
const POST_CATEGORIES = ["JDM", "EURO", "MUSCLE", "OFFROAD"];

const INITIAL_POSTS = [
  {
    id: "p1",
    user: "kenji.eg6",
    car: "EG6 CIVIC · CHAMPIONSHIP WHITE",
    category: "JDM",
    caption: "Finally got the front end sitting right. Splitter clears the driveway now.",
    likes: 341,
    comments: 28,
    tint: "from-[#2b2d31] to-[#121315]",
    image: null,
    pins: [
      { id: 1, part: "Front Splitter", brand: "APR Performance · Carbon Fiber", fits: "EG/EK Civic '92–'95", price: 340, x: 28, y: 62 },
      { id: 2, part: "Coilover Kit", brand: "BC Racing · BR Series", fits: "EG/EK Civic '92–'95", price: 615, x: 70, y: 40 },
    ],
  },
  {
    id: "p2",
    user: "mariaa_rx7",
    car: "FD3S RX-7 · VELOCITY YELLOW",
    category: "JDM",
    caption: "Wide body test fit before paint. Fenders from a guy in Osaka, worth the wait.",
    likes: 512,
    comments: 44,
    tint: "from-[#3a2a1a] to-[#121315]",
    image: null,
    pins: [
      { id: 1, part: "Wide Body Fender Kit", brand: "RE Amemiya · FRP", fits: "FD3S RX-7 '93–'02", price: 890, x: 50, y: 55 },
    ],
  },
  {
    id: "p3",
    user: "danny.driftwhite",
    car: "EG6 CIVIC · CHAMPIONSHIP WHITE",
    category: "JDM",
    caption: "Same spec as the homies. Wheels finally came in today.",
    likes: 198,
    comments: 15,
    tint: "from-[#25292b] to-[#121315]",
    image: null,
    pins: [{ id: 1, part: "15x8 TE37 Wheels", brand: "Rays · Bronze", fits: "4x100", price: 1180, x: 42, y: 58 }],
  },
  {
    id: "p4",
    user: "hans.e36",
    car: "E36 M3 · AVUS BLUE",
    category: "EURO",
    caption: "Track alignment dialed in. Camber plates make a huge difference.",
    likes: 276,
    comments: 19,
    tint: "from-[#1c2a3a] to-[#121315]",
    image: null,
    pins: [{ id: 1, part: "Camber Plates", brand: "Ground Control", fits: "E36 3-Series", price: 210, x: 60, y: 48 }],
  },
  {
    id: "p5",
    user: "stang_gt500",
    car: "S550 MUSTANG · RACE RED",
    category: "MUSCLE",
    caption: "New exhaust dropped the tone an octave. Neighbors are thrilled.",
    likes: 402,
    comments: 33,
    tint: "from-[#3a1a1a] to-[#121315]",
    image: null,
    pins: [{ id: 1, part: "Cat-Back Exhaust", brand: "Borla · S-Type", fits: "S550 Mustang GT", price: 899, x: 55, y: 65 }],
  },
];

const GARAGE_CAR = {
  name: "EG6 CIVIC HATCHBACK",
  spec: "CHAMPIONSHIP WHITE · '96 · B16A2",
  vin: "JHM EG6 — 004",
  buildSheet: [
    { id: 1, part: "Front Splitter", brand: "APR Performance · Carbon Fiber", fits: "EG/EK Civic", price: 340 },
    { id: 2, part: "Coilover Kit", brand: "BC Racing · BR Series", fits: "EG/EK Civic", price: 615 },
    { id: 3, part: "15x8 Wheels", brand: "Rays TE37 · Bronze", fits: "4x100", price: 1180 },
    { id: 4, part: "Exhaust Header", brand: "Skunk2 · 4-2-1", fits: "B-Series", price: 275 },
  ],
};

const PART_FILTERS = ["ALL", "JDM", "WHEELS", "SUSPENSION", "AERO"];
const SHOP_ITEMS = [
  { id: 1, part: "Front Splitter", brand: "APR Performance", price: 340, fits: "EG/EK Civic", tint: "from-[#2b2d31] to-[#121315]" },
  { id: 2, part: "TE37 Wheels (Set)", brand: "Rays", price: 2360, fits: "4x100 / 4x114", tint: "from-[#33301f] to-[#121315]" },
  { id: 3, part: "Wide Body Kit", brand: "RE Amemiya", price: 890, fits: "FD3S RX-7", tint: "from-[#3a2a1a] to-[#121315]" },
  { id: 4, part: "BR Coilovers", brand: "BC Racing", price: 615, fits: "Most EG/EK/DC", tint: "from-[#25292b] to-[#121315]" },
];

const COLLECTIBLE_FILTERS = ["ALL", "DIE-CAST", "APPAREL", "ART", "BADGES"];
const COLLECTIBLE_ITEMS = [
  { id: 1, part: "EG6 Civic 1:18 Die-Cast", seller: "kenji.eg6", price: 65, likes: 88, tint: "from-[#2b2d31] to-[#121315]" },
  { id: 2, part: "Championship White Enamel Pin", seller: "revline_shop", price: 12, likes: 210, tint: "from-[#33301f] to-[#121315]" },
  { id: 3, part: "RE Amemiya Track Jacket", seller: "mariaa_rx7", price: 140, likes: 54, tint: "from-[#3a2a1a] to-[#121315]" },
  { id: 4, part: "Hand-Drawn RX-7 Print", seller: "linework.jdm", price: 38, likes: 132, tint: "from-[#25292b] to-[#121315]" },
];

const MEETS = [
  { id: 1, name: "Sunday Cars & Coffee", loc: "Warehouse District", date: "SUN JUL 19 · 8:00A", going: 64 },
  { id: 2, name: "JDM Night Meet", loc: "Pier 40 Lot", date: "FRI JUL 24 · 7:30P", going: 128 },
  { id: 3, name: "Track Day Convoy", loc: "Meets at Fuel Stop 9", date: "SAT AUG 1 · 6:00A", going: 22 },
];

// ---- Small building blocks ----------------------------------------------

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 select-none">
      <span className="font-mono text-[12px] text-white tracking-wide">9:41</span>
      <div className="flex items-center gap-1">
        {[3, 5, 7, 9].map((h, i) => (
          <div key={i} className="w-[3px] rounded-sm bg-white" style={{ height: `${h}px` }} />
        ))}
        <div className="w-[18px] h-[9px] border border-white rounded-[3px] ml-1.5 relative flex items-center px-[1.5px]">
          <div className="h-[5px] w-[11px] bg-white rounded-[1px]" />
          <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white rounded-r-sm" />
        </div>
      </div>
    </div>
  );
}

function Pin({ pin, onClick }) {
  return (
    <button
      onClick={() => onClick({ ...pin, kind: "part" })}
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
      className="pin-pulse pop-in absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-[#F2C245] text-[#17181a] font-mono text-[11px] font-bold ring-1 ring-black/20 active:scale-90 transition-transform"
    >
      {pin.id}
    </button>
  );
}

function PhotoBlock({ tint, image, children, className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${tint} shadow-lg shadow-black/40 ${className}`}>
      {image ? (
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)" }}
          />
          <Car className="absolute right-3 bottom-2 w-16 h-16 text-white/5" strokeWidth={1} />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      {children}
    </div>
  );
}

function ItemSheet({ item, onClose }) {
  const isCollectible = item?.kind === "collectible";
  return (
    <div className={`absolute inset-0 z-30 flex items-end transition-opacity duration-300 ${item ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={`relative w-full bg-[#1c1d20] border-t border-[#33353a] rounded-t-2xl p-5 pb-6 transition-transform duration-300 ease-out ${
          item ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto w-9 h-1 rounded-full bg-[#3a3c41] mb-4" />
        {item && (
          <>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] tracking-widest text-[#F2C245]">
                {isCollectible ? "COLLECTIBLE" : `PART ${String(item.id).padStart(2, "0")}`}
              </span>
              <button onClick={onClose} className="text-[#C9CDD3] active:scale-90 transition-transform">
                <X size={18} />
              </button>
            </div>
            <h3 className="font-display text-xl text-white tracking-wide">{item.part}</h3>
            {isCollectible ? (
              <>
                <p className="font-body text-sm text-[#C9CDD3] mt-1">sold by {item.seller}</p>
                <p className="font-mono text-[11px] text-[#8a8d93] mt-2 flex items-center gap-1">
                  <Heart size={12} className="text-[#E4572E]" fill="#E4572E" /> {item.likes} likes
                </p>
              </>
            ) : (
              <>
                <p className="font-body text-sm text-[#C9CDD3] mt-1">{item.brand}</p>
                <p className="font-mono text-[11px] text-[#8a8d93] mt-2 uppercase">fits: {item.fits}</p>
              </>
            )}
            <div className="flex items-center justify-between mt-5">
              <span className="font-mono text-2xl text-white">${item.price.toLocaleString()}</span>
              <button className="font-display tracking-widest text-sm bg-[#E4572E] text-white px-6 py-3 rounded-lg shadow-lg shadow-[#E4572E]/20 active:scale-95 transition-transform">
                BUY NOW
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TabBar({ active, setActive }) {
  const tabs = [
    { id: "feed", icon: Home, label: "FEED" },
    { id: "garage", icon: Car, label: "GARAGE" },
    { id: "shop", icon: ShoppingBag, label: "SHOP" },
    { id: "meets", icon: MapPin, label: "MEETS" },
    { id: "profile", icon: User, label: "YOU" },
  ];
  return (
    <div className="relative flex items-stretch border-t border-[#2A2C30] bg-[#141517] pb-1">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => setActive(t.id)} className="relative flex-1 flex flex-col items-center gap-1 py-3">
            {isActive && <span className="absolute top-0 w-8 h-[2px] rounded-full bg-[#F2C245]" />}
            <Icon
              size={18}
              className={`transition-all duration-200 ${isActive ? "text-[#F2C245] -translate-y-0.5" : "text-[#5a5d63]"}`}
              strokeWidth={isActive ? 2.3 : 1.8}
            />
            <span className={`font-mono text-[9px] tracking-widest transition-colors duration-200 ${isActive ? "text-[#F2C245]" : "text-[#5a5d63]"}`}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Header({ title, right }) {
  return (
    <div className="flex items-center justify-between px-4 pt-2 pb-3 border-b border-[#2A2C30]">
      <span className="font-display text-lg tracking-[0.15em] text-white">{title}</span>
      {right}
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors duration-150 active:scale-95 ${
        active ? "bg-[#F2C245] text-[#17181a] border-[#F2C245]" : "border-[#35373C] text-[#8a8d93]"
      }`}
    >
      {label}
    </button>
  );
}

function Segmented({ options, value, onChange }) {
  const idx = options.indexOf(value);
  return (
    <div className="relative mx-4 mt-3 flex rounded-lg border border-[#2A2C30] overflow-hidden bg-[#1a1b1e]">
      <div
        className="absolute top-0 bottom-0 bg-[#F2C245] transition-all duration-300 ease-out rounded-md m-[2px]"
        style={{ width: `calc(${100 / options.length}% - 4px)`, left: `calc(${idx * (100 / options.length)}% + 2px)` }}
      />
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`relative z-10 flex-1 py-2 font-mono text-[10px] tracking-widest transition-colors duration-200 ${
            value === opt ? "text-[#17181a]" : "text-[#8a8d93]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function LikeButton({ liked, count, onToggle, size = 14 }) {
  return (
    <button onClick={onToggle} className="flex items-center gap-1 text-xs font-mono active:scale-90 transition-transform">
      <Heart size={size} className={liked ? "text-[#E4572E] heart-burst" : "text-[#8a8d93]"} fill={liked ? "#E4572E" : "none"} />
      <span className={liked ? "text-[#E4572E]" : "text-[#8a8d93]"}>{count}</span>
    </button>
  );
}

// ---- New Post flow ---------------------------------------------------------

function NewPostSheet({ open, onClose, onSubmit }) {
  const [photo, setPhoto] = useState(null);
  const [car, setCar] = useState(GARAGE_CAR.spec.split(" · ")[0] === "CHAMPIONSHIP WHITE" ? "EG6 CIVIC · CHAMPIONSHIP WHITE" : "");
  const [category, setCategory] = useState("JDM");
  const [caption, setCaption] = useState("");
  const [tagPart, setTagPart] = useState(false);
  const [partName, setPartName] = useState("");
  const [partBrand, setPartBrand] = useState("");
  const [partPrice, setPartPrice] = useState("");

  const reset = () => {
    setPhoto(null);
    setCaption("");
    setTagPart(false);
    setPartName("");
    setPartBrand("");
    setPartPrice("");
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const canPost = photo && caption.trim().length > 0;

  const handleSubmit = () => {
    if (!canPost) return;
    const pins = tagPart && partName ? [{ id: 1, part: partName, brand: partBrand || "Unbranded", fits: car, price: Number(partPrice) || 0, x: 50, y: 50 }] : [];
    onSubmit({
      id: `p${Date.now()}`,
      user: "you",
      car,
      category,
      caption,
      likes: 0,
      comments: 0,
      tint: "from-[#2b2d31] to-[#121315]",
      image: photo,
      pins,
    });
    reset();
    onClose();
  };

  return (
    <div className={`absolute inset-0 z-40 flex items-end transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={`relative w-full max-h-[92%] overflow-y-auto no-scrollbar bg-[#1c1d20] border-t border-[#33353a] rounded-t-2xl p-5 pb-8 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto w-9 h-1 rounded-full bg-[#3a3c41] mb-4" />
        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-lg tracking-wide text-white">NEW POST</span>
          <button onClick={onClose} className="text-[#C9CDD3] active:scale-90 transition-transform">
            <X size={18} />
          </button>
        </div>

        <label htmlFor="photo-upload" className="block cursor-pointer">
          {photo ? (
            <div className="relative rounded-xl overflow-hidden aspect-[4/5]">
              <img src={photo} alt="preview" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                <Camera size={11} /> CHANGE PHOTO
              </span>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-[#35373C] aspect-[4/5] flex flex-col items-center justify-center gap-2 text-[#5a5d63]">
              <ImageIcon size={28} strokeWidth={1.5} />
              <span className="font-mono text-[10px] tracking-widest">TAP TO UPLOAD PHOTO</span>
            </div>
          )}
        </label>
        <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleFile} />

        <div className="mt-4">
          <label className="font-mono text-[10px] tracking-widest text-[#8a8d93]">CAR</label>
          <input
            value={car}
            onChange={(e) => setCar(e.target.value)}
            placeholder="e.g. EG6 CIVIC · CHAMPIONSHIP WHITE"
            className="w-full mt-1 bg-[#141517] border border-[#2A2C30] rounded-lg px-3 py-2.5 font-body text-sm text-white placeholder:text-[#5a5d63] outline-none focus:border-[#F2C245]"
          />
        </div>

        <div className="mt-4">
          <label className="font-mono text-[10px] tracking-widest text-[#8a8d93]">CATEGORY</label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {POST_CATEGORIES.map((c) => (
              <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="font-mono text-[10px] tracking-widest text-[#8a8d93]">CAPTION</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What'd you change?"
            rows={3}
            className="w-full mt-1 bg-[#141517] border border-[#2A2C30] rounded-lg px-3 py-2.5 font-body text-sm text-white placeholder:text-[#5a5d63] outline-none focus:border-[#F2C245] resize-none"
          />
        </div>

        <button
          onClick={() => setTagPart((v) => !v)}
          className="flex items-center gap-2 mt-4 font-mono text-[10px] tracking-widest text-[#F2C245]"
        >
          <span className={`w-4 h-4 rounded border flex items-center justify-center ${tagPart ? "bg-[#F2C245] border-[#F2C245]" : "border-[#5a5d63]"}`}>
            {tagPart && <span className="w-2 h-2 bg-[#17181a] rounded-sm" />}
          </span>
          TAG A PART IN THIS PHOTO
        </button>

        {tagPart && (
          <div className="mt-3 space-y-2 pl-6 border-l border-[#2A2C30]">
            <input
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              placeholder="Part name (e.g. Front Splitter)"
              className="w-full bg-[#141517] border border-[#2A2C30] rounded-lg px-3 py-2 font-body text-sm text-white placeholder:text-[#5a5d63] outline-none focus:border-[#F2C245]"
            />
            <input
              value={partBrand}
              onChange={(e) => setPartBrand(e.target.value)}
              placeholder="Brand"
              className="w-full bg-[#141517] border border-[#2A2C30] rounded-lg px-3 py-2 font-body text-sm text-white placeholder:text-[#5a5d63] outline-none focus:border-[#F2C245]"
            />
            <input
              value={partPrice}
              onChange={(e) => setPartPrice(e.target.value)}
              placeholder="Price (USD)"
              inputMode="numeric"
              className="w-full bg-[#141517] border border-[#2A2C30] rounded-lg px-3 py-2 font-body text-sm text-white placeholder:text-[#5a5d63] outline-none focus:border-[#F2C245]"
            />
            <p className="font-mono text-[9px] text-[#5a5d63]">Pin drops center-frame for now — dragging to position comes later.</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!canPost}
          className={`w-full mt-6 font-display tracking-widest text-sm py-3 rounded-lg transition-all active:scale-95 ${
            canPost ? "bg-[#E4572E] text-white shadow-lg shadow-[#E4572E]/20" : "bg-[#2A2C30] text-[#5a5d63]"
          }`}
        >
          POST
        </button>
      </div>
    </div>
  );
}

// ---- Screens --------------------------------------------------------------

function MatchCard({ post, onClick }) {
  return (
    <button onClick={onClick} className="flex-shrink-0 w-28 text-left active:scale-95 transition-transform">
      <PhotoBlock tint={post.tint} image={post.image} className="rounded-lg aspect-[4/5]" />
      <p className="font-body text-xs text-white mt-1.5 leading-tight truncate">{post.user}</p>
      <p className="font-mono text-[9px] text-[#F2C245] leading-tight">CHAMPIONSHIP WHITE</p>
    </button>
  );
}

function FeedScreen({ posts, openItem, onNewPost }) {
  const [cat, setCat] = useState("ALL");
  const [likedPosts, setLikedPosts] = useState({});
  const [composerOpen, setComposerOpen] = useState(false);
  const filtered = cat === "ALL" ? posts : posts.filter((p) => p.category === cat);
  const sameSpec = posts.filter((p) => p.car.includes("CHAMPIONSHIP WHITE"));

  const toggleLike = (id) => setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="relative h-full">
      <div className="overflow-y-auto no-scrollbar h-full pb-4 screen-enter">
        <Header title="REVLINE" right={<Search size={18} className="text-[#C9CDD3]" />} />

        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />
          ))}
        </div>

        {sameSpec.length > 0 && (
          <div className="px-4 pb-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={12} className="text-[#F2C245]" />
              <span className="font-mono text-[10px] tracking-widest text-[#8a8d93]">MATCHES YOUR SPEC · EG6 WHITE</span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {sameSpec.map((p) => (
                <MatchCard key={p.id} post={p} onClick={() => p.pins[0] && openItem({ ...p.pins[0], kind: "part" })} />
              ))}
            </div>
          </div>
        )}

        {filtered.map((post, i) => {
          const liked = !!likedPosts[post.id];
          return (
            <div key={post.id} className="screen-enter border-b border-t border-[#2A2C30] pb-4 mb-1" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-2 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3a3c41] to-[#2A2C30] flex items-center justify-center font-mono text-[10px] text-[#C9CDD3]">
                  {post.user.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-body text-sm text-white leading-tight">{post.user}</p>
                  <p className="font-mono text-[10px] text-[#F2C245] tracking-wide leading-tight">{post.car}</p>
                </div>
              </div>
              <PhotoBlock tint={post.tint} image={post.image} className="mx-4 rounded-xl aspect-[4/5]">
                {post.pins.map((pin) => (
                  <Pin key={pin.id} pin={pin} onClick={openItem} />
                ))}
              </PhotoBlock>
              <div className="px-4 pt-3">
                <p className="font-body text-sm text-[#e7e8ea]">{post.caption}</p>
                <div className="flex items-center gap-4 mt-3 text-[#8a8d93]">
                  <LikeButton liked={liked} count={post.likes + (liked ? 1 : 0)} onToggle={() => toggleLike(post.id)} />
                  <span className="flex items-center gap-1 text-xs font-mono">
                    <MessageCircle size={14} /> {post.comments}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-mono ml-auto">
                    <Share2 size={14} />
                  </span>
                </div>
                {post.pins.length > 0 && (
                  <p className="font-mono text-[10px] text-[#5a5d63] mt-2 tracking-wide">TAP NUMBERED PINS TO SHOP THIS BUILD</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => setComposerOpen(true)}
        className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-[#F2C245] text-[#17181a] flex items-center justify-center shadow-lg shadow-black/40 active:scale-90 transition-transform"
      >
        <Plus size={22} strokeWidth={2.4} />
      </button>

      <NewPostSheet
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        onSubmit={(post) => onNewPost(post)}
      />
    </div>
  );
}

function GarageScreen({ openItem }) {
  const car = GARAGE_CAR;
  return (
    <div className="overflow-y-auto no-scrollbar h-full pb-4 screen-enter">
      <Header title="THE GARAGE" right={<Plus size={18} className="text-[#C9CDD3]" />} />
      <PhotoBlock tint="from-[#2b2d31] to-[#121315]" className="mx-4 mt-4 rounded-xl aspect-[16/10]" />
      <div className="px-4 mt-4">
        <p className="font-mono text-[10px] text-[#F2C245] tracking-widest">{car.vin}</p>
        <h2 className="font-display text-2xl text-white tracking-wide mt-1">{car.name}</h2>
        <p className="font-body text-sm text-[#C9CDD3] mt-1">{car.spec}</p>
      </div>
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between border-b border-[#2A2C30] pb-2 mb-1">
          <span className="font-mono text-[11px] tracking-widest text-[#8a8d93]">BUILD SHEET</span>
          <span className="font-mono text-[11px] text-[#8a8d93]">{car.buildSheet.length} PARTS</span>
        </div>
        {car.buildSheet.map((p) => (
          <button
            key={p.id}
            onClick={() => openItem({ ...p, kind: "part" })}
            className="w-full flex items-center gap-3 py-3 border-b border-[#232427] text-left active:bg-[#1c1d20] transition-colors rounded-md px-1 -mx-1"
          >
            <span className="font-mono text-xs text-[#F2C245] w-5">{String(p.id).padStart(2, "0")}</span>
            <div className="flex-1">
              <p className="font-body text-sm text-white">{p.part}</p>
              <p className="font-mono text-[10px] text-[#8a8d93]">{p.brand}</p>
            </div>
            <span className="font-mono text-sm text-[#e7e8ea]">${p.price}</span>
            <ChevronRight size={14} className="text-[#5a5d63]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ShopScreen({ openItem }) {
  const [mode, setMode] = useState("PARTS");
  const [filter, setFilter] = useState("ALL");
  const [likedItems, setLikedItems] = useState({});
  const filters = mode === "PARTS" ? PART_FILTERS : COLLECTIBLE_FILTERS;
  const items = mode === "PARTS" ? SHOP_ITEMS : COLLECTIBLE_ITEMS;

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="overflow-y-auto no-scrollbar h-full pb-4 screen-enter">
      <Header title="SHOP" right={<Search size={18} className="text-[#C9CDD3]" />} />
      <Segmented options={["PARTS", "COLLECTIBLES"]} value={mode} onChange={(m) => { setMode(m); setFilter("ALL"); }} />
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <Chip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 px-4">
        {items.map((item, i) => {
          const liked = !!likedItems[item.id];
          return (
            <button
              key={item.id}
              onClick={() =>
                openItem(
                  mode === "PARTS"
                    ? { id: item.id, part: item.part, brand: item.brand, fits: item.fits, price: item.price, kind: "part" }
                    : { id: item.id, part: item.part, seller: item.seller, likes: item.likes + (liked ? 1 : 0), price: item.price, kind: "collectible" }
                )
              }
              className="text-left screen-enter"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <PhotoBlock tint={item.tint} className="rounded-xl aspect-square">
                {mode === "COLLECTIBLES" && (
                  <span
                    onClick={(e) => toggleLike(item.id, e)}
                    className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm active:scale-90 transition-transform"
                  >
                    <Heart size={10} className={liked ? "text-[#E4572E]" : "text-white"} fill={liked ? "#E4572E" : "none"} />
                    <span className="font-mono text-[9px] text-white">{item.likes + (liked ? 1 : 0)}</span>
                  </span>
                )}
              </PhotoBlock>
              <p className="font-body text-xs text-white mt-2 leading-tight">{item.part}</p>
              <p className="font-mono text-[10px] text-[#8a8d93] mt-0.5">{mode === "PARTS" ? item.brand : `by ${item.seller}`}</p>
              <p className="font-mono text-sm text-[#F2C245] mt-1">${item.price.toLocaleString()}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MeetsScreen() {
  const [going, setGoing] = useState({});
  return (
    <div className="overflow-y-auto no-scrollbar h-full pb-4 screen-enter">
      <Header title="MEETS" right={<Plus size={18} className="text-[#C9CDD3]" />} />
      <div className="px-4 mt-3 space-y-3">
        {MEETS.map((m, i) => {
          const isGoing = !!going[m.id];
          return (
            <div key={m.id} className="screen-enter border border-[#2A2C30] rounded-xl p-4 bg-[#1a1b1e]" style={{ animationDelay: `${i * 60}ms` }}>
              <p className="font-mono text-[10px] text-[#F2C245] tracking-widest">{m.date}</p>
              <h3 className="font-display text-lg text-white mt-1 tracking-wide">{m.name}</h3>
              <p className="font-body text-sm text-[#8a8d93] mt-0.5">{m.loc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-mono text-xs text-[#C9CDD3]">{m.going + (isGoing ? 1 : 0)} GOING</span>
                <button
                  onClick={() => setGoing((prev) => ({ ...prev, [m.id]: !prev[m.id] }))}
                  className={`font-display text-xs tracking-widest px-4 py-1.5 rounded-md border transition-colors active:scale-95 ${
                    isGoing ? "bg-[#F2C245] border-[#F2C245] text-[#17181a]" : "bg-transparent border-[#F2C245] text-[#F2C245]"
                  }`}
                >
                  {isGoing ? "GOING" : "RSVP"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="overflow-y-auto no-scrollbar h-full pb-4 screen-enter">
      <Header title="PROFILE" />
      <div className="px-4 py-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3a3c41] to-[#2A2C30] flex items-center justify-center font-mono text-sm text-[#C9CDD3] mb-3 shadow-lg shadow-black/30">
          KN
        </div>
        <h2 className="font-display text-xl text-white tracking-wide">kenji.eg6</h2>
        <p className="font-mono text-[10px] text-[#8a8d93] mt-1 tracking-widest">MEMBER SINCE 2023</p>
        <div className="flex gap-6 mt-4">
          {[["1", "CARS"], ["1.2K", "FOLLOWERS"], ["14", "SOLD"]].map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-lg text-white">{num}</p>
              <p className="font-mono text-[9px] text-[#8a8d93]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- App ------------------------------------------------------------------

export default function RevlineApp() {
  const [tab, setTab] = useState("feed");
  const [item, setItem] = useState(null);
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const addPost = (post) => setPosts((prev) => [post, ...prev]);

  const screens = {
    feed: <FeedScreen posts={posts} openItem={setItem} onNewPost={addPost} />,
    garage: <GarageScreen openItem={setItem} />,
    shop: <ShopScreen openItem={setItem} />,
    meets: <MeetsScreen />,
    profile: <ProfileScreen />,
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0c0d0e] sm:p-6">
      <style>{FONTS}</style>
      <div className="relative w-full h-[100dvh] sm:w-[380px] sm:h-[800px] bg-[#141517] rounded-none sm:rounded-[2.6rem] border-0 sm:border-[6px] sm:border-[#0a0a0b] shadow-none sm:shadow-2xl overflow-hidden flex flex-col">
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#0a0a0b] rounded-b-2xl z-40" />
        <div className="hidden sm:block">
          <StatusBar />
        </div>
        <div className="sm:hidden pt-[env(safe-area-inset-top)]" />
        <div key={tab} className="flex-1 relative overflow-hidden">
          {screens[tab]}
          <ItemSheet item={item} onClose={() => setItem(null)} />
        </div>
        <div className="pb-[env(safe-area-inset-bottom)] sm:pb-0">
          <TabBar active={tab} setActive={setTab} />
        </div>
      </div>
    </div>
  );
}
