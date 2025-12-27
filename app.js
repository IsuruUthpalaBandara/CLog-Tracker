// Auto-fill fields on load
window.onload = function () {
  autoFill("company");
  autoFill("project");
  autoFill("recordedBy");
  autoFill("designation");
  autoFill("contact");
};

function autoFill(id) {
  const value = localStorage.getItem(id);
  if (value) {
    document.getElementById(id).value = value;
  }
}

// Save auto-fill fields as user types
["company", "project", "recordedBy", "designation", "contact"].forEach(id => {
  document.addEventListener("input", function (e) {
    if (e.target.id === id) {
      localStorage.setItem(id, e.target.value);
    }
  });
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const company = document.getElementById("company").value;
  const project = document.getElementById("project").value;
  const recordedBy = document.getElementById("recordedBy").value;
  const designation = document.getElementById("designation").value;
  const contact = document.getElementById("contact").value;
  const date = document.getElementById("date").value;
  const indexNo = document.getElementById("indexNo").value;
  const location = document.getElementById("location").value;
  const work = document.getElementById("work").value;
  const remarks = document.getElementById("remarks").value;
  const manpower = document.getElementById("manpower").value;

  let y = 20;

  doc.setFontSize(18);
  doc.text("Daily Site Record", 105, y, { align: "center" });
  y += 15;

  doc.setFontSize(12);
  doc.text(`Company Name: ${company}`, 14, y); y += 7;
  doc.text(`Project Name: ${project}`, 14, y); y += 7;
  doc.text(`Recorded By: ${recordedBy}`, 14, y); y += 7;
  doc.text(`Designation: ${designation}`, 14, y); y += 7;
  doc.text(`Contact No: ${contact}`, 14, y); y += 7;
  doc.text(`Date: ${date}`, 14, y); y += 7;
  doc.text(`Index No: ${indexNo}`, 14, y); y += 7;
  doc.text(`Location: ${location}`, 14, y); y += 10;

  doc.setFont(undefined, "bold");
  doc.text("Work Description:", 14, y);
  doc.setFont(undefined, "normal");
  y += 6;
  doc.text(doc.splitTextToSize(work || "-", 180), 14, y);
  y += 15;

  doc.setFont(undefined, "bold");
  doc.text("Remarks / Issues:", 14, y);
  doc.setFont(undefined, "normal");
  y += 6;
  doc.text(doc.splitTextToSize(remarks || "-", 180), 14, y);
  y += 15;

  doc.setFont(undefined, "bold");
  doc.text("Manpower & Machinery:", 14, y);
  doc.setFont(undefined, "normal");
  y += 6;
  doc.text(doc.splitTextToSize(manpower || "-", 180), 14, y);

  doc.setFontSize(9);
  doc.text("Generated using CLog Tracker", 14, 290);

  doc.save(`CLog_${date || "record"}.pdf`);
}

