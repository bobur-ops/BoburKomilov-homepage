import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  SimpleGrid
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'

const Work = () => (
  <Layout title="Shareme">
    <Container>
      <Title>
        Shareme<Badge>2021-</Badge>
      </Title>
      <P>
        A blog application like Unsplash, where you can share or search for
        images
      </P>
      <P>This is not commercial web-site</P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>React, GoogleSignIn, TailwindCSS, Sanity </span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://share-me-react.netlify.app">
            https://share-me-react.netlify.app/
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      <SimpleGrid columns={2} gap={2}>
        <WorkImage src="/images/work/shareme_1.png" alt="shareme" />
        <WorkImage src="/images/work/shareme_2.png" alt="shareme" />
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Work
