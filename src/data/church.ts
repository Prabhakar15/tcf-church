import type { ChurchInfo, Service, SocialLinks } from '../types';

// Static TCF Church Information - VERIFIED
export const churchInfo: ChurchInfo = {
  name: 'Tabernacle Christ Fellowship',
  shortName: 'TCF',
  establishedYear: 2010,
  pastorName: 'Pastor Daniel Modi',
  vision: 'A Church Without Boundaries',
  community: 'A Family Over a Community',
  description: 'TCF was started in 2010 by Pastor Daniel Modi and his wife Lalitha Modi with a God-given vision of extending God\'s salvation to the uttermost parts of the world, building a church without boundaries and building a family over a community.',
  location: 'Singapore'
};

// Service Information - VERIFIED
export const services: Service[] = [
  {
    id: 'saturday',
    day: 'Saturday',
    time: '7:45 PM',
    timezone: 'SGT',
    venue: 'Bartley Christian Church',
    address: '4 How Sun Drive, Singapore 538526',
    mapsUrl: 'https://www.google.com/maps/search/Bartley+Christian+Church,+4+How+Sun+Drive,+Singapore+538526'
  },
  {
    id: 'sunday',
    day: 'Sunday',
    time: '8:00 PM',
    timezone: 'SGT',
    venue: 'Pasir Panjang Hill Brethren Church',
    address: '3 Pasir Panjang Hill, Singapore 118827',
    mapsUrl: 'https://www.google.com/maps/search/Pasir+Panjang+Hill+Brethren+Church,+3+Pasir+Panjang+Hill,+Singapore+118827'
  }
];

// Social Media Links - VERIFIED
export const socialLinks: SocialLinks = {
  youtube: 'https://www.youtube.com/@TCFSingapore',
  instagram: 'https://www.instagram.com/tcfsg_/',
  facebook: 'https://www.facebook.com/tcfsingapore'
};

// Church Characteristics
export const churchDescription = {
  mission: 'TCF serves expat communities of Telugu and Tamil and has a mission focused on discipleship. TCF gathers together to know the Lord Jesus Christ, worship Him and experience the presence of God.',
  purpose: 'The church seeks to bring the good news to families and friends in their hometowns and to share God\'s love, joy and peace to inspire, empower and transform lives.',
  pastorRole: 'Pastor Daniel Modi is described by TCF as not just a pastor, but also a father and mentor to many brothers who do not have family here in Singapore.'
};

// Compatibility export (for backward compatibility with existing components)
export const churchData = {
  name: churchInfo.name,
  shortName: churchInfo.shortName,
  vision: churchInfo.vision,
  community: churchInfo.community,
  pastor: churchInfo.pastorName,
  established: churchInfo.establishedYear,
  location: churchInfo.location,
  services: services,
  social: socialLinks
};
