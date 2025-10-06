import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CompatibilityModule } from './CompatibilityModule';
import { TroubleshootModule } from './TroubleshootModule';
import { 
  Users, 
  Database, 
  Activity, 
  Shield, 
  Settings, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  Wifi,
  Download,
  Upload,
  BarChart3,
  UserPlus,
  FileText,
  Monitor,
  HelpCircle
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  language: string;
  isOffline: boolean;
  isLiteMode: boolean;
  onLiteModeToggle: (enabled: boolean) => void;
}

export function AdminDashboard({ user, language, isOffline, isLiteMode, onLiteModeToggle }: AdminDashboardProps) {
  const [activeModule, setActiveModule] = useState('overview');

  const translations = {
    en: {
      overview: 'System Overview', users: 'User Management', content: 'Content Management', updates: 'Update Management', troubleshoot: 'Troubleshoot Center', compatibility: 'Compatibility',
      totalUsers: 'Total Users', activeUsers: 'Active Users', systemHealth: 'System Health', storageUsed: 'Storage Used',
      cpuUsage: 'CPU Usage', memoryUsage: 'Memory Usage', networkStatus: 'Network Status', systemAlerts: 'System Alerts',
      addUser: 'Add New User', managePermissions: 'Manage Permissions', viewReports: 'View Reports',
      systemPerformance: 'System Performance', userDistribution: 'User Distribution', quickActions: 'Quick Actions',
      contentLibrary: 'Content Library', availableUpdates: 'Available Updates', updateHistory: 'Update History',
      students: 'Students', teachers: 'Teachers', admins: 'Admins',
      items: 'items',
      mathGames: 'Math Games', scienceSims: 'Science Simulations', langArts: 'Language Arts', assessmentTools: 'Assessment Tools',
      storageWarning: 'Storage usage approaching 70% limit', updateAvailable: 'System update available (v2.3.1)', backupSuccess: 'Backup completed successfully',
      hoursAgo: 'hours ago', dayAgo: 'day ago', daysAgo: 'days ago', weekAgo: 'week ago',
      ready: 'Ready', pending: 'Pending',
      securityPatches: 'Security patches and performance improvements', enhancedAI: 'Enhanced AI content conversion features',
      installUpdates: 'Install Updates', successfullyInstalled: 'Successfully installed',
    },
    hi: {
      overview: 'सिस्टम अवलोकन', users: 'उपयोगकर्ता प्रबंधन', content: 'सामग्री प्रबंधन', updates: 'अपडेट प्रबंधन', troubleshoot: 'समस्या निवारण केंद्र', compatibility: 'संगतता',
      totalUsers: 'कुल उपयोगकर्ता', activeUsers: 'सक्रिय उपयोगकर्ता', systemHealth: 'सिस्टम स्वास्थ्य', storageUsed: 'उपयोग में स्टोरेज',
      cpuUsage: 'सीपीयू उपयोग', memoryUsage: 'मेमोरी उपयोग', networkStatus: 'नेटवर्क स्थिति', systemAlerts: 'सिस्टम चेतावनी',
      addUser: 'नया उपयोगकर्ता जोड़ें', managePermissions: 'अनुमतियां प्रबंधित करें', viewReports: 'रिपोर्ट देखें',
      systemPerformance: 'सिस्टम प्रदर्शन', userDistribution: 'उपयोगकर्ता वितरण', quickActions: 'त्वरित कार्रवाइयां',
      contentLibrary: 'सामग्री पुस्तकालय', availableUpdates: 'उपलब्ध अपडेट', updateHistory: 'अपडेट इतिहास',
      students: 'छात्र', teachers: 'शिक्षक', admins: 'प्रशासक',
      items: 'आइटम',
      mathGames: 'गणित के खेल', scienceSims: 'विज्ञान सिमुलेशन', langArts: 'भाषा कला', assessmentTools: 'मूल्यांकन उपकरण',
      storageWarning: 'स्टोरेज उपयोग 70% सीमा के करीब पहुंच रहा है', updateAvailable: 'सिस्टम अपडेट उपलब्ध है (v2.3.1)', backupSuccess: 'बैकअप सफलतापूर्वक पूरा हुआ',
      hoursAgo: 'घंटे पहले', dayAgo: 'दिन पहले', daysAgo: 'दिन पहले', weekAgo: 'सप्ताह पहले',
      ready: 'तैयार', pending: 'लंबित',
      securityPatches: 'सुरक्षा पैच और प्रदर्शन में सुधार', enhancedAI: 'उन्नत एआई सामग्री रूपांतरण सुविधाएँ',
      installUpdates: 'अपडेट इंस्टॉल करें', successfullyInstalled: 'सफलतापूर्वक स्थापित',
    },
    pa: {
      overview: 'ਸਿਸਟਮ ਓਵਰਵਿਊ', users: 'ਯੂਜ਼ਰ ਪ੍ਰਬੰਧਨ', content: 'ਸਮੱਗਰੀ ਪ੍ਰਬੰਧਨ', updates: 'ਅੱਪਡੇਟ ਪ੍ਰਬੰਧਨ', troubleshoot: 'ਸਮੱਸਿਆ-ਨਿਵਾਰਨ ਕੇਂਦਰ', compatibility: 'ਅਨੁਕੂਲਤਾ',
      totalUsers: 'ਕੁੱਲ ਯੂਜ਼ਰ', activeUsers: 'ਸਰਗਰਮ ਯੂਜ਼ਰ', systemHealth: 'ਸਿਸਟਮ ਦੀ ਸਿਹਤ', storageUsed: 'ਵਰਤੀ ਗਈ ਸਟੋਰੇਜ',
      cpuUsage: 'CPU ਦੀ ਵਰਤੋਂ', memoryUsage: 'ਮੈਮੋਰੀ ਦੀ ਵਰਤੋਂ', networkStatus: 'ਨੈੱਟਵਰਕ ਸਥਿਤੀ', systemAlerts: 'ਸਿਸਟਮ ਚੇਤਾਵਨੀਆਂ',
      addUser: 'ਨਵਾਂ ਯੂਜ਼ਰ ਸ਼ਾਮਲ ਕਰੋ', managePermissions: 'ਇਜਾਜ਼ਤਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ', viewReports: 'ਰਿਪੋਰਟਾਂ ਵੇਖੋ',
      systemPerformance: 'ਸਿਸਟਮ ਪ੍ਰਦਰਸ਼ਨ', userDistribution: 'ਯੂਜ਼ਰ ਵੰਡ', quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ',
      contentLibrary: 'ਸਮੱਗਰੀ ਲਾਇਬ੍ਰੇਰੀ', availableUpdates: 'ਉਪਲਬਧ ਅੱਪਡੇਟ', updateHistory: 'ਅੱਪਡੇਟ ਇਤਿਹਾਸ',
      students: 'ਵਿਦਿਆਰਥੀ', teachers: 'ਅਧਿਆਪਕ', admins: 'ਪ੍ਰਸ਼ਾਸਕ',
      items: 'ਆਈਟਮਾਂ',
      mathGames: 'ਗਣਿਤ ਦੀਆਂ ਖੇਡਾਂ', scienceSims: 'ਵਿਗਿਆਨ ਸਿਮੂਲੇਸ਼ਨ', langArts: 'ਭਾਸ਼ਾ ਕਲਾ', assessmentTools: 'ਮੁਲਾਂਕਣ ਟੂਲ',
      storageWarning: 'ਸਟੋਰੇਜ ਦੀ ਵਰਤੋਂ 70% ਸੀਮਾ ਦੇ ਨੇੜੇ ਆ ਰਹੀ ਹੈ', updateAvailable: 'ਸਿਸਟਮ ਅੱਪਡੇਟ ਉਪਲਬਧ ਹੈ (v2.3.1)', backupSuccess: 'ਬੈਕਅੱਪ ਸਫਲਤਾਪੂਰਵਕ ਪੂਰਾ ਹੋਇਆ',
      hoursAgo: 'ਘੰਟੇ ਪਹਿਲਾਂ', dayAgo: 'ਦਿਨ ਪਹਿਲਾਂ', daysAgo: 'ਦਿਨ ਪਹਿਲਾਂ', weekAgo: 'ਹਫ਼ਤੇ ਪਹਿਲਾਂ',
      ready: 'ਤਿਆਰ', pending: 'ਬਕਾਇਆ',
      securityPatches: 'ਸੁਰੱਖਿਆ ਪੈਚ ਅਤੇ ਪ੍ਰਦਰਸ਼ਨ ਸੁਧਾਰ', enhancedAI: 'ਵਧੀ ਹੋਈ AI ਸਮੱਗਰੀ ਪਰਿਵਰਤਨ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ',
      installUpdates: 'ਅੱਪਡੇਟ ਸਥਾਪਤ ਕਰੋ', successfullyInstalled: 'ਸਫਲਤਾਪੂਰਵਕ ਸਥਾਪਿਤ ਕੀਤਾ ਗਿਆ',
    }
  };
  
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const systemStats = [
    { label: t.totalUsers, value: '2,547', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: t.activeUsers, value: '1,823', change: '+8%', icon: Activity, color: 'text-green-600' },
    { label: t.systemHealth, value: '98.5%', change: '+0.2%', icon: CheckCircle, color: 'text-green-600' },
    { label: t.storageUsed, value: '67%', change: '+3%', icon: HardDrive, color: 'text-orange-600' },
  ];
  const systemMetrics = [
    { label: t.cpuUsage, value: 45, icon: Cpu },
    { label: t.memoryUsage, value: 62, icon: Database },
    { label: t.networkStatus, value: 89, icon: Wifi },
  ];
  const systemAlerts = [
    { id: 1, type: 'warning', messageKey: 'storageWarning', time: `2 ${t.hoursAgo}` },
    { id: 2, type: 'info', messageKey: 'updateAvailable', time: `1 ${t.dayAgo}` },
    { id: 3, type: 'success', messageKey: 'backupSuccess', time: `2 ${t.daysAgo}` }
  ];
  const userStats = [
    { roleKey: 'students', count: 2245, percentage: 88 },
    { roleKey: 'teachers', count: 267, percentage: 10 },
    { roleKey: 'admins', count: 35, percentage: 2 },
  ];
  const contentStats = [
    { typeKey: 'mathGames', count: 145, size: '2.3 GB' },
    { typeKey: 'scienceSims', count: 89, size: '4.1 GB' },
    { typeKey: 'langArts', count: 67, size: '1.8 GB' },
    { typeKey: 'assessmentTools', count: 234, size: '0.9 GB' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-700 border-2 border-pink-200 dark:border-gray-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2"><stat.icon className={`w-5 h-5 ${stat.color}`} /><span className="text-sm text-gray-600">{stat.label}</span></div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-gray-800 border-2 border-pink-200 dark:border-gray-600">
          <TabsTrigger value="overview" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"><BarChart3 className="w-4 h-4 mr-1" /><span className="hidden lg:inline">{t.overview}</span></TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"><Users className="w-4 h-4 mr-1" /><span className="hidden lg:inline">{t.users}</span></TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"><FileText className="w-4 h-4 mr-1" /><span className="hidden lg:inline">{t.content}</span></TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"><RefreshCw className="w-4 h-4 mr-1" /><span className="hidden lg:inline">{t.updates}</span></TabsTrigger>
          <TabsTrigger value="compatibility" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"><Monitor className="w-4 h-4 mr-1" /><span className="hidden lg:inline">{t.compatibility}</span></TabsTrigger>
          <TabsTrigger value="troubleshoot" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white"><HelpCircle className="w-4 h-4 mr-1" /><span className="hidden lg:inline">{t.troubleshoot}</span></TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200">
              <CardHeader><CardTitle className="flex items-center gap-2 text-blue-900"><Activity className="w-6 h-6" />{t.systemPerformance}</CardTitle></CardHeader>
              <CardContent className="space-y-4">{systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2"><metric.icon className="w-4 h-4 text-gray-600" /><span className="text-sm font-medium">{metric.label}</span><span className="text-sm text-gray-600 ml-auto">{metric.value}%</span></div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}</CardContent>
            </Card>
            <Card className="border-2 border-orange-200">
              <CardHeader><CardTitle className="flex items-center gap-2 text-orange-900"><AlertTriangle className="w-6 h-6" />{t.systemAlerts}</CardTitle></CardHeader>
              <CardContent className="space-y-3">{systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${alert.type === 'warning' ? 'bg-orange-500' : alert.type === 'info' ? 'bg-blue-500' : 'bg-green-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t[alert.messageKey as keyof typeof t]}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" />{alert.time}</p>
                  </div>
                </div>
              ))}</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-green-200">
              <CardHeader><CardTitle className="flex items-center gap-2 text-green-900"><Users className="w-6 h-6" />{t.userDistribution}</CardTitle></CardHeader>
              <CardContent className="space-y-4">{userStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center"><span className="font-medium">{t[stat.roleKey as keyof typeof t]}</span><span className="text-sm text-gray-600">{stat.count}</span></div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
              ))}</CardContent>
            </Card>
            <Card className="border-2 border-purple-200">
              <CardHeader><CardTitle className="flex items-center gap-2 text-purple-900"><Settings className="w-6 h-6" />{t.quickActions}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white"><UserPlus className="w-4 h-4 mr-2" />{t.addUser}</Button>
                <Button variant="outline" className="w-full border-2 border-purple-200"><Shield className="w-4 h-4 mr-2" />{t.managePermissions}</Button>
                <Button variant="outline" className="w-full border-2 border-purple-200"><BarChart3 className="w-4 h-4 mr-2" />{t.viewReports}</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="border-2 border-indigo-200">
            <CardHeader><CardTitle className="flex items-center gap-2 text-indigo-900"><Database className="w-6 h-6" />{t.contentLibrary}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{contentStats.map((content, index) => (
                <Card key={index} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2"><h3 className="font-medium">{t[content.typeKey as keyof typeof t]}</h3><Badge variant="outline">{content.size}</Badge></div>
                    <p className="text-2xl font-bold text-indigo-600">{content.count}</p>
                    <p className="text-sm text-gray-600">{t.items}</p>
                  </CardContent>
                </Card>
              ))}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-white">
              <CardHeader><CardTitle className="flex items-center gap-2 text-cyan-900"><Download className="w-6 h-6" />{t.availableUpdates}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white border rounded-lg">
                  <div className="flex justify-between items-center"><span className="font-medium">System Core v2.3.1</span><Badge className="bg-cyan-500">{t.ready}</Badge></div>
                  <p className="text-sm text-gray-600 mt-1">{t.securityPatches}</p>
                </div>
                <div className="p-3 bg-white border rounded-lg">
                  <div className="flex justify-between items-center"><span className="font-medium">Content Engine v1.8.2</span><Badge variant="outline">{t.pending}</Badge></div>
                  <p className="text-sm text-gray-600 mt-1">{t.enhancedAI}</p>
                </div>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" disabled={isOffline}><Download className="w-4 h-4 mr-2" />{t.installUpdates}</Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
              <CardHeader><CardTitle className="flex items-center gap-2 text-yellow-900"><Upload className="w-6 h-6" />{t.updateHistory}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="font-medium">v2.3.0</span><span className="text-sm text-gray-500 ml-auto">3 {t.daysAgo}</span></div>
                  <p className="text-sm text-gray-600">{t.successfullyInstalled}</p>
                </div>
                <div className="p-3 bg-white border rounded-lg">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="font-medium">v2.2.8</span><span className="text-sm text-gray-500 ml-auto">1 {t.weekAgo}</span></div>
                  <p className="text-sm text-gray-600">{t.successfullyInstalled}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compatibility"><CompatibilityModule language={language} userRole="admin" onLiteModeToggle={onLiteModeToggle} isLiteMode={isLiteMode} /></TabsContent>
        <TabsContent value="troubleshoot"><TroubleshootModule language={language} userRole="admin" isOffline={isOffline} /></TabsContent>
      </Tabs>
    </div>
  );
}