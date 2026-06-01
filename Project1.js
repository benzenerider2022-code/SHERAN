document.addEventListener('DOMContentLoaded', () => {
    // --- 1. සියලුම DOM Elements තෝරා ගැනීම ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const listItems = document.querySelectorAll('#suggestionsList li');

    // Hot Foods Sub-sections (Fried Rice, Koththu, Biriyani, Noodles, Devilled)
    const categoryButtons = document.querySelectorAll('.category-btn');
    const subContents = document.querySelectorAll('.sub-content');

    // Grocery Sub-sections (Pantry, Snacks, Dairy, Household, Stationery)
    const gCategoryButtons = document.querySelectorAll('.g-category-btn');
    const gSubContents = document.querySelectorAll('.g-sub-content');

    // Household Sub-tabs (Laundry, Kitchen, Personal, Utilities)
    const hSubButtons = document.querySelectorAll('.h-sub-btn');
    const hTabContents = document.querySelectorAll('.h-tab-content');

    // Pantry Sub-tabs (Rice, Flour, Oils, Canned)
    const pSubButtons = document.querySelectorAll('.p-sub-btn');
    const pTabContents = document.querySelectorAll('.p-tab-content');

    // Dairy Sub-tabs (Milk Powders, Yogurt & Curd, Butter & Cheese)
    const dSubButtons = document.querySelectorAll('.d-sub-btn');
    const dTabContents = document.querySelectorAll('.d-tab-content');

    // Koththu Internal Sub-tabs (Standard, Cheese, Dolphin)
    const kSubButtons = document.querySelectorAll('.k-sub-btn');
    const kTabContents = document.querySelectorAll('.k-tab-content');

    // Bakery Internal Sub-tabs (Savoury Treats, Cakes)
    const bSubButtons = document.querySelectorAll('.b-sub-btn');
    const bTabContents = document.querySelectorAll('.b-tab-content');

    // Beverages & Snacks Sub-tabs (Beverages, Snacks)
    const sSubButtons = document.querySelectorAll('.s-sub-btn');
    const sTabContents = document.querySelectorAll('.s-tab-content');

    // Stationery & Books Sub-tabs (Books, Writing, Accessories)
    const stSubButtons = document.querySelectorAll('.st-sub-btn');
    const stTabContents = document.querySelectorAll('.st-tab-content');

    // 🎯 අලුත්: Milk & Powder Internal Sub-tabs
    const mpSubButtons = document.querySelectorAll('.mp-sub-btn');
    const mpTabContents = document.querySelectorAll('.mp-tab-content');


    // --- 2. SPA NAVIGATION (ප්‍රධාන මෙනු පිටු මාරු කිරීම) ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            changeSection(link.getAttribute('data-section'));
        });
    });

    function changeSection(sectionId) {
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

    // වෙබ් අඩවියේ ඇති සියලුම උප-මෙනු සඳහා Tabs ක්‍රියාත්මක කිරීම
    setupTabs(categoryButtons, subContents, 'data-sub');     // Hot Foods Tiers
    setupTabs(gCategoryButtons, gSubContents, 'data-gsub');   // Grocery Categories
    setupTabs(hSubButtons, hTabContents, 'data-hsub');         // Household Tabs
    setupTabs(pSubButtons, pTabContents, 'data-psub');         // Pantry Tabs
    setupTabs(dSubButtons, dTabContents, 'data-dsub');         // Dairy Tabs
    setupTabs(kSubButtons, kTabContents, 'data-ksub');         // Koththu Tabs
    setupTabs(bSubButtons, bTabContents, 'data-bsub');         // Bakery Tabs
    setupTabs(sSubButtons, sTabContents, 'data-ssub');         // Beverages & Snacks Tabs
    setupTabs(stSubButtons, stTabContents, 'data-stsub');       // Stationery & Books Tabs
    setupTabs(mpSubButtons, mpTabContents, 'data-mpsub');       // 🎯 අලුත්: Milk & Powder Internal Tabs


    // --- 4. SEARCH BAR LIVE FILTERING (සර්ච් බාර් ලයිව් ෆිල්ටරය) ---
    if (searchInput) {
        searchInput.addEventListener('focus', () => searchContainer.classList.add('active'));

        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) searchContainer.classList.remove('active');
        });

        searchInput.addEventListener('input', () => {
            const filterText = searchInput.value.toLowerCase();
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(filterText) ? '' : 'none';
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

            // 1. ප්‍රධාන පිටුව සක්‍රීය කිරීම
            changeSection(targetSection);

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

                const lowerFood = foodName.toLowerCase();

                // Beverages & Snacks සබ්-ටැබ් පාලනය
                if (targetGSub === 'snacks-section') {
                    sSubButtons.forEach(b => b.classList.remove('active'));
                    sTabContents.forEach(t => t.classList.remove('active'));

                    if (lowerFood.includes('cracker') || lowerFood.includes('snack') || lowerFood.includes('puff') || lowerFood.includes('biscuit') || lowerFood.includes('chips')) {
                        document.querySelector('[data-ssub="snack-tab"]').classList.add('active');
                        document.getElementById('snack-tab').style.display = 'block';
                        document.getElementById('bev-tab').style.display = 'none';
                    } else {
                        document.querySelector('[data-ssub="bev-tab"]').classList.add('active');
                        document.getElementById('bev-tab').style.display = 'block';
                        document.getElementById('snack-tab').style.display = 'none';
                    }
                }

                // Stationery & Books සබ්-ටැබ් පාලනය
                if (targetGSub === 'stationery-section') {
                    stSubButtons.forEach(b => b.classList.remove('active'));
                    stTabContents.forEach(t => t.classList.remove('active'));

                    if (lowerFood.includes('book') || lowerFood.includes('පොත්')) {
                        document.querySelector('[data-stsub="st-books"]').classList.add('active');
                        document.getElementById('st-books').style.display = 'block';
                        document.getElementById('st-writing').style.display = 'none';
                        document.getElementById('st-accessories').style.display = 'none';
                    } else if (lowerFood.includes('pen') || lowerFood.includes('pencil') || lowerFood.includes('පෑන') || lowerFood.includes('පැන්සල්')) {
                        document.querySelector('[data-stsub="st-writing"]').classList.add('active');
                        document.getElementById('st-writing').style.display = 'block';
                        document.getElementById('st-books').style.display = 'none';
                        document.getElementById('st-accessories').style.display = 'none';
                    } else {
                        document.querySelector('[data-stsub="st-accessories"]').classList.add('active');
                        document.getElementById('st-accessories').style.display = 'block';
                        document.getElementById('st-books').style.display = 'none';
                        document.getElementById('st-writing').style.display = 'none';
                    }
                }

                // Household & Cleaning සබ්-ටැබ් පාලනය (Sunsilk, Signal, Harpic...)
                if (targetGSub === 'household-section') {
                    hSubButtons.forEach(b => b.classList.remove('active'));
                    hTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('powder') || lowerFood.includes('sunlight') || lowerFood.includes('conditioning') || lowerFood.includes('සබන්') && lowerFood.includes('සන්ලයිට්') || lowerFood.includes('කුඩු')) {
                        document.querySelector('[data-hsub="laundry-care"]').classList.add('active');
                        document.getElementById('laundry-care').classList.add('active');
                        document.getElementById('laundry-care').style.display = 'block';
                    } else if (lowerFood.includes('shampoo') || lowerFood.includes('toothpaste') || lowerFood.includes('paste') || lowerFood.includes('dettol') || lowerFood.includes('lifebuoy') || lowerFood.includes('lux') || lowerFood.includes('kohomba') || lowerFood.includes('ඇඟ') || lowerFood.includes('ෂැම්පු') || lowerFood.includes('සිග්නල්')) {
                        document.querySelector('[data-hsub="personal-hygiene"]').classList.add('active');
                        document.getElementById('personal-hygiene').classList.add('active');
                        document.getElementById('personal-hygiene').style.display = 'block';
                    } else if (lowerFood.includes('vim') || lowerFood.includes('liquid') || lowerFood.includes('harpic') || lowerFood.includes('හාපික්') || lowerFood.includes('විම්')) {
                        document.querySelector('[data-hsub="home-kitchen"]').classList.add('active');
                        document.getElementById('home-kitchen').classList.add('active');
                        document.getElementById('home-kitchen').style.display = 'block';
                    } else {
                        document.querySelector('[data-hsub="utilities"]').classList.add('active');
                        document.getElementById('utilities').classList.add('active');
                        document.getElementById('utilities').style.display = 'block';
                    }
                }

                // 🎯 අලුත්: Dairy සෙක්ෂන් එක ඇතුළේ පිටිකිරි හෝ දියර කිරි ස්මාර්ට් නැවිගේෂන්
                if (targetGSub === 'dairy-section') {
                    mpSubButtons.forEach(b => b.classList.remove('active'));
                    mpTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });

                    if (lowerFood.includes('powder') || lowerFood.includes('anchor') || lowerFood.includes('maliban') || lowerFood.includes('පිටිකිරි')) {
                        document.querySelector('[data-mpsub="dairy-powder-tab"]').classList.add('active');
                        document.getElementById('dairy-powder-tab').classList.add('active');
                        document.getElementById('dairy-powder-tab').style.display = 'block';
                    } else if (lowerFood.includes('milk') || lowerFood.includes('fresh') || lowerFood.includes('kothamale') || lowerFood.includes('ambewela') || lowerFood.includes('highland') || lowerFood.includes('කිරි')) {
                        document.querySelector('[data-mpsub="dairy-milk-tab"]').classList.add('active');
                        document.getElementById('dairy-milk-tab').classList.add('active');
                        document.getElementById('dairy-milk-tab').style.display = 'block';
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
                    if (content.id === targetSub) content.classList.add('active');
                });

                if (foodName.toLowerCase().includes('cheese')) {
                    kSubButtons.forEach(b => b.classList.remove('active'));
                    kTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
                    document.querySelector('[data-ksub="cheese-koththu"]').classList.add('active');
                    document.getElementById('cheese-koththu').classList.add('active');
                    document.getElementById('cheese-koththu').style.display = 'block';
                } else if (foodName.toLowerCase().includes('dolphin')) {
                    kSubButtons.forEach(b => b.classList.remove('active'));
                    kTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
                    document.querySelector('[data-ksub="dolphin-koththu"]').classList.add('active');
                    document.getElementById('dolphin-koththu').classList.add('active');
                    document.getElementById('dolphin-koththu').style.display = 'block';
                } else if (targetSub === 'koththu-section') {
                    kSubButtons.forEach(b => b.classList.remove('active'));
                    kTabContents.forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
                    document.querySelector('[data-ksub="std-koththu"]').classList.add('active');
                    document.getElementById('std-koththu').classList.add('active');
                    document.getElementById('std-koththu').style.display = 'block';
                }
            }

            // සෙක්ෂන් එක සම්පූර්ණයෙන්ම Open වී අවසන් වන තෙක් මිලිසෙකන්ඩ් 100ක් ප්‍රමාද කර සිනිදුවට Scroll කිරීම
            setTimeout(() => {
                let targetEl = document.getElementById(targetSection);
                if (targetSection === 'icecream-section') {
                    targetEl = document.getElementById('icecream-section');
                }
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    });

    // --- 6. WHATSAPP PRIVATE COMPLAIN Form (රහසිගත පැමිණිලි යැවීම) ---
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
});


