const userStr = sessionStorage.getItem('prisma_current_user');
const tabs = document.querySelectorAll('.admin-tabs .tab-btn');
const panels = document.querySelectorAll('.admin-panel');
const UserModal = document.getElementById('UserModal');
const closeBtn =  document.getElementById('closeModal');
const addUserBtn = document.getElementById('addUserBtn');
const editUserBtn = document.getElementById('editUserBtn');

const UserId = document.getElementById('userid');
const UserUsername = document.getElementById('username');
const UserEmail = document.getElementById('email');
const UserPower = document.getElementById('power');
const UserName = document.getElementById('name');
const UserJoinDate = document.getElementById('join-date');
const UserBirthTime = document.getElementById('birth-time');
const UserRegion = document.getElementById('region');
const UserJob = document.getElementById('job');
const UserPassword = document.getElementById('password');
const UserTitle = document.getElementById('UserForm-title');
const UserBtn = document.getElementById('UserBtn');

let users = [];
serves = [];
projects = [];

function loadUsersList() {
    axios.get(`${BASE_URL}/User/alluser`)
        .then(response => {
            users = [...response.data];
            renderUsers();
        })
        .catch(error => console.error('Error fetching users:', error));
}

function loadServicesList() {
    axios.get(`${BASE_URL}/Serve/list`)
        .then(response => {
            serves = [...response.data];
            renderServices();
        })
        .catch(error => console.error('Error fetching services:', error));
}

function loadProjectsList() {
    axios.get(`${BASE_URL}/Project/list`)
        .then(response => {
            projects = [...response.data];
            renderProjects();
        })
        .catch(error => console.error('Error fetching projects:', error));
}

// 新增用户功能
function handleAddUser(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/User/manage/adduser`, {
        id: UserId.value,
        userName: UserUsername.value,
        email: UserEmail.value,
        power: UserPower.value,
        name: UserName.value,
        joinDate: UserJoinDate.value,
        birthTime: UserBirthTime.value,
        region: UserRegion.value,
        job: UserJob.value,
        password: UserPassword.value,
    })
    .then(res =>{
        console.log(res.data);
        alert(res.data);
        closeAddUser();
        loadUsersList();
    })
    .catch(err =>{
        console.log(err);
        alert("添加失败");
    })
}

// 编辑用户
function handleEditUser(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/User/manage/updateuser`, {
        id: UserId.value,
        userName: UserUsername.value,
        email: UserEmail.value,
        power: UserPower.value,
        name: UserName.value,
        joinDate: UserJoinDate.value,
        birthTime: UserBirthTime.value,
        region: UserRegion.value,
        job: UserJob.value,
        password: UserPassword.value,
    })
    .then(res =>{
        console.log(res.data);
        alert(res.data);
        closeEditUser();
        loadUsersList();
    })
    .catch(err =>{
        console.log(err);
        alert("编辑失败");
    })
}

//身份验证
function main() {
    if (!userStr) {
        alert('请先登录');
        window.location.href = '../index.html';
        return;
    }
    const user = JSON.parse(userStr);
    // 检查 power 字段是否为 'admin'，如果不是则跳转首页
    if (user.power !== 'admin') {
        alert('无管理员权限');
        window.location.href = './profile.html';
        return;
    }
    // 在页面顶部显示管理员用户名
    document.getElementById('adminName').innerText = user.username;
}

// 渲染用户表格
function renderUsers() {
    const tbody = document.getElementById('userTableBody');
    // 将 users 数组中的每个用户转换为 HTML 表格行
    tbody.innerHTML = users.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.userName}</td>
            <td>${u.email}</td>
            <td>${u.power}</td>
            <td>${u.name}</td>
            <td>${u.joinDate}</td>
            <td>${u.birthTime}</td>
            <td>${u.region}</td>
            <td>${u.job}</td>
            <td>
                <button class="edit-btn" data-id="${u.id}" data-type="user"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${u.id}" data-type="user"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');  // join('') 将数组拼接成一个字符串
}

// 渲染服务表格
function renderServices() {
    const tbody = document.getElementById('serviceTableBody');
    tbody.innerHTML = serves.map(s => `
        <tr>
            <td>${s.serviceId}</td>
            <td>${s.serviceName}</td>
            <td>${s.serviceDesc}</td>
            <td>
                <button class="edit-btn" data-id="${s.id}" data-type="service">编辑</button>
                <button class="delete-btn" data-id="${s.id}" data-type="service">删除</button>
            </td>
        </tr>
    `).join('');
}

// 渲染作品表格
function renderProjects() {
    const tbody = document.getElementById('projectTableBody');
    tbody.innerHTML = projects.map(p => `
        <tr>
            <td>${p.projectId}</td>
            <td>${p.projectName}</td>
            <td>${p.projectDesc}</td>
            <td>
                <button class="edit-btn" data-id="${p.id}" data-type="project">编辑</button>
                <button class="delete-btn" data-id="${p.id}" data-type="project">删除</button>
            </td>
        </tr>
    `).join('');
}

// 显示和隐藏新增弹窗
function openAddUser() {
    if (!UserModal) return;
    UserModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    UserTitle.textContent = '新增用户';
    UserBtn.textContent = '新增用户';
    UserId.disabled = false;  // 新增时允许输入用户ID
    document.getElementById('UserModal').classList.add('active');
}

