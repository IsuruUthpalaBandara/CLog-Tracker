function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const date = document.getElementById("date").value;
  const project = document.getElementById("project").value;
  const location = document.getElementById("location").value;
  const weather = document.getElementById("weather").value;
  const manpower = document.getElementById("manpower").value;
  const work = document.getElementById("work").value;
  const remarks = document.getElementById("remarks").value;

  let y = 20;

  doc.setFontSize(18);
  doc.text("CLog Tracker - Daily Site Record", 14, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Date: ${date}`, 14, y); y += 8;
  doc.text(`Project: ${project}`, 14, y); y += 8;
  doc.text(`Location: ${location}`, 14, y); y += 8;
  doc.text(`Weather: ${weather}`, 14, y); y += 10;

  doc.text("Manpower:", 14, y); y += 6;
  doc.text(manpower || "-", 14, y); y += 10;

  doc.text("Work Description:", 14, y); y += 6;
  doc.text(work || "-", 14, y); y += 10;

  doc.text("Issues / Remarks:", 14, y); y += 6;
  doc.text(remarks || "-", 14, y);

  doc.save(`CLog_${date}.pdf`);
}
