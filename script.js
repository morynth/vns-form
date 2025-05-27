const form = document.getElementById('form');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const company = document.getElementById('company');
const author = document.getElementById('author');

const downloads = document.getElementById("downloads");
const submit_btn = document.getElementById("submit_btn");
const save_btn = document.getElementById("save_btn");
const hidden_tags = document.getElementById("hidden_tags");
const tagInput = document.getElementById('tag-input');
const tagContent = document.getElementById('tag-list');

let tags = [];  // 用于存储标签


function serialForm() {
    const formData = new FormData(form);

    const title = formData.get("title");
    const cover = formData.get("cover");
    const company = formData.get("company");
    const author = formData.get("author");
    const platforms = tags;
    const providers = formData.getAll("provider");
    const urls = formData.getAll("url");

    const downloads = providers.map((provider, index) => ({
        provider,
        url: urls[index],
    }));

    const result = {
        title,
        cover,
        company,
        author,
        platforms,
        downloads,
    };
    return JSON.stringify(result, null, 2);
}

function addTag(tagText) {
    if (tagText && !tags.includes(tagText)) {
        tags.push(tagText);

        // 创建标签元素
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.textContent = tagText;

        // 创建删除按钮
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '×';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => removeTag(tagText, tagElement);

        // 将删除按钮添加到标签中
        tagElement.appendChild(deleteBtn);

        // 将标签添加到tag-list容器
        tagContent.appendChild(tagElement);

        // 清空输入框
        tagInput.value = '';
    }
}

function removeTag(tagText, tagElement) {
    tags = tags.filter(tag => tag !== tagText);
    tagContent.removeChild(tagElement);
}

tagInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {  // 按回车键时添加标签
        event.preventDefault();  // 防止回车后输入框换行
        addTag(tagInput.value.trim());
    } else if (event.key === 'Backspace' && tagInput.value === '') {  // 按退格键时删除最后一个标签
        if (tags.length > 0) {
            const lastTagText = tags[tags.length - 1];
            const lastTagElement = tagContent.querySelector(`.tag:contains("${lastTagText}")`);
            removeTag(lastTagText, lastTagElement);
        }
    }
});

save_btn.addEventListener("click", () => {
    const formData = serialForm();

    const blob = new Blob([formData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // const zip = new JSZip();
    // zip.file("data.json", jsonBlob);

    // const coversFolder = zip.folder("covers");
    // if (data.covers.length > 0) {
    //   Promise.all(
    //     data.covers.map((cover, index) => {
    //       // 处理Base64数据
    //       const [metaInfo, base64Data] = cover.url.split(",");
    //       if (!base64Data) {
    //         console.warn(`图片${index}数据异常，已跳过`);
    //         return;
    //       }

    //       // 生成安全文件名
    //       const filename = cover.originalName;

    //       // 添加图片到压缩包
    //       coversFolder.file(filename, base64Data, {
    //         base64: true,
    //         createFolders: false,
    //       });
    //     })
    //   );
    // }

    // zip
    //   .generateAsync({ type: "blob" })
    //   .then((blob) => {
    //     const downloadUrl = URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = downloadUrl;
    //     link.download = generateUUIDv4() + ".zip";

    //     document.body.appendChild(link);
    //     link.click();

    //     document.body.removeChild(link);
    //     URL.revokeObjectURL(downloadUrl);
    //   })
    //   .catch((error) => {
    //     console.error("ZIP打包失败:", error);
    //   });
});


function generateUUIDv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}



function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkURL(input) {
    const re = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\.[a-zA-Z]{2})?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;%=]*)?$/;
    if (re.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'URL 格式错误');
    }
}


function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        const titleContent = document.getElementById(`${input.id}-label`).textContent;
        if (input.value.trim() === '') {
            showError(input, `${titleContent}是必填项`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}

function checkLength(input, name, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${name} 必须至少 ${min} 个字符`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${name} 最多 ${max} 个字符`
        );
    } else {
        showSuccess(input);
    }
}


function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!checkRequired([title, cover, company, author])) {
        checkLength(title, '游戏标题', 2, 20);
        checkLength(company, '开发商', 2, 20);
        checkLength(author, '发表者', 2, 15);
        checkURL(cover);
    }

    const formData = serialForm();

    console.log(formData);
    if (form.querySelectorAll('.error').length === 0) {
        fetch("http://foo.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("成功:", data);
            })
            .catch((error) => {
                console.error("错误:", error);
            });
    }




});

function addRow() {
    const tbody = document.querySelector('#dataTable tbody');
    const row = document.createElement('tr');

    // 创建提供方单元格
    const providerCell = document.createElement('td');
    const providerInput = document.createElement('input');
    providerInput.type = 'text';
    providerInput.name = 'provider';
    providerInput.placeholder = '请输入提供方名称';
    providerInput.required = true;
    providerCell.appendChild(providerInput);

    // 创建URL单元格
    const urlCell = document.createElement('td');
    const urlInput = document.createElement('input');
    urlInput.type = 'url';
    urlInput.name = 'url';
    urlInput.placeholder = '请输入下载链接';
    urlInput.required = true;
    urlCell.appendChild(urlInput);

    // 创建操作单元格
    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.onclick = () => row.remove();
    actionCell.appendChild(deleteBtn);

    // 组装行
    row.appendChild(providerCell);
    row.appendChild(urlCell);
    row.appendChild(actionCell);
    tbody.appendChild(row);
}
