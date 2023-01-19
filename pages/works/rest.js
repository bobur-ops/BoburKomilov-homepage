import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Restaurant">
    <Container>
      <Title>
        Gericht Restaurant <Badge>2021-</Badge>
      </Title>
      <P>A responsive UX UI design of Gericht Restaurant</P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://gerichtrestaurant-app.netlify.app/">
            https://gerichtrestaurant-app.netlify.app/
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Windows/macOS/Linux/iOS/Android</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, </span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/rest1.png" alt="Rest" />
      <WorkImage src="/images/work/rest2.png" alt="Rest" />
    </Container>
  </Layout>
)

export default Work
