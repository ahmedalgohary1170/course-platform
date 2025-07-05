// Application State
let currentUser = null;
let currentPage = 'home';
let courses = [];
let students = [];
let coupons = [];

// Show course details function
function showCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Create course details modal content
    const modalContent = `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="closeCourseDetails(event)">
            <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
                <div class="relative">
                    <img src="${course.image}" alt="${course.title}" class="w-full h-64 object-cover" 
                         onerror="this.src='https://via.placeholder.com/800x300/4F46E5/FFFFFF?text=كورس'">
                    <button onclick="closeCourseDetails()" class="absolute top-4 left-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all">
                        <i class="fas fa-times text-gray-600"></i>
                    </button>
                    <div class="absolute bottom-4 right-4">
                        <span class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">${course.level}</span>
                    </div>
                </div>
                
                <div class="p-8">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2">
                            <div class="flex items-center justify-between mb-4">
                                <span class="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">${course.category}</span>
                                <div class="flex items-center">
                                    <div class="flex text-yellow-400 text-sm ml-2">
                                        ${Array.from({length: 5}, (_, i) => 
                                            `<i class="fas fa-star ${i < Math.floor(course.rating) ? '' : 'text-gray-300'}"></i>`
                                        ).join('')}
                                    </div>
                                    <span class="text-sm text-gray-600">(${course.rating})</span>
                                </div>
                            </div>
                            
                            <h1 class="text-3xl font-bold text-gray-800 mb-4">${course.title}</h1>
                            <p class="text-gray-600 mb-6 leading-relaxed">${course.description}</p>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <i class="fas fa-clock text-blue-500 text-xl mb-2"></i>
                                    <div class="text-sm text-gray-600">المدة</div>
                                    <div class="font-semibold">${course.duration}</div>
                                </div>
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <i class="fas fa-users text-green-500 text-xl mb-2"></i>
                                    <div class="text-sm text-gray-600">الطلاب</div>
                                    <div class="font-semibold">${course.students.toLocaleString()}</div>
                                </div>
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <i class="fas fa-user-tie text-purple-500 text-xl mb-2"></i>
                                    <div class="text-sm text-gray-600">المدرس</div>
                                    <div class="font-semibold text-sm">${course.instructor}</div>
                                </div>
                                <div class="text-center p-4 bg-gray-50 rounded-lg">
                                    <i class="fas fa-certificate text-orange-500 text-xl mb-2"></i>
                                    <div class="text-sm text-gray-600">الشهادة</div>
                                    <div class="font-semibold text-sm">معتمدة</div>
                                </div>
                            </div>
                            
                            <div class="bg-blue-50 p-6 rounded-lg">
                                <h3 class="text-lg font-bold text-gray-800 mb-3">ماذا ستتعلم في هذا الكورس؟</h3>
                                <ul class="space-y-2">
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 ml-2 mt-1"></i>
                                        <span class="text-gray-700">أساسيات ${course.category} من الصفر</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 ml-2 mt-1"></i>
                                        <span class="text-gray-700">تطبيقات عملية ومشاريع حقيقية</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 ml-2 mt-1"></i>
                                        <span class="text-gray-700">نصائح وحيل من الخبراء</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-500 ml-2 mt-1"></i>
                                        <span class="text-gray-700">شهادة إتمام معتمدة</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="lg:col-span-1">
                            <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                                <div class="text-center mb-6">
                                    <div class="flex items-center justify-center mb-2">
                                        <span class="text-3xl font-bold text-blue-600">${course.price} ج.م</span>
                                        ${course.originalPrice ? `<span class="text-xl text-gray-400 line-through mr-2">${course.originalPrice} ج.م</span>` : ''}
                                    </div>
                                    ${course.originalPrice ? `<div class="text-green-600 font-medium">وفر ${course.originalPrice - course.price} ج.م</div>` : ''}
                                </div>
                                
                                <button onclick="enrollCourse(${course.id}); closeCourseDetails()" class="w-full btn-primary py-3 text-lg font-medium mb-4">
                                    <i class="fas fa-shopping-cart ml-2"></i>
                                    التسجيل في الكورس
                                </button>
                                
                                <div class="space-y-3 text-sm">
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">الوصول مدى الحياة</span>
                                        <i class="fas fa-check text-green-500"></i>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">شهادة إتمام</span>
                                        <i class="fas fa-check text-green-500"></i>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">دعم فني</span>
                                        <i class="fas fa-check text-green-500"></i>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-gray-600">تحديثات مجانية</span>
                                        <i class="fas fa-check text-green-500"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalDiv = document.createElement('div');
    modalDiv.id = 'courseDetailsModal';
    modalDiv.innerHTML = modalContent;
    document.body.appendChild(modalDiv);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeCourseDetails(event) {
    if (event && event.target !== event.currentTarget) return;
    
    const modal = document.getElementById('courseDetailsModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Quick login functions for testing
function quickLoginAsStudent() {
    currentUser = {
        id: 1,
        name: 'محمد أحمد',
        email: 'student@test.com',
        role: 'student'
    };
    updateUI();
    showNotification('تم تسجيل الدخول كطالب', 'success');
}

function quickLoginAsTeacher() {
    currentUser = {
        id: 2,
        name: 'الأستاذ أحمد محمد',
        email: 'teacher@test.com',
        role: 'teacher'
    };
    updateUI();
    showNotification('تم تسجيل الدخول كمعلم', 'success');
}

function quickLogout() {
    currentUser = null;
    updateUI();
    showNotification('تم تسجيل الخروج', 'info');
}

// Sample Data
function loadSampleData() {
    // Sample courses
    courses = [
        {
            id: 1,
            title: 'أساسيات البرمجة بـ JavaScript',
            description: 'تعلم أساسيات البرمجة باستخدام لغة JavaScript من الصفر حتى الاحتراف',
            price: 299,
            originalPrice: 399,
            duration: '8 أسابيع',
            level: 'مبتدئ',
            category: 'برمجة',
            image: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=JavaScript',
            instructor: 'أحمد محمد',
            students: 150,
            rating: 4.8,
            students: 1250,
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'مقدمة في JavaScript', duration: '15 دقيقة', completed: false },
                { id: 2, title: 'المتغيرات والثوابت', duration: '20 دقيقة', completed: false },
                { id: 3, title: 'الدوال والكائنات', duration: '25 دقيقة', completed: false }
            ]
        },
        {
            id: 2,
            title: 'تصميم الجرافيك والهوية البصرية',
            description: 'احترف Adobe Photoshop و Illustrator وتصميم الشعارات',
            price: 249,
            originalPrice: 349,
            category: 'تصميم',
            level: 'متوسط',
            duration: '6 أسابيع',
            instructor: 'فاطمة أحمد',
            rating: 4.9,
            students: 890,
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'أساسيات HTML', duration: '18 دقيقة', completed: false },
                { id: 2, title: 'تنسيق النصوص بـ CSS', duration: '22 دقيقة', completed: false },
                { id: 3, title: 'التخطيط والشبكات', duration: '30 دقيقة', completed: false }
            ]
        },
        {
            id: 3,
            title: 'التسويق الرقمي ووسائل التواصل',
            description: 'استراتيجيات التسويق عبر Facebook, Instagram, Google Ads',
            price: 199,
            originalPrice: 299,
            category: 'تسويق',
            level: 'مبتدئ',
            duration: '4 أسابيع',
            instructor: 'محمد علي',
            rating: 4.7,
            students: 2100,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'مقدمة في React', duration: '25 دقيقة', completed: false },
                { id: 2, title: 'Components والـ Props', duration: '30 دقيقة', completed: false },
                { id: 3, title: 'State Management', duration: '35 دقيقة', completed: false }
            ]
        },
        {
            id: 4,
            title: 'تطوير تطبيقات الموبايل',
            description: 'تعلم React Native وFlutter لتطوير تطبيقات iOS و Android',
            price: 399,
            originalPrice: 499,
            category: 'برمجة',
            level: 'متقدم',
            duration: '12 أسبوع',
            instructor: 'سارة حسن',
            rating: 4.9,
            students: 750,
            image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'مقدمة في React', duration: '25 دقيقة', completed: false },
                { id: 2, title: 'Components والـ Props', duration: '30 دقيقة', completed: false },
                { id: 3, title: 'State Management', duration: '35 دقيقة', completed: false }
            ]
        },
        {
            id: 5,
            title: 'إدارة الأعمال والقيادة',
            description: 'مهارات القيادة وإدارة الفرق وريادة الأعمال',
            price: 179,
            originalPrice: 249,
            category: 'أعمال',
            level: 'متوسط',
            duration: '5 أسابيع',
            instructor: 'خالد عبدالله',
            rating: 4.6,
            students: 1500,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'مقدمة في JavaScript', duration: '15 دقيقة', completed: false },
                { id: 2, title: 'المتغيرات والثوابت', duration: '20 دقيقة', completed: false },
                { id: 3, title: 'الدوال والكائنات', duration: '25 دقيقة', completed: false }
            ]
        },
        {
            id: 6,
            title: 'التصوير الفوتوغرافي الاحترافي',
            description: 'تعلم أساسيات التصوير والإضاءة والتحرير',
            price: 229,
            originalPrice: 319,
            category: 'تصميم',
            level: 'مبتدئ',
            duration: '6 أسابيع',
            instructor: 'نور الدين',
            rating: 4.8,
            students: 680,
            image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'أساسيات HTML', duration: '18 دقيقة', completed: false },
                { id: 2, title: 'تنسيق النصوص بـ CSS', duration: '22 دقيقة', completed: false },
                { id: 3, title: 'التخطيط والشبكات', duration: '30 دقيقة', completed: false }
            ]
        },
        {
            id: 7,
            title: 'الذكاء الاصطناعي وتعلم الآلة',
            description: 'مقدمة شاملة في AI و Machine Learning باستخدام Python',
            price: 449,
            originalPrice: 599,
            category: 'برمجة',
            level: 'متقدم',
            duration: '10 أسابيع',
            instructor: 'د. أمين صالح',
            rating: 4.9,
            students: 420,
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'مقدمة في الذكاء الاصطناعي', duration: '25 دقيقة', completed: false },
                { id: 2, title: 'Python للمبتدئين', duration: '30 دقيقة', completed: false },
                { id: 3, title: 'Machine Learning الأساسيات', duration: '35 دقيقة', completed: false }
            ]
        },
        {
            id: 8,
            title: 'كتابة المحتوى والتسويق بالمحتوى',
            description: 'فن كتابة المحتوى الجذاب واستراتيجيات التسويق',
            price: 149,
            originalPrice: 199,
            category: 'تسويق',
            level: 'مبتدئ',
            duration: '4 أسابيع',
            instructor: 'ليلى محمود',
            rating: 4.7,
            students: 1800,
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop&crop=center',
            lessons: [
                { id: 1, title: 'أساسيات كتابة المحتوى', duration: '20 دقيقة', completed: false },
                { id: 2, title: 'استراتيجيات التسويق', duration: '25 دقيقة', completed: false },
                { id: 3, title: 'قياس الأداء', duration: '18 دقيقة', completed: false }
            ]
        }
    ];

    // Sample students
    students = [
        { id: 1, name: 'محمد أحمد', email: 'mohamed@example.com', phone: '01234567890', enrolledCourses: [1, 2], progress: 75 },
        { id: 2, name: 'فاطمة علي', email: 'fatma@example.com', phone: '01234567891', enrolledCourses: [1], progress: 60 },
        { id: 3, name: 'أحمد محمود', email: 'ahmed@example.com', phone: '01234567892', enrolledCourses: [2, 3], progress: 90 }
    ];

    // Sample coupons
    coupons = [
        { id: 1, code: 'WELCOME20', discount: 20, type: 'percentage', active: true },
        { id: 2, code: 'SAVE50', discount: 50, type: 'fixed', active: true }
    ];
}

// Authentication
function showLogin() {
    document.getElementById('loginModal').classList.add('show');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple demo authentication
    if (email === 'teacher@example.com') {
        currentUser = { id: 1, name: 'أحمد محمد', email: email, role: 'teacher' };
    } else {
        currentUser = { id: 2, name: 'محمد أحمد', email: email, role: 'student' };
    }

    closeModal('loginModal');
    updateUI();
    showNotification('تم تسجيل الدخول بنجاح!', 'success');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;

    currentUser = { id: Date.now(), name: name, email: email, phone: phone, role: 'student' };

    closeModal('registerModal');
    updateUI();
    showNotification('تم إنشاء الحساب بنجاح!', 'success');
}

function logout() {
    currentUser = null;
    updateUI();
    showPage('home');
    showNotification('تم تسجيل الخروج بنجاح!', 'success');
}

function updateUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const teacherMenuItems = document.getElementById('teacherMenuItems');
    const userPages = document.getElementById('userPages');
    
    // Mobile menu elements
    const mobileUserPages = document.getElementById('mobileUserPages');
    const mobileTeacherPages = document.getElementById('mobileTeacherPages');

    // Always show all navigation links regardless of login status
    if (userPages) userPages.classList.remove('hidden');
    if (teacherMenuItems) teacherMenuItems.classList.remove('hidden');
    if (mobileUserPages) mobileUserPages.classList.remove('hidden');
    if (mobileTeacherPages) mobileTeacherPages.classList.remove('hidden');

    if (currentUser) {
        // User is logged in - show user menu, hide auth buttons
        if (authButtons) authButtons.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            const userNameElement = document.getElementById('userName');
            if (userNameElement) userNameElement.textContent = currentUser.name;
        }
    } else {
        // User not logged in - show auth buttons, hide user menu
        if (authButtons) authButtons.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageId;
    }
    
    // Update navigation - remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page links (both desktop and mobile)
    const activeLinks = document.querySelectorAll(`a[onclick*="showPage('${pageId}')"]`);
    activeLinks.forEach(link => {
        if (link.classList.contains('nav-link')) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
}

// Course Management
function handleAddCourse(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newCourse = {
        id: Date.now(),
        title: formData.get('title'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        originalPrice: parseFloat(formData.get('originalPrice')) || parseFloat(formData.get('price')),
        duration: formData.get('duration'),
        level: formData.get('level'),
        category: formData.get('category'),
        image: 'https://via.placeholder.com/300x200',
        instructor: currentUser.name,
        students: 0,
        rating: 0,
        lessons: []
    };
    
    courses.push(newCourse);
    closeModal('addCourseModal');
    renderCourses();
    renderFeaturedCourses();
    showNotification('تم إضافة الكورس بنجاح!', 'success');
}

function createCourseCard(course) {
    return `
        <div class="course-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="relative">
                <img src="${course.image}" alt="${course.title}" class="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                     onclick="showCourseDetails(${course.id})"
                     onerror="this.src='https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=كورس'">
                <div class="absolute top-4 right-4">
                    <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">${course.level}</span>
                </div>
                <div class="absolute top-4 left-4">
                    <span class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ${course.originalPrice ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) + '% خصم' : 'جديد'}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">${course.category}</span>
                    <div class="flex items-center">
                        <div class="flex text-yellow-400 text-sm">
                            ${Array.from({length: 5}, (_, i) => 
                                `<i class="fas fa-star ${i < Math.floor(course.rating) ? '' : 'text-gray-300'}"></i>`
                            ).join('')}
                        </div>
                        <span class="text-sm text-gray-600 mr-2">(${course.rating})</span>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer" onclick="showCourseDetails(${course.id})">${course.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">${course.description}</p>
                
                <div class="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div class="flex items-center">
                        <i class="fas fa-clock ml-2 text-blue-500"></i>
                        <span>${course.duration}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-users ml-2 text-green-500"></i>
                        <span>${course.students.toLocaleString()} طالب</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <i class="fas fa-user-tie text-gray-400 ml-2"></i>
                        <span class="text-sm text-gray-600">${course.instructor}</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div class="flex items-center">
                        <span class="text-2xl font-bold text-blue-600">${course.price} ج.م</span>
                        ${course.originalPrice ? `<span class="text-lg text-gray-400 line-through mr-2">${course.originalPrice} ج.م</span>` : ''}
                    </div>
                    <button onclick="enrollCourse(${course.id})" class="btn-primary px-6 py-2 text-sm font-medium">
                        <i class="fas fa-shopping-cart ml-2"></i>
                        التسجيل الآن
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');
}

