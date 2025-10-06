import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  HelpCircle, 
  CheckCircle, 
  RefreshCw, 
  Wifi, 
  Volume2, 
  Settings,
  Book,
  Gamepad2,
  Download,
  Trash2,
  LogIn,
  Users
} from 'lucide-react';

interface TroubleshootModuleProps {
  language: string;
  userRole: 'student' | 'teacher' | 'admin';
  isOffline: boolean;
}

interface TroubleshootIssue {
  id: string;
  titleKey: string;
  descriptionKey: string;
  severity: 'low' | 'medium' | 'high';
  category: 'network' | 'performance' | 'audio' | 'game' | 'login' | 'sync';
  solutionKey: string;
  stepKeys: string[];
}

export function TroubleshootModule({ language, userRole, isOffline }: TroubleshootModuleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [runningDiagnostic, setRunningDiagnostic] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<string[]>([]);

  // EXPANDED: All text is now here
  const translations = {
    en: {
      title: 'Troubleshooting Center',
      runDiagnostic: 'Run Diagnostic',
      runningDiagnostic: 'Running Diagnostic...',
      category: 'Category',
      all: 'All Issues',
      network: 'Network',
      performance: 'Performance',
      audio: 'Audio',
      game: 'Game',
      login: 'Login',
      sync: 'Sync',
      severity: 'Severity',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      solution: 'Solution',
      steps: 'Steps to Fix',
      diagnosticComplete: 'Diagnostic Complete',
      noIssuesFound: 'No major issues detected.',
      offlineHelp: 'Offline help documentation is available.',
      contactSupport: 'Contact Support',
      clearData: 'Clear App Data',
      downloadOfflineHelp: 'Download Offline Help',
      commonIssues: 'Common Issues',

      slowLoading: 'App Loading Slowly',
      slowLoadingDesc: 'Application takes too long to load content or games.',
      slowLoadingSolution: 'Enable Lite Mode in Compatibility settings and clear the app cache.',
      slowLoadingStep1: 'Go to Settings > Compatibility.',
      slowLoadingStep2: 'Enable the "Lite Mode" toggle.',
      slowLoadingStep3: 'Press "Clear App Cache".',
      slowLoadingStep4: 'Restart the application.',

      noInternet: 'No Internet Connection',
      noInternetDesc: 'Cannot connect to online services, download content, or sync progress.',
      noInternetSolution: 'Check your device\'s network connection or use downloaded offline content.',
      noInternetStep1: 'Check your device\'s WiFi or mobile data connection.',
      noInternetStep2: 'If available, switch to Offline Mode in settings.',
      noInternetStep3: 'Play games that have been downloaded for offline use.',
      noInternetStep4: 'Try reconnecting to the network.',

      gameNotStarting: 'Game Not Starting',
      gameNotStartingDesc: 'The adventure game module fails to load or start when you press "Play".',
      gameNotStartingSolution: 'Restart the app and ensure your device has enough free storage.',
      gameNotStartingStep1: 'Completely close and restart the application.',
      gameNotStartingStep2: 'Check your device\'s available storage space.',
      gameNotStartingStep3: 'Clear the application cache via settings.',
      gameNotStartingStep4: 'Ensure the app is updated to the latest version.',

      audioNotWorking: 'Audio Not Working',
      audioNotWorkingDesc: 'There is no sound or music during games or other interactions.',
      audioNotWorkingSolution: 'Check your device\'s main volume and ensure the app has audio permissions.',
      audioNotWorkingStep1: 'Check your device\'s media volume, not just the ringer volume.',
      audioNotWorkingStep2: 'Verify the app has permission to play audio in your device settings.',
      audioNotWorkingStep3: 'Try plugging in and unplugging headphones.',
      audioNotWorkingStep4: 'Restart the application.',

      loginFailed: 'Cannot Login',
      loginFailedDesc: 'Unable to log in even with what you believe are correct credentials.',
      loginFailedSolution: 'Double-check your credentials and network. If the problem persists, contact an admin.',
      loginFailedStep1: 'Carefully re-type your username and password, checking for typos.',
      loginFailedStep2: 'Ensure you have a stable internet connection.',
      loginFailedStep3: 'If possible, try the "Forgot Password" link.',
      loginFailedStep4: 'Contact your teacher or system administrator.',

      dataNotSyncing: 'Data Not Syncing',
      dataNotSyncingDesc: 'Your progress, scores, or achievements are not updating correctly.',
      dataNotSyncingSolution: 'Ensure you have a good internet connection and try a manual sync.',
      dataNotSyncingStep1: 'Ensure you are connected to the internet.',
      dataNotSyncingStep2: 'Look for a "Sync Now" or refresh button in your profile.',
      dataNotSyncingStep3: 'Log out and log back into your account.',
      dataNotSyncingStep4: 'Wait a few minutes as sometimes there is a server delay.',

      gameFreezing: 'Game Freezing',
      gameFreezingDesc: 'The game becomes unresponsive in the middle of gameplay.',
      gameFreezingSolution: 'Close other background apps and enable Lite Mode for better performance.',
      gameFreezingStep1: 'Close any other apps running in the background.',
      gameFreezingStep2: 'Go to Settings > Compatibility and enable "Lite Mode".',
      gameFreezingStep3: 'Ensure your device has sufficient battery.',
      gameFreezingStep4: 'Restart the game.',
      
      soundDelayed: 'Sound is Delayed',
      soundDelayedDesc: 'Audio effects are not in sync with the on-screen actions.',
      soundDelayedSolution: 'This is often a performance issue. Restarting the app can help.',
      soundDelayedStep1: 'Restart the application completely.',
      soundDelayedStep2: 'Enable "Lite Mode" in Settings > Compatibility.',
      soundDelayedStep3: 'Check if your device\'s operating system needs an update.',
      soundDelayedStep4: 'Clear the app cache.',
      
      diagCheckNetwork: 'Checking network connectivity...',
      diagCheckPerformance: 'Testing app performance...',
      diagCheckAudio: 'Verifying audio system...',
      diagCheckStorage: 'Checking storage space...',
      diagCheckGame: 'Testing game engine...',
      diagCheckPerms: 'Verifying user permissions...'
    },
    hi: {
      title: 'समस्या निवारण केंद्र', runDiagnostic: 'डायग्नोस्टिक चलाएं', runningDiagnostic: 'डायग्नोस्टिक चल रहा है...', category: 'श्रेणी', all: 'सभी समस्याएं', network: 'नेटवर्क', performance: 'प्रदर्शन', audio: 'ऑडियो', game: 'गेम', login: 'लॉगिन', sync: 'सिंक', severity: 'गंभीरता', low: 'कम', medium: 'मध्यम', high: 'उच्च', solution: 'समाधान', steps: 'ठीक करने के चरण', diagnosticComplete: 'डायग्नोस्टिक पूरा', noIssuesFound: 'कोई बड़ी समस्या नहीं मिली।', offlineHelp: 'ऑफ़लाइन सहायता दस्तावेज़ उपलब्ध है।', contactSupport: 'सहायता से संपर्क करें', clearData: 'ऐप डेटा साफ़ करें', downloadOfflineHelp: 'ऑफ़लाइन सहायता डाउनलोड करें', commonIssues: 'आम समस्याएं',
      slowLoading: 'ऐप धीरे लोड हो रहा है', slowLoadingDesc: 'एप्लिकेशन को सामग्री या गेम लोड करने में बहुत अधिक समय लगता है।', slowLoadingSolution: 'संगतता सेटिंग्स में लाइट मोड सक्षम करें और ऐप कैश साफ़ करें।', slowLoadingStep1: 'सेटिंग्स > संगतता पर जाएं।', slowLoadingStep2: '"लाइट मोड" टॉगल सक्षम करें।', slowLoadingStep3: '"ऐप कैश साफ़ करें" दबाएं।', slowLoadingStep4: 'एप्लिकेशन को पुनरारंभ करें।',
      noInternet: 'कोई इंटरनेट कनेक्शन नहीं', noInternetDesc: 'ऑनलाइन सेवाओं से कनेक्ट नहीं हो सकता, सामग्री डाउनलोड नहीं कर सकता, या प्रगति सिंक नहीं कर सकता।', noInternetSolution: 'अपने डिवाइस का नेटवर्क कनेक्शन जांचें या डाउनलोड की गई ऑफ़लाइन सामग्री का उपयोग करें।', noInternetStep1: 'अपने डिवाइस का वाईफाई या मोबाइल डेटा कनेक्शन जांचें।', noInternetStep2: 'यदि उपलब्ध हो, तो सेटिंग्स में ऑफ़लाइन मोड पर स्विच करें।', noInternetStep3: 'ऑफ़लाइन उपयोग के लिए डाउनलोड किए गए गेम खेलें।', noInternetStep4: 'नेटवर्क से फिर से जुड़ने का प्रयास करें।',
      gameNotStarting: 'गेम शुरू नहीं हो रहा है', gameNotStartingDesc: '"Play" दबाने पर एडवेंचर गेम मॉड्यूल लोड या शुरू होने में विफल रहता है।', gameNotStartingSolution: 'ऐप को पुनरारंभ करें और सुनिश्चित करें कि आपके डिवाइस में पर्याप्त खाली स्टोरेज है।', gameNotStartingStep1: 'एप्लिकेशन को पूरी तरह से बंद करें और पुनरारंभ करें।', gameNotStartingStep2: 'अपने डिवाइस का उपलब्ध स्टोरेज स्थान जांचें।', gameNotStartingStep3: 'सेटिंग्स के माध्यम से एप्लिकेशन कैश साफ़ करें।', gameNotStartingStep4: 'सुनिश्चित करें कि ऐप नवीनतम संस्करण में अपडेट है।',
      audioNotWorking: 'ऑडियो काम नहीं कर रहा है', audioNotWorkingDesc: 'गेम या अन्य इंटरैक्शन के दौरान कोई ध्वनि या संगीत नहीं है।', audioNotWorkingSolution: 'अपने डिवाइस का मुख्य वॉल्यूम जांचें और सुनिश्चित करें कि ऐप के पास ऑडियो अनुमतियां हैं।', audioNotWorkingStep1: 'अपने डिवाइस का मीडिया वॉल्यूम जांचें, न कि केवल रिंगर वॉल्यूम।', audioNotWorkingStep2: 'सत्यापित करें कि ऐप को आपकी डिवाइस सेटिंग्स में ऑडियो चलाने की अनुमति है।', audioNotWorkingStep3: 'हेडफ़ोन लगाकर और निकालकर प्रयास करें।', audioNotWorkingStep4: 'एप्लिकेशन को पुनरारंभ करें।',
      loginFailed: 'लॉगिन नहीं हो सकता', loginFailedDesc: 'सही क्रेडेंशियल मानने के बावजूद लॉग इन करने में असमर्थ।', loginFailedSolution: 'अपने क्रेडेंशियल और नेटवर्क की दोबारा जांच करें। यदि समस्या बनी रहती है, तो एक व्यवस्थापक से संपर्क करें।', loginFailedStep1: 'टाइपो की जांच करते हुए, अपना उपयोगकर्ता नाम और पासवर्ड ध्यान से दोबारा टाइप करें।', loginFailedStep2: 'सुनिश्चित करें कि आपके पास एक स्थिर इंटरनेट कनेक्शन है।', loginFailedStep3: 'यदि संभव हो, तो "पासवर्ड भूल गए" लिंक का प्रयास करें।', loginFailedStep4: 'अपने शिक्षक या सिस्टम व्यवस्थापक से संपर्क करें।',
      dataNotSyncing: 'डेटा सिंक नहीं हो रहा है', dataNotSyncingDesc: 'आपकी प्रगति, स्कोर, या उपलब्धियाँ सही ढंग से अपडेट नहीं हो रही हैं।', dataNotSyncingSolution: 'सुनिश्चित करें कि आपके पास एक अच्छा इंटरनेट कनेक्शन है और मैन्युअल सिंक का प्रयास करें।', dataNotSyncingStep1: 'सुनिश्चित करें कि आप इंटरनेट से जुड़े हैं।', dataNotSyncingStep2: 'अपने प्रोफाइल में "अभी सिंक करें" या रीफ्रेश बटन देखें।', dataNotSyncingStep3: 'अपने खाते से लॉग आउट करें और फिर से लॉग इन करें।', dataNotSyncingStep4: 'कुछ मिनट प्रतीक्षा करें क्योंकि कभी-कभी सर्वर में देरी होती है।',
      gameFreezing: 'गेम फ्रीज हो रहा है', gameFreezingDesc: 'गेमप्ले के बीच में गेम अनुत्तरदायी हो जाता है।', gameFreezingSolution: 'अन्य पृष्ठभूमि ऐप्स बंद करें और बेहतर प्रदर्शन के लिए लाइट मोड सक्षम करें।', gameFreezingStep1: 'पृष्ठभूमि में चल रहे किसी भी अन्य ऐप्स को बंद करें।', gameFreezingStep2: 'सेटिंग्स > संगतता पर जाएं और "लाइट मोड" सक्षम करें।', gameFreezingStep3: 'सुनिश्चित करें कि आपके डिवाइस में पर्याप्त बैटरी है।', gameFreezingStep4: 'गेम को पुनरारंभ करें।',
      soundDelayed: 'ध्वनि में देरी हो रही है', soundDelayedDesc: 'ऑडियो प्रभाव ऑन-स्क्रीन क्रियाओं के साथ सिंक में नहीं हैं।', soundDelayedSolution: 'यह अक्सर एक प्रदर्शन समस्या है। ऐप को पुनरारंभ करने से मदद मिल सकती है।', soundDelayedStep1: 'एप्लिकेशन को पूरी तरह से पुनरारंभ करें।', soundDelayedStep2: 'सेटिंग्स > संगतता में "लाइट मोड" सक्षम करें।', soundDelayedStep3: 'जांचें कि क्या आपके डिवाइस के ऑपरेटिंग सिस्टम को अपडेट की आवश्यकता है।', soundDelayedStep4: 'ऐप कैश साफ़ करें।',
      diagCheckNetwork: 'नेटवर्क कनेक्टिविटी की जाँच हो रही है...', diagCheckPerformance: 'ऐप प्रदर्शन का परीक्षण हो रहा है...', diagCheckAudio: 'ऑडियो सिस्टम का सत्यापन हो रहा है...', diagCheckStorage: 'स्टोरेज स्थान की जाँच हो रही है...', diagCheckGame: 'गेम इंजन का परीक्षण हो रहा है...', diagCheckPerms: 'उपयोगकर्ता अनुमतियों का सत्यापन हो रहा है...'
    },
    pa: {
      title: 'ਸਮੱਸਿਆ-ਨਿਵਾਰਨ ਕੇਂਦਰ', runDiagnostic: 'ਡਾਇਗਨੌਸਟਿਕ ਚਲਾਓ', runningDiagnostic: 'ਡਾਇਗਨੌਸਟਿਕ ਚੱਲ ਰਿਹਾ ਹੈ...', category: 'ਸ਼੍ਰੇਣੀ', all: 'ਸਾਰੀਆਂ ਸਮੱਸਿਆਵਾਂ', network: 'ਨੈੱਟਵਰਕ', performance: 'ਪ੍ਰਦਰਸ਼ਨ', audio: 'ਆਡੀਓ', game: 'ਗੇਮ', login: 'ਲੌਗਇਨ', sync: 'ਸਿੰਕ', severity: 'ਗੰਭੀਰਤਾ', low: 'ਘੱਟ', medium: 'ਮੱਧਮ', high: 'ਉੱਚ', solution: 'ਹੱਲ', steps: 'ਠੀਕ ਕਰਨ ਦੇ ਕਦਮ', diagnosticComplete: 'ਡਾਇਗਨੌਸਟਿਕ ਪੂਰਾ ਹੋਇਆ', noIssuesFound: 'ਕੋਈ ਵੱਡੀ ਸਮੱਸਿਆ ਨਹੀਂ ਲੱਭੀ।', offlineHelp: 'ਔਫਲਾਈਨ ਮਦਦ ਦਸਤਾਵੇਜ਼ ਉਪਲਬਧ ਹੈ।', contactSupport: 'ਸਹਾਇਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ', clearData: 'ਐਪ ਡਾਟਾ ਸਾਫ਼ ਕਰੋ', downloadOfflineHelp: 'ਔਫਲਾਈਨ ਮਦਦ ਡਾਊਨਲੋਡ ਕਰੋ', commonIssues: 'ਆਮ ਸਮੱਸਿਆਵਾਂ',
      slowLoading: 'ਐਪ ਹੌਲੀ-ਹੌਲੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ', slowLoadingDesc: 'ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਸਮੱਗਰੀ ਜਾਂ ਗੇਮਾਂ ਨੂੰ ਲੋਡ ਕਰਨ ਵਿੱਚ ਬਹੁਤ ਜ਼ਿਆਦਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ।', slowLoadingSolution: 'ਅਨੁਕੂਲਤਾ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਲਾਈਟ ਮੋਡ ਨੂੰ ਸਮਰੱਥ ਕਰੋ ਅਤੇ ਐਪ ਕੈਸ਼ ਨੂੰ ਸਾਫ਼ ਕਰੋ।', slowLoadingStep1: 'ਸੈਟਿੰਗਾਂ > ਅਨੁਕੂਲਤਾ \'ਤੇ ਜਾਓ।', slowLoadingStep2: '"ਲਾਈਟ ਮੋਡ" ਟੌਗਲ ਨੂੰ ਸਮਰੱਥ ਕਰੋ।', slowLoadingStep3: '"ਐਪ ਕੈਸ਼ ਸਾਫ਼ ਕਰੋ" ਦਬਾਓ।', slowLoadingStep4: 'ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰੋ।',
      noInternet: 'ਕੋਈ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਨਹੀਂ', noInternetDesc: 'ਔਨਲਾਈਨ ਸੇਵਾਵਾਂ ਨਾਲ ਕਨੈਕਟ ਨਹੀਂ ਕਰ ਸਕਦਾ, ਸਮੱਗਰੀ ਡਾਊਨਲੋਡ ਨਹੀਂ ਕਰ ਸਕਦਾ, ਜਾਂ ਤਰੱਕੀ ਨੂੰ ਸਿੰਕ ਨਹੀਂ ਕਰ ਸਕਦਾ।', noInternetSolution: 'ਆਪਣੀ ਡਿਵਾਈਸ ਦੇ ਨੈੱਟਵਰਕ ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ ਜਾਂ ਡਾਊਨਲੋਡ ਕੀਤੀ ਔਫਲਾਈਨ ਸਮੱਗਰੀ ਦੀ ਵਰਤੋਂ ਕਰੋ।', noInternetStep1: 'ਆਪਣੀ ਡਿਵਾਈਸ ਦੇ WiFi ਜਾਂ ਮੋਬਾਈਲ ਡਾਟਾ ਕਨੈਕਸ਼ਨ ਦੀ ਜਾਂਚ ਕਰੋ।', noInternetStep2: 'ਜੇਕਰ ਉਪਲਬਧ ਹੋਵੇ, ਤਾਂ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਔਫਲਾਈਨ ਮੋਡ \'ਤੇ ਸਵਿਚ ਕਰੋ।', noInternetStep3: 'ਉਹ ਗੇਮਾਂ ਖੇਡੋ ਜੋ ਔਫਲਾਈਨ ਵਰਤੋਂ ਲਈ ਡਾਊਨਲੋਡ ਕੀਤੀਆਂ ਗਈਆਂ ਹਨ।', noInternetStep4: 'ਨੈੱਟਵਰਕ ਨਾਲ ਦੁਬਾਰਾ ਜੁੜਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      gameNotStarting: 'ਗੇਮ ਸ਼ੁਰੂ ਨਹੀਂ ਹੋ ਰਹੀ', gameNotStartingDesc: 'ਜਦੋਂ ਤੁਸੀਂ "Play" ਦਬਾਉਂਦੇ ਹੋ ਤਾਂ ਐਡਵੈਂਚਰ ਗੇਮ ਮੋਡੀਊਲ ਲੋਡ ਜਾਂ ਸ਼ੁਰੂ ਹੋਣ ਵਿੱਚ ਅਸਫਲ ਰਹਿੰਦਾ ਹੈ।', gameNotStartingSolution: 'ਐਪ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰੋ ਅਤੇ ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਵਿੱਚ ਕਾਫ਼ੀ ਖਾਲੀ ਸਟੋਰੇਜ ਹੈ।', gameNotStartingStep1: 'ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਬੰਦ ਕਰੋ ਅਤੇ ਮੁੜ ਚਾਲੂ ਕਰੋ।', gameNotStartingStep2: 'ਆਪਣੀ ਡਿਵਾਈਸ ਦੀ ਉਪਲਬਧ ਸਟੋਰੇਜ ਸਪੇਸ ਦੀ ਜਾਂਚ ਕਰੋ।', gameNotStartingStep3: 'ਸੈਟਿੰਗਾਂ ਰਾਹੀਂ ਐਪਲੀਕੇਸ਼ਨ ਕੈਸ਼ ਨੂੰ ਸਾਫ਼ ਕਰੋ।', gameNotStartingStep4: 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਐਪ ਨਵੀਨਤਮ ਸੰਸਕਰਣ \'ਤੇ ਅੱਪਡੇਟ ਹੈ।',
      audioNotWorking: 'ਆਡੀਓ ਕੰਮ ਨਹੀਂ ਕਰ ਰਿਹਾ ਹੈ', audioNotWorkingDesc: 'ਗੇਮਾਂ ਜਾਂ ਹੋਰ ਪਰਸਪਰ ਪ੍ਰਭਾਵ ਦੇ ਦੌਰਾਨ ਕੋਈ ਆਵਾਜ਼ ਜਾਂ ਸੰਗੀਤ ਨਹੀਂ ਹੁੰਦਾ।', audioNotWorkingSolution: 'ਆਪਣੀ ਡਿਵਾਈਸ ਦੀ ਮੁੱਖ ਆਵਾਜ਼ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਐਪ ਨੂੰ ਆਡੀਓ ਅਨੁਮਤੀਆਂ ਹਨ।', audioNotWorkingStep1: 'ਆਪਣੀ ਡਿਵਾਈਸ ਦੀ ਮੀਡੀਆ ਆਵਾਜ਼ ਦੀ ਜਾਂਚ ਕਰੋ, ਨਾ ਕਿ ਸਿਰਫ਼ ਰਿੰਗਰ ਦੀ ਆਵਾਜ਼।', audioNotWorkingStep2: 'ਤਸਦੀਕ ਕਰੋ ਕਿ ਐਪ ਨੂੰ ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਆਡੀਓ ਚਲਾਉਣ ਦੀ ਇਜਾਜ਼ਤ ਹੈ।', audioNotWorkingStep3: 'ਹੈੱਡਫੋਨ ਲਗਾਉਣ ਅਤੇ ਅਨਪਲੱਗ ਕਰਨ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।', audioNotWorkingStep4: 'ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰੋ।',
      loginFailed: 'ਲੌਗਇਨ ਨਹੀਂ ਹੋ ਸਕਦਾ', loginFailedDesc: 'ਸਹੀ ਪ੍ਰਮਾਣ ਪੱਤਰ ਮੰਨਣ ਦੇ ਬਾਵਜੂਦ ਲੌਗਇਨ ਕਰਨ ਵਿੱਚ ਅਸਮਰੱਥ।', loginFailedSolution: 'ਆਪਣੇ ਪ੍ਰਮਾਣ ਪੱਤਰ ਅਤੇ ਨੈੱਟਵਰਕ ਦੀ ਦੁਬਾਰਾ ਜਾਂਚ ਕਰੋ। ਜੇਕਰ ਸਮੱਸਿਆ ਬਣੀ ਰਹਿੰਦੀ ਹੈ, ਤਾਂ ਇੱਕ ਪ੍ਰਸ਼ਾਸਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।', loginFailedStep1: 'ਟਾਈਪੋਜ਼ ਦੀ ਜਾਂਚ ਕਰਦੇ ਹੋਏ, ਆਪਣੇ ਉਪਭੋਗਤਾ ਨਾਮ ਅਤੇ ਪਾਸਵਰਡ ਨੂੰ ਧਿਆਨ ਨਾਲ ਦੁਬਾਰਾ ਟਾਈਪ ਕਰੋ।', loginFailedStep2: 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੇ ਕੋਲ ਇੱਕ ਸਥਿਰ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਹੈ।', loginFailedStep3: 'ਜੇ ਸੰਭਵ ਹੋਵੇ, ਤਾਂ "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ" ਲਿੰਕ ਨੂੰ ਅਜ਼ਮਾਓ।', loginFailedStep4: 'ਆਪਣੇ ਅਧਿਆਪਕ ਜਾਂ ਸਿਸਟਮ ਪ੍ਰਸ਼ਾਸਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।',
      dataNotSyncing: 'ਡਾਟਾ ਸਿੰਕ ਨਹੀਂ ਹੋ ਰਿਹਾ ਹੈ', dataNotSyncingDesc: 'ਤੁਹਾਡੀ ਤਰੱਕੀ, ਸਕੋਰ, ਜਾਂ ਪ੍ਰਾਪਤੀਆਂ ਸਹੀ ਢੰਗ ਨਾਲ ਅੱਪਡੇਟ ਨਹੀਂ ਹੋ ਰਹੀਆਂ ਹਨ।', dataNotSyncingSolution: 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੇ ਕੋਲ ਇੱਕ ਵਧੀਆ ਇੰਟਰਨੈਟ ਕਨੈਕਸ਼ਨ ਹੈ ਅਤੇ ਇੱਕ ਮੈਨੂਅਲ ਸਿੰਕ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ।', dataNotSyncingStep1: 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਸੀਂ ਇੰਟਰਨੈਟ ਨਾਲ ਜੁੜੇ ਹੋਏ ਹੋ।', dataNotSyncingStep2: 'ਆਪਣੇ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਇੱਕ "ਹੁਣ ਸਿੰਕ ਕਰੋ" ਜਾਂ ਤਾਜ਼ਾ ਕਰੋ ਬਟਨ ਲੱਭੋ।', dataNotSyncingStep3: 'ਆਪਣੇ ਖਾਤੇ ਤੋਂ ਲੌਗ ਆਉਟ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਲੌਗਇਨ ਕਰੋ।', dataNotSyncingStep4: 'ਕੁਝ ਮਿੰਟ ਉਡੀਕ ਕਰੋ ਕਿਉਂਕਿ ਕਈ ਵਾਰ ਸਰਵਰ ਵਿੱਚ ਦੇਰੀ ਹੁੰਦੀ ਹੈ।',
      gameFreezing: 'ਗੇਮ ਫ੍ਰੀਜ਼ ਹੋ ਰਹੀ ਹੈ', gameFreezingDesc: 'ਗੇਮਪਲੇ ਦੇ ਵਿਚਕਾਰ ਗੇਮ ਗੈਰ-ਜਵਾਬਦੇਹ ਹੋ ਜਾਂਦੀ ਹੈ।', gameFreezingSolution: 'ਹੋਰ ਬੈਕਗ੍ਰਾਊਂਡ ਐਪਾਂ ਨੂੰ ਬੰਦ ਕਰੋ ਅਤੇ ਬਿਹਤਰ ਪ੍ਰਦਰਸ਼ਨ ਲਈ ਲਾਈਟ ਮੋਡ ਨੂੰ ਸਮਰੱਥ ਕਰੋ।', gameFreezingStep1: 'ਬੈਕਗ੍ਰਾਊਂਡ ਵਿੱਚ ਚੱਲ ਰਹੀਆਂ ਕਿਸੇ ਵੀ ਹੋਰ ਐਪਾਂ ਨੂੰ ਬੰਦ ਕਰੋ।', gameFreezingStep2: 'ਸੈਟਿੰਗਾਂ > ਅਨੁਕੂਲਤਾ \'ਤੇ ਜਾਓ ਅਤੇ "ਲਾਈਟ ਮੋਡ" ਨੂੰ ਸਮਰੱਥ ਕਰੋ।', gameFreezingStep3: 'ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਵਿੱਚ ਲੋੜੀਂਦੀ ਬੈਟਰੀ ਹੈ।', gameFreezingStep4: 'ਗੇਮ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰੋ।',
      soundDelayed: 'ਆਵਾਜ਼ ਵਿੱਚ ਦੇਰੀ ਹੋ ਰਹੀ ਹੈ', soundDelayedDesc: 'ਆਡੀਓ ਪ੍ਰਭਾਵ ਆਨ-ਸਕ੍ਰੀਨ ਕਿਰਿਆਵਾਂ ਦੇ ਨਾਲ ਸਿੰਕ ਵਿੱਚ ਨਹੀਂ ਹਨ।', soundDelayedSolution: 'ਇਹ ਅਕਸਰ ਇੱਕ ਪ੍ਰਦਰਸ਼ਨ ਦਾ ਮੁੱਦਾ ਹੁੰਦਾ ਹੈ। ਐਪ ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰਨ ਨਾਲ ਮਦਦ ਮਿਲ ਸਕਦੀ ਹੈ।', soundDelayedStep1: 'ਐਪਲੀਕੇਸ਼ਨ ਨੂੰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਮੁੜ ਚਾਲੂ ਕਰੋ।', soundDelayedStep2: 'ਸੈਟਿੰਗਾਂ > ਅਨੁਕੂਲਤਾ ਵਿੱਚ "ਲਾਈਟ ਮੋਡ" ਨੂੰ ਸਮਰੱਥ ਕਰੋ।', soundDelayedStep3: 'ਜਾਂਚ ਕਰੋ ਕਿ ਕੀ ਤੁਹਾਡੀ ਡਿਵਾਈਸ ਦੇ ਓਪਰੇਟਿੰਗ ਸਿਸਟਮ ਨੂੰ ਅੱਪਡੇਟ ਦੀ ਲੋੜ ਹੈ।', soundDelayedStep4: 'ਐਪ ਕੈਸ਼ ਸਾਫ਼ ਕਰੋ।',
      diagCheckNetwork: 'ਨੈੱਟਵਰਕ ਕਨੈਕਟੀਵਿਟੀ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...', diagCheckPerformance: 'ਐਪ ਪ੍ਰਦਰਸ਼ਨ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...', diagCheckAudio: 'ਆਡੀਓ ਸਿਸਟਮ ਦੀ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...', diagCheckStorage: 'ਸਟੋਰੇਜ ਸਪੇਸ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...', diagCheckGame: 'ਗੇਮ ਇੰਜਣ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...', diagCheckPerms: 'ਉਪਭੋਗਤਾ ਅਨੁਮਤੀਆਂ ਦੀ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...'
    }
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // UPDATED: All original issues are now included and use translation keys
  const commonIssues: TroubleshootIssue[] = [
    { id: '1', titleKey: 'slowLoading', descriptionKey: 'slowLoadingDesc', severity: 'medium', category: 'performance', solutionKey: 'slowLoadingSolution', stepKeys: ['slowLoadingStep1', 'slowLoadingStep2', 'slowLoadingStep3', 'slowLoadingStep4'] },
    { id: '2', titleKey: 'noInternet', descriptionKey: 'noInternetDesc', severity: 'high', category: 'network', solutionKey: 'noInternetSolution', stepKeys: ['noInternetStep1', 'noInternetStep2', 'noInternetStep3', 'noInternetStep4'] },
    { id: '3', titleKey: 'gameNotStarting', descriptionKey: 'gameNotStartingDesc', severity: 'high', category: 'game', solutionKey: 'gameNotStartingSolution', stepKeys: ['gameNotStartingStep1', 'gameNotStartingStep2', 'gameNotStartingStep3', 'gameNotStartingStep4'] },
    { id: '4', titleKey: 'audioNotWorking', descriptionKey: 'audioNotWorkingDesc', severity: 'medium', category: 'audio', solutionKey: 'audioNotWorkingSolution', stepKeys: ['audioNotWorkingStep1', 'audioNotWorkingStep2', 'audioNotWorkingStep3', 'audioNotWorkingStep4'] },
    { id: '5', titleKey: 'loginFailed', descriptionKey: 'loginFailedDesc', severity: 'high', category: 'login', solutionKey: 'loginFailedSolution', stepKeys: ['loginFailedStep1', 'loginFailedStep2', 'loginFailedStep3', 'loginFailedStep4'] },
    { id: '6', titleKey: 'dataNotSyncing', descriptionKey: 'dataNotSyncingDesc', severity: 'medium', category: 'sync', solutionKey: 'dataNotSyncingSolution', stepKeys: ['dataNotSyncingStep1', 'dataNotSyncingStep2', 'dataNotSyncingStep3', 'dataNotSyncingStep4'] },
    { id: '7', titleKey: 'gameFreezing', descriptionKey: 'gameFreezingDesc', severity: 'medium', category: 'performance', solutionKey: 'gameFreezingSolution', stepKeys: ['gameFreezingStep1', 'gameFreezingStep2', 'gameFreezingStep3', 'gameFreezingStep4'] },
    { id: '8', titleKey: 'soundDelayed', descriptionKey: 'soundDelayedDesc', severity: 'low', category: 'audio', solutionKey: 'soundDelayedSolution', stepKeys: ['soundDelayedStep1', 'soundDelayedStep2', 'soundDelayedStep3', 'soundDelayedStep4'] },
  ];

  const filteredIssues = selectedCategory === 'all' 
    ? commonIssues 
    : commonIssues.filter(issue => issue.category === selectedCategory);

  const getSeverityColor = (severity: string) => { /* ... no changes ... */ };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network': return <Wifi className="w-4 h-4" />;
      case 'performance': return <Settings className="w-4 h-4" />;
      case 'audio': return <Volume2 className="w-4 h-4" />;
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      case 'login': return <LogIn className="w-4 h-4" />;
      case 'sync': return <Users className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const runDiagnostic = async () => { /* ... no changes ... */ };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 dark:border-gray-600">
        <CardHeader>{/* ... no changes ... */}</CardHeader>
        <CardContent className="space-y-6">
          {/* ... no changes to quick actions or diagnostic results ... */}

          {/* UPDATED: Category Filter now includes all categories */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setSelectedCategory('all')} variant={selectedCategory === 'all' ? 'default' : 'outline'} className="h-8 px-3 text-sm">{t.all}</Button>
            {['network', 'performance', 'audio', 'game', 'login', 'sync'].map((category) => (
              <Button key={category} onClick={() => setSelectedCategory(category)} variant={selectedCategory === category ? 'default' : 'outline'} className="h-8 px-3 text-sm">
                {getCategoryIcon(category)}
                <span className="ml-1">{t[category as keyof typeof t]}</span>
              </Button>
            ))}
          </div>

          {/* Common Issues (This section now works correctly with all data) */}
          <div>
            <h3 className="font-medium mb-4">{t.commonIssues}</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredIssues.map((issue) => (
                <AccordionItem key={issue.id} value={issue.id} className="border border-gray-200 dark:border-gray-600 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(issue.category)}
                        <span className="font-medium text-left">{t[issue.titleKey as keyof typeof t]}</span>
                      </div>
                      <Badge className={`${getSeverityColor(issue.severity)} border`}>{t[issue.severity as keyof typeof t]}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t[issue.descriptionKey as keyof typeof t]}</p>
                      <div>
                        <h5 className="font-medium text-sm mb-2">{t.solution}:</h5>
                        <p className="text-sm text-green-700 dark:text-green-400">{t[issue.solutionKey as keyof typeof t]}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">{t.steps}:</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {issue.stepKeys.map((stepKey, index) => (
                            <li key={index}>{t[stepKey as keyof typeof t]}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* ... no other changes needed ... */}
        </CardContent>
      </Card>
    </div>
  );
}