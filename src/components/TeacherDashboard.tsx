import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CompatibilityModule } from './CompatibilityModule';
import { TroubleshootModule } from './TroubleshootModule';
import { 
  PlusCircle, 
  Upload, 
  Users, 
  BarChart3, 
  Settings, 
  FileText,
  Gamepad2,
  Brain,
  Monitor,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface TeacherDashboardProps {
  user: any;
  language: string;
  isOffline: boolean;
  isLiteMode: boolean;
  onLiteModeToggle: (enabled: boolean) => void;
}

export function TeacherDashboard({ user, language, isOffline, isLiteMode, onLiteModeToggle }: TeacherDashboardProps) {
  const [activeModule, setActiveModule] = useState('sandbox');

  const translations = {
    en: {
      sandbox: 'Sandbox',
      analytics: 'Analytics',
      content: 'Content',
      classes: 'My Classes',
      createGame: 'Create New Game',
      uploadContent: 'Upload Content',
      aiConverter: 'AI Game Converter',
      templates: 'Game Templates',
      activeStudents: 'Active Students',
      completedGames: 'Games Completed',
      avgScore: 'Average Score',
      engagement: 'Engagement Rate',
      class: 'Class',
      students: 'students',
      progress: 'Progress',
      performance: 'Performance',
      compatibility: 'Compatibility',
      troubleshoot: 'Troubleshoot',
      startFromTemplate: 'Start from Template',
      customGameBuilder: 'Custom Game Builder',
      aiFeaturesOffline: 'AI features require internet connection',
      typeLabel: 'Type',
      subjectLabel: 'Subject',
      mathematics: 'Mathematics',
      physics: 'Physics',
      chemistry: 'Chemistry',
      mathQuiz: 'Math Quiz Challenge',
      physicsSim: 'Physics Simulation',
      chemLab: 'Chemistry Lab',
      quiz: 'Quiz',
      simulation: 'Simulation',
      interactive: 'Interactive',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      grade8Science: 'Grade 8 Science',
      grade10Math: 'Grade 10 Math',
      grade12Physics: 'Grade 12 Physics',
      active: 'Active',
      inactive: 'Inactive',
      lastActive: 'Last active',
      hoursAgo: 'hours ago',
      dayAgo: 'day ago',
      daysAgo: 'days ago',
      contentLibrary: 'Content Library',
      mathGames: 'Math Games Collection',
      physicsSims: 'Physics Simulations',
      chemLabs: 'Chemistry Labs',
      games: 'games',
      quickActions: 'Quick Actions',
      uploadNew: 'Upload New Content',
      manageExisting: 'Manage Existing',
      contentSettings: 'Content Settings'
    },
    hi: {
      sandbox: 'सैंडबॉक्स', analytics: 'विश्लेषण', content: 'सामग्री', classes: 'मेरी कक्षाएं', createGame: 'नया गेम बनाएं', uploadContent: 'सामग्री अपलोड करें', aiConverter: 'एआई गेम कनवर्टर', templates: 'गेम टेम्प्लेट', activeStudents: 'सक्रिय छात्र', completedGames: 'पूर्ण गेम', avgScore: 'औसत स्कोर', engagement: 'सहभागिता दर', class: 'कक्षा', students: 'छात्र', progress: 'प्रगति', performance: 'प्रदर्शन', compatibility: 'संगतता', troubleshoot: 'समस्या निवारण', startFromTemplate: 'टेम्पलेट से शुरू करें', customGameBuilder: 'कस्टम गेम बिल्डर', aiFeaturesOffline: 'एआई सुविधाओं के लिए इंटरनेट कनेक्शन आवश्यक है', typeLabel: 'प्रकार', subjectLabel: 'विषय', mathematics: 'गणित', physics: 'भौतिकी', chemistry: 'रसायन विज्ञान', mathQuiz: 'गणित प्रश्नोत्तरी चुनौती', physicsSim: 'भौतिकी सिमुलेशन', chemLab: 'रसायन विज्ञान लैब', quiz: 'प्रश्नोत्तरी', simulation: 'सिमुलेशन', interactive: 'इंटरैक्टिव', easy: 'आसान', medium: 'मध्यम', hard: 'कठिन', grade8Science: 'कक्षा 8 विज्ञान', grade10Math: 'कक्षा 10 गणित', grade12Physics: 'कक्षा 12 भौतिकी', active: 'सक्रिय', inactive: 'निष्क्रिय', lastActive: 'अंतिम सक्रिय', hoursAgo: 'घंटे पहले', dayAgo: 'दिन पहले', daysAgo: 'दिन पहले', contentLibrary: 'सामग्री पुस्तकालय', mathGames: 'गणित खेल संग्रह', physicsSims: 'भौतिकी सिमुलेशन', chemLabs: 'रसायन विज्ञान लैब्स', games: 'गेम', quickActions: 'त्वरित कार्रवाइयां', uploadNew: 'नई सामग्री अपलोड करें', manageExisting: 'मौजूदा प्रबंधित करें', contentSettings: 'सामग्री सेटिंग्स'
    },
    pa: {
      sandbox: 'ਸੈਂਡਬੌਕਸ', analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ', content: 'ਸਮੱਗਰੀ', classes: 'ਮੇਰੀਆਂ ਜਮਾਤਾਂ', createGame: 'ਨਵੀਂ ਗੇਮ ਬਣਾਓ', uploadContent: 'ਸਮੱਗਰੀ ਅੱਪਲੋਡ ਕਰੋ', aiConverter: 'AI ਗੇਮ ਕਨਵਰਟਰ', templates: 'ਗੇਮ ਟੈਂਪਲੇਟਸ', activeStudents: 'ਸਰਗਰਮ ਵਿਦਿਆਰਥੀ', completedGames: 'ਪੂਰੀਆਂ ਹੋਈਆਂ ਗੇਮਾਂ', avgScore: 'ਔਸਤ ਸਕੋਰ', engagement: 'ਭਾਗੀਦਾਰੀ ਦਰ', class: 'ਜਮਾਤ', students: 'ਵਿਦਿਆਰਥੀ', progress: 'ਪ੍ਰਗਤੀ', performance: 'ਪ੍ਰਦਰਸ਼ਨ', compatibility: 'ਅਨੁਕੂਲਤਾ', troubleshoot: 'ਸਮੱਸਿਆ-ਨਿਵਾਰਨ', startFromTemplate: 'ਟੈਂਪਲੇਟ ਤੋਂ ਸ਼ੁਰੂ ਕਰੋ', customGameBuilder: 'ਕਸਟਮ ਗੇਮ ਬਿਲਡਰ', aiFeaturesOffline: 'AI ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਲਈ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਦੀ ਲੋੜ ਹੈ', typeLabel: 'ਕਿਸਮ', subjectLabel: 'ਵਿਸ਼ਾ', mathematics: 'ਗਣਿਤ', physics: 'ਭੌਤਿਕ ਵਿਗਿਆਨ', chemistry: 'ਰਸਾਇਣ ਵਿਗਿਆਨ', mathQuiz: 'ਗਣਿਤ ਕੁਇਜ਼ ਚੈਲੇਂਜ', physicsSim: 'ਭੌਤਿਕ ਵਿਗਿਆਨ ਸਿਮੂਲੇਸ਼ਨ', chemLab: 'ਰਸਾਇਣ ਵਿਗਿਆਨ ਲੈਬ', quiz: 'ਕੁਇਜ਼', simulation: 'ਸਿਮੂਲੇਸ਼ਨ', interactive: 'ਇੰਟਰਐਕਟਿਵ', easy: 'ਸੌਖਾ', medium: 'ਦਰਮਿਆਨਾ', hard: 'ਔਖਾ', grade8Science: 'ਜਮਾਤ 8 ਵਿਗਿਆਨ', grade10Math: 'ਜਮਾਤ 10 ਗਣਿਤ', grade12Physics: 'ਜਮਾਤ 12 ਭੌਤਿਕ ਵਿਗਿਆਨ', active: 'ਸਰਗਰਮ', inactive: 'ਨਿਸ਼ਕਿਰਿਆ', lastActive: 'ਆਖਰੀ ਵਾਰ ਸਰਗਰਮ', hoursAgo: 'ਘੰਟੇ ਪਹਿਲਾਂ', dayAgo: 'ਦਿਨ ਪਹਿਲਾਂ', daysAgo: 'ਦਿਨ ਪਹਿਲਾਂ', contentLibrary: 'ਸਮੱਗਰੀ ਲਾਇਬ੍ਰੇਰੀ', mathGames: 'ਗਣਿਤ ਖੇਡਾਂ ਦਾ ਸੰਗ੍ਰਹਿ', physicsSims: 'ਭੌਤਿਕ ਵਿਗਿਆਨ ਸਿਮੂਲੇਸ਼ਨ', chemLabs: 'ਰਸਾਇਣ ਵਿਗਿਆਨ ਲੈਬਜ਼', games: 'ਗੇਮਾਂ', quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ', uploadNew: 'ਨਵੀਂ ਸਮੱਗਰੀ ਅੱਪਲੋਡ ਕਰੋ', manageExisting: 'ਮੌਜੂਦਾ ਪ੍ਰਬੰਧਿਤ ਕਰੋ', contentSettings: 'ਸਮੱਗਰੀ ਸੈਟਿੰਗਾਂ'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  const teacherStats = [
    { label: t.activeStudents, value: '127', icon: Users, color: 'text-blue-600' },
    { label: t.completedGames, value: '43', icon: CheckCircle, color: 'text-green-600' },
    { label: t.avgScore, value: '78%', icon: Target, color: 'text-purple-600' },
    { label: t.engagement, value: '92%', icon: BarChart3, color: 'text-orange-600' },
  ];

  const gameTemplates = [
    { id: 1, nameKey: 'mathQuiz', typeKey: 'quiz', subjectKey: 'mathematics', difficultyKey: 'medium', icon: Gamepad2, color: 'bg-blue-500' },
    { id: 2, nameKey: 'physicsSim', typeKey: 'simulation', subjectKey: 'physics', difficultyKey: 'hard', icon: Monitor, color: 'bg-purple-500' },
    { id: 3, nameKey: 'chemLab', typeKey: 'interactive', subjectKey: 'chemistry', difficultyKey: 'easy', icon: Brain, color: 'bg-green-500' }
  ];

  const classes = [
    { id: 1, nameKey: 'grade8Science', students: 32, progress: 75, lastActive: `2 ${t.hoursAgo}`, statusKey: 'active' },
    { id: 2, nameKey: 'grade10Math', students: 28, progress: 60, lastActive: `1 ${t.dayAgo}`, statusKey: 'active' },
    { id: 3, nameKey: 'grade12Physics', students: 24, progress: 45, lastActive: `3 ${t.daysAgo}`, statusKey: 'inactive' }
  ];

  const contentLibraryItems = [
    { nameKey: 'mathGames', count: 12 },
    { nameKey: 'physicsSims', count: 8 },
    { nameKey: 'chemLabs', count: 6 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teacherStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-purple-200 dark:border-gray-600">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2"><IconComponent className={`w-5 h-5 ${stat.color}`} /><span className="text-sm text-gray-600">{stat.label}</span></div>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-gray-600">
          <TabsTrigger value="sandbox" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><Settings className="w-4 h-4 mr-1" /><span className="hidden sm:inline">{t.sandbox}</span></TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><BarChart3 className="w-4 h-4 mr-1" /><span className="hidden sm:inline">{t.analytics}</span></TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><FileText className="w-4 h-4 mr-1" /><span className="hidden sm:inline">{t.content}</span></TabsTrigger>
          <TabsTrigger value="compatibility" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><Monitor className="w-4 h-4 mr-1" /><span className="hidden sm:inline">{t.compatibility}</span></TabsTrigger>
          <TabsTrigger value="troubleshoot" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><HelpCircle className="w-4 h-4 mr-1" /><span className="hidden sm:inline">{t.troubleshoot}</span></TabsTrigger>
        </TabsList>

        <TabsContent value="sandbox" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader><CardTitle className="flex items-center gap-2 text-blue-900"><PlusCircle className="w-6 h-6" />{t.createGame}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white"><Gamepad2 className="w-4 h-4 mr-2" />{t.startFromTemplate}</Button>
                <Button variant="outline" className="w-full border-2 border-blue-200"><Brain className="w-4 h-4 mr-2" />{t.customGameBuilder}</Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardHeader><CardTitle className="flex items-center gap-2 text-green-900"><Brain className="w-6 h-6" />{t.aiConverter}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={isOffline}><Upload className="w-4 h-4 mr-2" />{t.uploadContent}</Button>
                {isOffline && (<p className="text-sm text-orange-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{t.aiFeaturesOffline}</p>)}
              </CardContent>
            </Card>
          </div>
          <Card className="border-2 border-purple-200">
            <CardHeader><CardTitle className="flex items-center gap-2 text-purple-900"><BookOpen className="w-6 h-6" />{t.templates}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gameTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <Card key={template.id} className="border-2 border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-3`}><IconComponent className="w-6 h-6 text-white" /></div>
                        <h3 className="font-bold mb-2">{t[template.nameKey as keyof typeof t]}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{t.typeLabel}: {t[template.typeKey as keyof typeof t]}</p>
                          <p>{t.subjectLabel}: {t[template.subjectKey as keyof typeof t]}</p>
                          <Badge variant="outline">{t[template.difficultyKey as keyof typeof t]}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-2 border-orange-200">
            <CardHeader><CardTitle className="flex items-center gap-2 text-orange-900"><Users className="w-6 h-6" />{t.classes}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes.map((classItem) => (
                  <Card key={classItem.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold">{t[classItem.nameKey as keyof typeof t]}</h3>
                          <p className="text-sm text-gray-600">{classItem.students} {t.students}</p>
                        </div>
                        <Badge variant={classItem.statusKey === 'active' ? 'default' : 'secondary'} className={classItem.statusKey === 'active' ? 'bg-green-500 text-white' : ''}>
                          {t[classItem.statusKey as keyof typeof t]}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span>{t.progress}</span><span>{classItem.progress}%</span></div>
                        <Progress value={classItem.progress} className="h-2" />
                        <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{t.lastActive}: {classItem.lastActive}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white">
              <CardHeader><CardTitle className="flex items-center gap-2 text-pink-900"><FileText className="w-6 h-6" />{t.contentLibrary}</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contentLibraryItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <span className="font-medium">{t[item.nameKey as keyof typeof t]}</span>
                      <Badge>{item.count} {t.games}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
              <CardHeader><CardTitle className="flex items-center gap-2 text-indigo-900"><Monitor className="w-6 h-6" />{t.quickActions}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"><Upload className="w-4 h-4 mr-2" />{t.uploadNew}</Button>
                <Button variant="outline" className="w-full border-2 border-indigo-200"><FileText className="w-4 h-4 mr-2" />{t.manageExisting}</Button>
                <Button variant="outline" className="w-full border-2 border-indigo-200"><Settings className="w-4 h-4 mr-2" />{t.contentSettings}</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compatibility">
          <CompatibilityModule language={language} userRole="teacher" onLiteModeToggle={onLiteModeToggle} isLiteMode={isLiteMode} />
        </TabsContent>
        <TabsContent value="troubleshoot">
          <TroubleshootModule language={language} userRole="teacher" isOffline={isOffline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}