function renderFeaturedCourses() {
    const featuredGrid = document.getElementById('featuredCoursesGrid');
    if (!featuredGrid) return;
    
    const featuredCourses = courses.slice(0, 3);
    featuredGrid.innerHTML = featuredCourses.map(course => createCourseCard(course)).join('');
}

function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        // Update payment modal with course details
        document.getElementById('paymentCourseTitle').textContent = course.title;
        document.getElementById('paymentCoursePrice').textContent = course.price + ' ج.م';
        
        // Set original price for coupon calculations
        const originalPriceElement = document.getElementById('originalPrice');
        const finalPriceElement = document.getElementById('finalPrice');
        if (originalPriceElement) originalPriceElement.textContent = course.price + ' ج.م';
        if (finalPriceElement) finalPriceElement.textContent = course.price + ' ج.م';
        
        // Reset coupon section
        const couponInput = document.getElementById('couponCode');
        const couponMessage = document.getElementById('couponMessage');
        const discountRow = document.getElementById('discountRow');
        
        if (couponInput) {
            couponInput.value = '';
            couponInput.classList.remove('border-green-500', 'bg-green-50', 'border-red-500', 'bg-red-50');
        }
        if (couponMessage) couponMessage.classList.add('hidden');
        if (discountRow) discountRow.classList.add('hidden');
        
        // Reset payment method selection to credit card
        const creditCardRadio = document.querySelector('input[name="paymentMethod"][value="credit"]');
        if (creditCardRadio) {
            creditCardRadio.checked = true;
            // Trigger change event to show credit card details
            creditCardRadio.dispatchEvent(new Event('change'));
        }
        
        // Clear applied coupon
        window.appliedCoupon = null;
        
        // Show payment modal
        document.getElementById('paymentModal').classList.add('show');
        
        // Re-initialize payment system for this modal instance
        setTimeout(() => {
            initializeEnhancedPaymentSystem();
        }, 100);
    }
}