// =========================================================================
// ප්‍රධාන DOMContentLoaded එකෙන් පිටත තිබිය යුතු ශ්‍රිත (Direct HTML Onchange Calls)
// =========================================================================

// --- 7. INTERACTIVE ICE CREAM PRICE UPDATER (අයිස්ක්‍රීම් ප්‍රමාණ මාරු කිරීම) ---
function updateIceCreamPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- 8. CURD PRICE UPDATER (මුදවපු කිරි ප්‍රමාණ මාරු කිරීම) ---
function updateCurdPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.curd-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- 9. BEVERAGES PRICE UPDATER (පැණිබීම වර්ග ප්‍රමාණ මාරු කිරීම) ---
function updateBeveragePrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.bev-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- 10. SNACKS PRICE UPDATER (බිස්කට්/ස්නැක්ස් ප්‍රමාණ මාරු කිරීම) ---
function updateSnackPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.snack-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Cheese Koththu Variety and Price Updater ---
function updateCheeseKoththuPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.cheese-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Dolphin Koththu Variety and Price Updater ---
function updateDolphinKoththuPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.dolphin-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Noodles Variety and Price Updater ---
function updateNoodlesPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.noodles-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Salt Variety and Price Updater ---
function updateSaltPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.salt-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Soya Meat Variety and Price Updater ---
function updateSoyaPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.soya-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Washing Powder Price Updater ---
function updatePowderPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.powder-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Laundry Soap Price Updater ---
function updateLaundrySoapPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.laundry-soap-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Bathing Soap Price Updater ---
function updateBathingSoapPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.bathing-soap-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// 🎯 අලුත්: Liquid Milk Brand Price Updater
function updateLiquidMilkPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.liquid-milk-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// 🎯 අලුත්: Milk Powder Brand Price Updater
function updateMilkPowderPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.milk-powder-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// 🎯 අලුත්: Rice Brand Price Updater
function updateRicePrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.rice-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- 11. DISQUS COMMENTS WIDGET SETUP (පොදු කමෙන්ට්ස්) ---
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

