---
title: "Docker 的使用"
description: "Docker 是一个开源的容器化平台，可以让你创建、部署和运行应用程序的容器。容器是一种轻量级、可移植的虚拟化方式，它可以打包应用程序及其依赖环境，确保无论在任何环境中都能一致地运行"
sidebar:
  order: 1
---


Docker 是一个开源的容器化平台，可以让你创建、部署和运行应用程序的容器。容器是一种轻量级、可移植的虚拟化方式，它可以打包应用程序及其依赖环境，确保无论在任何环境中都能一致地运行。对于前端开发者来说，Docker 提供了很多便利，帮助我们简化开发环境的搭建，并确保团队成员之间的一致性。

> [Docker 官网](https://www.docker.com/) 提供了详细的介绍和文档，可以帮助你快速了解 Docker 的基础概念。

## Docker 基本概念

Docker 是一种虚拟化工具，它通过使用容器来实现应用程序的打包和隔离，从而使开发、测试、部署变得更加便捷。以下是 Docker 的一些基本概念：

- **镜像（Image）**：镜像是一个只读的模板，用于创建 Docker 容器。它包含应用程序运行所需的所有内容，如代码、运行时、库等。
- **容器（Container）**：容器是镜像的运行实例，可以看作是一个轻量级的沙盒环境，确保应用可以在独立的环境中运行。
- **Dockerfile**：Dockerfile 是用于定义镜像内容的脚本文件，它描述了如何构建镜像。


### Docker 的优势

	•	轻量级: 使用共享的主机内核，容器启动速度快，占用资源少。
	•	可移植性: 容器运行环境一致，“在开发环境能跑，在生产环境也能跑”。
	•	隔离性: 每个容器彼此隔离，减少环境冲突。
	•	快速部署: 开发、测试、生产使用相同的镜像，提升部署效率。

### Docker 安装
要开始使用 Docker，可以先安装 Docker，以下是安装 Docker 的一些链接：

- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker on Linux](https://docs.docker.com/engine/install/)

> 由于 Docker 应用非常广泛, 也出现了很多替代品(通常有更好的性能或者更多的功能)，其中 [OrbStack](https://orbstack.dev/) 是最近比较流行的一个高性能的 Docker GUI 工具，可以尝试使用。


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

**示例**：

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
      - "5432:5432"
```

本例前端采用 Vite 默认端口与 npm 锁文件，`my-backend:latest` 需要替换为实际的后端镜像。通过 Docker Compose，你可以同时启动前端、后端和数据库服务，模拟完整的开发环境，极大地提高开发效率。

### 前端构建与测试

Docker 也可以用来运行前端项目的构建和测试任务。通过在 Docker 容器中运行构建任务，可以确保构建过程中的环境一致性，避免由于开发者本地环境的差异导致的构建失败。

**示例**：

```sh
docker run --rm -v "$PWD":/app -v /app/node_modules -w /app node:24 sh -c "npm ci && npm run build"
```

这条命令将使用 Node.js 24 的镜像，根据已提交的 `package-lock.json` 安装依赖后构建。匿名卷隔离容器与宿主机的 `node_modules`，避免复用不同平台的原生依赖。pnpm 项目应使用项目指定的 pnpm 版本与 `--frozen-lockfile`。

### 前端部署

Docker 可以用于前端应用的部署，通过将前端应用打包为 Docker 镜像，开发者可以轻松地在任何服务器上部署和运行前端应用。这确保了在不同环境中的一致性，并减少了由于环境差异而导致的问题。以下是使用 Docker 部署前端应用的一个简单流程：

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

	•	持续集成（CI）: 使用 Docker 提供统一的构建和测试环境，减少因环境差异导致的问题。
	•	持续交付（CD）: 使用 Docker 容器化应用，并通过容器编排工具（如 Kubernetes）实现自动化部署。

2. 结合方式

	•	在 CI/CD 管道中使用 Docker 构建、测试和部署镜像。
	•	利用 Docker Compose 定义多容器服务的开发和测试环境。
	•	将 Docker 容器推送到镜像仓库后，通过 CD 工具拉取并部署到生产环境。

3. CI/CD 工具支持 Docker

	•	Jenkins: 支持 Docker 镜像的构建与部署。
	•	GitLab CI/CD: 原生支持 Docker Executor。
	•	GitHub Actions: 提供支持 Docker 的工作流定义。
	•	CircleCI: 支持通过 Docker 容器运行管道。

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

