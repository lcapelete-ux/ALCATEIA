(() => {
  "use strict";

  const SUPABASE_URL = "https://sbeoxbigzljukeyovfbu.supabase.co";
  const SUPABASE_PUBLIC_KEY = "sb_publishable_VgdaCa2M88HPrLWuY1ckJA_kZ1r_72L";
  const RPC = {
    "register": (p) => ["treinao_register", { p_fullname: p.fullname, p_cpf: p.cpf, p_gender: p.gender, p_birthdate: p.birthdate, p_team: p.team, p_city: p.city, p_consent: p.consent }],
    "confirm-payment": (p) => ["treinao_confirm_payment", { p_cpf: p.cpf, p_payer_name: p.payerName }],
    "admin-list": () => ["treinao_admin_list", {}],
    "admin-check-payment-claim": (p) => ["treinao_admin_check_payment", { p_cpf: p.cpf }],
    "mark-paid": (p) => ["treinao_admin_mark_paid", { p_participant_id: p.participantId }],
  };
  const PIX_KEY = "garpelli15@gmail.com";
  const ADMIN_EMAIL = "lcapelete+alcateia@gmail.com";
  const SESSION_KEY = "alcateia-admin-session";
  let adminSession = null;
  try { adminSession = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { adminSession = null; }
  let allParticipants = [];

  const byId = (id) => document.getElementById(id);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const digitsOnly = (value) => String(value ?? "").replace(/\D/g, "");

  function validCpf(value) {
    const cpf = digitsOnly(value);
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
    let check = (sum * 10) % 11;
    if (check === 10) check = 0;
    if (check !== Number(cpf[9])) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
    check = (sum * 10) % 11;
    if (check === 10) check = 0;
    return check === Number(cpf[10]);
  }

  function maskCpfInput(input) {
    const cpf = digitsOnly(input.value).slice(0, 11);
    input.value = cpf.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function feedback(element, message = "", type = "") {
    element.textContent = message;
    element.classList.remove("error", "success");
    if (type) element.classList.add(type);
  }

  async function api(action, payload = {}, token = "") {
    const [fn, body] = RPC[action](payload);
    const headers = { apikey: SUPABASE_PUBLIC_KEY, "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    let result = {};
    try { result = await response.json(); } catch { /* keep a safe generic message */ }
    if (!response.ok) {
      const expired = response.status === 401 || result?.code === "PGRST301" || result?.code === "28000";
      const error = new Error(expired ? "Sua sessão expirou. Entre novamente." : (result?.message || result?.error || "Não foi possível concluir agora. Tente novamente."));
      error.status = expired ? 401 : response.status;
      throw error;
    }
    return result || {};
  }

  function setBusy(button, busy, originalText) {
    button.disabled = busy;
    button.textContent = busy ? "Aguarde…" : originalText;
  }

  document.querySelectorAll("#reg-cpf, #confirm-cpf, #admin-cpf-lookup").forEach((input) => input.addEventListener("input", () => maskCpfInput(input)));
  const birthdate = byId("reg-birthdate");
  if (birthdate) birthdate.max = "2026-11-08";

  const registrationForm = byId("registration-form");
  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = byId("register-feedback");
    const button = byId("register-button");
    const originalText = "Fazer inscrição · R$ 44,90";
    const values = new FormData(registrationForm);
    const cpf = digitsOnly(values.get("cpf"));
    if (!validCpf(cpf)) return feedback(message, "Confira o CPF digitado.", "error");
    if (!byId("reg-consent").checked) return feedback(message, "Marque a autorização de uso dos dados para continuar.", "error");
    feedback(message);
    setBusy(button, true, originalText);
    try {
      const result = await api("register", {
        fullname: values.get("fullname"),
        cpf,
        gender: values.get("gender"),
        birthdate: values.get("birthdate"),
        team: values.get("team"),
        city: values.get("city"),
        consent: true,
      });
      byId("pix-registration-number").textContent = result.bibnumber ? `Número de inscrição: ${result.bibnumber}` : "Sua inscrição foi registrada.";
      byId("kit-note").textContent = result.kitEligible ? "Você está entre os 150 primeiros inscritos: camiseta e medalha reservadas." : "A camiseta e a medalha são destinadas aos 150 primeiros inscritos.";
      byId("pix-panel").hidden = false;
      feedback(message, "Inscrição registrada. Faça o Pix para concluir.", "success");
      byId("pix-panel").scrollIntoView({ behavior: "smooth", block: "center" });
      registrationForm.reset();
    } catch (error) {
      feedback(message, error.message || "Não foi possível concluir a inscrição agora. Tente novamente.", "error");
    } finally {
      setBusy(button, false, originalText);
    }
  });

  byId("copy-pix").addEventListener("click", async () => {
    const button = byId("copy-pix");
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      button.textContent = "Chave copiada";
      window.setTimeout(() => { button.textContent = "Copiar chave Pix"; }, 1800);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(byId("pix-key"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = "Selecione e copie a chave";
    }
  });

  byId("confirmation-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = byId("confirm-feedback");
    const button = byId("confirm-button");
    const originalText = "Enviar para conferência";
    const values = new FormData(form);
    const cpf = digitsOnly(values.get("cpf"));
    if (!validCpf(cpf)) return feedback(message, "Confira o CPF digitado.", "error");
    feedback(message);
    setBusy(button, true, originalText);
    try {
      const result = await api("confirm-payment", { cpf, payerName: values.get("payerName") });
      feedback(message, result.message, "success");
      form.reset();
    } catch (error) {
      feedback(message, error.message || "Não foi possível enviar a confirmação agora.", "error");
    } finally {
      setBusy(button, false, originalText);
    }
  });

  const adminDetails = byId("admin-details");
  if (window.location.hash === "#organizador") adminDetails.open = true;
  window.addEventListener("hashchange", () => { if (window.location.hash === "#organizador") adminDetails.open = true; });

  function saveSession(data) {
    adminSession = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at || Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600),
    };
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(adminSession)); } catch { /* browser storage can be unavailable */ }
  }

  function clearSession() {
    adminSession = null;
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* browser storage can be unavailable */ }
  }

  function showLogin(message) {
    clearSession();
    byId("admin-dashboard").classList.add("hidden");
    byId("admin-login").classList.remove("hidden");
    feedback(byId("admin-feedback"), message, "error");
  }

  async function signIn(password) {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { apikey: SUPABASE_PUBLIC_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token || !data.refresh_token) {
      const code = data.error_code || data.error || "";
      if (code === "email_not_confirmed") throw new Error("O e-mail do organizador ainda não foi confirmado no Supabase.");
      if (response.status === 401 || /api key/i.test(data.message || "")) throw new Error("Chave do Supabase inválida para este projeto.");
      throw new Error("Usuário ou senha inválidos.");
    }
    saveSession(data);
  }

  async function refreshSession() {
    if (!adminSession?.refresh_token) throw new Error("Sua sessão expirou. Entre novamente.");
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: SUPABASE_PUBLIC_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: adminSession.refresh_token }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.access_token || !data.refresh_token) {
      throw new Error("Sua sessão expirou. Entre novamente.");
    }
    saveSession(data);
    return adminSession.access_token;
  }

  async function adminApi(action, payload = {}) {
    if (!adminSession) throw new Error("Entre no painel para continuar.");
    try {
      const token = adminSession.expires_at <= Math.floor(Date.now() / 1000) + 60
        ? await refreshSession()
        : adminSession.access_token;
      try {
        return await api(action, payload, token);
      } catch (error) {
        if (error.status !== 401) throw error;
        const freshToken = await refreshSession();
        return await api(action, payload, freshToken);
      }
    } catch (error) {
      if (!adminSession || /sessão expirou|Entre no painel/.test(error.message)) showLogin(error.message);
      throw error;
    }
  }

  async function loadDashboard() {
    const result = await adminApi("admin-list");
    allParticipants = result.participants || [];
    byId("admin-login").classList.add("hidden");
    byId("admin-dashboard").classList.remove("hidden");
    byId("admin-welcome").textContent = "Conectado como alcateia";
    drawParticipants();
  }

  byId("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = byId("admin-feedback");
    const values = new FormData(event.currentTarget);
    const username = String(values.get("username") || "").trim().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    if (username !== "alcateia") return feedback(message, "Usuário ou senha inválidos.", "error");
    feedback(message, "Verificando acesso…");
    try {
      await signIn(String(values.get("password") || ""));
      byId("admin-password").value = "";
      await loadDashboard();
      feedback(message, "");
    } catch (error) {
      showLogin(error.message || "Não foi possível entrar.");
    }
  });

  if (adminSession) {
    loadDashboard().catch(() => showLogin("Sua sessão expirou. Entre novamente."));
  }

  function formatDate(value) {
    if (!value) return "—";
    const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("pt-BR");
  }

  function statusClass(status) {
    if (status === "Pago") return "paid";
    if (status === "Aguardando conferência") return "waiting";
    return "";
  }

  function visibleParticipants() {
    const search = byId("participant-search").value.trim().toLocaleLowerCase("pt-BR");
    const status = byId("payment-filter").value;
    return allParticipants.filter((row) => {
      const searchText = `${row.fullname || ""} ${row.team || ""} ${row.city || ""}`.toLocaleLowerCase("pt-BR");
      return (!search || searchText.includes(search)) && (status === "all" || row.paymentstatus === status);
    });
  }

  function drawParticipants() {
    const visible = visibleParticipants();
    const body = byId("participants-body");
    if (!visible.length) {
      body.innerHTML = `<tr><td colspan="8">${allParticipants.length ? "Nenhum inscrito neste filtro." : "Ainda não há inscrições."}</td></tr>`;
    } else {
      body.innerHTML = visible.map((row) => {
        const status = String(row.paymentstatus || "Pendente");
        const canMark = status === "Aguardando conferência";
        return `<tr><td>${esc(row.bibnumber)}</td><td>${esc(row.fullname)}</td><td>${esc(row.cpf_masked)}</td><td>${esc(row.gender)}<br>${esc(formatDate(row.birthdate))}</td><td>${esc(row.team)}<br>${esc(row.city)}</td><td>${esc(row.payer_name || "—")}</td><td><span class="status-badge ${statusClass(status)}">${esc(status)}</span></td><td>${canMark ? `<button class="mark-paid" type="button" data-paid-id="${esc(row.id)}">Marcar pago</button>` : "—"}</td></tr>`;
      }).join("");
    }
    byId("stat-total").textContent = String(allParticipants.length);
    byId("stat-review").textContent = String(allParticipants.filter((row) => row.paymentstatus === "Aguardando conferência").length);
    byId("stat-paid").textContent = String(allParticipants.filter((row) => row.paymentstatus === "Pago").length);
    drawPrintReport();
  }

  function drawPrintReport() {
    const sorted = [...allParticipants].sort((a, b) => Number(a.bibnumber) - Number(b.bibnumber));
    byId("report-body").innerHTML = sorted.map((row) => `<tr><td>${esc(row.bibnumber)}</td><td>${esc(row.fullname)}</td><td>${esc(row.gender)}</td><td>${esc(formatDate(row.birthdate))}</td><td>${esc(row.team)}</td><td>${esc(row.city)}</td><td>${esc(row.paymentstatus || "Pendente")}</td></tr>`).join("");
    byId("report-date").textContent = `Gerado em ${new Date().toLocaleString("pt-BR")}`;
    byId("report-total").textContent = `Total de participantes: ${sorted.length}. O CPF completo não aparece neste relatório.`;
  }

  byId("participant-search").addEventListener("input", drawParticipants);
  byId("payment-filter").addEventListener("change", drawParticipants);
  byId("payment-lookup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = byId("payment-lookup-feedback");
    const button = byId("payment-lookup-button");
    const originalText = "Consultar";
    const cpf = digitsOnly(byId("admin-cpf-lookup").value);
    if (!validCpf(cpf)) return feedback(message, "Digite um CPF válido para consultar.", "error");
    feedback(message, "Consultando inscrição…");
    setBusy(button, true, originalText);
    try {
      const result = await adminApi("admin-check-payment-claim", { cpf });
      if (!result.found) {
        feedback(message, "Não encontramos inscrição com esse CPF.", "error");
      } else if (result.claimed) {
        const status = result.paymentStatus === "Pago" ? "Pagamento confirmado." : "Aguardando conferência do pagamento.";
        feedback(message, `Sim — o corredor informou que pagou. ${status}`, "success");
      } else {
        feedback(message, "Não — o corredor ainda não informou que pagou.");
      }
    } catch (error) {
      feedback(message, error.message || "Não foi possível consultar este CPF.", "error");
    } finally {
      setBusy(button, false, originalText);
    }
  });
  byId("refresh-list").addEventListener("click", async () => {
    const message = byId("dashboard-feedback");
    feedback(message, "Atualizando lista…");
    try { await loadDashboard(); feedback(message, "Lista atualizada.", "success"); }
    catch (error) { feedback(message, error.message || "Não foi possível atualizar.", "error"); }
  });

  byId("participants-body").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-paid-id]");
    if (!button) return;
    const message = byId("dashboard-feedback");
    button.disabled = true;
    try {
      await adminApi("mark-paid", { participantId: button.dataset.paidId });
      feedback(message, "Pagamento confirmado.", "success");
      await loadDashboard();
    } catch (error) {
      feedback(message, error.message || "Não foi possível confirmar este pagamento.", "error");
      button.disabled = false;
    }
  });

  byId("print-list").addEventListener("click", () => {
    if (!allParticipants.length) return feedback(byId("dashboard-feedback"), "Não há participantes para exportar.", "error");
    drawPrintReport();
    window.print();
  });

  byId("admin-logout").addEventListener("click", () => {
    clearSession();
    allParticipants = [];
    byId("admin-cpf-lookup").value = "";
    feedback(byId("payment-lookup-feedback"), "");
    byId("admin-dashboard").classList.add("hidden");
    byId("admin-login").classList.remove("hidden");
    byId("login-form").reset();
    feedback(byId("admin-feedback"), "Você saiu do painel.", "success");
  });
})();