// =========================================================================
// 🎯 MODERN TOGGLE SWITCH THEME LOGIC 🎯
// =========================================================================
(function () {
    const savedTheme = localStorage.getItem('site-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('checkbox');

    if (document.body.classList.contains('dark-theme')) {
        if (themeCheckbox) themeCheckbox.checked = true;
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
});
// =========================================================================
// 🎯 PERSONAL HYGIENE ADVANCED TABS & PRICE UPDATER LOGIC 🎯
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // ප්‍රධාන සනීපාරක්ෂක උප-ටැබ්ස් 5
    const hySubButtons = document.querySelectorAll('.hy-sub-btn');
    const hyTabContents = document.querySelectorAll('.hy-tab-content');

    // Hair Care ඇතුළත අභ්‍යන්තර ටැබ්ස් 3
    const hrSubButtons = document.querySelectorAll('.hr-sub-btn');
    const hrTabContentsInner = document.querySelectorAll('.hr-tab-content-inner');

    // පොදු setupTabs ශ්‍රිතය හරහා සක්‍රීය කිරීම
    if (hySubButtons.length && hyTabContents.length) {
        hySubButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                hySubButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = btn.getAttribute('data-hysub');
                hyTabContents.forEach(t => {
                    t.classList.remove('active');
                    t.style.display = (t.id === target) ? 'block' : 'none';
                });
            });
        });
    }

    if (hrSubButtons.length && hrTabContentsInner.length) {
        hrSubButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                hrSubButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const target = btn.getAttribute('data-hrsub');
                hrTabContentsInner.forEach(t => {
                    t.classList.remove('active');
                    t.style.display = (t.id === target) ? 'block' : 'none';
                });
            });
        });
    }
});