function handlePayment(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري المعالجة...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        closeModal('paymentModal');
        showNotification('تم الدفع بنجاح! مرحباً بك في الكورس', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Student Management
function renderStudents() {
    const studentsTable = document.getElementById('studentsTable');
    if (!studentsTable) return;
    
    studentsTable.innerHTML = students.map(student => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${student.name}</div>
                <div class="text-sm text-gray-500">${student.email}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.phone}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.enrolledCourses.length}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 ml-3">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${student.progress}%"></div>
                    </div>
                    <span class="text-sm text-gray-600">${student.progress}%</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="viewStudent(${student.id})" class="text-blue-600 hover:text-blue-900 ml-2">عرض</button>
                <button onclick="editStudent(${student.id})" class="text-green-600 hover:text-green-900 ml-2">تعديل</button>
                <button onclick="deleteStudent(${student.id})" class="text-red-600 hover:text-red-900">حذف</button>
            </td>
        </tr>
    `).join('');
}

// Modal Management
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
    
    // If it's the payment modal, reinitialize the payment system
    if (modalId === 'paymentModal') {
        setTimeout(() => {
            initializeEnhancedPaymentSystem();
        }, 100);
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationIcon = document.getElementById('notificationIcon');
    
    if (!notification || !notificationMessage || !notificationIcon) return;
    
    notificationMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        notificationIcon.className = 'fas fa-check-circle text-green-500 ml-3';
    } else if (type === 'error') {
        notificationIcon.className = 'fas fa-exclamation-circle text-red-500 ml-3';
    } else {
        notificationIcon.className = 'fas fa-info-circle text-blue-500 ml-3';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('ar-EG');
}

function formatCurrency(amount) {
    return amount.toLocaleString('ar-EG') + ' ج.م';
}

// Search and Filter Functions
function searchCourses(query) {
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase()) ||
        course.category.toLowerCase().includes(query.toLowerCase())
    );
    
    const coursesGrid = document.getElementById('coursesGrid');
    if (coursesGrid) {
        coursesGrid.innerHTML = filteredCourses.map(course => createCourseCard(course)).join('');
    }
}

function filterCoursesByCategory(category) {
    const filteredCourses = category === 'all' ? courses : courses.filter(course => course.category === category);
    
    const coursesGrid = document.getElementById('coursesGrid');
    if (coursesGrid) {
        coursesGrid.innerHTML = filteredCourses.map(course => createCourseCard(course)).join('');
    }
}

// Initialize Application
function initializeApp() {
    loadSampleData();
    renderCourses();
    renderFeaturedCourses();
    renderStudents();
    updateUI();
    
    // Add event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Initialize enhanced payment system
    initializeEnhancedPaymentSystem();
    
    document.getElementById('addCourseForm').addEventListener('submit', handleAddCourse);
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
}

// Enhanced payment system initialization
function initializeEnhancedPaymentSystem() {
    // Initialize payment methods
    initializePaymentMethods();
    
    // Add event listeners for enhanced payment form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        // Remove old event listener and add new one
        paymentForm.removeEventListener('submit', handlePayment);
        paymentForm.addEventListener('submit', handlePaymentSubmission);
    }
    
    // Add event listeners for input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
    
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            formatExpiryDate(this);
        });
    }
    
    // Add coupon input enter key support
    const couponInput = document.getElementById('couponCode');
    if (couponInput) {
        couponInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyCoupon();
            }
        });
    }
}

// Load modals
async function loadModals() {
    try {
        const response = await fetch('components/modals.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
    } catch (error) {
        console.error('Error loading modals:', error);
    }
}

// Students management functions
function loadStudentsManagement() {
    if (typeof window.loadStudentsManagement === 'function') {
        window.loadStudentsManagement();
    }
}

function loadTeacherDashboard() {
    if (typeof window.loadTeacherDashboard === 'function') {
        window.loadTeacherDashboard();
    }
}

function loadProfilePage() {
    if (typeof window.loadProfilePage === 'function') {
        window.loadProfilePage();
    }
}

// Enhanced page navigation
async function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Update navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-blue-600', 'border-blue-600');
        link.classList.add('text-gray-600', 'border-transparent');
    });
    
    const activeLink = document.querySelector(`nav a[onclick*="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.remove('text-gray-600', 'border-transparent');
        activeLink.classList.add('text-blue-600', 'border-blue-600');
    }
    
    // Show target page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageId;
        
        // Load page-specific data
        switch(pageId) {
            case 'courses':
                renderCourses();
                break;
            case 'profile':
                loadProfilePage();
                break;
            case 'teacherDashboard':
                loadTeacherDashboard();
                break;
            case 'studentsManagement':
                loadStudentsManagement();
                break;
        }
    }
}

