export const works = [
  {
    id: 'cms-blog',
    title: 'CMS-Blog',
    thumbnail: '/images/work/CMS_1.png',
    images: ['/images/work/CMS_1.png', '/images/work/CMS_2.png'],
    description:
      'A blog application which is made by using NextJS, GraphQL, GraphCMS',
    stack: 'NextJS, React, GraphQL, GraphCMS',
    url: 'https://graphcms-blog-tau.vercel.app/'
  },
  {
    id: 'chrono-track',
    title: 'ChronoTrack',
    thumbnail: '/images/work/chrono_track_1.png',
    images: [
      '/images/work/chrono_track_1.png',
      '/images/work/chrono_track_2.png'
    ],
    description:
      'ChronoTrack is your one-stop solution for efficient time tracking. Easily record and manage your work hours, boost productivity, and gain valuable insights into your daily tasks with our user-friendly time tracking tools',
    stack: 'Astro, React, TailwindCSS, Framer Motions, Nanostores',
    url: 'https://chrono-track.bobur.me'
  },
  {
    id: 'realtor',
    title: 'Realtor Estate',
    thumbnail: '/images/work/realtor_1.png',
    images: ['/images/work/realtor_1.png', '/images/work/realtor_2.png'],
    description: 'Search for property to rent and buy.',
    stack: 'React, Chakra ui',
    url: 'https://realtor.bobur.me'
  },
  {
    id: 'lord-personal',
    title: 'Lord Prime (Personal Area)',
    thumbnail: '/images/work/lord-personal-1.png',
    images: [
      '/images/work/lord-personal-1.png',
      '/images/work/lord-personal-2.png',
      '/images/work/lord-personal-3.png',
      '/images/work/lord-personal-4.png',
      '/images/work/lord-personal-5.png',
      '/images/work/lord-personal-6.png',
      '/images/work/lord-personal-7.png'
    ],
    description:
      'A Personal Are for Lord Prime Forex Broker website to monitor the account. Mobile Friendly',
    stack: 'Nuxt 3, TailwindCSS, Pinia, HeadlessUI',
    url: 'https://bobur.me'
  }
]

export const getWorkItem = value => {
  return works.find(i => i.id === value)
}
