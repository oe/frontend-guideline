---
title: "基于 Gitlab 的研发自动化体系"
description: "已有 GitLab 团队如何配置项目、Runner、构建与 Pages 发布，并给出自托管的前提、凭据管理和流水线排错方法。"
sidebar:
  order: 3
---

**个人项目和没有运维需求的小团队，本书优先推荐 GitHub + Actions；公司已有 GitLab，就把它的 MR、Runner 和发布链路用好。** 不要为了几个前端仓库先给自己增加一台必须持续升级和备份的服务器。

<small>这是按维护成本给出的个人建议。有内网、数据管理或统一身份需求的团队，自托管 GitLab 可能很合适。</small>

这篇的目标是跑通一条链路：提交分支 → MR 自动验证 → 合并默认分支 → 发布已验证的产物。先把这条链路做实，再谈更多平台集成。

## GitLab 的核心功能

前端团队先使用四项就够：仓库、Merge Request、流水线和产物。Issue 管需求，MR 看差异，CI 验证，部署任务发布。把发布结果和提交关联起来，出错知道回退哪一版。

## GitLab 的安装与推荐服务器配置

### 安装 GitLab

**只想试 CI，不必安装 GitLab 服务端。** 使用团队已有实例或 GitLab.com 项目即可。确实需要自托管，再准备受支持系统、域名、HTTPS、备份存储与升级窗口。

Ubuntu/Debian 的 EE Linux package 示例：

```sh
sudo apt-get update
sudo apt-get install -y curl openssh-server ca-certificates
curl -fsSL --output gitlab-repository.sh https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.deb.sh
# 查看脚本与适用系统后，添加软件源。
sudo bash gitlab-repository.sh
# 替换成自己已经配置 DNS 的实际域名，并完成 HTTPS 配置。
sudo EXTERNAL_URL="https://gitlab.example.com" apt-get install gitlab-ee
sudo gitlab-ctl reconfigure
```

