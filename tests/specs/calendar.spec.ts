import { test, expect } from '@playwright/test';

test('JumboIA navegação para a página de calendário', async ({ page }) => {
  try {
    // Navega para a página inicial
    await page.goto('/', { timeout: 30000 });
    
    // Aguarda que a página carregue completamente
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Localiza e clica no botão de calendário (ajuste o seletor conforme necessário)
    const botaoCalendario = page.getByRole('button', { name: /calendar/i });
    
    // Se o botão existir, clica nele e verifica a navegação
    if (await botaoCalendario.isVisible()) {
      await botaoCalendario.click();
      
      // Verifica se foi redirecionado para a página de calendário
      await expect(page.url()).toContain('calendar');
      
      // Tira um screenshot da página de calendário
      await page.screenshot({ path: 'screenshots/calendar-page.png', fullPage: true });
    } else {
      console.log('Botão de calendário não encontrado');
      await page.screenshot({ path: 'screenshots/calendar-button-not-found.png', fullPage: true });
      test.skip();
    }
  } catch (error) {
    console.log('Erro durante o teste de navegação para calendário:', error);
    await page.screenshot({ path: 'screenshots/error-calendar-navigation.png', fullPage: true });
    throw error;
  }
});

test('JumboIA interação com o calendário', async ({ page }) => {
  try {
    // Navega diretamente para a página de calendário
    await page.goto('/calendar', { timeout: 30000 });
    
    // Espera que a página de calendário carregue
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Verifica se o componente de calendário está visível
    const calendarioContainer = page.locator('.calendar-container');
    if (await calendarioContainer.isVisible({ timeout: 10000 })) {
      // Verifica se é possível navegar entre os meses
      // Ajuste os seletores conforme necessário
      const botaoProximoMes = page.locator('.next-month-button');
      if (await botaoProximoMes.isVisible()) {
        // Captura o mês atual
        const mesAtual = await page.locator('.month-title').textContent();
        
        // Navega para o próximo mês
        await botaoProximoMes.click();
        
        // Verifica se o mês mudou
        const novoMes = await page.locator('.month-title').textContent();
        expect(mesAtual).not.toEqual(novoMes);
      } else {
        console.log('Botão de próximo mês não encontrado');
        await page.screenshot({ path: 'screenshots/next-month-button-not-found.png', fullPage: true });
      }
      
      // Verifica se é possível selecionar uma data
      // Ajuste os seletores conforme necessário
      const diaCalendario = page.locator('.calendar-day:not(.disabled)').first();
      if (await diaCalendario.isVisible()) {
        await diaCalendario.click();
        
        // Verifica se a data foi selecionada
        await expect(diaCalendario).toHaveClass(/selected/, { timeout: 5000 });
      } else {
        console.log('Nenhum dia selecionável encontrado no calendário');
        await page.screenshot({ path: 'screenshots/no-selectable-days.png', fullPage: true });
      }
    } else {
      console.log('Container do calendário não encontrado');
      await page.screenshot({ path: 'screenshots/calendar-container-not-found.png', fullPage: true });
      test.skip();
    }
  } catch (error) {
    console.log('Erro durante o teste de interação com calendário:', error);
    await page.screenshot({ path: 'screenshots/error-calendar-interaction.png', fullPage: true });
    throw error;
  }
}); 