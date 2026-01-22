import React, { useState } from "react";
import { Building2, Bell, ChevronRight, Menu, LogOut, Home, Settings, Users, Server, Database, Activity, AlertCircle, CheckCircle, MoreVertical, Plus, Edit, Eye, RefreshCw } from "lucide-react";

const JimAvatar = ({ size = 40 }) => (
  <div className="rounded-full flex items-center justify-center overflow-hidden" style={{ width: size, height: size, background: "linear-gradient(135deg, #8B0000 0%, #4A0000 50%, #2D0000 100%)" }}>
    <div className="relative w-full h-full flex items-center justify-center">
      <span className="font-bold text-red-200" style={{ fontSize: size * 0.4, textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>JB</span>
      <div className="absolute bg-green-500 rounded-full border-2 border-white" style={{ width: size * 0.25, height: size * 0.25, bottom: 0, right: 0 }} />
    </div>
  </div>
);

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <Server className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Platform Portal</h1>
          <p className="text-slate-400 mt-2">Enterprise Management System</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Sign In</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="Enter your username" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" placeholder="Enter your password" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button onClick={onLogin} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-500/30">Sign In</button>
          </div>
        </div>
        <p className="text-center text-slate-500 text-sm mt-6">© 2026 Platform Portal • v2.0.0</p>
      </div>
    </div>
  );
};

const Header = ({ onToggleSidenav, onLogout }) => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
    <div className="flex items-center gap-4">
      <button onClick={onToggleSidenav} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
        <Menu className="w-5 h-5 text-slate-600" />
      </button>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Server className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-800">Platform Portal</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative">
        <Bell className="w-5 h-5 text-slate-500 cursor-pointer hover:text-slate-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">2</span>
      </div>
      <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
        <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 text-slate-600" />
        </div>
        <span className="text-sm text-slate-600">Admin User</span>
      </div>
      <button onClick={onLogout} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Logout">
        <LogOut className="w-5 h-5 text-slate-500" />
      </button>
    </div>
  </header>
);

