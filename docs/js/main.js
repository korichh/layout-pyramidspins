const main = function() {
    const ibg = document.querySelectorAll('.ibg');
    const nav = document.querySelector('.mobile-menu');
    const popup = document.querySelector('.popup');
    const banner = document.querySelector('.banner');
    const gnav = document.querySelector('.gnav');
    const sidebar = document.querySelector('.sidebar');
    const goTop = document.querySelector('.go-top');
    const sidebarTimer = document.querySelector('.sidebar-timer');

    if (ibg.length > 0) {
        for (let i = 0; i < ibg.length; i++) {
            if (ibg[i].querySelector('img')) {
                ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
            }
        }
    }

    if (nav) {
        const page = document.querySelector('.page')

        const openMenu = () => {
            document.body.classList.add('_lock');
            page.classList.add('_active')
        }
        const closeMenu = () => {
            document.body.classList.remove('_lock');
            page.classList.remove('_active')
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.header-burger')) {
                openMenu()
            } else if (!e.target.closest('.mobile-menu') || e.target.closest('.menu-close')) {
                closeMenu()
            }
        })
    }

    if (popup) {
        const popup_sections = {
            '#sign-up': '.signup',
            '#sign-in': '.login',
        }

        const clearHash = () => {
            if (window.location.hash) history.pushState('', '', location.origin + location.pathname);;
        }

        const checkHash = (e) => {
            const url = window.location.href;

            document.body.classList.remove('_lock');
            popup.classList.remove('_active');
            for (const hash in popup_sections) {
                const section = document.querySelector(popup_sections[hash])
                if (section) {
                    section.classList.remove('_active')
                }
            }

            for (const hash in popup_sections) {
                if (url.includes(hash)) {
                    const section = document.querySelector(popup_sections[hash])
                    if (section) {
                        document.body.classList.add('_lock');
                        popup.classList.add('_active')
                        section.classList.add('_active')
                    }
                    break;
                }
            }
        }

        window.addEventListener('hashchange', checkHash);
        checkHash();

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.popup-inner') || e.target.closest('.popup-close')) {
                clearHash()
                checkHash()
            }
        })
    }

    if (banner) {
        const selector = banner.querySelector('.banner-swiper');
        const pagination = banner.querySelector('.swiper-pagination');
        const bannerSwiper = new Swiper(selector, {
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 5000,
            },

            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },

            pagination: {
                el: pagination,
                clickable: true,
            },
        });
    }

    if (gnav) {
        const selector = gnav.querySelector('.gnav-swiper');
        const gnavSwiper = new Swiper(selector, {
            freeMode: true,
            slidesPerView: 'auto',
            mousewheel: true,
        });
    }

    if (sidebar) {
        const selector = sidebar.querySelector('.sidebar-swiper');
        const sidebarSwiper = new Swiper(selector, {
            direction: 'vertical',
            speed: 1000,
            loop: true,
            slidesPerView: 4,
            mousewheel: true,
            autoplay: {
                delay: 3000,
            },
        });
    }

    if (goTop) {
        const checkScroll = () => {
            if (scrollY > 40) {
                if (!goTop.classList.contains('_active'))
                    goTop.classList.add('_active')
            } else {
                if (goTop.classList.contains('_active'))
                    goTop.classList.remove('_active')
            }
        }

        document.addEventListener('scroll', checkScroll);
        checkScroll();

        goTop.addEventListener('click', () => {
            scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
    }

    if (sidebarTimer) {
        function getTimeRemaining(endtime) {
            let t = Date.parse(endtime) - Date.parse(new Date());
            let seconds = Math.floor((t / 1000) % 60);
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(endtime) {
            function updateClock() {
                let t = getTimeRemaining(endtime);

                let time = '0' + t.days;
                time += ' ' + ('0' + t.hours).slice(-2);
                time += ' ' + ('0' + t.minutes).slice(-2);
                time += ' ' + ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }

                sidebarTimer.querySelector('.sidebar-timer__digits').innerHTML = time;
            }

            updateClock();
            let timeinterval = setInterval(updateClock, 500);
        }

        let deadline = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        initializeClock(deadline);
    }
}();