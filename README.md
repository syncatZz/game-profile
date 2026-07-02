# 我的游戏档案馆

这是一个基础的个人游戏爱好介绍网站，使用最简单的 HTML、CSS 和 JavaScript 制作，不需要安装复杂工具，也不需要数据库。

## 怎么打开

1. 找到 `index.html` 文件。
2. 用浏览器打开它。
3. 如果你修改了内容，保存文件后刷新浏览器。

## 每个文件是做什么的

- `index.html`：网页结构，决定页面上有哪些区域。
- `style.css`：网页样式，决定颜色、布局、字体、卡片效果。
- `script.js`：网页功能，负责把数据放到页面上，并实现搜索和筛选。
- `data.js`：网站数据，你以后最常修改这个文件。
- `assets/`：放头像、游戏封面等图片。

## 怎么修改个人信息

打开 `data.js`，找到这一段：

```js
player: {
  name: "星海玩家",
  avatar: "assets/avatar.svg",
  bio: "喜欢探索开放世界、剧情向 RPG 和合作游戏。",
  favoriteGenres: ["开放世界", "RPG", "动作冒险", "合作"],
  favoriteGenre: "开放世界",
  currentGame: "Elden Ring"
}
```

你可以把里面的文字改成自己的信息。修改时注意保留英文引号、逗号和中括号。

主页里的“总游玩时长”不用在这里手动修改。它会自动把 `games` 列表里每款游戏的 `hours` 加起来。

## 怎么添加游戏平台账号

打开 `data.js`，找到 `platforms`。复制其中一段，再改成自己的账号：

```js
{
  name: "Steam",
  account: "你的账号昵称",
  link: "你的主页链接",
  note: "主力平台"
}
```

## 怎么添加一款游戏

打开 `data.js`，找到 `games`。复制一个游戏对象，粘贴到列表里，然后修改内容：

```js
{
  title: "游戏名称",
  cover: "assets/cover-elden-ring.svg",
  platforms: ["Steam"],
  genre: "动作 RPG",
  hours: 20,
  rating: 9.0,
  status: "正在玩",
  favorite: false,
  recent: true,
  comment: "这里写你的推荐理由或个人评价。"
}
```

`hours: 20` 表示这款游戏玩了 20 小时。你修改每款游戏的 `hours` 后，主页“总游玩时长”会自动更新。

`favorite: true` 表示它会出现在“最喜欢的游戏”区域。  
`recent: true` 表示它会出现在“最近游玩”区域。

## 怎么换图片

1. 把自己的图片放进 `assets` 文件夹。
2. 在 `data.js` 里把图片路径改成新图片，例如：

```js
cover: "assets/my-game-cover.jpg"
```

头像也是一样：

```js
avatar: "assets/my-avatar.png"
```

## 下一步可以升级什么

- 加一个“游戏详情页”。
- 加“年度游戏总结”。
- 加“截图墙”。
- 发布到 GitHub Pages，让朋友也能访问。

## 怎么发布到互联网

如果想把网站发布到互联网上，可以看 `DEPLOY.md`。里面写了把网站部署到 Cloudflare Pages 的步骤。