const Sidenav = ({ isOpen, currentPage, onNavigate }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "platform-manager", label: "Platform Manager", icon: Settings },
    { id: "organization-manager", label: "Organizations", icon: Building2 },
    { id: "event-notifications", label: "Notifications", icon: Bell },
  ];
  return (
    <aside className={`${isOpen ? "w-64" : "w-0"} bg-slate-900 transition-all duration-300 overflow-hidden flex flex-col`}>
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">AU</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">Admin User</p>
            <p className="text-slate-500 text-xs">System Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Dashboard = ({ onNavigate }) => {
  const cards = [
    { id: "platform-manager", title: "Platform Manager", desc: "Manage applications, projects & services", icon: null, useJimAvatar: true, color: "bg-blue-500", count: "12 items" },
    { id: "organization-manager", title: "Organization Manager", desc: "Manage organizations & teams", icon: Building2, color: "bg-emerald-500", count: "4 orgs" },
    { id: "event-notifications", title: "Event Notifications", desc: "View system alerts & notifications", icon: Bell, color: "bg-orange-500", count: "2 unread" },
  ];
  return (
    <div className="p-6">
      <div className="mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-xl p-4 shadow-lg border border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <JimAvatar size={48} />
            <div>
              <h3 className="text-white font-semibold">Jim "jb862_51890"</h3>
              <p className="text-slate-400 text-sm">The one who started it all. His vision and dedication laid the foundation for this platform.</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-500 text-xs uppercase tracking-wide">Founder</div>
            <div className="text-slate-400 text-sm mt-1">Forever remembered</div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to the Platform Portal</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button key={card.id} onClick={() => onNavigate(card.id)} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all text-left group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  {card.useJimAvatar ? <JimAvatar size={32} /> : <Icon className="w-6 h-6 text-white" />}
                </div>
                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">{card.count}</span>
              </div>
              <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{card.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{card.desc}</p>
              <div className="flex items-center gap-1 mt-4 text-blue-600 text-sm font-medium">
                <span>Open</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Active Services", value: "24", icon: Activity, color: "text-green-500" },
          { label: "Applications", value: "8", icon: Database, color: "text-blue-500" },
          { label: "Organizations", value: "4", icon: Building2, color: "text-purple-500" },
          { label: "Pending Alerts", value: "2", icon: AlertCircle, color: "text-orange-500" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PlatformManager = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const areas = [
    { id: "applications", name: "Applications", count: 8, icon: Database },
    { id: "projects", name: "Projects", count: 12, icon: Server },
    { id: "services", name: "Services", count: 24, icon: Activity },
  ];
  const functions = {
    applications: [
      { id: "engin", name: "ENGIN", status: "active" },
      { id: "evstat", name: "EVSTAT", status: "active" },
      { id: "logger", name: "LOGGER", status: "active" },
      { id: "cmdserver", name: "CMDSERVER", status: "warning" },
    ],
    projects: [
      { id: "proj1", name: "BNEXT Integration", status: "active" },
      { id: "proj2", name: "MONAVATE Reports", status: "active" },
      { id: "proj3", name: "MSL Reporting", status: "pending" },
    ],
    services: [
      { id: "svc1", name: "Command Server", status: "active", port: 9998 },
      { id: "svc2", name: "Event Logger", status: "active", port: 9204 },
      { id: "svc3", name: "Status Monitor", status: "warning", port: 9999 },
    ],
  };
  const instances = {
    engin: [
      { id: 1, name: "ENGIN-PROD-01", ip: "192.168.1.100", status: "online" },
      { id: 2, name: "ENGIN-PROD-02", ip: "192.168.1.101", status: "online" },
      { id: 3, name: "ENGIN-DEV-01", ip: "192.168.1.200", status: "offline" },
    ],
    evstat: [{ id: 1, name: "EVSTAT-PROD-01", ip: "192.168.1.110", status: "online" }],
    logger: [{ id: 1, name: "LOGGER-PROD-01", ip: "192.168.1.120", status: "online" }],
    cmdserver: [
      { id: 1, name: "CMD-PROD-01", ip: "192.168.1.130", status: "online" },
      { id: 2, name: "CMD-PROD-02", ip: "192.168.1.131", status: "warning" },
    ],
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "active": case "online": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "pending": return "bg-blue-500";
      case "offline": return "bg-red-500";
      default: return "bg-slate-400";
    }
  };
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Platform Manager</h1>
          <p className="text-slate-500 mt-1">Manage applications, projects, and services</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4" style={{ height: "calc(100vh - 220px)" }}>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-slate-700">Base Areas</h3>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <button key={area.id} onClick={() => { setSelectedArea(area.id); setSelectedFunction(null); }} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors mb-1 ${selectedArea === area.id ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedArea === area.id ? "bg-blue-500" : "bg-slate-200"}`}>
                    <Icon className={`w-5 h-5 ${selectedArea === area.id ? "text-white" : "text-slate-600"}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-800">{area.name}</p>
                    <p className="text-xs text-slate-500">{area.count} items</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-slate-700">{selectedArea ? areas.find((a) => a.id === selectedArea)?.name : "Select an Area"}</h3>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {selectedArea && functions[selectedArea] ? (
              functions[selectedArea].map((func) => (
                <button key={func.id} onClick={() => setSelectedFunction(func.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors mb-1 ${selectedFunction === func.id ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50"}`}>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(func.status)}`} />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-800">{func.name}</p>
                    {func.port && <p className="text-xs text-slate-500">Port: {func.port}</p>}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400"><p>Select an area to view items</p></div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700">{selectedFunction ? functions[selectedArea]?.find((f) => f.id === selectedFunction)?.name : "Instances"}</h3>
            {selectedFunction && (
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><RefreshCw className="w-4 h-4 text-slate-500" /></button>
                <button className="p-1.5 hover:bg-slate-200 rounded transition-colors"><MoreVertical className="w-4 h-4 text-slate-500" /></button>
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto p-2">
            {selectedFunction && instances[selectedFunction] ? (
              instances[selectedFunction].map((instance) => (
                <div key={instance.id} className="px-3 py-3 rounded-lg hover:bg-slate-50 mb-1 border border-transparent hover:border-slate-200 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(instance.status)}`} />
                      <p className="font-medium text-slate-800 text-sm">{instance.name}</p>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-slate-200 rounded"><Eye className="w-3.5 h-3.5 text-slate-400" /></button>
                      <button className="p-1 hover:bg-slate-200 rounded"><Edit className="w-3.5 h-3.5 text-slate-400" /></button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 ml-4">{instance.ip}</p>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400"><p>Select an item to view instances</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrganizationManager = () => {
  const orgs = [
    { id: 1, name: "BNEXT Corporation", teams: 3, users: 12, status: "active" },
    { id: 2, name: "MONAVATE Inc.", teams: 2, users: 8, status: "active" },
    { id: 3, name: "MSL Group", teams: 4, users: 15, status: "active" },
    { id: 4, name: "Development Team", teams: 1, users: 5, status: "pending" },
  ];
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Organization Manager</h1>
          <p className="text-slate-500 mt-1">Manage organizations and teams</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Organization</span>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Organization</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Teams</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Users</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((org) => (
              <tr key={org.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="font-medium text-slate-800">{org.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{org.teams}</td>
                <td className="px-6 py-4 text-slate-600">{org.users}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${org.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{org.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EventNotifications = () => {
  const notifications = [
    { id: 1, type: "error", title: "Connection Lost", message: "ENGIN-DEV-01 connection lost at 14:32:05", time: "2 hours ago", read: false },
    { id: 2, type: "warning", title: "High Memory Usage", message: "CMD-PROD-02 memory usage at 89%", time: "3 hours ago", read: false },
    { id: 3, type: "success", title: "Deployment Complete", message: "MSL Reporting v2.1.0 deployed successfully", time: "5 hours ago", read: true },
    { id: 4, type: "info", title: "Scheduled Maintenance", message: "System maintenance scheduled for Sunday 02:00 UTC", time: "1 day ago", read: true },
  ];
  const getNotificationStyle = (type) => {
    switch (type) {
      case "error": return { icon: AlertCircle, bg: "bg-red-50", iconColor: "text-red-500" };
      case "warning": return { icon: AlertCircle, bg: "bg-yellow-50", iconColor: "text-yellow-500" };
      case "success": return { icon: CheckCircle, bg: "bg-green-50", iconColor: "text-green-500" };
      default: return { icon: Bell, bg: "bg-blue-50", iconColor: "text-blue-500" };
    }
  };
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Event Notifications</h1>
          <p className="text-slate-500 mt-1">System alerts and notifications</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Mark all as read</button>
      </div>
      <div className="space-y-3">
        {notifications.map((notif) => {
          const style = getNotificationStyle(notif.type);
          const Icon = style.icon;
          return (
            <div key={notif.id} className={`p-4 rounded-xl border ${notif.read ? "bg-white border-slate-200" : "bg-blue-50/50 border-blue-200"}`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${style.bg}`}><Icon className={`w-5 h-5 ${style.iconColor}`} /></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">{notif.title}</h3>
                    <span className="text-xs text-slate-400">{notif.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                </div>
                {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Breadcrumb = ({ currentPage }) => {
  const pageNames = { dashboard: "Dashboard", "platform-manager": "Platform Manager", "organization-manager": "Organization Manager", "event-notifications": "Event Notifications" };
  return (
    <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
      <div className="flex items-center gap-2 text-sm">
        <Home className="w-4 h-4 text-slate-400" />
        <span className="text-indigo-600 cursor-pointer hover:underline">Home</span>
        {currentPage !== "dashboard" && (
          <>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{pageNames[currentPage]}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!isLoggedIn) return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;

  const renderPage = () => {
    switch (currentPage) {
      case "platform-manager": return <PlatformManager />;
      case "organization-manager": return <OrganizationManager />;
      case "event-notifications": return <EventNotifications />;
      default: return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header onToggleSidenav={() => setSidenavOpen(!sidenavOpen)} onLogout={() => setIsLoggedIn(false)} currentPage={currentPage} />
      <div className="flex flex-1 overflow-hidden">
        <Sidenav isOpen={sidenavOpen} currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1 overflow-auto">
          <Breadcrumb currentPage={currentPage} />
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
