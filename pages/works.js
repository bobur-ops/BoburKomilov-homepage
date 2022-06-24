import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import { WorkGridItem } from '../components/grid-item'
import thumbCms_blog from '../public/images/work/CMS_1.png'
import thumbSearch from '../public/images/work/search_1.png'
import thumbSlider from '../public/images/work/slider.png'
import thumbEstate from '../public/images/work/estate-1.png'
import thumbShareme from '../public/images/work/shareme_1.png'
import thumbKrypt from '../public/images/work/krypt_1.png'
import thumbRest from '../public/images/work/rest1.png'

const Works = () => {
  return (
    <Layout>
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
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
              id="realtor-estate"
              title="Realtor Real Estate"
              thumbnail={thumbEstate}
            >
              An application with information about Real Estate from all over
              the world.
            </WorkGridItem>
          </Section>

          <Section delay={0.1}>
            <WorkGridItem id="shareme" title="Shareme" thumbnail={thumbShareme}>
              A blog application like Unsplash, where you can share or search
              for images
            </WorkGridItem>
          </Section>

          <Section delay={0.1}>
            <WorkGridItem
              id="krypt"
              title="Kryptomastery"
              thumbnail={thumbKrypt}
            >
              A WEB 3.0 Blockchain application with real transactions on ETH.
            </WorkGridItem>
          </Section>

          <Section delay={0.1}>
            <WorkGridItem id="rest" title="Restaurant" thumbnail={thumbRest}>
              A responsive UX UI design of Gericht Restaurant
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
