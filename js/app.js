const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function safeText(value) {
  return value ?? "[INFORMACIÓN PENDIENTE DE INCORPORAR]";
}

function card(title, text) {
  return `
    <article class="card">
      <span>${title}</span>
      <strong>${text}</strong>
    </article>
  `;
}

function accordionItem(title, content, open = false) {
  return `
    <article class="accordion-item ${open ? "open" : ""}">
      <button class="accordion-btn" type="button">
        <span>${title}</span>
        <span>＋</span>
      </button>
      <div class="accordion-panel">${content}</div>
    </article>
  `;
}

function listHtml(items) {
  return `<ul class="ref-list">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
}

function buildSection(title, subtitle, innerHtml) {
  return `
    <section class="section-box">
      <header>
        <div>
          <p class="eyebrow">Portafolio académico</p>
          <h2>${title}</h2>
        </div>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
      </header>
      ${innerHtml}
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const data = projectData;
  const contentPanel = $("#contentPanel");
  const menuTrigger = $("#menuTrigger");
  const sectionMenu = $("#sectionMenu");
  const openMenuBtn = $("#openMenuBtn");
  const openFirstSectionBtn = $("#openFirstSectionBtn");

  $("#brandTitle").textContent = safeText(data.meta.title);
  $("#brandSubtitle").textContent = safeText(data.meta.right);
  $("#projectTitle").textContent = safeText(data.meta.title);
  $("#heroRight").textContent = safeText(data.meta.right);
  $("#studentName").textContent = safeText(data.meta.student);
  $("#courseName").textContent = safeText(data.meta.course);
  $("#teacherName").textContent = safeText(data.meta.teacher);
  $("#institutionName").textContent = safeText(data.meta.institution);
  $("#projectDate").textContent = safeText(data.meta.date);
  $("#heroQuote").textContent = safeText(data.meta.quote);

  const sections = {
    presentacion: buildSection(
      "1. Presentación del proyecto",
      "Contexto general y propósito",
      `<div class="card-grid">${data.presentation.map(item => card(item.title, item.text)).join("")}</div>`
    ),
    derecho: buildSection(
      "2. Derecho fundamental",
      "Definición, alcance e importancia",
      `
        <div class="definition-layout">
          <article class="card">
            <h3>${safeText(data.right.name)}</h3>
            <p>${safeText(data.right.definition)}</p>
            <div>${data.right.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
          </article>
          <aside class="card">
            <p><strong>Fundamento constitucional:</strong> ${safeText(data.right.constitutionalBasis)}</p>
            <p><strong>Características:</strong> ${safeText(data.right.characteristics)}</p>
            <p><strong>Alcance:</strong> ${safeText(data.right.scope)}</p>
            <p><strong>Sujetos protegidos:</strong> ${safeText(data.right.protectedSubjects)}</p>
            <p><strong>Importancia:</strong> ${safeText(data.right.importance)}</p>
          </aside>
        </div>
      `
    ),
    metas: buildSection(
      "3. Metas y objetivos",
      "Lo que se pretendía lograr",
      `
        <div class="card-grid">
          ${card("Meta general", data.objectives.generalMeta)}
          ${card("Objetivo general", data.objectives.generalObjective)}
          ${card("Objetivos específicos", data.objectives.specific.join("<br><br>"))}
        </div>
      `
    ),
    problema: buildSection(
      "4. Planteamiento del problema",
      "Situación problemática y pregunta central",
      `
        <div class="problem-layout">
          ${card("Problema central de investigación", data.problem.mainQuestion)}
          <div class="card-grid">
            ${card("Contexto del problema", data.problem.context)}
            ${card("Situación problemática", data.problem.situation)}
            ${card("Derecho afectado", data.problem.affectedRight)}
            ${card("Sujetos involucrados", data.problem.subjects)}
            ${card("Consecuencias", data.problem.consequences)}
          </div>
        </div>
      `
    ),
    preguntas: buildSection(
      "5. Preguntas orientadoras",
      "Guía de la investigación",
      `<div class="accordion">${data.questions.map((q, i) => accordionItem(q.question, `<p>${q.answer}</p>`, i === 0)).join("")}</div>`
    ),
    plan: buildSection(
      "6. Plan de trabajo",
      "Organización por fases",
      `<div class="timeline">${data.workPlan.map(step => `
        <article class="card" style="margin-bottom:12px">
          <h3>${step.phase}</h3>
          <p><strong>Actividad:</strong> ${step.activity}</p>
          <p><strong>Responsable:</strong> ${step.responsible}</p>
          <p><strong>Recursos:</strong> ${step.resources}</p>
          <p><strong>Producto esperado:</strong> ${step.expectedProduct}</p>
          <p><strong>Estado:</strong> ${step.status}</p>
        </article>
      `).join("")}</div>`
    ),
    cronograma: buildSection(
      "7. Cronograma",
      "Línea de tiempo del desarrollo",
      `<div class="gantt">${data.cronograma.map(item => `
        <article class="card" style="margin-bottom:12px">
          <h3>${item.activity}</h3>
          <p><strong>Inicio:</strong> ${item.start} · <strong>Fin:</strong> ${item.end}</p>
          <p><strong>Producto:</strong> ${item.product}</p>
          <p><strong>Estado:</strong> ${item.status}</p>
          <div class="progress-bar"><div class="progress-bar__fill" style="width:70%"></div></div>
        </article>
      `).join("")}</div>`
    ),
    investigacion: buildSection(
      "8. Investigación documental y jurisprudencial",
      "Constitución, jurisprudencia y doctrina",
      `
        <div class="tabs">
          <div class="tabs__header">
            <button class="tab-btn active" data-tab="normas">Constitución y normas</button>
            <button class="tab-btn" data-tab="jurisprudencia">Jurisprudencia</button>
            <button class="tab-btn" data-tab="doctrina">Doctrina</button>
          </div>

          <div class="tabs__content">
            <div class="tab-panel active" id="tab-normas">
              <div class="card-grid">${data.investigation.normas.map(item => card(item.title, item.content)).join("")}</div>
            </div>
            <div class="tab-panel" id="tab-jurisprudencia">
              <div class="accordion">
                ${data.investigation.jurisprudencia.map((s, i) => accordionItem(
                  `${s.corporation} · ${s.sentence} · ${s.year}`,
                  `
                    <p><strong>Magistrado ponente:</strong> ${s.ponente}</p>
                    <p><strong>Problema jurídico:</strong> ${s.problem}</p>
                    <p><strong>Hechos relevantes:</strong> ${s.facts}</p>
                    <p><strong>Decisión:</strong> ${s.decision}</p>
                    <p><strong>Regla o subregla:</strong> ${s.rule}</p>
                    <p><strong>Importancia:</strong> ${s.importance}</p>
                  `,
                  i === 0
                )).join("")}
              </div>
            </div>
            <div class="tab-panel" id="tab-doctrina">
              <div class="card-grid">
                ${data.investigation.doctrine.map(item => `
                  <article class="card">
                    <span>${item.author}</span>
                    <strong>${item.work}</strong>
                    <p><strong>Año:</strong> ${item.year}</p>
                    <p><strong>Concepto principal:</strong> ${item.concept}</p>
                    <p><strong>Relación:</strong> ${item.relation}</p>
                  </article>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      `
    ),
    comparativo: buildSection(
      "9. Análisis comparativo",
      "Semejanzas, diferencias, avances y retos",
      `<div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Criterio</th><th>Descripción</th><th>Observación comparativa</th>
            </tr>
          </thead>
          <tbody>
            ${data.comparative.map(item => `
              <tr>
                <td><strong>${item.criterion}</strong></td>
                <td>${item.description}</td>
                <td>${item.observation}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>`
    ),
    casos: buildSection(
      "10. Casos recientes",
      "Aplicación práctica y contexto contemporáneo",
      `<div class="accordion">${data.cases.map((c, i) => accordionItem(
        `${c.name} · ${c.date}`,
        `
          <p><strong>Contexto:</strong> ${c.context}</p>
          <p><strong>Derecho involucrado:</strong> ${c.right}</p>
          <p><strong>Problema jurídico:</strong> ${c.problem}</p>
          <p><strong>Decisión:</strong> ${c.decision}</p>
          <p><strong>Argumentos relevantes:</strong> ${c.arguments}</p>
          <p><strong>Impacto:</strong> ${c.impact}</p>
        `,
        i === 0
      )).join("")}</div>`
    ),
    resultados: buildSection(
      "11. Análisis y resultados",
      "Síntesis de hallazgos",
      `<div class="card-grid">${data.results.map(item => card(item.title, item.text)).join("")}</div>`
    ),
    evidencias: buildSection(
      "12. Actividades y evidencias",
      "Galería documental del proceso",
      `<div class="evidence-gallery">${data.evidence.map(ev => `
        <article class="evidence-card">
          <div class="evidence-thumb">📁</div>
          <div class="evidence-body">
            <span>${ev.date}</span>
            <h3>${ev.title}</h3>
            <p>${ev.description}</p>
            <p><strong>Tipo:</strong> ${ev.type}</p>
            <a class="btn btn--secondary" href="${ev.link}" target="_blank" rel="noopener">Abrir evidencia</a>
          </div>
        </article>
      `).join("")}</div>`
    ),
    autoevaluacion: buildSection(
      "13. Autoevaluación y reflexión",
      "Aprendizajes y valoración del proceso",
      `<div class="reflection-layout">
        <article class="card">
          <h3>Reflexión del proceso</h3>
          <p>${data.reflection.text}</p>
        </article>
        <div class="card-grid">${data.reflection.points.map(item => card(item.title, item.text)).join("")}</div>
      </div>`
    ),
    "presentacion-final": buildSection(
      "14. Presentación final",
      "Video, PDF, PowerPoint o enlaces externos",
      `<div class="final-layout">
        <article class="card">
          <h3>Video principal</h3>
          <div class="embed-box">
            ${data.finalPresentation.videoEmbed.includes("INFORMACIÓN PENDIENTE")
              ? `<p>${safeText(data.finalPresentation.videoEmbed)}</p>`
              : data.finalPresentation.videoEmbed}
          </div>
        </article>
        <div class="card-grid">${data.finalPresentation.resources.map(item => card(item.title, item.text)).join("")}</div>
      </div>`
    ),
    conclusiones: buildSection(
      "15. Conclusiones",
      "Respuesta breve y visual al problema",
      `<div class="card-grid">${data.conclusions.map(item => card(item.title, item.text)).join("")}</div>`
    ),
    referencias: buildSection(
      "16. Fuentes y referencias",
      "Base documental del proyecto",
      `
        <div class="references-layout">
          <div class="card"><h3>Constitución</h3>${listHtml(data.references.constitution)}</div>
          <div class="card"><h3>Leyes</h3>${listHtml(data.references.laws)}</div>
          <div class="card"><h3>Jurisprudencia</h3>${listHtml(data.references.jurisprudence)}</div>
          <div class="card"><h3>Libros</h3>${listHtml(data.references.books)}</div>
          <div class="card"><h3>Artículos académicos</h3>${listHtml(data.references.articles)}</div>
          <div class="card"><h3>Sitios web</h3>${listHtml(data.references.websites)}</div>
          <div class="card"><h3>Otras fuentes</h3>${listHtml(data.references.others)}</div>
        </div>
      `
    )
  };

  function openSection(key) {
    contentPanel.innerHTML = sections[key] || `<div class="empty-state"><h2>Sección no disponible</h2></div>`;

    $$(".tab-btn", contentPanel).forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".tab-btn", contentPanel).forEach(b => b.classList.remove("active"));
        $$(".tab-panel", contentPanel).forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        $("#tab-" + btn.dataset.tab, contentPanel).classList.add("active");
      });
    });

    $$(".accordion-btn", contentPanel).forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".accordion-item").classList.toggle("open");
      });
    });

    $$(".section-menu button", document).forEach(btn => btn.classList.remove("active"));
    const activeMenuButton = $(`.section-menu button[data-section="${key}"]`, document);
    activeMenuButton?.classList.add("active");
  }

  function closeMenu() {
    sectionMenu.setAttribute("hidden", "");
    menuTrigger.setAttribute("aria-expanded", "false");
  }

  menuTrigger.addEventListener("click", () => {
    const isOpen = !sectionMenu.hasAttribute("hidden");
    if (isOpen) closeMenu();
    else {
      sectionMenu.removeAttribute("hidden");
      menuTrigger.setAttribute("aria-expanded", "true");
    }
  });

  openMenuBtn.addEventListener("click", () => {
    sectionMenu.removeAttribute("hidden");
    menuTrigger.setAttribute("aria-expanded", "true");
    sectionMenu.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  openFirstSectionBtn.addEventListener("click", () => openSection("presentacion"));

  sectionMenu.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-section]");
    if (!btn) return;
    openSection(btn.dataset.section);
    closeMenu();
    contentPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const toTop = $("#toTop");
  window.addEventListener("scroll", () => {
    toTop.style.display = window.scrollY > 300 ? "grid" : "none";
  });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});