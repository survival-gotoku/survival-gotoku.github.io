const facilities = [
    {
        id: "spawnpoint",
        name: "初期スポーン地点",
        description: "一番最初にスポーンする場所です。",

        x: 0, y: 106, z: 0
    },
    {
        id: "chests",
        name: "倉庫",
        description: "物資を共有できる倉庫です。",

        x: 13, y: 100, z: 57
    },
    {
        id: "infoboard",
        name: "掲示板",
        description: "情報を共有できる掲示板です。",

        x: 50, y: 94, z: 78
    },
    {
        id: "mining_area",
        name: "採掘場",
        description: "鉱石を採掘できる場所です。",

        x: 0, y: 112, z: 25
    },
    {
        id: "trading_area",
        name: "村人交易場",
        description: "村人と取引できる場所です。",

        x: -66, y: 110, z: 65
    },
    {
        id: "simple_workspace",
        name: "簡易作業場",
        description: "簡単な作業を行える場所です。",

        x: -9, y: 107, z: 45
    },
    {
        id: "infinite_lava",
        name: "無限溶岩",
        description: "溶岩を無限に汲める場所です。",

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

        x: -88, y: 110, z: 66
    },
    {
        id: "trap_sky",
        name: "天空トラップ",
        description: "入手可能: クモの目, 糸, 火薬, 骨, 腐肉, ニンジン, 矢, ガラス瓶, グロウストーンダスト, レッドストーンダスト",

        x: -99, y: 169, z: 82
    },
    {
        id: "10_furnace",
        name: "１０連かまど",
        description: "１０倍の効率で焼けます。",

        x: 17, y: 94, z: 104
    },
    {
        id: "mud_clay",
        name: "泥・粘土",
        description: "土から泥と粘土を半自動で入手できます。",

        x: 6, y: 93, z: 108
    },
    {
        id: "cactus",
        name: "サボテン",
        description: "サボテンを自動で入手できます。",

        x: 19, y: 98, z: 39
    },
    {
        id: "sugar_cane",
        name: "サトウキビ",
        description: "サトウキビを自動で入手できます。",

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

const MAP_CENTER_X = 50 //%
const MAP_CENTER_Z = 62.5 //%    12.5%で画像の中心になるのでそこから50%ずつ変える

// Minecraft 1ブロックあたりの画像上のピクセル数
const PIXELS_PER_BLOCK = 12;


const container =
    document.getElementById("map-container");

const map =
    document.getElementById("map");

let scale = 1;

let offsetX = 0;
let offsetY = 0;

let dragging = false;

let startX = 0;
let startY = 0;

let startOffsetX = 0;
let startOffsetY = 0;



/* ========================================
   地図更新
======================================== */

function updateMap() {

    map.style.transform =
        `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

    updatePinScale();

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
   ドラッグ開始
======================================== */

container.addEventListener(
    "pointerdown",
    (event) => {

        if (
            event.target.classList.contains("map-pin")
        ) {
            return;
        }

        dragging = true;

        container.classList.add("dragging");

        startX = event.clientX;
        startY = event.clientY;

        startOffsetX = offsetX;
        startOffsetY = offsetY;

        container.setPointerCapture(
            event.pointerId
        );

    }
);


/* ========================================
   ドラッグ中
======================================== */

container.addEventListener(
    "pointermove",
    (event) => {

        if (!dragging) {
            return;
        }

        offsetX =
            startOffsetX +
            (event.clientX - startX);

        offsetY =
            startOffsetY +
            (event.clientY - startY);

        updateMap();

    }
);


/* ========================================
   ドラッグ終了
======================================== */

container.addEventListener(
    "pointerup",
    (event) => {

        dragging = false;

        container.classList.remove(
            "dragging"
        );

        container.releasePointerCapture(
            event.pointerId
        );

    }
);


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


        scale =
            Math.max(
                0.15,
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


        updateMap();

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
            `calc(${MAP_CENTER_X}% + 6px + ${facility.x * PIXELS_PER_BLOCK}px)`;

        pin.style.top =
            `calc(${MAP_CENTER_Z}% + 20px + ${facility.z * PIXELS_PER_BLOCK}px)`;


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
施設一覧を自動生成
======================================== */

const facilityList =
    document.getElementById(
        "facility-list"
    );


facilities.forEach(
    (facility) => {

        const item =
            document.createElement(
                "button"
            );


        item.className =
            "facility-list-item";


        item.dataset.target =
            facility.id;


        item.textContent =
            facility.name;


        facilityList.appendChild(
            item
        );

    }
);

/* ========================================
   施設一覧の開閉
======================================== */

const facilityMenu =
    document.getElementById(
        "facility-menu"
    );

const facilityMenuToggle =
    document.getElementById(
        "facility-menu-toggle"
    );

let facilityMenuOpen = true;


/* ========================================
   開閉
======================================== */

facilityMenuToggle.addEventListener(
    "click",
    () => {

        facilityMenuOpen =
            !facilityMenuOpen;


        if (facilityMenuOpen) {

            facilityList.style.display =
                "flex";

            facilityMenuToggle.textContent =
                "施設一覧を閉じる";

        } else {

            facilityList.style.display =
                "none";

            facilityMenuToggle.textContent =
                "施設一覧を開く";

        }

    }
);

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


        scale =
            Math.max(
                0.15,
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
   初期倍率
======================================== */

updateZoomLevel();
