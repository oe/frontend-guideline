---
title: "Docker 的使用"
description: "理解 Docker 的镜像、容器和平台边界，并用容器组织前端开发与构建。"
sidebar:
  order: 1
---


Docker 使用容器打包应用及其用户空间依赖，可以减少环境差异，但并不能保证任意硬件和系统上都无差别运行。镜像支持的 CPU 架构、操作系统、外部服务和挂载配置仍需匹配。对于前端开发者来说，Docker 提供了很多便利，帮助我们简化开发环境的搭建，并帮助团队明确共享的环境配置。

> [Docker 官网](https://www.docker.com/) 提供了详细的介绍和文档，可以帮助你快速了解 Docker 的基础概念。

## Docker 基本概念

Docker 是一种虚拟化工具，它通过使用容器来实现应用程序的打包和隔离，从而使开发、测试、部署变得更加便捷。以下是 Docker 的一些基本概念：

- **镜像（Image）**：镜像是用于创建容器的只读模板，包含文件系统层与启动等元数据；它可以打包代码、运行时和库，但主机内核、外部服务和运行时配置不一定包含在其中。
- **容器（Container）**：容器是镜像的运行实例，有自己的进程、文件系统视图与配置。Linux 容器共享所在 Linux 主机的内核，不是自带完整内核的虚拟机，也不是绝对的安全边界；在 macOS/Windows 的常见桌面方案中，Linux 容器通常通过虚拟化环境运行。
- **Dockerfile**：Dockerfile 是用于定义镜像内容的脚本文件，它描述了如何构建镜像。


### Docker 的优势

- 轻量：相较完整虚拟机，通常不需要为每个 Linux 容器启动独立内核。
- 可重复：用镜像和配置明确应用依赖，减少本地与 CI 的差异。
- 隔离：将进程和依赖分开组织，具体隔离程度仍受运行权限和配置影响。
- 部署：可以复用验证过的镜像，外部数据库、存储和环境变量仍需单独管理。

### Docker 安装
要开始使用 Docker，可以先安装 Docker，以下是安装 Docker 的一些链接：

- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker on Linux](https://docs.docker.com/engine/install/)

> Docker Engine 与 Docker Desktop 的分发和许可不同，安装前查看相应产品的许可。macOS 上也可按需求评估 [OrbStack](https://orbstack.dev/) 等工具，功能、资源占用和兼容性需要在自己的工作负载中比较。


### Docker 的常用命令

```sh
# 拉取镜像
docker pull <镜像名>

# 运行容器
docker run -d -p 8080:80 <镜像名>

# 查看运行中的容器
docker ps

# 停止容器
docker stop <容器ID>

# 删除容器
docker rm <容器ID>

# 构建镜像
docker build -t <镜像名>:<标签> .

# 推送镜像到 Docker Hub
docker push <镜像名>:<标签>
```
## Docker 在前端开发中的作用

Docker 在前端开发中可以扮演多个重要角色，以下是 Docker 在前端开发中的几个常见应用场景：

### 后台服务的启动（全栈开发）

在进行前端全栈开发时，经常需要与数据库或其他后台服务一起工作。通过 Docker，可以轻松启动这些服务，而无需手动配置复杂的环境。例如，你可以通过 Docker 启动一个数据库服务，使其与前端项目协同工作。

**示例**（用于本地开发的 Compose 配置）：

```yaml
services:
  frontend:
    image: node:24
    volumes:
      - .:/app
      - /app/node_modules
    working_dir: /app
    command: sh -c "npm ci && npm run dev -- --host 0.0.0.0"
    ports:
      - "5173:5173"
  backend:
    image: my-backend:latest
    ports:
      - "3000:3000"
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    ports:
      - "127.0.0.1:5432:5432"
```

本例前端采用 Vite 默认端口与 npm 锁文件，`my-backend:latest` 需要替换为实际的后端镜像。数据库密码仅为本地示例；容器内后端访问数据库时，主机名应使用 Compose 服务名 `db`，不是后端容器自己的 `localhost`。需要保留数据库数据时还应配置持久化卷和备份。通过 Docker Compose，你可以同时启动前端、后端和数据库服务，模拟完整的开发环境，极大地提高开发效率。

### 前端构建与测试

Docker 也可以用来运行前端项目的构建和测试任务。通过在 Docker 容器中运行构建任务，可以确保构建过程中的环境一致性，避免由于开发者本地环境的差异导致的构建失败。

**示例**：

```sh
docker run --rm -v "$PWD":/app -v /app/node_modules -w /app node:24 sh -c "npm ci && npm run build"
```

这条命令将使用 Node.js 24 的镜像，根据已提交的 `package-lock.json` 安装依赖后构建。匿名卷隔离容器与宿主机的 `node_modules`，避免复用不同平台的原生依赖。pnpm 项目应使用项目指定的 pnpm 版本与 `--frozen-lockfile`。

### 前端部署

Docker 可以用于前端应用的部署，通过将前端应用打包为 Docker 镜像，开发者可以在支持该镜像平台与运行要求的服务器上部署和运行前端应用，减少环境差异。以下是使用 Docker 部署前端应用的一个简单流程：

1. **创建 Docker 镜像**：首先，编写 Dockerfile 来构建前端应用的镜像。

   **示例 Dockerfile**：

   ```dockerfile
   FROM node:24 AS build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:stable-alpine
   COPY --from=build /app/dist/ /usr/share/nginx/html/
   ```

   本例先在 Node.js 镜像中安装与构建，再将 `dist/` 复制到 Nginx 镜像。项目应已有 `package-lock.json`，并用 `.dockerignore` 排除 `node_modules`、`dist`、`.git` 和本地环境文件，避免覆盖容器内依赖或带入无关文件。单页应用的路由回退需要另行配置 Nginx。

2. **构建 Docker 镜像**：

   ```sh
   docker build -t my-frontend-app .
   ```

   通过上述命令，你可以创建一个名为 `my-frontend-app` 的 Docker 镜像，镜像中包含了构建好的前端应用。

3. **运行容器**：

   ```sh
   docker run -d -p 80:80 my-frontend-app
   ```

   通过该命令，你可以启动一个容器并将其端口 80 映射到主机的端口 80，这样你的前端应用就可以通过浏览器访问。

4. **推送到容器镜像仓库（可选）**：如果需要将应用部署到不同的服务器，可以将镜像推送到 Docker Hub 或私有镜像仓库，方便其他团队成员或服务器拉取。

   ```sh
   docker tag my-frontend-app myrepository/my-frontend-app:latest
   docker push myrepository/my-frontend-app:latest
   ```

### 多人协作和入职培训

Docker 可以极大地简化新成员入职时的环境配置。对于一个复杂的前端项目，新成员只需获取项目代码并运行 Docker 容器，就可以立即开始开发，无需手动配置繁琐的环境。这有助于提高团队的协作效率，并减少新成员入职时遇到的环境问题。

## Docker 与 CI/CD 的关联

CI/CD 是现代软件开发流程的重要组成部分，Docker 与 CI/CD 的结合提升了整个软件生命周期的效率。

1. Docker 在 CI/CD 中的作用

   - 持续集成（CI）：使用 Docker 提供构建和测试环境，减少环境差异。
   - 持续交付（CD）：组织可发布的产物；持续部署则进一步将通过验证的产物自动上线，是否采用由团队流程决定。

2. 结合方式

   - 在 CI/CD 管道中使用 Docker 构建、测试和部署镜像。
   - 利用 Docker Compose 定义多容器服务的开发和测试环境。
   - 将 Docker 容器推送到镜像仓库后，通过 CD 工具拉取并部署到生产环境。

3. CI/CD 工具支持 Docker

   - Jenkins: 支持 Docker 镜像的构建与部署。
   - GitLab CI/CD: 原生支持 Docker Executor。
   - GitHub Actions: 提供支持 Docker 的工作流定义。
   - CircleCI: 支持通过 Docker 容器运行管道。

示例 CI/CD Pipeline 配置

以下是一个使用 Docker 的 CI/CD 示例：

GitLab CI/CD 配置（.gitlab-ci.yml）
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

此示例在同一个 job 中构建并推送镜像，使用上面的多阶段 Dockerfile 完成前端构建。不同 job 的 Docker daemon 通常互相隔离，镜像不会自动共享。Docker-in-Docker 需要 Runner 管理员配置相应权限和 TLS 证书共享卷，具体要求见 [GitLab Docker-in-Docker 文档](https://docs.gitlab.com/ci/docker/using_docker_build/#use-docker-in-docker)。推送镜像后，实际服务器的拉取和发布仍需单独配置。

## 帮助链接

- [Docker 官方文档](https://docs.docker.com/)
- [Dockerfile 参考文档](https://docs.docker.com/engine/reference/builder/)
- [GitLab CI/CD 官方文档](https://docs.gitlab.com/ee/ci/)
- [Kubernetes 入门教程](https://kubernetes.io/zh/docs/tutorials/)
- [Docker Compose 官方文档](https://docs.docker.com/compose/)

