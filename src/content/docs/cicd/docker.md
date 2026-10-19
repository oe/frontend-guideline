---
title: "Docker 的使用"
description: "前端先在本机运行开发服务，按需用 Compose 启动数据库；给出可运行的配置、多阶段构建、Nginx 路由和镜像发布步骤。"
sidebar:
  order: 1
---

**普通前端项目先在本机跑 Node，需要数据库或团队容器环境时再用 Docker。** 本书默认把数据库等配套服务放进容器，编辑器与开发服务器留在宿主机；这样热更新、断点和文件操作更直接。

容器能固定一部分运行环境，但 CPU 架构、外部服务和配置仍要匹配。Mac 上构建的 arm64 镜像，也不是拿到任意 x86 服务器就能原样运行。

## Docker 基本概念

- **镜像**：创建容器的模板，包含文件系统与启动配置；用标签或摘要引用。
- **容器**：由镜像启动的运行实例。删除容器不应该等于删除业务数据，重要数据放在明确管理的卷或外部存储中。
- **Dockerfile**：如何构建镜像。
- **Compose**：一组服务、网络、卷和启动参数，适合把本地配套环境写成可重复的配置。

### Docker 的优势

最实际的价值是：同事不用各自手装数据库，你能重建测试环境，CI 和部署能使用明确的镜像。只有一个静态页面时，这些收益不一定抵得上新增的工具和资源占用。

### Docker 安装

