# Test info

- Name: Chat - JumboIA >> CHAT-008: Humanização do texto da resposta
- Location: C:\Users\monte\Desktop\Projetos\JumboIA\tests\specs\chat.spec.ts:113:7

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /enviar/i })

    at C:\Users\monte\Desktop\Projetos\JumboIA\tests\specs\chat.spec.ts:118:22
```

# Page snapshot

```yaml
- banner:
  - link "JumboIA by Gotta":
    - /url: /
  - navigation:
    - link "Chat IA":
      - /url: /
    - link "Quizzes":
      - /url: /quizzes
    - link "Matérias":
      - /url: /materias
    - link "Simulado":
      - /url: /simulado
    - link "Calendário":
      - /url: /calendario
  - button "Créditos":
    - img
- main:
  - text: "Você 08:02 PM Conte uma curiosidade interessante sobre o espaço. JumboIA 08:02 PM Sure! Here's an interesting curiosity about space: Did you know that there are mysterious flashes of energy in the universe called \"Fast Radio Bursts\" (FRBs)? These brief, intense pulses originate from distant galaxies and can release as much energy in a millisecond as the sun does in an entire year. Some of these signals have been traveling through space for billions of years, and scientists are still unsure what causes them—could be anything from advanced alien technology to exotic astrophysical phenomena! Isn't that fascinating?"
  - button "Humanizar texto"
  - textbox "Digite sua pergunta aqui..."
  - text: 0/5000
  - button "JumboIA"
  - button "Limpar conversa":
    - img
  - button "Criar imagem" [disabled]:
    - img
  - button "Criar cronograma" [disabled]:
    - img
  - button "Live":
    - img
    - text: Live
  - button [disabled]:
    - img
