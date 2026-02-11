fetch("chatbot.html")
  .then(response => response.text())
  .then(html => {
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
  });
