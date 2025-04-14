async function enviar() {
    const fileInput = document.getElementById("fileInput");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
  
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MTY5Njk1LCJleHAiOjE3NDQxOTg0OTV9.tPF47nXkB1Iefhv0jMJESNlIUQFdv-TEY1fDFyYBKbsIkpXVCJ9...";
  
    const response = await fetch("http://localhost:3000/upload/excel", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    });
  
    const result = await response.json();
    exibirPreview(result.data);
  }
  
  function exibirPreview(dados) {
    const previewDiv = document.getElementById("preview");
    if (!dados.length) return (previewDiv.innerHTML = "Nenhum dado encontrado.");
  
    let html = "<table border='1'><tr>";
    Object.keys(dados[0]).forEach((coluna) => {
      html += `<th>${coluna}</th>`;
    });
    html += "</tr>";
  
    dados.forEach((linha) => {
      html += "<tr>";
      Object.values(linha).forEach((valor) => {
        html += `<td>${valor}</td>`;
      });
      html += "</tr>";
    });
  
    html += "</table>";
    previewDiv.innerHTML = html;
  }
  