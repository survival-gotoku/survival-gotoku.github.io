// const facilities = [
//     {
//         id: "spawnpoint",
//         name: "初期スポーン地点",
//         description: "一番最初にスポーンする場所です。",

//         x: 0, y: 106, z: 0,
//         mapX: 50.5, mapY: 65
//     },
//     // {
//     //     id: "village",
//     //     name: "村",
//     //     description: "プレイヤーが自由に建築や開拓を行っている場所です。",

//     //     x: 100, y: 64, z: -200,
//     //     mapX: 41, mapY: 0
//     // },

// ];

const facilities = [

    {
        id: "test",
        name: "test",
        description: "これはテストです。座標は全く異なります。",

        x: 0,
        y: 64,
        z: 0
    }

];


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
        pin.style.left = "calc(50% + 12px)";
        pin.style.top = "calc(50% + 20px)";


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
