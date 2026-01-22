import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft, Play, Download, Save, Search, Filter, Columns, Eye, X, FileText, Settings, Info, CreditCard, Building, DollarSign, MapPin, Shield } from 'lucide-react';

const COLUMN_CATEGORIES = [
  { id: 'identity', name: 'Identity & Reference', icon: CreditCard, color: 'bg-blue-500', columns: [
    { id: 'REPORT_DATE', name: 'Report Date', description: 'Report generation date' },
    { id: 'transhistory_id', name: 'Transaction History ID', description: 'Primary transaction identifier' },
    { id: 'Card_ID', name: 'Card ID', description: 'Card instance identifier' },
    { id: 'Customer_ID', name: 'Customer ID', description: 'Customer identifier' },
    { id: 'account_number', name: 'Account Number', description: 'Account number' },
  ]},
  { id: 'program', name: 'Program & Product', icon: Building, color: 'bg-purple-500', columns: [
    { id: 'binclient', name: 'BIN Client', description: 'BIN client code' },
    { id: 'program_desc', name: 'Program Description', description: 'Program name' },
    { id: 'Product_code', name: 'Product Code', description: 'Product code' },
  ]},
  { id: 'auth', name: 'Authorization & Response', icon: Shield, color: 'bg-amber-500', columns: [
    { id: 'Transaction_Result', name: 'Transaction Result', description: 'Approved/Declined' },
    { id: 'response_code', name: 'Response Code', description: 'Response code' },
    { id: 'RESPONSE_DESC', name: 'Response Description', description: 'Response description' },
  ]},
  { id: 'amounts', name: 'Amounts & Currency', icon: DollarSign, color: 'bg-emerald-500', columns: [
    { id: 'Acquirer_Transaction_Amount', name: 'Acquirer Amount', description: 'Acquirer amount' },
    { id: 'settlement_amount', name: 'Settlement Amount', description: 'Settlement amount' },
    { id: 'Cardholder_currency', name: 'Cardholder Currency', description: 'Cardholder currency' },
  ]},
  { id: 'merchant', name: 'Merchant & Acquirer', icon: MapPin, color: 'bg-rose-500', columns: [
    { id: 'MCC', name: 'MCC', description: 'Merchant category code' },
    { id: 'Merchant_Name', name: 'Merchant Name', description: 'Merchant name' },
    { id: 'Merchant_Country', name: 'Merchant Country', description: 'Merchant country' },
  ]},
];

const BIN_CLIENTS = [
  { code: '55910400', name: 'Ikualo' },
  { code: '55910401', name: 'OSMEUR' },
  { code: '53787226', name: 'Aganea - UpSpain' },
];

const NETWORKS = ['MCARD', 'VISA', 'UPSAPI', 'MAESTRO'];

const CollapsibleSection = ({ category, selectedColumns, onToggle, onSelectAll, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = category.columns.filter(col => selectedColumns.includes(col.id)).length;
  const Icon = category.icon;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden mb-2 bg-white">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer hover:bg-slate-100" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
          <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}><Icon className="w-4 h-4 text-white" /></div>
          <span className="font-medium text-slate-700">{category.name}</span>
          <span className="text-sm text-slate-500">({category.columns.length})</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedCount > 0 ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}`}>{selectedCount} selected</span>
      </div>
      {isOpen && (
        <div className="p-4 border-t border-slate-200">
          <div className="flex gap-2 mb-3">
            <button onClick={(e) => { e.stopPropagation(); onSelectAll(category.columns.map(c => c.id)); }} className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">Select All</button>
            <button onClick={(e) => { e.stopPropagation(); onClear(category.columns.map(c => c.id)); }} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded hover:bg-slate-200">Clear</button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {category.columns.map(col => (
              <label key={col.id} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${selectedColumns.includes(col.id) ? 'bg-indigo-50 border border-indigo-200' : 'bg-slate-50 hover:bg-slate-100 border border-transparent'}`}>
                <input type="checkbox" checked={selectedColumns.includes(col.id)} onChange={() => onToggle(col.id)} className="rounded border-slate-300 text-indigo-600" />
                <div><div className="font-medium text-sm text-slate-700">{col.name}</div><div className="text-xs text-slate-500">{col.description}</div></div>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// SQL Query Preview Component - REACTIVE TO ALL FILTERS
