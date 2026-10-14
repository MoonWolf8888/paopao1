
/* =========================================
   A LITTLE SOMETHING FOR YOU ♡
   PERSONAL WEBSITE CONFIGURATION
   =========================================

   Change your website's text, photos, and
   seasonal settings in this file.
*/

const SITE_CONFIG = {

    // =====================================
    // 1. WEBSITE TITLE
    // =====================================

    siteTitle: "A Little Something for You ♡",


    // =====================================
    // 2. OPENING QUESTION
    // =====================================

    openingQuestion: "May I make your day a little better?",

    yesButtonText: "Yes, please ♡",

    noButtonText: "No, thank you",

    noResponseMessage: "Hehe, are you sure? 🥺",


    // =====================================
    // 3. PHOTO COLLAGE
    // =====================================

    collageTitle: "For the memories ♡",

    collageSubtitle: "Every little moment has a place here.",

    collageCaption: "Some moments are worth keeping.",

    continueButtonText: "Continue ♡",

    /*
       Replace these example paths with your
       own image filenames inside the images
       folder.

       Example:
       "images/photo1.jpg"

       Use an empty array [] if you don't
       want to show any photos yet.
    */

    collagePhotos: [
        {
            src: "images/photo1.jpg",
            caption: "A little moment to remember"
        },
        {
            src: "images/photo2.jpg",
            caption: "One for the memories"
        },
        {
            src: "images/photo3.jpg",
            caption: "A moment worth keeping"
        },
        {
            src: "images/photo4.jpg",
            caption: "Little things, big feelings"
        },
        {
            src: "images/photo5.jpg",
            caption: "A memory just for you"
        },
        {
            src: "images/photo6.jpg",
            caption: "And many more to come ♡"
        }
    ],


    // =====================================
    // 4. SEASONAL SETTINGS
    // =====================================

    /*
       Choose one:
       "spring"
       "summer"
       "autumn"
       "winter"
       "random"

       "random" selects a season when the
       website is opened.

       The receiver can also change the
       season using the selector.
    */

    defaultSeason: "spring",

    allowSeasonSelection: true,


    // =====================================
    // 5. SEASONAL PARTICLE ANIMATIONS
    // =====================================

    seasonalEffects: {
        spring: {
            title: "A little spring day",
            description:
                "A fresh beginning, filled with little things that bloom.",
            particles: ["🌸", "🌷", "🌼", "✿", "❀"]
        },

        summer: {
            title: "A little summer day",
            description:
                "May your days be warm, bright, and full of little joys.",
            particles: ["✦", "✧", "☀", "✦", "✨"]
        },

        autumn: {
            title: "A little autumn day",
            description:
                "Even when things change, there is beauty in every season.",
            particles: ["🍂", "🍁", "🍂", "🍁", "✦"]
        },

        winter: {
            title: "A little winter day",
            description:
                "May you find warmth and comfort even on the coldest days.",
            particles: ["❄", "❅", "❆", "✧", "❄"]
        }
    },

    particleCount: 24,


    // =====================================
    // 6. ENCOURAGEMENT MESSAGE
    // =====================================

    encouragementTitle: "You are doing better than you think.",

    encouragementMessage:
        "Whatever today brings, remember that you don't have to have everything figured out.\n\n" +
        "Take things one step at a time. Even the smallest steps count, and you deserve to be proud of how far you've come.\n\n" +
        "Rest when you need to. Begin again when you're ready. You are allowed to grow at your own pace.",

    messageSignature: "Made with love, just for you ♡",


    // =====================================
    // 7. POCHACCO CHARACTER
    // =====================================

    /*
       Place your character image inside the
       images folder.

       Transparent PNG artwork works best.
    */

    characterImage: "images/pochacco.png",

    characterAlt: "Pochacco, here to cheer you on",


    // =====================================
    // 8. REPLAY BUTTON
    // =====================================

    replayButtonText: "Experience it again ↻",


    // =====================================
    // 9. OPTIONAL BACKGROUND MUSIC
    // =====================================

    /*
       Set enabled to true when you have
       added a suitable audio file.

       Example:
       "audio/background-music.mp3"

       Browsers may require the receiver to
       press a button before music can play.
    */

    music: {
        enabled: false,
        src: "audio/background-music.mp3",
        volume: 0.25
    }

};
