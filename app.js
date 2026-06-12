(function () {
  "use strict";

  const pulsars = Array.isArray(window.PULSARS) ? window.PULSARS : [];
  const colors = ["#007a74", "#c74737", "#5b57a6", "#b56a00", "#2f6f9f", "#7b5b2e"];

  const skyMap = document.getElementById("skyMap");
  const legend = document.getElementById("legend");
  const rows = document.getElementById("pulsarRows");
  const totalCount = document.getElementById("totalCount");
  const projectCount = document.getElementById("projectCount");
  const foldPanel = document.getElementById("foldPanel");
  const foldProject = document.getElementById("foldProject");
  const foldName = document.getElementById("foldName");
  const foldImage = document.getElementById("foldImage");
  const foldImageLink = document.getElementById("foldImageLink");
  const foldDm = document.getElementById("foldDm");
  const foldPeriod = document.getElementById("foldPeriod");
  const foldDiscoveryDate = document.getElementById("foldDiscoveryDate");
  const foldRa = document.getElementById("foldRa");
  const foldDec = document.getElementById("foldDec");
  let selectedName = "";

  function parseRaHours(value) {
    const parts = String(value).trim().split(":").map(Number);
    const [hh = 0, mm = 0, ss = 0] = parts;
    return hh + mm / 60 + ss / 3600;
  }

  function parseDecDegrees(value) {
    const text = String(value).trim();
    const sign = text.startsWith("-") ? -1 : 1;
    const clean = text.replace(/^[+-]/, "");
    const [dd = 0, mm = 0, ss = 0] = clean.split(":").map(Number);
    return sign * (dd + mm / 60 + ss / 3600);
  }

  function projectPosition(pulsar) {
    const raHours = parseRaHours(pulsar.ra);
    const decDegrees = parseDecDegrees(pulsar.dec);
    return {
      x: ((24 - raHours) / 24) * 100,
      y: ((90 - decDegrees) / 180) * 100
    };
  }

  function formatDecimal(value, fractionDigits) {
    const number = Number(value);
    if (!Number.isFinite(number)) return String(value);
    return number.toFixed(fractionDigits);
  }

  function formatDmValue(value) {
    return formatDecimal(value, 2);
  }

  function formatPeriodValue(value) {
    return formatDecimal(value, 8);
  }

  function projects() {
    return Array.from(new Set(pulsars.map((pulsar) => pulsar.project))).sort();
  }

  function projectColorMap() {
    const map = new Map();
    projects().forEach((project, index) => {
      map.set(project, colors[index % colors.length]);
    });
    return map;
  }

  function addAxisLabels() {
    for (let hour = 0; hour <= 24; hour += 4) {
      const label = document.createElement("span");
      label.className = "axis-label ra-label";
      label.style.left = `${((24 - hour) / 24) * 100}%`;
      label.textContent = `${hour}h`;
      skyMap.appendChild(label);
    }

    for (let dec = -60; dec <= 60; dec += 30) {
      const label = document.createElement("span");
      label.className = "axis-label dec-label";
      label.style.top = `${((90 - dec) / 180) * 100}%`;
      label.textContent = `${dec > 0 ? "+" : ""}${dec}°`;
      skyMap.appendChild(label);
    }
  }

  function renderLegend(colorMap) {
    legend.replaceChildren();
    for (const [project, color] of colorMap) {
      const item = document.createElement("div");
      const swatch = document.createElement("span");
      const text = document.createElement("span");

      item.className = "legend-item";
      swatch.className = "swatch";
      swatch.style.background = color;
      text.textContent = project;

      item.append(swatch, text);
      legend.appendChild(item);
    }
  }

  function renderMarkers(colorMap) {
    for (const pulsar of pulsars) {
      const pos = projectPosition(pulsar);
      const marker = document.createElement("button");
      const dot = document.createElement("span");
      const label = document.createElement("span");

      marker.type = "button";
      marker.className = "pulsar-marker";
      marker.style.left = `${pos.x}%`;
      marker.style.top = `${pos.y}%`;
      marker.style.setProperty("--color", colorMap.get(pulsar.project));
      marker.title = `${pulsar.name} | DM ${formatDmValue(pulsar.dm)} pc cm^-3 | Period ${formatPeriodValue(pulsar.period_s)} s | Discovery ${pulsar.discovery_date || "TBD"} | ${pulsar.ra}, ${pulsar.dec}`;
      marker.dataset.name = pulsar.name;
      marker.addEventListener("click", () => selectPulsar(pulsar.name, true));

      dot.className = "dot";
      label.textContent = pulsar.name;
      marker.append(dot, label);
      skyMap.appendChild(marker);
    }
  }

  function setSelectedMarker() {
    skyMap.querySelectorAll(".pulsar-marker").forEach((marker) => {
      marker.classList.toggle("is-selected", marker.dataset.name === selectedName);
    });
  }

  function selectPulsar(name, updateHash) {
    const pulsar = pulsars.find((item) => item.name === name);
    if (!pulsar) return;

    selectedName = pulsar.name;
    foldPanel.hidden = false;
    foldProject.textContent = pulsar.project;
    foldName.textContent = pulsar.name;
    foldImage.src = pulsar.image || "plots/fold_placeholder.svg";
    foldImage.alt = `${pulsar.name} folded diagnostic plot`;
    foldImageLink.href = foldImage.src;
    foldDm.textContent = formatDmValue(pulsar.dm);
    foldPeriod.textContent = formatPeriodValue(pulsar.period_s);
    foldDiscoveryDate.textContent = pulsar.discovery_date || "TBD";
    foldRa.textContent = pulsar.ra;
    foldDec.textContent = pulsar.dec;
    setSelectedMarker();

    if (updateHash) {
      history.replaceState(null, "", `#${encodeURIComponent(pulsar.name)}`);
    }
  }

  function renderRows() {
    const header = document.createElement("div");
    header.className = "row header";
    [
      "Name",
      "DM (pc cm<sup>-3</sup>)",
      "Period (s)",
      "Discovery Date",
      "RA",
      "DEC",
      "Project"
    ].forEach((name) => {
      const cell = document.createElement("span");
      cell.innerHTML = name;
      header.appendChild(cell);
    });
    rows.appendChild(header);

    pulsars.forEach((pulsar) => {
      const row = document.createElement("div");
      row.className = "row";
      row.tabIndex = 0;
      row.title = `View folded diagnostic plot for ${pulsar.name}`;
      row.addEventListener("click", () => selectPulsar(pulsar.name, true));
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectPulsar(pulsar.name, true);
        }
      });
      [
        pulsar.name,
        formatDmValue(pulsar.dm),
        formatPeriodValue(pulsar.period_s),
        pulsar.discovery_date || "TBD",
        pulsar.ra,
        pulsar.dec,
        pulsar.project
      ].forEach((value) => {
        const cell = document.createElement("span");
        cell.textContent = value;
        row.appendChild(cell);
      });
      rows.appendChild(row);
    });
  }

  function renderStats() {
    totalCount.textContent = String(pulsars.length);
    projectCount.textContent = String(projects().length);
  }

  const colorMap = projectColorMap();
  renderStats();
  addAxisLabels();
  renderLegend(colorMap);
  renderMarkers(colorMap);
  renderRows();
  if (location.hash) {
    selectPulsar(decodeURIComponent(location.hash.slice(1)), false);
  }
})();