Mac 推荐先试 [OrbStack](https://orbstack.dev/)，需要团队统一 Docker Desktop 功能时用 [Docker Desktop](https://docs.docker.com/desktop/)；Windows 使用 Docker Desktop 的 WSL 2 方案；Linux 服务器直接按 [Docker Engine 安装说明](https://docs.docker.com/engine/install/)配置。个人与商业授权按所选产品核对。

装好先确认客户端能连到正在运行的引擎：

```sh
docker version
docker compose version
```

只看到 CLI 版本不代表引擎已经启动。连接错误先看桌面应用、Docker context 和 WSL 集成，不要先重装项目依赖。

### Docker 的常用命令

```sh
docker ps                  # 正在运行的容器
docker ps -a               # 包括已停止的容器
docker logs <容器名>        # 服务启动与运行日志
docker stop <容器名>        # 停止容器
docker rm <容器名>          # 删除已停止的容器
docker image ls            # 已下载或构建的镜像
```

先看日志，再决定是否重启。看到数据库连不上就把所有容器和卷删掉，是很昂贵的排错方式。

## Docker 在前端开发中的作用

### 后台服务的启动（全栈开发）

下面是一个**本地开发数据库**的完整 `compose.yaml`，没有需要读者自行补齐的后端镜像：

```yaml
services:
  db:
    image: postgres:18
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: local-dev-only
      POSTGRES_DB: app
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  pgdata:
```

这里固定 PostgreSQL 18 主版本。官方镜像从 18 起调整了数据目录布局，卷挂载按[官方说明](https://github.com/docker-library/docs/blob/master/postgres/README.md#pgdata)使用 `/var/lib/postgresql`，别直接抄旧版 `/var/lib/postgresql/data` 的示例。

```sh
docker compose config                  # 先验证配置
docker compose up -d db
docker compose ps
docker compose logs db
docker compose exec db psql -U app -d app -c 'SELECT 1;'
```

看到服务 healthy、`SELECT 1` 返回一行后，再连接本地 API 服务：宿主机使用 `127.0.0.1:5432`，同一 Compose 网络中的其他容器使用 `db:5432`。数据库凭据只交给服务端，浏览器不要直接连接数据库。

结束时运行 `docker compose down`，命名卷保留数据；`docker compose down -v` 会删除这组卷，只在明确要重置开发数据时运行。上面的密码只用于本机示例，生产数据库单独管理访问、凭据与备份。

### 前端构建与测试

需要验证干净的 Node 环境时，可以在已有 `package-lock.json` 的 npm 项目中运行：

```sh
docker run --rm -v "$PWD":/app -v /app/node_modules -w /app node:24 sh -c "npm ci && npm run build"
```

命令适用于 macOS / Linux / WSL 的 Shell。匿名卷避免复用宿主机的 `node_modules`；这组依赖在容器里按锁文件重新安装。pnpm 项目则先准备仓库指定的 pnpm 版本，执行 `--frozen-lockfile` 安装，不要混用锁文件。

### 前端部署

纯静态产物用 Nginx 提供服务，Node 只负责构建。下面的 `Dockerfile` 假设 `npm run build` 输出 `dist/`：

```dockerfile
FROM node:24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
```

**history 路由的 SPA** 可以使用下面的 `nginx.conf`。普通多页站应移除 `/index.html` 回退，让未知路径返回 404：

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

再添加 `.dockerignore`，避免把本机依赖、Git 历史和本地环境文件复制进构建：

```text
node_modules
dist
.git
.env
.env.*
```

```sh
docker build -t my-frontend:dev .
docker run --rm -p 127.0.0.1:8080:80 my-frontend:dev
```

打开 `http://localhost:8080`，直接访问并刷新详情页。页面正常后才推送镜像；生产发布使用明确版本或提交标签，不靠一个不断被覆盖的 `latest` 判断当前运行了什么。

### 多人协作和入职培训

把配套服务写进 Compose，README 写清启动、健康检查、连接地址与重置方法。让同事在干净环境实际运行一次，比写「一键启动，开箱即用」更能发现缺失步骤。

## Docker 与 CI/CD 的关联

普通静态站直接让 CI 构建并上传产物即可，见 [GitHub CI/CD](/frontend-guideline/cicd/github/)。团队需要把镜像交给服务器运行时，再增加镜像构建、推送与部署。

下面是 **GitLab Docker executor + Docker-in-Docker** 的镜像构建示例，使用当前项目的 Container Registry：

```yaml
image: docker:cli
services:
  - docker:dind

variables:
  DOCKER_HOST: tcp://docker:2376
  DOCKER_TLS_CERTDIR: /certs
  DOCKER_TLS_VERIFY: "1"
  DOCKER_CERT_PATH: "$DOCKER_TLS_CERTDIR/client"

stages:
  - deploy

build-and-push:
  stage: deploy
  script:
    - echo "$CI_REGISTRY_PASSWORD" | docker login "$CI_REGISTRY" -u "$CI_REGISTRY_USER" --password-stdin
    - docker build -t "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA" .
    - docker push "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA"
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
```

Runner 管理员需要先配置 Dind 所需权限和 TLS 证书共享卷，见[官方要求](https://docs.gitlab.com/ci/docker/using_docker_build/#use-docker-in-docker)。不要在共享给不受信项目的 Runner 上随便开启高权限模式。镜像推送成功只完成了分发，服务器拉取、启动新容器和回退还要有单独流程。

### 常见故障

| 现象 | 先查 |
| --- | --- |
| 数据库容器退出 | `docker compose logs db`，看密码、数据目录与权限 |
| 宿主机连不上数据库 | 端口映射、健康检查、是否已有进程占用 5432 |
| 容器访问自己的 `localhost` 却找不到另一个服务 | 改用同一网络内的服务名 |
| Mac 本机镜像到服务器运行失败 | 镜像与目标平台的 arm64 / amd64 是否匹配，构建时指定并验证目标平台 |
| 改了密码环境变量但连接还是旧密码 | 初始化变量通常只在空数据目录首次启动时使用；按数据库流程修改现有账号，别误删业务卷 |

## 帮助链接

- [Dockerfile 参考](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL 官方镜像](https://github.com/docker-library/docs/blob/master/postgres/README.md)
- [GitLab Docker 构建](https://docs.gitlab.com/ci/docker/using_docker_build/)