// Export functions for global access
window.showPage = showPage;
window.showLogin = showLogin;
window.logout = logout;
window.enrollCourse = enrollCourse;
window.closeModal = closeModal;
window.searchCourses = searchCourses;
window.filterCoursesByCategory = filterCoursesByCategory;
window.loadStudentsManagement = loadStudentsManagement;
window.loadTeacherDashboard = loadTeacherDashboard;
window.loadProfilePage = loadProfilePage;
window.applyCoupon = applyCoupon;

// Enhanced coupon application function
function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value.trim().toUpperCase();
    const couponMessage = document.getElementById('couponMessage');
    const discountRow = document.getElementById('discountRow');
    const discountAmount = document.getElementById('discountAmount');
    const finalPrice = document.getElementById('finalPrice');
    const originalPriceElement = document.getElementById('originalPrice');
    const couponInput = document.getElementById('couponCode');
    
    if (!couponCode) {
        showCouponMessage('يرجى إدخال كود الخصم', 'error');
        return;
    }
    
    const originalPrice = parseFloat(originalPriceElement.textContent.replace(' ج.م', ''));
    let discount = 0;
    let isValid = false;
    
    // Define available coupons with enhanced details
    const coupons = {
        'SAVE10': { discount: 10, type: 'percentage', description: 'خصم 10%' },
        'SAVE20': { discount: 20, type: 'percentage', description: 'خصم 20%' },
        'STUDENT50': { discount: 50, type: 'fixed', description: 'خصم 50 جنيه للطلاب' },
        'WELCOME15': { discount: 15, type: 'percentage', description: 'خصم ترحيبي 15%' },
        'FIRST30': { discount: 30, type: 'percentage', description: 'خصم أول عملية شراء 30%' }
    };
    
    if (coupons[couponCode]) {
        isValid = true;
        const coupon = coupons[couponCode];
        
        if (coupon.type === 'percentage') {
            discount = Math.round((originalPrice * coupon.discount) / 100);
        } else {
            discount = coupon.discount;
        }
        
        // Ensure discount doesn't exceed original price
        discount = Math.min(discount, originalPrice - 1); // Keep at least 1 EGP
        
        discountAmount.textContent = `-${discount} ج.م`;
        finalPrice.textContent = `${originalPrice - discount} ج.م`;
        discountRow.classList.remove('hidden');
        
        // Style the input as success
        couponInput.classList.add('border-green-500', 'bg-green-50');
        couponInput.classList.remove('border-red-500', 'bg-red-50');
        
        showCouponMessage(`✅ ${coupon.description} - وفرت ${discount} ج.م!`, 'success');
        
        // Store applied coupon for payment processing
        window.appliedCoupon = {
            code: couponCode,
            discount: discount,
            originalPrice: originalPrice,
            finalPrice: originalPrice - discount
        };
    } else {
        // Style the input as error
        couponInput.classList.add('border-red-500', 'bg-red-50');
        couponInput.classList.remove('border-green-500', 'bg-green-50');
        
        discountRow.classList.add('hidden');
        finalPrice.textContent = originalPriceElement.textContent;
        showCouponMessage('❌ كود الخصم غير صحيح أو منتهي الصلاحية', 'error');
        
        // Clear applied coupon
        window.appliedCoupon = null;
    }
}