EE 安装包可在没有付费许可证时使用 Free 层功能，别把安装包名称和订阅混为一谈。首次管理员登录、证书与系统支持按[官方安装指南](https://about.gitlab.com/install/)完成；示例中的域名不能直接当作自己的生产地址。

### 推荐的服务器配置

先按[官方资源要求](https://docs.gitlab.com/install/requirements/)预算：当前单节点基准是 8 vCPU、16GB 内存，不再推荐把「随便一台 4GB 小机器」当公司正式代码平台。磁盘单独给 Git 历史、镜像、产物、日志与备份留空间。

**GitLab 主服务和 CI Runner 分开。** 构建突然吃满 CPU、内存或磁盘时，不应顺手把全公司的代码平台一起拖慢。上线前至少做一次备份恢复演练，确认代码与配置能恢复，不能只确认「备份命令成功」。

## 如何使用 GitLab 搭建代码托管系统

### 创建项目

按团队建立 Group，再建 Private 项目，把 README、锁文件和 Node 版本文件提交进去。开发者先从分支提 MR，不直接向默认分支推送。

### 代码管理与权限配置

默认分支设置保护，限制直接推送；MR 配置必要评审和流水线通过条件。Runner、发布变量和生产环境的访问范围也要对应项目，别把所有成员都设成 Maintainer 来解决权限报错。

## GitLab CI/CD：核心步骤

### 编写 `.gitlab-ci.yml` 文件

先做一个能构建的 job。以下示例要求已有 `package-lock.json`、`test` 与 `build` 脚本，产物目录为 `dist/`：

```yaml
image: node:24

stages:
  - build

build:
  stage: build
  script:
    - npm ci
    - npm test
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 7 days
```

暂时没有测试的项目，先配置真实可执行的验证脚本，再把它设为必需项。不要用 `--if-present` 把本来应该执行的测试悄悄跳过。

本例先把安装、测试、构建放同一个任务，容易看懂也容易排错。需要拆并行任务时，每个 job 都要安装依赖，或者明确传递产物；缓存只是加速下载，不代表前一个 job 的工作目录会自动留给后一个。

### 配置 Runner

先看项目是否已有可用 Runner。没有再按[安装文档](https://docs.gitlab.com/runner/install/)配置主机服务；在项目或组的 Runner 页面创建 Runner，设置标签和访问范围，拿到新的 **runner authentication token** 后注册：

```sh
# RUNNER_TOKEN 来自当前创建流程，通常以 glrt- 开头。
sudo gitlab-runner register --url "https://gitlab.example.com" --token "$RUNNER_TOKEN"
```

选择 **Docker executor** 后，上面 YAML 的 `image: node:24` 才用于 job 容器；Shell executor 跑的是 Runner 主机环境，不会因为写了 `image:` 就自动变成容器。流程细节见 [Runner 创建指南](https://docs.gitlab.com/ci/runners/new_creation_workflow/)。

### 注意事项

提交配置前用 [CI Lint](https://docs.gitlab.com/ci/yaml/lint/)验证；任务 pending 时先看 Runner、标签和保护状态，任务已启动再看脚本日志。不要把两种问题混在一起，反复改 YAML 碰运气。

## 使用 GitLab 实现 CD（持续部署）

### 部署静态网站

普通静态前端默认先用 GitLab Pages，下面是一个**独立的最小流水线**，生产流程再加项目要求的检查与测试：

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

使用当前的 `pages.publish` 指定产物目录。把它并入前面的完整流水线时，在 `stages` 中加入 `deploy`，并让部署依赖通过验证的构建产物，别让检查失败的提交继续发布。菜单中查看 Pages 实际地址，再检查项目路径前缀、HTTPS 和内部页面刷新。

### 使用第三方平台部署全栈应用

先按[部署建议](/frontend-guideline/dev/deploy/)选托管服务。需要发容器时，把构建镜像和部署分开：先推带提交 SHA 的镜像，部署任务再让目标环境运行它；步骤见 [Docker 指南](/frontend-guideline/cicd/docker/#docker-与-cicd-的关联)。

Kubernetes 只在团队已经有集群和维护能力时使用，GitLab 集成选择 [GitLab Agent](https://docs.gitlab.com/user/clusters/agent/)。不要为了上线一个普通前端站点，先搭 GitLab、容器仓库和 K8s 三套平台。

### 发布 NPM 包

GitLab.com 支持的受信流水线优先采用 [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)，在 npm 中配置仓库与 CI 文件身份，通过 OIDC 发布。GitLab 的 ID token audience 需按文档设为 `npm:registry.npmjs.org`；自托管 GitLab / Runner 不要假定自动具备相同支持。

必须使用 Token 的环境，把它设成范围受限、Masked、Protected 的 CI/CD 变量，只给受保护发布任务使用。发布前执行 `npm pack --dry-run` 看清实际包内容，再运行测试、构建和 `npm publish`；不要把源码里的本地配置一起发布。

### 发布客户端应用

构建完成后上传安装包到受控存储，再在 GitLab Release 关联版本、变更说明与附件。Windows/macOS 的签名凭据只交给对应的发布任务，别让普通 MR 构建拿到它们。

## 注意事项与常见问题

| 现象 | 优先排查 |
| --- | --- |
| job 一直 pending | Runner 是否在线、标签是否匹配、是否限制保护分支 |
| `npm ci` 报错 | 锁文件是否同步，Node/npm 版本、私有 registry 认证是否正确 |
| `image` 写了却没有效果 | Runner 是否使用 Shell executor |
| 本地成功、CI 找不到文件 | 大小写、漏提交文件、工作目录与实际产物目录 |
| PR 可以构建，标签发布读不到变量 | 变量和标签的 Protected / Environment scope 是否对应 |
| 部署 job 没拿到 `dist/` | artifacts、`needs` / 下载配置和产物保留期 |
| 服务一跑构建就变慢 | Runner 是否与 GitLab 共用资源，是否并发过高或磁盘已满 |

平台集成只增加当前确实需要的通知。先让失败的构建能被负责人看见，不必把每个仓库事件推到所有聊天群。

## 帮助链接

- [GitLab CI/CD 入门](https://docs.gitlab.com/ci/quick_start/)
- [Runner 安装](https://docs.gitlab.com/runner/install/)
- [Pages 部署](https://docs.gitlab.com/user/project/pages/)
- [CI/CD Variables](https://docs.gitlab.com/ci/variables/)
- [CI Lint](https://docs.gitlab.com/ci/yaml/lint/)
