## 提交代码

`git commit --no-verify -m "XXX"`

项目中存在 pre-commit(客户端)钩子，在提交前会自动进行风格检查。进入项目的.git 文件夹(文件夹默认隐藏,可先设置显示或者命令 ls 查找),再进入 hooks 文件夹,删除 pre-commit 文件,重新 git commit -m 'xxx' git push 即可。问题已经解决！

## 环境准备

可运行的 node 版本：14.15.0

安装依赖 `yarn install`

启动项目 `yarn start`

## 资源管理

七牛云资源公网访问地址 http://r8dp8c34q.hn-bkt.clouddn.com

- 所有的头像资源都是放在七牛云的根路径

- 菜单栏相关的资源是放在七牛云的 DepartmentFD 文件夹下，公网地址`export const qiNiuUrl = 'http://r8dp8c34q.hn-bkt.clouddn.com/DepartmentFD/xxxxxx.docx';`

- 暂时所有的可阅读文件仅支持 docx，后续再支持 pdf 的文件格式

需要替换菜单栏等相关资源的话，只需要在七牛云的管理后台中替换即可。
