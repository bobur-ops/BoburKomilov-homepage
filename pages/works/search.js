import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Search-Engine">
    <Container>
      <Title>
        Search Engine <Badge>2021-</Badge>
      </Title>
      <P>Analog of Goggle. My own Search Engine</P>
      <List ml={4} my={4}>
        <ListItem display={'flex'} alignItems={'center'}>
          <Meta>Website</Meta>
          <Link
            target="_blank"
            href="https://app-search-engine.netlify.app/search"
          >
            https://app-search-engine.netlify.app/search
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <Meta>Platform</Meta>
          <span>Windows/macOS/Linux/iOS/Android</span>
        </ListItem>
        <ListItem display={'flex'} alignItems={'center'}>
          <Meta>Stack</Meta>
          <span>React, Google API </span>
        </ListItem>
      </List>

      <WorkImage src="/images/work/search_1.png" alt="Serch-Engine" />
      <WorkImage src="/images/work/search_2.png" alt="Search-Engine" />
    </Container>
  </Layout>
)

export default Work
