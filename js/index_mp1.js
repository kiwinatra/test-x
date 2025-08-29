document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.navbar');
            const showNavBtn = document.querySelector('.show-nav-btn');
            let isNavVisible = false;
            let isAnimating = false;

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').replace('#', '');
                    const targetIndex = Array.from(document.querySelectorAll('.page-section'))
                        .findIndex(section => section.id === targetId);
                    if (targetIndex !== -1) {
                        updatePage(targetIndex);
                    }
                });
            });

            function updateNavVisibility(newPage) {
                if (newPage === 0) {
                    navbar.classList.add('first-section');
                    showNavBtn.style.display = 'none';
                } else {
                    navbar.classList.remove('first-section');
                    showNavBtn.style.display = 'flex';
                }
            }

            showNavBtn.addEventListener('click', () => {
                isNavVisible = !isNavVisible;
                navbar.classList.toggle('visible', isNavVisible);
                showNavBtn.innerHTML = isNavVisible ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });

            document.addEventListener('click', (e) => {
                if (isNavVisible && 
                    !navbar.contains(e.target) && 
                    !showNavBtn.contains(e.target)) {
                    isNavVisible = false;
                    navbar.classList.remove('visible');
                    showNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });

            const sections = document.querySelectorAll('.page-section');
            const indicators = document.querySelectorAll('.page-indicator');
            const upArrow = document.querySelector('.nav-arrow.up');
            const downArrow = document.querySelector('.nav-arrow.down');
            let currentPage = 0;

            function updatePage(newPage) {
                if (isAnimating || newPage === currentPage || newPage < 0 || newPage >= sections.length) return;
                isAnimating = true;

                updateNavVisibility(newPage);

                if (isNavVisible) {
                    isNavVisible = false;
                    navbar.classList.remove('visible');
                    showNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }

                sections.forEach((section, index) => {
                    section.classList.remove('active', 'prev', 'next');
                    if (index < newPage) {
                        section.classList.add('prev');
                        section.style.transform = 'translateY(-100%)';
                    } else if (index > newPage) {
                        section.classList.add('next');
                        section.style.transform = 'translateY(100%)';
                    } else {
                        section.classList.add('active');
                        section.style.transform = 'translateY(0)';
                    }
                });

                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === newPage);
                });

                upArrow.classList.toggle('disabled', newPage === 0);
                downArrow.classList.toggle('disabled', newPage === sections.length - 1);

                const progress = (newPage / (sections.length - 1)) * 100;
                document.querySelector('.scroll-progress-bar').style.height = `${progress}%`;

                currentPage = newPage;
                setTimeout(() => {
                    isAnimating = false;
                }, 1000);
            }

            upArrow.addEventListener('click', () => {
                if (!upArrow.classList.contains('disabled')) {
                    updatePage(currentPage - 1);
                }
            });

            downArrow.addEventListener('click', () => {
                if (!downArrow.classList.contains('disabled')) {
                    updatePage(currentPage + 1);
                }
            });

            let wheelTimeout;
            document.addEventListener('wheel', (e) => {
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    if (e.deltaY > 0 && currentPage < sections.length - 1) {
                        updatePage(currentPage + 1);
                    } else if (e.deltaY < 0 && currentPage > 0) {
                        updatePage(currentPage - 1);
                    }
                }, 50);
            });

            let touchStartY;
            document.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            });

            document.addEventListener('touchend', (e) => {
                if (isAnimating) return;
                const touchEndY = e.changedTouches[0].clientY;
                const deltaY = touchStartY - touchEndY;

                if (Math.abs(deltaY) > 50) { 
                    if (deltaY > 0 && currentPage < sections.length - 1) {
                        updatePage(currentPage + 1);
                    } else if (deltaY < 0 && currentPage > 0) {
                        updatePage(currentPage - 1);
                    }
                }
            });

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    updatePage(index);
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' && currentPage < sections.length - 1) {
                    updatePage(currentPage + 1);
                } else if (e.key === 'ArrowUp' && currentPage > 0) {
                    updatePage(currentPage - 1);
                }
            });

            updateNavVisibility(0);
        });