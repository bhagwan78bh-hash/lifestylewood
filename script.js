/**
 * lifestylewood — Interactive Experience Script
 * Modern, accessible, zero-dependency client script
 */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================
  // 1. Native <dialog> Modal Management (Terms & Privacy)
  // Compliant with modern-web-guidance for Dialogs
  // ========================================================
  const termsDialog = document.getElementById('terms-dialog');
  const privacyDialog = document.getElementById('privacy-dialog');

  const btnOpenTerms = document.getElementById('btn-open-terms');
  const btnOpenTermsInline = document.getElementById('btn-open-terms-inline');
  const btnOpenPrivacy = document.getElementById('btn-open-privacy');
  const btnOpenPrivacyInline = document.getElementById('btn-open-privacy-inline');

  const openModal = (dialog) => {
    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  };

  if (btnOpenTerms) btnOpenTerms.addEventListener('click', () => openModal(termsDialog));
  if (btnOpenTermsInline) btnOpenTermsInline.addEventListener('click', () => openModal(termsDialog));

  if (btnOpenPrivacy) btnOpenPrivacy.addEventListener('click', () => openModal(privacyDialog));
  if (btnOpenPrivacyInline) btnOpenPrivacyInline.addEventListener('click', () => openModal(privacyDialog));

  // Light-dismiss click-outside fallback for browsers where closedby="any" is not yet native
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const outside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
      let pressedOutside = false;
      dialog.addEventListener('pointerdown', (e) => {
        pressedOutside = outside(e, dialog);
      });
      dialog.addEventListener('pointerup', (e) => {
        if (pressedOutside && outside(e, dialog)) {
          dialog.close();
        }
      });
    }
  }

  // ========================================================
  // 2. Mobile Navigation Menu Toggle
  // ========================================================
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('nav-open');
    });

    // Close menu when a navigation anchor is clicked
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========================================================
  // 3. Species Filter Controls
  // ========================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const speciesCards = document.querySelectorAll('.species-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      speciesCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ========================================================
  // 4. Room-by-Room Guide Tabs
  // ========================================================
  const roomTabBtns = document.querySelectorAll('.room-tab-btn');
  const roomPanes = document.querySelectorAll('.room-content-pane');

  roomTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roomTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetRoom = btn.getAttribute('data-room');
      roomPanes.forEach(pane => {
        if (pane.id === `pane-${targetRoom}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // ========================================================
  // 5. Interactive Tone & Texture Studio Engine
  // ========================================================
  const timberData = {
    oak: {
      title: "European White Oak",
      desc: "Pale, tranquil, and modern with warm sandy undertones. Creates a spacious, light-drenched Scandinavian atmosphere.",
      gradient: "linear-gradient(135deg, #E6D5C3 0%, #CBB094 50%, #B89977 100%)",
      accentName: "American Black Walnut",
      accentNote: "Provides sharp, sophisticated depth and anchors floating pale oak floors.",
      accentBg: "#412A1D",
      paints: [
        { name: "Alabaster Linen", hex: "#F4F0EA" },
        { name: "Desert Sage", hex: "#7E8C78" },
        { name: "Warm Greige", hex: "#D6CEC5" }
      ],
      textiles: ["Washed Belgian Linen", "Bouclé Sheepskin", "Chunky Raw Wool"],
      metalText: "Brushed Warm Brass & Matte Black",
      metalGrad: "linear-gradient(135deg, #ECC480 0%, #C4984F 100%)"
    },
    walnut: {
      title: "American Black Walnut",
      desc: "Rich espresso and roasted cocoa tones with exquisite fluid grain. Evokes mid-century elegance and grounded architectural luxury.",
      gradient: "linear-gradient(135deg, #4D3325 0%, #382419 50%, #20130C 100%)",
      accentName: "Sugar Maple & Bleached Ash",
      accentNote: "A 90-degree high-contrast pair that prevents dark rooms from feeling heavy.",
      accentBg: "#EDE0D2",
      paints: [
        { name: "Crisp Chalk White", hex: "#FAF8F5" },
        { name: "Moody Slate Blue", hex: "#4C5B64" },
        { name: "Terracotta Clay", hex: "#B86348" }
      ],
      textiles: ["Forest Green Velvet", "Cognac Top-Grain Leather", "Oatmeal Chenille"],
      metalText: "Antique Burnished Bronze & Aged Copper",
      metalGrad: "linear-gradient(135deg, #B87333 0%, #87491C 100%)"
    },
    teak: {
      title: "Golden Plantation Teak",
      desc: "Honey-amber glow infused with natural oils. Conveys relaxed tropical modernism, coastal refinement, and organic endurance.",
      gradient: "linear-gradient(135deg, #D99B59 0%, #BA7738 50%, #8F5420 100%)",
      accentName: "Rift-Sawn White Oak",
      accentNote: "Softens golden yellow pigments while maintaining an airy, sun-kissed ambiance.",
      accentBg: "#CDB69E",
      paints: [
        { name: "Warm Lime Plaster", hex: "#F3ECE1" },
        { name: "Eucalyptus Mist", hex: "#9DB39E" },
        { name: "Warm Ochre", hex: "#D9A25E" }
      ],
      textiles: ["Hand-Braided Jute", "Natural Flax Cotton", "Organic Hemp Weave"],
      metalText: "Hand-Hammered Brass & Satin Nickel",
      metalGrad: "linear-gradient(135deg, #F0D078 0%, #C59E36 100%)"
    },
    blackened: {
      title: "Shou Sugi Ban (Blackened Ash)",
      desc: "Charred and oil-cured architectural timber featuring profound charcoal grain relief. Bold, monastic, and distinctly sculptural.",
      gradient: "linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 50%, #0F0F0F 100%)",
      accentName: "Warm Honey Teak",
      accentNote: "Infuses radiant amber warmth directly against the stark charred grain.",
      accentBg: "#B57339",
      paints: [
        { name: "Honed Off-White", hex: "#ECEAE4" },
        { name: "Raw Umber", hex: "#6A5C50" },
        { name: "Olive Moss", hex: "#56614D" }
      ],
      textiles: ["Smoked Ribbed Glass", "Natural Yak Wool", "Raw Unbleached Silk"],
      metalText: "Matte Blackened Iron & Brushed Gunmetal",
      metalGrad: "linear-gradient(135deg, #5A5A5A 0%, #222222 100%)"
    }
  };

  const toneBtns = document.querySelectorAll('.tone-btn');
  const swatchBase = document.getElementById('swatch-base');
  const displayTitle = document.getElementById('display-timber-title');
  const displayDesc = document.getElementById('display-timber-desc');
  const swatchAccent = document.getElementById('swatch-accent');
  const displayAccentName = document.getElementById('display-accent-name');
  const displayAccentNote = document.getElementById('display-accent-note');
  const displayPaints = document.getElementById('display-paints');
  const displayTextiles = document.getElementById('display-textiles');
  const displayMetalText = document.getElementById('display-metal-text');
  const displayMetalDot = document.getElementById('display-metal-dot');

  const updateStudio = (timberKey) => {
    const data = timberData[timberKey];
    if (!data) return;

    // Update Base
    swatchBase.style.background = data.gradient;
    displayTitle.textContent = data.title;
    displayDesc.textContent = data.desc;

    // Update Accent
    swatchAccent.style.background = data.accentBg;
    displayAccentName.textContent = data.accentName;
    displayAccentNote.textContent = data.accentNote;

    // Update Paints
    displayPaints.innerHTML = '';
    data.paints.forEach(paint => {
      const chip = document.createElement('div');
      chip.className = 'swatch-chip';
      chip.innerHTML = `
        <span class="chip-circle" style="background-color: ${paint.hex};"></span>
        <span>${paint.name}</span>
      `;
      displayPaints.appendChild(chip);
    });

    // Update Textiles
    displayTextiles.innerHTML = '';
    data.textiles.forEach(textile => {
      const tag = document.createElement('span');
      tag.className = 'material-tag';
      tag.textContent = textile;
      displayTextiles.appendChild(tag);
    });

    // Update Metals
    displayMetalText.textContent = data.metalText;
    displayMetalDot.style.background = data.metalGrad;
  };

  toneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toneBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-timber');
      updateStudio(key);
    });
  });

  // Initialize with default (oak)
  updateStudio('oak');

  // ========================================================
  // 6. Lookbook Newsletter Form Submission Simulation
  // ========================================================
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');

  if (newsletterForm && newsletterStatus) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('subscriber-email');
      const email = emailInput ? emailInput.value : '';

      if (email) {
        newsletterStatus.textContent = `✨ Thank you! The 2026 lifestylewood Lookbook has been sent to ${email}. Check your inbox shortly.`;
        newsletterStatus.className = 'form-status-msg success';
        newsletterForm.reset();

        setTimeout(() => {
          newsletterStatus.style.transition = 'opacity 0.6s ease';
          newsletterStatus.style.opacity = '0';
          setTimeout(() => {
            newsletterStatus.className = 'form-status-msg';
            newsletterStatus.style.opacity = '1';
            newsletterStatus.textContent = '';
          }, 600);
        }, 8000);
      }
    });
  }

});

