import React, { useState, useRef } from 'react';
import { useConfig } from '../../context/ConfigContext';

const NovaFatura = () => {
  const { configs } = useConfig();
  const { empresa, faturacao, imposto } = configs;
  
  const faturaRef = useRef();

  const [fatura, setFatura] = useState({
    numero: `FAT/${new Date().getFullYear()}/001`,
    cliente: '',
    data: new Date().toISOString().split('T')[0],
    itens: [],
    subtotal: 0,
    iva: 0,
    total: 0,
    status: 'rascunho'
  });

  const [novoItem, setNovoItem] = useState({
    descricao: '',
    quantidade: 1,
    precoUnitario: 0,
    ivaAplicavel: imposto.ivaRate
  });

  const adicionarItem = () => {
    if (!novoItem.descricao.trim()) {
      alert('Por favor, insira uma descrição para o item');
      return;
    }

    const valorItem = novoItem.quantidade * novoItem.precoUnitario;
    const ivaItem = valorItem * (novoItem.ivaAplicavel / 100);
    
    const novoItemCompleto = {
      ...novoItem,
      valorTotal: valorItem,
      ivaValor: ivaItem,
      id: Date.now()
    };

    setFatura(prev => ({
      ...prev,
      itens: [...prev.itens, novoItemCompleto],
      subtotal: prev.subtotal + valorItem,
      iva: prev.iva + ivaItem,
      total: prev.total + valorItem + ivaItem
    }));

    setNovoItem({
      descricao: '',
      quantidade: 1,
      precoUnitario: 0,
      ivaAplicavel: imposto.ivaRate
    });
  };

  const removerItem = (id) => {
    const item = fatura.itens.find(item => item.id === id);
    if (!item) return;

    setFatura(prev => ({
      ...prev,
      itens: prev.itens.filter(item => item.id !== id),
      subtotal: prev.subtotal - item.valorTotal,
      iva: prev.iva - item.ivaValor,
      total: prev.total - (item.valorTotal + item.ivaValor)
    }));
  };

  const gerarPDF = () => {
    if (fatura.itens.length === 0) {
      alert('Adicione itens à fatura antes de gerar PDF');
      return;
    }

    try {
      // Criar conteúdo HTML para impressão
      const conteudoHTML = `
        <html>
          <head>
            <title>Fatura ${fatura.numero}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .logo { max-height: 60px; margin-bottom: 10px; }
              .empresa-info { margin-bottom: 20px; }
              .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .invoice-table th { background-color: #f2f2f2; }
              .totais { text-align: right; margin-top: 20px; }
              .footer { margin-top: 40px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="header">
              ${empresa.logotipo ? `<img src="${empresa.logotipo}" class="logo" alt="Logotipo">` : ''}
              <h1>Fatura ${fatura.numero}</h1>
            </div>
            
            <div class="empresa-info">
              <h3>${empresa.nome || "Empresa Exemplo LDA"}</h3>
              <p>NIF: ${empresa.nif || "123456789"}</p>
              <p>Endereço: ${empresa.endereco || "Rua das Flores, 123"}</p>
              <p>Email: ${empresa.email || "geral@empresa.pt"}</p>
              <p>Telefone: ${empresa.telefone || "+351 123 456 789"}</p>
            </div>
            
            <div>
              <h4>Cliente: ${fatura.cliente || "Não especificado"}</h4>
              <p>Data: ${fatura.data}</p>
            </div>
            
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Qtd</th>
                  <th>Preço Unit.</th>
                  <th>IVA %</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${fatura.itens.map(item => `
                  <tr>
                    <td>${item.descricao}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.precoUnitario.toFixed(2)} €</td>
                    <td>${item.ivaAplicavel}%</td>
                    <td>${(item.valorTotal + item.ivaValor).toFixed(2)} €</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="totais">
              <p>Subtotal: ${fatura.subtotal.toFixed(2)} €</p>
              <p>IVA (${imposto.ivaRate}%): ${fatura.iva.toFixed(2)} €</p>
              <p><strong>Total: ${fatura.total.toFixed(2)} €</strong></p>
            </div>
            
            <div class="footer">
              <p>Documento emitido eletronicamente</p>
              <p>Data de emissão: ${new Date().toLocaleDateString('pt-PT')}</p>
            </div>
          </body>
        </html>
      `;

      // Criar nova janela para impressão
      const printWindow = window.open('', '_blank');
      printWindow.document.write(conteudoHTML);
      printWindow.document.close();
      
      // Aguardar carregamento e imprimir
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
      
      alert(`PDF ${fatura.numero} gerado com sucesso!`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF');
    }
  };

  const gerarXML = () => {
    if (fatura.itens.length === 0) {
      alert('Adicione itens à fatura antes de gerar XML');
      return;
    }

    try {
      // Estrutura XML básica
      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Invoice>
  <InvoiceNumber>${fatura.numero}</InvoiceNumber>
  <InvoiceDate>${fatura.data}</InvoiceDate>
  <InvoiceStatus>${fatura.status}</InvoiceStatus>
  <Supplier>
    <Name>${empresa.nome || 'Empresa Exemplo LDA'}</Name>
    <TaxID>${empresa.nif || '123456789'}</TaxID>
    <Address>${empresa.endereco || 'Rua das Flores, 123'}</Address>
    <Email>${empresa.email || 'geral@empresa.pt'}</Email>
    <Phone>${empresa.telefone || '+351 123 456 789'}</Phone>
  </Supplier>
  <Customer>
    <Name>${fatura.cliente || 'Cliente não especificado'}</Name>
  </Customer>
  <InvoiceLines>
    ${fatura.itens.map((item, index) => `
    <InvoiceLine>
      <LineNumber>${index + 1}</LineNumber>
      <Description>${item.descricao}</Description>
      <Quantity>${item.quantidade}</Quantity>
      <UnitPrice>${item.precoUnitario.toFixed(2)}</UnitPrice>
      <Tax>
        <TaxType>VAT</TaxType>
        <TaxRate>${item.ivaAplicavel}%</TaxRate>
        <TaxAmount>${item.ivaValor.toFixed(2)}</TaxAmount>
      </Tax>
      <LineTotal>${(item.valorTotal + item.ivaValor).toFixed(2)}</LineTotal>
    </InvoiceLine>
    `).join('')}
  </InvoiceLines>
  <InvoiceTotals>
    <Subtotal>${fatura.subtotal.toFixed(2)}</Subtotal>
    <TaxTotal>${fatura.iva.toFixed(2)}</TaxTotal>
    <PayableAmount>${fatura.total.toFixed(2)}</PayableAmount>
  </InvoiceTotals>
  <InvoiceData>
    <CreatedAt>${new Date().toISOString()}</CreatedAt>
    <Currency>EUR</Currency>
  </InvoiceData>
</Invoice>`;

      // Criar arquivo para download
      const blob = new Blob([xmlContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `fatura_${fatura.numero.replace(/\//g, '_')}.xml`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`XML ${fatura.numero} gerado com sucesso!`);
    } catch (error) {
      console.error('Erro ao gerar XML:', error);
      alert('Erro ao gerar XML');
    }
  };

  const gerarFatura = () => {
    if (fatura.itens.length === 0) {
      alert('Adicione pelo menos um item à fatura');
      return;
    }

    if (!fatura.cliente.trim()) {
      alert('Por favor, insira o nome do cliente');
      return;
    }

    const faturaCompleta = {
      ...fatura,
      empresaInfo: {
        nome: empresa.nome,
        nif: empresa.nif,
        endereco: empresa.endereco,
        email: empresa.email,
        telefone: empresa.telefone,
        logotipo: empresa.logotipo
      },
      configAplicada: {
        ivaRate: imposto.ivaRate,
        formatos: faturacao.formatos,
        fluxoAprovacao: faturacao.fluxoAprovacao
      },
      dataCriacao: new Date().toISOString(),
      id: `fat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // Salvar no localStorage
    const faturasSalvas = JSON.parse(localStorage.getItem('faturas') || '[]');
    faturasSalvas.push(faturaCompleta);
    localStorage.setItem('faturas', JSON.stringify(faturasSalvas));
    
    console.log('Fatura salva:', faturaCompleta);
    alert(`Fatura ${fatura.numero} criada com sucesso!`);
    
    // Resetar formulário
    setFatura({
      numero: `FAT/${new Date().getFullYear()}/00${fatura.itens.length + 1}`,
      cliente: '',
      data: new Date().toISOString().split('T')[0],
      itens: [],
      subtotal: 0,
      iva: 0,
      total: 0,
      status: 'rascunho'
    });
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-lg" ref={faturaRef}>
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-file-earmark-plus me-2"></i>
            Nova Fatura
          </h4>
        </div>
        
        <div className="card-body">
          {/* Cabeçalho com dados da empresa */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Dados da Empresa</h6>
                  {empresa.logotipo && (
                    <div className="logotipo-container">
                      <img 
                        src={empresa.logotipo} 
                        alt="Logotipo" 
                        className="img-fluid rounded"
                        style={{ maxHeight: '40px' }}
                      />
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-start mb-3">
                    {empresa.logotipo && (
                      <div className="me-3">
                        <img 
                          src={empresa.logotipo} 
                          alt="Logotipo" 
                          className="img-fluid rounded"
                          style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                        />
                      </div>
                    )}
                    <div>
                      <h5 className="mb-1">{empresa.nome || "Empresa Exemplo LDA"}</h5>
                      <p className="mb-1 text-muted">
                        <i className="bi bi-card-text me-1"></i>
                        NIF: {empresa.nif || "123456789"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-12">
                      <p className="mb-1">
                        <i className="bi bi-geo-alt me-1"></i>
                        {empresa.endereco || "Rua das Flores, 123"}
                      </p>
                      <p className="mb-1">
                        <i className="bi bi-envelope me-1"></i>
                        {empresa.email || "geral@empresa.pt"}
                      </p>
                      <p className="mb-0">
                        <i className="bi bi-telephone me-1"></i>
                        {empresa.telefone || "+351 123 456 789"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Dados do Cliente */}
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Dados do Cliente</h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Nome do Cliente *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fatura.cliente}
                      onChange={(e) => setFatura({...fatura, cliente: e.target.value})}
                      placeholder="Nome do cliente"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">Número da Fatura</label>
                      <input
                        type="text"
                        className="form-control"
                        value={fatura.numero}
                        onChange={(e) => setFatura({...fatura, numero: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Data</label>
                      <input
                        type="date"
                        className="form-control"
                        value={fatura.data}
                        onChange={(e) => setFatura({...fatura, data: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Adicionar Itens */}
          <div className="card mb-4">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Adicionar Itens</h6>
              <span className="badge bg-primary">IVA: {imposto.ivaRate}%</span>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Descrição *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={novoItem.descricao}
                    onChange={(e) => setNovoItem({...novoItem, descricao: e.target.value})}
                    placeholder="Descrição do item"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Quantidade</label>
                  <input
                    type="number"
                    className="form-control"
                    value={novoItem.quantidade}
                    onChange={(e) => setNovoItem({...novoItem, quantidade: parseFloat(e.target.value) || 1})}
                    min="1"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Preço Unitário (€)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={novoItem.precoUnitario}
                    onChange={(e) => setNovoItem({...novoItem, precoUnitario: parseFloat(e.target.value) || 0})}
                    step="0.01"
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">IVA (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={novoItem.ivaAplicavel}
                    onChange={(e) => setNovoItem({...novoItem, ivaAplicavel: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={adicionarItem}
                    disabled={!novoItem.descricao.trim()}
                  >
                    <i className="bi bi-plus-circle me-1"></i> Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Itens */}
          {fatura.itens.length > 0 ? (
            <div className="card mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Itens da Fatura ({fatura.itens.length})</h6>
                <span className="badge bg-success">{fatura.itens.length} itens</span>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{width: '40%'}}>Descrição</th>
                        <th className="text-center">Qtd</th>
                        <th className="text-end">Preço Unitário</th>
                        <th className="text-end">IVA %</th>
                        <th className="text-end">Total</th>
                        <th className="text-end">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fatura.itens.map((item) => (
                        <tr key={item.id}>
                          <td>{item.descricao}</td>
                          <td className="text-center">{item.quantidade}</td>
                          <td className="text-end">{item.precoUnitario.toFixed(2)} €</td>
                          <td className="text-end">{item.ivaAplicavel}%</td>
                          <td className="text-end">
                            {(item.valorTotal + item.ivaValor).toFixed(2)} €
                          </td>
                          <td className="text-end">
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removerItem(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Nenhum item adicionado à fatura. Adicione itens acima.
            </div>
          )}

          {/* Totais */}
          <div className="row">
            <div className="col-md-6 offset-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span className="fw-bold">{fatura.subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>IVA ({imposto.ivaRate}%):</span>
                    <span className="fw-bold text-danger">{fatura.iva.toFixed(2)} €</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="h5">Total:</span>
                    <span className="h4 text-primary">{fatura.total.toFixed(2)} €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configurações Aplicadas */}
          <div className="card mt-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Configurações Aplicadas
              </h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <p className="mb-1">
                    <i className="bi bi-percent me-2 text-primary"></i>
                    <strong>Taxa de IVA:</strong> {imposto.ivaRate}%
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-diagram-3 me-2 text-primary"></i>
                    <strong>Fluxo de Aprovação:</strong> {faturacao.fluxoAprovacao}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-1">
                    <i className="bi bi-filetype-pdf me-2 text-primary"></i>
                    <strong>Formatos:</strong> {faturacao.formatos.join(', ')}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-envelope me-2 text-primary"></i>
                    <strong>Envio por Email:</strong> {faturacao.envioEmail ? 'Sim' : 'Não'}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="mb-1">
                    <i className="bi bi-robot me-2 text-primary"></i>
                    <strong>Criação Automática:</strong> {faturacao.criacaoAutomatica ? 'Ativa' : 'Inativa'}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-bell me-2 text-primary"></i>
                    <strong>Alertas:</strong> {faturacao.alertasAnomalias ? 'Ativos' : 'Inativos'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => {
                if (window.confirm('Tem certeza que deseja cancelar? Os dados não salvos serão perdidos.')) {
                  setFatura({
                    numero: `FAT/${new Date().getFullYear()}/001`,
                    cliente: '',
                    data: new Date().toISOString().split('T')[0],
                    itens: [],
                    subtotal: 0,
                    iva: 0,
                    total: 0,
                    status: 'rascunho'
                  });
                }
              }}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </button>
            
            <button 
              className="btn btn-primary" 
              onClick={gerarFatura}
              disabled={fatura.itens.length === 0 || !fatura.cliente.trim()}
            >
              <i className="bi bi-check-circle me-2"></i>
              Criar Fatura
            </button>
            
            {faturacao.formatos.includes('pdf') && (
              <button 
                className="btn btn-success"
                onClick={gerarPDF}
                disabled={fatura.itens.length === 0}
                title="Gerar documento PDF"
              >
                <i className="bi bi-file-earmark-pdf me-2"></i>
                Gerar PDF
              </button>
            )}
            
            {faturacao.formatos.includes('xml') && (
              <button 
                className="btn btn-warning"
                onClick={gerarXML}
                disabled={fatura.itens.length === 0}
                title="Gerar arquivo XML para integração"
              >
                <i className="bi bi-code me-2"></i>
                Gerar XML
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaFatura;