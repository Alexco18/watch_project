class WatchAssistant extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.lang = localStorage.getItem('assistant-lang') || null;
    }

    connectedCallback() {
        this.render();
        this.makeDraggable();
    }

    // Contenu textuel
    getContent() {
        const texts = {
            fr: {
                welcome: "Bienvenue chez votre horloger. Comment puis-je vous aider ?",
                links: [
                    { txt: "Voir la collection", url: "/collection.html" },
                    { txt: "Prendre rendez-vous", url: "/contact.html" }
                ],
                changeLang: "Change language (EN)"
            },
            en: {
                welcome: "Welcome to your watchmaker. How can I help you?",
                links: [
                    { txt: "View collection", url: "/collection.html" },
                    { txt: "Book an appointment", url: "/contact.html" }
                ],
                changeLang: "Changer de langue (FR)"
            }
        };
        return texts[this.lang] || null;
    }

    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem('assistant-lang', lang);
        this.render();
    }

    render() {
        const content = this.getContent();
        
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: 'Playfair Display', serif, Arial;
            }
            #assistant-container {
                width: 300px;
                background: #1a1a2e; /* Bleu nuit pro */
                border: 2px solid #d4af37; /* Or */
                border-radius: 15px;
                color: white;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                overflow: hidden;
                cursor: grab;
            }
            .header {
                background: #d4af37;
                color: #1a1a2e;
                padding: 10px;
                font-weight: bold;
                text-align: center;
                font-size: 0.9em;
            }
            .body { padding: 15px; }
            .btn-lang {
                background: transparent;
                border: 1px solid #d4af37;
                color: #d4af37;
                padding: 8px;
                width: 100%;
                margin-bottom: 10px;
                cursor: pointer;
                transition: 0.3s;
            }
            .btn-lang:hover { background: #d4af37; color: #1a1a2e; }
            .link {
                display: block;
                color: #fff;
                text-decoration: none;
                margin: 10px 0;
                padding: 5px 0;
                border-bottom: 1px dashed #d4af37;
            }
        </style>
        
        <div id="assistant-container">
            <div class="header">EXPERT HORLOGER</div>
            <div class="body">
                ${!this.lang ? `
                    <p>Choisissez votre langue / Choose your language :</p>
                    <button class="btn-lang" id="btn-fr">Français</button>
                    <button class="btn-lang" id="btn-en">English</button>
                ` : `
                    <p>${content.welcome}</p>
                    ${content.links.map(l => `<a class="link" href="${l.url}">${l.txt}</a>`).join('')}
                    <button class="btn-lang" style="margin-top:20px; font-size:0.7em;" id="reset-lang">
                        ${content.changeLang}
                    </button>
                `}
            </div>
        </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const btnFr = this.shadowRoot.querySelector('#btn-fr');
        const btnEn = this.shadowRoot.querySelector('#btn-en');
        const btnReset = this.shadowRoot.querySelector('#reset-lang');

        if(btnFr) btnFr.onclick = () => this.setLanguage('fr');
        if(btnEn) btnEn.onclick = () => this.setLanguage('en');
        if(btnReset) btnReset.onclick = () => {
            localStorage.removeItem('assistant-lang');
            this.lang = null;
            this.render();
        };
    }

    makeDraggable() {
        const container = this.shadowRoot.querySelector('#assistant-container');
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        container.onmousedown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            };
            document.onmousemove = (e) => {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                
                let newTop = (this.offsetTop - pos2);
                let newLeft = (this.offsetLeft - pos1);

                // Limites pour ne pas sortir de la page
                if (newTop < 0) newTop = 0;
                if (newLeft < 0) newLeft = 0;
                if (newTop + container.offsetHeight > window.innerHeight) newTop = window.innerHeight - container.offsetHeight;
                if (newLeft + container.offsetWidth > window.innerWidth) newLeft = window.innerWidth - container.offsetWidth;

                this.style.top = newTop + "px";
                this.style.left = newLeft + "px";
                this.style.bottom = "auto";
                this.style.right = "auto";
            };
        };
    }
}

customElements.define('watch-assistant', WatchAssistant);
