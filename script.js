const githubUsername = 'nongsaxso123';

// 2. ใช้คำสั่ง fetch เพื่อวิ่งไปขอรายชื่อคลังเก็บของ (Repositories) มาจากหลังบ้าน GitHub
fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
        const projectContainer = document.getElementById('github-projects');

        projectContainer.innerHTML = '';

        repos.forEach(repo => {
            // คัดเอาเฉพาะโปรเจกต์ตัวเอง
            if (!repo.fork) {
                const cardHTML = `
                    <div class="project-card">
                        <div class="project-info">
                            <h3>${repo.name}</h3>
                            <p>${repo.description || '(No description)'}</p>
                            <a href="${repo.html_url}" target="_blank">View Code on GitHub</a>
                        </div>

                        <img src="images/${repo.name}.jpg" alt="${repo.name} preview" class="project-img">
                    </div>
                `;
                // หย่อนกล่องนี้ลงไปในตู้เปล่าบนหน้าเว็บ
                projectContainer.innerHTML += cardHTML;
            }
        });
    })
    .catch(error => {
        console.error('Error to fetch data:', error);
    });