// 🎯 පොදු සනීපාරක්ෂක මිල ගණන් අප්ඩේට් කිරීමේ ශ්‍රිතය (Universal Price Updater)
function updateHygienePrice(selectElement, priceClass) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector(priceClass);
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}
// --- Sunsilk Shampoo Price Updater ---
function updateSunsilkPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.sunsilk-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Lifebuoy Shampoo Price Updater ---
function updateLifebuoyPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.lifebuoy-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}

// --- Clear Shampoo Price Updater ---
function updateClearPrice(selectElement) {
    const cardBody = selectElement.closest('.food-info');
    const priceDisplay = cardBody.querySelector('.clear-price-val');
    if (priceDisplay) {
        priceDisplay.style.opacity = 0;
        setTimeout(() => {
            priceDisplay.textContent = selectElement.value;
            priceDisplay.style.opacity = 1;
        }, 100);
    }
}
// --- Ice Cream Sub-Tabs Logic ---
const icSubButtons = document.querySelectorAll('.ic-sub-btn');
const icTabContents = document.querySelectorAll('.ic-tab-content');

icSubButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        icSubButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-icsub');
        icTabContents.forEach(t => {
            t.style.display = (t.id === target) ? 'block' : 'none';
        });
    });
});
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // තත්පර 4ක් (4000ms) පෙන්වයි
}
document.querySelectorAll('.st-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // සියලු buttons අක්‍රිය කරන්න
        document.querySelectorAll('.st-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // සියලු tabs සඟවන්න
        document.querySelectorAll('.st-tab-content').forEach(tab => tab.style.display = 'none');

        // අදාළ tab එක පෙන්වන්න
        document.getElementById(btn.getAttribute('data-stsub')).style.display = 'block';
    });
});
function updateToothpastePrice(selectElement) {
    // තෝරාගත් select box එකේ සිට එහි ළඟම ඇති price-val span එක සොයාගනී
    let priceSpan = selectElement.parentElement.parentElement.querySelector('.tp-price-val');
    priceSpan.innerText = selectElement.value;
}
function updateOralPrice(selectElement, priceClass) {
    // තෝරාගත් select box එකේ සිට එහි ළඟම ඇති price class එක සහිත span එක සොයාගනී
    let parent = selectElement.parentElement.parentElement;
    let priceSpan = parent.querySelector(priceClass);
    priceSpan.innerText = selectElement.value;
}
function updateOralPrice(selectElement, priceClass) {
    let parent = selectElement.parentElement.parentElement;
    let priceSpan = parent.querySelector(priceClass);
    priceSpan.innerText = selectElement.value;
}
function updateSkinPrice(selectElement, priceClass) {
    let parent = selectElement.parentElement;
    let priceSpan = parent.parentElement.querySelector(priceClass);
    priceSpan.innerText = selectElement.value;
}
function updateLaundryPrice(selectElement, priceClass) {
    // තෝරාගත් select box එකේ සිට එහි ළඟම ඇති price class එක සහිත span එක සොයාගනී
    let parent = selectElement.parentElement;
    let priceSpan = parent.parentElement.querySelector(priceClass);
    priceSpan.innerText = selectElement.value;
}
// මෙම කේතය ඔබේ බොත්තම් සඳහා තිබිය යුතුයි
document.querySelectorAll('.st-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // සියලුම Stationery tab content සඟවන්න
        document.querySelectorAll('.st-tab-content').forEach(tab => {
            tab.style.display = 'none';
        });

        // අදාළ බොත්තම එබූ විට පමණක් එම tab එක පෙන්වන්න
        const target = btn.getAttribute('data-stsub');
        document.getElementById(target).style.display = 'block';
    });
});
function updateMaggiPrice(selectElement) {
    let parent = selectElement.parentElement;
    let priceSpan = parent.querySelector('.maggi-price-val');
    priceSpan.innerText = selectElement.value;
}
function updatePrice() {
    // තෝරාගත් ප්‍රමාණයේ මිල ලබා ගැනීම
    const price = document.getElementById("salmonSize").value;
    // මිල දර්ශනය කරන span එකට අගය ඇතුළත් කිරීම
    document.getElementById("displayPrice").innerText = price;
}
function updateMilkPrice() {
    // තෝරාගත් ප්‍රමාණයේ මිල ලබා ගැනීම
    const price = document.getElementById("milkSize").value;
    // මිල දර්ශනය කරන span එකට අගය ඇතුළත් කිරීම
    document.getElementById("displayMilkPrice").innerText = price;
}
function updateLaundryPrice() {
    // තෝරාගත් ප්‍රමාණයේ මිල ලබා ගැනීම
    const price = document.getElementById("laundrySize").value;

    // මිල පෙන්වන span එකේ අගය යාවත්කාලීන කිරීම
    document.getElementById("laundryPrice").innerText = price;
}
function updatePrice(selectElement, priceClass) {
    // තෝරාගත් select එකේ අගය ලබා ගැනීම
    const price = selectElement.value;
    // අදාළ span එකේ මිල වෙනස් කිරීම
    selectElement.parentElement.querySelector(priceClass).innerText = price;
}

