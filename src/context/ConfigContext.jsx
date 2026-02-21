import React, { createContext, useState, useContext, useEffect } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  // Estado inicial com logotipo
  const [configs, setConfigs] = useState({
    empresa: {
      nome: 'Empresa Exemplo LDA',
      nif: '123456789',
      atividade: '62010 - Programação informática',
      email: 'geral@empresa.pt',
      telefone: '+351 123 456 789',
      endereco: 'Rua das Flores, 123',
      codigoPostal: '1000-123',
      localidade: 'Lisboa',
      anoFiscal: new Date().getFullYear(),
      periodoFiscal: 'mensal',
      certificadoDigital: null,
      logotipo: null,
    },
    faturacao: {
      criacaoAutomatica: true,
      importERP: true,
      gerarDeContratos: true,
      sincEcommerce: false,
      fluxoAprovacao: 'simples',
      alertasAnomalias: true,
      formatos: ['pdf', 'xml'],
      envioEmail: true,
      blockchain: false,
    },
    imposto: {
      ivaRate: 23,
      irsWithholding: true,
      vatPeriod: 'trimestral',
      autoDeclaration: false,
    },
    seguranca: {
      twoFactor: true,
      ipRestriction: false,
      sessionTimeout: 30,
      auditLogs: true,
      rbacEnabled: true,
    },
    modulos: {
      ativos: ['faturacao', 'contabilidade', 'tesouraria'],
      fluxosPersonalizados: true,
      integracaoBancos: false,
      assinaturasEletronicas: true,
    },
    contabilidade: {
      planoContas: 'PT-POC',
      reconciliacaoAuto: true,
      importExtratos: true,
      mlSugestoes: false,
      diariosAuto: true,
      lancamentosRecorrentes: true,
      integracaoRH: false,
      checklistAuto: true,
      iaFechoContas: false,
    }
  });

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedConfigs = localStorage.getItem('app_configs');
    if (savedConfigs) {
      try {
        const parsedConfigs = JSON.parse(savedConfigs);
        setConfigs(parsedConfigs);
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      }
    }
  }, []);

  // Salvar configurações no localStorage
  useEffect(() => {
    localStorage.setItem('app_configs', JSON.stringify(configs));
  }, [configs]);

  const updateConfig = (section, data) => {
    setConfigs(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Função para fazer upload do logotipo
  const uploadLogotipo = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig('empresa', { logotipo: reader.result });
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const exportConfigs = () => {
    const dataStr = JSON.stringify(configs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `config_backup_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importConfigs = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedConfigs = JSON.parse(event.target.result);
          setConfigs(importedConfigs);
          resolve(importedConfigs);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <ConfigContext.Provider value={{ 
      configs, 
      updateConfig,
      uploadLogotipo,
      exportConfigs,
      importConfigs
    }}>
      {children}
    </ConfigContext.Provider>
  );
};