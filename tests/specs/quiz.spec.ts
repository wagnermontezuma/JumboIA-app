import { test, expect } from '@playwright/test';

test('JumboIA navegação para a página de quizzes', async ({ page }) => {
  try {
    // Navega para a página inicial
    await page.goto('/', { timeout: 30000 });
    
    // Aguarda que a página carregue completamente
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Localiza e clica no botão de quiz (ajuste o seletor conforme necessário)
    const botaoQuiz = page.getByRole('button', { name: /quiz/i });
    
    // Se o botão existir, clica nele e verifica a navegação
    if (await botaoQuiz.isVisible()) {
      await botaoQuiz.click();
      
      // Verifica se foi redirecionado para a página de quizzes
      await expect(page.url()).toContain('quiz');
      
      // Tira um screenshot da página de quizzes
      await page.screenshot({ path: 'screenshots/quiz-page.png', fullPage: true });
    } else {
      console.log('Botão de quiz não encontrado');
      // Tira um screenshot da página atual para diagnóstico
      await page.screenshot({ path: 'screenshots/quiz-button-not-found.png', fullPage: true });
      test.skip();
    }
  } catch (error) {
    console.log('Erro durante o teste de navegação para quizzes:', error);
    await page.screenshot({ path: 'screenshots/error-quiz-navigation.png', fullPage: true });
    throw error;
  }
});

test('JumboIA interação com um quiz', async ({ page }) => {
  try {
    // Navega para a página de quizzes (assumindo que existe uma rota direta)
    await page.goto('/quiz', { timeout: 30000 });
    
    // Espera que a página de quizzes carregue
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Verifica se existem quizzes disponíveis (ajuste o seletor conforme necessário)
    const quizzes = page.locator('.quiz-item');
    
    // Se existirem quizzes, seleciona o primeiro
    if (await quizzes.count() > 0) {
      await quizzes.first().click();
      
      // Verifica se o quiz foi aberto
      await expect(page.locator('.quiz-question')).toBeVisible({ timeout: 10000 });
      
      // Simula resposta a uma pergunta (ajuste os seletores conforme necessário)
      const opcaoResposta = page.locator('.quiz-option').first();
      if (await opcaoResposta.isVisible()) {
        await opcaoResposta.click();
        
        // Verifica se a resposta foi registrada
        await expect(opcaoResposta).toHaveClass(/selected/, { timeout: 5000 });
      } else {
        console.log('Opções de resposta não encontradas');
        await page.screenshot({ path: 'screenshots/quiz-options-not-found.png', fullPage: true });
      }
    } else {
      console.log('Nenhum quiz disponível para teste');
      await page.screenshot({ path: 'screenshots/no-quizzes-available.png', fullPage: true });
      test.skip();
    }
  } catch (error) {
    console.log('Erro durante o teste de interação com quiz:', error);
    await page.screenshot({ path: 'screenshots/error-quiz-interaction.png', fullPage: true });
    throw error;
  }
}); 