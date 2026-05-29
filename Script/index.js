const BASE_URL = "http://localhost:8082";

const serviceList = document.getElementById('services-grid');
const projectList = document.getElementById('works-grid');

let projects = [];
let serves = [];
// let users = [];

function loadProjects() {
    axios.get(`${BASE_URL}/Project/list`)
        .then(responseprojects => {
            projects = [
                ...responseprojects.data
            ]
            renderProjects();
        })
        .catch(error => {
            console.error('加载项目失败:', error);
        });
}

function loadServes() {
    axios.get(`${BASE_URL}/Serve/list`)
        .then(responseserves => {
            serves = [
                ...responseserves.data
            ]
            renderServices();
        })
        .catch(error => {
            console.error('加载服务失败:', error);
        });
}

function addContact(contactData) {
    axios.post(`${BASE_URL}/Contact/add`,contactData)
    .then(res => {
        console.log(res.data);
        alert(res.data);
    })
    .catch(error =>{
        console.log(error)
    });
}

// function getUsers() {
//     axios.get(`${BASE_URL}/User/alluser`)
//         .then(responseusers => {
//             users = [
//                 ...responseusers.data
//             ]
//             renderUsers();
//         })
//         .catch(error => {
//             console.error('加载用户失败:', error);
//         });
// }
// ==================== 认证状态 ====================
let currentUser = [];     // 存储当前登录的用户对象（包含用户名、邮箱、角色）
// ==================== 辅助函数 ====================
// 登录成功后调用此函数，保存用户信息到内存和 sessionStorage
function setLoggedInUser(user) {
    currentUser = user;
    sessionStorage.setItem('prisma_current_user', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        power: user.power,
        joindate: user.joindate.split('T')[0],  // 只保留日期部分
        region: user.region,
        job: user.job
    }));
    renderAuthArea();
}
// 退出登录：清空内存和 sessionStorage 中的用户信息
function logout() {
    currentUser = null;
    sessionStorage.removeItem('prisma_current_user');
    renderAuthArea();
}
// 页面加载时检查 sessionStorage 中是否有已登录的用户信息，用于恢复登录状态
function checkSession() {
    const saved = sessionStorage.getItem('prisma_current_user');
    if (saved) {
        try {
            const userData = JSON.parse(saved);
            currentUser = {
                username: userData.username,
                email: userData.email,
                powe: userData.power || 'user'
            };
        } catch (e) {
            console.error('解析会话数据失败', e);
            currentUser = null;
        }
    } else {
        currentUser = null;
    }
    renderAuthArea();
}
// 这个函数会动态修改导航栏中 id="auth-area" 的 HTML 内容
// 渲染导航栏认证区域（登录按钮或用户下拉菜单）
function renderAuthArea() {
    const authContainer = document.getElementById('auth-area');
    if (!authContainer) return;     // 如果找不到容器则退出

    if (currentUser) {
        // 管理员才显示管理后台链接
        // 已登录状态：显示用户头像、用户名和下拉菜单
        let adminLink = '';
        // 如果当前用户角色是 admin（管理员），则在下拉菜单中添加“管理后台”链接
        if (currentUser.power === 'admin') {
            adminLink = `<a href="./Pages/admin.html"><i class="fas fa-tachometer-alt"></i> 管理后台</a><hr>`;
        }

        authContainer.innerHTML = `
            <div class="user-menu">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                    <span>${escapeHtml(currentUser.username)}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="dropdown-menu">
                    <a href="./Pages/profile.html"><i class="fas fa-id-card"></i> 个人空间</a>
                    ${adminLink}
                    <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> 退出登录</a>
                </div>
            </div>
        `;

        // 绑定退出按钮的点击事件，点击后调用 logout 函数退出登录
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();     // 绑定退出按钮的点击事件
                logout();       // 执行退出登录
            });
        }
    } else {
        // 未登录：显示登录|注册按钮
        authContainer.innerHTML = `<a href="#" id="loginRegisterBtn">登录 | 注册</a>`;
        const loginBtn = document.getElementById('loginRegisterBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openAuthModal();   // 假设已有打开模态框的函数
            });
        }
    }
}

