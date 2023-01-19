import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  SimpleGrid,
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'

const Work = () => (
  <Layout title="CMS-Blog">
    <Container>
      <Title>
        CMS-Blog<Badge>2021-</Badge>
      </Title>
      <P>
        A blog application which is made by using NextJS, GraphQL, GraphCMS
      </P>
      <P>
        This is not commercial web-site
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Stack</Meta>
          <span>NextJS, React, GraphQL, GraphCMS</span>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://graphcms-blog-tau.vercel.app/">
            https://graphcms-blog-tau.vercel.app//<ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      <SimpleGrid columns={2} gap={2}>
        <WorkImage src="/images/work/CMS_1.png" alt="CMS-blog" />
        <WorkImage src="/images/work/CMS_2.png" alt="CMS-blog" />
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Work
