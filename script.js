// 1. กำหนดชื่อ Username GitHub ของคุณ
const githubUsername = 'nongsaxso123'; 

// 2. ใช้คำสั่ง fetch เพื่อวิ่งไปขอรายชื่อคลังเก็บของ (Repositories) มาจากหลังบ้าน GitHub
fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json()) // แปลงข้อมูลเป็น JSON ที่ส่งมาเป็นคู่ๆ
    .then(repos => {
        // 3. ไปหยิบตู้เปล่าใน HTML มาเตรียมไว้
        const projectContainer = document.getElementById('github-projects');
        
        // ล้างตัวอักษรเก่าข้างในตู้ (ถ้ามี)
        projectContainer.innerHTML = '';

        // 4. วนลูปคัดเลือกโปรเจกต์มาสร้างเป็นกล่อง HTML
        repos.forEach(repo => {
            // คัดเอาเฉพาะโปรเจกต์ที่คุณสร้างเอง (ไม่นับอันที่ไปกด Fork คนอื่นมา)
            if (!repo.fork) {
                // สร้างแม่แบบกล่องรายงาน (Digital Document) บรรจุข้อมูลชื่อและคำอธิบายโปรเจกต์
                const cardHTML = `
                    <div class="project-card">
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'โปรเจกต์นี้ยังไม่มีคำอธิบาย (No description)'}</p>
                        <a href="${repo.html_url}" target="_blank">👉 View Code on GitHub</a>
                    </div>
                `;
                // หย่อนกล่องนี้ลงไปในตู้เปล่าบนหน้าเว็บ
                projectContainer.innerHTML += cardHTML;
            }
        });
    })
    .catch(error => {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    });