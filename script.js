// ========================================
// Discordウィジェットのテーマ自動切り替え
// ========================================

const discordWidget =
    document.getElementById("discord-widget");


// DiscordウィジェットのURL

const discordWidgetBase =
    "https://discord.com/widget?id=1000950532933955604&theme=";


// OS・ブラウザのテーマを取得

const darkModeQuery =
    window.matchMedia("(prefers-color-scheme: dark)");


// Discordのテーマを変更

function updateDiscordTheme() {

    if (!discordWidget) {
        return;
    }


    const theme =
        darkModeQuery.matches
            ? "dark"
            : "light";


    discordWidget.src =
        discordWidgetBase + theme;

}


// 最初のテーマを設定

updateDiscordTheme();


// OS・ブラウザのテーマが変更されたとき

darkModeQuery.addEventListener(
    "change",
    updateDiscordTheme
);