function showCouponMessage(message, type) {
    const couponMessage = document.getElementById('couponMessage');
    couponMessage.textContent = message;
    
    if (type === 'success') {
        couponMessage.className = 'text-sm mt-2 text-green-700 bg-green-100 p-2 rounded-lg border border-green-300';
    } else {
        couponMessage.className = 'text-sm mt-2 text-red-700 bg-red-100 p-2 rounded-lg border border-red-300';
    }
    
    couponMessage.classList.remove('hidden');
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        couponMessage.classList.add('hidden');
    }, 5000);
}

// Payment method switching functionality
function initializePaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardDetails = document.getElementById('creditCardDetails');
    const paypalDetails = document.getElementById('paypalDetails');
    const vodafoneDetails = document.getElementById('vodafoneDetails');
    
    if (!paymentMethods.length) return;
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            if (creditCardDetails) creditCardDetails.classList.add('hidden');
            if (paypalDetails) paypalDetails.classList.add('hidden');
            if (vodafoneDetails) vodafoneDetails.classList.add('hidden');
            
            // Show selected payment method details
            switch(this.value) {
                case 'credit':
                    if (creditCardDetails) creditCardDetails.classList.remove('hidden');
                    updateRequiredFields(['cardHolderName', 'cardNumber', 'expiryDate', 'cvv']);
                    break;
                case 'paypal':
                    if (paypalDetails) paypalDetails.classList.remove('hidden');
                    clearRequiredFields();
                    break;
                case 'vodafone':
                    if (vodafoneDetails) vodafoneDetails.classList.remove('hidden');
                    updateRequiredFields(['vodafoneNumber', 'nationalId']);
                    break;
            }
        });
    });
}

