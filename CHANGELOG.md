## 调整表单提交对象，新增保存、重置按钮，新增联系方式

##### 05/21/2025

### 新增

- 保存按钮
  - 点击按钮，将表单数据（包括图片）打包下载。
- 重置按钮
  - 点击按钮，重置表单数据
- 联系方式
  - 新增各社区平台联系方式的链接

### 优化

- 表单提交对象
  - 之前的层级结构与命名不合理，现已调整为如下格式：

```json
{
  "gal_names": {
    "jp": "",
    "en": "",
    "zh_cn": "",
    "zh_tw": "",
    "alias": ""
  },
  "intro": {
    "zh_cn": "",
    "jp": "",
    "en": "",
    "zh_tw": ""
  },
  "developers": [""],
  "tags": [],
  "submit": false,
  "reset": false,
  "save_local": true,
  "check_nsfw": false,
  "covers": []
}
```

## 初始化工作

#### 05/19/2025
