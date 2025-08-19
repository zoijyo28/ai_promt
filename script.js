document.getElementById("promptForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil nilai dari form
  const subject = document.getElementById("subject").value.trim();
  const style = document.getElementById("style").value;
  const lighting = document.getElementById("lighting").value;
  const color = document.getElementById("color").value.trim();
  const mood = document.getElementById("mood").value;
  const details = document.getElementById("details").value.trim();

  // Bangun prompt
  let prompt = `${subject}, `;

  if (style) prompt += `in ${style} style, `;
  if (lighting) prompt += `${lighting}, `;
  if (color) prompt += `color palette: ${color}, `;
  if (mood) prompt += `${mood}, `;
  if (details) prompt += `${details}, `;

  prompt += "high detail, 8k, ultra realistic, sharp focus";

  // Tampilkan hasil
  const outputElement = document.getElementById("outputPrompt");
  outputElement.value = prompt;

  document.getElementById("result").style.display = "block";
});

// Salin ke clipboard
document.getElementById("copyBtn").addEventListener("click", function () {
  const output = document.getElementById("outputPrompt");
  output.select();
  document.execCommand("copy");
  alert("Prompt berhasil disalin!");
});