function updateRequiredFields(fieldIds) {
    // Clear all required attributes first
    clearRequiredFields();
    
    // Set required for specified fields
    fieldIds.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.required = true;
        }
    });
}

function clearRequiredFields() {
    const allFields = ['cardHolderName', 'cardNumber', 'expiryDate', 'cvv', 'vodafoneNumber', 'nationalId'];
    allFields.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.required = false;
        }
    });
}

// Enhanced card number formatting
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

// Expiry date formatting
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

// Enhanced payment form submission
function handlePaymentSubmission(event) {
    event.preventDefault();
    
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const agreeTerms = document.getElementById('agreeTerms');
    
    if (!selectedPaymentMethod) {
        showNotification('يرجى اختيار طريقة دفع', 'error');
        return;
    }
    
    if (!agreeTerms || !agreeTerms.checked) {
        showNotification('يجب الموافقة على الشروط والأحكام', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري المعالجة...';
    submitButton.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        processPayment(selectedPaymentMethod.value);
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function processPayment(paymentMethod) {
    const courseTitle = document.getElementById('paymentCourseTitle').textContent;
    const finalPrice = document.getElementById('finalPrice').textContent;
    
    let paymentMessage = '';
    
    switch(paymentMethod) {
        case 'credit':
            paymentMessage = `تم الدفع بنجاح بالبطاقة الائتمانية!\nالكورس: ${courseTitle}\nالمبلغ: ${finalPrice}`;
            break;
        case 'paypal':
            paymentMessage = `تم الدفع بنجاح عبر PayPal!\nالكورس: ${courseTitle}\nالمبلغ: ${finalPrice}`;
            break;
        case 'vodafone':
            paymentMessage = `تم الدفع بنجاح عبر فودافون كاش!\nالكورس: ${courseTitle}\nالمبلغ: ${finalPrice}`;
            break;
    }
    
    showNotification(paymentMessage, 'success');
    closeModal('paymentModal');
    
    // Add course to user's enrolled courses
    if (window.appliedCoupon) {
        console.log('Coupon applied:', window.appliedCoupon);
    }
    
    // Reset form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) paymentForm.reset();
    
    const couponCode = document.getElementById('couponCode');
    if (couponCode) couponCode.value = '';
    
    const couponMessage = document.getElementById('couponMessage');
    if (couponMessage) couponMessage.classList.add('hidden');
    
    const discountRow = document.getElementById('discountRow');
    if (discountRow) discountRow.classList.add('hidden');
}

// Payment system is now initialized through initializeApp() function
