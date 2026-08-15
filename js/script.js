document.addEventListener("DOMContentLoaded", () => {
  const P = window.PROYECTO || {};
  const PEND = "[INFORMACIÓN PENDIENTE DE INCORPORAR]";

  const safe = (v) => (v && v !== "" ? v : `<span class="pendiente">${PEND}</span>`);
  const el = (tag, cls, html) => { const e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; };
  const setText = (id, val) => { const n=document.getElementById(id); if(n) n.innerHTML = val || PEND; };

  /* ---------- HERO / PORTADA ---------- */
  document.title = P.meta?.title || document.title;
  setText("heroTitulo", P.portada?.titulo);
  setText("heroDerecho", P.portada?.derecho);
  setText("heroFrase", P.portada?.frase);
  setText("heroPrograma", P.portada?.programa);
  setText("heroAsignatura", P.portada?.asignatura);
  setText("heroDocente", P.portada?.docente);
  setText("heroInstitucion", P.portada?.institucion);
  setText("heroFecha", P.portada?.fecha);
  setText("footerDerecho", P.portada?.derecho);
  setText("footerFecha", P.portada?.fecha);
  setText("avanceProyecto", `Avance del proyecto: ${P.meta?.avance || "0%"}`);

  /* ---------- NAV MOBILE ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
  });
  navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

  /* ---------- PROGRESS BAR + BACK TO TOP ---------- */
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + "%";
    backToTop.classList.toggle("show", h.scrollTop > 400);
  });
  backToTop?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  /* ---------- EQUIPO ---------- */
  const equipoWrap = document.getElementById("equipoCards");
  if (equipoWrap) {
    const integrantes = P.integrantes?.length ? P.integrantes : [];
    equipoWrap.innerHTML = integrantes.length
      ? integrantes.map(i => `<div class="card"><h3>${i.nombre}</h3><span class="tag">${i.rol}</span><p>${i.responsabilidades}</p></div>`).join("")
      : `<p class="pendiente">${PEND}</p>`;
  }
  const notaIAEl = document.getElementById("notaIA");
  if (notaIAEl) notaIAEl.innerHTML = `<strong>Uso de IA:</strong> ${safe(P.notaIA)}`;

  /* ---------- 1. PRESENTACIÓN ---------- */
  const presCards = document.getElementById("presentacionCards");
  if (presCards) {
    presCards.innerHTML = P.presentacion?.length
      ? P.presentacion.map(item => `<div class="card"><h3>${safe(item.titulo)}</h3><p>${safe(item.texto)}</p></div>`).join("")
      : `<p class="pendiente">${PEND}</p>`;
  }

  /* ---------- 2. DERECHO FUNDAMENTAL ---------- */
  const d = P.derechoFundamental || {};
  const derechoPanel = document.getElementById("derechoPanel");
  if (derechoPanel) {
    derechoPanel.innerHTML = `
      <div class="card"><span class="tag">Definición</span><p>${safe(d.definicion)}</p></div>
      <div class="card"><span class="tag">Fundamento constitucional</span><p>${safe(d.fundamentoConstitucional)}</p></div>
      <div class="card"><span class="tag">Características</span><p>${(d.caracteristicas?.length ? d.caracteristicas.join(", ") : PEND)}</p></div>
      <div class="card"><span class="tag">Alcance</span><p>${safe(d.alcance)}</p></div>
      <div class="card"><span class="tag">Sujetos protegidos</span><p>${safe(d.sujetosProtegidos)}</p></div>
      <div class="card"><span class="tag">Importancia (Estado Social de Derecho)</span><p>${safe(d.importanciaEstadoSocial)}</p></div>
    `;
  }

  /* ---------- DIMENSIONES DE LA IGUALDAD ---------- */
  const dimWrap = document.getElementById("dimensionesTable");
  if (dimWrap) {
    dimWrap.innerHTML = P.dimensionesIgualdad?.length
      ? `<table class="datos"><thead><tr><th>Dimensión</th><th>Descripción</th></tr></thead><tbody>
          ${P.dimensionesIgualdad.map(dm=>`<tr><td><strong>${dm.dimension}</strong></td><td>${dm.descripcion}</td></tr>`).join("")}
        </tbody></table>`
      : `<p class="pendiente">${PEND}</p>`;
  }
  const testCard = document.getElementById("testIgualdadCard");
  if (testCard) testCard.innerHTML = `<p>${safe(P.testIgualdad)}</p>`;

  /* ---------- 3. OBJETIVOS ---------- */
  const o = P.objetivos || {};
  const objCards = document.getElementById("objetivosCards");
  if (objCards) {
    let html = `
      <div class="card"><h3>Meta general</h3><p>${safe(o.metaGeneral)}</p></div>
      <div class="card"><h3>Objetivo general</h3><p>${safe(o.objetivoGeneral)}</p></div>
    `;
    const objEsp = o.objetivosEspecificos?.length ? o.objetivosEspecificos : [PEND];
    objEsp.forEach((oe,i) => { html += `<div class="card"><h3>Objetivo específico ${i+1}</h3><p>${oe}</p></div>`; });
    objCards.innerHTML = html;
  }

  /* ---------- 4. PROBLEMA ---------- */
  const pr = P.problema || {};
  const problemaPanel = document.getElementById("problemaPanel");
  if (problemaPanel) {
    problemaPanel.innerHTML = `
      <div class="cards-grid">
        <div class="card"><h3>Contexto</h3><p>${safe(pr.contexto)}</p></div>
        <div class="card"><h3>Situación problemática</h3><p>${safe(pr.situacion)}</p></div>
        <div class="card"><h3>Derecho afectado</h3><p>${safe(pr.derechoAfectado)}</p></div>
        <div class="card"><h3>Población involucrada</h3><p>${safe(pr.poblacion)}</p></div>
        <div class="card"><h3>Consecuencias</h3><p>${safe(pr.consecuencias)}</p></div>
      </div>
      <div class="card" style="margin-top:1.5rem;border-left-color:var(--alerta);">
        <h3>Pregunta / Problema central</h3><p><strong>${safe(pr.preguntaCentral)}</strong></p>
      </div>`;
  }

  /* ---------- 5. PREGUNTAS ---------- */
  const accWrap = document.getElementById("preguntasAccordion");
  if (accWrap) {
    const preguntas = P.preguntasOrientadoras?.length ? P.preguntasOrientadoras : [{pregunta:PEND, respuesta:PEND}];
    preguntas.forEach(pg => {
      const item = el("div","accordion-item",`
        <div class="accordion-header"><span>${pg.pregunta}</span><span class="accordion-icon">+</span></div>
        <div class="accordion-body"><p>${safe(pg.respuesta)}</p></div>
      `);
      item.querySelector(".accordion-header").addEventListener("click", () => item.classList.toggle("open"));
      accWrap.appendChild(item);
    });
  }

  /* ---------- MARCO HISTÓRICO ---------- */
  const buildAspectoTable = (arr) => arr?.length ? `<table class="datos"><thead><tr><th>Aspecto</th><th>Característica</th></tr></thead><tbody>
    ${arr.map(a=>`<tr><td><strong>${a.aspecto}</strong></td><td>${a.caracteristica}</td></tr>`).join("")}
  </tbody></table>` : `<p class="pendiente">${PEND}</p>`;

  const tabla1886 = document.getElementById("tabla1886");
  if (tabla1886) tabla1886.innerHTML = buildAspectoTable(P.marcoHistorico1886);
  const tabla1991 = document.getElementById("tabla1991");
  if (tabla1991) tabla1991.innerHTML = buildAspectoTable(P.marcoHistorico1991);

  const lim1886 = document.getElementById("limitaciones1886");
  if (lim1886) lim1886.innerHTML = (P.limitaciones1886||[]).map(l=>`<li>${l}</li>`).join("") || `<li class="pendiente">${PEND}</li>`;
  const av1991 = document.getElementById("avances1991");
  if (av1991) av1991.innerHTML = (P.avances1991||[]).map(l=>`<li>${l}</li>`).join("") || `<li class="pendiente">${PEND}</li>`;

  /* ---------- 8. INVESTIGACIÓN ---------- */
  const normasWrap = document.getElementById("tab-normas");
  if (normasWrap) {
    const norm = P.investigacion?.normas?.length ? P.investigacion.normas : [];
    normasWrap.innerHTML = norm.length
      ? norm.map(n=>`<div class="card"><h3>${n.norma} ${n.articulo? '· '+n.articulo:''}</h3><p>${n.contenido}</p></div>`).join("")
      : `<p class="pendiente">${PEND}</p>`;
  }

  const jurisWrap = document.getElementById("tab-jurisprudencia");
  if (jurisWrap) {
    const juris = P.investigacion?.jurisprudencia?.length ? P.investigacion.jurisprudencia : [];
    jurisWrap.innerHTML = juris.length ? juris.map(s => `
      <div class="sentencia-card">
        <h4>${s.corporacion} — Sentencia ${s.numero} (${s.anio})</h4>
        <div class="meta">${s.ponente ? "M.P. " + s.ponente : ""}</div>
        <dl>
          <dt>Problema jurídico</dt><dd>${safe(s.problemaJuridico)}</dd>
          <dt>Hechos relevantes</dt><dd>${safe(s.hechos)}</dd>
          <dt>Decisión</dt><dd>${safe(s.decision)}</dd>
          <dt>Regla/subregla</dt><dd>${safe(s.regla)}</dd>
          <dt>Importancia</dt><dd>${safe(s.importancia)}</dd>
        </dl>
      </div>`).join("") : `<p class="pendiente">${PEND}</p>`;
  }

  const doctWrap = document.getElementById("tab-doctrina");
  if (doctWrap) {
    const doct = P.investigacion?.doctrina?.length ? P.investigacion.doctrina : [];
    doctWrap.innerHTML = doct.length ? doct.map(dt => `
      <div class="card"><h3>${dt.autor} (${dt.anio})</h3><p><em>${dt.obra}</em></p><p>${dt.concepto}</p><p><strong>Relación:</strong> ${dt.relacion}</p></div>
    `).join("") : `<p class="pendiente">${PEND}</p>`;
  }

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-"+btn.dataset.tab).classList.add("active");
    });
  });

  /* ---------- 9. ANÁLISIS COMPARATIVO ---------- */
  const compWrap = document.getElementById("comparativoTable");
  if (compWrap) {
    const comp = P.analisisComparativo?.length ? P.analisisComparativo : [];
    if (!comp.length) compWrap.innerHTML = `<p class="pendiente">${PEND}</p>`;
    else {
      let rows = comp.map(c => `<tr><td><strong>${c.criterio}</strong></td><td>${c.situacionA||PEND}</td><td>${c.situacionB||PEND}</td></tr>`).join("");
      compWrap.innerHTML = `<table class="comparativa"><thead><tr><th>Criterio</th><th>Constitución 1886</th><th>Constitución 1991</th></tr></thead><tbody>${rows}</tbody></table>`;
    }
  }

  /* ---------- 10. CASOS RECIENTES ---------- */
  const casosWrap = document.getElementById("casosCards");
  if (casosWrap) {
    const casos = P.casosRecientes?.length ? P.casosRecientes : [];
    if (!casos.length) casosWrap.innerHTML = `<p class="pendiente">${PEND}</p>`;
    else casos.forEach(c => {
      const card = el("div","caso-card",`
        <div class="caso-header"><strong>${c.nombre} — ${c.fecha}</strong><span class="accordion-icon">+</span></div>
        <div class="caso-body">
          <p><strong>Contexto:</strong> ${safe(c.contexto)}</p>
          <p><strong>Derecho involucrado:</strong> ${safe(c.derecho)}</p>
          <p><strong>Problema jurídico:</strong> ${safe(c.problemaJuridico)}</p>
          <p><strong>Decisión:</strong> ${safe(c.decision)}</p>
          <p><strong>Argumentos relevantes:</strong> ${safe(c.argumentos)}</p>
          <p><strong>Impacto:</strong> ${safe(c.impacto)}</p>
        </div>`);
      card.querySelector(".caso-header").addEventListener("click",()=>card.classList.toggle("open"));
      casosWrap.appendChild(card);
    });
  }

  /* ---------- MECANISMOS DE PROTECCIÓN ---------- */
  const mcWrap = document.getElementById("mecanismosConstitucionales");
  if (mcWrap) {
    const mc = P.mecanismosConstitucionales || [];
    mcWrap.innerHTML = mc.length ? `<table class="datos">
      <thead><tr><th>Mecanismo</th><th>Fundamento</th><th>Descripción</th><th>Plazo</th></tr></thead>
      <tbody>${mc.map(m=>`<tr><td><strong>${m.mecanismo}</strong></td><td>${m.fundamento}</td><td>${m.descripcion}</td><td>${m.plazo}</td></tr>`).join("")}</tbody>
    </table>` : `<p class="pendiente">${PEND}</p>`;
  }

  const miWrap = document.getElementById("mecanismosInternacionales");
  if (miWrap) {
    const mi = P.mecanismosInternacionales || [];
    miWrap.innerHTML = mi.length ? `<table class="datos">
      <thead><tr><th>Mecanismo</th><th>Instrumento</th><th>Descripción</th></tr></thead>
      <tbody>${mi.map(m=>`<tr><td><strong>${m.mecanismo}</strong></td><td>${m.instrumento}</td><td>${m.descripcion}</td></tr>`).join("")}</tbody>
    </table>` : `<p class="pendiente">${PEND}</p>`;
  }

  const instWrap = document.getElementById("institucionesProteccion");
  if (instWrap) instWrap.innerHTML = (P.institucionesProteccion||[]).map(i=>`<li>${i}</li>`).join("") || `<li class="pendiente">${PEND}</li>`;

  /* ---------- 6. PLAN DE TRABAJO ---------- */
  const rolesWrap = document.getElementById("rolesTable");
  if (rolesWrap) {
    const roles = P.integrantes || [];
    rolesWrap.innerHTML = roles.length ? `<table class="datos">
      <thead><tr><th>Integrante</th><th>Rol Principal</th><th>Responsabilidades</th></tr></thead>
      <tbody>${roles.map(r=>`<tr><td><strong>${r.nombre}</strong></td><td>${r.rol}</td><td>${r.responsabilidades}</td></tr>`).join("")}</tbody>
    </table>` : `<p class="pendiente">${PEND}</p>`;
  }

  const planWrap = document.getElementById("planTimeline");
  if (planWrap) {
    const plan = P.planTrabajo?.length ? P.planTrabajo : [{fase:PEND, actividad:PEND, responsable:PEND, recursos:PEND, producto:PEND, estado:"pendiente"}];
    plan.forEach(f => {
      planWrap.appendChild(el("div","timeline-item",`
        <h4>${f.fase}</h4>
        <div class="meta">Responsable: ${f.responsable} · Recursos: ${f.recursos}</div>
        <p><strong>Actividad:</strong> ${f.actividad}</p>
        <p><strong>Producto esperado:</strong> ${f.producto}</p>
        <span class="status-pill status-${f.estado||'pendiente'}">${(f.estado||'pendiente').toUpperCase()}</span>
      `));
    });
  }

  const recWrap = document.getElementById("recursosTable");
  if (recWrap) {
    const rec = P.recursosNecesarios || [];
    recWrap.innerHTML = rec.length ? `<table class="datos">
      <thead><tr><th>Recurso</th><th>Tipo</th><th>Fuente</th></tr></thead>
      <tbody>${rec.map(r=>`<tr><td><strong>${r.recurso}</strong></td><td>${r.tipo}</td><td>${r.fuente}</td></tr>`).join("")}</tbody>
    </table>` : `<p class="pendiente">${PEND}</p>`;
  }

  /* ---------- 7. CRONOGRAMA (Gantt simplificado) ---------- */
  const gantt = document.getElementById("ganttChart");
  if (gantt) {
    const cron = P.cronograma?.length ? P.cronograma : [];
    if (!cron.length) gantt.innerHTML = `<p class="pendiente">${PEND}</p>`;
    else {
      const dates = cron.flatMap(c => [new Date(c.inicio), new Date(c.fin)]).filter(dt=>!isNaN(dt));
      const min = new Date(Math.min(...dates));
      const max = new Date(Math.max(...dates));
      const totalDays = Math.max(1,(max-min)/(1000*60*60*24));
      cron.forEach(c => {
        const start = new Date(c.inicio), end = new Date(c.fin);
        const offset = ((start-min)/(1000*60*60*24))/totalDays*100;
        const width = Math.max(3,((end-start)/(1000*60*60*24))/totalDays*100);
        const row = el("div","gantt-row",`
          <div class="gantt-label">${c.actividad}</div>
          <div class="gantt-track"><div class="gantt-bar" style="left:${offset}%;width:${width}%">${c.producto||""}</div></div>
        `);
        gantt.appendChild(row);
      });
    }
  }

  /* ---------- 11. RESULTADOS ---------- */
  const resWrap = document.getElementById("resultadosCards");
  if (resWrap) {
    const res = P.resultados?.length ? P.resultados : [];
    resWrap.innerHTML = res.length
      ? res.map(r=>`<div class="card"><h3>${r.categoria}</h3><p>${r.texto}</p></div>`).join("")
      : `<p class="pendiente">${PEND}</p>`;
  }

  /* ---------- 12. EVIDENCIAS ---------- */
  const evWrap = document.getElementById("evidenciasTimeline");
  if (evWrap) {
    const ev = P.evidencias?.length ? P.evidencias : [];
    if (!ev.length) evWrap.innerHTML = `<p class="pendiente">${PEND}</p>`;
    else ev.forEach(e => {
      let media = "";
      if (e.tipo === "imagen") media = `<div class="evidencia-media"><img src="${e.src}" alt="${e.titulo}"></div>`;
      else if (e.tipo === "video") media = `<div class="evidencia-media"><iframe src="${e.src}" allowfullscreen></iframe></div>`;
      else if (e.tipo === "enlace" || e.tipo === "documento") media = `<p><a href="${e.src}" target="_blank" rel="noopener">Ver ${e.tipo}</a></p>`;
      evWrap.appendChild(el("div","timeline-item",`
        <h4>${e.titulo}</h4>
        <div class="meta">${e.fecha}</div>
        <p>${e.descripcion}</p>${media}
      `));
    });
  }

  /* ---------- 13. REFLEXIÓN ---------- */
  const rf = P.reflexion || {};
  const reflexionPanel = document.getElementById("reflexionPanel");
  if (reflexionPanel) {
    reflexionPanel.innerHTML = `
      <div class="cards-grid">
        <div class="card"><h3>Aprendizajes</h3><p>${safe(rf.aprendizajes)}</p></div>
        <div class="card"><h3>Dificultades</h3><p>${safe(rf.dificultades)}</p></div>
        <div class="card"><h3>Soluciones</h3><p>${safe(rf.soluciones)}</p></div>
        <div class="card"><h3>Conocimientos constitucionales aplicados</h3><p>${safe(rf.conocimientosAplicados)}</p></div>
        <div class="card"><h3>Aporte de la investigación</h3><p>${safe(rf.aporte)}</p></div>
        <div class="card"><h3>Reflexión final</h3><p>${safe(rf.reflexionFinal)}</p></div>
      </div>`;
  }

  /* ---------- AUTOEVALUACIÓN ---------- */
  const auto = P.autoevaluacion || {};
  const autoTable = document.getElementById("autoevaluacionTable");
  if (autoTable) {
    autoTable.innerHTML = auto.matriz?.length ? `<table class="datos">
      <thead><tr><th>Criterio</th><th>Nivel alcanzado</th></tr></thead>
      <tbody>${auto.matriz.map(m=>`<tr><td><strong>${m.criterio}</strong></td><td>${m.nivel}</td></tr>`).join("")}</tbody>
    </table>` : `<p class="pendiente">${PEND}</p>`;
  }
  const leccionesWrap = document.getElementById("leccionesAprendidas");
  if (leccionesWrap) leccionesWrap.innerHTML = (auto.lecciones||[]).map(l=>`<li>${l}</li>`).join("") || `<li class="pendiente">${PEND}</li>`;

  /* ---------- 14. PRESENTACIÓN FINAL ---------- */
  const pf = P.presentacionFinal || {};
  const finalPanel = document.getElementById("finalPanel");
  if (finalPanel) {
    let finalHtml = "";
    if (pf.videoUrl) finalHtml += `<div class="evidencia-media"><iframe src="${pf.videoUrl}" height="420" allowfullscreen></iframe></div>`;
    else finalHtml += `<p class="pendiente">${PEND} (video)</p>`;
    finalHtml += `<div class="cards-grid" style="margin-top:1.5rem;">`;
    finalHtml += pf.pptUrl ? `<div class="card"><h3>Presentación</h3><a href="${pf.pptUrl}" target="_blank">Ver presentación</a></div>` : `<div class="card"><h3>Presentación</h3><p class="pendiente">${PEND}</p></div>`;
    finalHtml += pf.pdfUrl ? `<div class="card"><h3>Documento PDF</h3><a href="${pf.pdfUrl}" target="_blank">Ver documento</a></div>` : `<div class="card"><h3>Documento PDF</h3><p class="pendiente">${PEND}</p></div>`;
    finalHtml += pf.enlaceExterno ? `<div class="card"><h3>Enlace externo</h3><a href="${pf.enlaceExterno}" target="_blank">Abrir enlace</a></div>` : `<div class="card"><h3>Enlace externo</h3><p class="pendiente">${PEND}</p></div>`;
    finalHtml += `</div>`;
    finalPanel.innerHTML = finalHtml;
  }

  /* ---------- 15. CONCLUSIONES ---------- */
  const conclWrap = document.getElementById("conclusionesCards");
  if (conclWrap) {
    const concl = P.conclusiones?.length ? P.conclusiones : [PEND];
    conclWrap.innerHTML = concl.map(c => `<div class="card"><p>${c}</p></div>`).join("");
  }

  /* ---------- 16. FUENTES ---------- */
  const f = P.fuentes || {};
  const fuentesPanel = document.getElementById("fuentesPanel");
  if (fuentesPanel) {
    const buildList = (arr) => arr?.length ? `<ul>${arr.map(i=>`<li>${i}</li>`).join("")}</ul>` : `<p class="pendiente">${PEND}</p>`;
    fuentesPanel.innerHTML = `
      <div class="cards-grid">
        <div class="card"><h3>Constitución</h3>${buildList(f.constitucion)}</div>
        <div class="card"><h3>Leyes</h3>${buildList(f.leyes)}</div>
        <div class="card"><h3>Jurisprudencia</h3>${buildList(f.jurisprudencia)}</div>
        <div class="card"><h3>Libros</h3>${buildList(f.libros)}</div>
        <div class="card"><h3>Artículos académicos</h3>${buildList(f.articulos)}</div>
        <div class="card"><h3>Sitios web</h3>${buildList(f.sitiosWeb)}</div>
        <div class="card"><h3>Otras fuentes</h3>${buildList(f.otras)}</div>
      </div>`;
  }
});