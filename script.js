// Terjemahan
const translations = {
  id: {
    subjectLabel: "Subjek Utama",
    styleLabel: "Gaya Seni",
    lightingLabel: "Pencahayaan",
    colorLabel: "Warna / Palet",
    moodLabel: "Suasana / Mood",
    detailsLabel: "Detail Tambahan",
    resultTitle: "Prompt Hasil:",
    placeholders: {
      subject: "Misalnya: logo toko kopi",
      color: "Misalnya: coklat, krem, emas",
      details: "Tambahkan detail seperti bentuk, simbol, teks, dll..."
    }
  },
  en: {
    subjectLabel: "Main Subject",
    styleLabel: "Art Style",
    lightingLabel: "Lighting",
    colorLabel: "Color / Palette",
    moodLabel: "Mood / Atmosphere",
    detailsLabel: "Additional Details",
    resultTitle: "Generated Prompt:",
    placeholders: {
      subject: "e.g. coffee shop logo",
      color: "e.g. brown, cream, gold",
      details: "Add details like shape, symbols, text, etc..."
    }
  }
};

// Template
const templates = {
  id: {
    logo: {
      subject: "sebuah logo untuk {subject}",
      style: "vector art, minimalis, modern",
      color: "gunakan warna {color}",
      details: "simbol abstrak, tipografi bersih, scalable"
    },
    character: {
      subject: "karakter {subject}",
      style: "anime, digital art",
      mood: "kuat, karismatik",
      details: "pakaian futuristik, ekspresi tajam, latar belakang dramatis"
    },
    product: {
      subject: "produk {subject}",
      style: "realistic photo, studio lighting",
      mood: "elegan, mewah",
      details: "dipotret dari atas, latar belakang putih bersih, detail tinggi"
    }
  },
  en: {
    logo: {
      subject: "a logo for {subject}",
      style: "vector art, minimalist, modern",
      color: "use colors {color}",
      details: "abstract symbol, clean typography, scalable"
    },
    character: {
      subject: "a character {subject}",
      style: "anime, digital art",
      mood: "strong, charismatic",
      details: "futuristic outfit, sharp expression, dramatic background"
    },
    product: {
      subject: "a product {subject}",
      style: "realistic photo, studio lighting",
      mood: "elegant, luxurious",
      details: "top-down shot, clean white background, high detail"
    }
  }
};

function updateLanguage() {
  const lang = document.querySelector('input[name="lang"]:checked').value;
  const t = translations[lang];

  document.getElementById("subjectLabel").textContent = t.subjectLabel;
  document.getElementById("styleLabel").textContent = t.styleLabel;
  document.getElementById("lightingLabel").textContent = t.lightingLabel;
  document.getElementById("colorLabel").textContent = t.colorLabel;
  document.getElementById("moodLabel").textContent = t.moodLabel;
  document.getElementById("detailsLabel").textContent = t.detailsLabel;
  document.getElementById("resultTitle").textContent = t.resultTitle;

  document.getElementById("subject").placeholder = t.placeholders.subject;
  document.getElementById("color").placeholder = t.placeholders.color;
  document.getElementById("details").placeholder = t.placeholders.details;
}

function generatePrompt() {
  const lang = document.querySelector('input[name="lang"]:checked').value;
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const template = document.getElementById("template").value;
  const subject = document.getElementById("subject").value.trim();
  const style = document.getElementById("style").value;
  const lighting = document.getElementById("lighting").value;
  const color = document.getElementById("color").value.trim();
  const mood = document.getElementById("mood").value;
  let details = document.getElementById("details").value.trim();

  let finalSubject = subject;
  let finalStyle = "";
  let finalColor = "";
  let finalMood = "";
  let finalDetails = details;

  // Terapkan template
  if (template !== "custom" && templates[lang][template]) {
    const temp = templates[lang][template];
    finalSubject = temp.subject.replace("{subject}", subject);
    finalStyle = temp.style;
    if (color) finalColor = temp.color.replace("{color}", color);
    else finalColor = "";
    if (mood) finalMood = mood;
    else finalMood = temp.mood || "";
    finalDetails = temp.details + (details ? " | " + details : "");
  } else {
    finalStyle = style;
    finalColor = color ? `color palette: ${color}` : "";
    finalMood = mood;
    finalDetails = details;
  }

  // Bangun prompt
  let prompt = finalSubject;

  if (finalStyle) prompt += `, ${finalStyle}`;
  if (lighting) prompt += `, ${lighting}`;
  if (finalColor) prompt += `, ${finalColor}`;
  if (finalMood) prompt += `, ${finalMood}`;
  if (finalDetails) prompt += `, ${finalDetails}`;

  // Mode video
  if (mode === "video") {
    prompt += ", smooth motion, 4K, cinematic, 30fps";
  } else {
    prompt += ", high detail, 8k, ultra sharp focus";
  }

  // Tampilkan hasil
  document.getElementById("outputPrompt").value = prompt.trim();
  document.getElementById("result").style.display = "block";
}

// Event Listeners
document.getElementById("promptForm").addEventListener("submit", function (e) {
  e.preventDefault();
  generatePrompt();
});

document.getElementById("copyBtn").addEventListener("click", function () {
  const output = document.getElementById("outputPrompt");
  output.select();
  document.execCommand("copy");
  alert(translations[document.querySelector('input[name="lang"]:checked').value].copied || "Prompt disalin!");
});

// Update bahasa saat diganti
document.querySelectorAll('input[name="lang"]').forEach(radio => {
  radio.addEventListener('change', updateLanguage);
});

// Jalankan update bahasa saat load
updateLanguage();
