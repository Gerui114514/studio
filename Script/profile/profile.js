const BASE_URL = "http://localhost:8082";

const userStr = sessionStorage.getItem('prisma_current_user');
const editUsername = document.getElementById('editUsername');
const editEmail = document.getElementById('editEmail');
const editName = document.getElementById('editName');
const editJoindate = document.getElementById('editJoindate');
const editRegion = document.getElementById('editRegion');
const editJob = document.getElementById('editJob');
const editBtn = document.getElementById('Btn');

let indvidualprojectlist = [];

function loadIndvidualProjectList() {
    axios.get(`${BASE_URL}/Project/indviduallist`, {
        params: {
            id: userStr.id
        }
    })
    .then(res =>{
        indvidualprojectlist = res.data;
        renderIndvidualProjectList();
    })
    .catch(error =>{
        console.log(error);
    });
}

// ----- 1. 获取当前登录用户信息（从 sessionStorage）-----
function main() {
    if (!userStr) {
        alert('请先登录');
        window.location.href = '../index.html';  // 跳转到主页面
        return;  // 停止执行后续代码
    } else {
        // 将存储的 JSON 字符串解析为 JavaScript 对象
        const user = JSON.parse(userStr);
        console.log(user);
        document.getElementById('profileUsername').innerText = user.username;
        document.getElementById('editUsername').value = user.username;
        document.getElementById('editEmail').value = user.email || '';
        document.getElementById('editName').value = user.name || '';
        document.getElementById('editJoindate').value = user.joindate || '';
        document.getElementById('editRegion').value = user.region || '';
        document.getElementById('editJob').value = user.job || '';
        if (user.power !== 'admin') {
            document.getElementById('admin-btn').style.display = 'none'
        }
        uploadAvatar();
        saveNewEmail();
        viewAllProjects();
        loadIndvidualProjectList();
    }
}



// ----- 保存个人信息（修改邮箱等）-----
function saveNewEmail() {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();  // 阻止表单默认的页面刷新行为



    });
}

// ----- 4. 查看全部项目（演示）-----
function viewAllProjects() {
    viewAllBtn.addEventListener('click', () => {
        alert('项目详情页开发中...');
    });
}

// ----- 5. 个人项目列表的渲染 -----
function renderIndvidualProjectList() {
    if (!indvidualprojectlist) {
        ProjectsList = "暂无负责的项目"
        viewAllBtn.style.display = 'none';
        return;
    } else{
        ProjectsList.innerHTML = indvidualprojectlist.map(item =>`
            <div class="project-item">${item.projectName} <span>${item.state}</span></div>
            `).join('');
    }
}
// 等待页面所有 DOM 元素加载完成后执行
document.addEventListener('DOMContentLoaded', main);