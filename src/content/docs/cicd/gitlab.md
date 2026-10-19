---
title: "基于 Gitlab 的研发自动化体系"
description: "GitLab 是一个功能强大的 DevOps 平台，集代码托管、持续集成、持续部署（CI/CD）以及项目管理于一体"
sidebar:
  order: 3
---

GitLab 是一个功能强大的 DevOps 平台，集代码托管、持续集成、持续部署（CI/CD）以及项目管理于一体。通过 GitLab，企业可以搭建自己的内部代码托管和研发自动化体系，实现从代码管理到部署的一站式流程。本篇文章将介绍如何使用 GitLab 搭建公司内部的代码托管和研发自动化体系，着重介绍其功能点和核心操作步骤。

## GitLab 的核心功能

GitLab 提供了以下核心功能，可以帮助企业实现全面的研发自动化：

* 代码托管：提供了 Git 仓库管理，可以管理代码版本、权限、分支等。
* CI/CD 管道：通过 GitLab CI/CD，可以实现从代码提交到测试、构建和部署的自动化流程。
* Issue 和项目管理：支持项目管理、任务分配、Milestones 等功能。
* 代码审查：支持合并请求（Merge Requests）和代码审查（Code Review）。

了解更多可以访问 [GitLab 官方文档](https://docs.gitlab.com/)。

## GitLab 的安装与推荐服务器配置

在公司内部搭建 GitLab 需要一些服务器资源，以保证其能够稳定、高效地运行。以下是 GitLab 的安装步骤及推荐服务器配置：

### 安装 GitLab

GitLab 提供 Community Edition（CE）与 Enterprise Edition（EE）发行版。EE 也可以在未启用付费许可证时使用 Free 层功能，不能把“EE 安装包”直接等同于“必须付费”；高级功能是否需要订阅以当前产品层级为准。

下面使用 Ubuntu/Debian 上的 EE Linux package 说明基本流程。安装前需确认受支持系统、域名、资源与邮件等要求，正式部署还要安排 HTTPS、备份和版本升级。

1. **安装依赖项**：确保你的服务器安装了必要的依赖项（例如 `curl`、`openssh-server` 和 `ca-certificates`）。
   ```sh
   sudo apt-get update
   sudo apt-get install -y curl openssh-server ca-certificates
   ```

2. **添加 GitLab 仓库并安装 GitLab**：
   ```sh
   curl -fsSL --output gitlab-repository.sh https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh
   # 先阅读下载的脚本，确认适用于当前系统，再执行。
   sudo bash gitlab-repository.sh
   sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ee
   ```
   请将 `https://gitlab.example.com` 替换为已配置 DNS 的实际域名，并按官方说明配置可用证书。示例命令有系统修改权限，执行前应确认适用于自己的系统和 GitLab 版本。

3. **配置和启动 GitLab**：
   安装完成后，运行以下命令来启动 GitLab 并应用初始配置：
   ```sh
   sudo gitlab-ctl reconfigure
   ```

> 详细的安装说明可以参考 [GitLab 安装指南](https://about.gitlab.com/install/)。

### 推荐的服务器配置

GitLab 的资源要求与用户数、仓库规模、功能和负载有关，不能用固定的“4GB 内存即可”概括。当前[安装要求](https://docs.gitlab.com/install/requirements/)将单节点的基准列为 8 vCPU、16GB 内存，资源受限的部署有专门的调整要求；这些数值会随版本变化，安装时应重新核对。

存储还要为 Git 历史、LFS、容器镜像、产物、日志与备份预留空间。CI Runner 通常应单独评估构建负载，避免直接把所有构建任务叠加到 GitLab 主服务上。

## 如何使用 GitLab 搭建代码托管系统

### 创建项目

1. **创建新项目**：进入 GitLab 的主界面后，点击 "New Project" 按钮。
2. **初始化项目**：可以从零创建一个空项目，也可以导入现有的 Git 项目。
3. **设置权限**：可以对项目的可见性进行设置（Public、Internal、Private），并为团队成员设置不同的权限（例如，开发者、维护者等）。

### 代码管理与权限配置

- **分支管理**：通过 GitLab 的分支保护功能，可以限制谁可以推送到某些分支，防止误操作。
- **用户角色配置**：为不同的用户分配合适的权限，例如开发人员只可以向特定分支提交代码，而维护者可以批准合并请求。

## GitLab CI/CD：核心步骤



GitLab CI/CD 是 GitLab 的一项强大功能，允许你定义一套自动化的管道来完成代码的测试、构建和部署。下面介绍如何配置 GitLab CI/CD。

### 编写 `.gitlab-ci.yml` 文件

GitLab CI/CD 的配置是通过项目根目录中的 `.gitlab-ci.yml` 文件完成的。以下是一个简单的前端项目 CI 配置示例：

```yaml
image: node:24

stages:
  - build

build:
  stage: build
  script:
    - npm ci
    - npm test --if-present
    - npm run build
  artifacts:
    paths:
      - dist/
```

本例假设 npm 项目已提交 `package-lock.json`，产物输出到 `dist/`。GitLab 的不同 job 通常使用独立环境，不能假定前一个 job 的 `node_modules` 会自动保留；拆分任务时应在每个任务安装依赖，或显式传递所需产物。

### 配置 Runner

Runner 执行 CI/CD job，可以使用平台提供的 Runner，也可以按[官方安装说明](https://docs.gitlab.com/runner/install/)配置自己的 Runner。安装二进制还不足以完成服务、用户和执行器配置，应按操作系统对应步骤安装。

当前推荐先在项目或组的 Runner 管理界面创建 Runner，设置标签和访问范围，再使用生成的 **runner authentication token**（通常以 `glrt-` 开头）注册。旧式 registration token 流程已不再推荐，不能直接沿用旧教程。

```sh
# RUNNER_TOKEN 由当前 Runner 创建流程提供，域名替换为实际 GitLab 地址。
sudo gitlab-runner register --url "https://gitlab.example.com" --token "$RUNNER_TOKEN"
```

随后按提示选择执行器。使用 Docker 执行器时，`.gitlab-ci.yml` 中的 `image:` 才会决定 job 容器；Shell 执行器则使用 Runner 主机环境。不要向不受信项目共享可访问生产凭据或 Docker daemon 的 Runner。

参考 [Runner 创建流程](https://docs.gitlab.com/ci/runners/new_creation_workflow/)。

### 注意事项

1. **权限和安全性**：在 `.gitlab-ci.yml` 文件中，不要将敏感信息硬编码，可以使用 GitLab 的 CI/CD Variables 功能来存储 Token、密钥等敏感信息。
2. **缓存与并行**：利用 GitLab 的缓存功能可以加速构建过程；并行执行可以提高效率，但需要合理设置并发任务数以避免资源竞争。

## 使用 GitLab 实现 CD（持续部署）

### 部署静态网站

GitLab Pages 可以用来发布静态网站，类似于 GitHub Pages。

1. **添加 `.gitlab-ci.yml` 配置**：以下是一个用于部署静态网站的示例：
   ```yaml
   image: node:24

   deploy-pages:
     stage: deploy
     script:
       - npm ci
       - npm run build
     pages:
       publish: dist
     rules:
       - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
   ```

   本例使用当前 GitLab Pages 的 `pages.publish` 配置，默认阶段包含 `deploy`；如果合并到自定义流水线，需要在 `stages` 中声明该阶段。旧版自托管 GitLab 请按对应版本文档调整。

2. **查看部署结果**：在项目的 Pages 管理页面查看部署地址；菜单位置随 GitLab 版本变化。项目站点的路径前缀还需与前端构建配置一致。

### 使用第三方平台部署全栈应用

如果你需要部署带有后台服务的应用，可以使用以下第三方平台：

- **Heroku**：[Heroku](https://www.heroku.com/) 提供简单的 Git 集成，适合小规模项目的托管。Heroku 已取消旧版免费 dyno 方案，使用前请查看当前价格。
- **DigitalOcean**：[DigitalOcean](https://www.digitalocean.com/) 提供易用的 Droplet 服务，可以用来部署完整的后端服务。收费按使用量计算，新用户有免费的初始额度。
- **Kubernetes 集群部署**：有集群运维需求时可使用 [GitLab Agent for Kubernetes](https://docs.gitlab.com/user/clusters/agent/)；旧的基于证书的集群集成教程不适用于当前方案。

### 发布 NPM 包

GitLab 还可以集成发布 NPM 包的流程：

1. **设置 NPM Token**：在 GitLab CI/CD Variables 中添加 `NPM_TOKEN`。
2. **配置 `.gitlab-ci.yml` 文件**：
   ```yaml
   image: node:24

   publish:
     stage: deploy
     script:
       - npm ci
       - npm config set '//registry.npmjs.org/:_authToken' "$NPM_TOKEN"
       - npm publish
     only:
       - tags
     # NPM_TOKEN 在受保护的 CI/CD Variables 中设置，并限制发布权限。
   ```

应根据 npm 当前策略配置 Token 的有效期与发布权限，也可评估 [trusted publishing](https://docs.npmjs.com/trusted-publishers/)。标签和变量均应受保护。

### 发布客户端应用

你可以利用 GitLab Releases 功能，将构建好的应用程序发布为 Release，并附带安装包（如 `.exe` 或 `.dmg` 文件）。

- **创建 Release**：可以在 GitLab 的项目界面通过 Tags 创建 Release，也可以通过 GitLab CI 自动化创建。
- **上传附件**：可以使用 GitLab API 或者在 CI 中使用相应的命令来上传附件。

### 第三方 CI/CD 集成
虽然 GitLab 提供了内置的 CI/CD，但你也可以选择使用第三方 CI/CD 工具，例如：

- **Jenkins**：可以通过 GitLab Webhook 来集成 Jenkins，以实现更加复杂的流水线管理。
- **CircleCI**：支持与 GitLab 的集成，可以作为 GitLab 内置 CI/CD 的替代方案。

使用外部 CI 前核对它当前支持的代码托管平台、触发方式与套餐，不应假定所有服务都直接支持 GitLab。

这些第三方 CI/CD 工具适用于当 GitLab 内置 CI/CD 的功能或并发不满足团队需求时，提供更多的选择。

### 用户权限管理与登录集成
GitLab 支持与第三方身份认证系统集成，如 LDAP 和 Active Directory。通过这种方式，可以实现公司内部统一的用户权限管理，简化用户管理和权限分配。

- **LDAP 集成**：可以通过 GitLab 配置 LDAP，直接使用公司已有的用户目录进行认证。
- **OAuth 集成**：GitLab 也支持通过 OAuth 进行第三方登录，比如 Google、GitHub 等，使用户可以使用已有账号登录。

### OAuth 授权
GitLab 允许通过 OAuth 来授权其他应用访问 GitLab 数据，这对于集成其他第三方应用非常有用。例如，可以通过 OAuth 让 Jenkins、Jira 等工具访问 GitLab 仓库中的代码，实现跨平台的自动化管理。

### 与办公软件的集成
GitLab 还支持与常见办公软件的集成，例如：

- **Slack 集成**：可以通过 Webhook 将 GitLab 的事件通知推送到 Slack 中，方便团队在 Slack 中实时查看项目的更新，例如代码提交、合并请求等。
- **Microsoft Teams 集成**：类似于 Slack，可以将 GitLab 的通知集成到 Microsoft Teams，帮助团队实时了解项目的动态。

### 其他自动化集成
- **Jira 集成**：GitLab 可以与 Jira 集成，通过设置 Webhook，可以在 GitLab 中更新代码状态的同时，自动更新对应的 Jira 任务状态。
- **Trello 集成**：通过 GitLab Webhook，可以在 Trello 中创建卡片，帮助团队在代码更新时同步项目任务状态。


## 注意事项与常见问题
在配置和使用 GitLab CI/CD 时，以下是一些常见的注意事项和容易犯的错误，帮助你减少在配置过程中的问题：

1. **YAML 格式错误**：`.gitlab-ci.yml` 文件的格式非常严格，缩进错误或语法不正确都会导致 CI 任务失败。应先检查 YAML 语法，再用 GitLab 自带的 [CI Lint](https://docs.gitlab.com/ci/yaml/lint/) 验证 CI 配置；一般 YAML 校验器无法判断 GitLab 的关键字、规则和 include 是否正确。
2. **Runner 配置问题**：如果 Runner 没有正确配置或权限不足，可能会导致 CI/CD 任务无法正常执行。确保 Runner 被正确注册，并为项目或组分配了合适的权限。
3. **CI/CD 变量管理**：避免在 `.gitlab-ci.yml` 中直接暴露敏感信息。可以通过 GitLab 的 CI/CD Variables 功能来管理敏感数据，并确保这些变量的权限设置正确，防止泄露。
4. **缓存与并行执行**：在配置缓存时，要特别注意缓存的键名是否唯一，以防止不同任务之间的缓存冲突。另外，在设置并行执行时，应确保并发任务不会导致资源竞争（如同一数据库的并发写入）。
5. **镜像拉取超时**：在使用 Docker 镜像时，拉取公共镜像可能会因为网络问题而超时。可以考虑使用私有镜像仓库或 GitLab 容器注册表，确保镜像的稳定性。
6. **构建日志过大**：在 CI/CD 任务中，如果输出日志过大，GitLab 可能会截断日志并导致任务失败。可以在脚本中通过减少不必要的输出或将部分日志重定向到文件来优化。

## 帮助链接

以下是一些有助于你进一步了解 GitLab 及其相关工具的链接：

1. [GitLab 官方文档](https://docs.gitlab.com/): 提供 GitLab 所有功能的详细文档和教程。
2. [GitLab CI/CD 入门](https://docs.gitlab.com/ci/quick_start/): 介绍如何快速上手配置 GitLab CI/CD。
3. [GitLab Runner 安装与配置](https://docs.gitlab.com/runner/install/): 关于如何安装和配置 GitLab Runner 的详细步骤。
4. [GitLab Pages 部署指南](https://docs.gitlab.com/user/project/pages/): 教你如何使用 GitLab Pages 发布静态网站。
5. [GitLab CI/CD Variables 使用](https://docs.gitlab.com/ci/variables/): 关于如何在 CI/CD 中安全管理变量和密钥的指南。
6. [GitLab CI Lint](https://docs.gitlab.com/ci/yaml/lint/): 验证 GitLab CI 配置，使用前先检查配置中是否包含敏感信息。


## 结论

通过 GitLab，企业可以轻松地搭建一个全面的研发自动化体系，包括代码托管、持续集成、持续部署和版本管理等。无论是简单的静态网站部署还是复杂的全栈应用发布，GitLab 都提供了强大且灵活的工具链。同时，通过结合第三方工具，企业可以根据自身需求定制研发流程，提高整体开发效率。希望本篇文章能够帮助你更好地理解和应用 GitLab 来搭建公司内部的研发自动化体系。
