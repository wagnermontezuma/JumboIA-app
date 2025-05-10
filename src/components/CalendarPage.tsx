import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiInfo, FiX, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

// Interface para representar um compromisso
interface Compromisso {
  id: string;
  title: string;
  date: string; // Formato 'YYYY-MM-DD'
  time?: string; // Formato 'HH:MM' - Novo campo para hora
  description?: string;
  reminderDays: number; // Dias antes para lembrar
}

export const CalendarPage: React.FC = () => {
  // Estados
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCompromisso, setNewCompromisso] = useState<Omit<Compromisso, 'id'>>({
    title: '',
    date: '',
    time: '', // Hora padrão vazia
    description: '',
    reminderDays: 2
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Carregar compromissos do localStorage quando o componente montar
  useEffect(() => {
    try {
      const savedCompromissos = localStorage.getItem('jumboIA_calendario_compromissos');
      
      setDebugInfo(`Tentando carregar compromissos: ${savedCompromissos ? 'Dados encontrados' : 'Nenhum dado'}`);
      
      if (savedCompromissos) {
        const parsedData = JSON.parse(savedCompromissos);
        setCompromissos(parsedData);
        console.log('Compromissos carregados com sucesso:', parsedData.length);
        setDebugInfo(prev => `${prev}\nCarregados ${parsedData.length} compromissos`);
      }
      
      // Verificar se há compromissos próximos e mostrar notificações
      checkForReminders();
    } catch (error) {
      console.error('Erro ao carregar compromissos do localStorage:', error);
      setDebugInfo(prev => `${prev}\nErro ao carregar: ${error}`);
    }
  }, []);

  // Salvar compromissos no localStorage quando mudarem
  useEffect(() => {
    if (compromissos.length === 0) return; // Não salvar array vazio ao inicializar
    
    try {
      localStorage.setItem('jumboIA_calendario_compromissos', JSON.stringify(compromissos));
      console.log('Compromissos salvos com sucesso:', compromissos.length);
      setDebugInfo(prev => `${prev}\nSalvos ${compromissos.length} compromissos`);
      
      // Verificar lembretes quando a lista de compromissos mudar
      checkForReminders();
    } catch (error) {
      console.error('Erro ao salvar compromissos no localStorage:', error);
      setDebugInfo(prev => `${prev}\nErro ao salvar: ${error}`);
    }
  }, [compromissos]);

  // Verificar o localStorage periodicamente para debug
  useEffect(() => {
    const checkStorage = () => {
      try {
        const data = localStorage.getItem('jumboIA_calendario_compromissos');
        if (data) {
          const parsed = JSON.parse(data);
          setDebugInfo(prev => `${prev}\nVerificação: ${parsed.length} compromissos no storage`);
        } else {
          setDebugInfo(prev => `${prev}\nVerificação: Nenhum dado no storage`);
        }
      } catch (e) {
        setDebugInfo(prev => `${prev}\nErro na verificação: ${e}`);
      }
    };
    
    // Verificar após 2 segundos da montagem para dar tempo de carregar
    const timer = setTimeout(checkStorage, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Função para limpar explicitamente o localStorage para testes
  const clearStorage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    try {
      localStorage.removeItem('jumboIA_calendario_compromissos');
      setDebugInfo('Storage limpo manualmente');
      setCompromissos([]);
    } catch (e) {
      setDebugInfo(`Erro ao limpar: ${e}`);
    }
  };

  // Função para forçar a recarga dos dados do localStorage
  const forceReload = (e?: React.MouseEvent) => {
    e?.preventDefault();
    try {
      const data = localStorage.getItem('jumboIA_calendario_compromissos');
      if (data) {
        const parsed = JSON.parse(data);
        setCompromissos(parsed);
        setDebugInfo(`Recarregados ${parsed.length} compromissos manualmente`);
      } else {
        setDebugInfo('Nenhum dado para recarregar');
      }
    } catch (e) {
      setDebugInfo(`Erro ao recarregar: ${e}`);
    }
  };

  // Função para verificar lembretes
  const checkForReminders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newNotifications: string[] = [];
    
    compromissos.forEach(compromisso => {
      const compromissoDate = new Date(compromisso.date);
      compromissoDate.setHours(0, 0, 0, 0);
      
      const timeDiff = compromissoDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff === compromisso.reminderDays) {
        newNotifications.push(
          `Lembrete: "${compromisso.title}" está marcado para daqui a ${compromisso.reminderDays} dias!`
        );
      }
    });
    
    setNotifications(newNotifications);
  };

  // Função para mudar o mês exibido
  const changeMonth = (increment: number, e?: React.MouseEvent) => {
    // Prevenir comportamento padrão para evitar recarregamento
    e?.preventDefault();
    
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  // Função para obter os dias do mês atual
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    
    const calendarDays = [];
    
    // Dias do mês anterior para preencher a primeira semana
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      const day = prevMonthLastDay - startingDayOfWeek + i + 1;
      calendarDays.push({
        day,
        month: month - 1,
        year,
        isCurrentMonth: false,
        date: new Date(year, month - 1, day).toISOString().split('T')[0]
      });
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({
        day,
        month,
        year,
        isCurrentMonth: true,
        date: new Date(year, month, day).toISOString().split('T')[0]
      });
    }
    
    // Dias do próximo mês para completar a última semana
    const totalCells = Math.ceil(calendarDays.length / 7) * 7;
    const remainingCells = totalCells - calendarDays.length;
    
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({
        day,
        month: month + 1,
        year,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day).toISOString().split('T')[0]
      });
    }
    
    return calendarDays;
  };

  // Função para adicionar um novo compromisso
  const addCompromisso = (e?: React.MouseEvent) => {
    // Prevenir comportamento padrão para evitar recarregamento
    e?.preventDefault();
    
    if (!newCompromisso.title || !newCompromisso.date) {
      setDebugInfo(prev => `${prev}\nErro: título ou data não fornecidos`);
      return;
    }
    
    try {
      const compromisso: Compromisso = {
        ...newCompromisso,
        id: Date.now().toString(),
      };
      
      // Adicionar ao estado e forçar salvar no localStorage
      const updatedCompromissos = [...compromissos, compromisso];
      
      // Salvar explicitamente no localStorage para garantir persistência
      localStorage.setItem('jumboIA_calendario_compromissos', JSON.stringify(updatedCompromissos));
      
      // Atualizar o estado somente após confirmação de que o localStorage foi atualizado
      setCompromissos(updatedCompromissos);
      
      // Verificar que realmente foi salvo
      const verificacao = localStorage.getItem('jumboIA_calendario_compromissos');
      const foiSalvo = verificacao && JSON.parse(verificacao).some((c: Compromisso) => c.id === compromisso.id);
      
      setDebugInfo(prev => `${prev}\nCompromisso "${compromisso.title}" no dia ${compromisso.date} ${foiSalvo ? 'SALVO COM SUCESSO' : 'ERRO AO SALVAR'}`);
      
      console.log('Novo compromisso salvo com sucesso!', compromisso);
      
      setNewCompromisso({
        title: '',
        date: '',
        time: '',
        description: '',
        reminderDays: 2
      });
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar compromisso:', error);
      setDebugInfo(prev => `${prev}\nERRO GRAVE ao salvar compromisso: ${error}`);
    }
  };

  // Função para excluir um compromisso
  const deleteCompromisso = (id: string, e?: React.MouseEvent) => {
    // Prevenir comportamento padrão para evitar recarregamento
    e?.preventDefault();
    
    // Filtrar e atualizar o estado
    const updatedCompromissos = compromissos.filter(comp => comp.id !== id);
    setCompromissos(updatedCompromissos);
    
    // Salvar explicitamente no localStorage para garantir persistência
    try {
      localStorage.setItem('jumboIA_calendario_compromissos', JSON.stringify(updatedCompromissos));
      console.log('Compromisso excluído e lista atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar lista após exclusão:', error);
    }
  };

  // Função para abrir o modal de novo compromisso
  const openNewCompromissoModal = (date: string, e?: React.MouseEvent) => {
    // Prevenir comportamento padrão para evitar recarregamento
    e?.preventDefault();
    
    setSelectedDate(date);
    setNewCompromisso({
      ...newCompromisso,
      date
    });
    setShowModal(true);
  };

  // Obter compromissos para uma data específica
  const getCompromissosForDate = (date: string) => {
    return compromissos.filter(comp => comp.date === date);
  };

  // Função para verificar se uma data tem compromissos
  const hasCompromissos = (date: string) => {
    return compromissos.some(comp => comp.date === date);
  };

  // Formatar o mês e ano atuais
  const formatCurrentMonthYear = () => {
    return currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  // Componente para os dias da semana
  const WeekdayHeader = () => {
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    return (
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdays.map(day => (
          <div key={day} className="text-center font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  // Renderizar os dias do calendário
  const renderCalendarDays = () => {
    const days = getDaysInMonth();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = day.isCurrentMonth && 
            day.day === new Date().getDate() && 
            day.month === new Date().getMonth() && 
            day.year === new Date().getFullYear();
            
          const hasEvents = hasCompromissos(day.date);
          const eventosNoDia = getCompromissosForDate(day.date);
          
          return (
            <div 
              key={index}
              onClick={(e) => day.isCurrentMonth && openNewCompromissoModal(day.date, e)}
              className={`
                p-1 min-h-[80px] relative border rounded-md cursor-pointer
                ${day.isCurrentMonth ? 'bg-white hover:bg-jumbo/5' : 'bg-gray-100 text-gray-400'}
                ${isToday ? 'border-jumbo' : 'border-gray-200'}
              `}
            >
              <div className={`text-right p-1 ${hasEvents ? 'font-bold text-jumbo' : ''}`}>
                {day.day}
              </div>
              
              {hasEvents && (
                <div className="mt-1 px-1">
                  {eventosNoDia.slice(0, 2).map(comp => (
                    <div key={comp.id} className="text-xs bg-jumbo/10 p-1 mb-1 rounded truncate flex justify-between">
                      <span className="truncate">{comp.title}</span>
                      {comp.time && (
                        <span className="font-bold ml-1 text-jumbo whitespace-nowrap">{comp.time}</span>
                      )}
                    </div>
                  ))}
                  {eventosNoDia.length > 2 && (
                    <div className="text-xs text-jumbo font-medium">
                      +{eventosNoDia.length - 2} mais
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Calendário de Agenda</h1>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              setCurrentDate(new Date());
            }}
            className="px-3 py-1 text-sm bg-jumbo text-white rounded hover:bg-jumbo/90 transition-colors"
          >
            Hoje
          </button>
        </div>
      </div>
      
      {/* Notificações de lembretes */}
      {notifications.length > 0 && (
        <div className="mb-6">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-2 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{notification}</p>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setNotifications(notifications.filter((_, i) => i !== index));
                      }}
                      className="inline-flex rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                    >
                      <span className="sr-only">Fechar</span>
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Controles do calendário */}
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
        <button 
          onClick={(e) => changeMonth(-1, e)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          &lt;
        </button>
        
        <h2 className="text-xl font-semibold text-jumbo capitalize">
          {formatCurrentMonthYear()}
        </h2>
        
        <button 
          onClick={(e) => changeMonth(1, e)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
      
      {/* Calendário */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <WeekdayHeader />
        {renderCalendarDays()}
      </div>
      
      {/* Lista de compromissos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-jumbo mb-4">Seus Compromissos</h2>
        
        {compromissos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Você ainda não tem compromissos agendados. Clique em um dia no calendário para adicionar.
          </p>
        ) : (
          <div className="space-y-3">
            {compromissos
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(compromisso => {
                // Calcular se está próximo (menos de 5 dias) para destacar
                const hoje = new Date();
                hoje.setHours(0, 0, 0, 0);
                const dataCompromisso = new Date(compromisso.date);
                dataCompromisso.setHours(0, 0, 0, 0);
                const diasFaltando = Math.ceil((dataCompromisso.getTime() - hoje.getTime()) / (1000 * 3600 * 24));
                
                // Definir classes baseadas na proximidade
                const isProximo = diasFaltando >= 0 && diasFaltando <= 5;
                const isHoje = diasFaltando === 0;
                const isPassado = diasFaltando < 0;
                
                return (
                  <div 
                    key={compromisso.id} 
                    className={`border rounded-lg p-3 hover:bg-gray-50 ${
                      isHoje ? 'bg-green-50 border-green-300' : 
                      isProximo ? 'bg-yellow-50 border-yellow-300' :
                      isPassado ? 'bg-gray-100 border-gray-300' : 
                      'border-jumbo/30'
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-jumbo">
                          {compromisso.title}
                          {compromisso.time && (
                            <span className="ml-2 text-sm font-bold text-jumbo bg-jumbo/10 px-2 py-0.5 rounded">
                              {compromisso.time}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-gray-700 font-semibold mt-1 text-sm">
                          <FiCalendar className="mr-1 text-jumbo" />
                          <span>
                            {new Date(compromisso.date).toLocaleDateString('pt-BR', {
                              weekday: 'long',
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                          {isHoje && (
                            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                              HOJE
                            </span>
                          )}
                          {isProximo && !isHoje && (
                            <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Em {diasFaltando} {diasFaltando === 1 ? 'dia' : 'dias'}
                            </span>
                          )}
                          {isPassado && (
                            <span className="ml-2 bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Passado
                            </span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={(e) => deleteCompromisso(compromisso.id, e)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <FiClock className="mr-1" />
                      <span>Lembrete: {compromisso.reminderDays} dias antes</span>
                    </div>
                    {compromisso.description && (
                      <p className="mt-2 text-gray-600 text-sm p-2 bg-gray-50 rounded">
                        {compromisso.description}
                      </p>
                    )}
                    <div className="mt-2 text-xs text-right text-gray-400">
                      ID: {compromisso.id.slice(-4)}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      
      {/* Modal para adicionar compromisso */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Novo Compromisso</h2>
              <button onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newCompromisso.title}
                  onChange={(e) => setNewCompromisso({...newCompromisso, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-jumbo focus:border-jumbo"
                  placeholder="Ex: Prova de Física"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newCompromisso.date}
                    onChange={(e) => setNewCompromisso({...newCompromisso, date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-jumbo focus:border-jumbo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora
                  </label>
                  <input
                    type="time"
                    value={newCompromisso.time}
                    onChange={(e) => setNewCompromisso({...newCompromisso, time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-jumbo focus:border-jumbo"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newCompromisso.description}
                  onChange={(e) => setNewCompromisso({...newCompromisso, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-jumbo focus:border-jumbo"
                  placeholder="Detalhes adicionais..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lembrete (dias antes)
                </label>
                <select
                  value={newCompromisso.reminderDays}
                  onChange={(e) => setNewCompromisso({...newCompromisso, reminderDays: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-jumbo focus:border-jumbo"
                >
                  <option value="0">No dia</option>
                  <option value="1">1 dia antes</option>
                  <option value="2">2 dias antes</option>
                  <option value="3">3 dias antes</option>
                  <option value="5">5 dias antes</option>
                  <option value="7">7 dias antes</option>
                  <option value="14">14 dias antes</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={(e) => addCompromisso(e)}
                disabled={!newCompromisso.title || !newCompromisso.date}
                className="px-4 py-2 bg-jumbo text-white rounded-md hover:bg-jumbo/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 