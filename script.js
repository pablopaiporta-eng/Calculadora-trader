// JS
window.onerror = (m, s, l, c, e) => { document.body.innerHTML = "<pre style='color:#fff;white-space:pre-wrap;padding:12px'>JS ERROR:\n" + m + "\n" + s + ":" + l + ":" + c + "\n" + (e?.stack||"") + "</pre>"; };
document.addEventListener("DOMContentLoaded", () => {
const monedaSelect = document.getElementById("moneda");
  const symbolMap = { EUR: "€", USD: "$", GBP: "£" };
const symbol = symbolMap[monedaSelect.value] || "€";
  const capitalEl = document.getElementById("capital");

  const riesgoEl = document.getElementById("riesgo");

  const stopEl = document.getElementById("stop");

  const btn = document.getElementById("calcular");

  const errorEl = document.getElementById("error");

  const posicionOut = document.getElementById("posicionOut");

  const riesgoOut = document.getElementById("riesgoOut");

  const slOut = document.getElementById("slOut");

  const limpiarError = () => (errorEl.textContent = "");

  [capitalEl, riesgoEl, stopEl].forEach((el) => {

    el.addEventListener("input", () => {

      limpiarError();

    });

  });

  const fmt = (n) =>

    new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

  btn.addEventListener("click", () => {
const symbol = { EUR: "€", USD: "$", GBP: "£" }[monedaSelect.value] || "€";
    limpiarError();

    const capital = parseFloat(capitalEl.value);

    const riesgo = parseFloat(riesgoEl.value);

    const stop = parseFloat(stopEl.value);

    if (!Number.isFinite(capital) || !Number.isFinite(riesgo) || !Number.isFinite(stop)) {

      errorEl.textContent = "Rellena los 3 campos.";

      return;

    }

    if (capital <= 0) {

      errorEl.textContent = "Capital debe ser > 0.";

      return;

    }

    if (riesgo <= 0 || riesgo > 5) {

      errorEl.textContent = "Riesgo debe ser > 0 y ≤ 5%.";

      return;

    }

    if (stop <= 0 || stop >= 100) {

      errorEl.textContent = "Stop debe ser > 0 y < 100%.";

      return;

    }

    const riesgoEuros = capital * (riesgo / 100);

    const posicion = riesgoEuros / (stop / 100);

    const stopValue = riesgoEuros; // por definición: pérdida al SL = riesgo

    const symbol = symbolMap[monedaSelect.value] || "€";
posicionOut.textContent = `${posicion.toFixed(2)} ${symbol}`;
riesgoOut.textContent   = `${riesgoEuros.toFixed(2)} ${symbol}`;
slOut.textContent       = `${stopValue.toFixed(2)} ${symbol}`;
  
    document.getElementById("entrar") && document.getElementById("entrar").addEventListener("click", () => document.getElementById("intro").classList.add("closed"));

  });

// === ADD-ON: TP% + R:R + Win% necesario ===

document.addEventListener("DOMContentLoaded", () => {

  const root = document.querySelector(".inputs");

  if (!root) return;

  // 1) Inserta fila TP% debajo del Stop

  const stopRow = root.querySelector('input#stop')?.closest(".row");

  if (stopRow && !document.getElementById("tp")) {

    const tpRow = document.createElement("div");

    tpRow.className = "row";

    tpRow.innerHTML = `

      <div class="left">

        <div class="lbl">Take Profit</div>

        <div class="hint">TP (%)</div>

      </div>

      <div class="right">

        <input id="tp" type="number" inputmode="decimal" placeholder="2" step="any" min="0" />

        <span class="unit">%</span>

      </div>

    `;

    stopRow.insertAdjacentElement("afterend", tpRow);

  }

  // 2) Inserta 2 tarjetas de resultados (R:R y Win% necesario) debajo de STOP LOSS VALUE

  const results = document.querySelector(".results");

  if (results && !document.getElementById("rrOut")) {

    const rrCard = document.createElement("div");

    rrCard.className = "resultCard neonViolet";

    rrCard.innerHTML = `

      <div class="rLeft">

        <div class="rTitle">R:R</div>

        <div class="rSub">Ratio riesgo/recompensa</div>

      </div>

      <div class="rValue"><span id="rrOut">—</span><span class="rUnit">x</span></div>

    `;

    const winCard = document.createElement("div");

    winCard.className = "resultCard neonBlue";

    winCard.innerHTML = `

      <div class="rLeft">

        <div class="rTitle">WIN %</div>

        <div class="rSub">Win % necesario</div>

      </div>

      <div class="rValue"><span id="winOut">—</span><span class="rUnit">%</span></div>

    `;

    results.appendChild(rrCard);

    results.appendChild(winCard);

  }

  // 3) Recalcular al click

  const btn = document.getElementById("calcular");

  const errorEl = document.getElementById("error");

  const tpEl = document.getElementById("tp");

  const rrOut = document.getElementById("rrOut");

  const winOut = document.getElementById("winOut");

  if (!btn || !tpEl || !rrOut || !winOut) return;

  const fmt2 = (n) => (Number.isFinite(n) ? n.toFixed(2) : "—");

  btn.addEventListener("click", () => {

    const stop = parseFloat(document.getElementById("stop")?.value);

    const tp = parseFloat(tpEl.value);

    // si tu validación ya escribe error, respetamos y no tocamos nada

    if (errorEl && errorEl.textContent) return;

    // validación mínima TP

    if (!Number.isFinite(tp) || tp <= 0 || tp >= 100) {

      if (errorEl) errorEl.textContent = "TP debe ser > 0 y < 100%.";

      rrOut.textContent = "—";

      winOut.textContent = "—";

      return;

    }

    if (!Number.isFinite(stop) || stop <= 0 || stop >= 100) return;

    const rr = tp / stop;                 // recompensa / riesgo

    const winNeeded = 100 / (1 + rr);     // break-even win rate

    rrOut.textContent = fmt2(rr);

    winOut.textContent = fmt2(winNeeded);

  });
// Validación extra (0–100) + decimales

const clampPct = (v) => Math.max(0.0001, Math.min(100, v));

const readPct = (el) => {

  const v = parseFloat(el.value);

  return Number.isFinite(v) ? clampPct(v) : NaN;

};
});
