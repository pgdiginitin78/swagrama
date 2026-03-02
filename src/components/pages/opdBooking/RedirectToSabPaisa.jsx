export const RedirectToSabPaisa = (data) => {
  const form = document.createElement("form");

  form.setAttribute("method", "POST");
  form.setAttribute("action", data.sabPaisaUrl);

  form.innerHTML = `
      <input type="hidden" name="encData" value="${data.encData}" />
      <input type="hidden" name="clientCode" value="${data.clientCode}" />
  `;

  document.body.appendChild(form);
  form.submit();
};