```

# Test source

```ts
   18 |     await input.fill('Qual a capital da França?');
   19 |     await sendButton.click();
   20 |     // Espera resposta da IA
   21 |     const resposta = page.locator('.chat-message.ai');
   22 |     await expect(resposta).toContainText(/paris/i, { timeout: 15000 });
   23 |   });
   24 |
   25 |   test('CHAT-002: Manutenção de contexto em conversa', async ({ page }) => {
   26 |     await page.goto('/');
   27 |     const input = page.locator('input[type="text"]');
   28 |     const sendButton = page.getByRole('button', { name: /enviar/i });
   29 |     await input.fill('Qual a capital da França?');
   30 |     await sendButton.click();
   31 |     await page.waitForTimeout(5000);
   32 |     await input.fill('E qual sua população?');
   33 |     await sendButton.click();
   34 |     const resposta = page.locator('.chat-message.ai').last();
   35 |     await expect(resposta).toContainText(/milh|habitantes|pessoas|popula/i, { timeout: 15000 });
   36 |   });
   37 |
   38 |   test('CHAT-003: Limite de caracteres no input', async ({ page }) => {
   39 |     await page.goto('/');
   40 |     const input = page.locator('input[type="text"]');
   41 |     // Tenta preencher acima do limite (assumindo 500 caracteres)
   42 |     const textoLongo = 'a'.repeat(600);
   43 |     await input.fill(textoLongo);
   44 |     // Verifica se o valor do input não excede 500 caracteres
   45 |     const valor = await input.inputValue();
   46 |     expect(valor.length).toBeLessThanOrEqual(500);
   47 |     // Verifica se o contador de caracteres está correto (se existir)
   48 |     const contador = page.locator('.char-counter');
   49 |     if (await contador.count() > 0) {
   50 |       await expect(contador).toContainText(/500/);
   51 |     }
   52 |   });
   53 |
   54 |   test('CHAT-004: Envio de mensagem vazia', async ({ page }) => {
   55 |     await page.goto('/');
   56 |     const input = page.locator('input[type="text"]');
   57 |     const sendButton = page.getByRole('button', { name: /enviar/i });
   58 |     await input.fill('');
   59 |     // O botão deve estar desabilitado OU não deve acontecer nada ao clicar
   60 |     if (await sendButton.isDisabled()) {
   61 |       expect(await sendButton.isDisabled()).toBeTruthy();
   62 |     } else {
   63 |       await sendButton.click();
   64 |       // Não deve aparecer nova mensagem do usuário ou da IA
   65 |       const mensagens = await page.locator('.chat-message').count();
   66 |       await page.waitForTimeout(2000);
   67 |       expect(await page.locator('.chat-message').count()).toBe(mensagens);
   68 |     }
   69 |   });
   70 |
   71 |   test('CHAT-005: Tratamento de erro da API OpenRouter (manual)', async ({ page }) => {
   72 |     // Este teste depende de configuração manual de chave inválida no backend.
   73 |     // Instrução: Altere a chave da API para uma inválida e execute este teste.
   74 |     await page.goto('/');
   75 |     const input = page.locator('input[type="text"]');
   76 |     const sendButton = page.getByRole('button', { name: /enviar/i });
   77 |     await input.fill('Teste de erro de API');
   78 |     await sendButton.click();
   79 |     // Espera mensagem de erro amigável
   80 |     const erro = page.locator('.chat-error, .error-message');
   81 |     await expect(erro).toBeVisible({ timeout: 10000 });
   82 |     await expect(erro).toContainText(/erro|desculpe|tente novamente|processar/i);
   83 |   });
   84 |
   85 |   test('CHAT-006: Tratamento de erro de rede ao enviar mensagem', async ({ page, context }) => {
   86 |     await page.goto('/');
   87 |     const input = page.locator('input[type="text"]');
   88 |     const sendButton = page.getByRole('button', { name: /enviar/i });
   89 |     await input.fill('Teste de erro de rede');
   90 |     // Simula offline
   91 |     await context.setOffline(true);
   92 |     await sendButton.click();
   93 |     // Espera mensagem de erro amigável
   94 |     const erro = page.locator('.chat-error, .error-message');
   95 |     await expect(erro).toBeVisible({ timeout: 10000 });
   96 |     await expect(erro).toContainText(/erro|rede|conexão|offline/i);
   97 |     // Volta ao online para não afetar outros testes
   98 |     await context.setOffline(false);
   99 |   });
  100 |
  101 |   test('CHAT-007: Interação com prompts longos', async ({ page }) => {
  102 |     await page.goto('/');
  103 |     const input = page.locator('input[type="text"]');
  104 |     const sendButton = page.getByRole('button', { name: /enviar/i });
  105 |     const promptLongo = 'Explique detalhadamente o processo de fotossíntese em plantas, incluindo todas as etapas bioquímicas, as moléculas envolvidas, a importância para o ciclo do carbono e o impacto ambiental.';
  106 |     await input.fill(promptLongo);
  107 |     await sendButton.click();
  108 |     const resposta = page.locator('.chat-message.ai').last();
  109 |     await expect(resposta).toBeVisible({ timeout: 20000 });
  110 |     await expect(resposta).toContainText(/fotossíntese|planta|carbono|luz|energia|clorofila/i);
  111 |   });
  112 |
  113 |   test('CHAT-008: Humanização do texto da resposta', async ({ page }) => {
  114 |     await page.goto('/');
  115 |     const input = page.locator('input[type="text"]');
  116 |     const sendButton = page.getByRole('button', { name: /enviar/i });
  117 |     await input.fill('Conte uma curiosidade interessante sobre o espaço.');
> 118 |     await sendButton.click();
      |                      ^ Error: locator.click: Test timeout of 30000ms exceeded.
  119 |     const resposta = page.locator('.chat-message.ai').last();
  120 |     await expect(resposta).toBeVisible({ timeout: 15000 });
  121 |     // Espera que a resposta não seja excessivamente robótica
  122 |     const texto = await resposta.textContent();
  123 |     expect(texto).not.toMatch(/sou um modelo de linguagem|como uma IA/i);
  124 |     expect(texto?.length).toBeGreaterThan(20);
  125 |   });
  126 |
  127 |   test('CHAT-009: Cancelamento de requisição (se implementado)', async ({ page }) => {
  128 |     await page.goto('/');
  129 |     const input = page.locator('input[type="text"]');
  130 |     const sendButton = page.getByRole('button', { name: /enviar/i });
  131 |     // Verifica se existe botão de cancelar
  132 |     const cancelar = page.getByRole('button', { name: /cancelar|parar|stop/i });
  133 |     if (await cancelar.count() > 0 && await cancelar.isVisible()) {
  134 |       await input.fill('Explique a teoria da relatividade de forma detalhada.');
  135 |       await sendButton.click();
  136 |       await cancelar.click();
  137 |       // Espera que o indicador de digitação pare ou mensagem de cancelamento apareça
  138 |       const indicador = page.locator('.typing-indicator, .loading');
  139 |       await expect(indicador).not.toBeVisible({ timeout: 5000 });
  140 |     } else {
  141 |       test.skip();
  142 |     }
  143 |   });
  144 | }); 
```