// Sub-tab මාරු කිරීමේ JavaScript
document.querySelectorAll('.hy-sub-btn').forEach(button => {
    button.addEventListener('click', () => {
        // සියලුම contents hide කරන්න
        document.querySelectorAll('.hy-tab-content').forEach(content => content.style.display = 'none');
        // අදාළ content එක පෙන්වන්න
        document.getElementById(button.getAttribute('data-hysub')).style.display = 'block';

        // Active class එක කළමනාකරණය
        document.querySelectorAll('.hy-sub-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});
function updateKistPrice(selectElement) {
    const priceDisplay = selectElement.parentElement.parentElement.querySelector('.kist-price-val');
    priceDisplay.innerText = selectElement.value;
}
function updateBeediPrice(selectElement) {
    const priceDisplay = selectElement.parentElement.parentElement.querySelector('.beedi-price-val');
    priceDisplay.innerText = selectElement.value;
}
let currentIndex = 0;
const wrapper = document.getElementById('slidesWrapper');
const items = document.querySelectorAll('.slide-item');

function autoSlide() {
    currentIndex++;

    // පින්තූර 5ම අවසන් වූ පසු නැවත මුලට ඒම
    if (currentIndex > items.length - 4) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 25; // 25% බැගින් වමට චලනය වේ
    wrapper.style.transform = `translateX(${offset}%)`;
}

// සෑම තත්පර 4කට වරක් ක්‍රියාත්මක වේ
setInterval(autoSlide, 4000);

// නිදසුනක් ලෙස, බොත්තම් ක්‍රියාත්මක වන ආකාරය
const stButtons = document.querySelectorAll('.st-btn');
const stTabs = document.querySelectorAll('.st-tab-content');

stButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // සියලුම බොත්තම් වලින් 'active' class එක ඉවත් කිරීම
        stButtons.forEach(b => b.classList.remove('active'));
        // ක්ලික් කළ බොත්තමට 'active' class එක එකතු කිරීම
        btn.classList.add('active');

        // අදාළ Tab එක පෙන්වීම
        const target = btn.getAttribute('data-stsub');
        stTabs.forEach(tab => {
            tab.style.display = tab.id === target ? 'block' : 'none';
        });
    });
});
