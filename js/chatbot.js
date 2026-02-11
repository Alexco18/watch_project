fetch("chatbot.html")
  .then(response => response.text())
  .then(html => {
    // Injecte le HTML
    const container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);

    // Exécute les scripts contenus dans chatbot.html
    const scripts = container.querySelectorAll("script");
    scripts.forEach(oldScript => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
    });
  });
