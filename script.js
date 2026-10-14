
/* =========================================
   A LITTLE SOMETHING FOR YOU
   Complete replacement for script.js
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Read config.js safely. Use default settings if it is unavailable.
    const config =
        typeof SITE_CONFIG !== "undefined"
            ? SITE_CONFIG
            : window.SITE_CONFIG || {};

    // Default settings keep the website functional even if config.js fails.
    const settings = {
        openingQuestion: config.openingQuestion || "May I make your day a little better?",
        yesButtonText: config.yesButtonText || "Yes, please ♡",
        noButtonText: config.noButtonText || "No, thank you",
        noResponseMessage: config.noResponseMessage || "Hehe, are you sure? 🥺",
        collageTitle: config.collageTitle || "For the memories ♡",
        collageSubtitle: config.collageSubtitle || "Every little moment has a place here.",
        collageCaption: config.collageCaption || "Some moments are worth keeping.",
        continueButtonText: config.continueButtonText || "Continue ♡",
        defaultSeason: config.defaultSeason || "spring",
        allowSeasonSelection: config.allowSeasonSelection !== false,
        seasonalEffects: config.seasonalEffects || {},
        particleCount: Number(config.particleCount) || 24,
        encouragementTitle: config.encouragementTitle || "You are doing better than you think.",
        encouragementMessage:
            config.encouragementMessage ||
            "You don't have to have everything figured out. Take things one step at a time. Even the smallest steps count. You deserve to be proud of how far you've come.",
        messageSignature: config.messageSignature || "Made with love, just for you ♡",
        characterImage: config.characterImage || "images/pochacco.png",
        characterAlt: config.characterAlt || "Pochacco, here to cheer you on",
        replayButtonText: config.replayButtonText || "Experience it again ↻",
        collagePhotos: Array.isArray(config.collagePhotos)
            ? config.collagePhotos
            : [],
        music: config.music || { enabled: false }
    };

    // Find elements.
    const get = (id) => document.getElementById(id);

    const elements = {
        scenes: document.querySelectorAll(".scene"),
        openingQuestion: get("opening-question"),
        yesButton: get("yes-button"),
        noButton: get("no-button"),
        noResponse: get("no-response"),
        collageTitle: get("collage-title"),
        collageSubtitle: get("collage-subtitle"),
        collageCaption: get("collage-caption"),
        collageContainer: get("collage-container"),
        collageContinue: get("collage-continue"),
        seasonScene: get("season-scene"),
        seasonTitle: get("season-title"),
        seasonDescription: get("season-description"),
        seasonSelector: get("season-selector"),
        seasonParticles: get("season-particles"),
        messageScene: get("encouragement-scene"),
        messageParticles: get("message-particles"),
        encouragementTitle: get("encouragement-title"),
        encouragementMessage: get("encouragement-message"),
        messageSignature: get("message-signature"),
        pochaccoImage: get("pochacco-image"),
        seasonContinue: get("season-continue"),
        replayButton: get("replay-button")
    };

    // Track the currently visible scene.
    let currentSeason = settings.defaultSeason;
    let musicPlayer = null;

    // Change screens.
    function showScene(sceneId) {
        const target = get(sceneId);

        if (!target) {
            console.error("Scene not found:", sceneId);
            return;
        }

        elements.scenes.forEach(function (scene) {
            scene.classList.remove("active");
            scene.setAttribute("aria-hidden", "true");
        });

        target.classList.add("active");
        target.setAttribute("aria-hidden", "false");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Fill in text from config.js.
    function loadText() {
        if (elements.openingQuestion) {
            elements.openingQuestion.textContent = settings.openingQuestion;
        }

        if (elements.yesButton) {
            elements.yesButton.textContent = settings.yesButtonText;
        }

        if (elements.noButton) {
            elements.noButton.textContent = settings.noButtonText;
        }

        if (elements.collageTitle) {
            elements.collageTitle.textContent = settings.collageTitle;
        }

        if (elements.collageSubtitle) {
            elements.collageSubtitle.textContent = settings.collageSubtitle;
        }

        if (elements.collageCaption) {
            elements.collageCaption.textContent = settings.collageCaption;
        }

        if (elements.collageContinue) {
            elements.collageContinue.textContent = settings.continueButtonText;
        }

        if (elements.encouragementTitle) {
            elements.encouragementTitle.textContent = settings.encouragementTitle;
        }

        if (elements.encouragementMessage) {
            // Preserve paragraph breaks in the configured message.
            elements.encouragementMessage.textContent =
                settings.encouragementMessage;
            elements.encouragementMessage.style.whiteSpace = "pre-line";
        }

        if (elements.messageSignature) {
            elements.messageSignature.textContent = settings.messageSignature;
        }

        if (elements.pochaccoImage) {
            elements.pochaccoImage.src = settings.characterImage;
            elements.pochaccoImage.alt = settings.characterAlt;
        }

        if (elements.replayButton) {
            elements.replayButton.textContent = settings.replayButtonText;
        }

        if (elements.seasonSelector) {
            elements.seasonSelector.disabled =
                settings.allowSeasonSelection === false;
        }
    }

    // Build the photo collage.
    function createCollage() {
        if (!elements.collageContainer) return;

        elements.collageContainer.replaceChildren();

        if (settings.collagePhotos.length === 0) {
            const message = document.createElement("p");
            message.className = "collage-empty-message";
            message.textContent =
                "Your special memories will appear here once you add your photos ♡";
            elements.collageContainer.appendChild(message);
            return;
        }

        settings.collagePhotos.forEach(function (photo, index) {
            const card = document.createElement("figure");
            card.className = "collage-card";
            card.style.animationDelay = `${index * 0.12}s`;

            const image = document.createElement("img");
            image.src = photo.src || "";
            image.alt = photo.caption || `Memory ${index + 1}`;
            image.loading = "lazy";

            image.addEventListener("error", function () {
                card.classList.add("photo-unavailable");
                image.style.display = "none";

                const placeholder = document.createElement("div");
                placeholder.className = "photo-placeholder";
                placeholder.textContent = "♡";
                placeholder.setAttribute("aria-label", "Photo not found");
                card.prepend(placeholder);
            }, { once: true });

            const caption = document.createElement("figcaption");
            caption.textContent = photo.caption || "A little memory ♡";

            card.appendChild(image);
            card.appendChild(caption);
            elements.collageContainer.appendChild(card);
        });
    }

    // Seasonal scenery settings.
    const seasonData = {
        spring: {
            title: "A little spring day",
            description: "A fresh beginning, filled with little things that bloom.",
            particles: ["🌸", "🌷", "🌼", "✿", "❀"]
        },
        summer: {
            title: "A little summer day",
            description: "May your days be warm, bright, and full of little joys.",
            particles: ["✦", "✧", "☀", "✨", "✦"]
        },
        autumn: {
            title: "A little autumn day",
            description: "Even when things change, there is beauty in every season.",
            particles: ["🍂", "🍁", "🍂", "🍁", "✦"]
        },
        winter: {
            title: "A little winter day",
            description: "May you find warmth and comfort even on the coldest days.",
            particles: ["❄", "❅", "❆", "✧", "❄"]
        }
    };

    // Create the floating seasonal decorations.
    function createParticles(container, season) {
        if (!container) return;

        container.replaceChildren();

        const customSeason = settings.seasonalEffects[season] || {};
        const defaultSeason = seasonData[season] || seasonData.spring;
        const particles = Array.isArray(customSeason.particles) &&
            customSeason.particles.length
            ? customSeason.particles
            : defaultSeason.particles;

        for (let i = 0; i < settings.particleCount; i++) {
            const particle = document.createElement("span");
            particle.className = "season-particle";
            particle.textContent = particles[i % particles.length];
            particle.setAttribute("aria-hidden", "true");

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 12}s`;
            particle.style.animationDuration = `${8 + Math.random() * 12}s`;
            particle.style.fontSize = `${12 + Math.random() * 15}px`;
            particle.style.opacity = `${0.35 + Math.random() * 0.6}`;

            container.appendChild(particle);
        }
    }

    // Apply the selected season to both scenery scenes.
    function applySeason(season) {
        const validSeasons = ["spring", "summer", "autumn", "winter"];

        if (!validSeasons.includes(season)) {
            season = "spring";
        }

        currentSeason = season;

        const customSeason = settings.seasonalEffects[season] || {};
        const defaults = seasonData[season];

        if (elements.seasonScene) {
            elements.seasonScene.classList.remove(
                "season-spring",
                "season-summer",
                "season-autumn",
                "season-winter"
            );
            elements.seasonScene.classList.add(`season-${season}`);
        }

        if (elements.messageScene) {
            elements.messageScene.classList.remove(
                "season-spring",
                "season-summer",
                "season-autumn",
                "season-winter"
            );
            elements.messageScene.classList.add(`season-${season}`);
        }

        if (elements.seasonTitle) {
            elements.seasonTitle.textContent =
                customSeason.title || defaults.title;
        }

        if (elements.seasonDescription) {
            elements.seasonDescription.textContent =
                customSeason.description || defaults.description;
        }

        createParticles(elements.seasonParticles, season);
        createParticles(elements.messageParticles, season);
    }

    // Optional background music.
    function prepareMusic() {
        if (!settings.music.enabled || !settings.music.src) return;

        musicPlayer = new Audio(settings.music.src);
        musicPlayer.loop = true;
        musicPlayer.volume = Math.max(
            0,
            Math.min(1, Number(settings.music.volume) || 0.25)
        );
    }

    function startMusic() {
        if (!musicPlayer) return;

        const playPromise = musicPlayer.play();

        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function (error) {
                console.warn("Background music could not start:", error);
            });
        }
    }

    // Button actions.
    function handleYes() {
        if (elements.noResponse) {
            elements.noResponse.textContent = "";
        }

        createCollage();
        showScene("collage-scene");
        startMusic();
    }

    function handleNo() {
        if (elements.noResponse) {
            elements.noResponse.textContent = settings.noResponseMessage;
        }
    }

    function handleCollageContinue() {
        applySeason(currentSeason);
        showScene("season-scene");
    }

    function handleSeasonContinue() {
        applySeason(currentSeason);
        showScene("encouragement-scene");
    }

    function handleReplay() {
        if (musicPlayer) {
            musicPlayer.pause();
            musicPlayer.currentTime = 0;
        }

        if (elements.noResponse) {
            elements.noResponse.textContent = "";
        }

        showScene("welcome-scene");
    }

    // Connect the buttons to their actions.
    function connectButtons() {
        if (elements.yesButton) {
            elements.yesButton.addEventListener("click", handleYes);
        } else {
            console.error('Missing button: id="yes-button"');
        }

        if (elements.noButton) {
            elements.noButton.addEventListener("click", handleNo);
        } else {
            console.error('Missing button: id="no-button"');
        }

        if (elements.collageContinue) {
            elements.collageContinue.addEventListener(
                "click",
                handleCollageContinue
            );
        }

        if (elements.seasonContinue) {
            elements.seasonContinue.addEventListener(
                "click",
                handleSeasonContinue
            );
        }

        if (elements.replayButton) {
            elements.replayButton.addEventListener("click", handleReplay);
        }

        if (elements.seasonSelector) {
            elements.seasonSelector.addEventListener("change", function () {
                if (settings.allowSeasonSelection !== false) {
                    applySeason(elements.seasonSelector.value);
                }
            });
        }
    }

    // Start the website.
    function initializeWebsite() {
        loadText();
        connectButtons();
        createCollage();
        prepareMusic();

        if (elements.seasonSelector) {
            elements.seasonSelector.value = currentSeason;
        }

        applySeason(currentSeason);
        showScene("welcome-scene");

        console.log("♡ Website initialized successfully!");
        console.log("Current season:", currentSeason);
    }

    initializeWebsite();
});
