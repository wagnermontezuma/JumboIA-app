import { test, expect } from '@playwright/test';

test('JumboIA página inicial carrega corretamente', async ({ page }) => {
  // Navega para a página inicial
  await page.goto('/', { timeout: 30000 });
  
  // Verifica se a página carregou corretamente
  await expect(page).toHaveTitle(/DeepSeek Assistant/, { timeout: 10000 });
  
  // Tira um screenshot da página inicial
  await page.screenshot({ path: 'screenshots/home-page.png', fullPage: true });
});

test('JumboIA verifica componentes principais na interface', async ({ page }) => {
  // Navega para a página inicial
  await page.goto('/', { timeout: 30000 });
  
  // Aguarda que a página carregue completamente
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  
  try {
    // Tenta encontrar um elemento h1, mas não falha o teste se não encontrar
    if (await page.locator('h1').count() > 0) {
      await expect(page.locator('h1').first()).toBeVisible();
    }
    
    // Verifica se existem botões na interface
    const botoes = page.locator('button');
    const contagem = await botoes.count();
    expect(contagem).toBeGreaterThan(0);
    
    // Verifica a navegação para outra seção (simulado, quiz, etc.)
    // Ajuste estes seletores conforme a estrutura real da sua aplicação
    const botaoSimulado = page.getByRole('button', { name: /simulado/i });
    if (await botaoSimulado.isVisible()) {
      await botaoSimulado.click();
      // Verifica se a página mudou para a seção correta
      await expect(page.url()).toContain('simulado');
    }
  } catch (error) {
    console.log('Erro durante o teste:', error);
    // Captura um screenshot no caso de erro
    await page.screenshot({ path: 'screenshots/error-home.png', fullPage: true });
    throw error;
  }
}); 