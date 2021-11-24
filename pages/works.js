import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import { WorkGridItem } from '../components/grid-item'


import thumbCryptoverse from '../public/images/work/crypto_1.png'
import thumbCms_blog from '../public/images/work/CMS_1.png'
import thumbSearch from '../public/images/work/search_1.png'
import thumbSlider from '../public/images/work/slider.png'
import thumbVideoChat from '../public/images/work/video-chat.png'





const Works = () => {
  return (
    <Layout>
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section>
            <WorkGridItem id="cryptoverse" title="Cryptoverse" thumbnail={thumbCryptoverse}>
              An application to monitor cryptocurrencies. Also can find latest CryptoNews
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="cms-blog"
              title="CMS-blog"
              thumbnail={thumbCms_blog}
            >
              A Blog app made with GraphCMS, GraphQL
            </WorkGridItem>
          </Section>

          <Section delay={0.1}>
            <WorkGridItem
              id="search"
              title="Search-Engine"
              thumbnail={thumbSearch}
            >
              Analog of Goggle. My own Search Engine
            </WorkGridItem>
          </Section>

          <Section delay={0.1}>
            <WorkGridItem
              id="video-chat"
              title="Video Chat"
              thumbnail={thumbVideoChat}
            >
              A Video Chat application.
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        <Section delay={0.4}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Old works
          </Heading>
        </Section>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <Section delay={0.5}>
            <WorkGridItem
              id="slider"
              thumbnail={thumbSlider}
              title="Cool Slider"
            >
              Responsive Slider with a lot of interesting animations
            </WorkGridItem>
          </Section>
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Works