// 将字符串中的特殊字符转义，防止恶意脚本注入
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ==================== 模态框控制 ====================
// 获取模态框 DOM 元素
const modal = document.getElementById('authModal');

// 打开模态框
function openAuthModal() {
    if (!modal) return;
    modal.style.display = 'flex';       // 显示模态框
    document.body.style.overflow = 'hidden';     // 显示模态框
    switchTab('login');     // 默认显示登录标签页
    clearErrors();     // 清空之前显示的错误信息
}

// 关闭模态框
function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';     // 恢复页面滚动
}
// 切换登录/注册标签页
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    // 更新标签按钮的样式（高亮当前激活的标签）
    tabs.forEach(btn => {
        if (btn.dataset.tab === tab) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    // 显示对应的表单，隐藏另一个表单，同时清除错误信息
    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
    clearErrors();     // 清空之前显示的错误信息
}

// 清空表单下方的错误提示文字
function clearErrors() {
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    if (loginError) loginError.innerText = '';
    if (registerError) registerError.innerText = '';
}

// 显示登录错误信息
function showLoginError(msg) {
    const el = document.getElementById('loginError');
    if (el) el.innerText = msg;
}

// 显示注册错误信息
function showRegisterError(msg) {
    const el = document.getElementById('registerError');
    if (el) el.innerText = msg;
}

// ==================== 后端通信（axios） ====================
// 登录请求
// 处理登录表单提交
async function handleLogin(e) {
    e.preventDefault();     // 阻止表单默认提交（刷新页面）
    // 获取用户输入的用户名/邮箱和密码
    const loginStr = document.getElementById('loginUsernameOrEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    let username = '';
    let email = '';

    if (!loginStr || !password) {
        showLoginError('请填写完整信息');
        return;
    }
    // 获取提交按钮并禁用，防止重复提交
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '登录中...';
    
    if (loginStr.includes('@')) {
        // 如果输入包含 @，则认为是邮箱格式，前端可以简单验证一下邮箱格式
        if (!/^\S+@\S+\.\S+$/.test(loginStr)) {
            showLoginError('请输入有效的邮箱地址');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            return;
        } else {
            // 如果是邮箱格式，前端可以直接使用输入的字符串作为 account 字段发送给后端
            email = loginStr;
        }
    } else {
        username = loginStr;
    }

    try {
        // 发送 POST 请求到后端登录接口
        axios.post(`${BASE_URL}/User/login`, {
            username: username,
            email: email,
            password: password
        })  
        .then(res => {
            if (res.data != null) {
                setLoggedInUser(res.data);   // 登录成功，保存用户信息并更新导航栏显示
                closeModal();
            }
        })
    } catch (error) {
        console.error('登录请求错误:', error);
        let errMsg = '网络错误，请稍后重试';
        // 提取后端返回的错误信息（如果有）
        if (error.response && error.response.data && error.response.data.message) {
            errMsg = error.response.data.message;
        } else if (error.message) {
            errMsg = error.message;
        }
        showLoginError(errMsg);
    } finally {
        // 恢复提交按钮状态
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// 处理注册表单提交
async function handleRegister(e) {
    e.preventDefault();
    // 获取注册表单中的各个字段
    const id = null;
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirm = document.getElementById('regConfirmPassword').value.trim();
    const power = 'user';
    // 前端基础验证
    if (!username || !email || !password || !confirm) {
        showRegisterError('请填写所有信息');
        return;
    }
    if (username.length < 3 || username.length > 20) {
        showRegisterError('用户名长度需为3-20位');
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        showRegisterError('请输入有效的邮箱地址');
        return;
    }
    if (password.length < 6) {
        showRegisterError('密码至少6位');
        return;
    }
    if (password !== confirm) {
        showRegisterError('两次输入的密码不一致');
        return;
    }
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '注册中...';
    try {
        // 发送 POST 请求到后端注册接口
        axios.post(`${BASE_URL}/User/register`, {
            id: id,
            username: username,
            email: email,
            password: password,
            power: power,
        })
        .then(res => {
            if (res.data === '注册成功') {
                alert('注册成功，请登录');
                switchTab('login');
                // 清空注册表单
                document.getElementById('regUsername').value = '';
                document.getElementById('regEmail').value = '';
                document.getElementById('regPassword').value = '';
                document.getElementById('regConfirmPassword').value = '';
            } else {
                showRegisterError(res.data);
            }
        })
    } catch (error) {
        console.error('注册请求错误:', error);
        let errMsg = '网络错误，请稍后重试';
        if (error.response && error.response.data && error.response.data.message) {
            errMsg = error.response.data.message;
        } else if (error.message) {
            errMsg = error.message;
        }
        showRegisterError(errMsg);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// ==================== 渲染静态内容 ====================
function renderServices() {
    const gridContainer = document.getElementById('services-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = serves.map(item => `
        <div class="service-card fade-up">
            <div class="service-icon"><i class="fas ${item.icon}"></i></div>
            <h3>${item.serviceName}</h3>
            <p>${item.serviceDesc}</p>
            <div class="service-btn">
                <button class="detail-btn" data-id="${item.serviceId}">查看详情</button>
            </div>
        </div>
    `).join('');

    serviceList.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            window.location.href = `./Pages/service-detail.html?id=${id}`; 
        });
    });
}

function renderProjects() {
    const gridContainer = document.getElementById('works-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = projects.map(item => `
        <div class="work-item fade-up">
            <div class="work-img"><i class="fas ${item.icon}" style="font-size: 3.5rem;"></i></div>
            <div class="work-info">
                <h4>${item.projectName}</h4>
                <p>${item.projectDesc}</p>
            </div>
            <div class="work-btn">
                <button class="detail-btn" data-id="${item.projectId}">查看详情</button>
            </div>
        </div>
    `).join('');
}

// ==================== 其他交互（导航、滚动动画、表单） ====================
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (!mobileBtn || !navLinks) return;
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = mobileBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });
}

function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    fadeElements.forEach(el => observer.observe(el));
}

function initNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    function highlightNav() {
        let scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) link.style.color = '#4A6FA5';
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav);
    highlightNav();
}

function initContactForm() {
    const contactname = document.getElementById('contact-name').value.trim();
    const contactemail = document.getElementById('contact-email').value.trim();
    const contactdesc = document.getElementById('contact-desc').value.trim();
    const contactForm = {
        contactName: contactname,
        contactEmail: contactemail,
        contactDesc: contactdesc
    };
    if (!contactname || !contactemail || !contactdesc) {
            alert('请填写完整信息');
            return;
    }
    addContact(contactForm);
}

function attachFadeUpToCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const workItems = document.querySelectorAll('.work-item');
    const elementsToAnimate = [...serviceCards, ...workItems];
    elementsToAnimate.forEach(el => {
        if (el && !el.classList.contains('fade-up')) el.classList.add('fade-up');
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    elementsToAnimate.forEach(el => { if (el) observer.observe(el); });
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && !heroContent.classList.contains('fade-up')) {
        heroContent.classList.add('fade-up');
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        heroObserver.observe(heroContent);
    }
}

// 初始化模态框事件
function initAuthModal() {
    if (!modal) return;
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
}

// 初始化所有
function init() {
    loadProjects();
    loadServes();
    initMobileMenu();
    initNavbarScroll();
    initNavHighlight();
    initAuthModal();
    checkSession();
    setTimeout(() => {
        attachFadeUpToCards();
        initScrollAnimation();
    }, 50);
}

document.addEventListener('DOMContentLoaded', init);
document.getElementById('contact-btn').addEventListener('click', (e) => {
        e.preventDefault();
        initContactForm();
    })