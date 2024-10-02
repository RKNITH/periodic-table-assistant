

const btn = document.querySelector('#mic-button');

// *********************

const periodicTableData = {
    introduction: `आवर्त सारणी, जिसे आवर्त तालिका भी कहा जाता है, रासायनिक तत्वों की व्यवस्थित तालिका है, जो उनके परमाणु संख्या, इलेक्ट्रॉन विन्यास और आवर्तक रासायनिक गुणों के अनुसार वर्गीकृत होती है। इसमें कुल 118 तत्व शामिल हैं।`,
    elements: [
        "हाइड्रोजन", "हीलियम", "लिथियम", "बेरिलियम", "बोरॉन", "कार्बन", "नाइट्रोजन", "ऑक्सीजन", "फ्लोरीन", "निओन",
        "सोडियम", "मैग्नीशियम", "एलुमिनियम", "सिलिकॉन", "फॉस्फोरस", "सल्फर", "क्लोरीन", "आर्गन", "पोटैशियम", "कैल्शियम",
        "स्कैन्डियम", "टाइटेनियम", "वेनाडियम", "क्रोमियम", "मैंगनीज", "लोहा", "कोबाल्ट", "निकल", "तांबा", "जस्ता",
        "गैलियम", "जर्मेनियम", "आर्सेनिक", "सेलेनियम", "ब्रोमीन", "क्रिप्टन", "रबीडियम", "स्ट्रॉन्शियम", "इट्रियम", "जिरकोनियम",
        "निओबियम", "मोलिब्डेनम", "टेक्नेशियम", "रुथेनियम", "रॉडियम", "पैलाडियम", "चांदी", "कैडमियम", "इंडियम", "टिन",
        "एंटीमनी", "टेल्यूरियम", "आयोडीन", "जेनॉन", "सीजियम", "बेरियम", "लैंथेनम", "सेरियम", "प्रेजोडायमियम", "नीओडायमियम",
        "प्रोमेथियम", "समारियम", "यूरोपियम", "गैडोलिनियम", "टेरबियम", "डिस्प्रोसियम", "होल्मियम", "एर्बियम", "थुलियम", "यटरबियम",
        "लुटेशियम", "हाफ्नियम", "टैंटलम", "वोल्फ्रैम", "रेनीम", "ऑस्मियम", "इरिडियम", "प्लैटिनम", "सोना", "पारा",
        "थैलियम", "सीसा", "बिस्मथ", "पोलोनियम", "ऐस्टाटिन", "रडॉन", "फ्रैंशियम", "रेडियम", "ऐक्टिनियम", "थोरियम",
        "प्रोटैक्टिनियम", "युरेनियम", "नेप्टूनियम", "प्लूटोनियम", "अमेरीशियम", "क्यूरियम", "बर्केलियम", "कैलिफोर्नियम", "आइनस्टीनियम", "फर्मीयम",
        "मेंडेलीवियम", "नोबेलियम", "लॉरेनसियम", "रदरफोर्डियम", "डब्नियम", "सीबोर्गियम", "बोरियम", "हैसीयम", "माइटनेरियम", "डार्मस्टेडटियम",
        "रेनजेनियम", "कॉपर्निसियम", "निहोनियम", "फ्लेरोवियम", "मॉस्कोवियम", "लिवर्मोरियम", "टेनेसीन", "ऑगनेसन"
    ]
};


// *******************************

// Function to speak in Hindi
const speakFun = (input) => {
    let speakInput = new SpeechSynthesisUtterance(input);
    speakInput.rate = 1;
    speakInput.pitch = 1;
    speakInput.volume = 1;
    speakInput.lang = 'hi-IN';  // Hindi Language
    window.speechSynthesis.speak(speakInput);
};

// Function to handle voice commands related to the periodic table
const handleCommands = (command) => {
    if (command.includes("आवर्त सारणी") || command.includes("periodic table")) {
        // Speak the basic introduction of the periodic table
        speakFun(periodicTableData.introduction);
    } else if (command.includes("सभी तत्वों के नाम") || command.includes("name of all elements")) {
        // Speak the names of all elements in the periodic table
        const allElements = `आवर्त सारणी के सभी तत्वों के नाम इस प्रकार हैं: ${periodicTableData.elements.join(", ")}।`;
        speakFun(allElements);
    } else {
        speakFun("मुझे खेद है, मैं इस आदेश को नहीं समझ सका। कृपया पुनः प्रयास करें।");
    }
};

// Initialize speech recognition
const startRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'hi-IN';  // Hindi Language for Recognition

    recognition.onstart = () => {
        console.log('Voice recognition started. Speak now!');
    };

    recognition.onspeechend = () => {
        console.log('Voice recognition ended.');
        recognition.stop();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(`You said: ${transcript}`);
        handleCommands(transcript);
        btn.classList.remove('btn-box')
        btn.innerHTML = `<i class="fa-solid fa-microphone-lines-slash"></i> `
    };

    recognition.start();
};

// Button click event listener
btn.addEventListener('click', () => {
    startRecognition();
    btn.classList.add('btn-box')
    btn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i> `
});
