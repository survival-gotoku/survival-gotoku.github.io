const facilities = [
    {
        id: "spawnpoint",
        name: "初期スポーン地点",
        description: "一番最初にスポーンする場所です。",
        category: "facility",
        x: 0, y: 106, z: 0
    },
    {
        id: "chests",
        name: "倉庫",
        description: "物資を共有できる倉庫です。",
        category: "facility",
        x: 13, y: 100, z: 57
    },
    {
        id: "infoboard",
        name: "掲示板",
        description: "情報を共有できる掲示板です。",
        category: "facility",
        x: 50, y: 94, z: 78
    },
    {
        id: "mining_area",
        name: "採掘場",
        description: "鉱石を採掘できる場所です。",
        category: "facility",
        x: 0, y: 112, z: 25
    },
    {
        id: "trading_area",
        name: "村人交易場",
        description: "村人と取引できる場所です。",
        category: "facility",
        x: -66, y: 110, z: 65
    },
    {
        id: "simple_workspace",
        name: "簡易作業場",
        description: "簡単な作業を行える場所です。",
        category: "facility",
        x: -9, y: 107, z: 45
    },
    {
        id: "infinite_lava",
        name: "無限溶岩",
        description: "溶岩を無限に汲める場所です。",
        category: "facility",
        x: 31, y: 94, z: 39
    },
    // {
    //     id: "trap_skeleton",
    //     name: "スケルトントラップ",
    //     description: "入手可能: 骨, 矢, 弓",

    //     x: 69, y: 93, z: 27
    // },
    {
        id: "trap_iron_golem",
        name: "アイアンゴーレムトラップ",
        description: "入手可能: 鉄, ポピー",
        category: "trap",
        x: -88, y: 110, z: 66
    },
    {
        id: "trap_sky",
        name: "天空トラップ",
        description: "入手可能: クモの目, 糸, 火薬, 骨, 腐肉, ニンジン, 矢, ガラス瓶, グロウストーンダスト, レッドストーンダスト",
        category: "trap",
        x: -99, y: 169, z: 82
    },
    {
        id: "10_furnace",
        name: "１０連かまど",
        description: "１０倍の効率で焼けます。",
        category: "machine",
        x: 17, y: 94, z: 104
    },
    {
        id: "mud_clay",
        name: "泥・粘土",
        description: "土から泥と粘土を半自動で入手できます。",
        category: "machine",
        x: 6, y: 93, z: 108
    },
    {
        id: "cactus",
        name: "サボテン",
        description: "サボテンを自動で入手できます。",
        category: "machine",
        x: 19, y: 98, z: 39
    },
    {
        id: "sugar_cane",
        name: "サトウキビ",
        description: "サトウキビを自動で入手できます。",
        category: "machine",
        x: -92, y: 108, z: 61
    },
    // {
    //     id: "cow",
    //     name: "牛",
    //     description: "ステーキを自動で入手できます。",

    //     x: -22, y: 104, z: 55
    // },
    // {
    //     id: "chicken",
    //     name: "鶏",
    //     description: "焼き鶏を自動で入手できます。",

    //     x: 20, y: 98, z: 46
    // },
    {
        id: "ss_1",
        name: "(SS-1)レンガ工場前",
        description: "",
        category: "station",
        x: 46, y: 93, z: 97
    },
    {
        id: "ss_2",
        name: "(SS-2)山中新町",
        description: "",
        category: "station",
        x: 267, y: 121, z: -37
    },

];

// const facilities = [

//     {
//         id: "test",
//         name: "test",
//         description: "これはテストです。座標は全く異なります。",

//         x: 0,
//         y: 64,
//         z: 0
//     }

// ];

const railwayLines = [
    {
        id: "line_ss_1",
        name: "しいあサバイバル線1",
        category: "railway",
        color: "#0b3b5d",
        points: [
            { x: 42, z: 107 },
            { x: 74, z: 107 },
            { x: 264, z: 107 },
            { x: 264, z: -44 },
        ]
    }
];

// 分類名
const categoryNames = {
    facility: "施設",
    machine: "装置",
    trap: "トラップ",
    station: "駅・路線"
};


// フィルターの状態
const categoryEnabled = {
    facility: true,
    machine: true,
    trap: true,
    station: true
};

// Minecraft 1ブロックあたりの画像上のピクセル数
const PIXELS_PER_BLOCK = 12;

// マップ画像のサイズ
const TILE_WIDTH = 1550;
const TILE_HEIGHT = 1549;


/* ========================================
   マップ画像一覧
   ファイル名を追加するだけで拡張できる
======================================== */

