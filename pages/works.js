import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Section from '../components/section'
import Layout from '../components/layouts/article'
import { WorkGridItem } from '../components/grid-item'
import { works } from '../constants/index'

const Works = () => {
  const truncateDescription = value => {
    if (value.length > 100) {
      return `${value.slice(0, 80)}...`
    } else {
      return value
    }
  }

  return (
    <Layout>
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {works.map(i => (
            <Section key={i.id}>
              <WorkGridItem id={i.id} title={i.title} thumbnail={i.thumbnail}>
                {truncateDescription(i.description)}
              </WorkGridItem>
            </Section>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Works