function closeAddUser() {
    if (!UserModal) return;
    UserModal.style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('UserModal').classList.remove('active');
}

function openEditUser(id) {
    if (!UserModal) return;
    UserModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.getElementById('UserModal').classList.add('active');
    // 根据id查找用户数据
    const user = users.find(u => u.id == id);
    if (user) {
        // 填充表单数据
        UserId.value = user.id;
        UserUsername.value = user.userName;
        UserEmail.value = user.email;
        UserPower.value = user.power;
        UserName.value = user.name;
        UserJoinDate.value = user.joinDate;
        UserBirthTime.value = user.birthTime;
        UserRegion.value = user.region;
        UserJob.value = user.job;
        UserPassword.value = user.password;
    }
    UserTitle.textContent = '编辑用户';
    UserBtn.textContent = '保存修改';
    UserId.disabled = true;  // 编辑时不允许修改用户ID
}

function closeEditUser() {
    if (!UserModal) return;
    UserModal.style.display = 'none';
    document.body.style.overflow = '';
    document.getElementById('UserModal').classList.remove('active');
}

// 编辑和删除功能的实现
function DeleteAndEdit() {
    // 事件委托：监听整个 document.body 上的点击事件
    document.body.addEventListener('click', (e) => {
        // 判断点击的元素是否是我们需要的按钮（.edit-btn 或 .delete-btn）
        const btn = e.target.closest('.edit-btn, .delete-btn');
        if (!btn) return;
        const type = btn.dataset.type;   // 'user', 'service' 或 'work'
        const id = parseInt(btn.dataset.id);
        if (btn.classList.contains('delete-btn')) {
            handleDelete(type, id);
        } else if (btn.classList.contains('edit-btn')) {
            openEditUser(id);
        }
    });
}

// 删除功能
function handleDelete(type, id) {
    if (confirm('确定删除吗？')) {
        if (type === 'user') {
            // 过滤掉 id 匹配的用户，返回新数组
            users = users.filter(u => u.id != id);
        } else if (type === 'service') {
            services = services.filter(s => s.id != id);
        } else if (type === 'project') {
            projects = projects.filter(p => p.id != id);
        }
        // 重新渲染所有表格
        loadUsersList();
        renderServices();
        renderProjects();
    }
}

// 编辑功能
function handleEdit(type, id) {
    let item;
    if (type === 'user') item = users.find(u => u.id == id);
    else if (type === 'service') item = services.find(s => s.id == id);
    else item = projects.find(p => p.id == id);
    if (!item) return;

    // 弹出对话框让用户修改标题/用户名
    const newTitle = prompt('编辑内容（标题/用户名）', item.title || item.username);
    if (newTitle) {
        if (type === 'user') item.username = newTitle;
        else if (type === 'service') item.title = newTitle;
        else item.title = newTitle;
    }
    // 修改描述/邮箱
    const newDesc = prompt('编辑描述/邮箱', item.desc || item.email);
    if (newDesc) {
        if (type === 'user') item.email = newDesc;
        else item.desc = newDesc;
    }
    // 重新渲染
    loadUsersList();
    renderServices();
    renderProjects();
}

// 新增功能
function addBtn() {
    document.getElementById('addServiceBtn').addEventListener('click', () => {
        const title = prompt('服务标题');
        if (title) {
            const newId = services.length + 1;
            services.push({ id: newId, title: title, desc: '新服务描述' });
            renderServices();
        }
    });
    document.getElementById('addWorkBtn').addEventListener('click', () => {
        const title = prompt('作品标题');
        if (title) {
            const newId = works.length + 1;
            works.push({ id: newId, title: title, desc: '新作品描述' });
            renderProjects();
        }
    });
}

// 切换页面功能
function cutPages() {
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;  // 'users', 'services' 或 'works'
            // 切换按钮的 active 样式
            tabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // 隐藏所有面板，再显示对应的面板
            panels.forEach(panel => panel.classList.remove('active'));
            document.getElementById(`${tabId}Panel`).classList.add('active');
        });
    });
}

function initModalClose() {
    // 1. 关闭按钮（事件委托，确保动态元素也能关）
    document.body.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('close-modal')) {
            closeAddUser();
            closeEditUser();
        }
    });
    // 2. 点击模态框背景关闭
    const addModalBg = document.getElementById('addUserModal');
    if (addModalBg) {
        addModalBg.addEventListener('click', (e) => {
            if (e.target === addModalBg) closeAddUser();
        });
    }
    const editModalBg = document.getElementById('editUserModal');
    if (editModalBg) {
        editModalBg.addEventListener('click', (e) => {
            if (e.target === editModalBg) closeEditUser();
        });
    }
}

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', () => {
    main();
    loadUsersList();
    loadServicesList();
    loadProjectsList();
    cutPages();
    document.getElementById('addUserBtn').addEventListener('click', openAddUser);
    DeleteAndEdit();
    initModalClose();
    addUserBtn.addEventListener('submit', handleAddUser);
    editUserBtn.addEventListener('submit', handleEditUser);
});