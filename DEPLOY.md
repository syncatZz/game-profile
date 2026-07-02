# 部署到 Cloudflare Pages

这份说明适合把当前静态网站发布到互联网上。

## 你需要准备

- 一个 GitHub 账号
- 一个 Cloudflare 账号
- 一个已经托管在 Cloudflare 的域名

## 第一步：创建 GitHub 仓库

1. 打开 GitHub。
2. 点击右上角的 `+`。
3. 选择 `New repository`。
4. 仓库名可以写：

```text
game-profile
```

5. 选择 `Public` 或 `Private` 都可以。
6. 点击 `Create repository`。

## 第二步：上传网站文件

需要上传这些内容：

```text
index.html
style.css
script.js
data.js
README.md
DEPLOY.md
assets/
.gitignore
```

不要上传这些内容：

```text
.idea/
work/
outputs/
```

## 第三步：创建 Cloudflare Pages 项目

1. 打开 Cloudflare Dashboard。
2. 进入 `Workers & Pages`。
3. 点击 `Create`。
4. 选择 `Pages`。
5. 选择 `Connect to Git`。
6. 选择刚才的 GitHub 仓库。

## 第四步：填写部署设置

因为这是静态网站，不需要构建命令。

```text
Framework preset: None
Build command: 留空
Build output directory: /
Root directory: 留空
```

然后点击部署。

## 第五步：访问网站

部署完成后，Cloudflare 会给你一个临时网址，例如：

```text
https://game-profile.pages.dev
```

打开它，就能在互联网上访问你的网站。

## 第六步：绑定自己的域名

1. 进入 Cloudflare Pages 项目。
2. 打开 `Custom domains`。
3. 点击 `Set up a custom domain`。
4. 输入你想用的域名，例如：

```text
games.example.com
```

5. 按 Cloudflare 提示完成绑定。

如果你的域名已经在 Cloudflare 托管，DNS 通常会自动配置。

## 以后怎么更新网站

以后你修改了本地文件，比如 `data.js`，需要重新上传到 GitHub。Cloudflare Pages 会自动重新部署。

如果你用 GitHub 网页直接编辑文件，保存后 Cloudflare 也会自动更新网站。

## 关于留言功能

当前留言功能保存在访问者自己的浏览器里。

也就是说：

```text
A 留的言，只有 A 自己能看到。
B 打开网站，看不到 A 的留言。
```

如果你想让所有访问者都看到同一个留言板，需要以后增加后端服务和数据库。你的 VPS 可以用来做这件事。