const QueryPreview = ({ selectedColumns, filters }) => {
  const getDateRange = () => {
    switch (filters.datePreset) {
      case 'today': return "today 00:00 AND today 23:59";
      case 'yesterday': return "yesterday 23:00 AND today 23:00";
      case 'last7': return "now() - interval '7 days' AND now()";
      case 'last30': return "now() - interval '30 days' AND now()";
      default: return "yesterday 23:00 AND today 23:00";
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono overflow-auto">
      <div className="text-green-400 mb-2">-- Generated SQL Query</div>
      <div className="text-green-400 mb-2">-- Updates in real-time as you change filters</div>
      
      <div className="text-blue-400">SELECT</div>
      <div className="text-slate-300 pl-4">
        {selectedColumns.length === 0 ? (
          <span className="text-slate-500">-- No columns selected</span>
        ) : (
          selectedColumns.map((col, idx) => (
            <div key={col}>
              {col}{idx < selectedColumns.length - 1 ? ',' : ''}
            </div>
          ))
        )}
      </div>
      
      <div className="text-blue-400 mt-2">FROM <span className="text-slate-300">transhistory TH</span></div>
      <div className="text-slate-500 pl-4">LEFT JOIN account ACCT ON TH.account_number = ACCT.account_number</div>
      <div className="text-slate-500 pl-4">LEFT JOIN customer CUST ON ACCT.customer_id = CUST.customer_id</div>
      
      <div className="text-blue-400 mt-2">WHERE</div>
      <div className="text-slate-300 pl-4">th.logtimestamp BETWEEN {getDateRange()}</div>
      
      {filters.binClients.length > 0 && (
        <div className="text-slate-300 pl-4">
          <span className="text-blue-400">AND </span>
          th.binclient IN ('{filters.binClients.join("', '")}')
        </div>
      )}
      
      {filters.networks.length > 0 && (
        <div className="text-slate-300 pl-4">
          <span className="text-blue-400">AND </span>
          th.network IN ('{filters.networks.join("', '")}')
        </div>
      )}
      
      {filters.transactionResult !== 'All' && (
        <div className="text-slate-300 pl-4">
          <span className="text-blue-400">AND </span>
          {filters.transactionResult === 'Approved' 
            ? "(response_code <= '10' OR response_code IN ('17', '32'))"
            : "(response_code > '10' AND response_code NOT IN ('17', '32'))"
          }
        </div>
      )}
      
      {filters.excludeCode97 && (
        <div className="text-yellow-400 pl-4">
          <span className="text-blue-400">AND </span>
          response_code &lt;&gt; '97'
          <span className="text-slate-500 ml-2">-- Exclude code 97</span>
        </div>
      )}
      
      <div className="text-blue-400 mt-2">ORDER BY <span className="text-slate-300">TH.logtimestamp</span></div>
    </div>
  );
};

export default function TransactionReportDetail() {
  const [selectedColumns, setSelectedColumns] = useState(['REPORT_DATE', 'transhistory_id', 'Card_ID', 'Customer_ID', 'binclient', 'Transaction_Result', 'response_code', 'Acquirer_Transaction_Amount', 'Merchant_Name', 'MCC']);
  
  const [filters, setFilters] = useState({ 
    datePreset: 'yesterday', 
    binClients: ['53787226'], 
    networks: ['MCARD', 'UPSAPI'], 
    transactionResult: 'All',
    excludeCode97: true 
  });
  
  const [activeTab, setActiveTab] = useState('filters');

  const toggleColumn = (id) => setSelectedColumns(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  const selectAll = (ids) => setSelectedColumns(prev => [...new Set([...prev, ...ids])]);
  const clearAll = (ids) => setSelectedColumns(prev => prev.filter(c => !ids.includes(c)));
  const totalColumns = COLUMN_CATEGORIES.reduce((sum, cat) => sum + cat.columns.length, 0);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4">
        <div className="flex items-center gap-3 mb-1">
          <ChevronLeft className="w-5 h-5 cursor-pointer hover:bg-white/10 rounded p-0.5" />
          <FileText className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Transaction Report</h1>
        </div>
        <p className="text-indigo-200 text-sm ml-9">Configure columns and filters - Query preview updates in real-time</p>
      </div>

      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm text-slate-600">
          <span><span className="font-semibold text-slate-800">{selectedColumns.length}</span> of {totalColumns} columns</span>
          <span><span className="font-semibold text-slate-800">{filters.binClients.length}</span> BIN clients</span>
          <span><span className="font-semibold text-slate-800">{filters.networks.length}</span> networks</span>
          {filters.excludeCode97 && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Excluding code 97</span>}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Save className="w-4 h-4" /><span className="text-sm">Save</span></button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Download className="w-4 h-4" /><span className="text-sm">Export</span></button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><Play className="w-4 h-4" /><span className="text-sm font-medium">Run Report</span></button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setActiveTab('columns')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'columns' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>
              <Columns className="w-4 h-4" /><span>Columns</span><span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'columns' ? 'bg-white/20' : 'bg-slate-100'}`}>{selectedColumns.length}</span>
            </button>
            <button onClick={() => setActiveTab('filters')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${activeTab === 'filters' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}`}>
              <Filter className="w-4 h-4" /><span>Filters</span>
            </button>
          </div>

          {activeTab === 'columns' ? (
            <div>
              <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border">
                <div className="flex gap-4">
                  <button onClick={() => setSelectedColumns(COLUMN_CATEGORIES.flatMap(c => c.columns.map(col => col.id)))} className="text-sm text-indigo-600 hover:underline">Select All ({totalColumns})</button>
                  <button onClick={() => setSelectedColumns([])} className="text-sm text-slate-500 hover:underline">Clear All</button>
                </div>
              </div>
              {COLUMN_CATEGORIES.map(cat => (
                <CollapsibleSection key={cat.id} category={cat} selectedColumns={selectedColumns} onToggle={toggleColumn} onSelectAll={selectAll} onClear={clearAll} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-5 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'today', label: 'Today' },
                    { id: 'yesterday', label: 'Yesterday' },
                    { id: 'last7', label: 'Last 7 Days' },
                    { id: 'last30', label: 'Last 30 Days' },
                  ].map(preset => (
                    <button key={preset.id} onClick={() => setFilters(f => ({ ...f, datePreset: preset.id }))} 
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${filters.datePreset === preset.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">BIN Client / Program</label>
                <div className="space-y-1 bg-slate-50 rounded-lg p-2">
                  {BIN_CLIENTS.map(bin => (
                    <label key={bin.code} className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${filters.binClients.includes(bin.code) ? 'bg-indigo-50' : 'hover:bg-white'}`}>
                      <input type="checkbox" checked={filters.binClients.includes(bin.code)} 
                        onChange={() => setFilters(f => ({ ...f, binClients: f.binClients.includes(bin.code) ? f.binClients.filter(b => b !== bin.code) : [...f.binClients, bin.code] }))} 
                        className="rounded text-indigo-600 w-4 h-4" />
                      <span className="text-sm font-medium">{bin.name}</span>
                      <span className="text-xs text-slate-400 font-mono">({bin.code})</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Network</label>
                <div className="flex flex-wrap gap-2">
                  {NETWORKS.map(net => (
                    <label key={net} className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${filters.networks.includes(net) ? 'bg-indigo-100 border-2 border-indigo-400' : 'bg-slate-100 border-2 border-transparent hover:bg-slate-200'}`}>
                      <input type="checkbox" checked={filters.networks.includes(net)} 
                        onChange={() => setFilters(f => ({ ...f, networks: f.networks.includes(net) ? f.networks.filter(n => n !== net) : [...f.networks, net] }))} 
                        className="rounded text-indigo-600" />
                      <span className="text-sm font-medium">{net}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Transaction Result</label>
                <div className="flex gap-2">
                  {['All', 'Approved', 'Declined'].map(result => (
                    <button key={result} onClick={() => setFilters(f => ({ ...f, transactionResult: result }))}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors ${filters.transactionResult === result ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                      {result}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <label className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${filters.excludeCode97 ? 'bg-yellow-50 border border-yellow-200' : 'bg-slate-50 hover:bg-slate-100'}`}>
                  <input type="checkbox" checked={filters.excludeCode97} 
                    onChange={() => setFilters(f => ({ ...f, excludeCode97: !f.excludeCode97 }))} 
                    className="rounded text-yellow-600 w-5 h-5" />
                  <div>
                    <span className="text-sm font-medium text-slate-700">Exclude Response Code 97</span>
                    <p className="text-xs text-slate-500 mt-0.5">Filters out transactions with response code 97</p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Selected Columns */}
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Columns className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold">Selected Columns</span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium">{selectedColumns.length}</span>
              </div>
              {selectedColumns.length > 0 && <button onClick={() => setSelectedColumns([])} className="text-xs text-red-600 hover:underline">Clear</button>}
            </div>
            {selectedColumns.length === 0 ? (
              <div className="text-center py-6 text-slate-500">
                <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No columns selected</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-auto">
                {selectedColumns.map(id => {
                  const col = COLUMN_CATEGORIES.flatMap(c => c.columns).find(c => c.id === id);
                  return col ? (
                    <div key={id} className="flex items-center gap-1 px-2 py-1 bg-indigo-50 border border-indigo-200 rounded text-xs">
                      <span className="text-indigo-700">{col.name}</span>
                      <button onClick={() => toggleColumn(id)} className="p-0.5 hover:bg-indigo-200 rounded"><X className="w-3 h-3 text-indigo-500" /></button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* REACTIVE SQL Query Preview */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-700">Query Preview</span>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Live</span>
            </div>
            <QueryPreview selectedColumns={selectedColumns} filters={filters} />
          </div>

          {/* Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800">Try it!</h4>
                <p className="text-sm text-amber-700 mt-1">Toggle "Exclude Response Code 97" and watch the query update</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