/*
┌──────┬──────┬──────┬──────┬──────┐
│ -2_2 │ -1_2 │  0_2 │  1_2 │  2_2 │
├──────┼──────┼──────┼──────┼──────┤
│ -2_1 │ -1_1 │  0_1 │  1_1 │  2_1 │
├──────┼──────┼──────┼──────┼──────┤
│ -2_0 │ -1_0 │  0_0 │  1_0 │  2_0 │
├──────┼──────┼──────┼──────┼──────┤
│-2_-1 │-1_-1 │ 0_-1 │ 1_-1 │ 2_-1 │
└──────┴──────┴──────┴──────┴──────┘
*/
const mapTiles = [
    "-2_2.png",
    "-1_2.png",
    "0_2.png",
    "1_2.png",
    "2_2.png",

    "-2_1.png",
    "-1_1.png",
    "0_1.png",
    "1_1.png",
    "2_1.png",

    "-2_0.png",
    "-1_0.png",
    "0_0.png",
    "1_0.png",
    "2_0.png",

    "-2_-1.png",
    "-1_-1.png",
    "0_-1.png",
    "1_-1.png",
    "2_-1.png"
];



/* ========================================
   マップ画像を自動配置
======================================== */

const container =
    document.getElementById("map-container");

const map =
    document.getElementById("map");


// ファイル名から画像の座標を取得
const tiles = mapTiles.map(filename => {

    const match = filename.match(/^(-?\d+)_(-?\d+)\.png$/);

    if (!match) {
        throw new Error("画像ファイル名が正しくありません: " + filename);
    }

    return {
        filename,
        x: Number(match[1]),
        z: Number(match[2])
    };

});


// 画像の配置範囲を計算
const minTileX = Math.min(...tiles.map(tile => tile.x));
const maxTileX = Math.max(...tiles.map(tile => tile.x));

const minTileZ = Math.min(...tiles.map(tile => tile.z));
const maxTileZ = Math.max(...tiles.map(tile => tile.z));


// マップ全体のサイズ
map.style.width =
    (maxTileX - minTileX + 1) * TILE_WIDTH + "px";

map.style.height =
    (maxTileZ - minTileZ + 1) * TILE_HEIGHT + "px";


// 画像を配置
tiles.forEach(tile => {

    const img = document.createElement("img");

    img.src = tile.filename;
    img.className = "map-image";

    img.style.left =
        (tile.x - minTileX) * TILE_WIDTH + "px";

    img.style.top =
        (maxTileZ - tile.z) * TILE_HEIGHT + "px";

    map.appendChild(img);

});


// Minecraft座標(0, 0)の画像上の位置
const WORLD_ORIGIN_X =
    (0 - minTileX + 0.5) * TILE_WIDTH + 6;

const WORLD_ORIGIN_Z =
    (maxTileZ - 0 + 0.5) * TILE_HEIGHT + 20;


let scale = 1;

let offsetX = 0;
let offsetY = 0;

let dragging = false;

let startX = 0;
let startY = 0;

let startOffsetX = 0;
let startOffsetY = 0;


/* ========================================
   路線図
======================================== */
const railwaySvg =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

railwaySvg.id = "railway-layer";

railwaySvg.style.position = "absolute";
railwaySvg.style.left = "0";
railwaySvg.style.top = "0";
railwaySvg.style.width = "100%";
railwaySvg.style.height = "100%";
railwaySvg.style.overflow = "visible";
railwaySvg.style.pointerEvents = "none";

map.appendChild(railwaySvg);
function drawRailwayLines() {

    railwaySvg.innerHTML = "";

    railwayLines.forEach(line => {
        if (!categoryEnabled.station) {
            return;
        }
        const polyline =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "polyline"
            );

        const points = line.points.map(point => {

            const x =
                WORLD_ORIGIN_X +
                point.x * PIXELS_PER_BLOCK;

            const y =
                WORLD_ORIGIN_Z +
                point.z * PIXELS_PER_BLOCK;

            return `${x},${y}`;

        }).join(" ");

        polyline.setAttribute("points", points);
        polyline.setAttribute("fill", "none");
        polyline.setAttribute("stroke-linecap", "round");
        polyline.setAttribute("stroke-linejoin", "round");

        // 白い縁取り
        polyline.setAttribute("stroke", "white");
        polyline.setAttribute("stroke-width", 16 / scale);

        railwaySvg.appendChild(polyline.cloneNode(true));

        // 路線本体
        polyline.setAttribute("stroke", line.color);
        polyline.setAttribute("stroke-width", 10 / scale);

        railwaySvg.appendChild(polyline);

    });

}

drawRailwayLines();

/* ========================================
   最小ズーム倍率・地図中央配置
======================================== */

function getMinScale() {

    return Math.min(
        container.clientWidth / map.offsetWidth,
        container.clientHeight / map.offsetHeight
    );

}


// 地図全体を画面中央に配置
function centerMap() {

    offsetX =
        (container.clientWidth - map.offsetWidth * scale) / 2;

    offsetY =
        (container.clientHeight - map.offsetHeight * scale) / 2;

}


/* ========================================
   地図更新
======================================== */

function updateMap() {

    map.style.transform =
        `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

    updatePinScale();
    drawRailwayLines();
}

function updatePinScale() {

    pins.forEach((pin) => {

        const baseScale = 1 / scale;

        const selectedScale =
            pin.classList.contains("selected")
                ? baseScale * 1.5
                : baseScale;

        pin.style.transform =
            `translate(-50%, -50%) scale(${selectedScale})`;

    });

}


/* ========================================
   ドラッグ・ピンチ操作
======================================== */

// 現在操作中の指を記録
const activePointers = new Map();

let pinchDistance = 0;


// 2点間の距離
function getPinchDistance(p1, p2) {
    return Math.hypot(
        p2.x - p1.x,
        p2.y - p1.y
    );
}


// 2点の中間地点
function getPinchCenter(p1, p2) {
    const rect = container.getBoundingClientRect();

    return {
        x: (p1.x + p2.x) / 2 - rect.left,
        y: (p1.y + p2.y) / 2 - rect.top
    };
}


/* ========================================
   操作開始
======================================== */

container.addEventListener("pointerdown", (event) => {

    if (event.target.classList.contains("map-pin")) {
        return;
    }

    activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
    });

    container.setPointerCapture(event.pointerId);

    if (activePointers.size === 1) {

        // 1本指：ドラッグ開始
        dragging = true;

        startX = event.clientX;
        startY = event.clientY;

        startOffsetX = offsetX;
        startOffsetY = offsetY;

        container.classList.add("dragging");

    } else if (activePointers.size === 2) {

        // 2本指：ピンチ開始
        dragging = false;

        const points = Array.from(activePointers.values());

        pinchDistance = getPinchDistance(
            points[0],
            points[1]
        );

        container.classList.remove("dragging");
    }

});


/* ========================================
   操作中
======================================== */

container.addEventListener("pointermove", (event) => {

    if (!activePointers.has(event.pointerId)) {
        return;
    }

    activePointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
    });


    // 2本指：ピンチズーム
    if (activePointers.size >= 2) {

        const points = Array.from(activePointers.values());

        const p1 = points[0];
        const p2 = points[1];

        const newDistance = getPinchDistance(p1, p2);

        const center = getPinchCenter(p1, p2);

        if (pinchDistance > 0) {

            const oldScale = scale;

            const ratio = newDistance / pinchDistance;

            scale = Math.max(
                getMinScale(),
                Math.min(4, scale * ratio)
            );

            // 指の中間地点を中心にズーム
            offsetX =
                center.x -
                (center.x - offsetX) *
                (scale / oldScale);

            offsetY =
                center.y -
                (center.y - offsetY) *
                (scale / oldScale);

            if (scale <= getMinScale()) {
                centerMap();
            }

            updateMap();
            updateZoomLevel();
        }

        pinchDistance = newDistance;

        return;
    }


    // 1本指：ドラッグ
    if (activePointers.size === 1 && dragging) {

        offsetX =
            startOffsetX +
            (event.clientX - startX);

        offsetY =
            startOffsetY +
            (event.clientY - startY);

        updateMap();
    }

});


/* ========================================
   操作終了
======================================== */

function endPointer(event) {

    if (!activePointers.has(event.pointerId)) {
        return;
    }

    activePointers.delete(event.pointerId);

    if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
    }


    if (activePointers.size === 1) {

        // ピンチ終了後、残った指でドラッグできるようにする
        const remaining = Array.from(activePointers.values())[0];

        dragging = true;

        startX = remaining.x;
        startY = remaining.y;

        startOffsetX = offsetX;
        startOffsetY = offsetY;

        pinchDistance = 0;

        container.classList.add("dragging");

    } else {

        dragging = false;
        pinchDistance = 0;

        container.classList.remove("dragging");
    }

}


container.addEventListener("pointerup", endPointer);
container.addEventListener("pointercancel", endPointer);



/* ========================================
   ホイール拡大縮小
======================================== */

container.addEventListener(
    "wheel",
    (event) => {

        event.preventDefault();

        const rect =
            container.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;


        const oldScale =
            scale;


        if (event.deltaY < 0) {

            scale *= 1.1;

        } else {

            scale /= 1.1;

        }


        scale = Math.max(
            getMinScale(),
            Math.min(4, scale)
        );


        /*
         * マウス位置を中心に
         * 拡大縮小する
         */

        offsetX =
            mouseX -
            (mouseX - offsetX)
            * (scale / oldScale);

        offsetY =
            mouseY -
            (mouseY - offsetY)
            * (scale / oldScale);

        if (scale <= getMinScale()) {
            centerMap();
        }

        updateMap();
        updateZoomLevel();

    },
    {
        passive: false
    }
);


/* ========================================
施設データからピンを生成
======================================== */

facilities.forEach(
    (facility) => {

        const pin =
            document.createElement(
                "button"
            );


        pin.className =
            "map-pin";


        pin.id =
            facility.id;


        // pin.style.left =
        //     facility.mapX + "%";


        // pin.style.top =
        //     facility.mapY + "%";
        pin.style.left =
            `${WORLD_ORIGIN_X + facility.x * PIXELS_PER_BLOCK}px`;
                
        pin.style.top =
            `${WORLD_ORIGIN_Z + facility.z * PIXELS_PER_BLOCK}px`;


        pin.dataset.name =
            facility.name;

        pin.dataset.description =
            facility.description;

        pin.dataset.x =
            facility.x;


        pin.dataset.y =
            facility.y;


        pin.dataset.z =
            facility.z;


        map.appendChild(
            pin
        );

    }
);


/* ========================================
生成されたピンを取得
======================================== */

const pins =
    document.querySelectorAll(
        ".map-pin"
    );


const info =
    document.getElementById(
        "facility-info"
    );


const name =
    document.getElementById(
        "facility-name"
    );


const description =
    document.getElementById(
        "facility-description"
    );

const coordinates =
    document.getElementById(
        "facility-coordinates"
    );


/* ========================================
   ピンを選択する処理
======================================== */

function selectPin(pin, moveMap = false) {


    /* ========================================
       以前選択されていたピンを解除
    ======================================== */

    document
        .querySelectorAll(".map-pin.selected")
        .forEach(
            (selectedPin) => {

                selectedPin.classList.remove(
                    "selected"
                );

            }
        );


    /* ========================================
       新しいピンを選択
    ======================================== */

    pin.classList.add(
        "selected"
    );
    
    updatePinScale();


    /* ========================================
       施設情報を表示
    ======================================== */

    name.textContent =
        pin.dataset.name;


    description.textContent =
        pin.dataset.description;


    coordinates.textContent =
        `${pin.dataset.x}, ${pin.dataset.y}, ${pin.dataset.z}`;


    info.classList.remove(
        "hidden"
    );


    /* ========================================
       一覧から選択した場合だけ
       マップを中央へ移動
    ======================================== */

    if (moveMap) {

        const pinX =
            pin.offsetLeft;

        const pinY =
            pin.offsetTop;


        const containerWidth =
            container.clientWidth;

        const containerHeight =
            container.clientHeight;


        offsetX =
            containerWidth / 2
            - pinX * scale;


        offsetY =
            containerHeight / 2
            - pinY * scale;


        updateMap();

    }

}


/* ========================================
   マップ上のピンをクリック
======================================== */

pins.forEach(
    (pin) => {

        pin.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                selectPin(
                    pin,
                    false
                );

            }
        );

    }
);


/* ========================================
   閉じる
======================================== */

document
    .getElementById("facility-close")
    .addEventListener(
        "click",
        () => {

            info.classList.add(
                "hidden"
            );

        }
    );


/* 初期表示 */

updateMap();

/* ========================================
   施設一覧・表示フィルター
======================================== */

const facilityList =
    document.getElementById("facility-list");

const facilityFilter =
    document.getElementById("facility-filter");

const facilityMenu =
    document.getElementById("facility-menu");

const facilityMenuToggle =
    document.getElementById("facility-menu-toggle");





// 施設一覧を生成
facilities.forEach(facility => {

    const item = document.createElement("button");

    item.className = "facility-list-item";
    item.dataset.target = facility.id;
    item.dataset.category = facility.category;

    item.textContent = facility.name;

    facilityList.appendChild(item);

});


// フィルターを生成
Object.entries(categoryNames).forEach(([category, label]) => {

    const wrapper = document.createElement("label");
    wrapper.className = "facility-filter-item";

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = true;

    checkbox.addEventListener("change", () => {

        categoryEnabled[category] = checkbox.checked;

        updateFacilityFilter();

    });

    const text = document.createElement("span");
    text.textContent = label;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(text);

    facilityFilter.appendChild(wrapper);

});


// すべて表示
const allWrapper = document.createElement("label");
allWrapper.className = "facility-filter-item";

const allCheckbox = document.createElement("input");
allCheckbox.type = "checkbox";
allCheckbox.checked = true;

const allText = document.createElement("span");
allText.textContent = "すべて表示";

allWrapper.appendChild(allCheckbox);
allWrapper.appendChild(allText);

facilityFilter.prepend(allWrapper);


// すべて表示の切り替え
allCheckbox.addEventListener("change", () => {

    Object.keys(categoryEnabled).forEach(category => {

        categoryEnabled[category] = allCheckbox.checked;

    });

    facilityFilter.querySelectorAll(
        ".facility-filter-item input"
    ).forEach((checkbox, index) => {

        if (index !== 0) {
            checkbox.checked = allCheckbox.checked;
        }

    });

    updateFacilityFilter();

});


// フィルター適用
function updateFacilityFilter() {

    // 施設一覧
    document.querySelectorAll(".facility-list-item").forEach(item => {

        item.hidden =
            !categoryEnabled[item.dataset.category];

    });


    // マップ上のピン
    pins.forEach(pin => {

        const facility = facilities.find(
            item => item.id === pin.id
        );

        if (!facility) return;

        pin.hidden =
            !categoryEnabled[facility.category];

        // 非表示になった選択中のピンは選択解除
        if (pin.hidden && pin.classList.contains("selected")) {

            pin.classList.remove("selected");
            info.classList.add("hidden");

        }

    });

    drawRailwayLines();
    
    // すべて表示チェックの状態を更新
    allCheckbox.checked =
        Object.values(categoryEnabled).every(Boolean);

}


// 初期状態
updateFacilityFilter();


/* ========================================
   施設一覧の開閉
======================================== */

let facilityMenuOpen = true;

facilityMenuToggle.addEventListener("click", () => {

    facilityMenuOpen = !facilityMenuOpen;

    facilityFilter.style.display =
        facilityMenuOpen ? "block" : "none";

    facilityList.style.display =
        facilityMenuOpen ? "flex" : "none";

    facilityMenuToggle.textContent =
        facilityMenuOpen
            ? "施設メニューを閉じる"
            : "施設メニューを開く";

});

/* ========================================
一覧から施設を選択
======================================== */

const facilityItems =
    document.querySelectorAll(
        ".facility-list-item"
    );


facilityItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                const targetId =
                    item.dataset.target;


                const pin =
                    document.getElementById(
                        targetId
                    );


                if (!pin) {
                    return;
                }


                selectPin(
                    pin,
                    true
                );

            }
        );

    }
);

/* ========================================
   ズームボタン
======================================== */

const zoomIn =
    document.getElementById(
        "zoom-in"
    );

const zoomOut =
    document.getElementById(
        "zoom-out"
    );

const zoomLevel =
    document.getElementById(
        "zoom-level"
    );


/* ========================================
   ズーム倍率表示
======================================== */

function updateZoomLevel() {

    zoomLevel.textContent =
        Math.round(scale * 100) + "%";

}


/* ========================================
   拡大
======================================== */

zoomIn.addEventListener(
    "pointerdown",
    (event) => {

        event.preventDefault();
        event.stopPropagation();


        const oldScale =
            scale;


        scale *= 1.2;


        scale =
            Math.min(
                4,
                scale
            );


        const centerX =
            container.clientWidth / 2;

        const centerY =
            container.clientHeight / 2;


        offsetX =
            centerX -
            (
                centerX -
                offsetX
            ) *
            (
                scale /
                oldScale
            );


        offsetY =
            centerY -
            (
                centerY -
                offsetY
            ) *
            (
                scale /
                oldScale
            );


        updateMap();

        updateZoomLevel();

    }
);


/* ========================================
   縮小
======================================== */

zoomOut.addEventListener(
    "pointerdown",
    (event) => {

        event.preventDefault();
        event.stopPropagation();


        const oldScale =
            scale;


        scale /= 1.2;


        scale = Math.max(
            getMinScale(),
            scale
        );


        const centerX =
            container.clientWidth / 2;

        const centerY =
            container.clientHeight / 2;


        offsetX =
            centerX -
            (
                centerX -
                offsetX
            ) *
            (
                scale /
                oldScale
            );


        offsetY =
            centerY -
            (
                centerY -
                offsetY
            ) *
            (
                scale /
                oldScale
            );


        if (scale <= getMinScale()) {
            centerMap();
        }
        
        updateMap();

        updateZoomLevel();

    }
);


/* ========================================
   初期倍率
======================================== */

updateZoomLevel();


