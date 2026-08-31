import type { DailyWord } from '../../types';

// MOCK DATA — replace with Supabase data later
export const mockDailyWords: DailyWord[] = [
  {
    id: '1',
    title: 'Trust in God\'s Plan',
    scriptureReference: 'Proverbs 3:5-6',
    bibleVerse: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    message: 'When life feels uncertain, we can find peace in trusting God\'s guidance. He knows the way forward, even when we cannot see it clearly.',
    publishDate: new Date().toISOString(),
    author: 'TCF',
    status: 'published'
  },
  {
    id: '2',
    title: 'Grace is Enough',
    scriptureReference: '2 Corinthians 12:9',
    bibleVerse: 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness."',
    message: 'In our moments of weakness, God\'s grace meets us. We don\'t have to be strong on our own—we are sustained by His love.',
    publishDate: new Date(Date.now() - 86400000).toISOString(),
    author: 'TCF',
    status: 'published'
  },
  {
    id: '3',
    title: 'Living with Purpose',
    scriptureReference: 'Ephesians 2:10',
    bibleVerse: 'For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.',
    message: 'You are created with purpose. Every day is an opportunity to live out God\'s calling for your life through service and love.',
    publishDate: new Date(Date.now() - 172800000).toISOString(),
    author: 'TCF',
    status: 'published'
  }
];

export function getTodaysDailyWord(): DailyWord {
  return mockDailyWords[0];
}

export function getAllDailyWords(): DailyWord[] {
  return mockDailyWords;
}
