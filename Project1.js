document.addEventListener('DOMContentLoaded', () => {
    // --- 1. සියලුම DOM Elements තෝරා ගැනීම ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const suggestionsList = document.getElementById('suggestionsList');
    const listItems = document.querySelectorAll('#suggestionsList li');

    // Hot Foods Sub-sections
    const categoryButtons = document.querySelectorAll('.category-btn');
    const subContents = document.querySelectorAll('.sub-content');

    // Grocery Sub-sections
    const gCategoryButtons = document.querySelectorAll('.g-category-btn');
    const gSubContents = document.querySelectorAll('.g-sub-content');

    // Household Sub-tabs
    const hSubButtons = document.querySelectorAll('.h-sub-btn');
    const hTabContents = document.querySelectorAll('.h-tab-content');

    // Pantry Sub-tabs
    const pSubButtons = document.querySelectorAll('.p-sub-btn');
    const pTabContents = document.querySelectorAll('.p-tab-content');

    // Dairy Sub-tabs
    const dSubButtons = document.querySelectorAll('.d-sub-btn');
    const dTabContents = document.querySelectorAll('.d-tab-content');

    // Koththu Internal Sub-tabs
    const kSubButtons = document.querySelectorAll('.k-sub-btn');
    const kTabContents = document.querySelectorAll('.k-tab-content');

    // Bakery Internal Sub-tabs
    const bSubButtons = document.querySelectorAll('.b-sub-btn');
    const bTabContents = document.querySelectorAll('.b-tab-content');

    // Beverages & Snacks Sub-tabs
    const sSubButtons = document.querySelectorAll('.s-sub-btn');
    const sTabContents = document.querySelectorAll('.s-tab-content');

    // Stationery & Books Sub-tabs
    const stSubButtons = document.querySelectorAll('.st-sub-btn');
    const stTabContents = document.querySelectorAll('.st-tab-content');
    const stButtons = document.querySelectorAll('.st-btn'); // Combined for stationery buttons

    // Milk & Powder Internal Sub-tabs
    const mpSubButtons = document.querySelectorAll('.mp-sub-btn');
    const mpTabContents = document.querySelectorAll('.mp-tab-content');

    // Personal Hygiene Sub-tabs
    const hySubButtons = document.querySelectorAll('.hy-sub-btn');
    const hyTabContents = document.querySelectorAll('.hy-tab-content');
    const hrSubButtons = document.querySelectorAll('.hr-sub-btn');
    const hrTabContentsInner = document.querySelectorAll('.hr-tab-content-inner');

    // Ice Cream Sub-Tabs
    const icSubButtons = document.querySelectorAll('.ic-sub-btn');
    const icTabContents = document.querySelectorAll('.ic-tab-content');


    // --- 2. SPA NAVIGATION (ප්‍රධාන මෙනු පිටු මාරු කිරීම) ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            changeSection(link.getAttribute('data-section'));
        });
    });

    function changeSection(sectionId) {
        if (!sectionId) return;
        navLinks.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) item.classList.add('active');
        });
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) section.classList.add('active');
        });
    }


    // --- 3. TABS SWITCHING LOGIC (උප-ටැබ් මාරු කිරීමේ පොදු ශ්‍රිතය) ---
    function setupTabs(buttons, tabs, attribute) {
        if (!buttons.length || !tabs.length) return;
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = btn.getAttribute(attribute);
                tabs.forEach(t => {
                    t.classList.remove('active');
                    if (t.id === target) {
                        t.classList.add('active');
                        t.style.display = 'block';
                    } else {
                        t.style.display = 'none';
                    }
                });
            });
        });
    }

    // සියලුම උප-මෙනු සඳහා Tabs ක්‍රියාත්මක කිරීම
    setupTabs(categoryButtons, subContents, 'data-sub');     // Hot Foods Tiers
    setupTabs(gCategoryButtons, gSubContents, 'data-gsub');   // Grocery Categories
    setupTabs(hSubButtons, hTabContents, 'data-hsub');         // Household Tabs
    setupTabs(pSubButtons, pTabContents, 'data-psub');         // Pantry Tabs
    setupTabs(dSubButtons, dTabContents, 'data-dsub');         // Dairy Tabs
    setupTabs(kSubButtons, kTabContents, 'data-ksub');         // Koththu Tabs
    setupTabs(bSubButtons, bTabContents, 'data-bsub');         // Bakery Tabs
    setupTabs(sSubButtons, sTabContents, 'data-ssub');         // Beverages & Snacks Tabs
    setupTabs(stSubButtons, stTabContents, 'data-stsub');       // Stationery & Books Sub-tabs
    setupTabs(mpSubButtons, mpTabContents, 'data-mpsub');       // Milk & Powder Internal Tabs
    setupTabs(hySubButtons, hyTabContents, 'data-hysub');       // Personal Hygiene Tabs
    setupTabs(hrSubButtons, hrTabContentsInner, 'data-hrsub'); // Hair Care Inner Tabs
    setupTabs(icSubButtons, icTabContents, 'data-icsub');       // Ice Cream Tabs
    setupTabs(stButtons, stTabContents, 'data-stsub');         // Stationery Main Buttons


    // --- 4. SEARCH BAR LIVE FILTERING & TOGGLE ---
    if (searchInput && searchContainer) {
        searchInput.addEventListener('focus', () => {
            searchContainer.classList.add('active');
        });

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
                if (suggestionsList) suggestionsList.style.display = 'none';
            }
        });

        searchInput.addEventListener('input', () => {
            const filterText = searchInput.value.toLowerCase();
            if (suggestionsList) {
                suggestionsList.style.display = filterText.length > 0 ? 'block' : 'none';
            }
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filterText) ? 'block' : 'none';
            });
        });
    }


    // --- 5. SMART SEARCH SELECTION (සර්ච් ප්‍රතිඵල ක්ලික් කළ විට එතැනට යාම) ---
    listItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const link = item.querySelector('a');
            if (!link) return;

            const foodName = link.textContent;
            const targetSection = link.getAttribute('data-section');
            const targetSub = link.getAttribute('data-sub');
            const targetGSub = link.getAttribute('data-gsub');

            searchInput.value = foodName;
            searchContainer.classList.remove('active');
            if (suggestionsList) suggestionsList.style.display = 'none';

            // 1. ප්‍රධාන පිටුව සක්‍රීය කිරීම
            changeSection(targetSection);

            const lowerFood = foodName.toLowerCase();

            // 2. GROCERY සෙක්ෂන් එක ඇතුළේ ස්මාර්ට් නැවිගේෂන්
            if (targetSection === 'grocery' && targetGSub) {
                gCategoryButtons.forEach(b => b.classList.remove('active'));
                gSubContents.forEach(c => {
                    c.classList.remove('active');
                    c.style.display = 'none';
                });

                const gTabBtn = document.querySelector(`[data-gsub="${targetGSub}"]`);
                if (gTabBtn) gTabBtn.classList.add('active');
                const gTabContent = document.getElementById(targetGSub);
                if (gTabContent) {
                    gTabContent.classList.add('active');
                    gTabContent.style.display = 'block';
                }

                // PANTRY සබ්-ටැබ් පාලනය
                if (targetGSub === 'pantry-section') {
                    pSubButtons.forEach(b => b.classList.remove('active'));
                    pTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('rice') || lowerFood.includes('හාල්') || lowerFood.includes('සම්බා') || lowerFood.includes('නාඩු')) {
                        document.querySelector('[data-psub="pantry-rice-tab"]')?.classList.add('active');
                        const riceTab = document.getElementById('pantry-rice-tab');
                        if (riceTab) { riceTab.classList.add('active'); riceTab.style.display = 'block'; }
                    } else if (lowerFood.includes('flour') || lowerFood.includes('පිටි')) {
                        document.querySelector('[data-psub="pantry-flour-tab"]')?.classList.add('active');
                        const flourTab = document.getElementById('pantry-flour-tab');
                        if (flourTab) { flourTab.classList.add('active'); flourTab.style.display = 'block'; }
                    } else {
                        pSubButtons[0]?.classList.add('active');
                        if (pTabContents[0]) pTabContents[0].style.display = 'block';
                    }
                }

                // Beverages & Snacks සබ්-ටැබ් පාලනය
                if (targetGSub === 'snacks-section') {
                    sSubButtons.forEach(b => b.classList.remove('active'));
                    sTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('cracker') || lowerFood.includes('snack') || lowerFood.includes('puff') || lowerFood.includes('biscuit') || lowerFood.includes('chips') || lowerFood.includes('chocolate')) {
                        document.querySelector('[data-ssub="snack-tab"]')?.classList.add('active');
                        const snackTab = document.getElementById('snack-tab');
                        if (snackTab) { snackTab.classList.add('active'); snackTab.style.display = 'block'; }
                    } else {
                        document.querySelector('[data-ssub="bev-tab"]')?.classList.add('active');
                        const bevTab = document.getElementById('bev-tab');
                        if (bevTab) { bevTab.classList.add('active'); bevTab.style.display = 'block'; }
                    }
                }

                // Stationery & Books සබ්-ටැබ් පාලනය
                if (targetGSub === 'stationery-section') {
                    stSubButtons.forEach(b => b.classList.remove('active'));
                    stTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('book') || lowerFood.includes('පොත්')) {
                        document.querySelector('[data-stsub="st-books"]')?.classList.add('active');
                        if (document.getElementById('st-books')) document.getElementById('st-books').style.display = 'block';
                    } else if (lowerFood.includes('pen') || lowerFood.includes('pencil') || lowerFood.includes('පෑන') || lowerFood.includes('පැන්සල්')) {
                        document.querySelector('[data-stsub="st-writing"]')?.classList.add('active');
                        if (document.getElementById('st-writing')) document.getElementById('st-writing').style.display = 'block';
                    } else {
                        document.querySelector('[data-stsub="st-accessories"]')?.classList.add('active');
                        if (document.getElementById('st-accessories')) document.getElementById('st-accessories').style.display = 'block';
                    }
                }

                // Household & Cleaning සබ්-ටැබ් පාලනය
                if (targetGSub === 'household-section') {
                    hSubButtons.forEach(b => b.classList.remove('active'));
                    hTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('powder') || lowerFood.includes('sunlight') || lowerFood.includes('conditioning') || (lowerFood.includes('සබන්') && lowerFood.includes('සන්ලයිට්')) || lowerFood.includes('කුඩු')) {
                        document.querySelector('[data-hsub="laundry-care"]')?.classList.add('active');
                        if (document.getElementById('laundry-care')) document.getElementById('laundry-care').style.display = 'block';
                    } else if (lowerFood.includes('shampoo') || lowerFood.includes('toothpaste') || lowerFood.includes('paste') || lowerFood.includes('dettol') || lowerFood.includes('lifebuoy') || lowerFood.includes('lux') || lowerFood.includes('kohomba') || lowerFood.includes('ඇඟ') || lowerFood.includes('ෂැම්පු') || lowerFood.includes('සිග්නල්') || lowerFood.includes('hygiene')) {
                        document.querySelector('[data-hsub="personal-hygiene"]')?.classList.add('active');
                        if (document.getElementById('personal-hygiene')) document.getElementById('personal-hygiene').style.display = 'block';
                    } else if (lowerFood.includes('vim') || lowerFood.includes('liquid') || lowerFood.includes('harpic') || lowerFood.includes('හාපික්') || lowerFood.includes('විම්')) {
                        document.querySelector('[data-hsub="home-kitchen"]')?.classList.add('active');
                        if (document.getElementById('home-kitchen')) document.getElementById('home-kitchen').style.display = 'block';
                    } else {
                        document.querySelector('[data-hsub="utilities"]')?.classList.add('active');
                        if (document.getElementById('utilities')) document.getElementById('utilities').style.display = 'block';
                    }
                }

                // Dairy සෙක්ෂන් එක ඇතුළේ ස්මාර්ට් නැවිගේෂන්
                if (targetGSub === 'dairy-section') {
                    mpSubButtons.forEach(b => b.classList.remove('active'));
                    mpTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('powder') || lowerFood.includes('anchor') || lowerFood.includes('maliban') || lowerFood.includes('පිටිකිරි') || lowerFood.includes('sustagen') || lowerFood.includes('lactogen') || lowerFood.includes('nangrow')) {
                        document.querySelector('[data-mpsub="dairy-powder-tab"]')?.classList.add('active');
                        if (document.getElementById('dairy-powder-tab')) document.getElementById('dairy-powder-tab').style.display = 'block';
                    } else {
                        document.querySelector('[data-mpsub="dairy-milk-tab"]')?.classList.add('active');
                        if (document.getElementById('dairy-milk-tab')) document.getElementById('dairy-milk-tab').style.display = 'block';
                    }
                }
            }

            // 3. HOT FOODS සෙක්ෂන් එක ඇතුළේ ස්මාර්ට් නැවිගේෂන්
            if (targetSection === 'hotfoods' && targetSub) {
                categoryButtons.forEach(b => {
                    b.classList.remove('active');
                    if (b.getAttribute('data-sub') === targetSub) b.classList.add('active');
                });

                subContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = (content.id === targetSub) ? 'block' : 'none';
                });

                if (lowerFood.includes('cheese')) {
                    kSubButtons.forEach(b => b.classList.remove('active'));
                    kTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
                    document.querySelector('[data-ksub="cheese-koththu"]')?.classList.add('active');
                    if (document.getElementById('cheese-koththu')) document.getElementById('cheese-koththu').style.display = 'block';
                } else if (lowerFood.includes('dolphin')) {
                    kSubButtons.forEach(b => b.classList.remove('active'));
                    kTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
                    document.querySelector('[data-ksub="dolphin-koththu"]')?.classList.add('active');
                    if (document.getElementById('dolphin-koththu')) document.getElementById('dolphin-koththu').style.display = 'block';
                } else if (targetSub === 'koththu-section') {
                    kSubButtons.forEach(b => b.classList.remove('active'));
                    kTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
                    document.querySelector('[data-ksub="std-koththu"]')?.classList.add('active');
                    if (document.getElementById('std-koththu')) document.getElementById('std-koththu').style.display = 'block';
                }
            }

            // 4. BAKERY සෙක්ෂන් එක ඇතුළේ ස්මාර්ට් නැවිගේෂන්
            if (targetSection === 'bakery' && targetSub) {
                bSubButtons.forEach(b => b.classList.remove('active'));
                bTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                const bakeryBtn = document.querySelector(`[data-bsub="${targetSub}"]`);
                if (bakeryBtn) bakeryBtn.classList.add('active');

                const bakeryTab = document.getElementById(targetSub);
                if (bakeryTab) {
                    bakeryTab.classList.add('active');
                    bakeryTab.style.display = 'block';
                }
            }

            // Smooth Scroll කිරීම
            setTimeout(() => {
                let targetEl = document.getElementById(targetSection);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    });

    // --- 6. WHATSAPP PRIVATE COMPLAIN FORM ---
    const complainForm = document.getElementById('complainForm');
    if (complainForm) {
        complainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('compName').value;
            const complainText = document.getElementById('compMessage').value;
            const myPhoneNumber = "94763628154";
            const message = `🚨 *NEW PRIVATE COMPLAIN* 🚨\n\n*Customer Name:* ${name}\n*Complain:* ${complainText}`;
            window.open(`https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            complainForm.reset();
        });
    }

    // --- 7. MODERN TOGGLE SWITCH THEME LOGIC ---
    const themeCheckbox = document.getElementById('checkbox');
    if (document.body.classList.contains('dark-theme') && themeCheckbox) {
        themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('site-theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('site-theme', 'light');
            }
        });
    }

    // --- 8. HERO SLIDER LOGIC ---
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length > 0) {
        function showSlides() {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if (slideIndex > slides.length) { slideIndex = 1; }
            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000);
        }
        showSlides();
    }

    // --- 9. CAROUSEL AUTO SLIDE LOGIC ---
    let currentIndex = 0;
    const wrapper = document.getElementById('slidesWrapper');
    const items = document.querySelectorAll('.slide-item');
    if (wrapper && items.length > 0) {
        function autoSlide() {
            currentIndex++;
            if (currentIndex > items.length - 4) {
                currentIndex = 0;
            }
            const offset = -currentIndex * 25;
            wrapper.style.transform = `translateX(${offset}%)`;
        }
        setInterval(autoSlide, 4000);
    }
});

// =========================================================================
// GLOBAL PRICE UPDATER FUNCTIONS (Direct HTML Onchange Calls)
// =========================================================================

// පොදු මිල යාවත්කාලීන කිරීමේ මූලික ශ්‍රිතය (Helper Function)
function basePriceUpdater(selectElement, priceClass) {
    const cardBody = selectElement.closest('.food-info') || selectElement.parentElement.parentElement || selectElement.parentElement;
    const priceDisplay = cardBody.querySelector(priceClass);
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.innerText = selectElement.value; // Fallback for innerText items
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

function updateIceCreamPrice(selectElement) { basePriceUpdater(selectElement, '.price-val'); }
function updateCurdPrice(selectElement) { basePriceUpdater(selectElement, '.curd-price-val'); }
function updateBeveragePrice(selectElement) { basePriceUpdater(selectElement, '.bev-price-val'); }
function updateSnackPrice(selectElement) { basePriceUpdater(selectElement, '.snack-price-val'); }
function updateCheeseKoththuPrice(selectElement) { basePriceUpdater(selectElement, '.cheese-price-val'); }
function updateDolphinKoththuPrice(selectElement) { basePriceUpdater(selectElement, '.dolphin-price-val'); }
function updateNoodlesPrice(selectElement) { basePriceUpdater(selectElement, '.noodles-price-val'); }
function updateSaltPrice(selectElement) { basePriceUpdater(selectElement, '.salt-price-val'); }
function updateSoyaPrice(selectElement) { basePriceUpdater(selectElement, '.soya-price-val'); }
function updatePowderPrice(selectElement) { basePriceUpdater(selectElement, '.powder-price-val'); }
function updateLaundrySoapPrice(selectElement) { basePriceUpdater(selectElement, '.laundry-soap-price-val'); }
function updateBathingSoapPrice(selectElement) { basePriceUpdater(selectElement, '.bathing-soap-price-val'); }
function updateLiquidMilkPrice(selectElement) { basePriceUpdater(selectElement, '.liquid-milk-price-val'); }
function updateMilkPowderPrice(selectElement) { basePriceUpdater(selectElement, '.milk-powder-price-val'); }
function updateRicePrice(selectElement) { basePriceUpdater(selectElement, '.rice-price-val'); }
function updateSunsilkPrice(selectElement) { basePriceUpdater(selectElement, '.sunsilk-price-val'); }
function updateLifebuoyPrice(selectElement) { basePriceUpdater(selectElement, '.lifebuoy-price-val'); }
function updateClearPrice(selectElement) { basePriceUpdater(selectElement, '.clear-price-val'); }
function updateToothpastePrice(selectElement) { basePriceUpdater(selectElement, '.tp-price-val'); }
function updateMaggiPrice(selectElement) { basePriceUpdater(selectElement, '.maggi-price-val'); }
function updateKistPrice(selectElement) { basePriceUpdater(selectElement, '.kist-price-val'); }
function updateBeediPrice(selectElement) { basePriceUpdater(selectElement, '.beedi-price-val'); }

function updateHygienePrice(selectElement, priceClass) { basePriceUpdater(selectElement, priceClass); }
function updateOralPrice(selectElement, priceClass) { basePriceUpdater(selectElement, priceClass); }
function updateSkinPrice(selectElement, priceClass) { basePriceUpdater(selectElement, priceClass); }
function updateLaundryPrice(selectElement, priceClass) { basePriceUpdater(selectElement, priceClass); }
function updatePrice(selectElement, priceClass) { basePriceUpdater(selectElement, priceClass); }

// ID මත පදනම් වූ විශේෂිත මිල යාවත්කාලීන කිරීම්
function updateSalmonPrice() {
    const el = document.getElementById("salmonSize");
    const display = document.getElementById("displayPrice");
    if (el && display) display.innerText = el.value;
}
function updateMilkPrice() {
    const el = document.getElementById("milkSize");
    const display = document.getElementById("displayMilkPrice");
    if (el && display) display.innerText = el.value;
}
function updateLaundryPriceId() {
    const el = document.getElementById("laundrySize");
    const display = document.getElementById("laundryPrice");
    if (el && display) display.innerText = el.value;
}

// --- 10. DISQUS COMMENTS WIDGET SETUP ---
var disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = window.location.pathname;
};

(function () {
    var d = document, s = d.createElement('script');
    s.src = 'https://sheran-super-bakers.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();

// Dark theme ක්ෂණිකව ක්‍රියාත්මක කිරීම (Flicker වීම වැළැක්වීමට)
(function () {
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
})();
