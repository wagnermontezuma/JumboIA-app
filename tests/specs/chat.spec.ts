import { test, expect } from '@playwright/test';

// CHAT-001: Envio de mensagem simples
// CHAT-002: Manutenção de contexto em conversa
// CHAT-003: Limite de caracteres no input
// CHAT-004: Envio de mensagem vazia
// CHAT-005: Tratamento de erro da API OpenRouter (ex: chave inválida)
// CHAT-006: Tratamento de erro de rede ao enviar mensagem
// CHAT-007: Interação com prompts longos
// CHAT-008: Humanização do texto da resposta
// CHAT-009: Cancelamento de requisição (se implementado)

test.describe('Chat - JumboIA', () => {
  test('CHAT-001: Envio de mensagem simples', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    await input.fill('Qual a capital da França?');
    await sendButton.click();
    // Espera resposta da IA
    const resposta = page.locator('.chat-message.ai');
    await expect(resposta).toContainText(/paris/i, { timeout: 15000 });
  });

  test('CHAT-002: Manutenção de contexto em conversa', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    await input.fill('Qual a capital da França?');
    await sendButton.click();
    await page.waitForTimeout(5000);
    await input.fill('E qual sua população?');
    await sendButton.click();
    const resposta = page.locator('.chat-message.ai').last();
    await expect(resposta).toContainText(/milh|habitantes|pessoas|popula/i, { timeout: 15000 });
  });

  test('CHAT-003: Limite de caracteres no input', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    // Tenta preencher acima do limite (assumindo 500 caracteres)
    const textoLongo = 'a'.repeat(600);
    await input.fill(textoLongo);
    // Verifica se o valor do input não excede 500 caracteres
    const valor = await input.inputValue();
    expect(valor.length).toBeLessThanOrEqual(500);
    // Verifica se o contador de caracteres está correto (se existir)
    const contador = page.locator('.char-counter');
    if (await contador.count() > 0) {
      await expect(contador).toContainText(/500/);
    }
  });

  test('CHAT-004: Envio de mensagem vazia', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    await input.fill('');
    // O botão deve estar desabilitado OU não deve acontecer nada ao clicar
    if (await sendButton.isDisabled()) {
      expect(await sendButton.isDisabled()).toBeTruthy();
    } else {
      await sendButton.click();
      // Não deve aparecer nova mensagem do usuário ou da IA
      const mensagens = await page.locator('.chat-message').count();
      await page.waitForTimeout(2000);
      expect(await page.locator('.chat-message').count()).toBe(mensagens);
    }
  });

  test('CHAT-005: Tratamento de erro da API OpenRouter (manual)', async ({ page }) => {
    // Este teste depende de configuração manual de chave inválida no backend.
    // Instrução: Altere a chave da API para uma inválida e execute este teste.
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    await input.fill('Teste de erro de API');
    await sendButton.click();
    // Espera mensagem de erro amigável
    const erro = page.locator('.chat-error, .error-message');
    await expect(erro).toBeVisible({ timeout: 10000 });
    await expect(erro).toContainText(/erro|desculpe|tente novamente|processar/i);
  });

  test('CHAT-006: Tratamento de erro de rede ao enviar mensagem', async ({ page, context }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    await input.fill('Teste de erro de rede');
    // Simula offline
    await context.setOffline(true);
    await sendButton.click();
    // Espera mensagem de erro amigável
    const erro = page.locator('.chat-error, .error-message');
    await expect(erro).toBeVisible({ timeout: 10000 });
    await expect(erro).toContainText(/erro|rede|conexão|offline/i);
    // Volta ao online para não afetar outros testes
    await context.setOffline(false);
  });

  test('CHAT-007: Interação com prompts longos', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    const promptLongo = 'Explique detalhadamente o processo de fotossíntese em plantas, incluindo todas as etapas bioquímicas, as moléculas envolvidas, a importância para o ciclo do carbono e o impacto ambiental.';
    await input.fill(promptLongo);
    await sendButton.click();
    const resposta = page.locator('.chat-message.ai').last();
    await expect(resposta).toBeVisible({ timeout: 20000 });
    await expect(resposta).toContainText(/fotossíntese|planta|carbono|luz|energia|clorofila/i);
  });

  test('CHAT-008: Humanização do texto da resposta', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    await input.fill('Conte uma curiosidade interessante sobre o espaço.');
    await sendButton.click();
    const resposta = page.locator('.chat-message.ai').last();
    await expect(resposta).toBeVisible({ timeout: 15000 });
    // Espera que a resposta não seja excessivamente robótica
    const texto = await resposta.textContent();
    expect(texto).not.toMatch(/sou um modelo de linguagem|como uma IA/i);
    expect(texto?.length).toBeGreaterThan(20);
  });

  test('CHAT-009: Cancelamento de requisição (se implementado)', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[type="text"]');
    const sendButton = page.getByRole('button', { name: /enviar/i });
    // Verifica se existe botão de cancelar
    const cancelar = page.getByRole('button', { name: /cancelar|parar|stop/i });
    if (await cancelar.count() > 0 && await cancelar.isVisible()) {
      await input.fill('Explique a teoria da relatividade de forma detalhada.');
      await sendButton.click();
      await cancelar.click();
      // Espera que o indicador de digitação pare ou mensagem de cancelamento apareça
      const indicador = page.locator('.typing-indicator, .loading');
      await expect(indicador).not.toBeVisible({ timeout: 5000 });
    } else {
      test.skip();
    }
  });
}); 